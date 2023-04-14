export const GET_DEMO_DATA = "http://127.0.0.1:8000";

//REGISTER
export const POST_REGISTER = "/apps/users/register/user/";
export const POST_REGISTER_NEW = "/apps/users/register/profile/";

//LOGIN
export const POST_FAKE_LOGIN = "/apps/users/login/";
export const POST_JWT_LOGIN = "/apps/users/login/";
export const POST_FAKE_PASSWORD_FORGET = "/fake-forget-pwd";
export const POST_FAKE_JWT_PASSWORD_FORGET = "/jwt-forget-pwd";
export const SOCIAL_LOGIN = "/social-login";
export const POST_JWT_REFRESH = "/apps/users/refresh/";


// STATUS
export const GET_STATUS = "/apps/users/status_list/"

//EMPLOYEE
export const GET_CUSTOMERS = "/apps/users/user_list/";
export const ADD_NEW_CUSTOMER = "/apps/users/register/user/";
export const UPDATE_CUSTOMER = "/update/customer";
export const DELETE_CUSTOMER = "/delete/customer";

//CUSTOMER
export const GET_CUSTOMER_DATA = "/apps/customers/empl-customers/";
export const ADD_NEW_CUSTOMER_DATA = "/apps/customers/";
export const UPDATE_CUSTOMER_DATA = "/apps/customers/update-customers/";
export const DELETE_CUSTOMER_DATA = "/apps/customers/delete-customers/";
export const GET_CUSTOMER_DETAIL = "/apps/customers/empl-customers/";

// CAR
export const ADD_NEW_CAR = "/apps/cars/";
export const GET_CARS = "/apps/customers/empl-customers/";
export const GET_CAR_DETAIL = "/apps/cars/empl-car/"
export const UPDATE_CAR = "/apps/cars/update-car/";
export const DELETE_CAR = "/apps/cars/delete-car/";
export const GET_ALL_CARS = "/apps/cars/empl-car/";

// PROFILE
export const GET_PROFILE = "/apps/users/profile/";
export const UPDATE_PROFILE = "/apps/users/profile/";

//INVOICES
export const GET_INVOICES = "/apps/invoices/";
export const GET_INVOICE_DETAIL = "/apps/invoices/";
export const GET_INVOICES_CUSTOMER = "/apps/customers/empl-customers/";
export const EXPORT_INVOICE = "/apps/invoices/export/";
export const EXPORT_INVOICE_LIST = "/apps/invoices/export-list/";
export const SEND_INVOICE = "/apps/invoices/export/";
export const SEND_INVOICE_LIST = "/apps/invoices/export-list/";
export const EXPORT_CSV = "/apps/invoices/export-csv/"
export const UPDATE_STATUS = "/apps/invoices/update/";
export const GET_MY_DAY = "/apps/invoices/my-day/";

// Reports
export const MY_DAY = "/apps/invoices/export-filter/";
export const CREW_REVENUE = "/apps/invoices/export-report-crew/"
export const CUSTOMER_REVENUE = "/apps/invoices/export-report-customer/"
export const REPORTS_DIAGRAM = "/apps/invoices/statistics/"
export const GET_TAX = "/apps/invoices/tax/";

//TASKS
export const GET_TASKS = "/apps/tasks/get-tasks/";
export const ADD_TASKS = "/apps/tasks/"
export const UPDATE_TASKS = "/apps/tasks/"

// ACCOUNT
export const ADD_NEW_ACCOUNT = "/apps/users/register/account/";
export const UPDATE_ACCOUNT = "/apps/account/account-update/";

//dashboard charts data
export const GET_WEEKLY_DATA = "/weekly-data";
export const GET_YEARLY_DATA = "/yearly-data";
export const GET_MONTHLY_DATA = "/monthly-data";
