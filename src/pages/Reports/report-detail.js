import React, { useEffect} from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import {
  Col,
  Container,
  Table,
} from "reactstrap";
import { isEmpty, map } from "lodash";

import Breadcrumbs from "../../components/Common/Breadcrumb";

import {
  getCustomers as onGetEmployee,
  getCustomersData as onGetCustomers,
  getMyDay as onGetMyDay,
  getInvoices as onGetInvoices,
} from "store/actions"

import { useSelector, useDispatch } from "react-redux";
import {useLocation} from "react-router-dom/cjs/react-router-dom";

const ReportOverviewDetail = props => {

  document.title="Invoice Report Overview | AutoPro";

  const location = useLocation()
  const queryParameters = new URLSearchParams(location.search)

  const {
    match: { params },
  } = props;

  const dispatch = useDispatch()
  if (localStorage.getItem("invoiceId")){
        localStorage.removeItem("invoiceId");
  }

  let get_data = {
      account_id: localStorage.getItem("account_user"),
      from_date: queryParameters.get("from_date"),
      to_date: queryParameters.get("to_date"),
      crew: null,
      car_id: null,
      customer_id: null,
      number: null,
      finished_at: null,
      start_at: null,
      page: null,
      page_size: null,
  }

  if (queryParameters.get("data")==="customer"){
      get_data.customer_id=params.id
  }
  if (queryParameters.get("data")==="crew")
  {
      get_data.crew=params.id
  }

  const { invoices } = useSelector(state => ({
    invoices: state.invoices.myDay,
  }))

  useEffect(() => {
    dispatch(onGetInvoices());
    dispatch(onGetEmployee());
    dispatch(onGetCustomers());
    dispatch(onGetMyDay(get_data));
  }, [])

  useEffect(() => {
    dispatch(onGetMyDay(get_data))
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="AutoPro" breadcrumbItem="Invoices Customer" />


          <Col lg="12">
            <div className="">
              <div className="table-responsive">
                  { invoices ?
                      <>
                      {map(Array.from(invoices).slice(0,-1), (invoice, key) => (
                        <Table key={key} className="project-list-table table-nowrap align-middle table-borderless">
                          <thead>
                            <tr className="bg-success text-white">
                              <th scope="col" style={{width: "200px"}}>
                                  {invoice?.customer_name}
                              </th>
                              <th scope="col" >Crew</th>
                              <th scope="col" >Number</th>
                              <th scope="col" >Generated Date</th>
                              <th scope="col">Invoice date</th>
                              <th scope="col" style={{width: "100px"}}>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {map(invoice?.invoices, (task, key2) => (
                                <tr key={key2}>
                                  <td></td>
                                  <td>{task?.crew_id.username}</td>
                                  <td>{task?.number}</td>
                                  <td>{task?.finished_at}</td>
                                  <td>{task?.start_at}</td>
                                  <td>$ {task?.total_sum}</td>
                                </tr>
                                ))}
                            <tr >
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                                <td><strong>Total</strong></td>
                                <td><strong className="text-success">$ {invoice.total_sum_invoice}</strong></td>
                            </tr>
                          </tbody>
                        </Table>
                      ))}
                      </>
                  : null }
              </div>
            </div>
          </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};

ReportOverviewDetail.propTypes = {
  match: PropTypes.any,
};

export default withRouter(ReportOverviewDetail);
