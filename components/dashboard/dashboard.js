import React from 'react';
import {render} from 'react-dom';

import List from './list.js';
import Trip from './form.js';

var Dashboard = React.createClass({
    
    getInitialState() {
        return {
            currentTab: 'list',
            trips: [],
            editTrip: {},
            formAction: 'Add',
        };
    },
    
    componentDidMount() {
        this.setState({
            trips: this.props.trips
        });
    },
    
    handleAdd(trip) {
        var _this = this;
        $.ajax({
            url: '/trip/new',
            type: 'POST',
            data: trip,
            success: function(data) {
                _this.setState({trips: data});
                _this.setState({currentTab: 'list'});
            }
        });
    },
    
    handleEdit(trip) {
        this.setState({
            editTrip: trip,
            formAction: 'Edit',
            currentTab: 'form',
        });
    },
    
    submitEdit(trip) {
        var _this = this;
        $.ajax({
            url: '/trip/' + trip._id,
            type: 'PUT',
            data: trip,
            success: function(data) {
                _this.setState({
                    trips: data,
                    currentTab: 'list',
                    formAction: 'Add',
                    editTrip: {},
                });
            }
        });
    },
    
    handleDelete(id) {
        var _this = this;
        $.ajax({
            url: '/trip/' + id,
            type: 'DELETE',
            success: function(data) {
                _this.setState({trips: data});
            }
        });
    },
    
    changeTab(e) {
        var tab = e.target.name;
        if (tab == 'list') {
            this.setState({
                formAction: 'Add',
                editTrip: {},
            });
        }
        this.setState({currentTab: tab});
    },
    
    renderActiveTab(tab) {
        return (this.state.currentTab == tab) ? 'is-active' : '';
    },

    render(){
        return(
            <div className="container">
                <div className="tabs is-centered">
                    <ul>
                        <li className={this.renderActiveTab('list')}><a onClick={this.changeTab} name="list">List</a></li>
                        <li className={this.renderActiveTab('form')}><a onClick={this.changeTab} name="form">{this.state.formAction}</a></li>
                    </ul>
                </div>
                { (this.state.currentTab == 'form') ? <Trip submitEdit={this.submitEdit} handleAdd={this.handleAdd} editTrip={this.state.editTrip} /> : '' }
                { (this.state.currentTab == 'list') ? <List trips={this.state.trips} handleEdit={this.handleEdit} handleDelete={this.handleDelete} /> : '' }
            </div>
        );
    }
});

render(<Dashboard trips={trips} />, document.getElementById("dashboard"));