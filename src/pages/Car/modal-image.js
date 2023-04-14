import PropTypes from 'prop-types'
import React, {useState} from "react"
import {Col, Modal, ModalBody, Row} from "reactstrap"

const ModalIMG = ({ show, img_car, onCloseClick}) => {


  return (
    <Modal size="md" isOpen={show} toggle={onCloseClick} centered={true}>
      <div className="modal-content">
        <ModalBody className="px-4 py-5 text-center">
          <button type="button" onClick={onCloseClick} className="btn-close position-absolute end-0 top-0 m-3"></button>
          <div className="position-relative">
            <div className="search-box me-xxl-2 my-3 my-xxl-0 d-inline-block">
              <div className="position-relative">
                <Row>
                  <Col>
                      <td><img src={img_car} className="rounded w-100" data-holder-rendered="true" /></td>
                  </Col>
                  </Row>
                </div>
            </div>
          </div>
        </ModalBody>
      </div>
    </Modal>
  )
}

ModalIMG.propTypes = {
  onCloseClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  show: PropTypes.any
}

export default ModalIMG