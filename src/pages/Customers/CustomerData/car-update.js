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
    FormGroup
} from "reactstrap";

import * as Yup from "yup";
import { useFormik } from "formik";

import { useSelector, useDispatch } from "react-redux";

import {withRouter} from "react-router-dom";

import Breadcrumbs from "../../../components/Common/Breadcrumb";
import {
    getCarDetail as onGetCarDetail,
    updateCar as onUpdateCar,
    deleteCar as onDeleteCar,
} from "../../../store/car/actions";

import {useHistory} from "react-router-dom";
import DeleteModal from "../../../components/Common/DeleteModal";
import API_URL from "../../../helpers/api_helper";

const CarUpdate = props => {

   document.title="Car Update | AutoPro";

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
      image: (car && car.image) || '',
      stock: (car && car.stock) || '',
      po: (car && car.po) || '',
    },
    validationSchema: Yup.object({
      description: Yup.string().required("Please Enter Description"),
      vin: Yup.string().required("Please Enter VIN Number Car"),
      model: Yup.string().required("Please Enter Model"),
      make: Yup.string().required("Please Enter Make"),
      stock: Yup.string().required("Please Enter Stock"),
      po: Yup.string().required("Please Enter PO Number"),
      image: Yup.string().required("Please Image Car"),
    }),
    onSubmit: (values) => {
        let data_form = new FormData();
        data_form.append("id", params.id);
        data_form.append("description", values.description || "null");
        data_form.append("vin", values.vin);
        data_form.append("model", values.model);
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

   const onClickDeleteCar = () => {
       const deleteCar = {
           "id": params.id
       }
       dispatch(onDeleteCar(deleteCar))
       history.push("/car-list/"+car.customer)
   };

   const [deleteModal, setDeleteModal] = useState(false);

   const onClickPrev = () => {
       history.push('/car-detail-info/'+params?.id)
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
                                                invalid={
                                                  validation.touched.model && validation.errors.model ? true : false
                                                }
                                              />
                                              {validation.touched.model && validation.errors.model ? (
                                                <FormFeedback type="invalid">{validation.errors.model}</FormFeedback>
                                              ) : null}
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
                                            htmlFor="stock"
                                            className="col-form-label col-lg-2"
                                            >Stock</Label>
                                            <Col lg="10">
                                              <Input
                                                name="stock"
                                                type="text"
                                                placeholder="Enter stock"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.stock || ""}
                                                invalid={
                                                  validation.touched.stock && validation.errors.stock ? true : false
                                                }
                                              />
                                              {validation.touched.stock && validation.errors.stock ? (
                                                <FormFeedback type="invalid">{validation.errors.stock}</FormFeedback>
                                              ) : null}
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
                                                invalid={
                                                  validation.touched.po && validation.errors.po ? true : false
                                                }
                                              />
                                              {validation.touched.po && validation.errors.po ? (
                                                <FormFeedback type="invalid">{validation.errors.po}</FormFeedback>
                                              ) : null}
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
                                      className="btn btn-info w-auto me-2"
                                      onClick={() => onClickPrev()}
                                    >
                                      <i className="fa fa-arrow-left" /> Prev
                                  </button>
                                  <button
                                      className="btn btn-success w-auto me-2"
                                    >
                                      <i className="fa fa-cloud-upload-alt" /> Update
                                  </button>
                              </div>
                            </div>
                        </Form>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
        </div>
    </React.Fragment>
  );
};

export default withRouter(CarUpdate);
