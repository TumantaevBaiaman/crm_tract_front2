import {
    GET_DIAGRAM_SUCCESS,
    GET_DIAGRAM_FAIL,
    GET_REPORT_CREW_SUCCESS,
    GET_REPORT_CREW_FAIL,
    GET_REPORT_CUSTOMER_SUCCESS,
    GET_REPORT_CUSTOMER_FAIL,
    GET_REPORT_TAX_SUCCESS,
    GET_REPORT_TAX_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  crewData: {},
  customerData: {},
  error: {},
  diagramData: [],
  taxData: {},
}

const Report = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_DIAGRAM_SUCCESS:
            return {
                ...state,
                diagramData: action.payload,
            }
        case GET_DIAGRAM_FAIL:
            return {
                ...state,
                error: action.payload,
            }
        case GET_REPORT_CUSTOMER_SUCCESS:
            return {
                ...state,
                customerData: action.payload,
            }
        case GET_REPORT_CUSTOMER_FAIL:
            return {
                ...state,
                error: action.payload,
            }
        case GET_REPORT_CREW_SUCCESS:
            return {
                ...state,
                crewData: action.payload,
            }
        case GET_REPORT_CREW_FAIL:
            return {
                ...state,
                error: action.payload,
            }
        case GET_REPORT_TAX_SUCCESS:
            return {
                ...state,
                taxData: action.payload,
            }
        case GET_REPORT_TAX_FAIL:
            return {
                ...state,
                error: action.payload,
            }
        default:
            return state
    }
}

export default Report