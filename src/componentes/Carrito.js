function Carrito(props) {
    return (
        <div>
            <h1>Carrito</h1>
            {props.cart.map((p) => (
                <div>{p.nombre}</div>
            ))}
        </div>
    );
}

export default Carrito;