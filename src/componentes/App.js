import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import NavBarLibros from './NavbarLibros';
import Carrito from "./Carrito";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'carrito': [],
      'productos': [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // Guardar los datos del carrito en local storage si ha habido cambios
    if (prevState.carrito !== this.state.carrito) {
      localStorage.setItem('carrito', JSON.stringify(this.state.carrito));
    }
  }

  /*componentDidMount: es uno de los métodos que podemos usar para manipular el ciclo de vida 
  de un componente de tipo clase.Es decir, se ejecuta justo después del primer render de nuestro componente. */
  componentDidMount() {
    const datosCarrito = JSON.parse(localStorage.getItem('carrito'));
    if (Array.isArray(datosCarrito))
      if(datosCarrito.length>0){
        this.setState({'carrito':datosCarrito})
    }
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
            <Route path="/carrito" element={<Carrito cart={this.state.carrito} 
            eliminarProducto={(p)=>this.eliminarProducto(p)} 
            pagar={(email)=>{ alert(email)}} />}></Route>
          </Routes>
        </div>
      </Router>
    );
  }

  manejador(p) {
    /*Aca hacemos una copia del array con los ... */
    const nuevoCarrito = [...this.state.carrito];
    /*con este if nos evita que se agregue otra vez el producto si ya esta en el carrito
    con el .indexOf */
    if(nuevoCarrito.indexOf(p)<0){
      p.cantidad=1;
      nuevoCarrito.push(p);
      /*Cambiamos el estado */
      this.setState({ 'carrito': nuevoCarrito });
    }
  }

  eliminarProducto(p){
    /*Aca hacemos una copia del array con los ... */
    const nuevoCarrito = [...this.state.carrito];

    const filtrado = nuevoCarrito.filter(prod => prod !== p);
    this.setState({'carrito':filtrado});
   
  }
  pagar(email){
    let nuevoCarrito=this.state.carrito.map(p=>({
        id:p.id,
        precio:p.precio,
        cantidad:p.cantidad
    }))

    let datos={
      'carrito':nuevoCarrito,
      'email':email
    }

    let url="http://localhost:3500/pagar";
    fetch(url,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(datos)
    })
    .then(datos=>datos.json())
    .then(datos=>{
      console.log(datos);
    })
    .catch((err)=>{
      console.log(err);
    })
  }
}

export default App;