import React, { Component } from 'react';
import '../scss/nav.scss';

export default class Nav extends Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom justify-content-start mb-3">
                <span className="btn btn-secondary toggle-button" id="menu-toggle" onClick={this.props.toggleSideBar}>
                    <i className="fas fa-bars"></i>
                </span>
                <span className="navbar-brand ml-3">Library Management</span>
            </nav>
        )
    }
}