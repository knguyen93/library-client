import React, { Component } from "react";

import { connect } from "react-redux";
import { addNewBook, fetchAuthor } from "../../actions/bookActions";

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

        this.myForm = React.createRef();
        // const textInput = useRef(null);
    }

    componentDidMount() {
        this.props.dispatch(fetchAuthor())
    }

    onAddNewBook (evt) {
        console.log(1111111)
        // evt.preventDefault();
        let { title, isbn, copieAvailable, maxCheckoutLength } = this.state
        this.props.dispatch(addNewBook({ title, isbn, copieAvailable, maxCheckoutLength, authors: ["001", "002"] }))

    }

    onFieldChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.type=="number"?parseInt(target.value):target.value;
        // console.log(444,{[name]:value},target)
        this.setState({
            [name]:value
        })
    }

    onSelectAuthorChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = getSelectValues(target);
        // console.log(444,{[name]:value},target)
        this.setState({
            [name]:value
        })
    }

    handleClose = (action) => {
        if ('ACCEPT' === action) {
            // this.myForm.current.submit()
            if (this.myForm.current.reportValidity())
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

    renderMessage (){
        const { success, message, authors, error } = this.props
        return ( 
        <div> 
            {error &&
                <div className="alert alert-danger" role="alert" title={error?.message}>
                    <strong>Opps!</strong> Add book failed.
                </div>
            }
            {success &&
                <div className="alert alert-success" role="alert" title={message}>
                    <strong>Well done!</strong> Add book success.
                </div>
            }

        </div>
        )
    }

    renderBody() {
        const { authors } = this.props
        const {title, isbn, copieAvailable, maxCheckoutLength } = this.state
        return (
            <div className="" id="container">
                { this.renderMessage () }
                <div>
                    <span><b>Note:</b> Form fields marked with asterisk (*) are required.</span>
                </div>
                <br/>
                <form id="bookForm" ref={this.myForm}>
                               
                        <div className="row">
                            <div className="col-md-8">
                                <div className="form-group">
                                    <label htmlFor="title">*Book Title</label>                            
                                    <input id="title" name="title" type="text" className="form-control" onChange={this.onFieldChange} value={title} required autoFocus />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="isbn">*ISBN</label>                           
                                    <input id="isbn" name="isbn" type="text" className="form-control" onChange={this.onFieldChange} value={isbn} required />
                                </div>
                            </div>
                            
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="title">*Number of Copies</label>                            
                                    <input id="title" name="copieAvailable" type="number" className="form-control" onChange={this.onFieldChange} value={copieAvailable} required autoFocus />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="overdueFee">*Max Checkout Length</label>                            
                                    <input id="overdueFee" name="maxCheckoutLength" type="number" className="form-control"
                                        onChange={this.onFieldChange} value={maxCheckoutLength} required />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="authors">Author:</label>
                                    <select multiple className="form-control" id="authors" name="authors" onChange={this.onSelectAuthorChange} required>
                                        {authors && authors.map(
                                            (a, i) => <option key={i} value={a.id}>{a.fullName}</option>
                                        )}
                                    </select>
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
                    
                </form>
            </div>

        )
    }
}

function getSelectValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;
  
    for (var i=0, iLen=options.length; i<iLen; i++) {
      opt = options[i];
  
      if (opt.selected) {
        result.push(opt.value || opt.text);
      }
    }
    return result;
  }

export default connect(mapStateToProps)(AddBookPopup)

function mapStateToProps(state) {
    return {
        books: state.bookReducer.records,
        // addbook:state
        success: state.bookReducer.newBookResult?.success,
        message: state.bookReducer.newBookResult?.messages && state.bookReducer.newBookResult.messages.pop(),
        authors: state.bookReducer.authors,
        error: state.bookReducer.newBookErrors && state.bookReducer.newBookErrors.pop()
    }
}