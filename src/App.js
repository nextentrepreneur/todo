import React, { Component } from 'react';
import List from './List/List';
import NavBar from './NavBar/NavBar'
import ListForm from './ListForm/ListForm';
import { DB_CONFIG } from './Config/config';
import firebase from 'firebase/app';
import 'firebase/database';
import 'typeface-roboto';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.addList = this.addList.bind(this);
    this.removeList = this.removeList.bind(this);

    this.app = firebase.initializeApp(DB_CONFIG);
    this.db = this.app.database().ref().child('lists');
    
    //We are going to setup the React state of our component
    this.state = {
      lists: [],
    }
  }
  
  componentWillMount(){
    const previousLists = this.state.lists;

    // DataSnapshot
    this.db.on('child_added', snap => {
      previousLists.push({
        id: snap.key,
        listContent: snap.val().listContent,
      })

      this.setState({
        lists: previousLists
      })
    })

    this.db.on('child_removed', snap => {
      for(var i=0; i < previousLists.length; i++)
      {
        if(previousLists[i].id === snap.key){
          previousLists.splice(i, 1);
        }
      }

      this.setState({
        lists: previousLists
      })
    })

  }

  addList(list){
    this.db.push().set({ listContent: list});
  }

  removeList(listId){
    this.db.child(listId).remove();
  }

  render() {
    return (
      <div className="listsWrapper">
        <div className="listsHeader">
          <div>
            <NavBar />  
          </div>
        </div>
        <div className="listsBody">
          {
            this.state.lists.map((list) => {
              return(
                <List listContent={list.listContent}
                  listId={list.id}
                  key={list.id}
                  removeList = {this.removeList} />
              )
            })
            
          }
          </div>
        <div className="listsFooter">
          <ListForm addList={this.addList}  />
        </div>
      </div>
    )
  }
}

export default App;
