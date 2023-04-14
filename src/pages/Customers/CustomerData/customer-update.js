import React, { useState, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    Label,
    Input,
    FormFeedback,
    Form,
    FormGroup,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

//redux
import { useSelector, useDispatch } from "react-redux";

import {withRouter} from "react-router-dom";

import {
    getCustomerDetail as onGetCustomerDetail,
    updateCustomersData as onUpdateCustomer, deleteCustomerData as onDeleteCustomer
} from "../../../store/customer/actions";
import {useHistory} from "react-router-dom";
import toastr from "toastr";
import DeleteModal from "../../../components/Common/DeleteModal";
import Breadcrumbs from "../../../components/Common/Breadcrumb";

const CustomerUpdate = props => {

   //meta title
   document.title="Customer Update | AutoPro";

   const dispatch = useDispatch();
   const history = useHistory();
   if (localStorage.getItem("invoiceId")){
        localStorage.removeItem("invoiceId");
      }

   const [deleteModal, setDeleteModal] = useState(false);
   const [updateBtn, setUpdateBtn] = useState(false)
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
        history.push("/customer-detail/"+params.id)
        },
      });


   const onClickReset = () => {
       toastr.info("Reset Data")
       validation.values.email = customer.email;
       validation.values.full_name = customer.full_name;
       validation.values.address = customer.street1;
       validation.values.postal_code = customer.postal_code;
       validation.values.city = customer.country;
       validation.values.phone1 = customer.phone;
       validation.values.phone2 = customer.phone2;
       validation.values.province = customer.street2;
  };

  const onClickDelete = (customer) => {
    setDeleteModal(true);
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
          <Breadcrumbs title="List" breadcrumbItem="Update Customer"/>
          <Container fluid>
            <Col lg={12}>
                <Row>
                    <Card>
                      <CardBody>
                        <div className="p-2">
                            <Form className="form-horizontal"
                              onSubmit={(e) => {
                                e.preventDefault();
                                validation.handleSubmit();
                                return false;
                              }}
                            >
                                <div data-repeater-list="outer-group" className="outer">
                                    <Row>
                                    <Col md={6}>
                                        <div data-repeater-item className="outer">
                                            <FormGroup className="mb-4" row>
                                              <Label
                                                htmlFor="vin"
                                                className="col-form-label col-lg-2"
                                                >Email</Label>
                                                <Col lg="10">
                                                  <Input
                                                    name="email"
                                                    type="text"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.email || ""}
                                                    placeholder="Please Enter Email"
                                                    invalid={
                                                      validation.touched.email && validation.errors.email ? true : false
                                                    }
                                                />
                                                {validation.touched.email && validation.errors.email ? (
                                                    <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                                                ) : null}
                                              </Col>
                                            </FormGroup>
                                        </div>

                                        <div data-repeater-list="outer-group" className="outer">
                                            <div data-repeater-item className="outer">
                                                <FormGroup className="mb-4" row>
                                                  <Label
                                                    htmlFor="model"
                                                    className="col-form-label col-lg-2"
                                                    >FullName</Label>
                                                    <Col lg="10">
                                                      <Input
                                                        name="fullname"
                                                        type="text"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.fullname || ""}
                                                        placeholder="Please Enter FullName"
                                                        invalid={
                                                          validation.touched.fullname && validation.errors.fullname ? true : false
                                                        }
                                                    />
                                                    {validation.touched.fullname && validation.errors.fullname ? (
                                                        <FormFeedback type="invalid">{validation.errors.fullname}</FormFeedback>
                                                    ) : null}
                                                    </Col>
                                                </FormGroup>
                                            </div>
                                        </div>
                                        <div data-repeater-list="outer-group" className="outer">
                                            <div data-repeater-item className="outer">
                                                <FormGroup className="mb-4" row>
                                                  <Label
                                                    htmlFor="postal_code"
                                                    className="col-form-label col-lg-2"
                                                    >Postal Code</Label>
                                                    <Col lg="10">
                                                      <Input
                                                        name="postal_code"
                                                        type="text"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.postal_code || ""}
                                                        placeholder="Please Enter Postal Code"
                                                        invalid={
                                                          validation.touched.postal_code && validation.errors.postal_code ? true : false
                                                        }
                                                    />
                                                    {validation.touched.postal_code && validation.errors.postal_code ? (
                                                        <FormFeedback type="invalid">{validation.errors.postal_code}</FormFeedback>
                                                    ) : null}
                                                    </Col>
                                                </FormGroup>
                                            </div>
                                        </div>

                                        <div data-repeater-list="outer-group" className="outer">
                                            <div data-repeater-item className="outer">
                                                <FormGroup className="mb-4" row>
                                                  <Label
                                                    htmlFor="description"
                                                    className="col-form-label col-lg-2"
                                                    >Address</Label>
                                                    <Col lg="10">
                                                      <Input
                                                        name="address"
                                                        type="text"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        placeholder="Please Enter Description"
                                                        value={validation.values.address || ""}
                                                        invalid={
                                                          validation.touched.address && validation.errors.address ? true : false
                                                        }
                                                    />
                                                    {validation.touched.address && validation.errors.address ? (
                                                        <FormFeedback type="invalid">{validation.errors.address}</FormFeedback>
                                                    ) : null}
                                                    </Col>
                                                </FormGroup>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div data-repeater-list="outer-group" className="outer">
                                            <div data-repeater-item className="outer">
                                                <FormGroup className="mb-4" row>
                                                  <Label
                                                    htmlFor="city"
                                                    className="col-form-label col-lg-2"
                                                    >City</Label>
                                                    <Col lg="10">
                                                      <Input
                                                        name="city"
                                                        type="text"
                                                        placeholder="Please Enter City"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.city || ""}
                                                        invalid={
                                                          validation.touched.city && validation.errors.city ? true : false
                                                        }
                                                    />
                                                    {validation.touched.city && validation.errors.city ? (
                                                        <FormFeedback type="invalid">{validation.errors.city}</FormFeedback>
                                                    ) : null}
                                                  </Col>
                                                </FormGroup>
                                            </div>

                                            <div data-repeater-list="outer-group" className="outer">
                                                <div data-repeater-item className="outer">
                                                    <FormGroup className="mb-4" row>
                                                      <Label
                                                        htmlFor="province"
                                                        className="col-form-label col-lg-2"
                                                        >Province</Label>
                                                        <Col lg="10">
                                                          <Input
                                                            name="province"
                                                            type="text"
                                                            placeholder="Please Enter Province"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.province || ""}
                                                            invalid={
                                                              validation.touched.province && validation.errors.province ? true : false
                                                            }
                                                        />
                                                        {validation.touched.province && validation.errors.province ? (
                                                            <FormFeedback type="invalid">{validation.errors.province}</FormFeedback>
                                                        ) : null}
                                                        </Col>
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            <div data-repeater-list="outer-group" className="outer">
                                                <div data-repeater-item className="outer">
                                                    <FormGroup className="mb-4" row>
                                                      <Label
                                                        htmlFor="phone1"
                                                        className="col-form-label col-lg-2"
                                                        >Phone1</Label>
                                                        <Col lg="10">
                                                          <Input
                                                            name="phone1"
                                                            type="text"
                                                            placeholder="Please Enter Phone 1"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.phone1 || ""}
                                                            invalid={
                                                              validation.touched.phone1 && validation.errors.phone1 ? true : false
                                                            }
                                                        />
                                                        {validation.touched.phone1 && validation.errors.phone1 ? (
                                                            <FormFeedback type="invalid">{validation.errors.phone1}</FormFeedback>
                                                        ) : null}
                                                        </Col>
                                                    </FormGroup>
                                                </div>
                                            </div>

                                            <div data-repeater-list="outer-group" className="outer">
                                                <div data-repeater-item className="outer">
                                                    <FormGroup className="mb-4" row>
                                                      <Label
                                                        htmlFor="phone2"
                                                        className="col-form-label col-lg-2"
                                                        >Phone2</Label>
                                                        <Col lg="10">
                                                          <Input
                                                            name="phone2"
                                                            type="text"
                                                            placeholder="Please Enter Phone 2"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.phone2 || ""}
                                                        />
                                                        </Col>
                                                    </FormGroup>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    </Row>
                                </div>
                                <br/>
                                <div className="d-print-none">
                                  <div className="float-end">
                                      <button
                                          className="btn btn-danger w-auto me-2"
                                          type="button"
                                          onClick={() => {
                                              onClickDelete(customer)
                                          }}
                                        >
                                          <i className="fa fa-lock me-2" />Delete
                                      </button>
                                      <button
                                          className="btn btn-info w-auto me-2"
                                          type="button"
                                          onClick={() => onClickReset()}
                                        >
                                          <i className="fa fa-retweet me-2" />Reset
                                      </button>
                                      <button
                                          className="btn btn-success w-auto me-2"
                                        >
                                          <i className="fa fa-save me-2" />Save
                                      </button>
                                  </div>
                                </div>
                            </Form>
                        </div>
                      </CardBody>
                    </Card>
                </Row>
            </Col>
          </Container>
        </div>
    </React.Fragment>
  );
};

export default withRouter(CustomerUpdate);
