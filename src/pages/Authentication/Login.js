import PropTypes from "prop-types";
import React from "react";

import { Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback, Label } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import { withRouter, Link } from "react-router-dom";
import auto_pro from "../../assets/images/logoLogin.png";
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// actions
import { loginUser, socialLogin } from "../../store/actions";

const Login = props => {

  //meta title
  document.title = "Login | Tract System";

  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values, props.history));
    }
  });

  const { error } = useSelector(state => ({
    error: state.Login.error,
  }));

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
                <div className="bg-soft">
                  <Row>
                    <Col className="col-12 align-self-center">
                      <img src={auto_pro} alt="" className="img-fluid h-20" />
                    </Col>
                    <Col xs={12}>
                      <div className="p-4 text-center">
                        <h5 className="font-size-22">Welcome to AutoPro</h5>
                      </div>
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  {/*<div>*/}
                  {/*  <Link to="/" className="auth-logo-light">*/}
                  {/*    <div className="avatar-md profile-user-wid mb-4">*/}
                  {/*      /!*<span className="avatar-title rounded-circle bg-light">*!/*/}
                  {/*      /!*  <img*!/*/}
                  {/*      /!*    src={logo}*!/*/}
                  {/*      /!*    alt=""*!/*/}
                  {/*      /!*    className="rounded-circle"*!/*/}
                  {/*      /!*    height="34"*!/*/}
                  {/*      /!*  />*!/*/}
                  {/*      /!*</span>*!/*/}
                  {/*    </div>*/}
                  {/*  </Link>*/}
                  {/*</div>*/}
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      {error ? <Alert color="danger">{error}</Alert> : null}

                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
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
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          value={validation.values.password || ""}
                          type="password"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.password && validation.errors.password ? true : false
                          }
                        />
                        {validation.touched.password && validation.errors.password ? (
                          <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <p>
                          Don&#39;t have an account ?{" "}
                          <Link to="/register" className="fw-medium text-primary">
                            {" "}
                            Signup now{" "}
                          </Link>{" "}
                        </p>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object,
};
