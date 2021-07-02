import Link from "next/link";
import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { Container, Button } from "react-bootstrap";
import Tags from "../data/tags.json";
import style from "../styles/nav.module.css";
const tags = Tags.categories;

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
              src="./icon.svg"
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
            <div className="pt-2">
              <Dropdown>
                <Dropdown.Toggle
                  variant="transparent"
                  id="dropdown-basic"
                  className="text-white"
                >
                  BLOGS
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {tags.map((tag) => (
                    <div className="dropdown-item" key={tag}>
                      <Link href="/tags/[tag_name]" as={`/tags/${tag}`}>
                        {tag}
                      </Link>
                    </div>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Nav>
          <Nav>
            <Form inline className="search-form">
              <div className="gcse-search"></div>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default navbar;
