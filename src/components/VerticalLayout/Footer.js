import React from "react"
import { Container, Row, Col } from "reactstrap"

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer bg-white">
        <Container fluid={true}>
          <Row>
            <Col md={6}>{new Date().getFullYear()} © AutoPro.</Col>
            <Col md={6}>
              <div className="text-sm-end d-none d-sm-block">
                CRM SYSTEM
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default Footer
