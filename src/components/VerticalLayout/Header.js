import PropTypes from 'prop-types';
import React, { useState, useEffect } from "react";

import {connect, useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";
import "../../status_account.css"

//i18n
import { withTranslation } from "react-i18next";

// Redux Store
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType, getProfile,
} from "../../store/actions";
import {useMediaQuery} from "react-responsive";

const Header = props => {

  const dispatch = useDispatch();
  const history = useHistory();

  const { profile } = useSelector(state => ({
        profile: state.ProfileUser.profile,
    }));

  function tToggle() {
    var body = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle("sidebar-enable");
    } else {
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
    }
  }

  useEffect(() => {
    if (!profile) {
      dispatch(getProfile());
    }
  }, [profile]);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className={localStorage.getItem("account_status")==="1" ? "navbar-header bg-status-account-white": "navbar-header bg-status-account-black"}>
          <div className="d-flex">

            {isMobile ?
                null:(
                   <div className={"navbar-brand-box d-lg-none d-md-block"}>
                      <Link to="/" className="logo logo-dark">
                        <span className="logo-sm">
                          {/*<img src={logo} alt="" height="22" />*/}
                        </span>
                      </Link>

                      <Link to="/" className="logo logo-light">
                        <span className="logo-sm">
                          {/*<img src={logoLightSvg} alt="" height="22" />*/}
                        </span>
                      </Link>
                   </div>
                )
            }

            <button
              type="button"
              onClick={() => {
                tToggle();
              }}
              className="btn btn-sm px-3 font-size-16 header-item text-white"
              id="vertical-menu-btn"
            >
              {isMobile ?
                  (<i className="fa fa-fw fa-home font-size-22 text-white" />) : (<i className="fa fa-fw fa-bars" />)
              }
            </button>

            </div>
          <div className="d-flex">

          {/*<div className="dropdown d-inline-block">*/}
          {/*    <button*/}
          {/*      onClick={() => {*/}
          {/*        props.showRightSidebarAction(!props.showRightSidebar);*/}
          {/*      }}*/}
          {/*      type="button"*/}
          {/*      className="btn header-item noti-icon right-bar-toggle "*/}
          {/*    >*/}
          {/*      <i className="bx bx-cog bx-spin" />*/}
          {/*    </button>*/}
          {/*  </div>*/}

          <ProfileMenu />

          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

Header.propTypes = {
  changeSidebarType: PropTypes.func,
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func
};

const mapStatetoProps = state => {
  const {
    layoutType,
    showRightSidebar,
    leftMenu,
    leftSideBarType,
  } = state.Layout;
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(withTranslation()(Header));
