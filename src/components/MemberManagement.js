import React, { Component } from "react";
import { connect } from 'react-redux'
import { fetchMembers, filterMember } from '../actions/memberActions'
import PopupModel from './PopupModel'

class MemberManagement extends Component {

    constructor(props) {
        super(props)
        this.state = {
            filter: '',
            isOpenAddNew: false
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchMembers())
    }

    componentDidUpdate() {
        if (!this.props.memners && this.props.error) {
            setTimeout(() => this.props.dispatch(fetchMembers()), 8000)
        }
    }

    onFilterMember = () => {
        this.props.dispatch(filterMember(this.state.filter))
    }

    onAddNewMember = () => {
        this.setState({ isOpenAddNew: true })
    }

    handleCloseAddNewMember = () => {
        this.setState({ isOpenAddNew: false })
    }

    renderFilter() {
        return (
            <div className="card filter shadow border-0">
                <div className="card-header">
                    <span>Filter Members</span>
                </div>
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <div className="d-flex">
                            <input className="form-control col-9 mr-3" name="filterKeyword" onChange={(evt) => this.setState({ filter: evt.target.value })}></input>
                            <span className="btn btn-secondary" onClick={this.onFilterMember}>Search</span>
                        </div>
                        <div>
                            <span className="btn btn-info" onClick={this.onAddNewMember}>Add Member</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderMember(member, idx) {
        return (
            <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{member.fullName}</td>
                <td>{member.address}</td>
                <td>{member.phoneNumber}</td>
            </tr>
        )
    }

    renderPaging() {
        let items = [{ id: 1, active: true }, { id: 2 }, { id: 3 }]
        return (
            <div className="table-paging">
                <nav>
                    <ul className="pagination justify-content-end">
                        <li className="page-item disabled">
                            <span className="page-link" tabIndex="-1">Previous</span>
                        </li>
                        {
                            items.map((item, idx) => {
                                return (
                                    <li className={"page-item " + (item.active ? 'active' : '')} key={idx}>
                                        <span className="page-link" href="#">{item.id}</span>
                                    </li>
                                )
                            })
                        }
                        <li className="page-item disabled">
                            <span className="page-link" tabIndex="-1">Next</span>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }

    renderMembersList() {
        const { members } = this.props
        return (
            <div className="card book-list mt-4 shadow border-0">
                <div className="card-header">
                    <span>Members List</span>
                </div>
                <div className="card-body">
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
                                members && members.map((member, idx) => this.renderMember(member, idx))
                            }
                        </tbody>
                    </table>
                    {this.renderPaging()}
                </div>
            </div>
        )
    }

    renderPopup = () => {
        const { isOpenAddNew } = this.state

        if (!isOpenAddNew) return null

        const props = {
            show: isOpenAddNew,
            title: 'Add New Member',
            handleClose: this.handleCloseAddNewMember
        }

        return (
            <PopupModel {...props} />
        )
    }

    render() {
        return (
            <div className="MemberManagement">
                {this.renderFilter()}
                {this.renderMembersList()}
                {this.renderPopup()}
            </div>
        )
    }
}

export default connect(mapStateToProps)(MemberManagement)

function mapStateToProps(state) {
    return {
        members: state.memberReducer.records,
        error: state.memberReducer.error
    }
}