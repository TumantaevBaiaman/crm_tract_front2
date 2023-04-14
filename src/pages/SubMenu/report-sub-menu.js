import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {Card} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";


const ReportSubMenu = ()  => {

    document.title="Sub Menu Report | AutoPro";

    const dispatch = useDispatch();
    const history = useHistory();

    return (
      <>
        <React.Fragment>
            <div className="page-content">
                <Breadcrumbs title="List" breadcrumbItem="Sub Menu Reports" goMenu={true}/>
                <div id="sidebar-menu">
                    <ul className="metismenu list-unstyled">
                        <Card>
                            <li>
                                <Link to="/report-crew-mobile" className="text-dark font-size-16 form-control">
                                    <i className="fa fa-fw fa-money-bill font-size-24 me-4 text-success" />
                                    <strong>{"Crew Revenue Report"}</strong>
                                </Link>
                            </li>
                        </Card>
                      </ul>
                </div>
            </div>
        </React.Fragment>
      </>
    );
}

export default ReportSubMenu;