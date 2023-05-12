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
  addNewTasks as onAddTasks
} from "../../../store/tasks/actions";
import {useHistory} from "react-router-dom";
import {getCarDetail as onGetCarDetail} from "../../../store/car/actions";
import {useMediaQuery} from "react-responsive";

const CreateTask = props => {

  document.title="Create Task | AutoPro";

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const dispatch = useDispatch();
  const history = useHistory();

  const { carDetail } = useSelector(state => ({
       carDetail: state.Cars.carDetail,
   }));

  const {
    match: { params },
  } = props;

  const inpRow = [{ id: null, work: "", payment: 0 }]
  const [inputFields, setinputFields] = useState(inpRow)

  const addWork = (idx, work) => {
    inputFields[idx]["work"] = work;
    setinputFields([...inputFields]);
  }

  const addPayment = (idx, payment) => {
    inputFields[idx]["payment"] = payment;
    setinputFields([...inputFields]);
  }

  function handleAddFields() {
    const item1 = { id: null, work: "", payment: 0 }
    setinputFields([...inputFields, item1])
  }

  function handleRemoveFields(idx) {
    inputFields.splice(idx, 1)
    var new_data = [...inputFields];
    setinputFields(new_data);
    // document.getElementById("nested" + idx).style.display = "none"
  }

  const [formData, setFormData] = useState({
    account: localStorage.getItem("account_user"),
    car_id: params.id,
    update_tasks: [],
    new_tasks: [],
    del_tasks: []
  })

  const CreateTasks = () => {
    formData["new_tasks"] = inputFields
    dispatch(onAddTasks(formData, history))
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

  const car = carDetail;

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
                              <input
                                type="text"
                                className="inner form-control input-mobile"
                                style={isMobile ? {width: "200px"}: null}
                                value={field?.work}
                                onChange={(event => addWork(key, event.target.value))}
                                placeholder="Work"
                              />
                            </Col>
                            <Col md="2" className="w-20 ms-2">
                              <div className="mt-md-0">
                                <Input
                                  type="number"
                                  placeholder="$"
                                  className="form-control"
                                  onChange={(event => addPayment(key, event.target.value))}
                                  value={field?.payment}
                                />
                              </div>
                            </Col>
                            <Col md="2" className="w-20 ms-2">
                              <div className=" mt-md-0 d-grid">
                                <Button
                                  color="danger"
                                  className="inner"
                                  onClick={() => {
                                    handleRemoveFields(key)
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
                            Add Task
                          </Button>
                          <Button
                              color="primary"
                              className="me-2"
                              onClick={CreateTasks}
                            >
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

export default CreateTask