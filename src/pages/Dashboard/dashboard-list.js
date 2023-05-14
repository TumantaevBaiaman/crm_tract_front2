import React, { useEffect, useState } from "react"
import {
    Card, CardBody,
    Col,
    Container, DropdownItem, DropdownMenu, DropdownToggle,
    Input, Label,
    Row,
    Table, UncontrolledDropdown
} from "reactstrap"
import PropTypes from "prop-types"
import {Link, useHistory, withRouter} from "react-router-dom"
import { map } from "lodash"

import { useSelector, useDispatch } from "react-redux"

import {
    getCustomers as onGetEmployee,
    getCustomersData as onGetCustomers,
    invoiceMyDay as onInvoiceMyDay,
} from "store/actions"
import ListInvoices from "../Invoices/list-invoice";
import AccordionContent from "components/Accordion/Accordion"
import CardInvoiceMini from "../Invoices/card-invoice-mini";

const MyDayDashboard = props => {

  const dispatch = useDispatch()
  const history = useHistory()
  if (localStorage.getItem("invoiceId")){
    localStorage.removeItem("invoiceId");
  }

  const [searchValue, setSearchValue] = useState('Range')
  const [dataEmployee, setDataEmployee] = useState(-1)
  const [dataCustomer, setDataCustomer] = useState(-1)
  const [dataEmployeeActiv, setDataEmployeeActiv] = useState(-1)
  const [dataCustomerActiv, setDataCustomerActiv] = useState(-1)
  const [periodType, setPeriodType] = useState("");
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
  const [endDate, setEndDate] = useState(year+"-"+month+"-"+date)
  const [dateData, setDateData] = useState("Today")

  let get_data = {
    account_id: localStorage.getItem("account_user"),
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
      setDataEmployeeActiv(dataEmployee)
      if (startDate!=="")get_data.from_date=startDate;
      if (endDate!=="")get_data.to_date=endDate;
      if (dataEmployee!==-1)get_data.crew_id=dataEmployee;
      if (dataCustomer!==-1)get_data.customer_id=dataCustomer;
      dispatch(onInvoiceMyDay(get_data));
  }

  const onClickToday = () => {
      setStartDate(year+"-"+month+"-"+date)
      setEndDate(year+"-"+month+"-"+date);
      get_data.from_date=year+"-"+month+"-"+date;
      get_data.to_date=year+"-"+month+"-"+date;
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
      setStartDate(year+"-"+w2+"-"+w1)
      setEndDate(year+"-"+month+"-"+date);
      get_data.from_date=year+"-"+w2+"-"+w1;
      get_data.to_date=year+"-"+month+"-"+date;
      setDateData("Week")
  }

  const onClickMonth = () => {
      setStartDate(year+"-"+month+"-"+"01")
      setEndDate(year+"-"+month+"-"+date);
      get_data.from_date=year+"-"+month+"-"+"01";
      get_data.to_date=year+"-"+month+"-"+date;
      setDateData("Month")
  }

  const onClickCustomer = (data) => {
      setDataCustomer(data);
  }

  const onClickCrew = (data) => {
      setDataEmployee(data);
  }

  useEffect(() => {
    dispatch(onInvoiceMyDay(get_data));
  }, [dispatch])

  const filterData = invoices?.invoices?.filter(invoice => {
      return invoice?.status?.toLowerCase().includes(periodType?.toLowerCase())
  })

  const filterEmployee = employee?.filter(data => {
      if (dataEmployeeActiv!==-1){
          return data?.id === parseInt(dataEmployeeActiv)
      }else return data
  })

  let isAdmin = false;
  if (localStorage.getItem("status_user")){
    if(localStorage.getItem("status_user")==="admin"){
      isAdmin=true
    }
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
                <AccordionContent text="open">
                <Col lg={12}>
                    <Row className="display-inline-flex">
                        <Col lg={8}>
                            <div className="mb-3 d-flex">
                                <div className="text-start me-4">
                                    <UncontrolledDropdown>
                                    <DropdownToggle tag="a" to="#" className="card-drop w-xl" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className={"bx bx-filter-alt btn  w-xl me-4 " +  color_btn()} style={{width: "200px"}}> <strong className="ms-2">Search By {searchValue}</strong> </i>
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-menu-end">
                                        <DropdownItem
                                            className="btn btn-soft-primary w-lg font-size-14"
                                            onClick={() => {
                                                setSearchValue("Range")
                                                setDataEmployee(-1)
                                                setDataCustomer(-1)
                                            }}
                                        >
                                            <i className="bx bx-calendar-check align-middle me-2"/>
                                            Date Range
                                        </DropdownItem>
                                        <DropdownItem
                                            className="btn btn-soft-primary w-lg font-size-14"
                                            onClick={() => {
                                                setSearchValue("Customer")
                                                setDataEmployee(-1)
                                            }}
                                        >
                                            <i className="bx bx-user-check align-middle me-2"/>
                                            Customer
                                        </DropdownItem>
                                        <DropdownItem
                                            className="btn btn-soft-primary w-lg font-size-14"
                                            onClick={() => {
                                                setSearchValue("Crew")
                                                setDataCustomer(-1)
                                            }}
                                        >
                                            <i className="bx bx-user-circle align-middle me-2"/>
                                            Crew
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                </div>
                                {searchValue === "Range" ? (
                                    <>
                                        <div className="d-inline-flex ms-4">
                                            <Label className="form-label align-center mt-2">OpenDate</Label>
                                              <Input
                                                  type="date"
                                                  className="form-control w-md ms-2"
                                                  autoComplete="off"
                                                  value={startDate || year+"-"+month+"-"+date}
                                                  onChange={(event) => setStartDate(event.target.value)}
                                              />
                                        </div>
                                        <div className="d-inline-flex ms-4">
                                        <Label className="form-label align-center mt-2">CloseDate</Label>
                                          <Input
                                              type="date"
                                              className="form-control w-md ms-2"
                                              autoComplete="off"
                                              value={endDate || year+"-"+month+"-"+date}
                                              onChange={(event) => setEndDate(event.target.value)}
                                          />
                                        </div>
                                    </>
                                ) : null}
                                {searchValue === "Crew" ? (
                                    <>
                                        <select
                                              className="mb-3 form-select mb-xxl-0 w-xl"
                                              onChange={(event => {
                                                  if (event.target.value!=="All Employee"){
                                                      onClickCrew(event.target.value)
                                                  }else {
                                                      setDataEmployee(-1)
                                                  }
                                              })}
                                        >
                                            <option>All Employee</option>
                                              {employee.map(option => (
                                                      <option key={option.id} value={option.id} >
                                                          {option?.lastname} {option?.username}
                                                      </option>
                                                  ))}
                                        </select>
                                    </>
                                ): null}
                                {searchValue === "Customer" ? (
                                    <>
                                        <select
                                            className="w-lg form-control select2 mb-3 mb-xxl-0 w-xl"
                                            onChange={(event => {
                                                if (event.target.value!=="All Customer"){
                                                    onClickCustomer(event.target.value)
                                                }else {
                                                    setDataCustomer(-1)}
                                            })}
                                        >
                                            <option>All Customer</option>
                                                {
                                                    customers.map(option => (
                                                        <option key={option.id} value={option.id}>
                                                            {option.full_name}
                                                        </option>
                                                ))}
                                        </select>
                                    </>
                                ): null}
                            </div>
                        </Col>
                        <Col lg={4} className="float-end">
                            <div className="text-end d-flex">
                                <UncontrolledDropdown>
                                    <DropdownToggle tag="a" to="#" className="card-drop w-md" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className={"bx bx-calendar-check btn w-lg me-4" + color_btn()}> <strong className="ms-2">{dateData}</strong> </i>
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-menu-end">
                                        <DropdownItem
                                            className="btn btn-soft-primary w-lg font-size-14"
                                            // href={"/car-create/"+params.id}
                                            onClick={onClickToday}
                                        >
                                            <i className="bx bx-calendar align-middle me-2"/>
                                            Today
                                        </DropdownItem>
                                        <DropdownItem
                                            className="btn btn-soft-primary w-lg font-size-14"
                                            // href={"/car-create/"+params.id}
                                            onClick={onClickWeek}
                                        >
                                            <i className="bx bx-calendar align-middle me-2"/>
                                            Week
                                        </DropdownItem>
                                        <DropdownItem
                                            className="btn btn-soft-primary w-lg font-size-14"
                                            // href={"/car-create/"+params.id}
                                            onClick={onClickMonth}
                                        >
                                            <i className="bx bx-calendar align-middle me-2"/>
                                            Month
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <button className={localStorage.getItem("account_status")==="1" ? "btn btn-success w-md form-control" : "btn bg-status-account-btn w-md form-control"} onClick={onClickRun}>Run</button>
                            </div>
                        </Col>
                      </Row>
                </Col>
                </AccordionContent>

                {activCardTrue &&
                    <Row>
                        {map(filterEmployee, (data, key) => (
                            <Col xl="3" sm="3">
                                <Row>
                                    <Col lg={12}>
                                        <Card className="border border-primary bg-opacity-25 bg-primary">
                                            <CardBody style={{padding: "15px"}}>
                                                <div className="text-center font-size-14 w-100 text-primary">
                                                    <i className="bx bx-user-circle me-1"/>{data?.lastname} {data?.username}
                                                </div>
                                            </CardBody>
                                        </Card>
                                        <Col>
                                            {filterData?.filter(invoice => invoice?.crew_id?.id===data?.id).map(invoice => (
                                                <CardInvoiceMini data={invoice} history={history}/>
                                            ))}
                                        </Col>
                                    </Col>
                                </Row>
                            </Col>
                        ))}
                    </Row>
                }
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
            </Container>
          </div>
      </React.Fragment>
  )
}

MyDayDashboard.propTypes = {
  invoices: PropTypes.array,
  onGetInvoices: PropTypes.func,
}

export default withRouter(MyDayDashboard)
