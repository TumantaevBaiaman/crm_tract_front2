import PropTypes from 'prop-types'
import React, {useState, useEffect} from "react"
import {Alert, Col, Input, Label, Modal, ModalBody, Row} from "reactstrap"
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from "../../store/profile/actions";
import {Link} from "react-router-dom";

const ModalLogin = () => {

  const onCloseClick = () => {
    location.reload()
  }

  return (
    <Modal size="md" isOpen={true} centered={true}>
      <div className="modal-content">
        <ModalBody className="px-4 py-5 text-center">
          <button type="button" onClick={onCloseClick} className="btn-close position-absolute end-0 top-0 m-3"></button>
          <div className="avatar-sm mb-2 mx-auto">
            <div className="avatar-title bg-primary text-primary bg-opacity-10 font-size-24 rounded-3">
              <i className="mdi mdi-login-variant"/>
            </div>
          </div>
          <h5 className="text-success">
            Register User Successfully
          </h5>
          <p className="text-muted font-size-16 mb-4">You have successfully registered and your username and password have been sent to your email. You can log in using this username and password.</p>
          <div className="hstack gap-2 justify-content-center mb-0">
            <Link type="button" className="btn btn-success" to="/login">Login</Link>
          </div>
        </ModalBody>
      </div>
    </Modal>
  )
}

ModalLogin.propTypes = {
  onCloseClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  show: PropTypes.any
}

export default ModalLogin