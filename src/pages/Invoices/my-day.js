import React, { useEffect, useState } from "react"
import {
    Card,
    CardBody, CardTitle,
    Col,
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Input, NavItem,
    Row, Table,
    UncontrolledDropdown
} from "reactstrap"
import PropTypes from "prop-types"
import {Link, useHistory, withRouter} from "react-router-dom"
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
    invoiceMyDay as onInvoiceMyDay,
    getInvoices as onGetInvoices, getMyDay as onGetMyDay, getProfile,
} from "store/actions"
import classNames from "classnames";
import {use} from "i18next";
import ListInvoices from "./list-invoice";
import AccordionContent from "components/Accordion/Accordion"
import ModalNewAccount from "pages/Dashboard/modal-new-account"
import {useMediaQuery} from "react-responsive";

const MyDay = props => {

  document.title = "My Day | AutoPro";

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const dispatch = useDispatch()
  const history = useHistory()
  if (localStorage.getItem("invoiceId")){
    localStorage.removeItem("invoiceId");
  }

  const [searchValue, setSearchValue] = useState('')
  const [dataEmployee, setDataEmployee] = useState(-1)
  const [dataCustomer, setDataCustomer] = useState(-1)
  const [endDate, setEndDate] = useState('')
  const [periodType, setPeriodType] = useState("");
  const [activList, setActivList] = useState("")
  const [activCard, setActivCard] = useState("active")
  const [activListTrue, setActivListTrue] = useState(false)
  const [activCardTrue, setActivCardTrue] = useState(true)

  const { invoices } = useSelector(state => ({
    invoices: state.invoices.invoicesMyDay,
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

  const [startDate, setStartDate] = useState(year+"-"+month+"-"+date)

  let get_data = {
    account_id: localStorage.getItem("account_user"),
    account_status: localStorage.getItem("account_status"),
    from_date: year+"-"+month+"-"+date,
    to_date: year+"-"+month+"-"+date,
    crew_id: null,
    customer_id: null
    }
  useEffect(() => {
    dispatch(onInvoiceMyDay(get_data));
    dispatch(onGetEmployee());
    dispatch(onGetCustomers());
  }, [dispatch])

  const onClickRun = () => {
      if (startDate!=="")get_data.from_date=startDate;
      if (startDate!=="")get_data.to_date=startDate;
      if (dataEmployee!==-1)get_data.crew_id=dataEmployee;
      if (dataCustomer!==-1)get_data.customer_id=dataCustomer;
      dispatch(onInvoiceMyDay(get_data));
  }

  const onChangeChartPeriod = (data) => {
    if (periodType !== data){
      setPeriodType(data)
    }
  }

  const onClickPrevDate = () => {
      const today = new Date(startDate);
      const week = new Date(startDate);
      week.setDate(today.getDate()-1);
      let w1 = ''
      let w2 = ''
      if (week.getDate()<10)  {  w1 ="0"+week.getDate().toString()} else {  w1 =week.getDate().toString()}
      if ((week.getMonth()+1)<10)  {  w2 ="0"+(week.getMonth()+1).toString()} else {  w2 =(week.getMonth()+1).toString()}
      get_data.from_date=year+"-"+w2+"-"+w1;
      get_data.to_date=year+"-"+w2+"-"+w1;
      if (dataEmployee!==-1)get_data.crew_id=dataEmployee;
      if (dataCustomer!==-1)get_data.customer_id=dataCustomer;
      setStartDate(week.getFullYear()+"-"+w2+"-"+w1)
      dispatch(onInvoiceMyDay(get_data));
  }

  const onClickNextDate = () => {
      const today = new Date(startDate);
      const week = new Date(startDate);
      week.setDate(today.getDate()+1);
      let w1 = ''
      let w2 = ''
      if (week.getDate()<10)  {  w1 ="0"+week.getDate().toString()} else {  w1 =week.getDate().toString()}
      if ((week.getMonth()+1)<10)  {  w2 ="0"+(week.getMonth()+1).toString()} else {  w2 =(week.getMonth()+1).toString()}
      get_data.from_date=year+"-"+w2+"-"+w1;
      get_data.to_date=year+"-"+w2+"-"+w1;
      if (dataEmployee!==-1)get_data.crew_id=dataEmployee;
      if (dataCustomer!==-1)get_data.customer_id=dataCustomer;
      setStartDate(week.getFullYear()+"-"+w2+"-"+w1)
      dispatch(onInvoiceMyDay(get_data));
  }

  const onChangeDateInput = (event) => {
      setStartDate(event.target.value)
      get_data.from_date=event.target.value;
      get_data.to_date=event.target.value;
      if (dataEmployee!==-1)get_data.crew_id=dataEmployee;
      if (dataCustomer!==-1)get_data.customer_id=dataCustomer;
      dispatch(onInvoiceMyDay(get_data))
    }

  useEffect(() => {
    dispatch(onInvoiceMyDay(get_data));
  }, [dispatch])

  const filterData = invoices?.invoices?.filter(invoice => {
      return invoice.status.toLowerCase().includes(periodType.toLowerCase())
  })

  let isAdmin = false;
  if (localStorage.getItem("status_user")){
    if(localStorage.getItem("status_user")==="admin"){
      isAdmin=true
    }
  }
  const { profile } = useSelector(state => ({
    profile: state.ProfileUser.profile,
  }));
  //
  useEffect(() => {
    if (!profile) {
      dispatch(getProfile());
    }
  }, [profile]);

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
          <div className="page-content" >
                <Breadcrumbs title="List" breadcrumbItem="My Day" goMenu={true}/>
                <Col lg={12}>
                    {isMobile ? null : (
                        <CardTitle className="font-size-12">
                            <div className="d-flex align-items-center">
                                <div className="mb-0 flex-grow-1">
                                    <ul className="nav nav-pills">
                                      <NavItem>
                                        <Link
                                          className={"nav-link "+activCard}
                                          onClick={()=>{
                                              setActivCard("active");
                                              setActivList("")
                                              setActivListTrue(false)
                                              setActivCardTrue(true)
                                          }}
                                        >
                                            <i className="mdi mdi-view-grid-outline"/>
                                        </Link>
                                      </NavItem>
                                      <NavItem>
                                        <Link
                                            className={"nav-link "+activList}
                                            onClick={()=>{
                                                setActivCard("");
                                                setActivList("active")
                                                setActivListTrue(true)
                                                setActivCardTrue(false)
                                            }}
                                        >
                                            <i className="mdi mdi-format-list-bulleted"/>
                                        </Link>
                                      </NavItem>
                                    </ul>
                                </div>
                                <div className="flex-shrink-0">
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
                        </CardTitle>
                    )}
                      <div className="d-sm-flex flex-wrap" style={isMobile ? {marginTop: "-40px"}: null}>
                          <Col lg={4}>
                            <div className="position-relative">
                                <div className="search-box me-xxl-2 my-3 my-xxl-0 d-inline-block">
                                  <div className="position-relative">
                                    <Row>
                                        <div className="input-group-text d-flex">
                                            <div className="w-100 d-flex" style={{width: "100%"}}>
                                                <div className="w-20 align-content-center text-center font-size-24 me-sm-4" style={{width: "10%", borderRadius: "5px"}} >
                                                    <button className={"btn " + color_btn()} onClick={onClickPrevDate}>
                                                        {"<"}
                                                    </button>
                                                </div>
                                                <div className="w-60 ms-2 me-2" style={{width: "80%"}}>
                                                    <input type="date" className="form-control text-center" onChange={onChangeDateInput} value={startDate || year+"-"+month+"-"+date} style={{borderRadius: "20px"}}/>
                                                </div>
                                                <div className="w-20 align-content-center text-center font-size-24 ms-sm-4" onClick={onClickNextDate} style={{width: "10%", borderRadius: "5px"}} >
                                                    <button className={"btn " + color_btn()}>
                                                        {">"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                      </Row>
                                    </div>
                                </div>
                            </div>
                          </Col>
                          <AccordionContent text="open">
                          <Col lg={8}>
                              <Col lg={12}>
                                  <div className="position-relative">
                                    <div className=" me-xxl-2 my-3 my-xxl-0 d-inline-block">
                                      <div className="position-relative d-flex">
                                        {isAdmin ?
                                            <Col>
                                                <div className="input-group-text search-box">
                                                    <div className="me-2">
                                                        Employee
                                                    </div>
                                                    <select
                                                        className="form-select select2 mb-3 mb-xxl-0 w-xl"
                                                        onChange={(event => {
                                                            if (event.target.value !== "Select Employee") {
                                                                setDataEmployee(event.target.value)
                                                            } else {
                                                                setDataEmployee(-1)
                                                            }
                                                        })}
                                                    >
                                                        <option>Select Employee</option>
                                                        {
                                                            employee.map(option => (
                                                                <option key={option.id} value={option.id}>
                                                                    {option?.lastname || ""} {option?.username || ""}
                                                                </option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </Col>: null
                                        }
                                            <Col className="ms-sm-4">
                                                <div className="input-group-text search-box">
                                                    <div className="me-2">
                                                        Customer
                                                    </div>
                                                    <select
                                                    className="form-select select2 mb-3 mb-xxl-0 w-xl"
                                                    onChange={(event => {
                                                            if (event.target.value!=="All Customer"){
                                                            setDataCustomer(event.target.value)
                                                        }
                                                            else {
                                                            setDataCustomer(-1)
                                                        }
                                                        })}
                                                    >
                                                    <option>All Customer</option>
                                                    {
                                                        customers.map(option => (
                                                            <option key={option.id} value={option.id}>
                                                                {option.full_name}
                                                            </option>
                                                        ))
                                                    }
                                                    </select>
                                                </div>
                                            </Col>
                                        <Col>
                                            <div className="text-sm-end mt-2">
                                                <button className={"btn w-lg ms-sm-4 form-control" + color_btn()} onClick={onClickRun}>Run</button>
                                            </div>
                                        </Col>
                                      </div>
                                    </div>
                                  </div>
                              </Col>
                          </Col>
                          </AccordionContent>
                      </div>
                </Col>
                <br/>

                {activCardTrue && <Row>
                    {map(filterData, (invoice, key) => (
                        <CardInvoice data={invoice} history={history} key={"_invoice_" + key}/>
                    ))}
                </Row>}
                {activListTrue &&
                    <Row>
                        <Col lg="12">
                            <div className="">
                                <div className="table-responsive">
                                    <Table className="project-list-table table-nowrap align-middle table-borderless">
                                        <thead>
                                        <tr className="text-white bg-info">
                                            <th scope="col" style={{width: "100px"}}>
                                                Image Car
                                            </th>
                                            <th scope="col" style={{width: "150px"}}>
                                                Invoice
                                            </th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Employee</th>
                                            <th scope="col">Customer</th>
                                            <th scope="col">Total</th>
                                            <th scope="col">Create Date</th>
                                            <th scope="col" style={{width: "100px"}}>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {map(filterData, (invoice, key) => (
                                            <ListInvoices item={invoice} history={history} key={"_invoice_" + key}/>
                                        ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </Col>
                    </Row>
                }
                {isMobile ? (
                    <div className="d-flex align-items-center option-data w-100">
                        <div className="flex-shrink-0 w-100">
                            <ul className="nav nav-pills w-100 text-center bg-status-account align-content-center" style={{height: "60px"}}>
                              <li className="nav-item w-25">
                                <Link
                                  to="#"
                                  className={classNames(
                                    { active: periodType === "" },
                                    "nav-link",
                                    "text-white h-100"
                                  )}
                                  onClick={() => {
                                    onChangeChartPeriod("");
                                  }}
                                  id="all"
                                >
                                  All
                                </Link>
                              </li>
                              <li className="nav-item w-25">
                                <Link
                                  to="#"
                                  className={classNames(
                                    { active: periodType === "final" },
                                    "nav-link",
                                    "text-white h-100"
                                  )}
                                  onClick={() => {
                                    onChangeChartPeriod("final");
                                  }}
                                  id="final"
                                >
                                  Final
                                </Link>{" "}
                              </li>
                              <li className="nav-item w-25">
                                <Link
                                  to="#"
                                  className={classNames(
                                    { active: periodType === "cancel" },
                                    "nav-link",
                                    "text-white h-100"
                                  )}
                                  onClick={() => {
                                    onChangeChartPeriod("cancel");
                                  }}
                                  id="cancel"
                                >
                                  Cancel
                                </Link>
                              </li>
                              <li className="nav-item w-25">
                                <Link
                                  to="#"
                                  className={classNames(
                                    { active: periodType === "draft" },
                                    "nav-link",
                                    "text-white h-100"
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
                ) : null}
          </div>
      </React.Fragment>
  )
}

MyDay.propTypes = {
  invoices: PropTypes.array,
  onGetInvoices: PropTypes.func,
}

export default withRouter(MyDay)
