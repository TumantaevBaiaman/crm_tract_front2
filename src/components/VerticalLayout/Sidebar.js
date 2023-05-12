import PropTypes from "prop-types";
import React, {useEffect} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import { withRouter } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";
import SidebarContent from "./SidebarContent";
import SidebarContentMobile from "./MobileSidebar";
import { Link } from "react-router-dom";
import "../../status_account.css"
import {getProfile} from "../../store/profile/actions";
import ModalNewAccount from "../../pages/Dashboard/modal-new-account";

import auto_pro from "../../assets/images/logoLight.png";
import PaymentWhiteAccount from "../../pages/Dashboard/payment_w_account";


const Sidebar = props => {

  const dispatch = useDispatch()

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const state = useSelector(state => state.ProfileUser);

  useEffect(() => {
    if (!state?.profile) {
      dispatch(getProfile());
    }
  }, [state?.profile]);
  if (localStorage.getItem("status_user")===null){
    if (state?.profile?.status) {
      if (state?.profile?.status?.name === "admin"){
        localStorage.setItem("status_user", 'admin')
      }
      else if (state?.profile?.status?.name === "employee"){
        localStorage.setItem("status_user", 'employee')
      }
    }
  }
  const status_account = () => {
    if (localStorage.getItem("account_status")==="1"){
      return "bg-status-account-white"
    }else return "bg-status-account-black"
  }

  const status_account_logo = () => {
    if (localStorage.getItem("account_status")==="1"){
      return "bg-status-account-white-logo"
    }else return "bg-status-account-black-logo"
  }

  if (state?.profile?.account?.id){
    if (localStorage.getItem("account_user")===null){
      localStorage.setItem("account_user", state?.profile?.account?.id)
    }
  }

  if (state?.profile?.profile?.id) {
    if (localStorage.getItem("id_user") === null) {
      localStorage.setItem("id_user", state?.profile?.profile?.id)
    }
  }

  return (
      <React.Fragment>
      {window.location.pathname!=="/register/account" ? <ModalNewAccount /> : null}
      {localStorage.getItem("account_user")!==null ? <PaymentWhiteAccount /> : null}
      {isMobile ?
          (
              <div className="vertical-menu" style={{width: "100%"}}>
                  <div className="navbar-brand-box">
                    <Link to="/" className="logo logo-dark">
                      <span className="logo-sm">
                        {/*<img src={logo} alt="" height="22" />*/}
                      </span>
                      <span className="logo-lg">
                        {/*<img src={logoDark} alt="" height="17" />*/}
                      </span>
                    </Link>

                    <Link to="/" className="logo logo-light">
                      <span className="logo-sm">
                        {/*<img src={logoLightSvg} alt="" height="22" />*/}
                      </span>
                      <span className="logo-lg">
                        {/*<img src={logoLightPng} alt="" height="19" />*/}
                      </span>
                    </Link>
                  </div>
                  <div data-simplebar className="h-100">
                    {props.type !== "condensed" ? <SidebarContentMobile /> : <SidebarContentMobile />}
                  </div>
                  {/*<div className="sidebar-background"></div>*/}
                </div>
          ) :
            (
                <div className={"vertical-menu " + status_account()}>
                  <div className="navbar-brand-box" style={localStorage.getItem("account_status")==="1" ? {background: "#00425A"}: {background: "#000000"}}>
                    <Link to="/" className="logo logo-dark">
                      <span className="logo-sm">
                        {/*<img src={logo} alt="" height="22" />*/}
                      </span>
                      <span className="logo-lg">
                        {/*<img src={logoDark} alt="" height="17" />*/}
                      </span>
                    </Link>

                    <Link to="/" className="logo logo-light" style={{fontSize: "18px", color: "white"}}>
                      <span className="logo-sm">
                        {/*<img src={logoLightSvg} alt="" height="22" />*/}
                        <strong>APT</strong>
                      </span>
                      <span className="logo-lg" style={{fontSize: "26px", color: "white"}}>

                        {/*<img src={logoLightPng} alt="" height="19" />*/}
                        <img src={auto_pro} alt="" height="27" />
                        {/*<strong>AutoPRO</strong>*/}
                      </span>
                      {/*<strong><span style={{fontSize: "26px", color: "white"}}>AutoPRO</span></strong>*/}
                    </Link>
                  </div>
                  <div data-simplebar className="h-100">
                    {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
                  </div>
                  <div className="sidebar-background"></div>
                </div>
            )
      }
      </React.Fragment>
  );
};

Sidebar.propTypes = {
  type: PropTypes.string,
};

const mapStatetoProps = state => {
  return {
    layout: state.Layout,
  };
};
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(Sidebar)));
