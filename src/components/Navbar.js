import React from "react";
import { Navbar, Nav } from "react-bootstrap";

function NavBar() {
  return (
    <Navbar expand="lg" style={styles.navbar} className="px-3">
      <Navbar.Brand href="/" style={styles.brand}>
        MyStore
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          <Nav.Link href="#" style={styles.navLink}>
            Profile
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

const styles = {
  navbar: {
    background: `linear-gradient(236.5deg, #48468c 29.42%, #0d102d 80.88%),
                 linear-gradient(91.01deg, #23293d 27.25%, #323f68 50.86%)`,
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 1000,
    padding: "10px 20px",
  },
  brand: {
    color: "#fff",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  navLink: {
    color: "#fff",
    fontSize: "1rem",
    marginLeft: "15px",
  },
};

export default NavBar;
