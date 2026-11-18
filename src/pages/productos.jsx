
import { useState } from "react";
import { Link } from "react-router-dom";
import CardProducto from "../components/cardProducto";
import SeccionCategoria from "../components/seccionCategoria";

function Productos({ lista, actualizarLista }) {

  // Productos agregados al carrito
  const [carrito, setCarrito] = useState(lista);

  // Agregar productos al carrito
  
const agregarProducto = (producto) => {
    const existe = carrito.find((item) => item.nombre === producto.nombre);
    let nuevaLista;

    if (existe) {
      const nuevaCantidad = existe.cantidad + producto.cantidad;
      if (nuevaCantidad > producto.stock) {
        alert("No hay suficiente stock disponible");
        return;
      }
      nuevaLista = carrito.map((item) => item.nombre === producto.nombre
        ? { ...item, cantidad: nuevaCantidad, descuento: producto.descuento, total: producto.total }
        : item);
    } else {
      nuevaLista = [...carrito, producto];
    }

    setCarrito(nuevaLista);
    actualizarLista(nuevaLista);
};


  // Eliminar un producto del carrito
  const eliminarProducto = (nombre) => {
    const nuevaLista = carrito.filter((item) => item.nombre !== nombre);
    setCarrito(nuevaLista);
    actualizarLista(nuevaLista);
  };

  // Calcular subtotal
  const subtotal = carrito.reduce(
    (acumulado, item) => acumulado + item.precio * item.cantidad,
    0
  );

  // Calcular cantidad total de unidades
  const cantidadTotal = carrito.reduce(
    (acumulado, item) => acumulado + item.cantidad,
    0
  );

  return (
    <div className="container-fluid my-5">

      <h2 className="text-center text-white mb-4 fw-bold display-6">
        Nuestros Productos
      </h2>

      <div className="row">

        {/* COLUMNA DE PRODUCTOS */}
        <div className="col-xl-8 col-lg-8">

          <div className="d-flex flex-wrap justify-content-center gap-4 mb-5">

            <CardProducto nombre="Zapatos" precio={59.99} disponible={true} stock={12} onAgregar={agregarProducto} />
            <CardProducto nombre="Camiseta" precio={19.99} disponible={false} stock={7} onAgregar={agregarProducto} />
            <CardProducto nombre="Gorra" precio={14.99} disponible={true} stock={2} onAgregar={agregarProducto} />

          </div>

          <h3 className="text-white mb-4 fw-bold">
            Secciones
          </h3>

          <SeccionCategoria titulo="Snacks">
            <CardProducto nombre="Kachitos" precio={1.50} disponible={true} stock={12} onAgregar={agregarProducto}/>
            <CardProducto nombre="Chocolates" precio={2.00} disponible={true} stock={5} onAgregar={agregarProducto}/>
            <CardProducto nombre="Papitas" precio={1.00} disponible={true} stock={12} onAgregar={agregarProducto}/>
          </SeccionCategoria>

          <SeccionCategoria titulo="Bebidas">
            <CardProducto nombre="Gaseosa 1.5L" precio={1.75} disponible={true} stock={15} onAgregar={agregarProducto}/>
            <CardProducto nombre="Jugo Natural" precio={1.25} disponible={true} stock={8} onAgregar={agregarProducto}/>
            <CardProducto nombre="Agua Mineral" precio={0.60} disponible={false} stock={1} onAgregar={agregarProducto}/>
          </SeccionCategoria>

          <SeccionCategoria titulo="Bebidas Alcohólicas">
            <CardProducto nombre="Whisky" precio={45.00} disponible={true} stock={20} onAgregar={agregarProducto} esLicor />
            <CardProducto nombre="Ron" precio={35.50} disponible={true} stock={6} onAgregar={agregarProducto} esLicor />
            <CardProducto nombre="Club" precio={3.00} disponible={true} stock={3} onAgregar={agregarProducto} esLicor />
          </SeccionCategoria>

          <SeccionCategoria titulo="Tecnología">
            <CardProducto nombre="Audífonos" precio={25.00} disponible={true} stock={14} onAgregar={agregarProducto}/>
            <CardProducto nombre="Cargador Rápido" precio={12.00} disponible={true} stock={9} onAgregar={agregarProducto}/>
            <CardProducto nombre="Mouse Inalámbrico" precio={15.50} disponible={false} stock={0} onAgregar={agregarProducto}/>
          </SeccionCategoria>

        </div>

        {/* PANEL LATERAL DEL CLIENTE Y CARRITO */}
        <div className="col-xl-4 col-lg-4">

          <div
            className="card shadow-lg border-0 rounded-4 sticky-top"
            style={{ top: "20px" }}
          >

            <div className="card-header bg-primary text-white text-center py-3 rounded-top-4">
              <h4 className="mb-0 fw-bold">
                <i className="bi bi-cart3 me-2"></i>
                Resumen de compra
              </h4>
            </div>

            <div className="card-body">

              {/* CARRITO */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">
                  <i className="bi bi-bag-check me-2"></i>
                  Productos
                </h5>

                <span className="badge bg-primary rounded-pill">
                  {cantidadTotal} unidades
                </span>
              </div>

              {carrito.length === 0 ? (

                <div className="text-center text-muted py-4">
                  <i className="bi bi-cart-x display-4"></i>
                  <p className="mt-2 mb-0">
                    Tu carrito está vacío
                  </p>
                  <small>Agrega algunos productos</small>
                </div>

              ) : (

                <div style={{ maxHeight: "250px", overflowY: "auto" }}>

                  {carrito.map((item) => (

                    <div
                      key={item.nombre}
                      className="border rounded-3 p-2 mb-2"
                    >

                      <div className="d-flex justify-content-between">

                        <div>
                          <strong>{item.nombre}</strong>
                          <div className="text-muted small">
                            {item.cantidad} x ${item.precio.toFixed(2)}
                          </div>
                        </div>

                        <div className="text-end">
                          <strong className="text-success">
                            ${(item.precio * item.cantidad).toFixed(2)}
                          </strong>

                          <br />

                          <button
                            className="btn btn-sm btn-outline-danger mt-1"
                            onClick={() => eliminarProducto(item.nombre)}
                            title="Eliminar producto"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              )}

              <hr />

              {/* TOTALES */}
              <div className="d-flex justify-content-between mb-2">
                <span>Productos:</span>
                <strong>{cantidadTotal}</strong>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal:</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>

              <div className="bg-light rounded-3 p-3 mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold">TOTAL A PAGAR</span>
                  <h4 className="text-success fw-bold mb-0">
                    ${subtotal.toFixed(2)}
                  </h4>
                </div>
              </div>

              {/* BOTONES */}
              <Link className="btn btn-success w-100 fw-bold py-2 mb-2" to="/compras">
                <i className="bi bi-check-circle me-2"></i>
                Continuar a Mis Compras
              </Link>

              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setCarrito([]);
                  actualizarLista([]);
                }}
              >
                <i className="bi bi-trash me-2"></i>
                Vaciar carrito
              </button>

            </div>

            <div className="card-footer text-center text-muted small">
              Gracias por tu preferencia
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Productos;
