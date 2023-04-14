import { call, put, takeEvery } from "redux-saga/effects"

import { ADD_NEW_CAR, GET_CARS, GET_CAR_DETAIL, UPDATE_CAR, DELETE_CAR, GET_ALL_CARS} from "./actionTypes";

import {
    addCarSuccess,
    addCarFail,
    getCarsSuccess,
    getCarsFail,
    getCarDetailSuccess,
    getCarDetailFail,
    updateCarSuccess,
    updateCarFail,
    deleteCarSuccess,
    deleteCarFail,
    getAllCarsSuccess,
    getAllCarsFail,
} from "./actions";

import {
    addNewCar,
    getCars,
    getCarDetail,
    updateCar,
    deleteCar,
    getAllCars,
} from "../../helpers/backend_helper";

function* onAddNewCar({payload: {car, history}}){
    try{
        const response = yield call(addNewCar, car)
        if ((response.status >= 200 && response.status <= 299) || response?.success===true){
            yield put(addCarSuccess(response))
            history.push('/tasks-create/'+response.car)
        }
    } catch (error){
        yield put(addCarFail(error))
    }
}

function* fetchCars({ data }) {
    try{
        const response = yield call(getCars, data)
        yield put(getCarsSuccess(response['cars']))
    } catch (error) {
        yield put(getCarsFail(error))
    }
}

function* fetchCarDetail({ carId }) {
    try{
        const response = yield call(getCarDetail, carId)
        yield put(getCarDetailSuccess(response.car))
    } catch (error) {
        yield put(getCarDetailFail(error))
    }
}

function* onUpdateCar({ payload: car }) {
  try {
    const response = yield call(updateCar, car);
    yield put(updateCarSuccess(response));
    if (response?.success === true){
        location.reload()
    }
  } catch (error) {
    yield put(updateCarFail(error));
  }
}

function* onDeleteCar({ payload: car }) {
  try {
    const response = yield call(deleteCar, car);
    yield put(deleteCarSuccess(response));
  } catch (error) {
    yield put(deleteCarFail(error));
  }
}

function* fetchAllCars({ data }) {
    try{
        const response = yield call(getAllCars, data)
        yield put(getAllCarsSuccess(response['car']))
    } catch (error) {
        yield put(getAllCarsFail(error))
    }
}

function* carsSaga() {
    yield takeEvery(ADD_NEW_CAR, onAddNewCar)
    yield takeEvery(GET_CARS, fetchCars)
    yield takeEvery(GET_CAR_DETAIL, fetchCarDetail)
    yield takeEvery(UPDATE_CAR, onUpdateCar)
    yield takeEvery(DELETE_CAR, onDeleteCar)
    yield takeEvery(GET_ALL_CARS, fetchAllCars)
}

export default carsSaga;