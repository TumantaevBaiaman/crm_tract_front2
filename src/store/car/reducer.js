import {
    ADD_CAR_SUCCESS,
    ADD_CAR_FAIL,
    GET_CARS_SUCCESS,
    GET_CARS_FAIL,
    GET_CAR_DETAIL_SUCCESS,
    GET_CAR_DETAIL_FAIL,
    UPDATE_CAR_SUCCESS,
    UPDATE_CAR_FAIL,
    DELETE_CAR_SUCCESS,
    DELETE_CAR_FAIL,
    GET_ALL_CARS_SUCCESS,
    GET_ALL_CARS_FAIL,
} from "./actionTypes";

const INIT_STATE = {
    cars: [],
    car: {},
    carDetail: {},
    error: {},
    carsAll : [],
}

const cars = (state= INIT_STATE, action) =>{
    switch (action.type){
        case ADD_CAR_SUCCESS:
            return {
                ...state,
                car: action.payload,
            }

        case ADD_CAR_FAIL:
            return {
                ...state,
                error: action.payload,
            }

        case GET_CARS_SUCCESS:
            return {
                ...state,
                cars: action.payload,
            }

        case GET_CARS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case GET_CAR_DETAIL_SUCCESS:
            return {
                ...state,
                carDetail: action.payload,
            }

        case GET_CAR_DETAIL_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case UPDATE_CAR_SUCCESS:
          return {
            ...state,
            cars: state.cars.map(car =>
              car.id.toString() === action.payload.id.toString()
                ? { car, ...action.payload }
                : car
            ),
          }

        case UPDATE_CAR_FAIL:
          return {
            ...state,
            error: action.payload,
          };

        case DELETE_CAR_SUCCESS:
          return {
            ...state,
            cars: state.cars.filter(
              car => car.id.toString() !== action.payload.id.toString()
            ),
          };

        case DELETE_CAR_FAIL:
          return {
            ...state,
            error: action.payload,
          };

        case GET_ALL_CARS_SUCCESS:
            return {
                ...state,
                carsAll: action.payload,
            }

        case GET_ALL_CARS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        default:
            return state
    }
}

export default cars