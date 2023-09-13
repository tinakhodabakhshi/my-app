import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../data/logo.png";
import { NavLink } from "react-router-dom";

const MyNav = () => (
  <Navbar expand="lg" className="navbar-dark navbar" style={{ backgroundColor: "#221f1f", paddingInline: "4px" }}>
    <Container fluid>
      <Navbar.Brand href="#">
        <img src={logo} alt="logo" style={{ width: "100px", height: "55px" }} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavLink to="/" className="nav-link fw-bold">
            Home
          </NavLink>
          <NavLink to="/tv-shows" className="nav-link fw-bold">
            TV Shows
          </NavLink>
          <NavLink to="/movies" className="nav-link fw-bold">
            Movies
          </NavLink>
          <NavLink to="/recently-added" className="nav-link fw-bold">
            Recently Added
          </NavLink>
          <NavLink to="/my-list" className="nav-link fw-bold">
            My List
          </NavLink>
        </Nav>
        <i className="fa fa-search icons"></i>
        <div id="kids">KIDS</div>
        <i className="fa fa-bell icons"></i>
        <i className="fa fa-user icons"></i>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default MyNav;