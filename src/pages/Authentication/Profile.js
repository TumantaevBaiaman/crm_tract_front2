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
import Breadcrumbs from "../../components/Common/Breadcrumb";


const Profile = () => {

    document.title="Profile | AutoPro";

    const dispatch = useDispatch();
    const history = useHistory();
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

    if (profile.profile){
        username = profile.profile.username
        lastname = profile.profile.lastname
        email = profile.profile.email
        phone = profile.profile.phone
        date = profile.profile.date_of_birth
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
          location.reload()
        }
      });

    const clickUpdateBtn = () => {
       history.push("/profile-update")
   }

   useEffect(() => {
    if (!profile) {
      dispatch(onGetProfile());
    }
    }, [profile]);

    return (
      <>
        <React.Fragment>
            <div className="page-content">
                  <Breadcrumbs title="Profile" breadcrumbItem="Your Profile" />

                  <Row>
                    <Col lg="12">
                        <Card>
                            <CardBody>
                            <Row>
                                <Col md={6}>
                                  <div className="d-flex">
                                    <div className="flex-grow-1 align-self-center">
                                      <div className="text-muted">
                                          <div className="table-responsive">
                                            <Table className="table-nowrap mb-0">
                                              <tbody>
                                                <tr>
                                                  <th scope="row">E-mail :</th>
                                                  <td>{email}</td>
                                                </tr>
                                                <tr>
                                                  <th scope="row">User Name :</th>
                                                  <td>{username}</td>
                                                </tr>
                                                <tr>
                                                  <th scope="row">Last Name :</th>
                                                  <td>{lastname}</td>
                                                </tr>
                                              </tbody>
                                            </Table>
                                          </div>
                                      </div>
                                    </div>
                                  </div>
                                </Col>
                                <Col md={6}>
                                  <div className="d-flex">
                                    <div className="flex-grow-1 align-self-center">
                                      <div className="text-muted">
                                          <div className="table-responsive">
                                            <Table className="table-nowrap mb-0">
                                              <tbody>
                                                <tr>
                                                  <th scope="row">Mobile Phone :</th>
                                                  <td>{phone}</td>
                                                </tr>
                                                <tr>
                                                  <th scope="row">Date of birth :</th>
                                                  <td>{date}</td>
                                                </tr>
                                              </tbody>
                                            </Table>
                                          </div>
                                      </div>
                                    </div>
                                  </div>
                                </Col>
                            </Row>
                            </CardBody>
                        </Card>
                    </Col>
                      <Col lg={12}>
                          <Card>
                            <CardBody>
                              <div className="text-end">
                                  <Button
                                    color="warning"
                                    onClick={clickUpdateBtn}
                                    className="w-md"
                                  >
                                      <i className="mdi mdi-border-color" id="edittooltip" /> Edit
                                  </Button>
                              </div>
                            </CardBody>
                          </Card>
                      </Col>
                  </Row>
              </div>
        </React.Fragment>
      </>
    );
}

export default Profile;