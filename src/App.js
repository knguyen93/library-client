import React, { Component } from 'react';
import Nav from './components/Nav';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Checkout from './components/Checkout';
import BookManagement from './components/BookManagement';
import MemberManagement from './components/MemberManagement';
import Home from './components/Home';
import SideBar from './components/SideBar';
import LoadingComponent from './components/Loading';
import {connect} from 'react-redux'
import AuthenComponent from './components/AuthenComponent';
import ToastComponent from './components/ToastComponent';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isOpenSideBar: true
    }
  }

  toggleSideBar = () => {
    this.setState({ isOpenSideBar: !this.state.isOpenSideBar })
  }

  render() {
    return (
      <Router>
        <div className={"App d-flex " + (this.state.isOpenSideBar ? '' : 'togged')} id="wrapper">
          <ToastComponent/>
          <AuthenComponent {...this.props}/>
          <LoadingComponent/>
          <SideBar {...this.props}></SideBar>
          <div className="page-content-wrapper">
            <Nav toggleSideBar={this.toggleSideBar}></Nav>
            <div className="container-fluid">
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/checkout">
                  <Checkout />
                </Route>
                <Route path="/book-management">
                  <BookManagement />
                </Route>
                <Route path="/member-management">
                  <MemberManagement />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

export default connect(mapStateToProps)(App)

function mapStateToProps(state) {
  return {
      isAuthenticated: state.authReducer.isAuthenticated,
      permissions: state.authReducer.permissions
  }
}