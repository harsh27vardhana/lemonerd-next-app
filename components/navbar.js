import Link from "next/link";
import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { Container, Button } from "react-bootstrap";
import style from "../styles/nav.module.css";

function navbar() {
  return (
    <Navbar
      variant="dark"
      expand="lg"
      fixed="top"
      className={style.navBackground}
    >
      <Container>
        <Navbar.Brand>
          <Link href="/">
            <Image
              src="./icon.png"
              fluid
              className={style.BrandIcon}
              role="button"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          style={{ justifyContent: "space-between" }}
        >
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
          <Nav>
            <Form inline>
              <FormControl
                type="search"
                placeholder="Search"
                className="mr-2"
              />
              <Button variant="outline-warning">Search</Button>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default navbar;
