import { Navbar, Nav, Container, NavDropdown  } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function navBar() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
        <Navbar.Brand as={Link} to="/"><i className="bi bi-controller"></i></Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link as={Link} to="/match-league">Liga</Nav.Link>
          <Nav.Link as={Link} to="/diagram">Diagaram</Nav.Link>
          <NavDropdown title="Master" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/liga">Liga</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/kelas">Kelas</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/gelanggang">Gelanggang</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/peserta">Peserta</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/device">Perangkat</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default navBar;