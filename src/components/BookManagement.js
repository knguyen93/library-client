import React, { Component, useState, useEffect } from "react"
import { connect, useDispatch } from 'react-redux'
import { fetchBooks, addBookCopy, updatePaging, filterBook } from '../actions/bookActions'
import AddBookPopup from './book/AddBookPopup'
import _ from 'lodash'

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

    handleCloseAddBook = (update=false) => {
        this.setState({ isOpenAddNew: false })
        
        if (update)
            this.props.dispatch(fetchBooks())
    }

    componentDidUpdate() {
        if (!this.props.books && this.props.error) {
            setTimeout(() => this.props.dispatch(fetchBooks()), 8000)
        }
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
                            <input className="form-control col-9 mr-3" name="filterKeyword"
                                onChange={(evt) => this.setState({ filter: evt.target.value })}>

                            </input>
                            <span className="btn btn-secondary shadow"
                                onClick={() => this.props.dispatch(filterBook(this.state.filter))}>Search</span>
                        </div>
                        <div>
                            <span className="btn btn-info shadow" onClick={this.onAddBook}>Add Book</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderBook(book, idx) {
        let { title, isbn, maxCheckoutLength, copieAvailable } = book
        return (
            <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{title}</td>
                <td>{isbn}</td>
                <td>{maxCheckoutLength}</td>
                <td>{copieAvailable}</td>
                <td>
                    <BookCopyCell {...{ book }} />
                </td>
            </tr>
        )
    }

    renderPaging() {
        const totalPage = Math.ceil(this.props.books.length / 10)
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

    renderBooksList() {
        const { books, pageNo } = this.props
        const start = (pageNo - 1) * 10
        const end = (books?.length - start) > 10 ? 10 : (books?.length - start)
        const visibleBooks = _.slice(books, start, start + end)
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
                                <th scope="col">Period</th>
                                <th scope="col">Available</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                visibleBooks?.map((book, idx) => this.renderBook(book, idx))
                            }
                        </tbody>
                    </table>
                    {this.renderPaging()}
                </div>
            </div>
        )
    }
    renderPopup = () => {
        return this.state.isOpenAddNew
            ? <AddBookPopup  {...{ handleClose: this.handleCloseAddBook }} />
            : null

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
        isLoading: state.bookReducer.isLoading,
        pageNo: state.bookReducer.pageNo || 1
    }
}

const BookCopyCell = ({ book }) => {
    const [isAddCopy, setIsAddCopy] = useState(false)
    const [numCopies, setNumCopies] = useState(0)
    const dispatch = useDispatch()

    useEffect(() => {
        setIsAddCopy(false)
        setNumCopies(0)
    }, [book])

    return (
        <div className="add-copy-container d-flex">
            {
                isAddCopy
                    ? (
                        <>
                            <input name="copyNum" type="number" className="form-control mr-3 copy-num" onChange={(evt) => setNumCopies(evt.target.value)} />
                            <span className={"btn btn-primary shadow " + (numCopies > 0 ? '' : 'disabled')} title="Add Copy" value={numCopies}
                                onClick={() => (numCopies > 0 ) && dispatch(addBookCopy(book.isbn, numCopies))}>
                                <i className="fas fa-save"></i>
                            </span>
                        </>
                    )
                    : (
                        <span className="btn btn-secondary shadow" title="Add Copy" onClick={() => setIsAddCopy(true)}>
                            <i className="fas fa-copy"></i>
                        </span>
                    )
            }
        </div>
    )
}