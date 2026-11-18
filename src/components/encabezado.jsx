import { Link } from 'react-router-dom'; // 🟢 Importamos el enlazador de rutas

function Encabezado({ titulo, cantidadComprada }) {
  return (
    <>
      <header className="text-center text-white py-4">
        <h1 className="display-4 fw-bold">{titulo}</h1>
      </header>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded shadow-sm container">
        <div className="container-fluid">
          {}
          <Link className="navbar-brand fw-bold text-info" to="/">{titulo}</Link>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {}
                <Link className="nav-link" to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                {}
                <Link className="nav-link" to="/productos">Productos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/ofertas">Ofertas</Link>
              </li>
              {}
                <li className="nav-item">
             <Link className="nav-link" to="/contactos">Contacto</Link> 
            </li>
              {}
                <li className="nav-item">
             <Link className="nav-link" to="/compras">
               Mis Compras 
             </Link>
              <li className="nav-item">
            <Link className="nav-link" to="/catalogo">Catálogo Web</Link>
              </li>
             
            </li>
              
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Categorías
                </a>
                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" to="/productos">Ropa</Link></li>
                  <li><Link className="dropdown-item" to="/productos">Calzado</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/ofertas">Ofertas Especiales</Link></li>
                </ul>
              </li>
            </ul>
            
            <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
              <input className="form-control me-2" type="search" placeholder="Buscar producto..." aria-label="Search" />
              <button className="btn btn-outline-info" type="submit">Buscar</button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Encabezado;
