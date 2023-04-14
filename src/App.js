import PropTypes from 'prop-types';
import React from "react";

import { Switch, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";

// Import Routes all
import { authProtectedRoutes, publicRoutes } from "./routes";

// Import all middleware
import Authmiddleware from "./routes/route";

// layouts Format
import VerticalLayout from "./components/VerticalLayout/";
import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";
import "toastr/build/toastr.min.css";

// Import scss
import "./assets/scss/theme.scss";

const App = props => {

  function getLayout() {
    let layoutCls = VerticalLayout;
    switch (props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout;
        break;
      default:
        layoutCls = VerticalLayout;
        break;
    }
    return layoutCls;
  }

  function showToast() {
    const ele = document.getElementsByName("toastType");
    const position = document.getElementsByName("positions");
    let toastType;
    const title = document.getElementById("title").value;
    let message = "Have fun storming the castle!";

    if (document.getElementById("message").value !== "")
      message = document.getElementById("message").value;

    //Close Button
    const closeButton = document.getElementById("closeButton").checked;

    //Debug
    const debug = document.getElementById("debugInfo").checked;

    //Progressbar
    const progressBar = document.getElementById("progressBar").checked;

    //Duplicates
    const preventDuplicates = document.getElementById("preventDuplicates").checked;

    //Newest on Top
    const newestOnTop = document.getElementById("newestOnTop").checked;

    //position class
    let positionClass = "toast-top-right";

    //Fetch position
    for (let p = 0; p < position.length; p++) {
      if (position[p].checked) positionClass = position[p].value;
    }

    //Show Easing
    const showEasing = document.getElementById("showEasing").value;

    //Hide Easing
    const hideEasing = document.getElementById("hideEasing").value;

    //show method
    const showMethod = document.getElementById("showMethod").value;

    //Hide method
    const hideMethod = document.getElementById("hideMethod").value;

    //show duration
    const showDuration = document.getElementById("showDuration").value;

    //Hide duration
    const hideDuration = document.getElementById("hideDuration").value;

    //timeout
    const timeOut = document.getElementById("timeOut").value;

    //extended timeout
    const extendedTimeOut = document.getElementById("extendedTimeOut").value;

    //Fetch checked Type
    for (let i = 0; i < ele.length; i++) {
      if (ele[i].checked) toastType = ele[i].value;
    }

    toastr.options = {
      positionClass: positionClass,
      timeOut: timeOut,
      extendedTimeOut: extendedTimeOut,
      closeButton: closeButton,
      debug: debug,
      progressBar: progressBar,
      preventDuplicates: preventDuplicates,
      newestOnTop: newestOnTop,
      showEasing: showEasing,
      hideEasing: hideEasing,
      showMethod: showMethod,
      hideMethod: hideMethod,
      showDuration: showDuration,
      hideDuration: hideDuration
    };

    // setTimeout(() => toastr.success(`Settings updated `), 300)
    //Toaster Types
    if (toastType === "info") toastr.info(message, title);
    else if (toastType === "warning") toastr.warning(message, title);
    else if (toastType === "error") toastr.error(message, title);
    else toastr.success(message, title);
  }

  function clearToast() {
    toastr.clear();
  }

  const Layout = getLayout();
  return (
    <React.Fragment>
      <Router>
        <Switch>
          {publicRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
              exact
            />
          ))}

          {authProtectedRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={Layout}
              component={route.component}
              key={idx}
              isAuthProtected={true}
              exact
            />
          ))}
        </Switch>
      </Router>
    </React.Fragment>
  );
};

App.propTypes = {
  layout: PropTypes.any
};

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  };
};

export default connect(mapStateToProps, null)(App);
