import React, { Component } from "react";
import '../scss/side-bar.scss'
import { withRouter } from 'react-router-dom'
import {logout} from '../actions/memberActions'

class SideBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [
                { id: 1, link: '/', label: 'Home', active: true, roles: ['GUEST', 'MEMBER']},
                { id: 2, link: '/member-management', label: 'Member Management', roles: ['MEMBER']},
                { id: 3, link: '/book-management', label: 'Book Management', roles: ['MEMBER']},
                { id: 4, link: '/checkout', label: 'Checkout', roles: ['MEMBER']},
                { link: 'logout', label: 'Logout', roles: ['MEMBER']}
            ]
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
        const { items } = this.state
        const {role} = this.props

        const filterItems = items.filter(item => item.roles.indexOf(role) > -1)

        return (
            filterItems.map((item, idx) => {
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