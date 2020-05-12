import React, { Component } from "react";
import '../scss/side-bar.scss'
import { withRouter } from 'react-router-dom'
import { logout } from '../actions/memberActions'
import _ from 'lodash'

class SideBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [
                { id: 1, link: '/', label: 'Home', active: true, permissions: ['GUEST'] },
                { id: 2, link: '/member-management', label: 'Member Management', permissions: ['UPDATE_MEMBER', 'DELETE_MEMBER', 'ADD_MEMBER'] },
                { id: 3, link: '/book-management', label: 'Book Management', permissions: ['ADD_BOOK'] },
                { id: 4, link: '/checkout', label: 'Checkout', permissions: ['CHECKOUT_BOOK'] },
                { link: 'logout', label: 'Logout', permissions: ['UPDATE_MEMBER', 'ADD_BOOK', 'CHECKOUT_BOOK'] }
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

    isAllow(requiredPermissions) {
        const { permissions } = this.props

        let arr = requiredPermissions.filter(p => _.findIndex(permissions, up => up === p) > -1)
        return !_.isEmpty(arr)
    }

    renderMenus() {
        const { items } = this.state

        const filterItems = items.filter(item => this.isAllow(item.permissions))

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