import React, { Component } from "react";

export default class Checkout extends Component {

    renderCheckoutForm() {
        return (
            <div className="card filter shadow border-0">
                <div className="card-header">
                    <h4>Checkout</h4>
                </div>
                <div className="card-body">
                    <div className="d-flex flex-column">
                        <div className="d-flex flex-row mb-2">
                            <span className="col-2">Member ID:</span>
                            <input className="form-control col-6 mr-3" name="memberId"></input>
                            <span className="btn btn-info"><i className="fas fa-search"></i></span>
                        </div>
                        <div className="d-flex flex-row">
                            <span className="col-2">ISBN:</span>
                            <input className="form-control col-6 mr-3" name="isbn"></input>
                            <span className="btn btn-info"><i className="fas fa-search"></i></span>
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
        const {checkoutRecords} = this.props
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
            </div>
        )
    }
};