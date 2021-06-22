import Link from "next/link";
import Image from "react-bootstrap/Image";
// import BrandIcon from "../public/thumbnail/default.png";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Container } from "react-bootstrap";
import style from "../styles/nav.module.css";

function navbar() {
  return (
    <Navbar bg="dark" expand="lg" fixed="top" className={style.navBackground}>
      <Container>
        <Navbar.Brand href="/">
          <Image src="./icon.png" fluid className={style.BrandIcon} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="text-whitesmoke">
            <div className={style.routes}>
              <Link href="/"> HOME </Link>
            </div>
            <div className={style.routes}>
              <Link href="/about">ABOUT </Link>
            </div>
            <div className={style.routes}>
              <Link href="/team">TEAM </Link>
            </div>
            <div className={style.routes}>
              <Link href="/admin">ADMIN </Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default navbar;
