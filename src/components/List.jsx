import React, { Component } from 'react';
import { removeListFromFirebase } from '../Config/firebase';
import 'typeface-roboto';
import '../styles/List.css';
import PropTypes from 'prop-types';

class List extends Component{
    
    constructor(props){
        super(props);
        this.listContent = props.listContent;
        this.listId = props.listId;
        this.handleRemoveList = this.handleRemoveList.bind(this);
    }

    handleRemoveList(id){
        removeListFromFirebase(this.listId);
    }
    
    render(props){
        return(
            <div className="list fade-in">
                <span className="closebtn" 
                    onClick={() => this.handleRemoveList(this.listId)}>
                    &times;
                </span>
                <p className="listContent">{ this.listContent }</p>
            </div>
         )
    }
}

List.propTypes = {
    listContent: PropTypes.string
}

export default List;
