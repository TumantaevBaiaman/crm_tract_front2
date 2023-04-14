import React from "react"
import {Link, useHistory} from "react-router-dom"
import PropTypes from "prop-types"
import {
  Badge,
  Card,
  CardBody,
  Col,
  Row,
  UncontrolledTooltip
} from "reactstrap"
import API_URL from "../../helpers/api_helper";
import {useMediaQuery} from "react-responsive";

const CardInvoiceMini = ({ data, history }) => {

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const history2 = useHistory()
  let status = '';
  if (data.status==='draft'){
    status = 'secondary';
  }else if (data.status==='cancel'){
    status = 'danger';
  }else if (data.status==='final'){
    status = 'success';
  }

  const onClickNext = () =>{
      history2.push("/invoices-detail/"+data?.id)
  }

  return (
    <React.Fragment>
      <Col xl="12" sm="12">
        <Card onClick={onClickNext} className={"border border-primary bg-opacity-25 bg-"+status}>
          <CardBody style={{padding: "5px"}}>
            <Row>
                <Col lg={12}>
                    <div className="vstack gap-6">
                        <div className="d-flex">
                            <div className="vstack gap-6">
                                <div className="d-flex">
                                    <Col lg="12">
                                        <div className=" flex-grow-1">
                                            <h6 className="mb-1 font-size-15 text-center">{data?.customer_id?.full_name}</h6>
                                            <ul className="list-inline mb-0 w-100 d-flex text-center">
                                              <li className="list-inline-item me-3 w-50">
                                                <h5 className="font-size-14" id="amountTooltip">
                                                  <i className="bx bx-money me-1 text-success"/> {" "}
                                                  ${data?.total_sum}
                                                </h5>
                                              </li>{" "}
                                              <li className="list-inline-item me-3 w-50">
                                                <h5 className="font-size-14" id="duedateTooltip">
                                                  <i className="bx bx-calendar me-1 text-primary" />{" "}
                                                  {data?.finished_at.substring(0,10)}
                                                </h5>
                                              </li>
                                            </ul>
                                        </div>
                                    </Col>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
              <Row>
                  <Col xs="3">
                      <div className="text-lg-start" onClick={e => e.stopPropagation()}>
                            <h6 className="font-size-16">
                                <Badge color={status} className="w-auto">
                                    {data?.status}
                                </Badge>
                            </h6>
                        </div>
                  </Col>
                  <Col xs="6">
                      <div className="text-center" onClick={e => e.stopPropagation()}>
                            <h6 className=" font-size-16">
                                {data?.number}
                            </h6>
                        </div>
                  </Col>
                  <Col xs="3">
                      <div className="text-end" onClick={e => e.stopPropagation()}>
                            <Link
                                to={"/invoices-detail/" + data?.id}
                                className="btn-sm btn-info font-size-16"
                            >
                                <i className="mdi mdi-arrow-right-circle-outline" id="edittooltip" />
                            </Link>
                        </div>
                  </Col>
                </Row>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

CardInvoiceMini.propTypes = {
  data: PropTypes.any,
}

export default CardInvoiceMini
