import Link from "next/link";
import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import FormControl from "react-bootstrap/FormControl";
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
    <footer className={styles.footerMain}>
      <Container className="pt-5">
        <Row className="text-center justify-content-center">
          <Col md={2} sm={6} xs={3} className="pb-4">
            <Link href="/">
              <Image
                src="./icon.svg"
                fluid
                style={{ width: "180px" }}
                role="button"
              />
            </Link>
          </Col>
          <Col md={2} sm={6} xs={12} className="pb-4">
            <div className={styles.footerNav}>
              <Link href="/">HOME</Link>
            </div>
            <div className={styles.footerNav}>
              <Link href="/about">ABOUT</Link>
            </div>
            <div className={styles.footerNav}>
              <Link href="/team">TEAM</Link>
            </div>
            <div className={styles.footerNav}>
              <Link href="/authors">AUTHORS</Link>
            </div>
          </Col>
          <Col lg={2} md={1} sm={0} xs={8} className="pb-4"></Col>
          <Col md={4} sm={6} xs={7} className="pb-4">
            <FormControl />
          </Col>
          <Col md={2} sm={6} xs={6} className="p-sm-0 px-3 pb-4">
            <Row className="text-center">
              <Col>
                <a
                  href="https://www.facebook.com/lemonerd22/"
                  target="_blank"
                  className={styles.icons}
                >
                  <FontAwesomeIcon icon={["fab", "facebook"]} />
                </a>
              </Col>
              <Col>
                <a
                  href="https://www.instagram.com/lemo_nerd/"
                  target="_blank"
                  className={styles.icons}
                >
                  <FontAwesomeIcon icon={["fab", "instagram"]} />
                </a>
              </Col>
              <Col>
                <a
                  href="https://www.linkedin.com/company/lemonerd/"
                  target="_blank"
                  className={styles.icons}
                >
                  <FontAwesomeIcon icon={["fab", "linkedin"]} />
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <div className="text-center ">
        <div className={styles.copyright}>
          © 2021 Copyright:
          <Link href="/"> Lemonerd.in</Link>
        </div>
      </div>
    </footer>
  );
}

export default footer;
