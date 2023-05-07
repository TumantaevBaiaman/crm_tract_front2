import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Container, DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Table,
  UncontrolledDropdown,
} from "reactstrap";
import { isEmpty, map } from "lodash";
import API_URL from "../../helpers/api_helper";
import ModalTask from "./ModalTask";

import Breadcrumbs from "../../components/Common/Breadcrumb";
import {
  getInvoiceDetail as onGetInvoiceDetail,
  exportInvoice as onExportInvoice,
  updateStatus as onUpdateStatus,
  sendInvoice as onSendInvoice,
} from "../../store/invoices/actions";
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from "react-router-dom";
import ModalSendDefault from "./SendDefault";
import toastr from "toastr";
import {useMediaQuery} from "react-responsive";
import {updateCustomersData as onUpdateCustomer} from "../../store/customer/actions";

const InvoiceDetail = props => {

  document.title="Invoice Detail | AutoPro";

  const dispatch = useDispatch();
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const history = useHistory();
  if (localStorage.getItem("invoiceId")){
        localStorage.removeItem("invoiceId");
      }

  let cancel = true
  let final = true
  const [modal, setModal] = useState(false)
  const [modalOneSend, setModalOneSend] = useState(false)
  const [customerDataInfo, setCustomerDataInfo] = useState("")
  const { invoiceDetail } = useSelector(state => ({
    invoiceDetail: state.invoices.invoiceDetail.invoice,
  }));

  const { accountDetail } = useSelector(state => ({
    accountDetail: state.invoices.invoiceDetail.account,
  }));

  const {
    match: { params },
  } = props;

  const onClickExportNoTask = () => {
    const export_data = {
      "action": "export",
      "account_id": localStorage.getItem("account_user"),
      "invoice_id": params.id,
      "tax": null,
      "send": null
    }
    toastr.info("wait a little")
    dispatch(onExportInvoice(export_data))
    setModal(false)
  };

  const onClickExportTask = () => {
    const export_data = {
      "action": "export",
      "account_id": localStorage.getItem("account_user"),
      "invoice_id": params.id,
      "tax": true,
      "send": null
    }
    toastr.info("wait a little")
    dispatch(onExportInvoice(export_data))
    setModal(false)
  };
  const colorStatus = {"draft": "secondary", "final": "success", "cancel": "danger"}
  const updateStatus = (data) => {
    if (data==="final"){
      const updateData = {
        id: params.id,
        status: "final"
      }
      dispatch(onUpdateStatus(updateData))
      dispatch(onGetInvoiceDetail(1))
    }else{
      const updateData = {
        id: params.id,
        status: "cancel"
      }
      dispatch(onUpdateStatus(updateData))
      dispatch(onGetInvoiceDetail(1))
    }
  }

  useEffect(() => {
    if (params && params.id) {
      dispatch(onGetInvoiceDetail(params.id));
    } else {
      dispatch(onGetInvoiceDetail(1)); //remove this after full integration
    }
  }, [params, onGetInvoiceDetail]);

  const onClickView = () => {
    localStorage.setItem("invoiceId", params.id);
    history.push('/car-detail/'+invoiceDetail.car_id.id);
  };

  useEffect(() => {
    dispatch(onGetInvoiceDetail(params.id));
  }, [dispatch]);

  if (invoiceDetail){
    if (invoiceDetail.status==='final'){
      final=false
    }
    if (invoiceDetail.status==='cancel'){
      cancel=false
    }
  }

  const onClickSendOne = (data) => {
    setCustomerDataInfo(data)
    setModalOneSend(true)
  };

  const onClickSendOneTrue = () => {
    const export_data = {
      "action": "export",
      "account_id": localStorage.getItem("account_user"),
      "invoice_id": params.id,
      "tax": true,
      "send": true
    }
    toastr.info("wait a little")
    dispatch(onSendInvoice(export_data))
    setModalOneSend(false)
  };

  const onClickSendOneFalse = () => {
    const export_data = {
      "action": "export",
      "account_id": localStorage.getItem("account_user"),
      "invoice_id": params.id,
      "tax": null,
      "send": true
    }
    toastr.info("wait a little")
    dispatch(onSendInvoice(export_data))
    setModalOneSend(false)
  };

  const onClickBack = () => {
    history.goBack();
  }

  const updateCustomer = () => {
    const updateCustomer = {
      id: invoiceDetail?.customer_id?.id,
      email: customerDataInfo,
      full_name: invoiceDetail?.customer_id?.full_name || "",
      street2: invoiceDetail?.customer_id?.street2 || "",
      postal_code: invoiceDetail?.customer_id?.postal_code || "",
      street1: invoiceDetail?.customer_id?.street1 || "",
      country: invoiceDetail?.customer_id?.country || "",
      phone: invoiceDetail?.customer_id?.phone || "",
      phone2: invoiceDetail?.customer_id?.phone2 || ""
    };
    dispatch(onUpdateCustomer(updateCustomer));
  }

  return (
    <React.Fragment>
      <ModalTask
          show={modal}
          onClickTrue={onClickExportTask}
          onClickFalse={onClickExportNoTask}
          onCloseClick={() => setModal(false)}
      />
      <ModalSendDefault
          show={modalOneSend}
          onClickTrue={onClickSendOneTrue}
          onClickFalse={onClickSendOneFalse}
          onCloseClick={() => setModalOneSend(false)}
          email={customerDataInfo}
          setEmail={event => setCustomerDataInfo(event.target.value)}
          update={updateCustomer}
      />
      <div className="page-content container align-content-sm-center">
        <Container fluid>
          {/*{isMobile ? null : <Breadcrumbs title="Invoices" breadcrumbItem="Detail" />}*/}
          <Breadcrumbs title="Invoices" breadcrumbItem="Invoice Detail" />
          <div className={"w-100 text-center text-white bg-"+(invoiceDetail?.status ? colorStatus[invoiceDetail?.status]: "secondary")} style={{borderRadius: "20px", height: "30px", fontSize: "18px"}}>
            {invoiceDetail?.status}
          </div>
          {!isEmpty(invoiceDetail) && (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <Col>
                      <div className="invoice-title text-center">
                        <h1 className="float-center font-size-22">
                          Invoice
                        </h1>
                      </div>
                    </Col>
                    <Row >
                      <Col sm="12">
                        <div className="car__block">
                          <address className="font-size-14">
                            <span className="font-size-20"><strong>{accountDetail?.name}</strong></span>
                            <br/>
                            <span >{accountDetail?.country}</span>
                            <br/>
                            <span>{accountDetail?.street1}</span>
                            <br/>
                            <span>{accountDetail?.street2}</span>
                            <br/>
                            <span>{accountDetail?.phone}</span>
                            <br/>
                            <span>HST# {accountDetail?.hst}</span>
                            <br/>
                          </address>
                          <address className="font-size-14">
                            <div className="mb-4 text-end">
                            </div>
                          </address>
                        </div>
                      </Col>
                    </Row>
                    <br/>
                    <br/>
                    <Row>
                      <Col sm="4">
                        <address className="">
                          <strong>Billing Address</strong>
                          <br/>
                          <span>{invoiceDetail?.customer_id?.full_name}</span>
                          <br/>
                          <span>{invoiceDetail?.customer_id?.street1}</span>
                          <br/>
                          <span >{invoiceDetail?.customer_id?.street2}</span>
                          <br/>
                          <span >{invoiceDetail?.customer_id?.country}</span>
                          <br/>
                          <span>Phone: {invoiceDetail?.customer_id?.phone}</span>
                          <br/>
                          <span>Email: {invoiceDetail?.customer_id?.email}</span>
                          <br/>
                        </address>
                      </Col>
                      <Col sm="2">
                        <address className="">
                          <strong>Service Address:</strong>
                          <br/>
                          <span >Same as Billing Address</span>
                        </address>
                      </Col>
                      <Col sm="6">
                        <div className="text-sm-end">
                          <strong className="me-sm-5">Invoice Number:</strong> <strong><span className="ms-sm-3">{invoiceDetail?.number}</span></strong><br/>
                          <strong className="me-sm-5">PO Number:</strong> <strong><span className="ms-sm-4">{invoiceDetail?.car_id?.po}</span></strong>
                        </div>
                        <br/>
                        <div className="text-sm-end">
                          <strong className="me-sm-5">Work Order Close Date:</strong> <span className="ms-sm-4">{invoiceDetail?.finished_at.substr(0,10)}</span><br/>
                          <strong className="me-sm-5">Invoice Date:</strong> <span className="ms-sm-4">{invoiceDetail?.start_at.substr(0,10)}</span><br/>
                          <strong className="me-sm-3">Net Terms:</strong> <span className="ms-sm-3">DUE UPON RECEIPT</span>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="6">
                        <div className="font-size-20">
                          {invoiceDetail?.car_id?.model} (Stock# {invoiceDetail?.car_id?.stock}, VIN {invoiceDetail?.car_id?.vin})
                        </div>
                      </Col>
                      <Col sm="6" className="text-sm-end">
                      </Col>
                    </Row>
                    <br/>
                    <Row>
                      <Col lg={12}>
                        <div className="table-responsive">
                          <Table className="table-nowrap">
                            <thead>
                              <tr>
                                <th className="text-sm-end" style={{width: "300px"}}>Task name</th>
                                <th className="text-sm-end">Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {map(
                                invoiceDetail?.tasks,
                                (item, key) => (
                                  <tr key={key}>
                                    <td className="text-sm-end">{item?.work}</td>
                                    <td className="text-sm-end">$ {item?.payment}</td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </Table>
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
                    <Row>
                      <Col sm="12">
                        <div className="text-sm-start font-size-14">
                          <strong className="me-sm-5">Invoice Number:</strong> <strong><span className="ms-sm-3">{invoiceDetail.number}</span></strong><br/>
                          <strong className="me-sm-5">PO Number:</strong> <strong><span className="ms-sm-5">{invoiceDetail.po}</span></strong>
                        </div>
                      </Col>
                    </Row>
                    <br/>
                    <Row>
                      <Col sm="6">
                        <div className="text-sm-start">
                          <strong className="me-sm-5">Work completed by:</strong> <span className="">{invoiceDetail?.crew_id?.username?.toUpperCase() || ""}</span><br/>
                          <strong className="me-sm-5">Generate By:</strong> <span className="ms-sm-5">{invoiceDetail?.crew_id?.username?.toUpperCase() || ""}</span><br/>
                          <strong className="me-sm-5"></strong> <strong className="me-sm-5"></strong> <strong className="me-sm-5"></strong> <span className="ms-5">{invoiceDetail?.crew_id?.lastname?.toUpperCase() || ""}</span><br/>
                        </div>
                      </Col>
                      <Col>
                        <div className="text-sm-end">
                          <strong className="me-sm-5">Sub Total:</strong> <span className="ms-sm-3">${invoiceDetail?.total_sum}</span><br/>
                        </div>
                      </Col>
                    </Row>
                    <br/>
                    <br/>
                    <div className="d-print-none">
                      <div className="float-end block-top d-flex">
                        <UncontrolledDropdown>
                              <DropdownToggle tag="a" to="#" className="card-drop w-md me-2" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bx bx-news font-size-16 btn btn-success"></i>
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-end">
                                {cancel &&
                                  <DropdownItem
                                    className="btn btn-soft-danger w-md"
                                      onClick={event => {
                                        updateStatus("cancel")
                                      }}
                                  >
                                    <i className="bx bx-x font-size-16 align-middle me-2"/>
                                    Cancel
                                </DropdownItem>}
                                {final &&
                                  <DropdownItem
                                    className="btn btn-soft-success w-md"
                                      onClick={event => {
                                        updateStatus("final")
                                      }}
                                  >
                                    <i className="bx bx-check-double font-size-16 align-middle me-2"/>
                                    Final
                                </DropdownItem>}
                                <br/>
                                <DropdownItem
                                  className="btn btn-soft-success w-md"
                                    onClick={() => {
                                      onClickSendOne(invoiceDetail?.customer_id?.email)
                                    }}
                                >
                                    <i className="bx bx-mail-send font-size-16 align-middle me-2"/>
                                    Send
                                </DropdownItem>
                                <DropdownItem
                                  className="btn btn-soft-warning w-md"
                                    onClick={() => {
                                      onClickExportNoTask()
                                    }}
                                >
                                    <i className="bx bxs-file-pdf font-size-16 align-middle me-2"/>PDF
                                </DropdownItem>
                                <DropdownItem
                                  className="btn btn-soft-info w-md"
                                    onClick={() => {
                                      onClickView()
                                    }}
                                >
                                    <i className="bx bx-pencil font-size-16 align-middle me-2"/>
                                    Edit
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                      </div>
                    </div>
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

InvoiceDetail.propTypes = {
  match: PropTypes.any,
};

export default withRouter(InvoiceDetail);
