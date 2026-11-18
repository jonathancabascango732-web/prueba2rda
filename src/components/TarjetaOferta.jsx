function TarjetaOferta({ nombre, precio, descuento, agregar }) {
  const valorDescuento = (precio * descuento) / 100;
  const precioFinal = precio - valorDescuento;
  const iva = precioFinal * 0.15;
  const precioConIva = precioFinal + iva;
  const etiqueta = descuento >= 10 ? "¡Gran oferta!" : "Oferta";
  const colorEtiqueta = descuento >= 10 ? "bg-danger" : "bg-secondary";

  const enviarOferta = () => {
    agregar({
      nombre,
      precio: Number(precioFinal.toFixed(2)),
      precioOriginal: Number(precio.toFixed(2)),
      descuento,
      cantidad: 1,
      stock: 99,
      total: Number(precioFinal.toFixed(2)),
      esLicor: false,
      esOferta: true,
    });
  };

  return (
    <article className="card h-100 shadow-sm border-0 rounded-4">
      <div className="card-body d-flex flex-column text-start">
        <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
          <span className={`badge ${colorEtiqueta}`}>{etiqueta}</span>
          <span className="badge bg-primary">Descuento: {descuento.toFixed(1)}%</span>
        </div>

        <h5 className="card-title fw-bold">{nombre}</h5>
        <p className="text-muted small mb-1">
          Precio original: <span className="text-decoration-line-through">${precio.toFixed(2)}</span>
        </p>
        <p className="mb-1">Valor Descuento: <strong className="text-danger">-${valorDescuento.toFixed(2)}</strong></p>
        <h4 className="text-success fw-bold my-2"> Precio Final: ${precioFinal.toFixed(2)}</h4>
        <p className="small text-muted mb-1">IVA (15%): ${iva.toFixed(2)}</p>
        <p className="fw-semibold mb-3">Precio con IVA: ${precioConIva.toFixed(2)}</p>

        <button type="button" className="btn btn-primary mt-auto" onClick={enviarOferta}>
          <i className="bi bi-cart-plus me-2"></i>
          Agregar oferta
        </button>
      </div>
    </article>
  );
}

export default TarjetaOferta;
