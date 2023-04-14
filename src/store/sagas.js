import { all, fork } from "redux-saga/effects"

//public
import AccountSaga from "./auth/register/saga"
import AccountSaga2 from "./auth/register2/saga"
import Company from "./account/saga"
import AuthSaga from "./auth/login/saga"
import ForgetSaga from "./auth/forgetpwd/saga"
import ProfileSaga from "./auth/profile/saga"
import LayoutSaga from "./layout/saga"
import ecommerceSaga from "./e-commerce/saga"
import invoiceSaga from "./invoices/saga"
import tasksSaga from "./tasks/saga"
import dashboardSaga from "./dashboard/saga";
import customersSaga from "./customer/saga";
import carsSaga from "./car/saga";
import profileSaga from "./profile/saga";
import reportSaga from "./report/saga"

export default function* rootSaga() {
  yield all([
    //public
    fork(AccountSaga2),
    fork(AccountSaga),
    fork(Company),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(LayoutSaga),
    fork(ecommerceSaga),
    fork(invoiceSaga),
    fork(tasksSaga),
    fork(dashboardSaga),
    fork(customersSaga),
    fork(carsSaga),
    fork(profileSaga),
    fork(reportSaga)
  ])
}
