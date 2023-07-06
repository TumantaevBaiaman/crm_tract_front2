import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import {
    Card,
    CardBody,
    Col,
    Container, DropdownItem, DropdownMenu, DropdownToggle,
    Input, Label,
    Row,
    Table, UncontrolledDropdown
} from "reactstrap";
import { isEmpty, map } from "lodash";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import {
  getReportsCrew as onGetReportCrew,
} from "store/actions"
//redux
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from "react-router-dom";
import AccordionContent from "components/Accordion/Accordion";
import DatePicker from "react-datepicker";

const ReportCrew = props => {

  document.title="Crew Revenue Report | AutoPro";

  const dispatch = useDispatch()
  const history = useHistory()
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

  const [invoiceDate, setInvoiceDate] = useState(year+"-"+month+"-"+"01")
  const [generatedDate, setGereratedDate] = useState(year+"-"+month+"-"+date)
  const [dateData, setDateData] = useState("Range Date")
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const defaultDate = new Date();
    const lastDayOfPrevMonth = new Date(defaultDate.getFullYear(), defaultDate.getMonth()+1, 0);
    return lastDayOfPrevMonth;
  });

  let get_data = {
    account_id: localStorage.getItem("account_user"),
    account_status: localStorage.getItem("account_status"),
    from_date: year+"-"+month+"-"+"01",
    to_date: year+"-"+month+"-"+date,
  }

  const { report_crew } = useSelector(state => ({
    report_crew: state.Report.crewData,
  }))

  const onClickRun = () => {
      if (generatedDate!=="")get_data.to_date=generatedDate;
      if (invoiceDate!=="")get_data.from_date=invoiceDate;
      dispatch(onGetReportCrew(get_data))
  }
  useEffect(() => {
    dispatch(onGetReportCrew(get_data))
  }, [dispatch])

  const onClickToday = () => {
      setGereratedDate(year+"-"+month+"-"+date)
      setInvoiceDate(year+"-"+month+"-"+date)
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
      setGereratedDate(year+"-"+month+"-"+date)
      setInvoiceDate(year+"-"+w2+"-"+w1)
      setDateData("Week")
  }

  const onClickMonth = () => {
      setInvoiceDate(year+"-"+month+"-"+"01")
      setGereratedDate(year+"-"+month+"-"+date)
      setDateData("Month")
  }

  const onChangeRangeMonth = (data) => {
      setSelectedMonth(data)
      const currentDate = new Date(data);
      const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
      const monthDate = currentDate.getMonth()+1
      const yearDate = currentDate.getFullYear()
      let month_f = ''
      if (monthDate<10)  {  month_f ="0"+monthDate.toString()} else {  month_f =monthDate.toString()}
      setInvoiceDate(yearDate+"-"+month_f+"-"+"01")
      setGereratedDate(yearDate+"-"+month_f+"-"+lastDayOfMonth)
  }


  const onClickNext = (data) => {
    if (generatedDate===""){
          setGereratedDate(year+"-"+month+"-"+date)
      }
      if (invoiceDate===""){
          setInvoiceDate(year+"-"+month+"-"+"01")
      }
    const url = ("/report-overview-detail/"+data+"?from_date="+(invoiceDate || (year+"-"+month+"-"+"01"))+"&to_date="+(generatedDate || year+"-"+month+"-"+date)+"&data=crew")
    window.open(url)
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
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="AutoPro" breadcrumbItem="Crew Revenue Report" />

          <Col xl={12}>
              <Card>
                  <AccordionContent text="open me">
                    <div className="d-sm-flex flex-wrap">
                      <Col lg={10}>
                        <div className="position-relative">
                            <div className="search-box me-xxl-2 my-3 my-xxl-0 d-inline-block">
                              <div className="position-relative w-100">
                                {dateData==="Range Date" ? (
                                  <Row>
                                      <Col lg={4} style={{width: "30%"}}>
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
                                    <Col lg={4} style={{width: "35%"}}>
                                        <div className="d-inline-flex">
                                            <Label className="form-label align-center mt-2">StartDate  </Label>
                                            <Input
                                                type="date"
                                                className="form-control"
                                                autoComplete="off"
                                                value={invoiceDate || year+"-"+month+"-"+"01"}
                                                onChange={(event) => setInvoiceDate(event.target.value)}
                                            />
                                        </div>
                                    </Col>
                                    <Col lg={4} style={{width: "35%"}}>
                                        <div className="d-inline-flex">
                                            <Label className="form-label align-center mt-2 ms-sm-4">EndDate  </Label>
                                            <Input
                                                type="date"
                                                className="form-control"
                                                autoComplete="off"
                                                value={generatedDate || year+"-"+month+"-"+date}
                                                onChange={(event) => setGereratedDate(event.target.value)}
                                            />
                                        </div>
                                      </Col>
                                    </Row>
                              ): (
                                  <Row>
                                      <Col lg={4} style={{width: "30%"}}>
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
                                      <Col lg={8} style={{width: "70%"}}>
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
                      <Col lg={2} className="float-end">
                        <div className="text-end d-flex">
                            <button className={"btn w-md form-control"+color_btn()} onClick={onClickRun}>Run</button>
                        </div>
                    </Col>
                    </div>
                  </AccordionContent>
              </Card>
            </Col>

          <Col lg="12">
            <div className="">
              <div className="table-responsive">
                <Table className="project-list-table table-nowrap align-middle table-borderless">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th scope="col">
                        Crew Name
                      </th>
                      <th scope="col" >Number of invoices</th>
                      <th scope="col" style={{ width: "150px" }}>Sub Total</th>
                      <th scope="col" style={{ width: "150px" }}>Gross Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {map(report_crew?.list_customers, (crew, key) => (
                      <tr key={key} onClick={()=>onClickNext(crew.id)}>
                        <td>{crew?.username}</td>
                        <td>{crew?.invoice_count}</td>
                        <td>$ {Math.floor((crew?.total_sum)*100)/100 || 0   }</td>
                        <td>$ {Math.floor((crew?.gross)*100)/100 || 0}</td>
                      </tr>
                    ))}
                      <tr className="text-primary">
                        <td><strong className="text-black">Totals</strong></td>
                        <td><strong>{report_crew?.total_count}</strong></td>
                        <td><strong>$ {Math.floor((report_crew?.total_all_sum)*100)/100 || 0}</strong></td>
                        <td><strong>$ {Math.floor((report_crew?.total_gross)*100)/100 || 0}</strong></td>
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

ReportCrew.propTypes = {
  match: PropTypes.any,
};

export default withRouter(ReportCrew);
