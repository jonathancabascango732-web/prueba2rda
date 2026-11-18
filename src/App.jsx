import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Encabezado from './components/encabezado.jsx'
import Pie from './components/pie.jsx'
import Inicio from "./pages/inicio.jsx"
import Productos from './pages/productos.jsx' 
import Contactos from './pages/contactos.jsx'
import Compras from './pages/compras.jsx'
import Catalogo from './pages/Catalogoweb.jsx'
import Ofertas from './pages/Ofertas.jsx'
function App() {
  const [lista, setLista] = useState([])

  const cantidadComprada = lista.reduce((total, producto) => total + producto.cantidad, 0)

  console.log("lista:", lista);
  return (
    <BrowserRouter>
      <Encabezado titulo="Tienda PUCHECHI" cantidadComprada={cantidadComprada} />

      <main className="container my-5">  
        <Routes>
          <Route path="/" element={<Inicio />} /> 
          <Route path="/productos" element={<Productos lista={lista} actualizarLista={setLista}/>} /> 
          <Route path="/compras" element={<Compras lista={lista} actualizarLista={setLista} />} /> 
          <Route path="/contactos" element={<Contactos />} /> 
          <Route path="/catalogo" element={<Catalogo lista={lista} actualizarLista={setLista} />} />
          <Route path="/ofertas" element={<Ofertas lista={lista} actualizarLista={setLista} />} />
        </Routes>
      </main>

      <Pie />
    </BrowserRouter>
  )
}

export default App;
