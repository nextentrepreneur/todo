import React, { Component } from 'react';
import 'typeface-roboto';
import '../styles/ListForm.css';
import { addListToFirebase }  from '../Config/firebase';

class ListForm extends Component{
    
    constructor(props){
        super(props);
        this.addList = this.addList.bind(this);
    }
    
   addList(e){
       e.preventDefault();
       addListToFirebase(e.target.list.value);
       e.target.list.value = '';
   }

    render(){
        return(
            <div className="formWrapper">
                <form onSubmit={this.addList}>
                    <input className="listInput" type="text" name="list"
                    placeholder="Add a new list..." />
                    <input className="listButton" type="submit" name="add list" />
                </form>
            </div>
        )
    }
}

export default ListForm;