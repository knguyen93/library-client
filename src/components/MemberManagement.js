import React, { Component } from "react";
import { connect } from 'react-redux'
import { fetchMembers, filterMember, updatePaging } from '../actions/memberActions'
import _ from 'lodash'
import AddMemberPopup from "./AddMemberPopup";

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
                            <span className="btn btn-secondary shadow" onClick={this.onFilterMember}>Search</span>
                        </div>
                        <div>
                            <span className="btn btn-info shadow" onClick={this.onAddNewMember}>Add Member</span>
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
                <td>{member.address.city}, {member.address.state}, {member.address.zip}</td>
                <td>{member.phoneNumber}</td>
            </tr>
        )
    }

    renderPaging() {
        const totalPage = Math.ceil(this.props.members.length / 10)
        const hasNext = this.props.pageNo < totalPage
        const hasPrevious = this.props.pageNo > 1
        return (
            <div className="table-paging">
                <nav>
                    <ul className="pagination justify-content-end pagination-sm">
                        <li className={"page-item " + (!hasPrevious ? 'disabled' : '')}
                            onClick={() => hasPrevious && this.props.dispatch(updatePaging(this.props.pageNo - 1))}>
                            <span className="page-link" tabIndex="-1">Previous</span>
                        </li>
                        {
                            _.range(1, totalPage + 1, 1).map((item, idx) => {
                                const isActive = this.props.pageNo === item
                                return (
                                    <li className={"page-item " + (isActive ? 'active' : '')} key={idx}
                                        onClick={() => this.props.dispatch(updatePaging(item))}>
                                        <span className="page-link" >{item}</span>
                                    </li>
                                )
                            })
                        }
                        <li className={"page-item " + (!hasNext ? 'disabled' : '')}
                            onClick={() => hasNext && this.props.dispatch(updatePaging(this.props.pageNo + 1))}>
                            <span className="page-link" tabIndex="-1">Next</span>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }

    renderMembersList() {
        const { members, pageNo } = this.props
        const start = (pageNo - 1) * 10
        const end = (members?.length - start) > 10 ? 10 : (members?.length - start)
        const visibleMembers = _.slice(members, start, start + end)
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
                                visibleMembers?.map((member, idx) => this.renderMember(member, idx))
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
            <AddMemberPopup {...props} />
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
        error: state.memberReducer.error,
        pageNo: state.memberReducer.pageNo || 1
    }
}