import React, { Component } from 'react';
import firebase from 'firebase';
import List from './List/List';
import ListForm from './ListForm/ListForm';
import 'typeface-roboto';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.addList = this.addList.bind(this);
    //We are going to setup the React state of our component
    this.state = {
      lists: [
        { id: 1, listContent: " build app with electron & react "},
        { id: 2 , listContent: " electron-builder and Github as release server " },
      ],
    }
  }
  
  addList(list){
    //  push the list onto the lists array.
    const previousLists = this.state.lists;
    previousLists.push({ id: previousLists.length + 1, listContent: list});
    this.setState({
      lists: previousLists
    });
  }

  render() {
    return (
      <div className="listsWrapper">
        <div className="listsHeader">
          <div className="heading">ToDo</div>
        </div>
        <div className="listsBody">
          {
            this.state.lists.map((list) => {
              return(
                <List listContent={list.listContent} listId={list.id} key={list.id} />
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
