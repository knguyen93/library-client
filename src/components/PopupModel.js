import React from 'react'
import { Modal } from 'react-bootstrap'

export default function PopupModel(props) {
    const { show, handleClose, title, body, saveLabel, cancelLabel, clazz } = props
    return (
        <>
            <Modal show={show} onHide={handleClose} dialogClassName={clazz} >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {body}
                </Modal.Body>
                <Modal.Footer>
                    <span className="btn btn-primary" onClick={() => handleClose('ACCEPT')}>{saveLabel ? saveLabel : 'Save Changes'}</span>
                    <span className="btn btn-secondary" onClick={() => handleClose('CANCEL')}>{cancelLabel ? cancelLabel : 'Close'}</span>
                </Modal.Footer>
            </Modal>
        </>
    );
}