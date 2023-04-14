import React, {useState} from "react";
import {
    Badge,
    Card,
    CardBody,
    Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Row, UncontrolledDropdown,
    UncontrolledTooltip
} from "reactstrap";
import {Link, useHistory} from "react-router-dom";
import PropTypes from "prop-types";
import customer_logo from "assets/images/default_customer.png"
import {deleteCustomerData as onDeleteCustomer} from "../../../store/customer/actions";
import {useDispatch} from "react-redux";
import DeleteModal from "../../../components/Common/DeleteModal";


const CardCustomerService = ({ data }) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const [modal, setModal] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (customer) => {
    setCustomer(customer);
    setDeleteModal(true);
  };

  const onClickDetail = (customer) => {
    history.push('/customer-detail/'+customer.id)
  };

  const handleDeleteCustomer = () => {
    if (customer.id) {
      dispatch(onDeleteCustomer(customer));
      setDeleteModal(false);
      location.reload()
    }
  };

  const onClickNext = () =>{
      history.push("/customer-detail/"+data.id)
  }

  return (
    <React.Fragment>
        <DeleteModal
            show={deleteModal}
            onDeleteClick={handleDeleteCustomer}
            onCloseClick={() => setDeleteModal(false)}
        />
      <Col xl="12" sm="12">
        <Card onClick={onClickNext}>
          <CardBody>

            <Row>
                <Col xs="2" lg={2}>
                    <div className="text-center">
                        <img src={customer_logo} alt="" width="50" className="rounded" />
                    </div>
                </Col>
                <Col xs="5" lg={5}>
                    <div className="">
                        <h6 className="mb-1 font-size-15">Name: {data?.full_name}</h6>
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item me-3">
                            <h5 className="font-size-12" id="duedateTooltip">
                              <i className="bx bx-map me-1 text-primary"/>{"Address: "}
                              {data?.country} {data?.street1} {data?.street2}
                            </h5>
                          </li>
                        </ul>
                    </div>
                </Col>
                <Col xs="5" lg={5}>
                    <div className="">
                        <ul className="list-inline mb-0">
                        <li className="list-inline-item me-3">
                            <h5 className="font-size-12" id="duedateTooltip">
                              <i className="bx bx-phone me-1 text-primary"/>{" 1 phone: "}
                                {data?.phone}
                            </h5>
                          </li><br/>
                          <li className="list-inline-item me-1">
                            <h5 className="font-size-12" id="duedateTooltip">
                              <i className="bx bx-phone me-1 text-primary"/>{" 2 phone: "}
                                {data?.phone2 || "None"}
                            </h5>
                          </li><br/>
                          <li className="list-inline-item me-3">
                            <h5 className="font-size-12" id="duedateTooltip">
                              <i className="bx bx-mail-send me-1 text-primary"/>{" "}
                              {data?.email}
                            </h5>
                          </li>
                        </ul>
                    </div>
                </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

CardCustomerService.propTypes = {
  data: PropTypes.any,
}

export default CardCustomerService