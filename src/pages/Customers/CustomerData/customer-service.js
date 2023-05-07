import React, { useEffect, useState, useMemo } from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import {isEmpty, map} from "lodash";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Card,
  Col,
  Container,
  Row,
  Input,
  Button,
  NavItem,
  CardTitle,
  Table,
} from "reactstrap";
import {useHistory} from "react-router-dom";
import Breadcrumbs from "components/Common/Breadcrumb";

import DeleteModal from "../../../components/Common/DeleteModal";
import {
  getCustomersData as onGetCustomers,
  addNewCustomerData as onAddNewCustomer,
  updateCustomersData as onUpdateCustomer,
  deleteCustomerData as onDeleteCustomer,
} from "store/customer/actions";

import { useSelector, useDispatch } from "react-redux";


import toastr from "toastr";
import {getProfile} from "../../../store/profile/actions";
import ListCustomers from "../Col/list-customer";
import AccordionContent from "components/Accordion/Accordion";
import {useMediaQuery} from "react-responsive";
import CardCustomerService from "../Card/card-customer-service";


const CustomerService = props => {

  //meta title
  document.title = "Customer Service | AutoPro";

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const dispatch = useDispatch();
  const history = useHistory();
  if (localStorage.getItem("invoiceId")){
    localStorage.removeItem("invoiceId");
  }

  const { customers } = useSelector(state => ({
    customers: state.Customer.customers,
  }));

  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [filterAddress, setFilterAddress] = useState("")
  const [filterPhone, setFilterPhone] = useState("")
  const [filterName, setFilterName] = useState("")
  const [activList, setActivList] = useState("")
  const [activCard, setActivCard] = useState("active")
  const [activListTrue, setActivListTrue] = useState(false)
  const [activCardTrue, setActivCardTrue] = useState(true)

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      fullname: (customer && customer.fullname) || '',
      lastname: (customer && customer.lastname) || '',
      email: (customer && customer.email) || '',
      address: (customer && customer.address) || '',
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Please Enter Your FuulName"),
      lastname: Yup.string().required("Please Enter Your LastName"),
      email: Yup.string().required("Please Enter Your Email"),
      address: Yup.string().required("Please Enter Your Address"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateCustomer = {
          id: customer ? customer.id : 0,
          last_name: values.lastname,
          full_name: values.fullname,
          email: values.email,
          address: values.address
        };
        // update customer
        dispatch(onUpdateCustomer(updateCustomer));
        validation.resetForm();
        dispatch(onGetCustomers());
      } else {
        const newCustomer = {
          full_name: values["fullname"],
          email: values["email"],
          last_name: values['lastname'],
          address: values['address'],
        };
        // save new customer
        dispatch(onAddNewCustomer(newCustomer));
        validation.resetForm();
        dispatch(onGetCustomers());
      }
      toggle();
    },
  });

  const { profile } = useSelector(state => ({
    profile: state.ProfileUser.profile,
  }));

  useEffect(() => {
    if (!profile) {
      dispatch(getProfile());
    }
  }, [profile]);

  const onClickCompany = () => {
    if (profile?.profile){
      if (profile?.account){
        history.push("/create-customer")
      }
      else {
        toastr.error("You currently do not have a company")
      }
    }
    else {
      toastr.error("Error Server")
    }
  }

  const toggle = () => {
    if (modal) {
      setModal(false);
      setCustomer(null);
    } else {
      setModal(true);
    }
  };

  //delete customer
  const [deleteModal, setDeleteModal] = useState(false);

  const handleDeleteCustomer = () => {
    if (customer.id) {
      dispatch(onDeleteCustomer(customer));
      setDeleteModal(false);
    }
  };

  useEffect(() => {
    dispatch(onGetCustomers());
  }, [dispatch]);

  const filterData = customers.filter(customer => {
    return customer?.email.toLowerCase().includes(filterAddress.toLowerCase()) && customer?.full_name.toLowerCase().includes(filterName.toLowerCase()) && customer?.phone.toLowerCase().includes(filterPhone)
  })

  useEffect(() => {
    dispatch(onGetCustomers());
  }, [dispatch]);

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
        <DeleteModal
            show={deleteModal}
            onDeleteClick={handleDeleteCustomer}
            onCloseClick={() => setDeleteModal(false)}
        />
        <div className="page-content">
          <Container fluid>
            {isMobile ? null : <Breadcrumbs title="AutoPro" breadcrumbItem="Customers Service"/> }
            <Row className="m-auto">
              <Card>
                <CardTitle className="font-size-12">
                  <div className="d-flex align-items-center">
                    <div className="mb-0 flex-grow-1">
                    </div>
                    {isMobile ? null: (
                        <div className="flex-shrink-0">
                           <ul className="nav nav-pills">
                              <NavItem>
                                <a
                                  className={"nav-link "+activCard}
                                  onClick={()=>{
                                      setActivCard("active");
                                      setActivList("")
                                      setActivListTrue(false)
                                      setActivCardTrue(true)
                                  }}
                                >
                                    <i className="mdi mdi-view-grid-outline"/>
                                </a>
                              </NavItem>
                              <NavItem>
                                <a
                                    className={"nav-link "+activList}
                                    onClick={()=>{
                                        setActivCard("");
                                        setActivList("active")
                                        setActivListTrue(true)
                                        setActivCardTrue(false)
                                    }}
                                >
                                    <i className="mdi mdi-format-list-bulleted"/>
                                </a>
                              </NavItem>
                            </ul>
                        </div>
                    )}
                  </div>
              </CardTitle>
                <AccordionContent text="Search By">
                {/*<CardBody>*/}
                  <div className="d-sm-flex flex-wrap">
                    <Col lg="10">
                      <div className="search-box text-start">
                        <Row>
                          <Col>
                            <div className="input-group-text">
                              <div>
                                Customer Name
                              </div>
                              <Input
                                  type="text"
                                  className="form-control mb-3 mb-xxl-0 w-xl"
                                  autoComplete="off"
                                  placeholder="name"
                                  onChange={(event) => setFilterName(event.target.value)}
                              />
                            </div>
                          </Col>
                          <Col>
                            <div className="input-group-text">
                              <div>
                                Customer Email
                              </div>
                              <Input
                                  type="text"
                                  className="form-control mb-3 mb-xxl-0 w-xl"
                                  autoComplete="off"
                                  placeholder="address"
                                  onChange={(event) => setFilterAddress(event.target.value)}
                              />
                            </div>
                          </Col>
                          <Col>
                            <div className="input-group-text">
                              <div>
                                Customer Phone
                              </div>
                              <Input
                                  type="text"
                                  className="form-control mb-3 mb-xxl-0 w-xl"
                                  autoComplete="off"
                                  placeholder="phone"
                                  onChange={(event) => setFilterPhone(event.target.value)}
                              />
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    <Col lg="2">
                      {isMobile ? null: (
                          <div className="text-lg-end mt-2">
                              <Button
                                type="button"
                                className={"btn-rounded text-lg-center" + color_btn()}
                                onClick={onClickCompany}
                                // onClick={handleCustomerClick}
                              >
                                <i className="mdi mdi-plus me-1" />
                                New Customer
                              </Button>
                          </div>
                      )}
                    </Col>
                  </div>
                {/*</CardBody>*/}
                </AccordionContent>
              </Card>
            </Row>
            {activCardTrue &&
                <Row>
                  {map(filterData, (customer, key) => (
                      <CardCustomerService data={customer} key={"_invoice_" + key}/>
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
                                                Number
                                            </th>
                                            <th scope="col">fullName</th>
                                            <th scope="col">email</th>
                                            <th scope="col">address</th>
                                            <th scope="col">city</th>
                                            <th scope="col">province</th>
                                            <th scope="col">postalCode</th>
                                            <th scope="col">phone</th>
                                            <th scope="col">phone2</th>
                                            <th scope="col" style={{width: "150px"}}>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {map(filterData, (invoice, key) => (
                                            <ListCustomers item={invoice} history={history} key={"_invoice_" + key}/>
                                        ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </Col>
                    </Row>
                }
                <div className="d-print-none">
                  <div className="float-end block-top">
                    <Link to="/create-customer">
                      <i className={"bx bx-plus font-size-16 btn " + color_btn()}></i>
                    </Link>
                  </div>
                </div>
          </Container>
        </div>
      </React.Fragment>
  )

};

CustomerService.propTypes = {
  customers: PropTypes.array,
  onGetCustomers: PropTypes.func,
  onAddNewCustomer: PropTypes.func,
  onDeleteCustomer: PropTypes.func,
  onUpdateCustomer: PropTypes.func,
};

export default CustomerService;
