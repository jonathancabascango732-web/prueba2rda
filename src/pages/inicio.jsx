import { Link } from 'react-router-dom'; // 🟢 Importamos Link

function Inicio() {
  return (
    <div className="text-center text-white my-5 py-5">
      <h2 className="display-4 fw-bold mb-3">Bienvenidos a la tienda PUCHECHI</h2>
      <p className="lead opacity-75">
        Explora las mejores ofertas y productos exclusivos que tenemos para ti.
      </p>
      
      {/* 🟢 Envolvemos el botón en un Link que apunte a /productos */}
      <Link to="/productos" className="btn btn-info btn-lg mt-3 fw-bold shadow-sm text-dark">
        Ver Catálogo
      </Link>
    </div>
  );
}

export default Inicio;
