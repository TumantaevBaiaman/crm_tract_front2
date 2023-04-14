import React from 'react';
import { Link } from 'react-router-dom';

const CustId = (cell) => {
    return (
        <Link to="#" className="text-body fw-bold">{cell.value ? cell.value : ''}</Link>
    );
};

const LastName = (cell) => {
    return cell.value ? cell.value : '';
};

const FullName = (cell) => {
    return cell.value ? cell.value : '';
};

const PhoneEmail = (cell) => {
    return cell.value ? cell.value : '';
};

const Address = (cell) => {
    return cell.value ? cell.value : '';
};

const Rating = (cell) => {
    return (
        <span className="bg-success font-size-12 badge bg-success"><i className="mdi mdi-star me-1"></i>{cell.value}</span>
    )
};

const ID = (cell) => {
    return (
        cell.value ? cell.value : ''
    );
};

const JoiningDate = (cell) => {
    return cell.value ? cell.value : '';
};

export {
    CustId,
    LastName,
    PhoneEmail,
    FullName,
    Address,
    Rating,
    ID,
    JoiningDate,
};