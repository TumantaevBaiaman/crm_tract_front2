import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import {
    Card,
    CardBody,
    Col,
    Container, DropdownItem, DropdownMenu, DropdownToggle,
    Input, Label,
    Row,
    Table, UncontrolledDropdown,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";

import {
    getReportTax as onGetReportTax
} from "store/actions";
import { useSelector, useDispatch } from "react-redux";
import AccordionContent from "components/Accordion/Accordion";

const ReportTax = props => {

  document.title="Tax Reports | AutoPro";

  const dispatch = useDispatch()
  if (localStorage.getItem("invoiceId")){
        localStorage.removeItem("invoiceId");
      }

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
  }

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const { tax } = useSelector(state => ({
    tax: state.Report.taxData,
  }))

  const onClickRun = () => {
      if (startDate!=="")get_data.from_date=startDate;
      if (endDate!=="")get_data.to_date=endDate;
      dispatch(onGetReportTax(get_data))
  }

  const [dateData, setDateData] = useState("Month")
  const onClickToday = () => {
      setEndDate(year+"-"+month+"-"+date)
      setStartDate(year+"-"+month+"-"+date)
      setDateData("Today")
  }
  const onClickWeek = () => {
      const today = new Date();
      const dayOfWeek = today.getDay();
      const week = new Date();
      if (dayOfWeek===0){
          week.setDate(today.getDate()-7);
      }else week.setDate(today.getDate()-(dayOfWeek-1));
      let w1 = ''
      let w2 = ''
      if (week.getDate()<10)  {  w1 ="0"+week.getDate().toString()} else {  w1 =week.getDate().toString()}
      if ((week.getMonth()+1)<10)  {  w2 ="0"+(week.getMonth()+1).toString()} else {  w2 =(week.getMonth()+1).toString()}
      setEndDate(year+"-"+month+"-"+date)
      setStartDate(year+"-"+w2+"-"+w1)
      setDateData("Week")
  }

  const onClickMonth = () => {
      setStartDate(year+"-"+month+"-"+"01")
      setEndDate(year+"-"+month+"-"+date)
      setDateData("Month")
  }

  useEffect(() => {
    dispatch(onGetReportTax(get_data))
  }, [dispatch])

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
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="AutoPro" breadcrumbItem="Tax Reports" />

          <Col xl={12}>
              <Card>
                <CardBody>
                  <AccordionContent text="open">
                  <div className="d-sm-flex flex-wrap">
                  <Col lg={8}>
                    <div className="position-relative">
                        <div className="search-box me-xxl-2 my-3 my-xxl-0 d-inline-block">
                          <div className="position-relative">
                            <Row>
                              <Col>
                                  <div className="d-inline-flex">
                                      <Label className="form-label align-center mt-2 me-2">InvoiceDate: </Label>
                                      <Input
                                          type="date"
                                          className="form-control"
                                          autoComplete="off"
                                          value={startDate || year+"-"+month+"-"+"01"}
                                          onChange={(event) => setStartDate(event.target.value)}
                                      />
                                  </div>
                                </Col>
                                <Col>
                                    <div className="d-inline-flex ms-sm-5">
                                          <Label className="form-label align-center mt-2 me-2">GenerateDate:</Label>
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
                            </div>
                        </div>
                    </div>
                  </Col>
                  <Col lg={4} className="float-end">
                        <div className="text-end d-flex">
                            <UncontrolledDropdown>
                                <DropdownToggle tag="a" to="#" className="card-drop w-md" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className={"bx bx-calendar-check btn w-lg me-4"+color_btn()}> <strong className="ms-2">{dateData}</strong> </i>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-end">
                                    <DropdownItem
                                        className="btn btn-soft-success w-lg font-size-14"
                                        // href={"/car-create/"+params.id}
                                        onClick={onClickToday}
                                    >
                                        <i className="bx bx-calendar align-middle me-2"/>
                                        Today
                                    </DropdownItem>
                                    <DropdownItem
                                        className="btn btn-soft-success w-lg font-size-14"
                                        // href={"/car-create/"+params.id}
                                        onClick={onClickWeek}
                                    >
                                        <i className="bx bx-calendar align-middle me-2"/>
                                        Week
                                    </DropdownItem>
                                    <DropdownItem
                                        className="btn btn-soft-success w-lg font-size-14"
                                        // href={"/car-create/"+params.id}
                                        onClick={onClickMonth}
                                    >
                                        <i className="bx bx-calendar align-middle me-2"/>
                                        Month
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <button className={"btn w-md form-control"+color_btn()} onClick={onClickRun}>Run</button>
                        </div>
                    </Col>
                  </div>
                  </AccordionContent>
                </CardBody>
              </Card>
            </Col>

          <Col lg="12">
            <div className="">
              <div className="table-responsive">
                <Table className="project-list-table table-nowrap align-middle table-borderless">
                  <thead>
                    <tr className="bg-success text-white">
                      <th scope="col">
                        Tax Name
                      </th>
                      <th scope="col" >Rate</th>
                      <th scope="col" >Number of Invoices</th>
                      <th scope="col">Invoices SubTotal</th>
                      <th scope="col">Invoices Total</th>
                      <th scope="col">Tax Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                        <td>
                            {tax?.name}
                        </td>
                        <td>
                            {tax?.rate} %
                        </td>
                        <td>
                            {tax?.invoices_count}
                        </td>
                        <td>
                            $ {Math.floor(tax?.subtotal*100)/100 || 0}
                        </td>
                        <td>
                            $ {Math.floor(tax?.gross*100)/100 || 0}
                        </td>
                        <td>
                            $ {Math.floor(tax?.tax*100)/100 || 0}
                        </td>
                      </tr>
                  </tbody>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>
                                <strong>totals</strong>
                            </td>
                            <td className="text-success">
                                <strong>$ {Math.floor(tax?.subtotal*100)/100 || 0}</strong>
                            </td>
                            <td className="text-success">
                                <strong>$ {Math.floor(tax?.gross*100)/100 || 0}</strong>
                            </td>
                            <td className="text-success">
                                <strong>$ {Math.floor(tax?.tax*100)/100 || 0}</strong>
                            </td>
                          </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};

ReportTax.propTypes = {
  match: PropTypes.any,
};

export default withRouter(ReportTax);
