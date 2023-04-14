import {
  GET_CUSTOMERS_FAIL,
  GET_CUSTOMERS_SUCCESS,
  ADD_NEW_CUSTOMER,
  ADD_CUSTOMER_SUCCESS,
  ADD_CUSTOMER_FAIL,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAIL,
  GET_STATUS,
  GET_STATUS_SUCCESS,
  GET_STATUS_FAIL,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  products: [],
  product: {},
  orders: [],
  cartData: {},
  customers: [],
  status: [],
  shops: [],
  error: {},
  productComments: [],
  loading: false,
};

const Ecommerce = (state = INIT_STATE, action) => {
  switch (action.type) {

    case ADD_NEW_CUSTOMER:
      return {
        ...state,
        loading: true,
      };

    case GET_STATUS:
      return {
        ...state,
        error: action.payload,
      };

    case GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customers: action.payload,
      };

    case GET_STATUS_SUCCESS:
      return {
        ...state,
        status: action.payload,
      };

    case GET_CUSTOMERS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        customers: [...state.customers, action.payload],
      };

    case ADD_CUSTOMER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: state.customers.map(customer =>
          customer.id.toString() === action.payload.id.toString()
            ? { customer, ...action.payload }
            : customer
        ),
      };

    case UPDATE_CUSTOMER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: state.customers.filter(
          customer => customer.id.toString() !== action.payload.id.toString()
        ),
      };

    case DELETE_CUSTOMER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default Ecommerce;
