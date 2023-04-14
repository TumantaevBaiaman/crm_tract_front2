import { call, put, takeEvery } from "redux-saga/effects"

import {
    GET_DIAGRAM,
    GET_REPORT_CUSTOMER,
    GET_REPORT_CREW,
    GET_REPORT_TAX,
} from "./actionTypes";

import {
    getDiagramSuccess,
    getDiagramFail,
    getReportsCustomerSuccess,
    getReportsCustomerFail,
    getReportsCrewSuccess,
    getReportsCrewFail,
    getReportTaxSuccess,
    getReportTaxFail
} from "./actions";

import {
    customerRevenue,
    crewRevenue,
    diagramReports,
    getTax,
} from "../../helpers/backend_helper";

function* fetchDiagram({ data }){
    try {
        const response = yield call(diagramReports, data)
        yield put(getDiagramSuccess(response))
    } catch (error){
        yield put(getDiagramFail(error))
    }
}

function* fetchCrew({ data }){
    try {
        const response = yield call(crewRevenue, data)
        yield put(getReportsCrewSuccess(response))
    } catch (error){
        yield put(getReportsCrewFail(error))
    }
}

function* fetchCustomer({ data }){
    try {
        const response = yield call(customerRevenue, data)
        yield put(getReportsCustomerSuccess(response))
    } catch (error){
        yield put(getReportsCustomerFail(error))
    }
}

function* fetchTax({ data }){
    try {
        const response = yield call(getTax, data)
        yield put(getReportTaxSuccess(response))
    } catch (error){
        yield put(getReportTaxFail(error))
    }
}

function* reportSaga() {
    yield takeEvery(GET_DIAGRAM, fetchDiagram)
    yield takeEvery(GET_REPORT_CUSTOMER, fetchCustomer)
    yield takeEvery(GET_REPORT_CREW, fetchCrew)
    yield takeEvery(GET_REPORT_TAX, fetchTax)
}

export default reportSaga