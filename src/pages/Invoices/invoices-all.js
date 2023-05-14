import React, { useEffect, useState } from "react"
import {
    Card,
    CardBody, CardTitle,
    Col,
    Container,
    Input, NavItem,
    Row, Table,
} from "reactstrap"
import PropTypes from "prop-types"
import {Link, useHistory, withRouter} from "react-router-dom"
import { map } from "lodash"
import { useSelector, useDispatch } from "react-redux"

import Breadcrumbs from "components/Common/Breadcrumb"

import CardInvoice from "./card-invoice"
import {
    getInvoices as onGetInvoices,
} from "store/actions"
import classNames from "classnames";
import ListInvoices from "./list-invoice";
import AccordionContent from "components/Accordion/Accordion"

const InvoicesListAll = props => {

  document.title = "Invoices List | AutoPro";

  const dispatch = useDispatch()
  const history = useHistory()
  if (localStorage.getItem("invoiceId")){
    localStorage.removeItem("invoiceId");
  }

  const [searchValue, setSearchValue] = useState('')
  const [startDate, setStartDate] = useState('')
  const [dataEmployee, setDataEmployee] = useState(-1)
  const [dataCustomer, setDataCustomer] = useState(-1)
  const [endDate, setEndDate] = useState('')
  const [periodType, setPeriodType] = useState("");
  const [activList, setActivList] = useState("")
  const [activCard, setActivCard] = useState("active")
  const [activListTrue, setActivListTrue] = useState(false)
  const [activCardTrue, setActivCardTrue] = useState(true)

  const { invoices } = useSelector(state => ({
    invoices: state.invoices.invoices,
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
    from_date: year+"-"+month+"-"+"01",
    to_date: year+"-"+month+"-"+date,
    crew_id: null,
    customer_id: null
    }
  useEffect(() => {
    dispatch(onGetInvoices())
  }, [dispatch])

  const onClickRun = () => {
      if (startDate!=="")get_data.from_date=startDate;
      if (endDate!=="")get_data.to_date=endDate;
      if (dataEmployee!==-1)get_data.crew_id=dataEmployee;
      if (dataCustomer!==-1)get_data.customer_id=dataCustomer;
      dispatch(onGetInvoices());
  }

  const onChangeChartPeriod = (data) => {
    if (periodType !== data){
      setPeriodType(data)
    }
  }

  useEffect(() => {
    dispatch(onGetInvoices());
  }, [dispatch])

  const filterData = invoices?.invoices?.filter(invoice => {
      return invoice?.status?.toLowerCase().includes(periodType?.toLowerCase())
  })

  let isAdmin = false;
  if (localStorage.getItem("status_user")){
    if(localStorage.getItem("status_user")==="admin"){
      isAdmin=true
    }
  }

  return (
      <React.Fragment>
          <div className="page-content">
            <Container fluid>
                <Breadcrumbs title="List" breadcrumbItem="Invoices List" />
                <Col lg={12}>
                    <Card>
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
                    <AccordionContent text="open">
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
                                              className="form-control w-md"
                                              autoComplete="off"
                                              onChange={(event) => setStartDate(event.target.value)}
                                          />
                                          </label>
                                        </Col>
                                        <Col>
                                      <label htmlFor="search-bar-0" className="search-label">
                                          <Input
                                              type="date"
                                              className="form-control w-md"
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
                                    {isAdmin ?
                                        <Col>
                                            <select
                                                className="form-control select2 mb-3 mb-xxl-0 w-xl"
                                                onChange={(event => {
                                                    if (event.target.value !== "Employee") {
                                                        setDataEmployee(event.target.value)
                                                    } else {
                                                        setDataEmployee(-1)
                                                    }
                                                })}
                                            >
                                                <option>Employee</option>
                                                {
                                                    employee.map(option => (
                                                        <option key={option.id} value={option.id}>
                                                            {option?.lastname || ""} {option?.username?.[0] || ""}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </Col> : null
                                    }
                                    {isAdmin ?
                                        <Col>
                                            <select
                                                className="form-control select2 mb-3 mb-xxl-0 w-xl"
                                                onChange={(event => {
                                                    if (event.target.value !== "Customer") {
                                                        setDataCustomer(event.target.value)
                                                    } else {
                                                        setDataCustomer(-1)
                                                    }
                                                })}
                                            >
                                                <option>Customer</option>
                                                {
                                                    customers.map(option => (
                                                        <option key={option.id} value={option.id}>
                                                            {option.full_name}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </Col> : null
                                    }
                                </Row>
                              </div>
                            </div>
                              </div>
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

InvoicesListAll.propTypes = {
  invoices: PropTypes.array,
  onGetInvoices: PropTypes.func,
}

export default withRouter(InvoicesListAll)
