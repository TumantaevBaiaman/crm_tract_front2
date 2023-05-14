import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import {
  Alert,
  Card,
  CardBody,
  Col,
  Container, DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Table, UncontrolledDropdown,
  UncontrolledTooltip
} from "reactstrap";
import { isEmpty, map } from "lodash";
import API_URL from "../../helpers/api_helper";
import ModalTask from "./ModalTask";

import Breadcrumbs from "../../components/Common/Breadcrumb";

import {
  exportInvoice as onExportInvoice,
  invoiceMyDay as onInvoiceMyDay, sendListInvoice as onSendListInvoice,
} from "../../store/invoices/actions";

import { useSelector, useDispatch } from "react-redux";
import {useHistory} from "react-router-dom";
import {getProfile, getProfile as onGetProfile} from "../../store/profile/actions";
import {getCustomerDetail as onGetCustomerDetail} from "../../store/customer/actions";
import {useMediaQuery} from "react-responsive";

const InvoiceDetailList = props => {

  document.title="Invoice Detail | AutoPro";

  const dispatch = useDispatch();
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const queryParameters = new URLSearchParams(location.search)

  if (localStorage.getItem("invoiceId")){
    localStorage.removeItem("invoiceId");
  }

  const [modal, setModal] = useState(false)
  const { invoiceDetail } = useSelector(state => ({
    invoiceDetail: state.invoices.invoicesMyDay,
  }));

  const { profile } = useSelector(state => ({
    profile: state.ProfileUser.profile,
  }));

  const { accountDetail } = useSelector(state => {
    if (localStorage.getItem("account_status")==="1") {
        return { accountDetail: state.ProfileUser.profile?.account_white }
      }
    else {
      return { accountDetail: state.ProfileUser.profile?.account_black }
    }
  });

  const { customerDetail } = useSelector(state => ({
       customerDetail: state.Customer.customerDetail,
   }));

  const {
    match: { params },
  } = props;

  let get_data = {
    account_id: localStorage.getItem("account_user"),
    from_date: queryParameters.get("from_date"),
    to_date: queryParameters.get("to_date"),
    crew_id: null,
    customer_id: params.id
    }

  const onClickExportNoTask = () => {
    const export_data = {
      action: "export",
      account_id: localStorage.getItem("account_user"),
      start_date: queryParameters.get("from_date"),
      end_date: queryParameters.get("to_date"),
      customer_id: params.id,
      tax: null,
      send: true
    }
    dispatch(onSendListInvoice(export_data))
    setModal(false)
  };

  const onClickExportTask = () => {
    const export_data = {
      action: "export",
      account_id: localStorage.getItem("account_user"),
      start_date: queryParameters.get("from_date"),
      end_date: queryParameters.get("to_date"),
      customer_id: params.id,
      tax: true,
      send: true
    }
    dispatch(onSendListInvoice(export_data))
    setModal(false)
  };

  useEffect(() => {
    dispatch(onInvoiceMyDay(get_data));
  }, [dispatch]);

  useEffect(() => {
        dispatch(onGetProfile());
    }, [dispatch]);

  useEffect(() => {
    dispatch(onGetCustomerDetail(params.id));
  }, [dispatch]);

  useEffect(() => {
      dispatch(getProfile());
  }, [dispatch]);

  return (
    <React.Fragment>
      <ModalTask
          show={modal}
          onClickTrue={onClickExportTask}
          onClickFalse={onClickExportNoTask}
          onCloseClick={() => setModal(false)}
      />
      <div className="page-content container align-content-sm-center">
        <Container fluid>
          {isMobile ? null : <Breadcrumbs title="AutoPro" breadcrumbItem="Invoice Statement" />}
          {!isEmpty(invoiceDetail) && (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <Col>
                      <div className="invoice-title text-center">
                        <h1 className="float-center font-size-22">
                          Invoice Statement
                        </h1>
                      </div>
                    </Col>
                    <Row>
                      <Col sm="6">
                        <address className="font-size-14">
                          <span className="font-size-20"><strong>{profile?.account?.name}</strong></span>
                          <br/>
                          <span >{profile?.account?.country}</span>
                          <br/>
                          <span>{profile?.account?.street1}</span>
                          <br/>
                          <span>{profile?.account?.street2}</span>
                          <br/>
                          <span>{profile?.account?.phone}</span>
                          <br/>
                          <span>HST# {profile?.account?.hst}</span>
                          <br/>
                        </address>
                      </Col>
                      <Col sm="6" className="text-sm-end">
                        <address className="font-size-14">
                          <div className="mb-4">
                            {localStorage.getItem("account_status")==="1" ? <img src={API_URL+profile?.account?.logo} alt="logo" width="200" />: null}
                          </div>
                        </address>
                      </Col>
                    </Row>
                    <br/>
                    <br/>
                    <Row>
                      <Col sm="6">
                        <address className="">
                          <strong>Billing Address</strong>
                          <br/>
                          <span>{customerDetail?.full_name}</span>
                          <br/>
                          <span>{customerDetail?.street1}</span>
                          <br/>
                          <span >{customerDetail?.street2}</span>
                          <br/>
                          <span >{customerDetail?.country}</span>
                          <br/>
                          <span>Phone: {customerDetail?.phone}</span>
                          <br/>
                          <span>Email: {customerDetail?.email}</span>
                          <br/>
                        </address>
                      </Col>
                      <Col sm="6">
                        <div className="text-sm-end">

                        </div>
                      </Col>
                    </Row>
                    <br/>
                    <Row>
                      <Col lg={12}>
                        <div className="table-responsive">
                          <Table className="table-nowrap">
                            <thead>
                              <tr>
                                <th className="" style={{width: "150px"}}>Invoices Number</th>
                                <th className="">Invoice Date</th>
                                <th className="">Due Date</th>
                                <th className="">Invoice Status</th>
                                <th className="">Total</th>
                                <th className="">Paid</th>
                                <th className="">Balance</th>
                              </tr>
                            </thead>
                            <tbody>
                              {map(
                                invoiceDetail?.invoices,
                                (item, key) => (
                                  <tr key={key}>
                                    <td>{item?.number}</td>
                                    <td>{item?.start_at.substr(0,10)}</td>
                                    <td>{item?.finished_at.substr(0,10)}</td>
                                    <td>{item?.status}</td>
                                    <td>$ {item?.total_sum}</td>
                                    <td>$ {item?.paid || 0}</td>
                                    <td>$ {item?.total_sum}</td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </Table>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6">
                        <div className="text-sm-start">
                        </div>
                      </Col>
                      <Col>
                        <div className="text-sm-end">
                          <strong className="me-sm-5">Sub Total:</strong> <span className="ms-sm-3">${invoiceDetail?.total_invoice_sum}</span><br/>
                          <strong className="me-sm-5">Total:</strong> <strong><span className="ms-sm-2">${invoiceDetail?.total_invoice_sum}</span></strong>
                        </div>
                      </Col>
                    </Row>
                    <br/>
                    <Row>
                      <Col sm="12">
                        <div className="text-sm-start">
                          Comment: <br/>
                          Thank you for your business
                        </div>
                      </Col>
                    </Row>
                    <br/>

                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

InvoiceDetailList.propTypes = {
  match: PropTypes.any,
};

export default withRouter(InvoiceDetailList);
