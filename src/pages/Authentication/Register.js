import React, { useEffect } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// action
import { registerUser, apiError } from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import logoImg from "../../assets/images/logo.svg";
import {useHistory} from "react-router-dom";
import ModalLogin from "../Dashboard/modal-login";

const Register = props => {

  //meta title
  document.title = "Register | AutoPro";

  const dispatch = useDispatch();
  const history = useHistory();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      step: 1,
      email: '',
      username: '',
      lastname: '',
      phone: '',
      joiningDate: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      username: Yup.string().required("Please Enter Your Name"),
      lastname: Yup.string().required("Please Enter Your LastName"),
      phone: Yup.string().required("Please Enter Your Phone"),
      joiningDate: Yup.string().required("Please Enter Your Joining Date"),
    }),
    onSubmit: (values) => {
      const newUser = {
            step: 1,
            username: values["username"],
            phone: values["phone"],
            email: values["email"],
            lastname: values['lastname'],
            date_of_birth: values["joiningDate"],
            account_status: 1,
      };
      dispatch(registerUser(newUser, history));
    }
  });

  const { user, registrationError, loading } = useSelector(state => ({
    user: state.Account.user,
    registrationError: state.Account.registrationError,
    loading: state.Account.loading,
  }));

  useEffect(() => {
    dispatch(apiError(""));
  }, []);

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className=" bg-soft">
                  <Row>
                    {/*<Col className="col-12 align-self-senter">*/}
                    {/*  <img src={profile} alt="" className="img-fluid h-100" />*/}
                    {/*</Col>*/}
                    <Col xs={12}>
                      <div className="p-4 text-center">
                        <h5 className="font-size-22">Welcome to AutoPro</h5>
                        <p>register account crm-system</p>
                      </div>
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">

                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      {user && user ? (
                        // <Alert color="success">
                        //   Register User Successfully
                        // </Alert>
                          ModalLogin()
                      ) : null}

                      {registrationError && registrationError ? (
                        <Alert color="danger">{registrationError}</Alert>
                      ) : null}

                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <div className="input-group">
                        <Input
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email ? true : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                        ) : <button className="btn btn-success info_new" id="inputGroupFileAddon03" data-title="Need email to register. Ex: john@email.com"><i className="mdi mdi-alert-circle-outline"></i></button>}
                        </div>
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">UserName</Label>
                        <div className="input-group">
                        <Input
                          name="username"
                          type="text"
                          placeholder="Enter username"
                          className="form-control"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.username || ""}
                          invalid={
                            validation.touched.username && validation.errors.username ? true : false
                          }
                      />
                      {validation.touched.username && validation.errors.username ? (
                          <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                      ) : <button className="btn btn-success info_new" id="inputGroupFileAddon03" data-title="Need username to register"><i className="mdi mdi-alert-circle-outline"></i></button>}
                        </div>
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">LastName</Label>
                        <div className="input-group">
                        <Input
                            name="lastname"
                            type="text"
                            className="form-control"
                            placeholder="Enter lastname"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.lastname || ""}
                            invalid={
                              validation.touched.lastname && validation.errors.lastname ? true : false
                            }
                        />
                        {validation.touched.lastname && validation.errors.lastname ? (
                            <FormFeedback type="invalid">{validation.errors.lastname}</FormFeedback>
                        ) : <button className="btn btn-success info_new" id="inputGroupFileAddon03" data-title="Need lastname to register"><i className="mdi mdi-alert-circle-outline"></i></button>}
                        </div>
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Phone</Label>
                        <div className="input-group">
                        <Input
                          name="phone"
                          type="text"
                          className="form-control"
                          placeholder="+ 1XXXXX..."
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.phone || ""}
                          invalid={
                            validation.touched.phone && validation.errors.phone ? true : false
                          }
                      />
                      {validation.touched.phone && validation.errors.phone ? (
                          <FormFeedback type="invalid">{validation.errors.phone}</FormFeedback>
                      ) : <button className="btn btn-success info_new" id="inputGroupFileAddon03" data-title="Need phone to register, format + 1XXXXX..."><i className="mdi mdi-alert-circle-outline"></i></button>}
                        </div>
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Date of birth</Label>
                        <div className="input-group">
                        <Input
                            name="joiningDate"
                            type="date"
                            className="form-control"
                            placeholder="Enter date"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.joiningDate || ""}
                            invalid={
                              validation.touched.joiningDate && validation.errors.joiningDate ? true : false
                            }
                        />
                        {validation.touched.joiningDate && validation.errors.joiningDate ? (
                            <FormFeedback type="invalid">{validation.errors.joiningDate}</FormFeedback>
                        ) : <button className="btn btn-success info_new" id="inputGroupFileAddon03" data-title="Need date of birth to register"><i className="mdi mdi-alert-circle-outline"></i></button>}
                        </div>
                      </div>

                      {loading && loading ? (
                        <Row>
                          <Col xs="12">
                            <div className="text-center my-3">
                              <Link to="#" className="text-success">
                                <i className="bx bx-loader bx-spin font-size-18 align-middle me-2" />
                                Processing
                              </Link>
                            </div>
                          </Col>
                        </Row>
                      ) :
                      <div className="mt-4">
                        <button
                          className="btn btn-primary btn-block "
                          type="submit"
                        >
                          Register
                        </button>
                      </div>
                      }

                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Already have an account ?{" "}
                  <Link to="/login" className="font-weight-medium text-primary">
                    {" "}
                    Login
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} AutoPro.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Register;
