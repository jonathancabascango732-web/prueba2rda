function Pie() {
  return (
    <footer className="bg-dark text-white mt-5 py-4 w-100 shadow-lg">
      <div className="container text-center">
        <div className="row justify-content-center mb-3">
          <div className="col-auto">
            <a href="#" className="text-info text-decoration-none mx-3 fw-semibold">Términos</a>
            <a href="#" className="text-info text-decoration-none mx-3 fw-semibold">Privacidad</a>
            <a href="#" className="text-info text-decoration-none mx-3 fw-semibold">Contacto</a>
          </div>
        </div>
        <hr className="border-secondary my-3" />
        <p className="mb-0 text-light opacity-75">
          &copy; {new Date().getFullYear()} <span className="text-info fw-bold">Tienda PUCHECHI</span>. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Pie;
