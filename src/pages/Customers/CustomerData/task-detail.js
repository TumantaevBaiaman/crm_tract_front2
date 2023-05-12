import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Input,
  Label,
  Button,
} from "reactstrap"

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

import "react-datepicker/dist/react-datepicker.css"

import {useDispatch, useSelector} from "react-redux";
import {
  updateTasks as onUpdateTasks,
  getTasks as onGetTasks
} from "../../../store/tasks/actions";
import {useHistory} from "react-router-dom";
import {getCarDetail as onGetCarDetail} from "../../../store/car/actions";
import {useMediaQuery} from "react-responsive";

const DetailTask = props => {

  document.title="Detail Task | Tract System";

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const dispatch = useDispatch();
  const history = useHistory();

  const [val, setVal] = useState(true)
  const { carDetail } = useSelector(state => ({
       carDetail: state.Cars.carDetail,
   }));

  const {
    match: { params },
  } = props;

  const [inputFields, setinputFields] = useState([])
  const [formData, setFormData] = useState({
    invoice_id: JSON.parse(localStorage.getItem("invoiceId")),
    car_id: params.id,
    update_tasks: [],
    new_tasks: [],
    del_tasks: []
  })

  const { tasks } = useSelector(state => ({
       tasks: state.tasks.tasks,
   }));

  const addWork = (idx, work) => {
    inputFields[idx]["work"] = work;
    setinputFields([...inputFields])
  }

  const addPayment = (idx, payment) => {
    inputFields[idx]["payment"] = payment;
    setinputFields([...inputFields])
  }

  function handleAddFields() {
    const item1 = { id: null, work: "", payment: 0 }
    setinputFields([...inputFields, item1])
  }

  function handleRemoveFields(idx, filed) {
    if (filed.id!==null){
      formData["del_tasks"].push(filed.id)
    }
    inputFields.splice(idx, 1)
    var new_data = [...inputFields];
    setinputFields(new_data);
  }

  const CreateTasks = () => {
    formData["car_id"] = params.id
    formData["invoice_id"] = JSON.parse(localStorage.getItem("invoiceId"))
    for (var i = 0; i<inputFields.length; i++){
      if (inputFields[i].id===null){
        formData["new_tasks"].push(inputFields[i])
      }else{
        formData["update_tasks"].push(inputFields[i])
      }
    }
    dispatch(onUpdateTasks(formData, history))
  }

  const onClickPrev = () => {
    history.push("/car-detail/"+params.id)
  };

  useEffect(() => {
        if (params && params.id) {
          dispatch(onGetCarDetail(params.id));
        } else {
          dispatch(onGetCarDetail(1)); //remove this after full integration
        }
      }, [params, onGetCarDetail]);

  useEffect(() => {
        if (JSON.parse(localStorage.getItem("invoiceId"))) {
          dispatch(onGetTasks(JSON.parse(localStorage.getItem("invoiceId"))));
        } else {
          dispatch(onGetTasks(1)); //remove this after full integration
        }
      }, [params, onGetTasks]);

   const car = carDetail;

   if (tasks.tasks && val){
     for(var i=0; i<tasks.tasks.length; i++){
       inputFields.push(tasks.tasks[i])
     }
     setVal(false)
   }

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Card className="border border-primary bg-opacity-100 bg-primary" onClick={onClickPrev}>
              <CardBody>
                  <div className="text-center font-size-20 w-100 text-white">
                    <strong><i className="bx bx-edit-alt me-1"/> {car?.make} {car?.model}</strong>
                  </div>
              </CardBody>
          </Card>
          <Row>
            <Col lg="12">
              <div data-repeater-list="outer-group" className="outer">
                <div data-repeater-item className="outer">
                  <div className="inner-repeater mb-4">
                    <div className="inner form-group mb-0 row">
                      <Label className="col-form-label col-lg-2">
                        Works
                      </Label>
                      <div
                        className="inner col-lg-10 ml-md-auto"
                        id="repeater"
                      >
                        {inputFields.map((field, key) => (
                          <div
                            key={key}
                            id={"nested" + key}
                            className="mb-3 align-items-center d-flex w-100"
                          >
                            <Col md="8" className="w-60">
                              <Input
                                type="text"
                                className="inner form-control input-mobile"
                                style={isMobile ? {width: "200px"} : null}
                                value={field.work}
                                onChange={(event => addWork(key, event.target.value))}
                                placeholder="Work"
                              />
                            </Col>
                            <Col md="2" className="w-60 ms-2">
                              <div className="mt-md-0">
                                <Input
                                  type="number"
                                  placeholder="$"
                                  className="form-control"
                                  onChange={(event => addPayment(key, event.target.value))}
                                  value={field.payment || ''}
                                />
                              </div>
                            </Col>
                            <Col md="2" className="w-60 ms-2">
                              <div className="mt-md-0 d-grid">
                                <Button
                                  color="danger"
                                  className="inner"
                                  onClick={() => {
                                    handleRemoveFields(key, field)
                                  }}
                                  block
                                >
                                  <i className="bx bx-x"/>
                                </Button>
                              </div>
                            </Col>
                          </div>
                        ))}
                      </div>
                    </div>
                    <br/>
                    <Row className="justify-content-end">
                      <Col lg="10">
                        <div className="float-end">
                          <Button
                            color="success"
                            className="inner me-2"
                            onClick={() => {
                              handleAddFields()
                            }}
                          >
                            Add
                          </Button>
                          <Button
                              color="primary"
                              className="me-2"
                              onClick={CreateTasks}
                            >
                              {/*<i className="fa fa-chevron-right" />*/}
                              Finish
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default DetailTask
