import React, { Component } from "react";

import { connect } from "react-redux";
import { addNewBook } from "../../actions/bookActions";

import PopupModel from "../PopupModel";

class AddBookPopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title:'',
            isbn:'',
            copieAvailable:0,
            maxCheckoutLength:0,
            succeed: false
        }

        // this.myForm = React.createRef();
        // const textInput = useRef(null);
    }

    onAddNewBook (evt) {
        console.log(1111111)
        // evt.preventDefault();
        let { title, isbn, copieAvailable, maxCheckoutLength } = this.state
        this.props.dispatch(addNewBook({ title, isbn, copieAvailable, maxCheckoutLength }))

    }

    onFieldChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]:value
        })
    }

    handleClose = (action) => {
        if ('ACCEPT' === action) {
            // this.myForm.current.submit()
            this.onAddNewBook()

        } else {
            this.props.handleClose()
        }
        // if (accept=='ACCEPT'){
        //     // this.form.submit()
        // }
        // this.setState({ isOpenPopup: false, popupName: '' })

    }
    

    render() {
        const props = {
            show: true,
            title: 'Add Book',
            saveLabel: 'Save',
            body: this.renderBody(),
            handleClose: this.handleClose,
            clazz: 'modal-lg'
        }
        return <PopupModel {...props} />
    }

    renderBody() {
        const { succeed, messages } = this.props
        console.log(333, succeed, messages)
        const {title, isbn, copieAvailable, maxCheckoutLength } = this.state
        return (
            <div className="" id="container">
                {succeed && <h3>2222</h3>}
                <div>
                    <span><b>Note:</b> Form fields marked with asterisk (*) are required.</span>
                </div>
                <br/>
                <form id="bookForm" onSubmit={this.onAddNewBook}>
                    <fieldset>             
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="title">*Book Title</label>                            
                                    <input id="title" name="title" type="text" className="form-control" onChange={this.onFieldChange} value={title} required autoFocus />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="isbn">*ISBN</label>                           
                                    <input id="isbn" name="isbn" type="text" className="form-control" onChange={this.onFieldChange} value={isbn} required />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="overdueFee">*Max Checkout Length</label>                            
                                    <input id="overdueFee" name="maxCheckoutLength" type="number" className="form-control"
                                        onChange={this.onFieldChange} value={maxCheckoutLength} required />
                                </div>
                            </div>
                        </div>
                        {/* <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="publisher">*Publisher</label>                            
                                    <input id="publisher" name="publisher" type="text" className="form-control"
                                        value="" required />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="datePublished">*Date Published</label>                            
                                    <input id="datePublished" name="datePublished" type="date" className="form-control"
                                        value="" required />
                                </div>
                            </div>
                        </div> */}
                        {/* <div className="row">
                            <div className="float-right">
                                <button id="modalBtnReset" type="reset" className="ml-4 btn btn-outline-secondary">Clear</button>
                                &nbsp;
                                <button id="modalBtnSaveBook" type="submit" className="btn btn-outline-primary" onClick={this.onAddNewBook}>Save Book</button>
                            </div>
                        </div> */}
                    </fieldset>
                </form>
            </div>

        )
    }
}


export default connect(mapStateToProps)(AddBookPopup)

function mapStateToProps(state) {
    return {
        // books: state.bookReducer.records
        // addbook:state
        succeed: state.bookReducer.succeed,
        messages: state.bookReducer.messages
    }
}