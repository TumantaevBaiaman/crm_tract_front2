import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {Card} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";


const SettingSubMenu = ()  => {

    document.title="Sub Menu Report | AutoPro";

    const dispatch = useDispatch();
    const history = useHistory();

    let isAdmin = false;


  if (localStorage.getItem("status_user")){
    if(localStorage.getItem("status_user")==="admin"){
      isAdmin=true
    }
  }

    return (
      <>
        <React.Fragment>
            <div className="page-content">
                <Breadcrumbs title="List" breadcrumbItem="Sub Menu Settings" goMenu={true}/>
                <div id="sidebar-menu">
                    <ul className="metismenu list-unstyled">
                        <Card>
                            <li>
                                <Link to="/profile" className="text-dark font-size-16 form-control">
                                    <i className="fa fa-fw fa-cog font-size-24 me-4 text-primary" />
                                    <strong>{"Profile"}</strong>
                                </Link>
                            </li>
                        </Card>
                    </ul>
                    {
                        isAdmin &&
                        <ul className="metismenu list-unstyled">
                            <Card>
                                <li>
                                    <Link to="/employee" className="text-dark font-size-16 form-control">
                                        <i className="fa fa-fw fa-cog font-size-24 me-4 text-primary"/>
                                        <strong>{"Users"}</strong>
                                    </Link>
                                </li>
                            </Card>
                        </ul>
                    }
                    {
                        isAdmin &&
                        <ul className="metismenu list-unstyled">
                            <Card>
                                <li>
                                    <Link to="/register/account/" className="text-dark font-size-16 form-control">
                                        <i className="fa fa-fw fa-cog font-size-24 me-4 text-primary"/>
                                        <strong>{"Account"}</strong>
                                    </Link>
                                </li>
                            </Card>
                        </ul>
                    }
                </div>
            </div>
        </React.Fragment>
      </>
    );
}

export default SettingSubMenu;