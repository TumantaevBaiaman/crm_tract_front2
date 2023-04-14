import {
  // get invoices
  GET_INVOICES,
  GET_INVOICES_FAIL,
  GET_INVOICES_SUCCESS,
  // detail invoice
  GET_INVOICE_DETAIL,
  GET_INVOICE_DETAIL_FAIL,
  GET_INVOICE_DETAIL_SUCCESS,
  // get invoices customer
  GET_INVOICE_CUSTOMER,
  GET_INVOICE_CUSTOMER_FAIL,
  GET_INVOICE_CUSTOMER_SUCCESS,
  // export
  INVOICE_EXPORT,
  INVOICE_EXPORT_FAIL,
  INVOICE_EXPORT_SUCCESS,
  // update status
  UPDATE_STATUS,
  UPDATE_STATUS_FAIL,
  UPDATE_STATUS_SUCCESS,
  // export list
  INVOICE_EXPORT_LIST,
  INVOICE_EXPORT_LIST_FAIL,
  INVOICE_EXPORT_LIST_SUCCESS,
  // export csv
  INVOICE_EXPORT_CSV,
  INVOICE_EXPORT_CSV_FAIL,
  INVOICE_EXPORT_CSV_SUCCESS,
  // my day
  GET_MY_DAY,
  GET_MY_DAY_FAIL,
  GET_MY_DAY_SUCCESS,
  // invoice my day
  INVOICE_MY_DAY,
  INVOICE_MY_DAY_FAIL,
  INVOICE_MY_DAY_SUCCESS,
  // send
  INVOICE_SEND,
  INVOICE_SEND_FAIL,
  INVOICE_SEND_SUCCESS,
  //send list
  INVOICE_SEND_LIST,
  INVOICE_SEND_LIST_FAIL,
  INVOICE_SEND_LIST_SUCCESS
} from "./actionTypes"

export const getInvoices = () => ({
  type: GET_INVOICES,
})

export const getInvoicesSuccess = invoices => ({
  type: GET_INVOICES_SUCCESS,
  payload: invoices,
})

export const getInvoicesFail = error => ({
  type: GET_INVOICES_FAIL,
  payload: error,
})

export const getInvoiceDetail = invoiceId => ({
  type: GET_INVOICE_DETAIL,
  invoiceId,
})

export const getInvoiceDetailSuccess = invoices => ({
  type: GET_INVOICE_DETAIL_SUCCESS,
  payload: invoices,
})

export const getInvoiceDetailFail = error => ({
  type: GET_INVOICE_DETAIL_FAIL,
  payload: error,
})

export const getInvoiceCustomer = data => ({
  type: GET_INVOICE_CUSTOMER,
  data,
})

export const getInvoiceCustomerSuccess = invoices => ({
  type: GET_INVOICE_CUSTOMER_SUCCESS,
  payload: invoices,
})

export const getInvoiceCustomerFail = error => ({
  type: GET_INVOICE_CUSTOMER_FAIL,
  error
})

export const exportInvoice = data => ({
  type: INVOICE_EXPORT,
  data,
})

export const exportInvoiceSuccess = data => ({
  type: INVOICE_EXPORT_SUCCESS,
  payload: data,
})

export const exportInvoiceFail = error => ({
  type: INVOICE_EXPORT_FAIL,
  error,
})

export const updateStatus = data => ({
  type: UPDATE_STATUS,
  data,
})

export const updateStatusSuccess = data => ({
  type: UPDATE_STATUS_SUCCESS,
  payload: data,
})

export const updateStatusFail = error => ({
  type: UPDATE_STATUS_FAIL,
  error,
})

export const exportInvoiceList = data => ({
  type: INVOICE_EXPORT_LIST,
  data,
})

export const exportInvoiceListSuccess = data => ({
  type: INVOICE_EXPORT_LIST_SUCCESS,
  payload: data,
})

export const exportInvoiceListFail = error => ({
  type: INVOICE_EXPORT_LIST_FAIL,
  error,
})

export const exportInvoiceCSV = data => ({
  type: INVOICE_EXPORT_CSV,
  data,
})

export const exportInvoiceCSVSuccess = data => ({
  type: INVOICE_EXPORT_CSV_SUCCESS,
  payload: data,
})

export const exportInvoiceCSVFail = error => ({
  type: INVOICE_EXPORT_CSV_FAIL,
  error,
})

export const getMyDay = data => ({
  type: GET_MY_DAY,
  data,
})

export const getMyDaySuccess = invoices => ({
  type: GET_MY_DAY_SUCCESS,
  payload: invoices,
})

export const getMyDayFail = error => ({
  type: GET_MY_DAY_FAIL,
  error
})

export const invoiceMyDay = data => ({
  type: INVOICE_MY_DAY,
  data,
})

export const invoiceMyDaySuccess = invoices => ({
  type: INVOICE_MY_DAY_SUCCESS,
  payload: invoices,
})

export const invoiceMyDayFail = error => ({
  type: INVOICE_MY_DAY_FAIL,
  error
})

export const sendInvoice = data => ({
  type: INVOICE_SEND,
  data,
})

export const sendInvoiceSuccess = data => ({
  type: INVOICE_SEND_SUCCESS,
  payload: data,
})

export const sendInvoiceFail = error => ({
  type: INVOICE_SEND_FAIL,
  error,
})

export const sendListInvoice = data => ({
  type: INVOICE_SEND_LIST,
  data,
})

export const sendListInvoiceSuccess = data => ({
  type: INVOICE_SEND_LIST_SUCCESS,
  payload: data,
})

export const sendListInvoiceFail = error => ({
  type: INVOICE_SEND_LIST_FAIL,
  error,
})