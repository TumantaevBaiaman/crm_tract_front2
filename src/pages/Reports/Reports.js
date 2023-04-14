import React, { useEffect } from "react"
import { Col, Container, Row } from "reactstrap"
import PropTypes from "prop-types"
import { Link, withRouter } from "react-router-dom"
import { map } from "lodash"

import { useSelector, useDispatch } from "react-redux"

import Breadcrumbs from "components/Common/Breadcrumb"

import CardInvoice from "../Invoices/card-invoice";
import { getInvoices as onGetInvoices } from "store/actions"

const Reports = props => {
   document.title="Invoice List | AutoPro - React Admin & Dashboard Template";

  const dispatch = useDispatch()

  const { invoices } = useSelector(state => ({
    invoices: state.invoices.invoices,
  }))

  useEffect(() => {
    dispatch(onGetInvoices())
  }, [dispatch])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Invoices" breadcrumbItem="Invoice List" />

          <Row>
            {map(invoices, (invoice, key) => (
              <CardInvoice data={invoice} key={"_invoice_" + key} />
            ))}
          </Row>
          <Row>
            <Col xs="12">
              <div className="text-center my-3">
                <Link to="#" className="text-success">
                  <i className="bx bx-loader bx-spin font-size-18 align-middle me-2" />
                  Load more
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

Reports.propTypes = {
  reports: PropTypes.array,
  onGetReports: PropTypes.func,
}

export default withRouter(Reports)
