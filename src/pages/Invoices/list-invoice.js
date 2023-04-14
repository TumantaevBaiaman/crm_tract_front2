import React, {useState} from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import {
    Badge,
    Card,
    CardBody,
    CardHeader,
    CardText,
    CardTitle,
    Col, DropdownItem, DropdownMenu, DropdownToggle,
    Row, Table,
    UncontrolledDropdown,
    UncontrolledTooltip
} from "reactstrap"
import images from "assets/images"
import API_URL from "../../helpers/api_helper";
import wechat from "../../assets/images/companies/wechat.svg";
import TableInvoice from "./table-invoice";
import ModalIMG from "../Car/modal-image";

const ListInvoices = ({ item, history }) => {
  const [imgModal, setImgModal] = useState(false);
  const [imgInfo, setImgInfo] = useState('')
  const onClickImg = (data) => {
       setImgInfo(data || "");
       setImgModal(true);
   }

  const onClickNext = () =>{
      history.push("/invoices-detail/"+item.id)
  }
  return (
    <React.Fragment>
      <ModalIMG
            show={imgModal}
            img_car={imgInfo}
            onCloseClick={() => setImgModal(false)}
        />
      <tr onClick={onClickNext}>
        <td onClick={e =>e.stopPropagation()}><img src={API_URL+item?.car_id?.image} alt="" className="w-75 rounded" onClick={() => onClickImg(API_URL+item?.car_id?.image)} /></td>
        <td>{item?.number}</td>
        <td>
          {<TableInvoice item={item} />}
        </td>
        <td>
          {item?.crew_id?.lastname + ' ' + item?.crew_id?.username}
        </td>
        <td>
            {item?.customer_id?.full_name}
        </td>
        <td>$ {Math.floor(item?.total_sum*100)/100 || 0}</td>
        <td>{item?.finished_at.substr(0,10)}</td>
        <td onClick={e => e.stopPropagation()}>
            <ul className="list-unstyled hstack gap-1 mb-0">

              <li>
                  <Link
                      to={"/invoices-detail/" + item?.id}
                      className="btn btn-sm btn-soft-primary"
                  >
                      View <i className="mdi mdi-arrow-right-bold" id="deletetooltip" />
                      <UncontrolledTooltip placement="top" target="deletetooltip">
                          View
                      </UncontrolledTooltip>
                  </Link>
              </li>
          </ul>
        </td>
      </tr>
    </React.Fragment>
  )
}

ListInvoices.propTypes = {
  data: PropTypes.any,
}

export default ListInvoices
