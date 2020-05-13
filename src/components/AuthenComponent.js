import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import * as urlConfig from '../config/urlConfig'

class AuthenComponent extends Component {
    render() {
        if (!this.props.isAuthenticated 
            || !urlConfig.isAllowToAccessPath(this.props.history.location.pathname, this.props.permissions)) {
            return <Redirect to="/" />
        }
        return null
    }
}

export default withRouter(AuthenComponent)