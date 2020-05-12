import React, { Component } from "react";
import FindMemberPopup from "./FindMemberPopup";
import FindBookPopup from "./FindBookPopup";

const POPUPS = {
    FIND_MEMBER: 'FIND_MEMBER',
    FIND_BOOK: 'FIND_BOOK'
}

export default class Checkout extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isOpenPopup: false,
            popupName: '',
            isbn: '',
            memberId: ''
        }
    }

    openPopup = (popupName) => {
        this.setState({ isOpenPopup: true, popupName })
    }

    handleClosePopup = (action, value) => {
        switch (action) {
            case 'SELECT_MEMBER':
                this.setState({ isOpenPopup: false, popupName: '', memberId: value })
                break
            case 'SELECT_BOOK':
                this.setState({ isOpenPopup: false, popupName: '', isbn: value })
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
        const { memberId, isbn } = this.state
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
                            <span className="btn btn-primary">Check out</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderCheckoutRecord(member, idx) {
        return (
            <tr>

            </tr>
        )
    }

    renderCheckoutHistory() {
        const { checkoutRecords } = this.props
        return (
            <div className="card book-list mt-4 shadow border-0">
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
                            </tr>
                        </thead>
                        <tbody>
                            {
                                checkoutRecords && checkoutRecords.map((record, idx) => this.renderCheckoutRecord(record, idx))
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
};