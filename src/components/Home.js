import React, { Component } from "react";

export default class Home extends Component {
    render() {
        return (
            <div className="Home d-flex justify-content-center">
                <div className="login-form d-flex flex-column col-6">
                    <div className="text-center">
                        <h1>Login</h1>
                    </div>
                    <div className="form-group">
                        <label for="username">Username</label>
                        <input type="username" className="form-control" id="username" placeholder="Enter username" />
                    </div>
                    <div className="form-group">
                        <label for="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </div>
        )
    }
};