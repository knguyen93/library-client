import React, { Component } from "react";
import _ from 'lodash'
import PopupModel from "./PopupModel";
import { connect } from "react-redux";
import { fetchMembers, filterMember } from "../actions/memberActions";

class FindMemberPopup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            filter: '',
            selected: ''
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchMembers())
    }

    handleClose = (action) => {
        if ('ACCEPT' === action) {
            this.props.handleClose('SELECT_MEMBER', this.state.selected)
        } else {
            this.props.handleClose()
        }
    }

    onSelectMember = (member) => {
        this.setState({selected: member.memberId})
    }

    onSearch = () => {
        this.props.dispatch(filterMember(this.state.filter))
    }

    renderMember(member, idx) {
        const {selected} = this.state
        return (
            <tr key={idx} onClick={() => this.onSelectMember(member)} className={selected === member.memberId ? 'bg-info' : ''}>
                <td>{idx + 1}</td>
                <td>{member.fullName}</td>
                <td>{member.address}</td>
                <td>{member.phoneNumber}</td>
            </tr>
        )
    }

    renderBody() {
        const { members } = this.props
        return (
            <div className="d-flex flex-column">
                <div className="d-flex flex-row mb-4">
                    <input className="form-control col-6 mr-3"
                        name="memberId"
                        onChange={(evt) => this.setState({ filter: evt.target.value })}
                        placeholder="Enter Search String"></input>
                    <span className="btn btn-info" onClick={this.onSearch}>
                        <i className="fas fa-search"></i>
                    </span>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            _.isArray(members) && members.map((member, idx) => this.renderMember(member, idx))
                        }
                    </tbody>
                </table>
            </div>
        )
    }

    render() {
        const props = {
            show: true,
            title: 'Find Member',
            saveLabel: 'Accept',
            body: this.renderBody(),
            handleClose: this.handleClose,
            clazz: 'modal-lg'
        }
        return <PopupModel {...props}/>
    }
}

export default connect(mapStateToProps)(FindMemberPopup)

function mapStateToProps(state) {
    return {
        members: state.memberReducer.records
    }
}