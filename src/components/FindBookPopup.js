import React, { Component } from "react";
import _ from 'lodash'
import PopupModel from "./PopupModel";
import { connect } from "react-redux";
import { fetchBooks,  filterBook} from "../actions/bookActions";

class FindBookPopup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            filter: '',
            selected: ''
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchBooks())
    }

    handleClose = (action) => {
        if ('ACCEPT' === action) {
            this.props.handleClose('SELECT_BOOK', this.state.selected)
        } else {
            this.props.handleClose()
        }
    }

    onSelectBook = (book) => {
        this.setState({ selected: book.isbn })
    }

    onSearch = () => {
        this.props.dispatch(filterBook(this.state.filter))
    }

    renderBook(book, idx) {
        const {selected} = this.state
        return (
            <tr key={idx} onClick={() => this.onSelectBook(book)} className={selected === book.isbn ? 'bg-info' : ''}>
                <td>{idx + 1}</td>
                <td>{book.title}</td>
                <td>{book.isbn}</td>
                <td>{book.authors[0].fullName}</td>
                <td>{book.maxCheckoutLength}</td>
                <td>{book.copieAvailable}</td>
            </tr>
        )
    }

    renderBody() {
        const { books } = this.props
        return (
            <div className="d-flex flex-column">
                <div className="d-flex flex-row mb-4">
                    <input className="form-control col-6 mr-3"
                        name="isbn"
                        onChange={(evt) => this.setState({ filter: evt.target.value })}
                        placeholder="Enter Search String"></input>
                    <span className="btn btn-info shadow" onClick={this.onSearch}>
                        <i className="fas fa-search"></i>
                    </span>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">ISBN</th>
                            <th scope="col">Authors</th>
                            <th scope="col">Period</th>
                            <th scope="col">Available Copies</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            _.isArray(books) && books.map((book, idx) => this.renderBook(book, idx))
                        }
                    </tbody>
                </table>
            </div>
        )
    }

    render() {
        const props = {
            show: true,
            title: 'Find Book',
            saveLabel: 'Accept',
            body: this.renderBody(),
            handleClose: this.handleClose,
            clazz: 'modal-lg'
        }
        return <PopupModel {...props} />
    }
}

export default connect(mapStateToProps)(FindBookPopup)

function mapStateToProps(state) {
    return {
        books: state.bookReducer.records?.filter(book => book.copieAvailable > 0)
    }
}