import React, {useState} from "react"
import {Link, useHistory} from "react-router-dom"
import PropTypes from "prop-types"
import {
  Badge,
  Card,
  CardBody,
  Col,
  Row,
} from "reactstrap"
import API_URL from "../../helpers/api_helper";
import {useMediaQuery} from "react-responsive";
import ModalIMG from "../Car/modal-image";

const CardInvoice = ({ data, history }) => {

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

  const [imgModal, setImgModal] = useState(false);
  const [imgInfo, setImgInfo] = useState('')
  const onClickImg = (data) => {
       setImgInfo(data || "");
       setImgModal(true);
   }

  return (
    <React.Fragment>
      <ModalIMG
            show={imgModal}
            img_car={imgInfo}
            onCloseClick={() => setImgModal(false)}
        />
      <Col xl="6" sm="6">
        <Card onClick={onClickNext} className={"border bg-opacity-25 border-"+status}>
          <CardBody>
            <Row>
                <Col lg={12}>
                    <div className="vstack gap-6">
                        <div className="d-flex">
                            <div className="vstack gap-6">
                                <div className="d-flex">
                                    {isMobile ? null:(
                                        <Col lg="3" onClick={e =>e.stopPropagation()}>
                                            <div className="text-lg-start">
                                                <img src={API_URL+data?.car_id?.image} alt="" width="70" onClick={() => onClickImg(API_URL+data?.car_id?.image)} className="rounded" />
                                            </div>
                                        </Col>
                                    )}
                                    <Col lg="9">
                                        <div className=" flex-grow-1">
                                            <h6 className="mb-1 font-size-15">Customer: {data?.customer_id?.full_name}</h6>
                                            <p><i className="bx bx-user-circle me-1 text-primary"/>{data?.crew_id?.lastname} {data?.crew_id?.username}</p>
                                            <ul className="list-inline mb-0">
                                              <li className="list-inline-item me-3">
                                                <h5 className="font-size-14" id="amountTooltip">
                                                  <i className="bx bx-money me-1 text-success"/> {" total: "}
                                                  ${data?.total_sum}
                                                </h5>
                                              </li>{" "}
                                              <li className="list-inline-item me-3">
                                                <h5 className="font-size-14" id="duedateTooltip">
                                                  <i className="bx bx-calendar me-1 text-primary" />{"Create Date: "}
                                                  {data?.start_at.substring(0,10)}
                                                </h5>
                                              </li>
                                              <li className="list-inline-item me-3">
                                                <h5 className="font-size-14" id="duedateTooltip">
                                                  <i className="bx bx-calendar me-1 text-primary" />{"Close Date: "}
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

CardInvoice.propTypes = {
  data: PropTypes.any,
}

export default CardInvoice
