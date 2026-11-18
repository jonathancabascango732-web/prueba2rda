import { useEffect, useState } from "react";
import TarjetaOferta from "../components/TarjetaOferta";

function Ofertas({ lista, actualizarLista }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const controlador = new AbortController();

    const consultarProductos = async () => {
      try {
        setCargando(true);
        setError("");

        const respuesta = await fetch("https://dummyjson.com/products?limit=12", {
          signal: controlador.signal,
        });

        if (!respuesta.ok) {
          throw new Error("No se pudieron consultar los productos.");
        }

        const datos = await respuesta.json();
        setProductos(datos.products || []);
      } catch (errorConsulta) {
        if (errorConsulta.name !== "AbortError") {
          setError("No fue posible cargar las ofertas. Comprueba tu conexión e inténtalo nuevamente.");
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCargando(false);
        }
      }
    };

    consultarProductos();

    return () => controlador.abort();
  }, []);

  // Calcular el ahorro con un ciclo for
  let ahorroTotal = 0;
  for (let i = 0; i < productos.length; i++) {
    const valorDescuento = (productos[i].price * productos[i].discountPercentage) / 100;
    ahorroTotal += valorDescuento;
  }

  const agregarOferta = (oferta) => {
    actualizarLista((listaActual) => {
      const existe = listaActual.find((producto) => producto.nombre === oferta.nombre);

      if (existe) {
        return listaActual.map((producto) =>
          producto.nombre === oferta.nombre
            ? { ...producto, cantidad: producto.cantidad + 1 }
            : producto
        );
      }

      return [...listaActual, oferta];
    });

    setMensaje(`${oferta.nombre} se agregó a Mis Compras con el precio de oferta.`);
    window.setTimeout(() => setMensaje(""), 3000);
  };

  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <span className="badge bg-warning text-dark mb-2">PUCHECHI</span>
        <h2 className="text-white fw-bold display-6">Ofertas de la semana</h2>
        <p className="text-white mb-0">Aprovecha nuestros productos con descuentos especiales.</p>
      </div>

      <div className="alert alert-info d-flex flex-wrap justify-content-between align-items-center gap-2 shadow-sm">
        <span className="fw-semibold">Ahorro total disponible en estas ofertas</span>
        <strong className="fs-5">${ahorroTotal.toFixed(2)}</strong>
      </div>

      {mensaje && <div className="alert alert-success" role="status">{mensaje}</div>}

      {cargando && (
        <div className="text-center text-white py-5">
          <div className="spinner-border" role="status" aria-label="Cargando"></div>
          <p className="mt-3">Cargando ofertas...</p>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
          <button className="btn btn-sm btn-outline-danger ms-3" onClick={() => window.location.reload()}>
            Reintentar
          </button>
        </div>
      )}

      {!cargando && !error && (
        <>
          <div className="row g-4">
            {productos.map((producto) => (
              <div className="col-12 col-sm-6 col-lg-4" key={producto.id}>
                <TarjetaOferta
                  nombre={producto.title}
                  precio={producto.price}
                  descuento={producto.discountPercentage}
                  agregar={agregarOferta}
                />
              </div>
            ))}
          </div>
          {productos.length === 0 && <p className="text-center text-white">No hay ofertas disponibles.</p>}
        </>
      )}

      <div className="text-center mt-4">
        <p className="text-white small mb-0">Productos seleccionados en el carrito: {lista.length}</p>
      </div>
    </div>
  );
}

export default Ofertas;
