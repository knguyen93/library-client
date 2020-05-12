import React, { Component } from "react";
import FindMemberPopup from "./FindMemberPopup";
import FindBookPopup from "./FindBookPopup";
import { processCheckout, selectBook, selectMember, fetchCheckoutRecords } from '../actions/memberActions'
import { connect } from "react-redux";

const POPUPS = {
    FIND_MEMBER: 'FIND_MEMBER',
    FIND_BOOK: 'FIND_BOOK'
}

class Checkout extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isOpenPopup: false,
            popupName: '',
        }
    }

    isValid() {
        const { memberId, isbn } = this.props.checkout
        return memberId && isbn
    }

    openPopup = (popupName) => {
        this.setState({ isOpenPopup: true, popupName })
    }

    onCheckout = () => {
        const { memberId, isbn } = this.props.checkout
        this.props.dispatch(processCheckout({ isbn, memberId }))
    }

    handleClosePopup = (action, value) => {
        switch (action) {
            case 'SELECT_MEMBER':
                this.props.dispatch(selectMember(value))
                this.props.dispatch(fetchCheckoutRecords(value))
                this.setState({ isOpenPopup: false, popupName: '' })
                break
            case 'SELECT_BOOK':
                this.props.dispatch(selectBook(value))
                this.setState({ isOpenPopup: false, popupName: '' })
                break
            default:
                this.setState({ isOpenPopup: false, popupName: '' })

        }
    }

    renderPopup = () => {
        const { isOpenPopup, popupName } = this.state

        if (!isOpenPopup) return null

        if (POPUPS.FIND_BOOK === popupName) {
            return <FindBookPopup  {...{ handleClose: this.handleClosePopup }} />
        }

        return <FindMemberPopup {...{ handleClose: this.handleClosePopup }} />
    }

    renderCheckoutForm() {
        const { memberId, isbn } = this.props.checkout
        return (
            <div className="card filter shadow border-0">
                <div className="card-header">
                    <h4>Checkout</h4>
                </div>
                <div className="card-body">
                    <div className="d-flex flex-column">
                        <div className="d-flex flex-row mb-2">
                            <span className="col-2">Member ID:</span>
                            <input className="form-control col-6 mr-3" name="memberId" disabled value={memberId}></input>
                            <span className="btn btn-info" onClick={() => this.openPopup(POPUPS.FIND_MEMBER)}>
                                <i className="fas fa-search"></i>
                            </span>
                        </div>
                        <div className="d-flex flex-row">
                            <span className="col-2">ISBN:</span>
                            <input className="form-control col-6 mr-3" name="isbn" disabled value={isbn}></input>
                            <span className="btn btn-info" onClick={() => this.openPopup(POPUPS.FIND_BOOK)}>
                                <i className="fas fa-search"></i>
                            </span>
                        </div>
                        <div className="d-flex justify-content-end mt-4">
                            <button className="btn btn-primary" onClick={this.onCheckout} disabled={!this.isValid()}>Check out</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderCheckoutEntry(checkoutEntry, idx) {
        const { book, checkoutDate, overDue, returnDueDate } = checkoutEntry
        return (
            <tr>
                <td>{idx}</td>
                <td>{book.title}</td>
                <td>{book.isbn}</td>
                <td>{checkoutDate?.substring(0,10)}</td>
                <td>{returnDueDate?.substring(0,10)}</td>
                <td><span className={overDue ? 'overdue' : ''}></span></td>
            </tr>
        )
    }

    renderCheckoutHistory() {
        const { checkoutRecord } = this.props
        return (
            <div className="card checkout-records mt-4 shadow border-0">
                <div className="card-header">
                    <h4>Checkout History</h4>
                </div>
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Book</th>
                                <th scope="col">ISBN</th>
                                <th scope="col">Checkout Date</th>
                                <th scope="col">Due Date</th>
                                <th>Overdue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                checkoutRecord?.checkoutEntries?.map((record, idx) => this.renderCheckoutEntry(record, idx))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="Checkout">
                {this.renderCheckoutForm()}
                {this.renderCheckoutHistory()}
                {this.renderPopup()}
            </div>
        )
    }
}

export default connect(mapStateToProps)(Checkout)

function mapStateToProps(state) {
    const { records, checkout, checkoutRecord } = state.memberReducer
    return {
        members: records,
        checkout: checkout ? checkout : { memberId: '', isbn: '' },
        checkoutRecord
    }
}