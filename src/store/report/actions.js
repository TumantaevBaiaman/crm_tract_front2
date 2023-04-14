import {
    GET_REPORT_CREW,
    GET_REPORT_CREW_FAIL,
    GET_REPORT_CREW_SUCCESS,

    GET_REPORT_CUSTOMER,
    GET_REPORT_CUSTOMER_FAIL,
    GET_REPORT_CUSTOMER_SUCCESS,

    GET_REPORT_TAX,
    GET_REPORT_TAX_FAIL,
    GET_REPORT_TAX_SUCCESS,

    GET_REPORT_OVERVIEW,
    GET_REPORT_OVERVIEW_FAIL,
    GET_REPORT_OVERVIEW_SUCCESS,

    GET_DIAGRAM,
    GET_DIAGRAM_SUCCESS,
    GET_DIAGRAM_FAIL
} from "./actionTypes";

export const getReportsCrew = data => ({
    type: GET_REPORT_CREW,
    data
})

export const getReportsCrewSuccess = data => ({
    type: GET_REPORT_CREW_SUCCESS,
    payload: data
})

export const getReportsCrewFail = error => ({
    type: GET_REPORT_CREW_FAIL,
    error
})

export const getReportsCustomer = data => ({
    type: GET_REPORT_CUSTOMER,
    data
})

export const getReportsCustomerSuccess = data => ({
    type: GET_REPORT_CUSTOMER_SUCCESS,
    payload: data
})

export const getReportsCustomerFail = error => ({
    type: GET_REPORT_CUSTOMER_FAIL,
    error
})

export const getDiagram = data => ({
    type: GET_DIAGRAM,
    data
})

export const getDiagramSuccess = data => ({
    type: GET_DIAGRAM_SUCCESS,
    payload: data
})

export const getDiagramFail = error => ({
    type: GET_DIAGRAM_FAIL,
    error
})

export const getReportTax = data => ({
    type: GET_REPORT_TAX,
    data
})

export const getReportTaxSuccess = data => ({
    type: GET_REPORT_TAX_SUCCESS,
    payload: data
})

export const getReportTaxFail = error => ({
    type: GET_REPORT_TAX_FAIL,
    error
})


