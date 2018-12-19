import React, { Component } from 'react';
import List from '../src/components/List';
import NavBar from '../src/components/NavBar'
import ListForm from '../src/components/ListForm';
import { connect } from 'react-redux';
import { getListsThunk, watchListADDEvent, watchListRemoveEvent } from './actions/index';
import 'firebase/database';
import 'typeface-roboto';
import './styles/App.css';

class App extends Component {
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
            this.props.lists.map((list) => {
              return(
                <List listContent={list.listContent}
                  listId={list.id}
                  key={list.id} />
              )
            })
            
          }
        </div>
        <div className="listsFooter">
          <ListForm />
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  lists: state
})

const mapDispatch = dispatch => {
  dispatch(getListsThunk())
  watchListADDEvent(dispatch)
  watchListRemoveEvent(dispatch)
  return {}
}

export default connect(mapState, mapDispatch)(App);