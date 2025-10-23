import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Home from "./pages/Home";
import Productos from "./pages/productos/Productos";
import Proveedores from "./pages/inventario/proveedores/Proveedores";
import EditarProveedor from "./pages/inventario/proveedores/EditarProveedor";
import AgregarProveedor from "./pages/inventario/proveedores/AgregarProveedor";
import Usuarios from "./pages/usuarios/Usuarios";
import AgregarUsuario from "./pages/usuarios/AgregarUsuario";
import EditarUsuario from "./pages/usuarios/EditarUsuario";
import Ventas from "./pages/ventas/Ventas";
import Login from "./pages/login/Login";
import UserProvider from "./context/UserContext";
import Reportes from "./pages/reportes/Reportes";
import Movimientos from "./pages/inventario/movimientos/Movimientos";
import Inventario from "./pages/inventario/Inventario";
import AgregarProducto from "./pages/productos/AgregarProducto";
import EditarProducto from "./pages/productos/EditarProducto";
import AgregarMovimiento from "./pages/inventario/movimientos/AgregarMovimiento";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <UserProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
              </Routes>

              <Routes>
                <Route element={<RootLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/productos" element={<Productos />} />
                  <Route
                    path="/productos/agregar"
                    element={<AgregarProducto />}
                  />
                  <Route
                    path="/productos/editar"
                    element={<EditarProducto />}
                  />

                  <Route path="/usuarios" element={<Usuarios />} />
                  <Route
                    path="/usuarios/agregar"
                    element={<AgregarUsuario />}
                  />
                  <Route path="/usuarios/editar" element={<EditarUsuario />} />
                  <Route path="/inventario" element={<Inventario />} />
                  <Route
                    path="/inventario/movimientos"
                    element={<Movimientos />}
                  />
                  <Route
                    path="/inventario/movimientos/agregar"
                    element={<AgregarMovimiento />}
                  />
                  <Route
                    path="/inventario/proveedores"
                    element={<Proveedores />}
                  />
                  <Route
                    path="/inventario/proveedores/agregar"
                    element={<AgregarProveedor />}
                  />
                  <Route
                    path="/inventario/proveedores/editar"
                    element={<EditarProveedor />}
                  />
                  <Route path="/reportes" element={<Reportes />} />
                  <Route path="/ventas" element={<Ventas />} />
                </Route>
              </Routes>
            </UserProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
