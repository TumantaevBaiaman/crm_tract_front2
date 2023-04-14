import React, { useState, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Button,
    FormGroup,
    BreadcrumbItem,
    Table, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, CardBody,
} from "reactstrap";

import * as Yup from "yup";
import { useFormik } from "formik";

import { useSelector, useDispatch } from "react-redux";

import {Link, withRouter} from "react-router-dom";

import {
    getCustomerDetail as onGetCustomerDetail,
    updateCustomersData as onUpdateCustomer, deleteCustomerData as onDeleteCustomer
} from "../../../store/customer/actions";
import {useHistory} from "react-router-dom";
import DeleteModal from "../../../components/Common/DeleteModal";
import {useMediaQuery} from "react-responsive";
import Breadcrumb from "../../../components/Common/Breadcrumb";

const CustomerDetail = props => {

   document.title="Customer Detail | AutoPro";

   const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
   const dispatch = useDispatch();
   const history = useHistory();
   if (localStorage.getItem("invoiceId")){
        localStorage.removeItem("invoiceId");
      }

   const [deleteModal, setDeleteModal] = useState(false);
   const { customerDetail } = useSelector(state => ({
       customerDetail: state.Customer.customerDetail,
   }));

   const {
        match: { params },
      } = props;

    useEffect(() => {
        if (params && params.id) {
          dispatch(onGetCustomerDetail(params.id));
        } else {
          dispatch(onGetCustomerDetail(1)); //remove this after full integration
        }
      }, [params, onGetCustomerDetail]);

   const customer = customerDetail;

   const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      fullname: (customer && customer.full_name) || '',
      email: (customer && customer.email) || '',
      address: (customer && customer.street1) || '',
      postal_code: (customer && customer.postal_code) || '',
      city: (customer && customer.country) || '',
      province: (customer && customer.street2) || '',
      phone1: (customer && customer.phone) || '',
      phone2: (customer && customer.phone2) || '',
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Please Enter FuulName"),
      email: Yup.string().required("Please Enter Email"),
      address: Yup.string().required("Please Enter Address"),
      postal_code: Yup.string().required("Please Enter Postal Code"),
      city: Yup.string().required("Please Enter City"),
      province: Yup.string().required("Please Enter Province"),
      phone1: Yup.string().required("Please Enter Phone1"),
    }),
    onSubmit: (values) => {
        const updateCustomer = {
          id: customer ? customer.id : 0,
          full_name: values.fullname,
          email: values.email,
          street2: values.province,
          postal_code: values.postal_code,
          street1: values.address,
          country: values.city,
          phone: values.phone1,
          phone2: values.phone2
            };
        dispatch(onUpdateCustomer(updateCustomer));
        },
      });

   const onClickCars = () => {
    history.push('/car-list/'+params.id)
  };

   const onClickPrev = () => {
       history.goBack();
  };

   const clickUpdateBtn = () => {
       history.push("/customer-update/"+params.id)
   }

   const onClickInvoices = () => {
   history.push('/invoices-list/'+params.id)
  };

   const onClickReset = () => {
       validation.values.email = customer.email;
       validation.values.full_name = customer.full_name;
       validation.values.address = customer.street1;
       validation.values.postal_code = customer.postal_code;
       validation.values.city = customer.country;
       validation.values.phone1 = customer.phone;
       validation.values.phone2 = customer.phone2;
       validation.values.province = customer.street2;
  };

  const handleDeleteCustomer = () => {
    if (customer.id) {
      dispatch(onDeleteCustomer(customer, history));
      setDeleteModal(false);
    }
  };

  useEffect(() => {
    dispatch(onGetCustomerDetail(params.id));
  }, [dispatch]);

  return (
    <React.Fragment>
      <DeleteModal
            show={deleteModal}
            onDeleteClick={handleDeleteCustomer}
            onCloseClick={() => setDeleteModal(false)}
        />
      <div className="page-content">
          <Container fluid>
            {/*<Breadcrumbs title="Profile" breadcrumbItem={customer?.full_name} />*/}
              <Breadcrumb title="List" breadcrumbItem="Customers"/>
              <FormGroup className="mb-4" row>
              <Col lg={12}>
                  <Row>
                    <Col md={6}>
                      <div className="table-responsive">
                          <strong><p className="font-size-14" style={{color: "#1C6758"}}>Personal information:</p></strong>
                        <Table className="table-nowrap mb-0">
                          <tbody>
                            <tr>
                              <th scope="row">Name :</th>
                              <td>{customer.full_name}</td>
                            </tr>
                            <tr>
                              <th scope="row">Email :</th>
                              <td>{customer.email}</td>
                            </tr>
                            <tr>
                              <th scope="row">Postal code :</th>
                              <td>{customer.postal_code}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                        </Col>
                        <Col md={6}>
                            <div className="table-responsive">
                                <strong><p className="font-size-14" style={{color: "#1C6758"}}>Address information:</p></strong>
                                <Table className="table-nowrap mb-0">
                                  <tbody>
                                    <tr>
                                      <th scope="row">Address :</th>
                                      <td>{customer.street1}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">City :</th>
                                      <td>{customer.country}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Province :</th>
                                      <td>{customer.street2}</td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </div>
                        </Col>
                    </Row>
              </Col>
              <Col lg={12}>
                  <br/>
                  <Row>
                    <Col md={6}>
                      <div className="table-responsive">
                          <strong><p className="font-size-14" style={{color: "#1C6758"}}>Phone information:</p></strong>
                        <Table className="table-nowrap mb-0">
                          <tbody>
                            <tr>
                              <th scope="row">Mobile Phone1 :</th>
                              <td>{customer.phone}</td>
                            </tr>
                            <tr>
                              <th scope="row">Mobile Phone2 :</th>
                              <td>{customer.phone2}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                        </Col>
                        <Col md={6}>
                        </Col>
                    </Row>
              </Col>
              </FormGroup>
              {isMobile ?
                  (
                      <div className="mt-4">
                          <Card className="font-size-16" onClick={() => onClickCars()}>
                              <CardBody style={{height: "35px", padding: "5px"}}>
                                  <div className="d-flex w-100 overflow-hidden">
                                      <div style={{width: "95%", float: "left"}}>
                                            <i className="bx bx-car text-success font-size-18 align-middle me-2"/>
                                            <span className="w-90" style={{fontWeight: "500"}}>
                                                Assets
                                            </span>
                                      </div>
                                      <div style={{width: "5%", float: "right"}}>
                                          <i className="bx bx-right-arrow-circle text-success font-size-18 align-middle me-2"/>
                                      </div>
                                  </div>
                              </CardBody>
                          </Card>
                          <Card className="font-size-16" onClick={() => onClickInvoices()}>
                              <CardBody style={{height: "35px", padding: "5px"}}>
                                  <div className="d-flex w-100 overflow-hidden">
                                      <div style={{width: "95%", float: "left"}}>
                                            <i className="bx bx-task text-success font-size-18 align-middle me-2"/>
                                            <span className="w-90" style={{fontWeight: "500"}}>
                                                Invoices
                                            </span>
                                      </div>
                                      <div style={{width: "5%", float: "right"}}>
                                          <i className="bx bx-right-arrow-circle text-success font-size-18 align-middle me-2"/>
                                      </div>
                                  </div>
                              </CardBody>
                          </Card>
                          <Card className="font-size-16" onClick={() => clickUpdateBtn()}>
                              <CardBody style={{height: "35px", padding: "5px"}}>
                                  <div className="d-flex w-100 overflow-hidden">
                                      <div style={{width: "95%", float: "left"}}>
                                            <i className="bx bx-edit-alt text-success font-size-18 align-middle me-2"/>
                                            <span className="w-90" style={{fontWeight: "500"}}>
                                                Edit
                                            </span>
                                      </div>
                                      <div style={{width: "5%", float: "right"}}>
                                          <i className="bx bx-right-arrow-circle text-success font-size-18 align-middle me-2"/>
                                      </div>
                                  </div>
                              </CardBody>
                          </Card>
                      </div>
                  ) :
                  (
                      <FormGroup className="mb-4" row>
                        <Col lg="12">
                          <Row>
                              <div className="text-end">
                              <Button
                                  onClick={clickUpdateBtn}
                                  className="btn btn-success me-2"
                                >
                                  <i className="fa fa-edit me-2" />Edit
                              </Button>
                              <Button
                                  onClick={() => {
                                        onClickCars()
                                    }}
                                  className="btn btn-info me-2 "
                                >
                                  <i className="fa fa-car me-2" />Assets
                                </Button>
                              <Button
                                  onClick={() => {
                                      onClickInvoices()
                                  }}
                                  className="btn btn-warning me-2"
                                >
                                  <i className="fa fa-plus-square me-2" />Invoices
                              </Button>
                              </div>
                          </Row>
                        </Col>
                      </FormGroup>
                  )
              }
              <div className="d-print-none d-flex">
                  <div className="float-end block-top d-flex">
                      <UncontrolledDropdown>
                          <DropdownToggle tag="a" to="#" className="card-drop w-md" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="bx bx-plus font-size-18 btn btn-success"></i>
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-end">
                            <DropdownItem
                                className="btn btn-soft-success w-lg font-size-14"
                                href={"/car-create/"+params.id}
                              >
                                <i className="bx bx-plus-circle align-middle me-2"/>
                                New Invoice
                            </DropdownItem>
                            <br/>
                            <br/>
                          </DropdownMenu>
                      </UncontrolledDropdown>
                  </div>
              </div>
          </Container>
        </div>
    </React.Fragment>
  );
};

export default withRouter(CustomerDetail);
