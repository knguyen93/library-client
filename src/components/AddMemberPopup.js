import React, { Component } from "react";
import _ from 'lodash'
import PopupModel from "./PopupModel";
import { connect } from "react-redux";

class FindMemberPopup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            state: '',
            zip: '',
            city: '',
            street: ''
        }
    }

    onSaveNewMember = (evt) => {
        evt.preventDefault()
        this.props.handleClose('ACCEPT', {...this.state})
    }

    renderBody() {
        return (
            <div className="d-flex flex-column">
                <form onSubmit={this.onSaveNewMember}>
                    <div className="form-group d-flex">
                        <label className="col-2" htmlFor="firstName">First Name <span className="text-danger">*</span></label>
                        <input type="firstName" id="firstName" className="form-control col-10"
                            onChange={(evt) => this.setState({ firstName: evt.target.value })}
                            placeholder="Enter First Name" required />
                    </div>
                    <div className="form-group d-flex">
                        <label className="col-2" htmlFor="lastName">Last Name <span className="text-danger">*</span></label>
                        <input className="form-control col-10" id="lastName" placeholder="Enter Last Name"
                            onChange={(evt) => this.setState({ lastName: evt.target.value })} required />
                    </div>
                    <div className="form-group d-flex">
                        <label className="col-2" htmlFor="phone">Phone <span className="text-danger">*</span></label>
                        <input className="form-control col-10" id="phone" placeholder="Enter Phone Number" minLength="10"
                            onChange={(evt) => this.setState({ phoneNumber: evt.target.value })} required />
                    </div>
                    <div className="form-group d-flex">
                        <label className="col-2" htmlFor="street">Street <span className="text-danger">*</span></label>
                        <input className="form-control col-10" id="street" placeholder="Enter Street"
                            onChange={(evt) => this.setState({ street: evt.target.value })} />
                    </div>
                    <div className="form-group d-flex align-items-center">
                        <label className="col-2" htmlFor="city">City <span className="text-danger">*</span></label>
                        <input className="form-control col-4" id="city" placeholder="Enter City"
                            onChange={(evt) => this.setState({ city: evt.target.value })} required />
                        <label className="col-2 text-right" htmlFor="state">State <span className="text-danger">*</span></label>
                        <input className="form-control col-4" id="state" placeholder="Enter State"
                            onChange={(evt) => this.setState({ state: evt.target.value })} required />
                    </div>
                    <div className="form-group d-flex mb-4">
                        <label className="col-2" htmlFor="zipcode">Zipcode <span className="text-danger">*</span></label>
                        <input className="form-control col-8" id="zipcode" type="number" placeholder="Enter Zipcode" 
                        onChange={(evt) => this.setState({zip: evt.target.value})} required />
                    </div>
                    <hr></hr>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary mr-2" type="submit">Submit</button>
                        <button className="btn btn-secondary" onClick={this.props.handleClose}>Close</button>
                    </div>
                </form>
            </div>
        )
    }

    render() {
        const props = {
            ...this.props,
            body: this.renderBody(),
            clazz: 'modal-lg',
            noFooter: true
        }
        return <PopupModel {...props} />
    }
}

export default connect(mapStateToProps)(FindMemberPopup)

function mapStateToProps(state) {
    return {
        member: state.memberReducer.newMember
    }
}