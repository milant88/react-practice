/*
 StorePicker
 <StorePicker/>
 */

import React from 'react';
import { Navigation } from 'react-router';
var ReactRouter = require('react-router');
import h from '../helpers';
var History = ReactRouter.History;

var StorePicker = React.createClass({

    mixins : [History],

    goToStore : function(event) {
        event.preventDefault();
        //get the data from input
        var storeId = this.refs.storeId.value;
        this.history.pushState(null, '/store/' + storeId);
        // transition from <StorePicker/> to <App/>
    },

    render : function() {

        var name = 'wes';

        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>Please Enter A Store {name}</h2>
                <input type="text" ref="storeId" defaultValue={h.getFunName()} required/>
                <input type="Submit" />
            </form>
        );
    }
});

export default StorePicker;