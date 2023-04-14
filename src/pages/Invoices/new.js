import React, { useEffect, useState } from "react"
import {Card, CardBody, Col, Container, Input, Row} from "reactstrap"
import PropTypes from "prop-types"
import { Link, withRouter } from "react-router-dom"
import { map } from "lodash"

//redux
import { useSelector, useDispatch } from "react-redux"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

//Import Card invoice
import CardInvoice from "./card-invoice"
import {
    getCustomers as onGetEmployee,
    getCustomersData as onGetCustomers,
    getInvoiceDetail as onGetInvoiceDetail,
    getMyDay as onGetMyday,
    getInvoices as onGetInvoices,
} from "store/actions"
import classNames from "classnames";

const MyDay = props => {

  document.title = "My Day | AutoPro";

  const dispatch = useDispatch()
  if (localStorage.getItem("invoiceId")){
    localStorage.removeItem("invoiceId");
  }

  let get_data = {
      account_id: localStorage.getItem("account_user"),
      crew_id: null,
      car_id: null,
      customer_id: null,
      number: null,
      finished_at: null,
      start_at: null,
      page: null,
      page_size: null,
  }

  const [searchValue, setSearchValue] = useState('')
  const [startDate, setStartDate] = useState('')
  const [dataEmployee, setDataEmployee] = useState('')
  const [dataCustomer, setDataCustomer] = useState('')
  const [endDate, setEndDate] = useState('')
  const [periodType, setPeriodType] = useState("");

  const { invoices } = useSelector(state => ({
    invoices: state.invoices.myDay,
  }))

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
  const date_now = year+'-'+month+'-'+date

  if (startDate===""){
      get_data.start_at=date_now
  }

  const filterDate = invoices.filter(invoice => {
        if (dataEmployee==="") {
            if (startDate !== "" && endDate !== "") {
                return invoice.finished_at > startDate && invoice.finished_at < endDate && invoice.status.toLowerCase().includes(periodType.toLowerCase()) && (invoice.crew_id.lastname + invoice.crew_id.username).toLowerCase().includes(dataEmployee.toLowerCase()) && invoice.customer_id.full_name.toLowerCase().includes(dataCustomer.toLowerCase()) || invoice.finished_at.toLowerCase().includes(endDate.toLowerCase())
            }
            if (startDate !== "" && endDate === "") {
                return invoice.finished_at > startDate && invoice.status.toLowerCase().includes(periodType.toLowerCase()) && (invoice.crew_id.lastname + invoice.crew_id.username).toLowerCase().includes(dataEmployee.toLowerCase()) && invoice.customer_id.full_name.toLowerCase().includes(dataCustomer.toLowerCase())
            }
            if (startDate === "" && endDate !== "") {
                return invoice.finished_at < endDate && invoice.status.toLowerCase().includes(periodType.toLowerCase()) && (invoice.crew_id.lastname + invoice.crew_id.username).toLowerCase().includes(dataEmployee.toLowerCase()) && invoice.customer_id.full_name.toLowerCase().includes(dataCustomer.toLowerCase()) || invoice.finished_at.toLowerCase().includes(endDate.toLowerCase())
            } else {
                return invoice.status.toLowerCase().includes(periodType.toLowerCase()) && (invoice.crew_id.lastname + invoice.crew_id.username).toLowerCase().includes(dataEmployee.toLowerCase()) && invoice.customer_id.full_name.toLowerCase().includes(dataCustomer.toLowerCase()) && invoice.finished_at.toLowerCase().includes((year + '-' + month + '-' + date).toLowerCase())
            }
        } else {
            if (startDate!=="" && endDate!==""){
              return invoice.finished_at > startDate && invoice.finished_at < endDate && invoice.status.toLowerCase().includes(periodType.toLowerCase()) && (invoice.crew_id.lastname+invoice.crew_id.username).toLowerCase()===(dataEmployee.toLowerCase()) && invoice.customer_id.full_name.toLowerCase().includes(dataCustomer.toLowerCase()) || invoice.finished_at.toLowerCase().includes(endDate.toLowerCase())
            }
            if (startDate!=="" && endDate===""){
              return invoice.finished_at > startDate && invoice.status.toLowerCase().includes(periodType.toLowerCase()) && (invoice.crew_id.lastname+invoice.crew_id.username).toLowerCase()===(dataEmployee.toLowerCase()) && invoice.customer_id.full_name.toLowerCase().includes(dataCustomer.toLowerCase())
            }
            if (startDate==="" && endDate!==""){
              return invoice.finished_at < endDate && invoice.status.toLowerCase().includes(periodType.toLowerCase()) && (invoice.crew_id.lastname+invoice.crew_id.username).toLowerCase()===(dataEmployee.toLowerCase()) && invoice.customer_id.full_name.toLowerCase().includes(dataCustomer.toLowerCase()) || invoice.finished_at.toLowerCase().includes(endDate.toLowerCase())
            }
            else{
              return invoice.status.toLowerCase().includes(periodType.toLowerCase()) && (invoice.crew_id.lastname+invoice.crew_id.username).toLowerCase()===(dataEmployee.toLowerCase()) && invoice.customer_id.full_name.toLowerCase().includes(dataCustomer.toLowerCase()) && invoice.finished_at.toLowerCase().includes((year+'-'+month+'-'+date).toLowerCase())
            }
        }
    });

  const onChangeChartPeriod = (data) => {
    if (periodType !== data){
      setPeriodType(data)
    }
  }

  // const onClickRun = () => {
  //     if (startDate!=="")get_data.start_at=startDate;
  //     if (endDate!=="")get_data.finished_at=endDate;
  //     if (dataEmployee!==-1)get_data.crew_id=dataEmployee;
  //     if (dataCustomer!==-1)get_data.customer_id=dataCustomer;
  //     dispatch(onGetMyday(get_data));
  // }

  useEffect(() => {
    dispatch(onGetInvoices());
    dispatch(onGetEmployee());
    dispatch(onGetCustomers());
  }, [dispatch])

  useEffect(() => {
    dispatch(onGetInvoices());
  }, [dispatch])

  // let filterData = [];
  // if (invoices){
  //     if (invoices.results){
  //         filterData = invoices.results.splice(0,-1);
  //     };
  // }

  return (
      <React.Fragment>
          <div className="page-content">
            <Container fluid>
                <Breadcrumbs title="List" breadcrumbItem="My Day" />
                <Col lg={12}>
                    <Card>
                    <CardBody>
                      <div className="d-sm-flex flex-wrap">
                          <Col lg={4}>
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
                          </Col>
                          <Col lg={4}>
                              <div className="position-relative">
                            <div className="search-box me-xxl-2 my-3 my-xxl-0 d-inline-block">
                              <div className="position-relative">
                                <Row>
                                  <Col>
                                      <select
                                          className="form-control select2 mb-3 mb-xxl-0 w-xl"
                                          onChange={(event => {
                                              if (event.target.value!=="Employee"){
                                                  setDataEmployee(event.target.value)
                                              }
                                              else {
                                                  setDataEmployee('')
                                              }
                                          })}
                                      >
                                        <option>Employee</option>
                                          {
                                              employee.map(option => (
                                                  <option key={option.id} value={option.lastname+option.username}>
                                                      {option.lastname} {option.username}
                                                  </option>
                                              ))
                                          }
                                    </select>
                                  </Col>
                                    <Col>
                                      <select
                                          className="form-control select2 mb-3 mb-xxl-0 w-xl"
                                          onChange={(event => {
                                              if (event.target.value!=="Customer"){
                                                  setDataCustomer(event.target.value)
                                              }
                                              else {
                                                  setDataCustomer('')
                                              }
                                          })}
                                      >
                                        <option>Customer</option>
                                        {
                                              customers.map(option => (
                                                  <option key={option.id} value={option.full_name}>
                                                      {option.full_name}
                                                  </option>
                                              ))
                                          }
                                    </select>
                                    </Col>
                                </Row>
                              </div>
                            </div>
                              </div>
                          </Col>
                          <Col lg={4}>
                            <div className="position-relative ms-4 text-sm-end">
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
                          </Col>
                      </div>
                      {/* <div className="clearfix"></div> */}
                      {/*<StackedColumnChart periodData={periodData} dataColors='["--bs-primary", "--bs-warning", "--bs-success"]' />*/}
                    </CardBody>
                  </Card>
                </Col>

              <Row>
                {map(filterDate, (invoice, key) => (
                  <CardInvoice data={invoice} key={"_invoice_" + key} />
                ))}
              </Row>
            </Container>
          </div>
      </React.Fragment>
  )
}

MyDay.propTypes = {
  invoices: PropTypes.array,
  onGetInvoices: PropTypes.func,
}

export default withRouter(MyDay)
