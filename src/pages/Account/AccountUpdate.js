import React, { useEffect, useState } from "react";
import {
    Row,
    Col,
    CardBody,
    Card,
    Container,
    Input,
    Label,
    Form,
    FormFeedback,
    CardTitle,
    FormGroup
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// action
import {getProfile, UpdateAccount} from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";

import Breadcrumbs from "../../components/Common/Breadcrumb";
import {useHistory} from "react-router-dom";


const UpdateAccountAdmin = props => {

  //meta title
  document.title = "Update Account | AutoPro";

  const dispatch = useDispatch();
  const history = useHistory();

  const { profile } = useSelector(state => ({
    profile: state.ProfileUser.profile,
  }));

  const [image, setImage] = useState('')
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
        name: profile?.account?.name || '',
        address: profile?.account?.street2 || '',
        city: profile?.account?.street1 || '',
        country: profile?.account?.country || '',
        phone: profile?.account?.phone || '',
        email: profile?.account?.email || '',
        hst: profile?.account?.hst || '',
    },
    validationSchema: Yup.object({
        name: Yup.string().required("Please Enter Your Name"),
        address: Yup.string().required("Please Enter Address"),
        city: Yup.string().required("Please Enter City"),
        country: Yup.string().required("Please Enter Country"),
        phone: Yup.string().required("Please Enter Phone"),
        email: Yup.string().required("Please Enter Email"),
        hst: Yup.string().required("Please Enter Your hst")
    }),
    onSubmit: (values) => {
        let data_form = new FormData();
        data_form.append('id', localStorage.getItem("account_user"));
        data_form.append('name', values.name);
        data_form.append('hst', values.hst);
        data_form.append('street2', values.address);
        data_form.append('street1', values.city);
        data_form.append('country', values.country);
        data_form.append('email', values.email);
        data_form.append('phone', values.phone);
        if (image!==""){
            data_form.append('logo', image, image.name);
        }
        dispatch(UpdateAccount(data_form, history));
    }
  });

  useEffect(() => {
    if (!profile) {
      dispatch(getProfile());
    }
  }, [profile]);

  const handleImageChange = (file) => {
        setImage(file.target.files[0])
    };

  const onClickPrev = () => {
      history.goBack()
  }

  const color_btn = () => {
      if (localStorage.getItem("account_status")==="1"){
          return " btn-success"
      }
      else {
          return " bg-status-account-btn"
      }
  }

  return (
      <>
          <div className="page-content">
          <Container fluid>
            <Breadcrumbs title="Account" breadcrumbItem="Create Account" />
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <CardTitle className="mb-4">Create New Account</CardTitle>
                    <div className="p-2">
                        <Form className="form-horizontal"
                          onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                          }}
                        >
                            <div data-repeater-list="outer-group" className="outer">

                                <div data-repeater-item className="outer">
                                    <FormGroup className="mb-4" row>
                                      <Label
                                        htmlFor="vin"
                                        className="col-form-label col-lg-2"
                                        >Email</Label>
                                        <Col lg="10">
                                          <Input
                                            id="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Enter email"
                                            type="text"
                                            value={validation.values.email || ""}
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
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

                                <div data-repeater-item className="outer">
                                    <FormGroup className="mb-4" row>
                                      <Label
                                        htmlFor="vin"
                                        className="col-form-label col-lg-2"
                                        >Name</Label>
                                        <Col lg="10">
                                          <Input
                                            id="name"
                                            name="name"
                                            className="form-control"
                                            placeholder="Enter name"
                                            type="text"
                                            value={validation.values.name || ""}
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            invalid={
                                              validation.touched.name && validation.errors.name ? true : false
                                            }
                                          />
                                          {validation.touched.name && validation.errors.name ? (
                                            <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                                          ) : null}
                                      </Col>
                                    </FormGroup>
                                </div>

                                <div data-repeater-item className="outer">
                                    <FormGroup className="mb-4" row>
                                      <Label
                                        htmlFor="vin"
                                        className="col-form-label col-lg-2"
                                        >Country</Label>
                                        <Col lg="10">
                                          <Input
                                            id="country"
                                            name="country"
                                            className="form-control"
                                            placeholder="Enter country"
                                            type="text"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.country || ""}
                                            invalid={
                                              validation.touched.country && validation.errors.country ? true : false
                                            }
                                          />
                                          {validation.touched.country && validation.errors.country ? (
                                            <FormFeedback type="invalid">{validation.errors.country}</FormFeedback>
                                          ) : null}
                                      </Col>
                                    </FormGroup>
                                </div>

                                <div data-repeater-item className="outer">
                                    <FormGroup className="mb-4" row>
                                      <Label
                                        htmlFor="vin"
                                        className="col-form-label col-lg-2"
                                        >City</Label>
                                        <Col lg="10">
                                          <Input
                                            id="city"
                                            name="city"
                                            className="form-control"
                                            placeholder="Enter city"
                                            type="text"
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

                                <div data-repeater-item className="outer">
                                    <FormGroup className="mb-4" row>
                                      <Label
                                        htmlFor="address"
                                        className="col-form-label col-lg-2"
                                        >Address</Label>
                                        <Col lg="10">
                                          <Input
                                            id="address"
                                            name="address"
                                            className="form-control"
                                            placeholder="Enter address"
                                            type="text"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
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

                                <div data-repeater-item className="outer">
                                    <FormGroup className="mb-4" row>
                                      <Label
                                        htmlFor="phone"
                                        className="col-form-label col-lg-2"
                                        >Phone</Label>
                                        <Col lg="10">
                                          <Input
                                            id="phone"
                                            name="phone"
                                            className="form-control"
                                            placeholder="+ 1XXXXX..."
                                            type="text"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.phone || ""}
                                            invalid={
                                              validation.touched.phone && validation.errors.phone ? true : false
                                            }
                                          />
                                          {validation.touched.phone && validation.errors.phone ? (
                                            <FormFeedback type="invalid">{validation.errors.phone}</FormFeedback>
                                          ) : null}
                                      </Col>
                                    </FormGroup>
                                </div>

                                <div data-repeater-item className="outer">
                                    <FormGroup className="mb-4" row>
                                      <Label
                                        htmlFor="vin"
                                        className="col-form-label col-lg-2"
                                        >HST</Label>
                                        <Col lg="10">
                                          <Input
                                            id="hst"
                                            name="hst"
                                            className="form-control"
                                            placeholder="Enter hst"
                                            type="number"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.hst || ""}
                                            invalid={
                                              validation.touched.hst && validation.errors.hst ? true : false
                                            }
                                          />
                                          {validation.touched.hst && validation.errors.hst ? (
                                            <FormFeedback type="invalid">{validation.errors.hst}</FormFeedback>
                                          ) : null}
                                      </Col>
                                    </FormGroup>
                                </div>

                                {localStorage.getItem("account_status")==="1" ? (
                                    <div data-repeater-item className="outer">
                                        <FormGroup className="mb-4" row>
                                          <Label
                                            htmlFor="logo"
                                            className="col-form-label col-lg-2"
                                            >Logo</Label>
                                            <Col lg="10">
                                              <Input
                                                id="image"
                                                name="image"
                                                className="form-control"
                                                placeholder="Enter country"
                                                accept="image/png, image/jpg"
                                                type="file"
                                                onChange={handleImageChange}
                                                onBlur={validation.handleBlur}
                                              />
                                          </Col>
                                        </FormGroup>
                                    </div>
                                ): null}

                                <br/>
                                <div className=" text-end">
                                  <button
                                    className="btn btn-primary me-2 w-md"
                                    type="submit"
                                    onClick={onClickPrev}
                                  >
                                    <i className="mdi mdi-arrow-left"></i> Back
                                  </button>
                                  <button
                                    className={"btn w-md"+color_btn()}
                                    type="submit"
                                  >
                                    <i className="mdi mdi-content-save"></i> Save
                                  </button>
                                </div>
                            </div>
                        </Form>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </>
  )
};

export default UpdateAccountAdmin;
