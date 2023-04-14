import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";

import "../../../../../node_modules/swiper/swiper.scss";
import "../landing-main.css";

const AboutUs = () => {

  return (
    <React.Fragment>
      <section className="section pt-4 bg-white" id="about">
        <Container>
          <Row>
            <Col lg="12">
              <div className="text-center mb-5">
                <div className="small-title">About us</div>
                <h4>What is AutoPro?</h4>
              </div>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col lg="5">
              <div className="text-muted main-text">
                <h4>AutoPro CRM system</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                  voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                  non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p className="mb-4">

                </p>

              </div>
            </Col>

            <Col lg="6" className="ms-auto">
              <div className="mt-4 mt-lg-0">
                <Row>
                  <Col sm="6">
                    <Card className="border">
                      <CardBody className="with-icon-text">
                        <div className="mb-3">
                          <i className="mdi mdi-chart-arc h2 text-success" />
                        </div>
                        <h5>Static</h5>
                        <p className="text-muted mb-0">
                          Lorem ipsum dolor sit amet
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col sm="6">
                    <Card className="border mt-lg-5">
                      <CardBody className="with-icon-text">
                        <div className="mb-3">
                          <i className="mdi mdi-wallet h2 text-success" />
                        </div>
                        <h5>Wallet</h5>
                        <p className="text-muted mb-0">
                          Lorem ipsum dolor sit amet
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>

        </Container>
      </section>
    </React.Fragment>
  );
};

export default AboutUs;
