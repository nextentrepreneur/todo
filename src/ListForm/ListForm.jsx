import React, { Component } from 'react';
import 'typeface-roboto';
import Button from '@material-ui/core/Button';
import './ListForm.css';

class ListForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            newListContent: '',
        };
        this.handleUserInput = this.handleUserInput.bind(this);
        this.writeList = this.writeList.bind(this);

    }

    // When the user input changes, set the newListContent
    // to the value of what's in the input box.
    handleUserInput(e){
        this.setState({
            newListContent: e.target.value,     // the value of the text input
        })
    }

    writeList(){
        // call a method that sets the listcontent for a list to
        // the value of input
        this.props.addList(this.state.newListContent);
        // Set newListContent back to an empty string.
        this.setState({
            newListContent: '',
        })
    }

    render(){
        return(
            <div className="formWrapper">
                <input className="listInput"
                placeholder="Add new item"
                value={this.state.newListContent}
                onChange={this.handleUserInput} />
                <button className="listButton"
                onClick={this.writeList}>Add Item</button>
            </div>
        )
    }
}

export default ListForm;