import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

import SimpleBar from "simplebar-react";
import "../../status_account.css"

import {useHistory, withRouter} from "react-router-dom";

import {Card, CardBody, Col} from "reactstrap";


const MobileMenu = props => {

    const history = useHistory()

    const color_status = () => {
        if (localStorage.getItem("account_status")==="1"){
            return true
        }else{
            return false
        }
    }

    const onClickNext = (data) => {
        history.push(data)
    }

    return (
        <React.Fragment>
            <div id="sidebar-menu" className="page-content" style={{marginTop: "60px"}}>
              <ul className="metismenu list-unstyled w-100" id="side-menu" style={{listStyle: "none", padding: "0", margin: "", marginLeft: "0", display: "inline-flex", flexWrap: "wrap"}}>
                <Col lg={6} style={{width: "50%"}}>
                  <Card className="w-100" onClick={() => onClickNext("/my-day")}>
                      <CardBody style={{width: "100%"}}>
                        <li className={color_status() ? "text-center text-primary": "text-center"} style={color_status() ? null: {color: "#391a60"}}>
                          <i className="fa fa-calendar-day"  style={{fontSize: "80px"}}></i>
                          <a>
                            <strong><span className="" style={{fontSize: "16px"}}>{"My Day"}</span></strong>
                          </a>
                        </li>
                      </CardBody>
                  </Card>
                </Col>
                <Col lg={6} style={{width: "50%"}}>
                  <Card className="w-100" onClick={() => onClickNext("/reports-submenu")}>
                    <CardBody className="w-100">
                      <li className={color_status() ? "text-center text-primary": "text-center"} style={color_status() ? null: {color: "#391a60"}}>
                          <i className="fa fa-file-invoice"  style={{fontSize: "80px"}}></i>
                          <a>
                            <strong><span className="" style={{fontSize: "16px"}}>{"Reports"}</span></strong>
                          </a>
                      </li>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg={6} style={{width: "50%"}}>
                    <Card className="w-100" onClick={() => onClickNext("/customers")}>
                      <CardBody className="w-100">
                        <li className={color_status() ? "text-center text-primary": "text-center"} style={color_status() ? null: {color: "#391a60"}}>
                            <i className="fa fa-users"  style={{fontSize: "80px"}}></i>
                            <a>
                              <strong><span className="" style={{fontSize: "16px"}}>{"Customer"}</span></strong>
                            </a>
                        </li>
                      </CardBody>
                    </Card>
                </Col>
                <Col lg={6} style={{width: "50%"}}>
                  <Card className="w-100" onClick={() => onClickNext("/settings-submenu")}>
                      <CardBody style={{width: "100%"}}>
                        <li className={color_status() ? "text-center text-primary": "text-center"} style={color_status() ? null: {color: "#391a60"}}>
                          <i className="fa fa-cogs"  style={{fontSize: "80px"}}></i>
                          <a>
                            <strong><span className="" style={{fontSize: "16px"}}>{"Setting"}</span></strong>
                          </a>
                        </li>
                      </CardBody>
                  </Card>
                </Col>
              </ul>
            </div>
        </React.Fragment>
  );
};

MobileMenu.propTypes = {
  match: PropTypes.any,
};

export default withRouter(MobileMenu);