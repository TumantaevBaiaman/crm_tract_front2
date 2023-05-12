import PropTypes from 'prop-types'
import React, {useState} from "react"
import {Label, Modal, ModalBody} from "reactstrap"


const ModalSave = ({ show, onCloseClick, update }) => {

  const [data, setData] = useState(true)

  return (
    <Modal size="md" isOpen={show} toggle={onCloseClick} centered={true}>
      <div className="modal-content">
        <ModalBody className="px-4 py-5 text-center">
          <button type="button" onClick={onCloseClick} className="btn-close position-absolute end-0 top-0 m-3"></button>
          <div className="avatar-sm mb-2 mx-auto">
            <div className="avatar-title bg-primary text-primary bg-opacity-10 font-size-24 rounded-3">
              <i className="mdi mdi-email-send-outline"/>
            </div>
          </div>
          <p className="text-muted font-size-16 mb-4">Do you want to send a message to these accounts?</p>
          <div className="hstack gap-2 justify-content-center mb-0">
            <button type="button" className="btn btn-success" onClick={update}>YES</button>
            <button type="button" className="btn btn-danger" onClick={onCloseClick}>NO</button>
          </div>
        </ModalBody>
      </div>
    </Modal>
  )
}

ModalSave.propTypes = {
  onCloseClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  show: PropTypes.any
}

export default ModalSave