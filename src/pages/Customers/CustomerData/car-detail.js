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
    Form, CardTitle, FormGroup, UncontrolledTooltip, DropdownItem, Table,
} from "reactstrap";
import { isEmpty, map } from "lodash";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

//redux
import { useSelector, useDispatch } from "react-redux";

import {Link, withRouter} from "react-router-dom";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import {
    getCarDetail as onGetCarDetail,
    updateCar as onUpdateCar,
    deleteCar as onDeleteCar,
} from "../../../store/car/actions";

import {useHistory} from "react-router-dom";
import {getCustomersData as onGetCustomers} from "../../../store/customer/actions";
import de from "react-datepicker";
import DeleteModal from "../../../components/Common/DeleteModal";
import API_URL from "../../../helpers/api_helper";

const CarDetail = props => {

   //meta title
   document.title="Car Detail | AutoPro";

   const dispatch = useDispatch();
   const history = useHistory();

   let invoice_status = false;
   let invoice_id = 0;
   if (localStorage.getItem("invoiceId")){
       invoice_status = true;
       invoice_id = parseInt(localStorage.getItem("invoiceId"))
  }

   const [image, setImage] = useState('')
   const { carDetail } = useSelector(state => ({
       carDetail: state.Cars.carDetail,
   }));

   const {
        match: { params },
      } = props;

    useEffect(() => {
        if (params && params.id) {
          dispatch(onGetCarDetail(params.id));
        } else {
          dispatch(onGetCarDetail(1)); //remove this after full integration
        }
      }, [params, onGetCarDetail]);

   const car = carDetail;

   const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      description: (car && car.description) || '',
      vin: (car && car.vin) || '',
      model: (car && car.model) || '',
      make: (car && car.make) || '',
      stock: (car && car.stock) || '',
      po: (car && car.po) || '',
      image: (car && car.image) || '',
    },
    validationSchema: Yup.object({
      vin: Yup.string().min(8, 'VIN number should be at least 8 characters long').required("Please Enter VIN Number Car"),
      make: Yup.string().required("Please Enter Make"),
    }),
    onSubmit: (values) => {
        let data_form = new FormData();
        data_form.append("id", params.id);
        data_form.append("description", "null");
        data_form.append("vin", values.vin);
        data_form.append("model", values.model);
        data_form.append("po", values.po);
        data_form.append("stock", values.stock);
        data_form.append("make", values.make);
        if (image!==""){
            data_form.append('image', image, image.name)
        }
        dispatch(onUpdateCar(data_form));
        dispatch(onGetCarDetail(params.id));
        },
      });

   const handleImageChange = (file) => {
      setImage(file.target.files[0])
    };

   const onClickTask = () => {
       if (JSON.parse(localStorage.getItem("invoiceId"))){
          history.push('/tasks-detail/'+params.id)
       } else{
           history.push('/tasks-create/'+params.id)
       }
    };

   const onClickDeleteCar = () => {
       const deleteCar = {
           "id": params.id
       }
       dispatch(onDeleteCar(deleteCar))
       history.push("/car-list/"+car.customer)
   };

   const [deleteModal, setDeleteModal] = useState(false);

   const onClickDelete = () => {
       setDeleteModal(true);
   };

   const onClickPrev = () => {
       if (invoice_status){
           history.push('/invoices-detail/'+invoice_id)
       }else{
           history.push("/car-list/"+car.customer)
       }
  };

  useEffect(() => {
    dispatch(onGetCarDetail(params.id));
  }, [dispatch]);

  return (
    <React.Fragment>
        <DeleteModal
            show={deleteModal}
            onDeleteClick={onClickDeleteCar}
            onCloseClick={() => setDeleteModal(false)}
        />
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs title="Car" breadcrumbItem="Update Car" />
            <Row>
              <Col lg="12">
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
                                <div data-repeater-item className="outer">
                                    <FormGroup className="mb-4" row>
                                      <Label
                                        htmlFor="vin"
                                        className="col-form-label col-lg-2"
                                        >VIN</Label>
                                        <Col lg="10">
                                          <Input
                                            id="vin"
                                            name="vin"
                                            className="form-control"
                                            placeholder="Enter vin number"
                                            type="text"
                                            onChange={validation.handleChange}
                                            onBlur={validation.handleBlur}
                                            value={validation.values.vin || ""}
                                            invalid={
                                              validation.touched.vin && validation.errors.vin ? true : false
                                            }
                                          />
                                          {validation.touched.vin && validation.errors.vin ? (
                                            <FormFeedback type="invalid">{validation.errors.vin}</FormFeedback>
                                          ) : null}
                                      </Col>
                                    </FormGroup>
                                </div>

                                <div data-repeater-list="outer-group" className="outer">
                                    <div data-repeater-item className="outer">
                                        <FormGroup className="mb-4" row>
                                          <Label
                                            htmlFor="stock"
                                            className="col-form-label col-lg-2"
                                            >Stock</Label>
                                            <Col lg="10">
                                              <Input
                                                name="stock"
                                                type="text"
                                                placeholder="Enter Stock"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.stock || ""}
                                              />
                                            </Col>
                                        </FormGroup>
                                    </div>
                                </div>

                                <div data-repeater-list="outer-group" className="outer">
                                    <div data-repeater-item className="outer">
                                        <FormGroup className="mb-4" row>
                                          <Label
                                            htmlFor="make"
                                            className="col-form-label col-lg-2"
                                            >Make</Label>
                                            <Col lg="10">
                                              <Input
                                                name="make"
                                                type="text"
                                                placeholder="Enter make"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.make || ""}
                                                invalid={
                                                  validation.touched.make && validation.errors.make ? true : false
                                                }
                                              />
                                              {validation.touched.make && validation.errors.make ? (
                                                <FormFeedback type="invalid">{validation.errors.make}</FormFeedback>
                                              ) : null}
                                            </Col>
                                        </FormGroup>
                                    </div>
                                </div>

                                <div data-repeater-list="outer-group" className="outer">
                                    <div data-repeater-item className="outer">
                                        <FormGroup className="mb-4" row>
                                          <Label
                                            htmlFor="model"
                                            className="col-form-label col-lg-2"
                                            >Model</Label>
                                            <Col lg="10">
                                              <Input
                                                name="model"
                                                type="text"
                                                placeholder="Enter model"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.model || ""}
                                              />
                                            </Col>
                                        </FormGroup>
                                    </div>
                                </div>

                                <div data-repeater-list="outer-group" className="outer">
                                    <div data-repeater-item className="outer">
                                        <FormGroup className="mb-4" row>
                                          <Label
                                            htmlFor="po"
                                            className="col-form-label col-lg-2"
                                            >PO Number</Label>
                                            <Col lg="10">
                                              <Input
                                                name="po"
                                                type="text"
                                                placeholder="Enter PO Number"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.po || ""}
                                              />
                                            </Col>
                                        </FormGroup>
                                    </div>
                                </div>

                                <div data-repeater-list="outer-group" className="outer">
                                    <div data-repeater-item className="outer">
                                        <FormGroup className="mb-4" row>
                                          <Label
                                            htmlFor="image"
                                            className="col-form-label col-lg-2"
                                            >Image</Label>
                                            <Col lg="10">
                                                <div className="text-lg-start">
                                                    <img src={image.name || API_URL+validation.values.image} alt="" width="80" className="rounded" />
                                                </div>
                                                <br/>
                                              <Input
                                                name="image"
                                                type="file"
                                                placeholder="Image car"
                                                accept="image/png, image/jpg"
                                                className="form-control"
                                                onChange={handleImageChange}
                                                onBlur={validation.handleBlur}
                                              />
                                            </Col>
                                        </FormGroup>
                                    </div>
                                </div>
                                <br/>
                            </div>
                            <div className="d-print-none">
                              <div className="float-end">
                                  <button
                                      className="btn btn-success w-auto me-2"
                                    >
                                      <i className="fa fa-cloud-upload-alt" /> Update
                                  </button>
                                  <button
                                    onClick={() => {
                                        onClickPrev()
                                    }}
                                  className="btn btn-primary w-auto me-2"
                                >
                                  <i className="fa fa-chevron-left" /> Prev
                                </button>
                                  <button
                                      onClick={() => {
                                            onClickTask()
                                        }}
                                      className="btn btn-primary w-auto me-2"
                                    >
                                      Next <i className="fa fa-chevron-right" />
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
    </React.Fragment>
  );
};

export default withRouter(CarDetail);
