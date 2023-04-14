import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {
    Card,
    CardBody,
    Col,
    Container,
    Input,
    Row,
    Table,
    UncontrolledTooltip,
} from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import {useDispatch, useSelector} from "react-redux";
import {deleteCar as onDeleteCar, getCars as onGetCars} from "../../../store/car/actions";
import {useHistory} from "react-router-dom";
import DeleteModal from "../../../components/Common/DeleteModal";
import API_URL from "../../../helpers/api_helper";
import ModalIMG from "../../Car/modal-image";
import {useMediaQuery} from "react-responsive";
import AccordionContent from "../../../components/Accordion/Accordion";

const ListCars = props  => {

    document.title="List Cars | AutoPro";

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const dispatch = useDispatch();
    const history = useHistory();
    if (localStorage.getItem("invoiceId")){
        localStorage.removeItem("invoiceId");
      }

    const [searchValueVin, setSearchValueVin] = useState('')
    const [searchValueStock, setSearchValueStock] = useState('')
    const [searchValueModel, setSearchValueModel] = useState('')
    const [searchValueMake, setSearchValueMake] = useState('')
    const [imgInfo, setImgInfo] = useState('')
    const [deleteModal, setDeleteModal] = useState(false);
    const [imgModal, setImgModal] = useState(false);
    const [delCarId, setDelCarId] = useState(0)
    const { cars } = useSelector(state => ({
        cars: state.Cars.cars,
      }));

    const {
        match: { params },
      } = props;

    useEffect(() => {
        if (params && params.id) {
          dispatch(onGetCars(params.id));
        } else {
          dispatch(onGetCars(1));
        }
      }, [params, onGetCars]);

    const filterVinCar = cars.filter(car => {
        return car?.vin.toLowerCase().includes(searchValueVin.toLowerCase()) && car?.stock.toLowerCase().includes(searchValueStock.toLowerCase()) && car?.model.toLowerCase().includes(searchValueModel.toLowerCase()) && car?.make.toLowerCase().includes(searchValueMake.toLowerCase())
    })

    const onClickDeleteCar = () => {
       const deleteCar = {
           "id": delCarId
       }
       dispatch(onDeleteCar(deleteCar))
       history.push("/car-list/"+params.id)
       setDeleteModal(false);
   };

   const onClickDelete = (car_id) => {
       setDelCarId(car_id)
       setDeleteModal(true);
   };

   const onClickPrev = () => {
       history.goBack();
   };

   const onClickImg = (data) => {
       setImgInfo(data || "");
       setImgModal(true);
   }

   const onClickNext = (data) => {
      const url = ("/car-detail-info/"+data)
      history.push(url)
   }

    return (
      <>
        <React.Fragment>
            <DeleteModal
                show={deleteModal}
                onDeleteClick={onClickDeleteCar}
                onCloseClick={() => setDeleteModal(false)}
            />
            <ModalIMG
                show={imgModal}
                img_car={imgInfo}
                onCloseClick={() => setImgModal(false)}
            />
            <div className="page-content">
                    <Breadcrumbs title="Cars" breadcrumbItem="Car List" />
                    <Row>
                        <Col lg={12}>
                            <AccordionContent text="open">
                                <div className="position-relative search-box d-flex">
                                    <div className="input-group-text ms-1 me-1">
                                       <div className="me-4">
                                           Vin
                                       </div>
                                        <Input
                                            type="text"
                                            className="form-control text-sm-center"
                                            autoComplete="off"
                                            placeholder="Search VIN Number"
                                            onChange={(event) => setSearchValueVin(event.target.value)}
                                        />
                                    </div>
                                    <div className="input-group-text ms-1 me-1">
                                       <div className="me-4">
                                           Stock
                                       </div>
                                        <Input
                                            type="text"
                                            className="form-control text-sm-center"
                                            autoComplete="off"
                                            placeholder="Search Stock"
                                            onChange={(event) => setSearchValueStock(event.target.value)}
                                        />
                                    </div>
                                    <div className="input-group-text ms-1 me-1">
                                       <div className="me-4">
                                           Model
                                       </div>
                                        <Input
                                            type="text"
                                            className="form-control text-sm-center"
                                            autoComplete="off"
                                            placeholder="Search Model"
                                            onChange={(event) => setSearchValueModel(event.target.value)}
                                        />
                                    </div>
                                    <div className="input-group-text ms-1 me-1">
                                       <div className="me-4">
                                           Make
                                       </div>
                                        <Input
                                            type="text"
                                            className="form-control text-sm-center"
                                            autoComplete="off"
                                            placeholder="Search Make"
                                            onChange={(event) => setSearchValueMake(event.target.value)}
                                        />
                                    </div>
                                </div>
                            </AccordionContent>
                        </Col>
                        {isMobile ?
                            (
                                <div className="mt-4">
                                    {filterVinCar.map((item, key) => (
                                        <Card className="font-size-16" onClick={()=>onClickNext(item?.id)}>
                                            <CardBody style={{height: "35px", padding: "5px"}}>
                                                <div className="d-flex w-100 overflow-hidden">
                                                    <div style={{width: "95%", float: "left"}}>
                                                        <span className="w-90" style={{fontWeight: "500"}}>
                                                            {item?.model?.toUpperCase()} {item?.make?.toUpperCase()}
                                                        </span>
                                                        <span className="ms-2" style={{fontStyle: "oblique"}}>
                                                            (VIN: {item?.vin?.toUpperCase()})
                                                        </span>
                                                    </div>
                                                    <div style={{width: "5%", float: "right"}}>
                                                        <i className="bx bx-right-arrow-circle text-success font-size-18 align-middle me-2"/>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    ))}
                                </div>
                            )
                            :(
                            <Col lg="12">
                              <div className="">
                                <div className="table-responsive">
                                  <Table className="project-list-table table-nowrap align-middle table-borderless">
                                    <thead>
                                      <tr className="text-white bg-info">
                                        <th scope="col" style={{ width: "100px" }}>
                                          Image
                                        </th>
                                        <th scope="col" >Vin</th>
                                        <th scope="col" >Stock</th>
                                        <th scope="col">Model</th>
                                        <th scope="col">Make</th>
                                        <th scope="col" style={{ width: "100px" }}>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {filterVinCar.map((item, key) => (
                                        <tr key={key} onClick={()=>onClickNext(item.id)}>
                                          <td onClick={e =>e.stopPropagation()}><img src={API_URL+item.image} alt="" className="w-75 rounded" onClick={() => onClickImg(API_URL+item.image)}/></td>
                                          <td>
                                            <h5 className="text-truncate font-size-14">{item.vin}</h5>
                                          </td>
                                          <td>{item.stock}</td>
                                          <td>{item.model}</td>
                                          <td>{item.make}</td>
                                          <td onClick={e =>e.stopPropagation()}>
                                              <ul className="list-unstyled hstack gap-1 mb-0">

                                                <li>
                                                    <Link
                                                        to="#"
                                                        className="btn btn-sm btn-soft-danger"
                                                        onClick={() => {
                                                            const id = item?.id;
                                                            onClickDelete(id);
                                                        }}
                                                    >
                                                        <i className="mdi mdi-delete-outline font-size-14" id="deletetooltip" />
                                                        <UncontrolledTooltip placement="top" target="deletetooltip">
                                                            Delete
                                                        </UncontrolledTooltip>
                                                    </Link>
                                                </li>
                                                  {/*btn-sm*/}
                                                <li>
                                                    <Link
                                                        to={'/car-detail-info/'+item?.id}
                                                        className="btn btn-sm btn-soft-info"
                                                    >
                                                        <i className="mdi mdi-arrow-right-circle-outline font-size-14" id="edittooltip" />
                                                        <UncontrolledTooltip placement="top" target="edittooltip">
                                                            Next
                                                        </UncontrolledTooltip>
                                                    </Link>
                                                </li>

                                            </ul>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </Table>
                                </div>
                              </div>
                            </Col>
                            )}
                      </Row>
            </div>
        </React.Fragment>
      </>
    );
}

export default ListCars;