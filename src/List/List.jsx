import React, { Component } from 'react';
import 'typeface-roboto';
import './List.css';
import PropTypes from 'prop-types';

class List extends Component{
    
    constructor(props){
        super(props);
        this.listContent = props.listContent;
        this.listId = props.listId;
        }

        render(props){
            return(
                <div className="list fade-in">
                    <p className="listContent">{ this.listContent }</p>
                </div>
            )
        }
}

List.PropTypes = {
    listContent: PropTypes.string
}

export default List;
