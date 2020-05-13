import React, { Component } from "react";
import _ from 'lodash'
import PopupModel from "./PopupModel";
import { connect } from "react-redux";

class FindMemberPopup extends Component {
    renderBody() {
        return (
            <div className="d-flex flex-column">
                <form>
                    <div className="form-group d-flex">
                        <label className="col-2" for="firstName">First Name <span className="text-danger">*</span></label>
                        <input type="firstName" id="firstName" className="form-control col-10" placeholder="Enter First Name"  required/>
                    </div>
                    <div className="form-group d-flex">
                        <label className="col-2" for="lastName">Last Name <span className="text-danger">*</span></label>
                        <input className="form-control col-10" id="lastName" placeholder="Enter Last Name"  required/>
                    </div>
                    <div className="form-group d-flex">
                        <label className="col-2" for="phone">Phone <span className="text-danger">*</span></label>
                        <input className="form-control col-10" id="phone" placeholder="Enter Phone Number"  required/>
                    </div>
                    <div className="form-group d-flex">
                        <label className="col-2" for="street">Street <span className="text-danger">*</span></label>
                        <input className="form-control col-10" id="street" placeholder="Enter Street" />
                    </div>
                    <div className="form-group d-flex align-items-center">
                        <label className="col-2" for="city">City <span className="text-danger">*</span></label>
                        <input className="form-control col-4" id="city" placeholder="Enter City"  required/>
                        <label className="col-2 text-right" for="state">State <span className="text-danger">*</span></label>
                        <input className="form-control col-4" id="state" placeholder="Enter State"  required/>
                    </div>
                    <div className="form-group d-flex mb-4">
                        <label className="col-2" for="zipcode">Zipcode <span className="text-danger">*</span></label>
                        <input className="form-control col-8" id="zipcode" placeholder="Enter Zipcode" required/>
                    </div>
                    <hr></hr>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary mr-2" type="submit">Submit</button>
                        <button className="btn btn-secondary">Close</button>
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