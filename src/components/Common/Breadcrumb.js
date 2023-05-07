import React from "react"
import PropTypes from 'prop-types'
import {Link, useHistory} from "react-router-dom"
import { Row, Col, BreadcrumbItem } from "reactstrap"
import {useMediaQuery} from "react-responsive";

const Breadcrumb = props => {

  const history = useHistory()
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  function tToggle() {
    var body = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle("sidebar-enable");
    } else {
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
    }
  }

  const onClickBack = () => {
    if (props.goMenu){
      tToggle()
    }else{
      history.goBack()
    }
  }

  return (
    <Row>
      {isMobile ? (
          <Col className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
              <h4 className="mb-sm-0 font-size-18" onClick={onClickBack}>{"< "}Back</h4>
              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <h4>{props.breadcrumbItem}</h4>
                </ol>
              </div>
            </div>
          </Col>
      ):(
        <Col className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0 font-size-18">{props.breadcrumbItem}</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <BreadcrumbItem>
                  <Link to="/">{props.title}</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  <Link to="#">{props.breadcrumbItem}</Link>
                </BreadcrumbItem>
              </ol>
            </div>
          </div>
        </Col>
      )}
    </Row>
  )
}

Breadcrumb.propTypes = {
  breadcrumbItem: PropTypes.string,
  title: PropTypes.string
}

export default Breadcrumb
