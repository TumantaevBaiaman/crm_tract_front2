import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import {
  Col,
  Container,
  Row,
} from "reactstrap";

import {
  getInvoiceCustomer as onGetInvoiceCustomer,
} from "../../../store/invoices/actions";
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from "react-router-dom";
import {map} from "lodash";
import CardInvoice from "../../Invoices/card-invoice";
import Breadcrumbs from "../../../components/Common/Breadcrumb";

const WorkOrder = props => {

  document.title="Work Order | AutoPro";
  const queryParameters = new URLSearchParams(location.search)

  const dispatch = useDispatch();
  const history = useHistory();
  if (localStorage.getItem("invoiceId")){
        localStorage.removeItem("invoiceId");
      }

  const { invoices } = useSelector(state => ({
    invoices: state.invoices.invoicesCustomer,
  }));

  const {
    match: { params },
  } = props;

  useEffect(() => {
    if (params && params.id) {
      dispatch(onGetInvoiceCustomer(params.id));
    } else {
      dispatch(onGetInvoiceCustomer(1));
    }
  }, [params, onGetInvoiceCustomer]);


  const filterData = invoices.filter(invoice => {
    return invoice?.car_id?.id === parseInt(queryParameters.get("car_id"))
  });

  const onClickPrev = () => {
      // history.push("/car-detail-info/"+parseInt(queryParameters.get("car_id")))
    history.goBack();
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Car" breadcrumbItem="Work Orders" />
        <Container fluid>
          <Col lg={12}>
            <Row>
              {map(filterData, (invoice, key) => (
                  <CardInvoice data={invoice} history={history} key={"_invoice_" + key}/>
              ))}
            </Row>
          </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};

WorkOrder.propTypes = {
  match: PropTypes.any,
};

export default withRouter(WorkOrder);
