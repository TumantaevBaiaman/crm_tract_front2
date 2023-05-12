import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

import SimpleBar from "simplebar-react";
import "../../status_account.css"

import MetisMenu from "metismenujs";
import {useHistory, withRouter} from "react-router-dom";

import { withTranslation } from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from "../../store/profile/actions";
import {Card, CardBody, Col} from "reactstrap";

const SidebarContentMobile = props => {

  const dispatch = useDispatch();
  const history = useHistory();
  const ref = useRef();
  useEffect(() => {
    const pathName = props.location.pathname;

    const initMenu = () => {
      new MetisMenu("#side-menu");
      let matchingMenuItem = null;
      const ul = document.getElementById("side-menu");
      const items = ul.getElementsByTagName("a");
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    initMenu();
  }, [props.location.pathname]);

  useEffect(() => {
    ref.current.recalculate();
  });

  const state = useSelector(state => state.ProfileUser);

  useEffect(() => {
    if (!state?.profile) {
      dispatch(getProfile());
    }
  }, [state?.profile]);

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }

  let isAdmin = false;

  if (localStorage.getItem("status_user")){
    if(localStorage.getItem("status_user")==="admin"){
      isAdmin=true
    }
  }

  function tToggle() {
    console.log(document.body.classList.value);
    var body = document.body;
    if (window?.screen.width <= 998) {
      if (body.classList.contains('sidebar-enable')){
        console.log(5)
        body.classList.remove("sidebar-enable");
        console.log(document.body.classList.value);
      }else{
        console.log(9)
        body.classList.add("sidebar-enable");
      }

    } else {
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
    }
  }

  const onClickNext = (data) => {
      tToggle()
      history.push(data)
  }

  const color_status = () => {
    if (localStorage.getItem("account_status")==="1"){
      return true
    }else{
      return false
    }
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100 bg-white" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled w-100" id="side-menu" style={{listStyle: "none", padding: "0", margin: "", marginLeft: "0", display: "inline-flex", flexWrap: "wrap"}}>
            <Col lg={6} style={{width: "50%"}}>
              <Card className="w-100" onClick={() => onClickNext("/my-day")}>
                  <CardBody style={{width: "100%"}}>
                    <li className={color_status() ? "text-center text-primary": "text-center"} style={color_status() ? null: {color: "#391a60"}}>
                      {/*<img src={my_day_logo} alt="" className="rounded avatar-md" />*/}
                      <i className="fa fa-calendar-day"  style={{fontSize: "80px"}}></i>
                      <a>
                        <strong><span className="" style={{fontSize: "16px"}}>{props.t("My Day")}</span></strong>
                      </a>
                    </li>
                  </CardBody>
              </Card>
            </Col>
            <Col lg={6} style={{width: "50%"}}>
              <Card className="w-100" onClick={() => onClickNext("/reports-submenu")}>
                <CardBody className="w-100">
                  <li className={color_status() ? "text-center text-primary": "text-center"} style={color_status() ? null: {color: "#391a60"}}>
                      {/*<img src={reports_logo} alt="" className="rounded avatar-md" />*/}
                      <i className="fa fa-file-invoice"  style={{fontSize: "80px"}}></i>
                      <a>
                        <strong><span className="" style={{fontSize: "16px"}}>{props.t("Reports")}</span></strong>
                      </a>
                  </li>
                </CardBody>
              </Card>
            </Col>
            <Col lg={6} style={{width: "50%"}}>
                <Card className="w-100" onClick={() => onClickNext("/customers")}>
                  <CardBody className="w-100">
                    <li className={color_status() ? "text-center text-primary": "text-center"} style={color_status() ? null: {color: "#391a60"}}>
                        {/*<img src={customer_logo} alt="" className="rounded avatar-md" />*/}
                        <i className="fa fa-users"  style={{fontSize: "80px"}}></i>
                        <a>
                          <strong><span className="" style={{fontSize: "16px"}}>{props.t("Customer")}</span></strong>
                        </a>
                    </li>
                  </CardBody>
                </Card>
            </Col>
            <Col lg={6} style={{width: "50%"}}>
              <Card className="w-100" onClick={() => onClickNext("/settings-submenu")}>
                  <CardBody style={{width: "100%"}}>
                    <li className={color_status() ? "text-center text-primary": "text-center"} style={color_status() ? null: {color: "#391a60"}}>
                      {/*<img src={my_day_logo} alt="" className="rounded avatar-md" />*/}
                      <i className="fa fa-cogs"  style={{fontSize: "80px"}}></i>
                      <a>
                        <strong><span className="" style={{fontSize: "16px"}}>{props.t("Setting")}</span></strong>
                      </a>
                    </li>
                  </CardBody>
              </Card>
            </Col>

            {/*<Col lg={6} style={{width: "50%"}}>*/}
            {/*    <Card className="w-100" onClick={() => onClickNext("/settings-submenu")}>*/}
            {/*      <CardBody className="w-100">*/}
            {/*        <li className="text-color-status text-center">*/}
            {/*            <img src={settings_logo} alt="" className="rounded avatar-md" />*/}
            {/*            <a>*/}
            {/*              <strong><span className="text-color-status">{props.t("Settings")}</span></strong>*/}
            {/*            </a>*/}
            {/*        </li>*/}
            {/*      </CardBody>*/}
            {/*    </Card>*/}
            {/*</Col>*/}
            {/*  <ul className="sub-menu">*/}
            {/*    {isAdmin ? <li>*/}
            {/*      <Link to="/register/account/">{props.t("Org settings")}</Link>*/}
            {/*    </li> : null}*/}
            {/*    {isAdmin ? <li>*/}
            {/*      <Link to="/employee">{props.t("Users")}</Link>*/}
            {/*    </li> : null}*/}
            {/*    <li>*/}
            {/*      <Link to="/profile">{props.t("Profile")}</Link>*/}
            {/*    </li>*/}
            {/*  </ul>*/}
            {/*</li>*/}
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContentMobile.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContentMobile));
