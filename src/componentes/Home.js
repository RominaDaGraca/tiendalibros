import Producto from "./Producto";

function Home(props){
    return(
        <div className="row">
          {props.productos.map((producto) => (
            <Producto
              /*Estos son los props del producto */
              key={producto.id}
              value={producto}
              onClick={() => props.manejador(producto)}
            />
          ))}
        </div>
    );
}

export default Home;