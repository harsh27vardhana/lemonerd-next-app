import { Card, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

function memeberCard(props) {
  return (
    <>
      <Col md={6} xs={12} className="d-none d-lg-flex">
        <div
          className="p-2 align-items-stretch d-none d-lg-flex m-lg-5"
          style={{ height: "85%" }}
        >
          <Card
            className="text-center"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
              backgroundColor: "rgb(255, 255, 255, 0.6)",
            }}
          >
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
      <Col md={6} xs={12} className="d-none d-md-flex d-lg-none">
        <div className="p-2 align-items-stretch d-none d-md-flex d-lg-none m-lg-5 h-100">
          <Card className="text-center">
            <Card.Img variant="top" src={props.image} />
            <Card.Body>
              <Card.Title className="font-weight-bold ">
                {props.name}
              </Card.Title>
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
      <Col md={6} xs={12} className=" d-md-none">
        <div className="p-2 align-items-stretch h-auto w-auto d-flex d-md-none">
          <Card className="text-center">
            <Card.Img variant="top" src={props.image} />
            <Card.Body>
              <Card.Title className="font-weight-bold ">
                {props.name}
              </Card.Title>
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
    </>
  );
}

export default memeberCard;
