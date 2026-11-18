import { useEffect, useState } from "react";
function Contactos() {
  // Estado para capturar los datos del formulario si los necesitas en el futuro
  const [formulario, setFormulario] = useState({ nombre: '', email: '', mensaje: '' });

  const manejaEnvio = (e) => {
    e.preventDefault();
    alert(`¡Gracias ${formulario.nombre}! Tu mensaje ha sido enviado con éxito. Nos contactaremos contigo pronto.`);
    setFormulario({ nombre: '', email: '', mensaje: '' }); // Limpia el formulario
  };

  return (
    <div className="container my-5">
      <h2 className="text-center text-white mb-5 fw-bold display-6">Contáctanos</h2>

      <div className="row g-5">
        {/* Columna Izquierda: Información de la tienda */}
        <div className="col-12 col-md-5 text-white">
          <div className="bg-dark p-4 rounded shadow-sm h-100 border border-secondary">
            <h4 className="text-info fw-bold mb-4">Información de Contacto</h4>
            <p className="opacity-75">¿Tienes alguna duda o inconveniente con tu pedido? Escríbenos o búscanos en nuestros canales oficiales.</p>
            
            <ul className="list-unstyled mt-4">
              <li className="mb-3">
                <i className="bi bi-geo-alt-fill text-info me-2"></i>
                <strong>Dirección:</strong> Av. Principal, Ibarra, Ecuador
              </li>
              <li className="mb-3">
                <i className="bi bi-telephone-fill text-info me-2"></i>
                <strong>Teléfono:</strong> +593 99 999 9999
              </li>
              <li className="mb-3">
                <i className="bi bi-envelope-fill text-info me-2"></i>
                <strong>Correo:</strong> soporte@puchechi.com
              </li>
              <li>
                <i className="bi bi-clock-fill text-info me-2"></i>
                <strong>Horario:</strong> Lunes a Viernes (09:00 - 18:00)
              </li>
            </ul>
          </div>
        </div>

        {/* Columna Derecha: Formulario de Contacto */}
        <div className="col-12 col-md-7">
          <form onSubmit={manejaEnvio} className="bg-dark p-4 rounded shadow-sm border border-secondary text-white">
            <h4 className="text-info fw-bold mb-4">Envíanos un mensaje</h4>
            
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label fw-semibold">Nombre Completo</label>
              <input 
                type="text" 
                className="form-control bg-secondary text-white border-0" 
                id="nombre" 
                required 
                value={formulario.nombre}
                onChange={(e) => setFormulario({...formulario, nombre: e.target.value})}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">Correo Electrónico</label>
              <input 
                type="email" 
                className="form-control bg-secondary text-white border-0" 
                id="email" 
                required 
                value={formulario.email}
                onChange={(e) => setFormulario({...formulario, email: e.target.value})}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="mensaje" className="form-label fw-semibold">Tu Mensaje</label>
              <textarea 
                className="form-control bg-secondary text-white border-0" 
                id="mensaje" 
                rows="4" 
                required
                value={formulario.mensaje}
                onChange={(e) => setFormulario({...formulario, mensaje: e.target.value})}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-info w-100 fw-bold shadow-sm text-dark">
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contactos; 