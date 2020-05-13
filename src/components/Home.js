import React, { Component } from "react";
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { login } from '../actions/memberActions'
import _ from 'lodash'
import { Carousel } from 'react-bootstrap'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            password: '',
            images: [
                'https://library.miu.edu/wp-content/uploads/sites/12/2019/11/IMG_0230-860x500.jpg',
                'https://library.miu.edu/wp-content/uploads/sites/12/2019/05/PicsArt_05-15-08.09.41-860x500.jpg',
                'https://library.miu.edu/wp-content/uploads/sites/12/2019/11/IMG_0241-860x500.jpg',
                'https://library.miu.edu/wp-content/uploads/sites/12/2019/11/IMG_0248-860x500.jpg'
            ]
        }
    }

    onLogin = (evt) => {
        evt.preventDefault()
        const { userName, password } = this.state
        this.props.dispatch(login({ userName, password }))
    }

    renderCarousel() {
        return (
            <Carousel>
                {
                    _.map(this.state.images, (img, idx) => {
                        return (
                            <Carousel.Item key={idx}>
                                <img src={img} className="d-block" alt=""/>
                                <Carousel.Caption>
                                    <h5 className="text-info">Image from https://library.miu.edu/</h5>
                                </Carousel.Caption>
                            </Carousel.Item>
                        )
                    })
                }
            </Carousel>
        )
    }

    renderHome() {
        return (
            <div className="mt-5 text-info">
                <h4>Welcome to Maharishi International University Library System</h4>
                <div className="mt-3">
                    {this.renderCarousel()}
                </div>
            </div>
        )
    }

    renderLoginForm() {
        return (
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
        )
    }

    render() {
        return (
            <div className="Home d-flex justify-content-center text-center">
                {this.props.isAuthenticated ? this.renderHome() : this.renderLoginForm()}
            </div>
        )
    }
}

export default connect(mapStateToProps)(withRouter(Home))

function mapStateToProps(state) {
    return state
} 