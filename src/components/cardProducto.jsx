function CardProducto({ nombre, precio, disponible = true, stock = 0, imagen, onAgregar, esLicor = false }) {
  function agregarAlCarrito() {
    if (!disponible || stock <= 0 || !onAgregar) return;

    onAgregar({
      nombre,
      precio,
      stock,
      cantidad: 1,
      descuento: 0,
      total: precio,
    });
  }

  return (
    <article className="card shadow-sm" style={{ width: "18rem" }}>
      {imagen && (
        <img
          src={imagen}
          className="card-img-top"
          alt={nombre}
          style={{ height: "180px", objectFit: "cover" }}
        />
      )}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{nombre}</h5>
        {esLicor && <span className="badge text-bg-warning align-self-start mb-2">Bebida alcohólica</span>}
        <p className="card-text mb-1">Precio: ${Number(precio).toFixed(2)}</p>
        <p className="card-text text-muted">Stock: {stock}</p>
        <button
          type="button"
          className="btn btn-primary mt-auto"
          onClick={agregarAlCarrito}
          disabled={!disponible || stock <= 0}
        >
          {disponible && stock > 0 ? "Agregar al carrito" : "Agotado"}
        </button>
        <p className="card-text mt-2 text-muted" style={{ fontSize: "0.8rem" }}>
          {disponible ? "Disponible" : "No disponible"}
        </p>
      </div>
    </article>
  );
}

export default CardProducto;
