import React, { useState, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    Button,
    Table,
} from "reactstrap";


//redux
import { useSelector, useDispatch } from "react-redux";

import {withRouter} from "react-router-dom";

import Breadcrumbs from "../../../components/Common/Breadcrumb";
import {
    getCarDetail as onGetCarDetail,
} from "../../../store/car/actions";

import {useHistory} from "react-router-dom";
import API_URL from "../../../helpers/api_helper";
import {useMediaQuery} from "react-responsive";

const CarDetailInfo = props => {

   document.title="Car Detail Info | AutoPro";

   const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
   const dispatch = useDispatch();
   const history = useHistory();

   let invoice_status = false;
   let invoice_id = 0;
   if (localStorage.getItem("invoiceId")){
       invoice_status = true;
       invoice_id = parseInt(localStorage.getItem("invoiceId"))
  }

   const [image, setImage] = useState('')
   const { carDetail } = useSelector(state => ({
       carDetail: state.Cars.carDetail,
   }));

   const {
        match: { params },
      } = props;

   useEffect(() => {
        if (params && params.id) {
          dispatch(onGetCarDetail(params.id));
        } else {
          dispatch(onGetCarDetail(1)); //remove this after full integration
        }
    }, [params, onGetCarDetail]);


  useEffect(() => {
    dispatch(onGetCarDetail(params.id));
  }, [dispatch]);

  const onClickNext = () => {
      history.push("/work-order/"+carDetail?.customer+"?car_id="+params?.id)
  }

  const onClickNextUpdate = () => {
      history.push("/car-update/"+params?.id)
  }
  const onClickPrev = () => {
      history.goBack();
  }

  return (
    <React.Fragment>
        <div className="page-content">
              <Breadcrumbs title="Car" breadcrumbItem="Detail Car" />
              <Col lg="12">
                <Card>
                    <Row className="font-size-14">
                        <Col md={6}>
                          <div className="d-flex">
                            <div className="flex-grow-1 align-self-center">
                              <div className="text-muted">
                                  <div className="table-responsive">
                                    <Table className="table-nowrap mb-0">
                                      <tbody>
                                        <tr style={{width: "100%"}}>
                                          <th scope="row" style={{width: "20%"}}>Make :</th>
                                          <td style={{width: "80%"}}>{carDetail?.make}</td>
                                        </tr>
                                        <tr style={{width: "100%"}}>
                                          <th scope="row" style={{width: "20%"}}>model :</th>
                                          <td style={{width: "80%"}}>{carDetail?.model}</td>
                                        </tr>
                                        <tr style={{width: "100%"}}>
                                          <th scope="row" style={{width: "20%"}}>stock :</th>
                                          <td style={{width: "80%"}}>{carDetail?.stock}</td>
                                        </tr>
                                      </tbody>
                                    </Table>
                                  </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="d-flex">
                            <div className="flex-grow-1 align-self-center">
                              <div className="text-muted">
                                  <div className="table-responsive">
                                    <Table className="table-nowrap mb-0">
                                      <tbody>
                                        <tr style={{width: "100%"}}>
                                          <th scope="row" style={{width: "20%"}}>vin :</th>
                                          <td style={{width: "80%"}}>{carDetail?.vin}</td>
                                        </tr>
                                        <tr style={{width: "100%"}}>
                                          <th scope="row" style={{width: "20%"}}>po :</th>
                                          <td style={{width: "80%"}}>{carDetail?.po}</td>
                                        </tr>
                                        {isMobile ? null: (
                                            <tr>
                                              <th scope="row">image :</th>
                                              <td><img src={API_URL+carDetail?.image} width="100" className="rounded" alt=""/></td>
                                            </tr>
                                        )}
                                      </tbody>
                                    </Table>
                                    <br/>
                                    {isMobile ? (
                                        <div>
                                            <div className="text-center">
                                                <strong className="font-size-16">Image car</strong>
                                            </div>
                                            <br/>
                                            <img src={API_URL+carDetail?.image}  className="rounded w-100" alt=""/>
                                      </div>
                                    ) : null}
                                    <br/>
                                  </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col lg={12}>
                            {isMobile ?
                                (
                                    <div className="mt-4">
                                        <Card className="font-size-16" onClick={() => onClickNext()}>
                                            <CardBody style={{height: "35px", padding: "5px"}}>
                                                <div className="d-flex w-100 overflow-hidden">
                                                    <div style={{width: "95%", float: "left"}}>
                                                        <span className="w-90 text-dark" style={{fontWeight: "500"}}>
                                                            Work Orders
                                                        </span>
                                                    </div>
                                                    <div style={{width: "5%", float: "right"}}>
                                                        <i className="bx bx-right-arrow-circle text-success font-size-18 align-middle me-2"/>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                        <Card className="font-size-16" onClick={() => onClickNextUpdate()}>
                                            <CardBody style={{height: "35px", padding: "5px"}}>
                                                <div className="d-flex w-100 overflow-hidden">
                                                    <div style={{width: "95%", float: "left"}}>
                                                        <span className="w-90 text-dark" style={{fontWeight: "500"}}>
                                                            Update Car
                                                        </span>
                                                    </div>
                                                    <div style={{width: "5%", float: "right"}}>
                                                        <i className="bx bx-right-arrow-circle text-success font-size-18 align-middle me-2"/>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </div>
                                ):
                                (
                                    <div>
                                        <Row>
                                            <div className="text-end">
                                                <Button
                                                    onClick={() => {
                                                            onClickPrev()
                                                        }}
                                                    className="btn btn-info me-2 "
                                                    >
                                                    <i className="fa fa-arrow-left me-2" />Prev
                                                </Button>
                                                <Button
                                                    onClick={() => {
                                                            onClickNextUpdate()
                                                        }}
                                                    className="btn btn-warning me-2 "
                                                    >
                                                    <i className="fa fa-car me-2" />Update Car
                                                </Button>
                                                <Button
                                                    onClick={() => {
                                                            onClickNext()
                                                        }}
                                                    className="btn btn-success me-2 "
                                                    >
                                                    <i className="fa fa-tasks me-2" />Work Orders
                                                </Button>
                                            </div>
                                        </Row>
                                    </div>
                                )
                            }
                        </Col>
                    </Row>
                </Card>
            </Col>
        </div>
    </React.Fragment>
  );
};

export default withRouter(CarDetailInfo);
