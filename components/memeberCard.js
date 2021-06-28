import Card from "react-bootstrap/Card";
import style from "../styles/memeberCard.module.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

library.add(faFacebook, faInstagram, faLinkedin);

function memeberCard(props) {
  return (
    <div className="p-2 d-flex align-items-strech h-auto">
      <Card style={{ width: "22rem" }} className="text-center">
        <Card.Img variant="top" src={props.image} />
        <Card.Body>
          <Card.Title className="font-weight-bold ">{props.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {props.position}
          </Card.Subtitle>
          <Card.Text>{props.discription}</Card.Text>
          <a href={props.facebook}>
            <FontAwesomeIcon icon={["fab", "facebook"]} />
          </a>
          <a href={props.instagram}>
            <FontAwesomeIcon icon={["fab", "instagram"]} />
          </a>
          <a href={props.linkedin}>
            <FontAwesomeIcon icon={["fab", "linkedin"]} />
          </a>
        </Card.Body>
      </Card>
    </div>
  );
}

export default memeberCard;
