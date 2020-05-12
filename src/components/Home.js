import React, { Component } from "react";
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { login } from '../actions/memberActions'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            password: ''
        }
    }

    onLogin = (evt) => {
        evt.preventDefault()
        const { userName, password } = this.state
        this.props.dispatch(login({ userName, password }))
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
                            <label htmlFor="userName">Username</label>
                            <input className="form-control"
                                id="userName" placeholder="Enter username" required
                                onChange={(evt) => this.setState({ userName: evt.target.value })} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control"
                                id="password" placeholder="Password" required
                                onChange={(evt) => this.setState({ password: evt.target.value })} />
                        </div>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-primary" type="submit">Login</button>
                        </div>
                    </form>
                    <div className="d-flex flex-column mt-5 bg-light">
                        <h4>Test users</h4>
                        <span>admin/12345</span>
                        <span>superadmin/12345</span>
                        <span>librarian/12345</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(withRouter(Home))

function mapStateToProps(state) {
    return state
} 