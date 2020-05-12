import React, { Component } from "react";
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { login } from '../actions/memberActions'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    onLogin = (evt) => {
        evt.preventDefault()
        const { username, password } = this.state
        this.props.dispatch(login({ username, password }))
    }

    render() {
        return (
            <div className="Home d-flex justify-content-center">
                <div className="login-form d-flex flex-column col-6">
                    <form onSubmit={this.onLogin}>
                        <div className="text-center">
                            <h1>Login</h1>
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="username" className="form-control" id="username" placeholder="Enter username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Password" />
                        </div>
                        <button className="btn btn-primary" type="submit">Login</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(withRouter(Home))

function mapStateToProps(state) {
    return state
} 