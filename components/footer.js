import Link from "next/link";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import styles from "../styles/Footer.module.css";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

library.add(faFacebook, faInstagram, faLinkedin);
function footer() {
  return (
    <div className={styles.footerMain}>
      <Navbar className="justify-content-center">
        <Nav>
          <div className={styles.footerNav + " nav-link nav-item"}>
            <Link href="/">HOME</Link>
          </div>
          <div className={styles.footerNav + " nav-link nav-item"}>
            <Link href="/about">ABOUT</Link>
          </div>
          <div className={styles.footerNav + " nav-link nav-item"}>
            <Link href="/team">TEAM</Link>
          </div>
          <div className={styles.footerNav + " nav-link nav-item"}>
            <Link href="/authors">AUTHORS</Link>
          </div>
        </Nav>
      </Navbar>
      <Container>
        <hr className="bg-light" />
      </Container>
      <Container>
        <Row className="text-center">
          <Col>
            <a
              href="https://www.facebook.com/lemonerd22/"
              target="_blank"
              className={styles.icons}
            >
              <FontAwesomeIcon icon={["fab", "facebook"]} size="2x" />
            </a>
          </Col>
          <Col>
            <a
              href="https://www.instagram.com/lemo_nerd/"
              target="_blank"
              className={styles.icons}
            >
              <FontAwesomeIcon icon={["fab", "instagram"]} size="2x" />
            </a>
          </Col>
          <Col>
            <a
              href="https://www.linkedin.com/company/lemonerd/"
              target="_blank"
              className={styles.icons}
            >
              <FontAwesomeIcon icon={["fab", "linkedin"]} size="2x" />
            </a>
          </Col>
        </Row>
      </Container>
      <br />
      <div className="text-center ">
        <div className={styles.copyright}>
          © 2021 Copyright:
          <Link href="/"> Lemonerd.in</Link>
        </div>
      </div>
    </div>
  );
}

export default footer;
