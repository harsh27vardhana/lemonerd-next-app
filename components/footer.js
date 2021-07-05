import Link from "next/link";
import Image from "react-bootstrap/Image";
import FormControl from "react-bootstrap/FormControl";
import { Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faGlobe,
  faHome,
  faInfoCircle,
  faLightbulb,
  faPaperPlane,
  faSignInAlt,
  faUserEdit,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Footer.module.css";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

library.add(faFacebook, faInstagram, faLinkedin);
function footer() {
  const { currentUser, logout } = useAuth();
  return (
    <footer className={styles.footerMain}>
      <Container className="pt-5">
        <Row className="text-center justify-content-center">
          <Col md={2} sm={6} xs={5} className="pb-4">
            <Link href="/">
              <Image
                src="./icon.svg"
                fluid
                style={{ width: "180px" }}
                role="button"
              />
            </Link>
          </Col>
          <Col
            md={3}
            sm={6}
            xs={12}
            className="pb-4 d-flex justify-content-center"
          >
            <div className="text-left">
              <Row>
                <Col xs={3}></Col>
                <Col xs={1}>
                  <FontAwesomeIcon icon={faHome} />
                  <FontAwesomeIcon icon={faInfoCircle} />
                  <FontAwesomeIcon icon={faUsers} />
                  <FontAwesomeIcon icon={faUserEdit} />
                  <FontAwesomeIcon icon={faLightbulb} />
                  <FontAwesomeIcon icon={faSignInAlt} />
                </Col>
                <Col xs={4}>
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
                  <div className={styles.footerNav}>
                    <Link href="/quicksplained">QUICKSPLAINED</Link>
                  </div>
                  <div className={styles.footerNav}>
                    {!currentUser && <Link href="/login">LOGIN</Link>}
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
                <Col xs={3}></Col>
              </Row>
            </div>
          </Col>
          <Col md={1} sm={0} xs={8} className="pb-4"></Col>
          <Col
            md={4}
            sm={6}
            xs={7}
            className="py-4 d-flex align-items-center justify-content-center"
          >
            {/* <div>
              <span className="d-flex align-items-center border rounded px-2">
                <FormControl className="bg-transparent border-0 text-white" />
                <FontAwesomeIcon icon={faPaperPlane} />
              </span>
              <div>Stay in touch with us for insightful content!</div>
            </div> */}
          </Col>
          <Col
            md={2}
            sm={6}
            xs={6}
            className="p-sm-0 px-3 py-4 d-flex align-items-center justify-content-center"
          >
            <Row className="text-center">
              <Col xs={3}>
                <a
                  href="https://www.facebook.com/lemonerd22/"
                  target="_blank"
                  className={styles.icons}
                >
                  <FontAwesomeIcon icon={["fab", "facebook"]} />
                </a>
              </Col>
              <Col xs={3}>
                <a
                  href="https://www.instagram.com/lemo_nerd/"
                  target="_blank"
                  className={styles.icons}
                >
                  <FontAwesomeIcon icon={["fab", "instagram"]} />
                </a>
              </Col>
              <Col xs={3}>
                <a
                  href="https://www.linkedin.com/company/lemonerd/"
                  target="_blank"
                  className={styles.icons}
                >
                  <FontAwesomeIcon icon={["fab", "linkedin"]} />
                </a>
              </Col>
              <Col xs={3}>
                <a
                  href="https://www.lemonerd.in/"
                  target="_blank"
                  className={styles.icons}
                >
                  <FontAwesomeIcon icon={faGlobe} />
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
