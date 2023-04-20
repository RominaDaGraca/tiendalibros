import { useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavBarLibros(props) {

  useEffect(() => {
    //console.log("use effect NavBarLibros");
  })

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Tienda Libros</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link className='nav-link' to="/">Home</Link>
          <Link className='nav-link' to="/carrito">Carrito({props.car})</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBarLibros;
