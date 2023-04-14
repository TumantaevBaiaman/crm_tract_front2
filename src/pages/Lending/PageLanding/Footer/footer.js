import React from "react"
import { Container, Row, Col } from "reactstrap"
import { Link } from "react-router-dom"

//Import Components
import FooterLink from "./footer-link"
import "../landing-main.css"

const Features = () => {
  const footerLinks = [
    {
      title: "Company",
      links: [
        { title: "About Us", link: "#" },
        { title: "Features", link: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { title: "Whitepaper", link: "#" },
        { title: "Token sales", link: "#" },
        { title: "Privacy Policy", link: "#" },
        { title: "Terms & Conditions", link: "#" },
      ],
    },
    {
      title: "Links",
      links: [
        { title: "Tokens", link: "#" },
        { title: "Roadmap", link: "#" },
        { title: "FAQs", link: "#" },
      ],
    },
  ]

  return (
    <React.Fragment>
      <footer className="landing-footer">
        <Container>
          {/*<Row>*/}
          {/*  {footerLinks.map((footerLink, key) => (*/}
          {/*    <Col lg="3" sm="6" key={key}>*/}
          {/*      <div className="mb-4 mb-lg-0">*/}
          {/*        <h5 className="mb-3 footer-list-title">{footerLink.title}</h5>*/}
          {/*        <ul className="list-unstyled footer-list-menu">*/}
          {/*          {footerLink.links.map((Flink, key) => (*/}
          {/*            <li key={key}>*/}
          {/*              <Link to={Flink.link}>{Flink.title}</Link>*/}
          {/*            </li>*/}
          {/*          ))}*/}
          {/*        </ul>*/}
          {/*      </div>*/}
          {/*    </Col>*/}
          {/*  ))}*/}
          {/*</Row>*/}

          <hr className="footer-border my-5" />

          <FooterLink />
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default Features
