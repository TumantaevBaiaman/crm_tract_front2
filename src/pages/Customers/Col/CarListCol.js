import React from 'react';
import { Badge } from 'reactstrap';
import { Link } from 'react-router-dom';

const CarNo = (cell) => {
    return <Link to="#" className="text-body fw-bold">{cell.value ? cell.value : ''}</Link>
};

const CarDescription = (cell) => {
    return cell.value ? cell.value : "";
};

const CarVin = (cell) => {
    return cell.value ? cell.value : "";
};

const CarModel = (cell) => {
    return cell.value ? cell.value : "";
};

const CreateDate = (cell) => {
    return cell.value ? cell.value : "";
};


export { CarNo, CarDescription, CarVin, CarModel, CreateDate};