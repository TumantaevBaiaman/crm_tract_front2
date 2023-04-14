import {
    ADD_CUSTOMER_DATA_SUCCESS,
    ADD_CUSTOMER_DATA_FAIL,
    GET_CUSTOMER_DATA_SUCCESS,
    GET_CUSTOMER_DATA_FAIL,
    GET_CUSTOMER_DETAIL_SUCCESS,
    GET_CUSTOMER_DETAIL_FAIL,
    UPDATE_CUSTOMER_DATA_SUCCESS,
    UPDATE_CUSTOMER_DATA_FAIL,
    DELETE_CUSTOMER_DATA_SUCCESS,
    DELETE_CUSTOMER_DATA_FAIL
} from "./actionTypes";

const INIT_STATE = {
  customers: [],
  customerProfile: {},
  customerDetail: {},
  error: {},
}

const customer = (state = INIT_STATE, action) => {
  switch (action.type) {

    case GET_CUSTOMER_DATA_SUCCESS:
      return {
        ...state,
        customers: action.payload,
      }

    case GET_CUSTOMER_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_CUSTOMER_DETAIL_SUCCESS:
      return {
        ...state,
        customerDetail: action.payload,
      }

    case GET_CUSTOMER_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_CUSTOMER_DATA_SUCCESS:
      return {
        ...state,
        customers: [...state.customers, action.payload],
      };

    case ADD_CUSTOMER_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_CUSTOMER_DATA_SUCCESS:
      return {
        ...state,
        customers: state.customers.map(customer =>
          customer.id.toString() === action.payload.id.toString()
            ? { customer, ...action.payload }
            : customer
        ),
      }

    case UPDATE_CUSTOMER_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_CUSTOMER_DATA_SUCCESS:
      return {
        ...state,
        customers: state.customers.filter(
          customer => customer.id.toString() !== action.payload.id.toString()
        ),
      };

    case DELETE_CUSTOMER_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default customer;