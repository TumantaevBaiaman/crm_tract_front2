import React, {useState} from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import {
    UncontrolledTooltip
} from "reactstrap"
import {deleteCustomerData as onDeleteCustomer} from "../../../store/customer/actions";
import {useDispatch} from "react-redux";
import DeleteModal from "../../../components/Common/DeleteModal";

const ListCustomers = ({ item, history }) => {

  const dispatch = useDispatch();
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (customer) => {
    setDeleteModal(true);
  };

  const handleDeleteCustomer = () => {
    if (item.id) {
      dispatch(onDeleteCustomer(item));
      setDeleteModal(false);
      location.reload()
    }
  };

  const onClickNext = () =>{
      history.push("/customer-detail/"+item.id)
  }
  return (
    <React.Fragment>
        <DeleteModal
            show={deleteModal}
            onDeleteClick={handleDeleteCustomer}
            onCloseClick={() => setDeleteModal(false)}
        />
      <tr onClick={onClickNext}>
        <td>{item.id}</td>
        <td>
            {item.full_name}
        </td>
        <td>
          {item?.email}
        </td>
        <td>{item?.street1}</td>
        <td>{item?.country}</td>
        <td>{item?.street2}</td>
        <td>{item?.postal_code}</td>
        <td>{item?.phone}</td>
        <td>{item?.phone1}</td>
        <td onClick={e => e.stopPropagation()}>
            <ul className="list-unstyled hstack gap-1 mb-0">

              <li>
                <Link
                    to="#"
                    className="btn btn-sm btn-soft-danger"
                    onClick={() => {
                        onClickDelete();
                    }}
                >
                    <i className="mdi mdi-delete-outline font-size-14" id="deletetooltip" />
                    <UncontrolledTooltip placement="top" target="deletetooltip">
                        Delete
                    </UncontrolledTooltip>
                </Link>
            </li>

              <li>
                  <Link
                      to={"/customer-detail/" + item.id}
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

ListCustomers.propTypes = {
  data: PropTypes.any,
}

export default ListCustomers
