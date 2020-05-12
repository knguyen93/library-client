import React, { Component } from "react"
import { connect } from 'react-redux'
import { fetchBooks } from '../actions/bookActions'
// import PopupModel from './PopupModel'
import AddBookPopup from './book/AddBookPopup'

class BookManagement extends Component {

    constructor(props) {
        super(props)
        this.state = {
            filter: '',
            isOpenAddNew: false
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchBooks())
    }

    onAddBook = () => {
        this.setState({ isOpenAddNew: true })
    }

    handleCloseAddBook = () => {
        this.setState({ isOpenAddNew: false })
    }

    renderFilter() {
        return (
            <div className="card filter shadow border-0">
                <div className="card-header">
                    <span>Filter Books</span>
                </div>
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <div className="d-flex">
                            <input className="form-control col-9 mr-3" name="filterKeyword"></input>
                            <span className="btn btn-secondary">Search</span>
                        </div>
                        <div>
                            <span className="btn btn-info" onClick={this.onAddBook}>Add Book</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderBook(book, idx) {
        let {title, isbn, maxCheckoutLength, copieAvailable} = book
        return (
            <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{title}</td>
                <td>{isbn}</td>
                <td>{maxCheckoutLength}</td>
                <td>{copieAvailable}</td>
                <td>
                    <span className="btn btn-secondary" title="Add Copy"><i className="fas fa-copy"></i></span>
                </td>
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
                                        <span className="page-link" >{item.id}</span>
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

    renderBooksList() {
        const { books } = this.props
        return (
            <div className="card book-list mt-4 shadow border-0">
                <div className="card-header">
                    <span>Books List</span>
                </div>
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">ISBN</th>
                                <th scope="col">Max Checkout Length</th>
                                <th scope="col">Available Copies</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                books && books.map((book, idx) => this.renderBook(book, idx))
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

        // const props = {
        //     show: isOpenAddNew,
        //     title: 'Add New Book',
        //     handleClose: this.handleCloseAddBook
        // }

        
        return <AddBookPopup  {...{ handleClose: this.handleCloseAddBook }} />
        
    }

    render() {
        return (
            <div className="BookManagement">
                <div className="content">
                    {this.renderFilter()}
                    {this.renderBooksList()}
                    {this.renderPopup()}
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(BookManagement)

function mapStateToProps(state) {
    return {
        books: state.bookReducer.records,
        isLoading: state.bookReducer.isLoading
    }
}