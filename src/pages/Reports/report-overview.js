import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import {
    Card,
    CardBody,
    Col,
    Container, DropdownItem,
    DropdownMenu,
    DropdownToggle, Input, Label,
    Row,
    Table,
    UncontrolledDropdown
} from "reactstrap";
import { isEmpty, map } from "lodash";

import Breadcrumbs from "../../components/Common/Breadcrumb";

import {
    getCustomers as onGetEmployee,
    getCustomersData as onGetCustomers,
    getMyDay as onGetMyDay,
    getInvoices as onGetInvoices, exportInvoice as onExportInvoice,
} from "store/actions"
import { useSelector, useDispatch } from "react-redux";
import ge from "react-datepicker";
import AccordionContent from "components/Accordion/Accordion";
import ModalTask from "../Invoices/ModalTask";
import toastr from "toastr";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ReportOverview = props => {

  document.title="Invoice Report Overview | AutoPro";

  const dispatch = useDispatch()
  if (localStorage.getItem("invoiceId")){
        localStorage.removeItem("invoiceId");
      }

  const { employee } = useSelector(state => ({
    employee: state.ecommerce.customers,
  }));

  const { customers } = useSelector(state => ({
    customers: state.Customer.customers,
  }));

  let newDate = new Date()
  let date_raw = newDate.getDate();
  let month_raw = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let date = ''
  let month = ''

  if (date_raw<10)  {  date ="0"+date_raw.toString()} else {  date =date_raw.toString()}
  if (month_raw<10)  {  month ="0"+month_raw.toString()} else {  month =month_raw.toString()}

  let get_data = {
      account_id: localStorage.getItem("account_user"),
      from_date: year+"-"+month+"-"+"01",
      to_date: year+"-"+month+"-"+date,
      crew: null,
      car_id: null,
      customer_id: null,
      number: null,
      finished_at: null,
      start_at: null,
      page: null,
      page_size: null,
  }

  const [customerActiv, setCustomerActiv] = useState(true)
  const [crewActiv, setCrewActiv] = useState(false)
  const [invoiceNumberActiv, setInvoiceNumberActiv] = useState(false)
  const [generatedDateActiv, setGeneratedDateActiv] = useState(false)
  const [invoiceDateActiv, setInvoiceDateActiv] = useState(false)
  const [modal, setModal] = useState(false)

  const [startDate, setStartDate] = useState('')
  const [dataEmployee, setDataEmployee] = useState(-1)
  const [dataCustomer, setDataCustomer] = useState(-1)
  const [invoiceNumber, setInvoiceNumber] = useState('')
  const [endDate, setEndDate] = useState('')
  const [invoiceDate, setInvoiceDate] = useState('')
  const [generatedDate, setGereratedDate] = useState('')
  const [filter, setFilter] = useState("Customer")
  const [dateData, setDateData] = useState("Range Date")
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const defaultDate = new Date();
    const lastDayOfPrevMonth = new Date(defaultDate.getFullYear(), defaultDate.getMonth()+1, 0);
    return lastDayOfPrevMonth;
  });
  const { invoices } = useSelector(state => ({
    invoices: state.invoices.myDay,
  }))

  const onClickRun = () => {
      if (startDate!=="")get_data.from_date=startDate;
      if (endDate!=="")get_data.to_date=endDate;
      if (invoiceNumber!=="")get_data.number=invoiceNumber
      if (generatedDate!=="")get_data.start_at=generatedDate;
      if (invoiceDate!=="")get_data.finished_at=invoiceDate;
      if (dataEmployee!==-1)get_data.crew=dataEmployee;
      if (dataCustomer!==-1)get_data.customer_id=dataCustomer;
      dispatch(onGetMyDay(get_data));
  }

  useEffect(() => {
    dispatch(onGetInvoices());
    dispatch(onGetEmployee());
    dispatch(onGetCustomers());
  }, [dispatch])
  const onFilter = (data) => {
    setFilter(data)
    if (data==="Customer"){
        if (customerActiv!==true){
            setCustomerActiv(true)
        }
        setInvoiceNumberActiv(false)
        setCrewActiv(false)
        setGeneratedDateActiv(false)
        setInvoiceDateActiv(false)
    }else if (data==="Invoice Number"){
        if (invoiceNumberActiv!==true){
            setInvoiceNumberActiv(true)
        }
        setCustomerActiv(false)
        setCrewActiv(false)
        setGeneratedDateActiv(false)
        setInvoiceDateActiv(false)
    }else if (data==="Crew"){
        if (crewActiv!==true){
            setCrewActiv(true)
        }
        setCustomerActiv(false)
        setInvoiceNumberActiv(false)
        setGeneratedDateActiv(false)
        setInvoiceDateActiv(false)
    }else if (data==="Generated Date"){
        if (generatedDateActiv!==true){
            setGeneratedDateActiv(true)
        }
        setCustomerActiv(false)
        setInvoiceNumberActiv(false)
        setCrewActiv(false)
        setInvoiceDateActiv(false)
    }else if (data==="Invoice Date"){
        if (invoiceDateActiv!==true){
            setInvoiceDateActiv(true)
        }
        setCustomerActiv(false)
        setInvoiceNumberActiv(false)
        setCrewActiv(false)
        setGeneratedDateActiv(false)
    }
  }

  useEffect(() => {
    dispatch(onGetMyDay(get_data))
  }, [dispatch])

  const onClickCustomer = (data) => {
      setDataCustomer(data);
      setDataEmployee(-1);
      setInvoiceNumber("");
      setInvoiceDate("");
      setGereratedDate("")
  }

  const onClickCrew = (data) => {
      setDataEmployee(data);
      setDataCustomer(-1);
      setInvoiceNumber("");
      setInvoiceDate("");
      setGereratedDate("")
  }

  const onClickGDate = (data) => {
      setDataCustomer(-1);
      setDataEmployee(-1);
      setInvoiceNumber("");
      setInvoiceDate("");
      setGereratedDate(data)
  }

  const onClickIDate = (data) => {
      setDataCustomer(-1);
      setDataEmployee(-1);
      setInvoiceNumber("");
      setInvoiceDate(data);
      setGereratedDate("")
  }

  const onClickNumber = (data) => {
      setDataCustomer(-1);
      setDataEmployee(-1);
      setInvoiceNumber(data);
      setInvoiceDate("");
      setGereratedDate("")
  }

  const onClickOpen = (data) => {
      const url = ("/invoices-detail/"+data)
      window.open(url)
  }

  const onClickExportTask = () => {
    const export_data = {
      "action": "export",
      "account_id": localStorage.getItem("account_user"),
      "invoice_id": invoices?.[0]?.invoices?.[0]?.id,
      "tax": true,
      "send": null
    }
    toastr.info("wait a little")
    dispatch(onExportInvoice(export_data))
    setModal(false)
  };

  const onClickExportNoTask = () => {
    const export_data = {
      "action": "export",
      "account_id": localStorage.getItem("account_user"),
      "invoice_id": invoices?.[0]?.invoices?.[0]?.id,
      "tax": null,
      "send": null
    }
    toastr.info("wait a little")
    dispatch(onExportInvoice(export_data))
    setModal(false)
  };

  const onChangeRangeMonth = (data) => {
      setSelectedMonth(data)
      const currentDate = new Date(data);
      const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
      const monthDate = currentDate.getMonth()+1
      const yearDate = currentDate.getFullYear()
      let month_f = ''
      if (monthDate<10)  {  month_f ="0"+monthDate.toString()} else {  month_f =monthDate.toString()}
      setStartDate(yearDate+"-"+month_f+"-"+"01")
      setEndDate(yearDate+"-"+month_f+"-"+lastDayOfMonth)
  }

  const color_btn = () => {
      if (localStorage.getItem("account_status")==="1"){
          return " btn-success"
      }
      else {
          return " bg-status-account-btn"
      }
  }

  return (
    <React.Fragment>
      <ModalTask
          show={modal}
          onClickTrue={onClickExportTask}
          onClickFalse={onClickExportNoTask}
          onCloseClick={() => setModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="AutoPro" breadcrumbItem="Invoice Report Overview" />
          <AccordionContent text="open">
          <br/>
          <Col xl={12}>
              <Card>
                  <div className="d-sm-flex flex-wrap">
                    <Col lg={6}>
                        <div className="position-relative">
                            <div className="search-box my-3 my-xxl-0 d-inline-block">
                              <div className="position-relative">
                                  {dateData==="Range Date" ? (
                                      <Row>
                                          <Col lg={4}>
                                              <UncontrolledDropdown>
                                                <DropdownToggle tag="a" to="#" className="card-drop w-md font-size-12" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i className={"bx bx-filter btn w-lg me-4"+color_btn()}> <strong className="ms-2">{dateData}</strong> </i>
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem
                                                        className="btn btn-soft-primary w-lg font-size-12"
                                                        onClick={() => setDateData("Range Date")}
                                                    >
                                                        <i className="bx bx-calendar align-middle me-2"/>
                                                        Range Date
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        className="btn btn-soft-primary w-lg font-size-12"
                                                        onClick={() => setDateData("Month")}
                                                    >
                                                        <i className="bx bx-calendar align-middle me-2"/>
                                                        Month
                                                    </DropdownItem>
                                                </DropdownMenu>
                                              </UncontrolledDropdown>
                                          </Col>
                                        <Col lg={4}>
                                            <div className="d-inline-flex">
                                                <Label className="form-label align-center mt-2">StartDate  </Label>
                                                <Input
                                                    type="date"
                                                    className="form-control"
                                                    autoComplete="off"
                                                    value={startDate || year+"-"+month+"-"+"01"}
                                                    onChange={(event) => setStartDate(event.target.value)}
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={4}>
                                            <div className="d-inline-flex">
                                                <Label className="form-label align-center mt-2 ms-sm-4">EndDate  </Label>
                                                <Input
                                                    type="date"
                                                    className="form-control"
                                                    autoComplete="off"
                                                    value={endDate || year+"-"+month+"-"+date}
                                                    onChange={(event) => setEndDate(event.target.value)}
                                                />
                                            </div>
                                          </Col>
                                        </Row>
                                  ): (
                                      <Row>
                                          <Col lg={4}>
                                              <UncontrolledDropdown>
                                                <DropdownToggle tag="a" to="#" className="card-drop w-md font-size-12" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i className={"bx bx-filter btn w-lg me-4"+color_btn()}> <strong className="ms-2">{dateData}</strong> </i>
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem
                                                        className="btn btn-soft-primary w-lg font-size-12"
                                                        onClick={() => setDateData("Range Date")}
                                                    >
                                                        <i className="bx bx-calendar align-middle me-2"/>
                                                        Range Date
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        className="btn btn-soft-primary w-lg font-size-12"
                                                        onClick={() => setDateData("Month")}
                                                    >
                                                        <i className="bx bx-calendar align-middle me-2"/>
                                                        Month
                                                    </DropdownItem>
                                                </DropdownMenu>
                                              </UncontrolledDropdown>
                                          </Col>
                                          <Col lg={8}>
                                              <div className="ms-4">
                                                  <DatePicker
                                                    id="month-picker"
                                                    dateFormat="MM/yyyy"
                                                    className="form-control"
                                                    showMonthYearPicker
                                                    selected={selectedMonth}
                                                    onChange={onChangeRangeMonth}
                                                  />
                                              </div>
                                          </Col>
                                      </Row>
                                  )}

                                </div>
                            </div>
                        </div>
                    </Col>
                      <Col lg={6}>
                          <div className="position-relative text-end">
                            <div className="me-xxl-2 my-3 my-xxl-0 d-inline-block">
                              <div className="position-relative w-100 input-group">
                                <Row>
                                  <Col>
                                  <UncontrolledDropdown>
                                      <DropdownToggle type="button" className={"w-xl font-size-12 form-control" + color_btn()}>
                                          {filter}  <i className="mdi mdi-filter"></i>
                                      </DropdownToggle>
                                      <DropdownMenu>
                                        <DropdownItem onClick={() => onFilter("Customer")}>Customer</DropdownItem>
                                        <DropdownItem onClick={() => onFilter("Invoice Number")}>Invoice Number</DropdownItem>
                                        <DropdownItem onClick={() => onFilter("Crew")}>Crew</DropdownItem>
                                        <DropdownItem onClick={() => onFilter("Generated Date")}>Generated Date</DropdownItem>
                                        <DropdownItem onClick={() => onFilter("Invoice Date")}>Invoice Date</DropdownItem>
                                      </DropdownMenu>
                                    </UncontrolledDropdown>
                                  </Col>
                                    <Col>
                                        {customerActiv ?
                                            <select
                                                className="w-lg form-select select2 mb-3 mb-xxl-0 w-xl"
                                                onChange={(event => {
                                                    if (event.target.value!=="Customer"){
                                                        onClickCustomer(event.target.value)
                                                    }else {
                                                        setDataCustomer('')}
                                                })}
                                                style={{width: "230px"}}
                                            >
                                                <option>Customer</option>
                                                    {
                                                        customers.map(option => (
                                                            <option key={option.id} value={option.id}>
                                                                {option.full_name}
                                                            </option>
                                                    ))}
                                            </select> : null
                                        }
                                        {invoiceNumberActiv ?
                                            <div className="w-100" style={{display: "flex", width: "230px"}}>
                                                <Input type="text" className="w-lg w-80" placeholder="Enter Invoice Number" value={invoiceNumber} onChange={event => onClickNumber(event.target.value)} style={{width: "200px"}}/>
                                                <button className="btn btn-danger w-20 ms-1" onClick={() => onClickNumber("")}><i className="bx bx-x"/></button>
                                            </div>
                                            : null
                                        }
                                        {crewActiv ?
                                            <select
                                                  className="w-lg form-select select2 mb-3 mb-xxl-0 w-xl"
                                                  onChange={(event => {
                                                      if (event.target.value!=="Employee"){
                                                          onClickCrew(event.target.value)
                                                      }else {
                                                          setDataEmployee('')
                                                      }
                                                  })}
                                                  style={{width: "230px"}}
                                            >
                                                <option>Employee</option>
                                                  {employee.map(option => (
                                                          <option key={option.id} value={option.id} >
                                                              {option?.lastname} {option?.username?.[0]}
                                                          </option>
                                                      ))}
                                            </select> : null
                                        }
                                        {generatedDateActiv ?
                                            <div className="w-100" style={{display: "flex", width: "230px"}}>
                                                <Input type="date" className="form-control w-lg " value={generatedDate} style={{width: "200px"}} onChange={event => onClickGDate(event.target.value)}/>
                                                <button className="btn btn-danger w-20 ms-1" onClick={() => onClickGDate("")}><i className="bx bx-x"/></button>
                                            </div>: null
                                        }
                                        {invoiceDateActiv ?
                                            <div className="w-100" style={{display: "flex", width: "230px"}}>
                                                <Input type="date" className="form-control w-lg" value={invoiceDate} style={{width: "200px"}} onChange={event => onClickIDate(event.target.value)}/>
                                                <button className="btn btn-danger w-20 ms-1" onClick={() => onClickIDate("")}><i className="bx bx-x"/></button>
                                            </div>: null
                                        }
                                    </Col>
                                    <Col >
                                      <div className="position-relative text-end">
                                        <div className="me-xxl-2 my-3 my-xxl-0 d-inline-block">
                                          <div className="position-relative">
                                            <Row>
                                                <Col>
                                                    <button className={"btn form-control" + color_btn()} onClick={onClickRun}>Run</button>
                                                </Col>
                                            </Row>
                                          </div>
                                        </div>
                                      </div>
                                    </Col>
                                </Row>
                              </div>
                            </div>
                          </div>
                      </Col>
                  </div>
              </Card>
            </Col>
          </AccordionContent>

          <Col lg="12">
            <div className="">
              <div className="table-responsive">
                  { invoices ?
                      <>
                      {map(Array.from(invoices).slice(0,-1), (invoice, key) => (
                        <Table key={key} className="project-list-table table-nowrap align-middle table-borderless">
                          <thead>
                            <tr className="bg-primary text-white">
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
                            <tr key={key2} onClick={() => onClickOpen(task?.id)}>
                              <td></td>
                              <td>{task?.crew_id.username}</td>
                              <td>{task?.number}</td>
                              <td>{task?.finished_at.substr(0,10)}</td>
                              <td>{task?.start_at.substr(0,10)}</td>
                              <td>$ {task?.total_sum}</td>
                            </tr>
                            ))}
                            <tr >
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                                <td><strong>Total</strong></td>
                                <td><strong className="text-primary">$ {invoice.total_sum_invoice}</strong></td>
                            </tr>
                          </tbody>
                        </Table>
                      ))}
                      </>
                  : null }
              </div>
            </div>
          </Col>
          <br/>
            {(invoices?.length === 2 && invoices?.[0]?.invoices?.length === 1 && filter === "Invoice Number") ? (
                <div className="w-md text-sm-end">
                  <button
                    className="btn btn-warning"
                    type="submit"
                    onClick={() => {
                      setModal(true)
                    }}
                  >
                    Export Invoice PDF
                  </button>
                </div>
            ): null}
        </Container>
      </div>
    </React.Fragment>
  );
};

ReportOverview.propTypes = {
  match: PropTypes.any,
};

export default withRouter(ReportOverview);
