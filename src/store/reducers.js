import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import Account2 from "./auth/register2/reducer"
import Company from "./account/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"

//Customers
import Customer from "./customer/reducer"

//Reports
import Report from "./report/reducer"

//E-commerce
import ecommerce from "./e-commerce/reducer"

//invoices
import invoices from "./invoices/reducer"

//tasks
import tasks from "./tasks/reducer"

//Dashboard 
import Dashboard from "./dashboard/reducer";

//Car
import Cars from "./car/reducer"

//Profile
import ProfileUser from "./profile/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  Account2,
  Company,
  ForgetPassword,
  Profile,
  ecommerce,
  invoices,
  tasks,
  Dashboard,
  Customer,
  Cars,
  ProfileUser,
  Report,
})

export default rootReducer
