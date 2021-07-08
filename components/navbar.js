import Link from "next/link";
import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import Tags from "../data/tags.json";
import style from "../styles/nav.module.css";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
const tags = Tags.categories;

function navbar() {
  const { currentUser } = useAuth();
  const [expanded, setExpanded] = useState(false);
  return (
    <Navbar
      variant="dark"
      expand="lg"
      fixed="top"
      className={style.navBackground}
      expanded={expanded}
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
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-between"
        >
          <Nav className="text-whitesmoke" navbarScroll>
            <div className={style.routes} onClick={() => setExpanded(false)}>
              <Link href="/"> HOME </Link>
            </div>
            <div className={style.routes} onClick={() => setExpanded(false)}>
              <Link href="/team">TEAM </Link>
            </div>
            <div className={style.routes} onClick={() => setExpanded(false)}>
              <Link href="/authors">AUTHORS </Link>
            </div>
            <div className={style.routes} onClick={() => setExpanded(false)}>
              <Link href="/quicksplained">QUICKSPLAINED </Link>
            </div>
            <hr className="p-0 m-0 bg-white" />
            <span className={style.navbarDropdownCollapse}>
              {tags.map((tag) => (
                <div
                  className={`${style.routes} d-block d-lg-none`}
                  key={tag}
                  onClick={() => setExpanded(false)}
                >
                  <Link href="/tags/[tag_name]" as={`/tags/${tag}`}>
                    {tag}
                  </Link>
                  <hr className="p-0 m-0 bg-white" />
                </div>
              ))}
            </span>
            <div className="pt-2 d-none d-lg-block">
              <Dropdown>
                <Dropdown.Toggle
                  variant="transparent"
                  id="dropdown-basic"
                  className="text-white"
                >
                  BLOGS
                </Dropdown.Toggle>

                <Dropdown.Menu className={style.dropdownNavbar}>
                  {tags.map((tag) => (
                    <div
                      className="dropdown-item"
                      key={tag}
                      onClick={() => setExpanded(false)}
                    >
                      <Link href="/tags/[tag_name]" as={`/tags/${tag}`}>
                        {tag}
                      </Link>
                    </div>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            {currentUser && (
              <div className={style.routes} onClick={() => setExpanded(false)}>
                <Link href="/admin">ADMIN </Link>
              </div>
            )}
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
