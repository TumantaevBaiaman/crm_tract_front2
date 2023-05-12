import React from "react"

// Profile
import Profile from "../pages/Authentication/Profile";

// //Tasks
import TasksCreate from "../pages/Tasks/tasks-create"
import CreateTask from "../pages/Customers/CustomerData/task-create";
import DetailTask from "../pages/Customers/CustomerData/task-detail";

// //Ecommerce Pages
import EcommerceCustomers from "../pages/Ecommerce/EcommerceCustomers/index"
import CreateEmployee from "../pages/Ecommerce/EcommerceCustomers/create-employee";
import InvoiceDetailList from "../pages/Invoices/invoices-detail-list";

// Customers
import CustomersList from "../pages/Customers/CustomerData";
import CustomerUpdate from "../pages/Customers/CustomerData/customer-update";

//Invoices
import InvoicesList from "../pages/Invoices/invoices-list"
import InvoiceDetail from "../pages/Invoices/invoices-detail"
import MyDay from "../pages/Invoices/my-day";
import InvoiceCustomer from "../pages/Invoices/invoices-customer";


// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"

//  // Inner Authentication
import RegisterAccountNew from "../pages/Account/new-register";

// Dashboard
import Dashboard from "../pages/Dashboard/index"

//Pages
import PagesMaintenance from "../pages/Utility/pages-maintenance"
import PagesComingsoon from "../pages/Utility/pages-comingsoon"
import Pages404 from "../pages/Utility/pages-404"
import Pages500 from "../pages/Utility/pages-500"

//Reports
import Reports from "../pages/Reports/Reports";
import ReportOverview from "../pages/Reports/report-overview";
import ReportCrew from "../pages/Reports/report-crew";
import ReportCustomer from "../pages/Reports/report-customer";
import ReportTax from "../pages/Reports/report-tax";
import ReportOverviewDetail from "../pages/Reports/report-detail";

// Register
import RegisterAccount from "../pages/Account/Register";
import UpdateAccountAdmin from "../pages/Account/AccountUpdate";

//Car
import CreateCar from "../pages/Customers/CustomerData/car-create";
import ListCars from "../pages/Customers/CustomerData/car-list";
import CarDetail from "../pages/Customers/CustomerData/car-detail";
import ListAllCars from "../pages/Car/car-all";
import SidebarContentMobile from "../components/VerticalLayout/MobileSidebar";
//Customer
import CreateCustomer from "../pages/Customers/CustomerData/CreateCustomer";
import CustomerDetail from "../pages/Customers/CustomerData/customer-detail";
import ProfileUpdate from "../pages/Authentication/ProfileUpdate";

import LandingPage from "../pages/Lending/PageLanding";
import InvoicesListAll from "../pages/Invoices/invoices-all";
import ReportSubMenu from "../pages/SubMenu/report-sub-menu";
import ReportCrewMobile from "../pages/Mobile/report-crew";
import CarDetailInfo from "../pages/Customers/CustomerData/car-detail-info";
import WorkOrder from "../pages/Customers/CustomerData/work-orders";
import CarUpdate from "../pages/Customers/CustomerData/car-update";
import CustomerService from "../pages/Customers/CustomerData/customer-service";
import SettingSubMenu from "../pages/SubMenu/settings-sub-menu";
import MobileMenu from "../pages/Lending/MobileMenu";

let activ = false;
if (localStorage.getItem("status_user")==="admin"){
  activ = true
}

const authProtectedRoutes = [
  { path: "/my-day", component: MyDay },
  { path: "/mobile-menu", component: MobileMenu},
  { path: "/dashboard", component: Dashboard },

  //Car
  { path: "/car-create/:id?", component: CreateCar },
  { path: "/car-update/:id?", component: CarUpdate },
  { path: "/car-list/:id?", component: ListCars },
  { path: "/car-detail/:id?", component: CarDetail },
  { path: "/car-detail-info/:id?", component: CarDetailInfo },
  { path: "/car-all", component: ListAllCars },

  //Customer
  { path: "/customers", component: CustomersList },
  { path: "/customer-service", component: CustomerService },
  { path: "/create-customer", component: CreateCustomer },
  { path: "/customer-detail/:id?", component: CustomerDetail },
  { path: "/customer-update/:id?", component: CustomerUpdate },

  // Reports
  { path: "/reports", component: Reports },
  { path: "/report-overview", component: ReportOverview },
  { path: "/report-customer", component: ReportCustomer },
  { path: "/report-crew", component: ReportCrew },
  { path: "/report-tax", component: ReportTax },
  { path: "/report-overview-detail/:id", component: ReportOverviewDetail },

  // //profile
  { path: "/profile", component: Profile },
  { path: "/profile-update", component: ProfileUpdate },

  //Ecommerce
  { path: "/employee", component: EcommerceCustomers },
  { path: "/create-employee", component: CreateEmployee },

  //Invoices
  { path: "/invoices-list", component: InvoicesList },
  { path: "/invoices-list-all", component: InvoicesListAll },
  { path: "/invoices-detail/:id?", component: InvoiceDetail },
  { path: "/invoices-detail-list/:id?", component: InvoiceDetailList },
  { path: "/invoices-list/:id?", component: InvoiceCustomer },
  { path: "/work-order/:id?", component: WorkOrder },

  // Tasks
  { path: "/tasks-create", component: TasksCreate },
  { path: "/tasks-create/:id?", component: CreateTask },
  { path: "/tasks-detail/:id?", component: DetailTask },

  // register account
  {path: "/register/account", component: RegisterAccount},
  {path: "/update/account", component: UpdateAccountAdmin},

  // sub menu
  {path: "/reports-submenu", component: ReportSubMenu},
  {path: "/settings-submenu", component: SettingSubMenu},

  // mobile
  { path: "/report-crew-mobile", component: ReportCrewMobile },
  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  // { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const publicRoutes = [
  { path: "/", component: LandingPage },
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/register", component: Register },

  // multi-form-register
  { path: "/pages-404", component: Pages404 },
  { path: "/pages-500", component: Pages500 },

  // Authentication Inner
  { path: "/register-new-account", component: RegisterAccountNew }
]

export { authProtectedRoutes, publicRoutes }
