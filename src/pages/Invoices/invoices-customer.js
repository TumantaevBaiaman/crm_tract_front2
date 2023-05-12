import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Row,
  Table,
  UncontrolledTooltip
} from "reactstrap";
import ModalTask from "./ModalTask";
import Breadcrumbs from "../../components/Common/Breadcrumb";

import {
  getInvoiceCustomer as onGetInvoiceCustomer,
  exportInvoice as onExportInvoice,
  exportInvoiceList as onExportInvoiceList,
  sendInvoice as onSendInvoice,
  sendListInvoice as onSendListInvoice,
} from "../../store/invoices/actions";
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from "react-router-dom";
import CardInvoice from "./card-invoice";
import classNames from "classnames";
import TableInvoice from "./table-invoice";
import toastr from "toastr";
import ModalSend from "./ModalSend";
import ModalSendList from "./ModalSendList";
import {updateCustomersData as onUpdateCustomer} from "../../store/customer/actions";
import ModalExportList from "./ModalExportList";
import {useMediaQuery} from "react-responsive";
import {map} from "lodash";
import ModalSave from "./ModalSave";

const InvoiceCustomer = props => {

  document.title="Invoice List | AutoPro";

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const dispatch = useDispatch();
  const history = useHistory();
  if (localStorage.getItem("invoiceId")){
        localStorage.removeItem("invoiceId");
      }

  const [startDate, setStartDate] = useState('')
  const [dataId, setDataId] = useState(0)
  const [endDate, setEndDate] = useState('')
  const [modalList, setModalList] = useState(false)
  const [modalOne, setModalOne] = useState(false)
  const [modalListSend, setModalListSend] = useState(false)
  const [modalOneSend, setModalOneSend] = useState(false)
  const [periodType, setPeriodType] = useState("");
  const [customerDataInfo, setCustomerDataInfo] = useState("")

  const [startDate2, setStartDate2] = useState('')
  const [endDate2, setEndDate2] = useState('')
  const [emailModal, setEmailModal] = useState(false)
  const [oneEmail, setOneEmail] = useState(false)

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


  const filterDate = invoices.filter(invoice => {

    if (startDate!=="" && endDate!==""){
      return invoice.finished_at > startDate && invoice.finished_at < endDate && invoice.status.toLowerCase().includes(periodType.toLowerCase()) || invoice.finished_at.toLowerCase().includes(endDate.toLowerCase())
    }
    if (startDate!=="" && endDate===""){
      return invoice.finished_at > startDate && invoice.status.toLowerCase().includes(periodType.toLowerCase())
    }
    if (startDate==="" && endDate!==""){
      return invoice.finished_at < endDate && invoice.status.toLowerCase().includes(periodType.toLowerCase()) || invoice.finished_at.toLowerCase().includes(endDate.toLowerCase())
    }
    else{
      return invoice.status.toLowerCase().includes(periodType.toLowerCase())
    }
  });

  const onChangeChartPeriod = (data) => {
    if (periodType !== data){
      setPeriodType(data)
    }
  }

  const onClickExportListTrue = () => {
    if (startDate2==="" || endDate2===""){
      toastr.error("Date Error");
    }
    else{
      const export_data = {
      action: "export",
      account_id: localStorage.getItem("account_user"),
      start_date: startDate2+" 00:00:00",
      end_date: endDate2+" 23:59:59",
      customer_id: params.id,
      tax: true,
      send: null
    }
    toastr.info("wait a little")
    dispatch(onExportInvoiceList(export_data))
    setModalList(false)
    }
  };

  const onClickExportListFalse = () => {
    if (startDate2==="" || endDate2===""){
      toastr.error("Date Error");
    }
    else{
      const export_data = {
      action: "export",
      account_id: localStorage.getItem("account_user"),
      start_date: startDate2+" 00:00:00",
      end_date: endDate2+" 23:59:59",
      customer_id: params.id,
      tax: null,
      send: null
    }
    toastr.info("wait a little")
    dispatch(onExportInvoiceList(export_data))
    setModalList(false)
    }
  };

  const onClickExportOne = (data) => {
    setDataId(data)
    onClickExportOneFalse()
  };

  const onClickExportOneTrue = (data) => {
    const export_data = {
      "action": "export",
      "account_id": localStorage.getItem("account_user"),
      "invoice_id": dataId,
      "tax": true,
      "send": null
    }
    toastr.info("wait a little")
    dispatch(onExportInvoice(export_data))
    setModalOne(false)
  };

  const onClickExportOneFalse = (data) => {
    const export_data = {
      "action": "export",
      "account_id": localStorage.getItem("account_user"),
      "invoice_id": dataId,
      "tax": null,
      "send": null
    }
    toastr.info("wait a little")
    dispatch(onExportInvoice(export_data))
    setModalOne(false)
  };

  const onClickSendOne = (data) => {
    setDataId(data.id)
    setCustomerDataInfo(data.customer_id.email)
    setModalOneSend(true)
  };

  const onClickSendList = () => {
    setCustomerDataInfo(invoices[0]?.customer_id?.email)
    setModalListSend(true)
  };

  const onClickSendOneFalse = (data) => {
    const export_data = {
      "action": "export",
      "account_id": localStorage.getItem("account_user"),
      "invoice_id": dataId,
      "tax": null,
      "send": true
    }
    toastr.info("wait a little")
    dispatch(onSendInvoice(export_data))
    setModalOneSend(false)
  };

  const onClickSendOneTrue = (data) => {
    const export_data = {
      "action": "export",
      "account_id": localStorage.getItem("account_user"),
      "invoice_id": dataId,
      "tax": true,
      "send": true
    }
    toastr.info("wait a little")
    dispatch(onSendInvoice(export_data))
    setModalOneSend(false)
  };

  const onClickSendListTrue = () => {
    if (startDate2==="" || endDate2===""){
      toastr.error("Date Error");
    }
    else{
      const export_data = {
      action: "export",
      account_id: localStorage.getItem("account_user"),
      start_date: startDate2+" 00:00:00",
      end_date: endDate2+" 23:59:59",
      customer_id: params.id,
      tax: true,
      send: true
    }
    toastr.info("wait a little")
    dispatch(onSendListInvoice(export_data))
    setModalListSend(false)
    }
  };


  const onClickSendListFalse = () => {
    if (startDate2==="" || endDate2===""){
      toastr.error("Date Error");
    }
    else{
      const export_data = {
      action: "export",
      account_id: localStorage.getItem("account_user"),
      start_date: startDate2+" 00:00:00",
      end_date: endDate2+" 23:59:59",
      customer_id: params.id,
      tax: null,
      send: true
    }
    toastr.info("wait a little")
    dispatch(onSendListInvoice(export_data))
    setModalListSend(false)
    }
  };

  const updateCustomer = () => {
    const updateCustomer = {
      id: invoices[0]?.customer_id?.id,
      email: customerDataInfo,
      full_name: invoices[0]?.customer_id?.full_name || "",
      street2: invoices[0]?.customer_id?.street2 || "",
      postal_code: invoices[0]?.customer_id?.postal_code || "",
      street1: invoices[0]?.customer_id?.street1 || "",
      country: invoices[0]?.customer_id?.country || "",
      phone: invoices[0]?.customer_id?.phone || "",
      phone2: invoices[0]?.customer_id?.phone2 || ""
    };
    dispatch(onUpdateCustomer(updateCustomer));
    dispatch(onGetInvoiceCustomer(params.id));
    if (oneEmail===true){
      onClickSendOneFalse()
    }else {
      onClickSendListFalse()
    }
    setEmailModal(false)
  }

  const previewDetail = () => {
    if (startDate2==="" || endDate2===""){
      toastr.error("Date Error");
    }
    else{
      const url = ("/invoices-detail-list/"+params.id+"?from_date="+startDate2+"&to_date="+endDate2)
      window.open(url)
    }
  }

  const onClickNext = (data) => {
    history.push("/invoices-detail/"+data)
  }

  const onClickPrev = () => {
       history.goBack();
   };

  let isAdmin = false;
  if (localStorage.getItem("status_user")){
    if(localStorage.getItem("status_user")==="admin"){
      isAdmin=true
    }
  }

  return (
    <React.Fragment>
      <ModalExportList
          show={modalList}
          onClickTrue={onClickExportListTrue}
          onClickFalse={onClickExportListFalse}
          dateStart={event => setStartDate2(event.target.value)}
          dateEnd={event => setEndDate2(event.target.value)}
          onCloseClick={() => setModalList(false)}
      />
      <ModalTask
          show={modalOne}
          onClickTrue={onClickExportOneTrue}
          onClickFalse={onClickExportOneFalse}
          onCloseClick={() => setModalOne(false)}
      />
      <ModalSend
          show={modalOneSend}
          onClickTrue={onClickSendOneTrue}
          onClickFalse={onClickSendOneFalse}
          onCloseClick={() => setModalOneSend(false)}
          email={customerDataInfo}
          setEmail={event => setCustomerDataInfo(event.target.value)}
          update={updateCustomer}
          startEmail={invoices[0]?.customer_id?.email}
          oneEmail={() => setOneEmail(true)}
          modalSave={() => setEmailModal(true)}
      />
      <ModalSendList
          show={modalListSend}
          onClickTrue={onClickSendListTrue}
          onClickFalse={onClickSendListFalse}
          dateStart={event => setStartDate2(event.target.value)}
          dateEnd={event => setEndDate2(event.target.value)}
          dateStartMonth={event => setStartDate2(event)}
          dateEndMonth={event => setEndDate2(event)}
          onCloseClick={() => setModalListSend(false)}
          email={customerDataInfo}
          setEmail={event => setCustomerDataInfo(event.target.value)}
          update={updateCustomer}
          preview={previewDetail}
          startEmail={invoices[0]?.customer_id?.email}
          oneEmail={() => setOneEmail(false)}
          modalSave={() => setEmailModal(true)}
      />
      <ModalSave
          show={emailModal}
          update={updateCustomer}
          onCloseClick={() => setEmailModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="AutoPro" breadcrumbItem="Invoices Customer" />

          {isMobile ? null : (
              <Col xl={12}>
                <Card>
                    <div className="d-sm-flex flex-wrap">
                      <div className="position-relative">
                        <div className="search-box me-xxl-2 my-3 my-xxl-0 d-inline-block">
                          <div className="position-relative">
                            { isAdmin ?
                              <Button
                                color="success"
                                onClick={() => onClickSendList()}
                            >
                              Invoice Statement
                            </Button> : null
                            }
                          </div>
                        </div>
                      </div>
                      <div className="position-relative">
                        <div className="search-box me-xxl-2 my-3 my-xxl-0 d-inline-block">
                          <div className="position-relative">
                            <Button
                              color="warning"
                              onClick={() => setModalList(true)}
                            >
                              PDF
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="position-relative">
                          <div className="search-box me-xxl-2 my-3 my-xxl-0 d-inline-block">
                            <div className="position-relative">
                              <Row>
                                <Col>
                                  <label htmlFor="search-bar-0" className="search-label">
                                    <Input
                                        type="date"
                                        className="form-control"
                                        autoComplete="off"
                                        onChange={(event) => setStartDate(event.target.value)}
                                    />
                                    </label>
                                  </Col>
                                  <Col>
                                    <label htmlFor="search-bar-0" className="search-label">
                                      <Input
                                          type="date"
                                          className="form-control"
                                          autoComplete="off"
                                          onChange={(event) => setEndDate(event.target.value)}
                                      />
                                      </label>
                                  </Col>
                                </Row>
                              </div>
                          </div>
                      </div>
                      <div className="position-relative ms-auto">
                          <div className="search-box me-xxl-2 my-3 my-xxl-0 d-inline-block">
                            <div className="position-relative">
                              <ul className="nav nav-pills">
                                <li className="nav-item">
                                  <Link
                                    to="#"
                                    className={classNames(
                                      { active: periodType === "" },
                                      "nav-link"
                                    )}
                                    onClick={() => {
                                      onChangeChartPeriod("");
                                    }}
                                    id="all"
                                  >
                                    All
                                  </Link>
                                </li>
                                <li className="nav-item">
                                  <Link
                                    to="#"
                                    className={classNames(
                                      { active: periodType === "final" },
                                      "nav-link"
                                    )}
                                    onClick={() => {
                                      onChangeChartPeriod("final");
                                    }}
                                    id="final"
                                  >
                                    Final
                                  </Link>{" "}
                                </li>
                                <li className="nav-item">
                                  <Link
                                    to="#"
                                    className={classNames(
                                      { active: periodType === "cancel" },
                                      "nav-link"
                                    )}
                                    onClick={() => {
                                      onChangeChartPeriod("cancel");
                                    }}
                                    id="cancel"
                                  >
                                    Cancel
                                  </Link>
                                </li>
                                <li className="nav-item">
                                  <Link
                                    to="#"
                                    className={classNames(
                                      { active: periodType === "draft" },
                                      "nav-link"
                                    )}
                                    onClick={() => {
                                      onChangeChartPeriod("draft");
                                    }}
                                    id="draft"
                                  >
                                    Draft
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                      </div>
                    </div>
                </Card>
            </Col>
          )}

          {isMobile ?
              (
                  <Row>
                      {map(filterDate, (invoice, key) => (
                        <CardInvoice data={invoice} key={"_invoice_" + key} />
                      ))}
                  </Row>
              ) :
              (
                  <Col lg="12">
                    <div className="">
                      <div className="table-responsive">
                        <Table className="project-list-table table-nowrap align-middle table-borderless">
                          <thead>
                            <tr>
                              <th scope="col" style={{ width: "100px" }}>
                                Invoice
                              </th>
                              <th scope="col" >Status</th>
                              <th scope="col" >Employee</th>
                              <th scope="col">Total</th>
                              <th scope="col">Create Date</th>
                              <th scope="col" style={{ width: "150px" }}>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filterDate.map((item, key) => (
                              <tr key={key} onClick={() => onClickNext(item.id)}>
                                <td>{item.number}</td>
                                <td>
                                  {<TableInvoice item={item} />}
                                </td>
                                <td>
                                  {item.crew_id.username}
                                </td>
                                <td>$ {item.total_sum}</td>
                                <td>{item.finished_at}</td>
                                <td onClick={e => e.stopPropagation()}>
                                    <ul className="list-unstyled hstack gap-1 mb-0">

                                        <li>
                                          <Button
                                              to="#"
                                              className="btn btn-sm btn-soft-success"
                                              onClick={event => onClickSendOne(item)}
                                          >
                                            <i className="mdi mdi-email-send" id="deletetooltip"/>
                                          </Button>
                                        </li>

                                      <li>
                                          <Button
                                              to="#"
                                              className="btn btn-sm btn-soft-warning"
                                              onClick={event => onClickExportOne(item.id)}
                                          >
                                              <i className="mdi mdi-file-pdf" id="deletetooltip" />
                                          </Button>
                                      </li>

                                      <li>
                                          <Link
                                              to={"/invoices-detail/"+item.id}
                                              className="btn btn-sm btn-soft-primary"
                                          >
                                              <i className="mdi mdi-page-next" id="deletetooltip" />
                                          </Link>
                                      </li>

                                  </ul>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </Col>
              )
          }
        </Container>
      </div>
    </React.Fragment>
  );
};

InvoiceCustomer.propTypes = {
  match: PropTypes.any,
};

export default withRouter(InvoiceCustomer);
