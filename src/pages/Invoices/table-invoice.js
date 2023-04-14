import React from "react"
import PropTypes from "prop-types"
import {
    Badge,
} from "reactstrap"

const TableInvoice = ({ item }) => {

  let status = '';
  if (item.status==='draft'){
    status = 'secondary';
  }else if (item.status==='cancel'){
    status = 'danger';
  }else if (item.status==='final'){
    status = 'success';
  }

  return (
    <React.Fragment>
        <Badge color={status} className="w-auto">
            {item.status}
        </Badge>
    </React.Fragment>
  )
}

TableInvoice.propTypes = {
  data: PropTypes.any,
}

export default TableInvoice
