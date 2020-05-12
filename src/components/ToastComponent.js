import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { removeToast } from '../actions/toastActions'
import ToastMessage from './ToastMessage'

class ToastComponent extends Component {

    onTimeOut = (item) => {
        setTimeout(() => this.props.dispatch(removeToast(item.id)), 5000)
    }

    onClickRemove = (item) => {
        this.props.dispatch(removeToast(item.id))
    }

    renderItems() {
        const { items } = this.props
        return (
            <div className="toasts">
                {
                    _.map(items, (item, idx) => {
                        return <ToastMessage {...{item, remove: this.onClickRemove}} key={idx}/>
                    })
                }
            </div>
        )
    }

    render() {
        return (
            <div className="toast-container">
                {this.renderItems()}
            </div>
        )
    }
}

export default connect(mapStateToProps)(ToastComponent)

function mapStateToProps(state) {
    return {
        items: state.toastReducer.items
    }
}