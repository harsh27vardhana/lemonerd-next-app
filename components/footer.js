import Link from "next/link";
import React from "react";
import { Container, Row, Col, Image, Nav, Navbar } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/Footer.module.css";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

function footer() {
  const { currentUser, logout } = useAuth();
  return (
    <footer className={styles.footerMain}>
      <Container className="pt-5">
        <Row className="text-center justify-content-center">
          <Col md={2} sm={6} xs={5} className="pb-4 d-none d-md-block">
            <Link href="/">
              <Image
                src="/icon.svg"
                fluid
                className={styles.brandIcon}
                role="button"
              />
            </Link>
          </Col>
          <Col md={8} className="pb-4 justify-content-center d-none d-sm-flex">
            <Navbar>
              <Nav>
                <div className={styles.footerNav}>
                  <Link href="/">HOME</Link>
                </div>
                <div className={styles.footerNav}>
                  <Link href="/team">TEAM</Link>
                </div>
                <div className={styles.footerNav}>
                  <Link href="/authors">AUTHORS</Link>
                </div>
                <div className={styles.footerNav}>
                  <a href="/quicksplained">QUICKSPLAINED</a>
                </div>
                <div className={styles.footerNav}>
                  {currentUser && (
                    <a
                      role="button"
                      onClick={async () => {
                        try {
                          await logout();
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                    >
                      LOGOUT
                    </a>
                  )}
                </div>
              </Nav>
            </Navbar>
          </Col>
          <Col xs={12} className="pb-4 justify-content-center d-flex d-sm-none">
            <Row>
              <Col>
                <div className={styles.footerNav}>
                  <Link href="/">HOME</Link>
                </div>
                <div className={styles.footerNav}>
                  <Link href="/team">TEAM</Link>
                </div>
                <div className={styles.footerNav}>
                  <Link href="/authors">AUTHORS</Link>
                </div>
                <div className={styles.footerNav}>
                  <Link href="/quicksplained">QUICKSPLAINED</Link>
                </div>
                <div className={styles.footerNav}>
                  {currentUser && (
                    <a
                      role="button"
                      onClick={async () => {
                        try {
                          await logout();
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                    >
                      LOGOUT
                    </a>
                  )}
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={12} className="d-block d-md-none">
            <Container className="bg-white">
              <hr />
            </Container>
          </Col>
          <Col
            md={2}
            sm={6}
            xs={12}
            className="p-sm-0 px-3 py-4 d-flex align-items-center justify-content-center"
          >
            <Row className="text-center">
              <Col xs={3}></Col>
              <Col xs={1}>
                <a
                  href="https://www.facebook.com/lemonerd22/"
                  target="_blank"
                  className={styles.icons}
                >
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>

                <a
                  href="https://www.instagram.com/lemo_nerd/"
                  target="_blank"
                  className={styles.icons}
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>

                <a
                  href="https://www.linkedin.com/company/lemonerd/"
                  target="_blank"
                  className={styles.icons}
                >
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
              </Col>
              <Col xs={3}>
                <div>
                  <a
                    href="https://www.facebook.com/lemonerd22/"
                    target="_blank"
                    className={styles.icons}
                  >
                    Facebook
                  </a>
                </div>
                <div>
                  <a
                    href="https://www.instagram.com/lemo_nerd/"
                    target="_blank"
                    className={styles.icons}
                  >
                    Instagram
                  </a>
                </div>
                <div>
                  <a
                    href="https://www.linkedin.com/company/lemonerd/"
                    target="_blank"
                    className={styles.icons}
                  >
                    LinkedIn
                  </a>
                </div>
              </Col>
              <Col xs={3}></Col>
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
