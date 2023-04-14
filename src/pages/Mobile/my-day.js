import React, { useEffect, useState } from "react"
import {
    Card,
    CardBody,
    Col,
    Container, Input,
    Row,
} from "reactstrap"
import PropTypes from "prop-types"
import {Link, useHistory, withRouter} from "react-router-dom"
import { map } from "lodash"
//redux
import { useSelector, useDispatch } from "react-redux"
import CardInvoice from "../Invoices/card-invoice";
import {
    getCustomers as onGetEmployee,
    getCustomersData as onGetCustomers,
    invoiceMyDay as onInvoiceMyDay,
    getProfile, getReportsCrew as onGetReportCrew,
} from "store/actions"
import classNames from "classnames";
import AccordionContent from "components/Accordion/Accordion"
import ModalNewAccount from "pages/Dashboard/modal-new-account"
import ge from "react-datepicker";

const MyDayMobile = props => {

  document.title = "My Day | AutoPro";

  const dispatch = useDispatch()
  const history = useHistory()
  if (localStorage.getItem("invoiceId")){
    localStorage.removeItem("invoiceId");
  }

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
  let get_data = {
    account_id: localStorage.getItem("account_user"),
    from_date: year+"-"+month+"-"+date,
    to_date: year+"-"+month+"-"+date,
    crew_id: null,
    customer_id: null
    }

  const [startDate, setStartDate] = useState(year+"-"+month+"-"+date)
  const [dataEmployee, setDataEmployee] = useState(-1)
  const [dataCustomer, setDataCustomer] = useState(-1)
  const [endDate, setEndDate] = useState("")
  const [periodType, setPeriodType] = useState("");

  useEffect(() => {
    dispatch(onInvoiceMyDay(get_data));
    dispatch(onGetEmployee());
    dispatch(onGetCustomers());
  }, [dispatch])

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

  const onChangeDateInput = (event) => {
      setStartDate(event.target.value)
      get_data.from_date=event.target.value;
      get_data.to_date=event.target.value;
      if (dataEmployee!==-1)get_data.crew_id=dataEmployee;
      if (dataCustomer!==-1)get_data.customer_id=dataCustomer;
      dispatch(onInvoiceMyDay(get_data))
    }

  const onClickRun = () => {
      if (startDate!=="")get_data.from_date=startDate;
      if (endDate!=="")get_data.to_date=endDate;
      if (dataEmployee!==-1)get_data.crew_id=dataEmployee;
      if (dataCustomer!==-1)get_data.customer_id=dataCustomer;
      dispatch(onInvoiceMyDay(get_data));
  }

  const onChangeChartPeriod = (data) => {
    if (periodType !== data){
      setPeriodType(data)
    }
  }

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

  useEffect(() => {
    dispatch(onInvoiceMyDay(get_data));
  }, [dispatch])



  return (
      <React.Fragment>
          <div className="page-content">
            <Container fluid>
                <Col lg={12}>
                    <Card>
                    <AccordionContent text="Filter Invoices">
                    <CardBody>
                      <div className="d-sm-flex flex-wrap">
                          <Col lg={8}>
                              <Row>
                                    {isAdmin ?
                                        <Col>
                                            <select
                                                className="form-control select2 mb-3 mb-xxl-0 w-xl"
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
                                        </Col>: null
                                    }
                                        <Col>
                                            <select
                                            className="form-control select2 mb-3 mb-xxl-0 w-xl"
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
                                        </Col>
                                </Row>
                          </Col>
                          <Col lg={4}>
                              <div className="text-sm-end">
                                  <button className="btn btn-success w-md" onClick={onClickRun}>Run</button>
                              </div>
                          </Col>
                      </div>
                    </CardBody>
                    </AccordionContent>
                  </Card>
                </Col>
                <div className="w-100 d-flex" style={{width: "100%"}}>
                    <div className="w-10 align-content-center text-center font-size-24" style={{width: "10%", borderRadius: "5px"}} onClick={onClickPrevDate}>
                        <strong>{"<"}</strong>
                    </div>
                    <div className="w-80" style={{width: "80%"}}>
                        <input type="date" className="form-control text-center" onChange={onChangeDateInput} value={startDate || year+"-"+month+"-"+date} style={{borderRadius: "20px"}}/>
                    </div>
                    <div className="w-10 align-content-center text-center font-size-24" style={{width: "10%", borderRadius: "5px"}} onClick={onClickNextDate}>
                        <strong>{">"}</strong>
                    </div>
                </div>

                <Row>
                    {map(filterData, (invoice, key) => (
                        <CardInvoice data={invoice} history={history} key={"_invoice_" + key}/>
                    ))}
                </Row>

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
            </Container>
          </div>
      </React.Fragment>
  )
}

MyDayMobile.propTypes = {
  invoices: PropTypes.array,
  onGetInvoices: PropTypes.func,
}

export default withRouter(MyDayMobile)
