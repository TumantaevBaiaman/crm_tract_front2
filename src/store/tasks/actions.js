import {
    GET_TASKS,
    GET_TASKS_FAIL,
    GET_TASKS_SUCCESS,
    ADD_NEW_TASKS,
    ADD_TASKS_FAIL,
    ADD_TASKS_SUCCESS,
    UPDATE_TASKS,
    UPDATE_TASKS_FAIL,
    UPDATE_TASKS_SUCCESS,
    DELETE_TASKS,
    DELETE_TASKS_FAIL,
    DELETE_TASKS_SUCCESS
} from "./actionTypes"

export const getTasks = invoiceId => ({
  type: GET_TASKS,
  invoiceId,
})

export const getTasksSuccess = tasks => ({
  type: GET_TASKS_SUCCESS,
  payload: tasks,
})

export const getTasksFail = error => ({
  type: GET_TASKS_FAIL,
  payload: error,
})

export const addNewTasks = (tasks, history) => ({
  type: ADD_NEW_TASKS,
  payload: { tasks, history },
})

export const addTasksSuccess = tasks => ({
  type: ADD_TASKS_SUCCESS,
  payload: tasks,
})

export const addTasksFail = error => ({
  type: ADD_TASKS_FAIL,
  payload: error,
})

export const updateTasks = (tasks, history) => ({
  type: UPDATE_TASKS,
  payload: { tasks, history },
})

export const updateTasksSuccess = tasks => ({
  type: UPDATE_TASKS_SUCCESS,
  payload: tasks,
})

export const updateTasksFail = error => ({
  type: UPDATE_TASKS_FAIL,
  payload: error,
})