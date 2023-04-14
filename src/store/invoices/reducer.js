import {
  GET_INVOICES_FAIL,
  GET_INVOICES_SUCCESS,
  GET_INVOICE_DETAIL_SUCCESS,
  GET_INVOICE_DETAIL_FAIL,
  GET_INVOICE_CUSTOMER_SUCCESS,
  GET_INVOICE_CUSTOMER_FAIL,
  INVOICE_EXPORT_SUCCESS,
  INVOICE_EXPORT_FAIL,
  UPDATE_STATUS_SUCCESS,
  UPDATE_STATUS_FAIL,
  INVOICE_EXPORT_LIST_SUCCESS,
  INVOICE_EXPORT_LIST_FAIL,
  INVOICE_EXPORT_CSV_SUCCESS,
  INVOICE_EXPORT_CSV_FAIL,
  GET_MY_DAY_SUCCESS,
  GET_MY_DAY_FAIL,
  INVOICE_MY_DAY_SUCCESS,
  INVOICE_MY_DAY_FAIL,
  INVOICE_SEND_SUCCESS,
  INVOICE_SEND_FAIL,
  INVOICE_SEND_LIST_SUCCESS,
  INVOICE_SEND_LIST_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  invoices: [],
  invoiceDetail: {},
  error: {},
  invoicesCustomer: [],
  myDay: {},
  invoicesMyDay: {}
}

const Invoices = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_INVOICES_SUCCESS:
      return {
        ...state,
        invoices: action.payload,
      }

    case GET_INVOICES_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case INVOICE_MY_DAY_SUCCESS:
      return {
        ...state,
        invoicesMyDay: action.payload,
      }

    case INVOICE_MY_DAY_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_MY_DAY_SUCCESS:
      return {
        ...state,
        myDay: action.payload,
      }

    case GET_MY_DAY_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_INVOICE_DETAIL_SUCCESS:
      return {
        ...state,
        invoiceDetail: action.payload,
      }

    case GET_INVOICE_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_INVOICE_CUSTOMER_SUCCESS:
      return {
        ...state,
        invoicesCustomer: action.payload,
      }

    case GET_INVOICE_CUSTOMER_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case INVOICE_EXPORT_SUCCESS:
      return {
        ...state,
      }

    case INVOICE_EXPORT_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case INVOICE_EXPORT_LIST_SUCCESS:
      return {
        ...state,
      }

    case INVOICE_EXPORT_LIST_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case INVOICE_EXPORT_CSV_SUCCESS:
      return {
        ...state,
      }

    case INVOICE_EXPORT_CSV_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case UPDATE_STATUS_SUCCESS:
      return {
        ...state,
      }

    case UPDATE_STATUS_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case INVOICE_SEND_SUCCESS:
      return {
        ...state,
      }

    case INVOICE_SEND_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case INVOICE_SEND_LIST_SUCCESS:
      return {
        ...state,
      }

    case INVOICE_SEND_LIST_FAIL:
      return {
        ...state,
        error: action.payload
      }

    default:
      return state
  }
}

export default Invoices
