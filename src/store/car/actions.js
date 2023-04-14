import {
    ADD_NEW_CAR,
    ADD_CAR_SUCCESS,
    ADD_CAR_FAIL,
    GET_CARS,
    GET_CARS_SUCCESS,
    GET_CARS_FAIL,
    GET_CAR_DETAIL,
    GET_CAR_DETAIL_SUCCESS,
    GET_CAR_DETAIL_FAIL,
    UPDATE_CAR,
    UPDATE_CAR_SUCCESS,
    UPDATE_CAR_FAIL,
    DELETE_CAR,
    DELETE_CAR_SUCCESS,
    DELETE_CAR_FAIL,
    GET_ALL_CARS,
    GET_ALL_CARS_SUCCESS,
    GET_ALL_CARS_FAIL,
} from "./actionTypes";

export const getCars = data => ({
    type: GET_CARS,
    data,
});

export const getCarsSuccess = cars => ({
    type: GET_CARS_SUCCESS,
    payload: cars,
})

export const getCarsFail = error => ({
    type: GET_CARS_FAIL,
    payload: error,
});

export const addNewCar = (car, history) => ({
    type: ADD_NEW_CAR,
    payload: { car, history},
});

export const addCarSuccess = car => ({
    type: ADD_CAR_SUCCESS,
    payload: car,
});

export const addCarFail = error => ({
    type: ADD_CAR_FAIL,
    payload: error,
})

export const getCarDetail = carId => ({
    type: GET_CAR_DETAIL,
    carId,
})

export const getCarDetailSuccess = car => ({
    type: GET_CAR_DETAIL_SUCCESS,
    payload: car,
})

export const getCarDetailFail = error => ({
    type: GET_CAR_DETAIL_FAIL,
    payload: error,
})

export const updateCar = car => ({
  type: UPDATE_CAR,
  payload: car,
})

export const updateCarSuccess = car => ({
  type: UPDATE_CAR_SUCCESS,
  payload: car,
})

export const updateCarFail = error => ({
  type: UPDATE_CAR_FAIL,
  payload: error,
})

export const deleteCar = customer => ({
  type: DELETE_CAR,
  payload: customer,
})

export const deleteCarSuccess = customer => ({
  type: DELETE_CAR_SUCCESS,
  payload: customer,
})

export const deleteCarFail = error => ({
  type: DELETE_CAR_FAIL,
  payload: error,
})

export const getAllCars = data => ({
    type: GET_ALL_CARS,
    data,
});

export const getAllCarsSuccess = cars => ({
    type: GET_ALL_CARS_SUCCESS,
    payload: cars,
})

export const getAllCarsFail = error => ({
    type: GET_ALL_CARS_FAIL,
    payload: error,
});


