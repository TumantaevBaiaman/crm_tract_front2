import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";

//Import Countdown
import Countdown from "react-countdown";

const Section = () => {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <span>You are good to go!</span>;
    } else {
      return (
        <>
          <div className="counter-number ico-countdown">
            <div id="days" className="coming-box">
              {days}
              <span>Days</span>
            </div>
            <div id="hours" className="coming-box">
              {hours}
              <span>Hours</span>
            </div>
            <div id="mins" className="coming-box">
              {minutes}
              <span>Hours</span>
            </div>
            <div id="secs" className="coming-box">
              {seconds}
              <span>Seconds</span>
            </div>
            <div id="end" className="h1"></div>
          </div>
        </>
      );
    }
  };

  return (
    <React.Fragment>
      <section className="section hero-section bg-ico-hero" id="home">
        <div className="bg-overlay bg-primary"></div>
        <Container>
          <Row className="align-items-center">
            <Col lg={12} className="ms-lg-auto">

                <CardBody>
                  <div className="text-center">
                    <div className="text-white-50">
                      <h1 className="text-white fw-semibold mb-3 hero-title">AutoPro - CRM system</h1>
                      <p className="font-size-14">It will be as simple as occidental in fact to an English person, it will seem like simplified as a skeptical Cambridge</p>
                    </div>
                  </div>
                </CardBody>

            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Section;
