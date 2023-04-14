import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_TASKS,
  ADD_NEW_TASKS,
  UPDATE_TASKS
} from "./actionTypes"
import {
  getTasksSuccess,
  getTasksFail,
  addTasksSuccess,
  addTasksFail,
  updateTasksSuccess,
  updateTasksFail
} from "./actions"

//Include Both Helper File with needed methods
import { getTasks, addTasks, updateTasks } from "helpers/backend_helper"
import toastr from "toastr";

function* fetchTasks({ invoiceId }) {
  try {
    const response = yield call(getTasks, invoiceId)
    yield put(getTasksSuccess(response))
  } catch (error) {
    yield put(getTasksFail(error))
  }
}

function* addNewTasks({ payload: { tasks, history }}) {
  try {
    const response = yield call(addTasks, tasks);
    yield put(addTasksSuccess(response));
    history.push('/invoices-detail/'+response.invoice.id)
    toastr.success("Create Invoice Success")
  } catch (error) {
    yield put(addTasksFail(error))
  }
}

function* updateTask({ payload: { tasks, history }}) {
  try {
    const response = yield call(updateTasks, tasks);
    yield put(updateTasksSuccess(response));
    history.push('/invoices-detail/'+response.invoice.id)
    toastr.success("Update Invoice Success")
  } catch (error) {
    yield put(updateTasksFail(error))
  }
}


function* tasksSaga() {
  yield takeEvery(GET_TASKS, fetchTasks)
  yield takeEvery(ADD_NEW_TASKS, addNewTasks)
  yield takeEvery(UPDATE_TASKS, updateTask)
}

export default tasksSaga
