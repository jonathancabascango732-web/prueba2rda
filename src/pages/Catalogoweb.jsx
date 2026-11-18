import { useEffect, useState } from "react";
import CardProducto from "../components/cardProducto";

function Catalogo({ lista = [], actualizarLista }) {
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://dummyjson.com/products", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
        return res.json();
      })
      .then((datos) => {
        setProductos(Array.isArray(datos.products) ? datos.products : []);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        console.error("Error al cargar productos:", err);
        setError("No se pudieron cargar los productos");
      })
      .finally(() => setCargando(false));

    return () => controller.abort();
  }, []);

  function agregarProducto(producto) {
    if (actualizarLista) actualizarLista([...lista, producto]);
  }

  if (cargando) {
    return <p className="text-white text-center fs-4">Cargando catálogo web...</p>;
  }

  if (error) {
    return <p className="text-white text-center fs-4">{error}</p>;
  }

  return (
    <div>
      <h2 className="text-white text-center mb-4">Catálogo Web ({productos.length} productos)</h2>
      <div className="d-flex flex-wrap justify-content-center gap-4">
        {productos.map((item) => (
          <CardProducto
            key={item.id}
            nombre={item.title}
            precio={item.price}
            stock={item.stock}
            imagen={item.thumbnail}
            disponible={item.stock > 0}
            onAgregar={agregarProducto}
          />
        ))}
      </div>
    </div>
  );
}

export default Catalogo;
