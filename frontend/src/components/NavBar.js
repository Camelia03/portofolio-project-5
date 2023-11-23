import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import { removeTokenTimestamp } from "../utils/utils";
import SearchForm from "./SearchForm";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>

        <NavLink activeClassName={styles.Active} to="/search">
          Books
        </NavLink>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="all" id="basic-navbar-nav">
          <Nav className="ms-auto">
            {currentUser ? (
              <>
                <SearchForm />

                <NavDropdown
                  title={`Welcome, ${currentUser.username}`}
                  id="nav-dropdown"
                  className={`${styles.NavDropdown} ms-3`}
                >
                  <NavDropdown.Item
                    as={NavLink}
                    className={styles.NavDropdownLink}
                    activeClassName={styles.Active}
                    to="/profile"
                  >
                    <i
                      className={`fa-solid fa-user fa-xs ${styles.NavDropdownIcon}`}
                    ></i>
                    My profile
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={NavLink}
                    className={styles.NavDropdownLink}
                    activeClassName={styles.Active}
                    to="/my-reviews"
                  >
                    <i
                      className={`fa-solid fa-star fa-xs ${styles.NavDropdownIcon}`}
                    ></i>
                    My reviews
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={NavLink}
                    className={styles.NavDropdownLink}
                    activeClassName={styles.Active}
                    to="/my-lists"
                  >
                    <i
                      className={`fa-solid fa-list fa-xs ${styles.NavDropdownIcon}`}
                    ></i>
                    My Lists
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    className={styles.NavDropdownLink}
                    onClick={handleSignOut}
                  >
                    <i
                      className={`fa-solid fa-right-from-bracket fa-xs ${styles.NavDropdownIcon}`}
                    ></i>
                    Sign out
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <NavLink
                  className="me-3"
                  activeClassName={styles.Active}
                  to="/signin"
                >
                  <i className="fa-solid fa-right-to-bracket"></i> Sign in
                </NavLink>
                <NavLink activeClassName={styles.Active} to="/signup">
                  <i className="fa-solid fa-user-plus"></i> Sign up
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
