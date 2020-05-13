import React, { Component } from 'react';
import '../scss/nav.scss';

export default class Nav extends Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom justify-content-between mb-3 border-0">
                <div className="d-flex justify-content-start">
                    <span className="btn btn-secondary toggle-button" id="menu-toggle" onClick={this.props.toggleSideBar}>
                        <i className="fas fa-bars"></i>
                    </span>
                    <span className="navbar-brand ml-3">Library Management</span>
                </div>
                <div className="d-flex justify-content-end">
                    { this.props.fullName ?  (<h5 className="text-info">Welcome, {this.props.fullName}</h5>) : null}
                </div>
            </nav>
        )
    }
}