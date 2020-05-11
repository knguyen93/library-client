import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class AuthenComponent extends Component {
    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="/" />
        }

        return <Redirect to="/book-management" />
    }
}