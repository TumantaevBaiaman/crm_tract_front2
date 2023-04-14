import PropTypes from 'prop-types';
import React, { useState } from "react";
import {
  Nav,
  NavbarToggler,
  NavItem,
  NavLink,
  Container,
  Collapse,
} from "reactstrap";
import { Link } from "react-router-dom";
import ScrollspyNav from "./scrollSpy";
import { useHistory } from 'react-router-dom';

const navItems = [
  { id: 1, idnm: "home", navheading: "Home" },
  { id: 2, idnm: "about", navheading: "About" },
  { id: 3, idnm: "features", navheading: "Features" },
];

const Navbar_Page = props => {
  const [isOpenMenu, setisOpenMenu] = useState(false);
  const history = useHistory();

  let TargetId = navItems.map(item => {
    return item.idnm;
  });

  const onClickNext = () => {
    if (localStorage.getItem('status_user')==="employee"){
      history.push('/my-day')
    }
    else {
      history.push('/dashboard')
    }
  }

  return (
    <React.Fragment>
      <nav
        className={"navbar navbar-expand-lg navigation fixed-top sticky " + props.navClass}
      >
        <Container>
          <Link className="navbar-logo" to="/">
            {props.imglight !== true ? (
              // <img
              //   src={logodark}
              //   alt=""
              //   height="19"
              //   className="logo logo-dark"
              // />
                <h4>
                  AutoPRO
                </h4>
            ) : (
              // <img
              //   src={logolight}
              //   alt=""
              //   height="19"
              //   className="logo logo-light"
              // />
                <h4 className="text-white">
                  AutoPRO
                </h4>
            )}
          </Link>

          <NavbarToggler
            className="p-0"
            onClick={() => setisOpenMenu(!isOpenMenu)}
          >
            <i className="fa fa-fw fa-bars" />
          </NavbarToggler>

          <Collapse id="topnav-menu-content" isOpen={isOpenMenu} navbar>
            <ScrollspyNav
              scrollTargetIds={TargetId}
              scrollDuration="800"
              headerBackground="true"
              activeNavClass="active"
              className="navbar-collapse"
            >
              <Nav className="ms-auto navbar-nav" id="topnav-menu">
                {navItems.map((item, key) => (
                  <NavItem
                    key={key}
                    className={item.navheading === "Home" ? "active" : ""}
                  >
                    <NavLink href={"#" + item.idnm}> {item.navheading}</NavLink>
                  </NavItem>
                ))}
              </Nav>
            </ScrollspyNav>
            { localStorage.getItem("access_token") ?
              <div className="ms-lg-2">
                <button onClick={onClickNext} className="btn btn-outline-success w-xs">
                Account
                </button>
              </div> :
                <div className="flex-row">
                  <div className="ms-lg-2">
                    <Link to="/login" className="btn btn-outline-success w-xs">
                      Login
                    </Link>
                  </div>
                </div>
            }
            { localStorage.getItem("access_token") ?
              null :
                <div className="flex-row">
                  <div className="ms-lg-2">
                    <Link to="/register" className="btn btn-outline-success w-xs">
                      Sign up
                    </Link>
                  </div>
                </div>
            }
          </Collapse>
        </Container>
      </nav>
    </React.Fragment>
  );
};

Navbar_Page.propTypes = {
  imglight: PropTypes.any,
  navClass: PropTypes.string
};

export default Navbar_Page;
