import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  FormFeedback,
  Label,
  Form,
} from "reactstrap";

import Breadcrumbs from "components/Common/Breadcrumb";

import DeleteModal from "../../../components/Common/DeleteModal";
import {
  getCustomers as onGetCustomers,
  addNewCustomer as onAddNewCustomer,
  getStatus as onGetStatus,
  updateCustomer as onUpdateCustomer,
  deleteCustomer as onDeleteCustomer,
} from "store/e-commerce/actions";

import { useSelector, useDispatch } from "react-redux";
import TableContainer from '../../../components/Common/TableContainer';
import {useHistory} from "react-router-dom";

import {
  UserName,
  PhoneEmail,
  WalletBalances,
  JoiningDate,
} from './EcommerceCustCol';
import {getProfile} from "../../../store/profile/actions";
import {useMediaQuery} from "react-responsive";

const EcommerceCustomers = props => {

  document.title = "Employee | AutoPro ";
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const dispatch = useDispatch();
  const history = useHistory();

  const { customers } = useSelector(state => ({
    customers: state.ecommerce.customers,
  }));
  const { status } = useSelector(state=>({
    status: state.ecommerce.status,
  }));

  const [modal, setModal] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [customer, setCustomer] = useState(null);

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: (customer && customer.username) || '',
      lastname: (customer && customer.lastname) || '',
      status: (customer && customer.status) || '',
      phone: (customer && customer.phone) || '',
      email: (customer && customer.email) || '',
      joiningDate: (customer && customer.joiningDate) || '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Your Name"),
      lastname: Yup.string().required("Please Enter Your LastName"),
      status: Yup.string().required("Please Enter Your Status"),
      phone: Yup.string().required("Please Enter Your Phone"),
      email: Yup.string().required("Please Enter Your Email"),
      joiningDate: Yup.string().required("Please Enter Your Joining Date"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateCustomer = {
          id: customer ? customer.id : 0,
          lastname: values.lastname,
          username: values.username,
          status: values.status,
          phone: values.phone,
          email: values.email,
          // rating: values.rating,
          // walletBalance: values.walletBalance,
          date_of_birth: values.joiningDate,
        };
        // update customer
        dispatch(onUpdateCustomer(updateCustomer));
        validation.resetForm();
      } else {
        const newCustomer = {
          step: 2,
          username: values["username"],
          phone: values["phone"],
          status: values["status"],
          email: values["email"],
          lastname: values['lastname'],
          date_of_birth: values["joiningDate"],
        };
        // save new customer
        dispatch(onAddNewCustomer(newCustomer));
        validation.resetForm();
      }
      toggle();
    },
  });

  const handleCustomerClick = arg => {
    const customer = arg;

    setCustomer({
      id: customer.id,
      username: customer.username,
      lastname: customer.lastname,
      status: customer.status,
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
      date_of_birth: customer.joiningDate,
    });

    setIsEdit(true);
    toggle();
  };

  // Customber Column
  const columns = useMemo(
    () => [

      {
        Header: '№',
        accessor: 'id',
        filterable: true,
        Cell: (cellProps) => {
          return <WalletBalances {...cellProps} />;
        }
      },
      {
        Header: 'LastName',
        accessor: 'lastname',
        filterable: true,
        Cell: (cellProps) => {
          return <UserName {...cellProps} />;
        }
      },
      {
        Header: 'Email',
        accessor: 'email',
        filterable: true,
        Cell: (cellProps) => {
          return <PhoneEmail {...cellProps} />;
          ;
        }
      },
      {
        Header: 'Phone',
        accessor: 'phone',
        filterable: true,
        Cell: (cellProps) => {
          return <PhoneEmail {...cellProps} />;
        }
      },
      {
        Header: 'Date of birth',
        accessor: 'date_of_birth',
        Cell: (cellProps) => {
          return <JoiningDate {...cellProps} />;
        }
      },
      // {
      //   Header: 'Action',
      //   Cell: (cellProps) => {
      //     return (
      //       <UncontrolledDropdown>
      //         <DropdownToggle tag="a" className="card-drop">
      //           <i className="mdi mdi-dots-horizontal font-size-18"></i>
      //         </DropdownToggle>
      //
      //         <DropdownMenu className="dropdown-menu-end">
      //           <DropdownItem
      //             onClick={() => {
      //               const customerData = cellProps.row.original;
      //               handleCustomerClick(customerData);
      //             }
      //             }
      //           >
      //             <i className="mdi mdi-pencil font-size-16 text-success me-1" id="edittooltip"></i>
      //             Edit
      //             <UncontrolledTooltip placement="top" target="edittooltip">
      //               Edit
      //             </UncontrolledTooltip>
      //           </DropdownItem>
      //
      //           <DropdownItem
      //             onClick={() => {
      //               const customerData = cellProps.row.original;
      //               onClickDelete(customerData);
      //             }}>
      //             <i className="mdi mdi-trash-can font-size-16 text-danger me-1" id="deletetooltip"></i>
      //             Delete
      //             <UncontrolledTooltip placement="top" target="deletetooltip">
      //               Delete
      //             </UncontrolledTooltip>
      //           </DropdownItem>
      //         </DropdownMenu>
      //       </UncontrolledDropdown>
      //     );
      //   }
      // },
    ],
    []
  );

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

  const onClickDelete = (customer) => {
    setCustomer(customer);
    setDeleteModal(true);
  };

  const handleDeleteCustomer = () => {
    if (customer.id) {
      dispatch(onDeleteCustomer(customer));
      setDeleteModal(false);
    }
  };

  useEffect(() => {
    if (customers && !customers.length) {
      dispatch(onGetCustomers());
      dispatch(onGetStatus());
    }
  }, [dispatch, customers]);

  useEffect(() => {
    setCustomerList(customers);
    setStatusList(status);
  }, [customers]);

  useEffect(() => {
    if (!isEmpty(customers)) {
      setCustomerList(customers);
    }
  }, [customers]);

  const handleCustomerClicks = () => {
    setCustomerList("");
    setIsEdit(false);
    toggle();
  };

  let isAdmin = false;

  const { profile } = useSelector(state => ({
    profile: state.ProfileUser.profile,
  }));
  //
  useEffect(() => {
    if (!profile) {
      dispatch(getProfile());
    }
  }, [profile]);


  if (localStorage.getItem("status_user")){
    if(localStorage.getItem("status_user")==="admin"){
      isAdmin=true
    }
  }

  if (isAdmin){
    return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteCustomer}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="List" breadcrumbItem="Employee" />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    history={history}
                    data={customers}
                    isGlobalFilter={true}
                    isAddCustList={true}
                    handleCustomerClick={handleCustomerClicks}
                    customPageSize={10}
                    className="custom-header-css"
                  />

                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag="h4">
                      {!!isEdit
                        ? "Edit Employee"
                        : "Add Employee"}
                    </ModalHeader>
                    <ModalBody>
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                      >
                        <Row>
                          <Col className="col-12">

                            <div className="mb-3">
                              <Label className="form-label">Email</Label>
                              <Input
                                name="email"
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
                              <Label className="form-label">UserName</Label>
                              <Input
                                name="username"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.username || ""}
                                invalid={
                                  validation.touched.username && validation.errors.username ? true : false
                                }
                              />
                              {validation.touched.rating && validation.errors.rating ? (
                                <FormFeedback type="invalid">{validation.errors.rating}</FormFeedback>
                              ) : null}
                            </div>

                            <div className="mb-3">
                              <Label className="form-label">LastName</Label>
                              <Input
                                name="lastname"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.lastname || ""}
                                invalid={
                                  validation.touched.lastname && validation.errors.lastname ? true : false
                                }
                              />
                              {validation.touched.username && validation.errors.lastname ? (
                                <FormFeedback type="invalid">{validation.errors.lastname}</FormFeedback>
                              ) : null}
                            </div>

                            <div className="mb-3">
                              <Label className="form-label">Phone Number</Label>
                              <Input
                                name="phone"
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
                            </div>

                            <div className="mb-3">
                              <Label className="form-label">Status</Label>
                              <select
                                  name="status"
                                  type="select"
                                  className="form-select"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                              >
                                <option value=""></option>
                                {status.map(option => (
                                    <option key={option.id} value={option.name}>
                                      {option.name}
                                    </option>
                                  ))}
                                {validation.touched.status && validation.errors.status ? (
                                <FormFeedback type="invalid">{validation.errors.status}</FormFeedback>
                              ) : null}
                              </select>
                            </div>

                            <div className="mb-3">
                              <Label className="form-label">Date of birth</Label>
                              <Input
                                name="joiningDate"
                                type="date"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.joiningDate || ""}
                                invalid={
                                  validation.touched.joiningDate && validation.errors.joiningDate ? true : false
                                }
                              />
                              {validation.touched.joiningDate && validation.errors.joiningDate ? (
                                <FormFeedback type="invalid">{validation.errors.joiningDate}</FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="text-end">
                              <button
                                type="submit"
                                className="btn btn-success save-customer"
                              >
                                Create
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>

                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
  }
  else {
    return (
        <>
        </>
    );
  }
};

EcommerceCustomers.propTypes = {
  customers: PropTypes.array,
  onGetCustomers: PropTypes.func,
  onAddNewCustomer: PropTypes.func,
  onDeleteCustomer: PropTypes.func,
  onUpdateCustomer: PropTypes.func,
};

export default EcommerceCustomers;
