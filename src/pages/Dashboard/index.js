import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Input,
  Label,
} from "reactstrap";

//import Charts
import StackedColumnChart from "./StackedColumnChart";

import {
  getDiagram as onGetDiogram, getProfile,
} from "../../store/actions";
import SalesAnalytics from "./Analitic";


import Breadcrumbs from "../../components/Common/Breadcrumb";

import { withTranslation } from "react-i18next";

import { useSelector, useDispatch } from "react-redux";
import MyDayDashboard from "./dashboard-list";
import {exportInvoiceCSV as onExportInvoiceCSV} from "../../store/actions";
import AccordionContent from "../../components/Accordion/Accordion";

function Buttom(props) {
  return null;
}

Buttom.propTypes = {
  to: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node
};
const Dashboard = props => {

  document.title = "AutoPro";

  const [modal, setmodal] = useState(false);
  const [subscribemodal, setSubscribemodal] = useState(false);

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
    account_status: localStorage.getItem("account_status"),
    from_date: year+"-"+month+"-"+"01",
    to_date: year+"-"+month+"-"+date,
  }

  const { chartsData } = useSelector(state => ({
    chartsData: state.Report.diagramData
  }));

  const dataNum = [chartsData?.draft_invoices || 0, chartsData?.final_invoices || 0, chartsData?.cancel_invoices || 0]
  const dataName = ["draft", "final", "cancel"]

  const reports = [
    { title: "Groos Revenue", iconClass: "bx-money", description: "$ 17, 235" },
    { title: "Net Revenue", iconClass: "bx-money", description: "$35, 723" },
  ];

  useEffect(() => {
    setTimeout(() => {
      setSubscribemodal(true);
    }, 2000);
  }, []);

  const [periodData, setPeriodData] = useState([]);
  const [periodType, setPeriodType] = useState("yearly");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onGetDiogram(get_data));
  }, [dispatch]);

  const [periodDay, setPeriodDay] = useState([]);
  useEffect(() => {
    let newDashArr = [];
    let newGrowArr = [];
    let newGrowDay = [];
    let currDashArr = chartsData?.statistics || []
    if (currDashArr?.length) {
      currDashArr.forEach((item) => {
        newGrowDay.push(item.date)
        newDashArr.push(Math.round(item.sum || 0));
        newGrowArr.push(Math.round(item.gross || 0));
      });
    }
    setPeriodDay(newGrowDay)
    setPeriodData([
      {
        name: "net total",
        data: newDashArr
      },
      {
        name: "gross total",
        data: newGrowArr
      }
    ])
  }, [chartsData])

  const [invoiceDate, setInvoiceDate] = useState('')
  const [generatedDate, setGereratedDate] = useState('')

  const onClickRun = () => {
      if (generatedDate!=="")get_data.to_date=generatedDate;
      if (invoiceDate!=="")get_data.from_date=invoiceDate;
      dispatch(onGetDiogram(get_data))
  }

  const onClickExport = () => {
    const export_data = {
      action: "export",
      account_id: localStorage.getItem("account_user"),
      start_date: get_data.from_date+" 00:00:00",
      end_date: get_data.to_date+" 23:59:59",
    }
    if (generatedDate!=="")export_data.end_date=generatedDate+" 23:59:59";
    if (invoiceDate!=="")export_data.start_date=invoiceDate+" 00:00:00";
    dispatch(onExportInvoiceCSV(export_data))
  };

  useEffect(() => {
    dispatch(onGetDiogram(get_data));
  }, [dispatch]);

  const { profile } = useSelector(state => ({
    profile: state.ProfileUser.profile,
  }));
  //
  useEffect(() => {
    if (!profile) {
      dispatch(getProfile());
    }
  }, [profile]);


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("AutoPro")}
            breadcrumbItem={props.t("Dashboard")}
          />
          <Row>
            <Col xl="3">
              <div className="text-muted">
                <div>
                  <h5>
                    Information from {get_data?.from_date} <br/> to {get_data?.to_date}
                  </h5>
                  <br/>
                </div>
                  <div className="mb-4">
                    <h3 className="text-success">${chartsData?.gross_revenue}</h3>
                    <div className="font-size-16">
                      <strong>gross revenue</strong>
                    </div>
                  </div>
                  <br/>
                  <div className="mb-4">
                    <h3 className="text-success">${chartsData?.net_revenue}</h3>
                    <div className="font-size-16">
                      <strong>net revenue</strong>
                    </div>
                  </div>
                </div>
                <div>
                  <button onClick={onClickExport} className="btn btn-info  btn-sm">
                    Export CSV{" "}
                    <i className="mdi mdi-file-export-outline ms-1"/>
                  </button>
                </div>
              {/*<MonthlyEarning />*/}
            </Col>
            <Col xl="5">
              <Row>
                <Col>
                  <div className="d-sm-flex flex-wrap">
                    <div className="ms-auto">
                      <Col>
                      <div className="position-relative">
                          <div className=" me-xxl-2 my-3 my-xxl-0 d-inline-block">
                            <div className="position-relative">
                              <AccordionContent text="Open me">
                                <Row>
                                <Col>
                                  <div className="mb-3 d-flex">
                                  <div className="d-inline-flex me-2">
                                    <Label className="form-label align-center mt-2">OpenDate</Label>
                                      <Input
                                          type="date"
                                          className="form-control"
                                          autoComplete="off"
                                          value={invoiceDate || year+"-"+month+"-"+"01"}
                                          onChange={(event) => setInvoiceDate(event.target.value)}
                                      />
                                  </div>
                                  <div className="d-inline-flex">
                                    <Label className="form-label align-center mt-2">CloseDate</Label>
                                        <Input
                                            type="date"
                                            className="form-control"
                                            autoComplete="off"
                                            value={generatedDate || year+"-"+month+"-"+date}
                                            onChange={(event) => setGereratedDate(event.target.value)}
                                        />
                                    </div>
                                  </div>
                                </Col>
                                  <Col>
                                    <button className={localStorage.getItem("account_status")==="1" ? "btn btn-success" : "btn bg-status-account-btn"} onClick={onClickRun}>Run</button>
                                  </Col>
                                </Row>
                              </AccordionContent>
                              </div>
                            </div>
                        </div>
                      </Col>
                    </div>
                  </div>
                  {/* <div className="clearfix"></div> */}
                  <StackedColumnChart periodData={periodData} day={periodDay} dataColors='["--bs-primary", "--bs-warning", "--bs-success"]' />
                </Col>
              </Row>
            </Col>
            <Col xl="4">
              <SalesAnalytics dataColors='["--bs-primary", "--bs-success", "--bs-danger"]' dataCount={dataNum} dataName={dataName}/>
            </Col>
          </Row>
          <Row>
            {/*<MyDay/>*/}
            {/*<EcommerceCustomers />*/}
            <MyDayDashboard />
          </Row>

        </Container>
      </div>


    </React.Fragment>
  );
};

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Dashboard);
