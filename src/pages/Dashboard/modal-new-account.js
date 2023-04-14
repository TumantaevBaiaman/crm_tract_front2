import PropTypes from 'prop-types'
import React, {useState, useEffect} from "react"
import {Col, Input, Label, Modal, ModalBody, Row} from "reactstrap"
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from "../../store/profile/actions";
import {Link} from "react-router-dom";

const ModalNewAccount = () => {

  const dispatch = useDispatch()

  const { profile } = useSelector(state => ({
    profile: state.ProfileUser.profile,
  }));

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  let newAccount = false

  if (localStorage.getItem("account_user")===null){
    newAccount = true;
  }

  return (
    <Modal size="md" isOpen={newAccount} centered={true}>
      <div className="modal-content">
        <ModalBody className="px-4 py-5 text-center">
          <div className="avatar-sm mb-2 mx-auto">
            <div className="avatar-title bg-primary text-primary bg-opacity-10 font-size-24 rounded-3">
              <i className="mdi mdi-home-account"/>
            </div>
          </div>
          <p className="text-muted font-size-16 mb-4">You don't have an account, you need to create an account</p>
          <div className="hstack gap-2 justify-content-center mb-0">
            <Link type="button" className="btn btn-success" to="/register/account">Create</Link>
          </div>
        </ModalBody>
      </div>
    </Modal>
  )
}

ModalNewAccount.propTypes = {
  onCloseClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  show: PropTypes.any
}

export default ModalNewAccount