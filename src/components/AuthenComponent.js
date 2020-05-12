import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";

class AuthenComponent extends Component {
    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="/" />
        }

        if (this.props.history.path === '/') {
            return <Redirect to="/book-management" />
        }

        return null
    }
}

export default withRouter(AuthenComponent)