import { Navbar, Nav } from 'react-bootstrap';

function NavBarLibros(props) {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Tienda Libros</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Carrito({props.carrito})</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

  export default NavBarLibros;