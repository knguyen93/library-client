import React, { Component } from "react";
import { connect } from 'react-redux'
import { fetchBooks } from '../actions/bookActions'

class BookManagement extends Component {

    componentDidMount() {
        this.props.dispatch(fetchBooks())
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
                            <span className="btn btn-info">Add Book</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderBook(book, idx) {
        return (
            <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{book.title}</td>
                <td>{book.isbn}</td>
                <td>{book.publisher}</td>
                <td>{book.datePublished}</td>
                <td>{book.available}</td>
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
                                <th scope="col">Publisher</th>
                                <th scope="col">Public Date</th>
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

    render() {
        return (
            <div className="BookManagement">
                <div className="content">
                    {this.renderFilter()}
                    {this.renderBooksList()}
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