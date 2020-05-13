import React, { Component } from "react";
import '../scss/side-bar.scss'
import { withRouter } from 'react-router-dom'
import { logout } from '../actions/memberActions'
import * as urlConfig from '../config/urlConfig'

class SideBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: []
        }
    }

    isActive = (item) => {
        const { history: { location: { pathname } } } = this.props
        return item.link === pathname
    }

    onClickLink = (item) => {
        if (item.link === 'logout') {
            this.props.dispatch(logout())
        } else {
            this.props.history.push(item.link)
        }
    }

    renderNav() {
        return (
            <div className="nav d-sm-none d-md-block d-lg-none">
                <nav className="navbar navbar-expand-lg">
                    <span className="navbar-brand">Library Management</span>
                </nav>
            </div>
        )
    }

    renderMenus() {
        const items = urlConfig.getAvailableURLs(this.props.permissions)

        return (
            items.map((item, idx) => {
                const isActive = this.isActive(item)
                return (
                    <li className={"nav-item " + (isActive ? 'active' : '')} key={idx} onClick={() => this.onClickLink(item)}>
                        <span className={"nav-link " + (isActive ? 'active' : '')}>{item.label}</span>
                    </li>
                )
            })
        )

    }

    render() {
        return (
            <div className="side-bar d-none d-lg-block" id="sidebar-wrapper">
                <nav className="">
                    <div className="sidebar-heading"></div>
                    <ul className="nav flex-column flex-nowrap">
                        {this.renderMenus()}
                    </ul>
                </nav>
            </div>
        )
    }
}

export default withRouter(SideBar)