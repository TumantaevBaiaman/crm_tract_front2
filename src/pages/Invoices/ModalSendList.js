import PropTypes from 'prop-types'
import React, {useState} from "react"
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  Modal,
  ModalBody,
  Row,
  UncontrolledDropdown
} from "reactstrap"
import DatePicker from "react-datepicker";

const ModalSendList = ({ show, onClickTrue, onClickFalse, dateStart, dateEnd, dateStartMonth, dateEndMonth ,onCloseClick, email, setEmail, update, preview, startEmail, oneEmail, modalSave }) => {

  const [data, setData] = useState(true)
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [dateData, setDateData] = useState("Range Date")

  const onChangeRangeMonth = (data) => {
      console.log(data)
      setSelectedMonth(data)
      const currentDate = new Date(data);
      const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
      const monthDate = currentDate.getMonth()+1
      const yearDate = currentDate.getFullYear()
      let month_f = ''
      if (monthDate<10)  {  month_f ="0"+monthDate.toString()} else {  month_f =monthDate.toString()}
      console.log(month_f, monthDate, yearDate)
      dateStartMonth(yearDate+"-"+month_f+"-"+"01")
      dateEndMonth(yearDate+"-"+month_f+"-"+lastDayOfMonth)
  }

  const onClickSend = () => {
    oneEmail()
    if (startEmail !== email){
        modalSave()
    }else{
        onClickFalse()
    }
  }

  const color_btn = () => {
      if (localStorage.getItem("account_status")==="1"){
          return " btn-success"
      }
      else {
          return " bg-status-account-btn"
      }
  }

  return (
    <Modal size="lg" isOpen={show} toggle={onCloseClick} centered={true}>
      <div className="modal-content">
        <ModalBody className="px-4 py-5 text-center">
          <button type="button" onClick={onCloseClick} className="btn-close position-absolute end-0 top-0 m-3"></button>
          <div className="avatar-sm mb-2 mx-auto">
            <div className="avatar-title bg-primary text-primary bg-opacity-10 font-size-24 rounded-3">
              <i className="mdi mdi-email-send-outline"/>
            </div>
          </div>
          <p className="text-muted font-size-16 mb-4">Are you sure you would like to email the customer an invoice?</p>
          <div className="hstack gap-2 justify-content-start mb-0">
              <UncontrolledDropdown>
                <DropdownToggle tag="a" to="#" className="card-drop w-md font-size-12" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className={"bx bx-filter btn w-lg me-4"+color_btn()}> <strong className="ms-2">{dateData}</strong> </i>
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem
                        className="btn btn-soft-primary w-lg font-size-12"
                        onClick={() => setDateData("Range Date")}
                    >
                        <i className="bx bx-calendar align-middle me-2"/>
                        Range Date
                    </DropdownItem>
                    <DropdownItem
                        className="btn btn-soft-primary w-lg font-size-12"
                        onClick={() => setDateData("Month")}
                    >
                        <i className="bx bx-calendar align-middle me-2"/>
                        Month
                    </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
          </div>

          <div className="mt-2">
            <div className="search-box">
              <div className="">
                {dateData==="Range Date" ? (
                    <Row>
                      <Col>
                          <div className="input-group-text">
                              <span className="">startDate</span>
                          <Input
                              type="date"
                              className="form-control"
                              autoComplete="off"
                              onChange={dateStart}
                          />
                          </div>
                      </Col>
                      <Col>
                        <div className="input-group-text">
                          <span className="">endDate</span>
                          <Input
                              type="date"
                              className="form-control"
                              autoComplete="off"
                              onChange={dateEnd}
                          />
                        </div>
                      </Col>
                    </Row>
                ):(
                    <div className="">
                      <DatePicker
                        id="month-picker"
                        dateFormat="MM/yyyy"
                        className="form-control"
                        showMonthYearPicker
                        selected={selectedMonth}
                        onChange={onChangeRangeMonth}
                      />
                    </div>
                )}
                </div>
            </div>
          </div>
          <div className="control-group mt-2">
            <div className="controls">
              <div className="mb-3">
                <input
                  id="showEasing"
                  type="text"
                  placeholder="email"
                  className="input-mini form-control"
                  value={email}
                  onChange={setEmail}
                />
              </div>
            </div>
          </div>
          <div className="hstack gap-2 justify-content-center mb-0">
            <button type="button" className="btn btn-info" onClick={preview}>Preview</button>
            <button type="button" className="btn btn-success" onClick={onClickSend}>Send</button>
            <button type="button" className="btn btn-danger" onClick={onCloseClick}>Cancel</button>
          </div>
        </ModalBody>
      </div>
    </Modal>
  )
}

ModalSendList.propTypes = {
  onCloseClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  show: PropTypes.any
}

export default ModalSendList