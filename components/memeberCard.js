import Card from "react-bootstrap/Card";
import Image from "next/image";
import Button from "react-bootstrap/Button";
import style from "../styles/memeberCard.module.css";
import { RiFacebookFill } from "react-icons/fa";
import Link from "next/link";
import { ReactElement } from "react";
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
    <div className="test-center">
      <Card style={{ width: "22rem" }} className="text-center">
        <Card.Img variant="top" src={props.image} />
        <Card.Body>
          <Card.Title className="font-weight-bold ">{props.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {props.position}
          </Card.Subtitle>
          <Card.Text>{props.discription}</Card.Text>
          <Link href={props.facebook}>
            <FontAwesomeIcon icon={["fab", "facebook"]} />
          </Link>
          <Link href={props.instagram}>
            <FontAwesomeIcon icon={["fab", "instagram"]} />
          </Link>
          <Link href={props.linkedin}>
            <FontAwesomeIcon icon={["fab", "linkedin"]} />
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default memeberCard;
