import React, { Component } from 'react';
import firebase from 'firebase';
import logo from './logo.svg';
import List from './List/List';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);

    //We are going to setup the React state of our component
    this.state = {
      lists: [
        { id: 1, listContent: " build app with electron & react "},
        { id: 2 , listContent: " electron-builder and Github as release server " },
      ],
    }
  }
  render() {
    return (
      <div className="listsWrapper">
        <div className="listsHeader">
          <div className="heading">To-Do app with elctron and React</div>
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
          list input form will be here
        </div>
      </div>
    )
  }
}

export default App;
