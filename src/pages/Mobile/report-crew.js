import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import {
    Button,
    Col,
    Container,
    Input,
} from "reactstrap";
import {
    getCustomers as onGetEmployee, getProfile as onGetProfile,
    getReportsCrew as onGetReportCrew,
    updateProfile as onUpdateProfile
} from "store/actions"
//redux
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import "./mobile.css";
import Breadcrumbs from "../../components/Common/Breadcrumb";

const ReportCrewMobile = props => {

  document.title="Crew Revenue Report | AutoPro";

  const dispatch = useDispatch()

  if (localStorage.getItem("invoiceId")){
        localStorage.removeItem("invoiceId");
      }

  const { profile } = useSelector(state => ({
        profile: state.ProfileUser.profile,
    }));

  let newDate = new Date()
  let date_raw = newDate.getDate();
  let month_raw = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let date = ''
  let month = ''

  if (date_raw<10)  {  date ="0"+date_raw.toString()} else {  date =date_raw.toString()}
  if (month_raw<10)  {  month ="0"+month_raw.toString()} else {  month =month_raw.toString()}


  const [periodType, setPeriodType] = useState("");
  const [startDate, setStartDate] = useState(year+"-"+month+"-"+date)
  const [endDate, setEndDate] = useState(year+"-"+month+"-"+date)
  const [idCrew, setIdCrew] = useState(profile?.profile?.id || 0)

  let get_data = {
    account_id: localStorage.getItem("account_user"),
    account_status: localStorage.getItem("account_status"),
    from_date: year+"-"+month+"-"+date,
    to_date: year+"-"+month+"-"+date,
  }

  const { report_crew } = useSelector(state => ({
    report_crew: state.Report.crewData,
  }))
  const { employee } = useSelector(state => ({
    employee: state.ecommerce.customers,
  }));

  const onChangeDateStart = (event) => {
      setStartDate(event.target.value)
      get_data.from_date=event.target.value
      get_data.to_date=endDate
      dispatch(onGetReportCrew(get_data))
    }
  const onChangeDateEnd = (event) => {
      setEndDate(event.target.value)
      get_data.from_date=startDate
      get_data.to_date=event.target.value
      dispatch(onGetReportCrew(get_data))
    }
  useEffect(() => {
    dispatch(onGetReportCrew(get_data));
    dispatch(onGetEmployee());
  }, [dispatch])
  const onClickCrew = (data) =>{
      setIdCrew(data)
  }

  const filteredOptions = report_crew?.list_customers?.filter((option) => {
        const dataCrew = option?.id===parseInt(idCrew);
        if (dataCrew){
            return dataCrew
        }else null
      }
  );

  const onChangeChartPeriod = (data) => {
    if (periodType !== data){
      setPeriodType(data)
    }
  }

  const onClickCalendar = (data) => {
      if (data===""){
          get_data.from_date=year+"-"+month+"-"+date;
          get_data.to_date=year+"-"+month+"-"+date;
      }
      else if (data==="week"){
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
          get_data.from_date=year+"-"+w2+"-"+w1;
          get_data.to_date=year+"-"+month+"-"+date;
      }
      else if (data==="month"){
          get_data.from_date=year+"-"+month+"-"+"01";
          get_data.to_date=year+"-"+month+"-"+date;
      }
      onChangeChartPeriod(data)
      setEndDate(get_data.to_date)
      setStartDate(get_data.from_date)
      dispatch(onGetReportCrew(get_data))
  }

  useEffect(() => {
    dispatch(onGetReportCrew(get_data));
  }, [dispatch])

  useEffect(() => {
    if (!profile) {
      dispatch(onGetProfile());
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
      <div className="page-content">
        <Breadcrumbs title="Invoices" breadcrumbItem="Report Crew"/>
        <Container fluid>
            <Col lg={12} className="mb-3 d-flex w-100 overflow-hidden">
                <div className="w-50 float-start mt-2">
                    <h4>
                        Crew
                    </h4>
                </div>
                <div className="w-50">
                    <select
                        className="w-100 float-end"
                        onChange={(event) => onClickCrew(event.target.value)}
                    >
                        <option className="font-size-12" value={profile?.profile?.id}>{profile?.profile?.lastname || ""} {profile?.profile?.username || ""}</option>
                        {
                            employee.filter(option => option?.id!==profile?.profile?.id).map(option => (
                                <option className="font-size-12" key={option.id} value={option.id}>
                                    {option?.lastname || ""} {option?.username || ""}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </Col>
            <div className="flex-shrink-0">
                <ul className="nav nav-pills text-center">
                  <li className="nav-item w-25">
                    <Link
                      to="#"
                      className={classNames(
                        { active: periodType === "" },
                        "nav-link"
                      )}
                      onClick={() => {
                        onClickCalendar("");
                      }}
                      id="today"
                    >
                      Today
                    </Link>
                  </li>
                  <li className="nav-item w-25">
                    <Link
                      to="#"
                      className={classNames(
                        { active: periodType === "week" },
                        "nav-link"
                      )}
                      onClick={() => {
                        onClickCalendar("week");
                      }}
                      id="week"
                    >
                      Week
                    </Link>{" "}
                  </li>
                  <li className="nav-item w-25">
                    <Link
                      to="#"
                      className={classNames(
                        { active: periodType === "month" },
                        "nav-link"
                      )}
                      onClick={() => {
                        onClickCalendar("month");
                      }}
                      id="month"
                    >
                      Month
                    </Link>
                  </li>
                  <li className="nav-item w-25">
                    <Link
                      to="#"
                      className={classNames(
                        { active: periodType === "custom" },
                        "nav-link"
                      )}
                      onClick={() => {
                        onChangeChartPeriod("custom");
                      }}
                      id="custom"
                    >
                      Custom
                    </Link>
                  </li>
                </ul>
            </div>
            <br/>
            {periodType==="custom" ?
                <Col xl={12} className="search-box">
                    <form action="">
                        <div className="d-flex">
                            <div className="w-50 float-start mt-2">
                                <h6>
                                    Start Date
                                </h6>
                            </div>
                            <div className="w-50 text-end" >
                                <Input type="date" className="form-control w-md" value={startDate} onChange={onChangeDateStart}/>
                            </div>
                        </div>
                        <div className="d-flex mt-1">
                            <div className="w-50 float-start mt-2">
                                <h6>
                                    End Date
                                </h6>
                            </div>
                            <div className="w-50 text-end">
                                <Input type="date" autoComplete="off" className="form-control w-md" value={endDate} onChange={onChangeDateEnd}/>
                            </div>
                        </div>
                    </form>
                </Col>
            : null}
            <br/>
            <br/>
            <Col lg="12" className="">
                <div className="">
                    <div className="table-responsive">
                        <h1>Sub Total: ${localStorage.getItem("status_user")==="admin" ? (Math.floor(filteredOptions?.[0]?.gross*100)/100 || 0) : (Math.floor(report_crew?.total_gross*100)/100 || 0)}</h1>
                        <h1>HST: ${localStorage.getItem("status_user")==="admin" ? (Math.floor((filteredOptions?.[0]?.gross-filteredOptions?.[0]?.total_sum)*100)/100 || 0) : (Math.floor((report_crew?.total_gross-report_crew?.total_all_sum)*100)/100 || 0)}</h1>
                    </div>
                    <br/>
                    <div className="table-responsive">
                        <h2>Total:</h2>
                        <h6>No. of Invoices Create: {localStorage.getItem("status_user")==="admin" ? (filteredOptions?.[0]?.invoice_count) : (report_crew?.total_count || 0)}</h6>
                        <h6>Avarage Invoice Value: ${localStorage.getItem("status_user")==="admin" ? (Math.floor((filteredOptions?.[0]?.gross/filteredOptions?.[0]?.invoice_count)*100)/100): (Math.floor((report_crew?.total_gross/report_crew?.total_count || 0)*100)/100) }</h6>
                    </div>
                    <br/>
                    <div className="table-responsive">
                      <p className="font-size-12">Note: Only Finalized invoices count towards revenue</p>
                    </div>
                </div>
            </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};

ReportCrewMobile.propTypes = {
  match: PropTypes.any,
};

export default withRouter(ReportCrewMobile);
