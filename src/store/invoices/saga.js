import { call, put, takeEvery } from "redux-saga/effects"

import {
  GET_INVOICES,
  GET_INVOICE_DETAIL,
  GET_INVOICE_CUSTOMER,
  INVOICE_EXPORT,
  UPDATE_STATUS,
  INVOICE_EXPORT_LIST,
  INVOICE_EXPORT_CSV,
  GET_MY_DAY,
  INVOICE_MY_DAY,
  INVOICE_SEND_LIST,
  INVOICE_SEND
} from "./actionTypes"

import {
  getInvoicesSuccess,
  getInvoicesFail,
  getInvoiceDetailSuccess,
  getInvoiceDetailFail,
  getInvoiceCustomerSuccess,
  getInvoiceCustomerFail,
  exportInvoiceSuccess,
  exportInvoiceFail,
  updateStatusSuccess,
  updateStatusFail,
  exportInvoiceListSuccess,
  exportInvoiceListFail,
  exportInvoiceCSVSuccess,
  exportInvoiceCSVFail,
  getMyDaySuccess,
  getMyDayFail,
  invoiceMyDaySuccess,
  invoiceMyDayFail,
  sendInvoiceSuccess,
  sendInvoiceFail,
  sendListInvoiceSuccess,
  sendListInvoiceFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getInvoices,
  getInvoiceDetail,
  getInvoicesCustomer,
  exportInvoice,
  statusUpdate,
  exportInvoiceList,
  exportCsv,
  myDay,
  getMyDay,
  sendInvoiceOne,
  sendInvoiceList,
} from "helpers/backend_helper"

function* fetchInvoices() {
  try {
    const response = yield call(getInvoices)
    yield put(getInvoicesSuccess(response['invoice']))
  } catch (error) {
    yield put(getInvoicesFail(error))
  }
}

function* fetchInvoiceDetail({ invoiceId }) {
  try {
    const response = yield call(getInvoiceDetail, invoiceId)
    yield put(getInvoiceDetailSuccess(response))
  } catch (error) {
    yield put(getInvoiceDetailFail(error))
  }
}

function* fetchInvoicesCustomer({ data}) {
  try{
    const response = yield call(getInvoicesCustomer, data)
    yield put(getInvoiceCustomerSuccess(response['invoices']))
  } catch (error){
    yield put(getInvoiceCustomerFail(error))
  }
}

function* exportInvoices({data}) {
  try {
    const response = yield call(exportInvoice, data)
    yield put(exportInvoiceSuccess(response))
  } catch (error) {
    yield put(exportInvoiceFail(error))
  }
}

function* exportInvoicesList({data}) {
  try {
    const response = yield call(exportInvoiceList, data)
    yield put(exportInvoiceListSuccess(response))
  } catch (error) {
    yield put(exportInvoiceListFail(error))
  }
}

function* exportInvoicesCSV({data}) {
  try {
    const response = yield call(exportCsv, data)
    yield put(exportInvoiceCSVSuccess(response))
  } catch (error) {
    yield put(exportInvoiceCSVFail(error))
  }
}

function* sendInvoices({data}) {
  try {
    const response = yield call(sendInvoiceOne, data)
    yield put(sendInvoiceSuccess(response))
  } catch (error) {
    yield put(sendInvoiceFail(error))
  }
}

function* sendListInvoices({data}) {
  try {
    const response = yield call(sendInvoiceList, data)
    yield put(sendListInvoiceSuccess(response))
  } catch (error) {
    yield put(sendListInvoiceFail(error))
  }
}

function* updateStatus({data}) {
  try {
    const response = yield call(statusUpdate, data)
    yield put(updateStatusSuccess(response))
  } catch (error) {
    yield put(updateStatusFail(error))
  }
}

function* fetchMyDay({ data}) {
  try{
    const response = yield call(myDay, data)
    yield put(getMyDaySuccess(response))
  } catch (error){
    yield put(getMyDayFail(error))
  }
}

function* fetchInvoicesMyDay({ data }) {
  try {
    const response = yield call(getMyDay, data)
    yield put(invoiceMyDaySuccess(response))
  } catch (error) {
    yield put(invoiceMyDayFail(error))
  }
}

function* invoiceSaga() {
  yield takeEvery(UPDATE_STATUS, updateStatus)
  yield takeEvery(GET_INVOICES, fetchInvoices)
  yield takeEvery(GET_INVOICE_DETAIL, fetchInvoiceDetail)
  yield takeEvery(GET_INVOICE_CUSTOMER, fetchInvoicesCustomer)
  yield takeEvery(INVOICE_EXPORT, exportInvoices)
  yield takeEvery(INVOICE_EXPORT_LIST, exportInvoicesList)
  yield takeEvery(INVOICE_EXPORT_CSV, exportInvoicesCSV)
  yield takeEvery(GET_MY_DAY, fetchMyDay)
  yield takeEvery(INVOICE_MY_DAY, fetchInvoicesMyDay)
  yield takeEvery(INVOICE_SEND, sendInvoices)
  yield takeEvery(INVOICE_SEND_LIST, sendListInvoices)
}

export default invoiceSaga
