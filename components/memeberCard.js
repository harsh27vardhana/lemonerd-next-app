import { Card, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/memeberCard.module.css";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

function memeberCard(props) {
  return (
    <Col md={6} xs={12}>
      <div className={`p-2 align-items-stretch ${styles.cardMedia}`}>
        <Card className={styles.cardShadow}>
          <Card.Img variant="top" src={props.image} />
          <Card.Body>
            <Card.Title className="font-weight-bold">{props.name}</Card.Title>
            <Card.Subtitle className="text-muted">
              {props.position}
            </Card.Subtitle>
            <Card.Text>{props.discription}</Card.Text>
          </Card.Body>
          <div className="d-flex justify-content-around align-items-end px-5 mx-5 pb-4">
            <a href={props.facebook} className="fa-lg text-dark">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href={props.instagram} className="fa-lg text-dark">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href={props.linkedin} className="fa-lg text-dark">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>
        </Card>
      </div>
    </Col>
  );
}

export default memeberCard;
