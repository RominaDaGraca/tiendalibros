function Carrito(props) {

    let total = 0;
    props.cart.forEach(function (producto) {
        total += producto.cantidad * producto.precio;
    });
    var totalDecimal = total.toFixed(2);



    return (
        <div>
            <h3>Lista del carrito</h3>
            <table class="table table-light table-bordered">
                <tbody>
                    <tr class="alert alert-primary">
                        <th width="40%">Descripción</th>
                        <th width="15%" class="text-center">Cantidad</th>
                        <th width="20%" class="text-center">Precio</th>
                        <th width="20%" class="text-center">Total</th>
                        <th width="5%">--</th>
                    </tr>

                    {props.cart.map((p) => (
                        <tr>
                            <td width="40%">{p.nombre}</td>
                            <td width="15%" class="text-center">{p.cantidad}</td>
                            <td width="20%" class="text-center">{p.precio}</td>
                            <td width="20%" class="text-center">{p.cantidad * p.precio}</td>
                            <td width="5%">
                                <button className="btn btn-danger" onClick={() => { props.eliminarProducto(p) }} >Eliminar</button>
                            </td>
                        </tr>
                    ))}


                    <tr>
                        <td colspan="3" aling="right"><h3>Total</h3></td>
                        <td aling="right"><h3>€{totalDecimal} </h3></td>
                        <td></td>
                    </tr>

                    {props.cart.length !== 0 ? (<tr>
                        <td colSpan="5">
                            <form action="" onSubmit={(e) => { e.preventDefault(); props.pagar(document.getElementById("email").value) }}>
                                <div class="alert alert-primary" role="alert">

                                    <div class="form-group">
                                        <label for="my-input">Correo de contacto</label>
                                        <input id="email" name="email" class="form-control"
                                            type="email" placeholder="Por favor escribe tú correo" required ></input>
                                    </div>

                                    <small id="emailHelp" class="form-text text-muted">
                                        Los productos se enviarán a este correo
                                    </small>

                                </div>

                                <button class="btn btn-primary btn-lg btn-block" type="submit" value="proceder" name="btnAccion">
                                    Proceder a pagar {'>>'}
                                </button>

                            </form>
                        </td>
                    </tr>) : null}

                </tbody>
            </table>
        </div>
    );
}

export default Carrito;