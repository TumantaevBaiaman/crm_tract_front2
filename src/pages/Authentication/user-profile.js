import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

//redux
import { useSelector, useDispatch } from "react-redux";

import { withRouter } from "react-router-dom";

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";

import avatar from "../../assets/images/users/avatar-1.jpg";
// actions
import {editProfile, getProfile, resetProfileFlag} from "../../store/actions";

const UserProfile = () => {

   //meta title
   document.title="Profile | AutoPro System";

  const dispatch = useDispatch();

  const [email, setemail] = useState("");
  const [username, setUsername] = useState("");
  const [lastname, setLastname] = useState("");
  const [idx, setidx] = useState(1);

  const { profile } = useSelector(state => ({
    profile: state.ProfileUser.profile,
  }));

  useEffect(() => {
    if (!profile) {
      dispatch(getProfile());
    }
  }, [profile]);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: username || '',
      lastname: lastname || '',
      email: email || '',
      idx : idx || '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Your UserName"),
      lastname: Yup.string().required("Please Enter Your LastName"),
      email: Yup.string().required("Please Enter Your Email"),
    }),
    onSubmit: (values) => {
      dispatch(editProfile(values));
    }
  });


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Tract System" breadcrumbItem="Profile" />

          <Row>
            <Col lg="12">
              {/*{error && error ? <Alert color="danger">{error}</Alert> : null}*/}

              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="ms-3">
                      {/*<img*/}
                      {/*  src={avatar}*/}
                      {/*  alt=""*/}
                      {/*  className="avatar-md rounded-circle img-thumbnail"*/}
                      {/*/>*/}
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <h5>{username}</h5>
                        <p className="mb-1">Lastname: {lastname}</p>
                        <p className="mb-1">Email: {email}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">Your Profile</h4>

          <Card>
            <CardBody>
              <Form
                className="form-horizontal"
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <div className="form-group">
                  <Label className="form-label">UserName</Label>
                  <Input
                    name="email"
                    // value={name}
                    className="form-control"
                    placeholder="Enter Email"
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
                <div className="form-group">
                  <Label className="form-label">UserName</Label>
                  <Input
                    name="username"
                    // value={name}
                    className="form-control"
                    placeholder="Enter UserName"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.username || ""}
                    invalid={
                      validation.touched.username && validation.errors.username ? true : false
                    }
                  />
                  {validation.touched.username && validation.errors.username ? (
                    <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                  ) : null}
                </div>
                <div className="form-group">
                  <Label className="form-label">LastName</Label>
                  <Input
                    name="lastname"
                    // value={name}
                    className="form-control"
                    placeholder="Enter LastName"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.lastname || ""}
                    invalid={
                      validation.touched.lastname && validation.errors.lastname ? true : false
                    }
                  />
                  {validation.touched.lastname && validation.errors.lastname ? (
                    <FormFeedback type="invalid">{validation.errors.lastname}</FormFeedback>
                  ) : null}
                </div>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UserProfile;
