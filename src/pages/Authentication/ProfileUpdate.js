import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {
    BreadcrumbItem, Button,
    Card,
    CardBody, CardTitle,
    Col,
    Container,
    Form,
    FormFeedback,
    Input,
    Label,
    Row, Table,
} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {
    getProfile as onGetProfile,
    updateProfile as onUpdateProfile
} from "../../store/profile/actions";
import Breadcrumb from "../../components/Common/Breadcrumb";
import {useFormik} from "formik";
import * as Yup from "yup";
import {editProfile} from "../../store/auth/profile/actions";


const ProfileUpdate = () => {

    document.title="Profile | AutoPro";

    const dispatch = useDispatch();
    const history = useHistory()
    if (localStorage.getItem("invoiceId")){
        localStorage.removeItem("invoiceId");
      }

    const [updateBtn, setUpdateBtn] = useState(false)
    let username = ''
    let lastname = ''
    let email = ''
    let phone = ''
    let date = ''

    const { profile } = useSelector(state => ({
        profile: state.ProfileUser.profile,
    }));

    useEffect(() => {
      if (profile) {
        dispatch(onGetProfile());
      }
    }, [profile]);

    if (profile?.profile){
        username = profile?.profile.username
        lastname = profile?.profile.lastname
        email = profile?.profile.email
        phone = profile?.profile.phone
        date = profile?.profile.date_of_birth
    }

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
          username: username || '',
          lastname: lastname || '',
          email: email || '',
          phone: phone || '',
          joiningDate: date || '',
        },
        validationSchema: Yup.object({
          username: Yup.string().required("Please Enter Your UserName"),
          lastname: Yup.string().required("Please Enter Your LastName"),
          email: Yup.string().required("Please Enter Your Email"),
          phone: Yup.string().required("Please Enter Your Phone"),
          joiningDate: Yup.string().required("Please Enter Your Joining Date"),
        }),
        onSubmit: (values) => {
            const updateData = {
                username: values["username"],
                phone: values["phone"],
                email: values["email"],
                lastname: values['lastname'],
                date_of_birth: values["joiningDate"],
          };
          dispatch(onUpdateProfile(updateData));
          history.push("/profile")
        }
      });

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
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                  <>
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
                            <div data-repeater-list="outer-group" className="outer">
                                <div className="form-group">
                                  <Label className="form-label">Email</Label>
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
                                <div className="form-group">
                                    <Label className="form-label">Phone</Label>
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
                                  ) : null}
                              </div>
                              {/*<div className="form-group">*/}
                              {/*  <Label className="form-label">Date</Label>*/}
                              {/*  <Input*/}
                              {/*      name="joiningDate"*/}
                              {/*      type="date"*/}
                              {/*      className="form-control"*/}
                              {/*      placeholder="Enter date"*/}
                              {/*      onChange={validation.handleChange}*/}
                              {/*      onBlur={validation.handleBlur}*/}
                              {/*      value={validation.values.joiningDate || ""}*/}
                              {/*      invalid={*/}
                              {/*        validation.touched.joiningDate && validation.errors.joiningDate ? true : false*/}
                              {/*      }*/}
                              {/*  />*/}
                              {/*  {validation.touched.joiningDate && validation.errors.joiningDate ? (*/}
                              {/*      <FormFeedback type="invalid">{validation.errors.joiningDate}</FormFeedback>*/}
                              {/*  ) : null}*/}
                              {/*</div>*/}
                              <div className="d-print-none" style={{ marginTop: 25}}>
                                  <div className="float-end">
                                      <button
                                          className={"btn w-auto me-2"+color_btn()}
                                        >
                                          <i className="fa fa-cloud-upload-alt" /> Update
                                      </button>
                                  </div>
                                </div>
                            </div>
                          </Form>
                        </CardBody>
                      </Card>
                    </>
                </Container>
              </div>
        </React.Fragment>
      </>
    );
}

export default ProfileUpdate;