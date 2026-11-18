function comprasAnterior({lista}) {
    const subtotal = lista.reduce((suma, p) => suma + p.precio * p.cantidad, 0);
    const iva = subtotal * 0.12;
    const total = subtotal + iva;

    
    return (
        <div>
            <h3>Total de productos: {lista.reduce((total, producto) => total + producto.cantidad, 0)}</h3>
            <div className="card shadow-sm p-3 mt-3">
                <h4>Productos seleccionados</h4>
                {lista.length === 0 ? <p>Aún no has seleccionado productos.</p> : (
                    <ul className="list-group list-group-flush">
                        {lista.map((producto) => (
                            <li className="list-group-item d-flex justify-content-between" key={producto.nombre}>
                                <span>{producto.nombre} — {producto.cantidad} × ${producto.precio.toFixed(2)}</span>
                                <strong>${(producto.precio * producto.cantidad).toFixed(2)}</strong>
                            </li>
                        ))}
                    </ul>
                )}
                <div className="mt-3">
                    <p>Subtotal: ${subtotal.toFixed(2)}</p>
                    <p>IVA (12%): ${iva.toFixed(2)}</p>
                    <h4>Total: ${total.toFixed(2)}</h4>
                </div>

            </div>
        </div>
    );
}

import { useState } from "react";

const TASA_IVA = 0.12;
const TASA_ICE = 0.19;

function Compras({ lista, actualizarLista }) {
    const [cliente, setCliente] = useState({ nombre: "", ciudad: "", edad: "", genero: "" });
    const [calculado, setCalculado] = useState(false);
    const edad = Number(cliente.edad);
    const menor = cliente.edad !== "" && edad < 18;
    const adultoMayor = edad >= 65;
    const subtotal = lista.reduce((suma, p) => suma + p.precio * p.cantidad, 0);
    const descuento = calculado && adultoMayor ? subtotal * 0.08 : 0;
    const baseConDescuento = subtotal - descuento;
    const iva = calculado && !menor ? baseConDescuento * TASA_IVA : 0;
    const ice = calculado && !menor ? subtotal * TASA_ICE : 0;
    const total = baseConDescuento + iva + ice;
    const totalUnidades = lista.reduce((suma, producto) => suma + producto.cantidad, 0);

    const cambiarCliente = (evento) => {
        setCliente({ ...cliente, [evento.target.name]: evento.target.value });
        setCalculado(false);
    };

    const calcularCompra = (evento) => {
        evento.preventDefault();
        if (!cliente.nombre.trim() || !cliente.ciudad.trim() || !cliente.edad || !cliente.genero) {
            alert("Completa todos los datos del cliente.");
            return;
        }
        if (lista.length === 0) {
            alert("Agrega productos antes de calcular la compra.");
            return;
        }
        if (edad < 18 && lista.some((producto) => producto.esLicor)) {
            alert("No se puede vender bebidas alcoholicas a menores de edad. Quita los licores para continuar.");
            return;
        }
        setCalculado(true);
    };

    const quitarProducto = (nombre) => {
        actualizarLista(lista.filter((producto) => producto.nombre !== nombre));
        setCalculado(false);
    };

    return (
        <div className="container my-4">
            <h2 className="text-white mb-4">Mis Compras</h2>
            <div className="card shadow-sm p-4 mb-4">
                <h4>Datos del cliente</h4>
                <form onSubmit={calcularCompra}>
                    <div className="row g-3 mt-1">
                        <div className="col-md-6">
                            <label className="form-label">Nombre</label>
                            <input className="form-control" name="nombre" value={cliente.nombre} onChange={cambiarCliente} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Ciudad</label>
                            <input className="form-control" name="ciudad" value={cliente.ciudad} onChange={cambiarCliente} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Edad</label>
                            <select className="form-select" name="edad" value={cliente.edad} onChange={cambiarCliente}>
                                <option value="">Selecciona tu edad</option>
                                {Array.from({ length: 120 }, (_, indice) => indice + 1).map((valor) => (
                                    <option key={valor} value={valor}>{valor} anos</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Genero</label>
                            <select className="form-select" name="genero" value={cliente.genero} onChange={cambiarCliente}>
                                <option value="">Selecciona una opcion</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Otro">Otro</option>
                                <option value="Prefiero no decirlo">Prefiero no decirlo</option>
                            </select>
                        </div>
                    </div>
                    <button className="btn btn-primary mt-3" type="submit">Calcular compra</button>
                </form>
            </div>

            <div className="card shadow-sm p-4">
                <h4>Productos seleccionados ({totalUnidades})</h4>
                {lista.length === 0 ? <p>Aun no has seleccionado productos.</p> : (
                    <ul className="list-group list-group-flush">
                        {lista.map((producto) => (
                            <li className="list-group-item d-flex justify-content-between align-items-center" key={producto.nombre}>
                                <span>{producto.nombre} - {producto.cantidad} x ${producto.precio.toFixed(2)}</span>
                                <span className="d-flex align-items-center gap-3">
                                    <strong>${(producto.precio * producto.cantidad).toFixed(2)}</strong>
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => quitarProducto(producto.nombre)}>Quitar</button>
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
                <div className="mt-3">
                    <p>Subtotal: ${subtotal.toFixed(2)}</p>
                    {calculado && adultoMayor && <p>Descuento por edad (8%): -${descuento.toFixed(2)}</p>}
                    {calculado && menor && <p className="text-success">Menor de edad: no se cobra IVA ni ICE. No se permite comprar licores.</p>}
                    {calculado && !menor && <>
                        <p>IVA (12%): ${iva.toFixed(2)}</p>
                        <p>ICE (19%): ${ice.toFixed(2)}</p>
                    </>}
                    {calculado && <h4>Total: ${total.toFixed(2)}</h4>}
                </div>
            </div>
        </div>
    );
}

export default Compras;
