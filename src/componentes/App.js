import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import NavBarLibros from './NavbarLibros';
import Carrito from './Carrito';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'carrito': [],
      'productos': [{
        id: 1,
        nombre: "Learn PHP 7",
        imagen: "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/4842/9781484217290.jpg",
        descripcion: "This new book on PHP 7 introduces writing solid, secure, object-oriented code in the new PHP 7: you will create a complete three-tier application using a natural process of building and testing modules within each tier. This practical approach teaches you about app development and introduces PHP features when they are actually needed rather than providing you with abstract theory and contrived examples.",
        precio: 300
      },
      {
        id: 2,
        nombre: "Learn PHP 7",
        imagen: "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/4842/9781484217290.jpg",
        descripcion: "This new book on PHP 7 introduces writing solid, secure, object-oriented code in the new PHP 7: you will create a complete three-tier application using a natural process of building and testing modules within each tier. This practical approach teaches you about app development and introduces PHP features when they are actually needed rather than providing you with abstract theory and contrived examples.",
        precio: 300
      },
      {
        id: 3,
        nombre: "Learn PHP 7",
        imagen: "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/4842/9781484217290.jpg",
        descripcion: "This new book on PHP 7 introduces writing solid, secure, object-oriented code in the new PHP 7: you will create a complete three-tier application using a natural process of building and testing modules within each tier. This practical approach teaches you about app development and introduces PHP features when they are actually needed rather than providing you with abstract theory and contrived examples.",
        precio: 300
      }
      ]
    };
  }

  /*componentDidMount: es uno de los métodos que podemos usar para manipular el ciclo de vida 
  de un componente de tipo clase.Es decir, se ejecuta justo después del primer render de nuestro componente. */
  componentDidMount() {
    /*con fetch hacemos una llamada y le pasamos por parametro la ruta a la api que vamos a usar
    y el metodo fetch nos devolvera una promesa que será aceptada cuando reciba una respuesta y 
    sólo será rechazada si hay un fallo de red o si por alguna razón no se pudo completar la 
    petición. El modo más habitual de manejar las promesas es utilizando .then().*/
    fetch("http://localhost:3500")
      /*creamos una promesa con .then*/
      .then(datos => datos.json())
      .then(datos => {
        let productos = [...this.state.productos];
        productos = datos.map(p => {
          return {
            id: p.ID,
            imagen: p.Imagen,
            nombre: p.Nombre,
            descripcion: p.Descripcion,
            precio: p.Precio
          };
        });
        this.setState({ 'productos': productos });
        console.log(productos)
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <Router>
        <div className="container">
          <NavBarLibros car={this.state.carrito.length} />
          <Routes>
            <Route path="/" exact element={<Home productos={this.state.productos} manejador={(p) => this.manejador(p)} />}></Route>
            <Route path="/carrito" element={<Carrito cart={this.state.carrito} />}></Route>
          </Routes>
        </div>
      </Router>
    );
  }

  manejador(p) {
    /*Aca hacemos una copia del array con los ... */
    const nuevoCarrito = [...this.state.carrito];
    nuevoCarrito.push(p);
    /*Cambiamos el estado */
    this.setState({ 'carrito': nuevoCarrito });
  }
}

export default App;