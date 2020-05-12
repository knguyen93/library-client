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
            maxCheckoutLength:0
        }

        this.form = null

        this.formRef = el => {
            this.form = el
        }
    }

    onAddNewBook = (evt) => {
        evt.preventDefault();
        let { title, isbn, copieAvailable, maxCheckoutLength } = this.state
        this.props.dispatch(addNewBook({ title, isbn, copieAvailable, maxCheckoutLength }))

    }

    handleClose = (action) => {
        if ('ACCEPT' === action) {
            
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
        const {title, isbn, copieAvailable, maxCheckoutLength } = this.state
        return (
            <div className="" id="container">
                <div>
                    <span><b>Note:</b> Form fields marked with asterisk (*) are required.</span>
                </div>
                <br/>
                <form id="bookForm" ref={this.formRef} onSubmit={this.onAddNewBook}>
                    <fieldset>             
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="title">*Book Title</label>                            
                                    <input id="title" name="title" type="text" className="form-control" value={title} required autoFocus />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="isbn">*ISBN</label>                           
                                    <input id="isbn" name="isbn" type="text" className="form-control" value={isbn} required />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="overdueFee">*Max Checkout Length</label>                            
                                    <input id="overdueFee" name="overdueFee" type="text" className="form-control"
                                        aria-describedby="overdueFeeHelp" placeholder="0.00"
                                        pattern="^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$"
                                        value={maxCheckoutLength} required />
                                    <small id="overdueFeeHelp" className="form-text text-muted">Enter a valid decimal amount; in dollars and cents; no comma (e.g. 1.99)</small>
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
    }
}