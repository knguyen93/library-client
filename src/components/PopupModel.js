import React from 'react'
import { Modal } from 'react-bootstrap'

export default function PopupModel(props) {
    const { show, handleClose, title, body, saveLabel, cancelLabel, clazz, children, noFooter } = props
    return (
        <>
            <Modal show={show} onHide={handleClose} dialogClassName={clazz} >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                    {body}
                </Modal.Body>
                {
                    !noFooter
                        ? (<Modal.Footer>
                            <span className="btn btn-primary shadow" onClick={() => handleClose('ACCEPT')}>{saveLabel ? saveLabel : 'Save Changes'}</span>
                            <span className="btn btn-secondary shadow" onClick={() => handleClose('CANCEL')}>{cancelLabel ? cancelLabel : 'Close'}</span>
                        </Modal.Footer>)
                        : null
                }
            </Modal>
        </>
    );
}