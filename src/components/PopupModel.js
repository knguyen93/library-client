import React from 'react'
import { Modal } from 'react-bootstrap'

export default function PopupModel(props) {
    const { show, handleClose, title, body } = props
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {body}
                </Modal.Body>
                <Modal.Footer>
                    <span className="btn btn-secondary" onClick={handleClose}>Close</span>
                    <span className="btn btn-primary" onClick={handleClose}>Save Changes</span>
                </Modal.Footer>
            </Modal>
        </>
    );
}