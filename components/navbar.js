import Link from "next/link";
import { Container, Image, Nav, Navbar, Dropdown, Form } from "react-bootstrap";
import Tags from "../data/tags.json";
import style from "../styles/nav.module.css";
import { useAuth } from "../context/AuthContext";
import React, { useState } from "react";
const tags = Tags.categories;

function navbar() {
  const { currentUser } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const [dropdownShow, setDropdownShow] = useState(false);
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
              src="/icon.svg"
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
          <Nav className="d-block d-lg-none">
            <Form inline className="search-form">
              <div className="gcse-search"></div>
            </Form>
          </Nav>
          <Nav className="text-whitesmoke" navbarScroll>
            <Link href="/" role="button">
              <div
                className={style.routes}
                onClick={() => setExpanded(false)}
                role="button"
              >
                HOME
              </div>
            </Link>

            <Link href="/team" role="button">
              <div
                className={style.routes}
                onClick={() => setExpanded(false)}
                role="button"
              >
                TEAM{" "}
              </div>
            </Link>

            <Link href="/authors" role="button">
              <div
                className={style.routes}
                onClick={() => setExpanded(false)}
                role="button"
              >
                AUTHORS{" "}
              </div>
            </Link>

            <a href="/quicksplained" role="button" className="anchor">
              <div
                className={style.routes}
                onClick={() => setExpanded(false)}
                role="button"
              >
                QUICKSPLAINED{" "}
              </div>
            </a>

            <hr className="p-0 m-0 bg-white" />
            <span className={style.navbarDropdownCollapse}>
              {tags.map((tag) => (
                <Link
                  href="/tags/[tag_name]"
                  as={`/tags/${tag}`}
                  key={tag}
                  role="button"
                >
                  <div
                    className={`${style.routes} d-block d-lg-none`}
                    onClick={() => setExpanded(false)}
                    role="button"
                  >
                    {tag}
                    <hr className="p-0 m-0 bg-white" />
                  </div>
                </Link>
              ))}
            </span>
            <div className="pt-2 d-none d-lg-block">
              <Dropdown
                onSelect={() => setDropdownShow(false)}
                onToggle={() => setDropdownShow(!dropdownShow)}
                show={dropdownShow}
              >
                <Dropdown.Toggle
                  variant="transparent"
                  id="dropdown-basic"
                  className="text-white"
                >
                  BLOGS
                </Dropdown.Toggle>

                <Dropdown.Menu className={style.dropdownNavbar}>
                  {tags.map((tag) => (
                    <Link href="/tags/[tag_name]" as={`/tags/${tag}`} key={tag}>
                      <div
                        role="button"
                        className="dropdown-item"
                        onClick={() => setDropdownShow(false)}
                      >
                        {tag}
                      </div>
                    </Link>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            {currentUser && (
              <Link href="/admin" role="button">
                <div
                  className={style.routes}
                  role="button"
                  onClick={() => setExpanded(false)}
                >
                  ADMIN
                </div>
              </Link>
            )}
          </Nav>
          <Nav className="d-none d-md-block">
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
