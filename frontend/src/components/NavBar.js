import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import { removeTokenTimestamp } from "../utils/utils";

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
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {currentUser ? (
              <>
                <NavLink
                  exact
                  className={styles.NavLink}
                  activeClassName={styles.Active}
                  to="/"
                >
                  <i className="fas fa-home"></i>Home
                </NavLink>

                <NavLink
                  className={styles.NavLink}
                  to="/"
                  onClick={handleSignOut}
                >
                  <i className="fa-solid fa-right-from-bracket"></i>Sign out
                </NavLink>
                <NavLink
                  className={styles.NavLink}
                  to="/profile"
                  activeClassName={styles.Active}
                >
                  <i className="fa-solid fa-user"></i>My profile
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  className={styles.NavLink}
                  activeClassName={styles.Active}
                  to="/signin"
                >
                  <i className="fa-solid fa-right-to-bracket"></i>Sign in
                </NavLink>
                <NavLink
                  className={styles.NavLink}
                  activeClassName={styles.Active}
                  to="/signup"
                >
                  <i className="fa-solid fa-user-plus"></i>Sign up
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
