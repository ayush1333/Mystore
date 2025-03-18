import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation(); // Get the current route

  return (
    <div
      className="d-flex flex-column p-3 vh-100"
      style={{
        width: "250px",
        background: "linear-gradient(236.5deg, #48468c 29.42%, #0d102d 80.88%)",
        color: "#fff",
        position: "fixed", 
        left: 0,
        top: 60,
        bottom: 0,
      }}
    >
      <h4 className="text-white">Menu</h4>
      <Nav className="flex-column">
        <Nav.Link
          as={Link}
          to="/products"
          className={`text-white ${location.pathname === "/products" ? "active-menu" : ""}`}
          style={{
            padding: "10px",
            borderRadius: "5px",
            fontWeight: location.pathname === "/products" ? "bold" : "normal",
            background: location.pathname === "/products" ? "rgba(255, 255, 255, 0.2)" : "transparent",
          }}
        >
          Product Details
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/compare"
          className={`text-white ${location.pathname === "/compare" ? "active-menu" : ""}`}
          style={{
            padding: "10px",
            borderRadius: "5px",
            fontWeight: location.pathname === "/compare" ? "bold" : "normal",
            background: location.pathname === "/compare" ? "rgba(255, 255, 255, 0.2)" : "transparent",
          }}
        >
          Compare Products
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
