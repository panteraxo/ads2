import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus, Minus } from "lucide-react";
import { getPetition } from "../../resources/ApiFunction";
import { useNavigate } from "react-router-dom";

export default function Ventas() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todas");

  useEffect(() => {
    getPetition("producto/all-dto", setProductos);
  }, []);

  console.log(productos);

  const categoriasUnicas = [
    ...new Set(productos.map((producto) => producto.categoria)),
  ].filter((categoria) => categoria);

  console.log(categoriasUnicas);

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const productoExistente = prevCarrito.find(
        (item) => item.id === producto.id
      );
      if (productoExistente) {
        return prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(id);
    } else {
      setCarrito((prevCarrito) =>
        prevCarrito.map((item) =>
          item.id === id ? { ...item, cantidad: nuevaCantidad } : item
        )
      );
    }
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== id));
  };

  const calcularTotal = () => {
    return carrito
      .reduce((total, item) => total + item.precio * item.cantidad, 0)
      .toFixed(2);
  };

  const productosFiltrados = productos.filter((producto) => {
    const coincideBusqueda = producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    const coincideCategoria =
      categoriaSeleccionada === "todas" ||
      producto.categoria === categoriaSeleccionada;
    return coincideBusqueda && coincideCategoria;
  });

  const procederAlPago = () => {
    // Preparar datos para la venta
    const datosVenta = {
      detalles: carrito.map((item) => ({
        cantidad: item.cantidad,
        precio_unitario: item.precio,
        subtotal: item.precio * item.cantidad,
        producto: {
          id: item.id,
          nombre: item.nombre,
          precio: item.precio,
        },
      })),
      resumenVenta: {
        cantidad_total: carrito.reduce(
          (total, item) => total + item.cantidad,
          0
        ),
        precio_total: parseFloat(calcularTotal()),
        fecha: new Date().toISOString(),
      },
    };

    // Navegar al componente de pago con los datos
    navigate("/pago", { state: datosVenta });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-800 p-6">
      {/* Título */}
      <h1 className="text-center text-white text-4xl font-bold mb-8">VENTAS</h1>

      <div className="flex gap-6 max-w-7xl mx-auto">
        {/* Panel Izquierdo - Productos */}
        <div className="flex-1">
          {/* Filtros */}
          <div className="flex gap-4 mb-6">
            <Select
              value={categoriaSeleccionada}
              onValueChange={setCategoriaSeleccionada}
            >
              <SelectTrigger className="w-60 bg-white">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent className="bg-white z-[100]">
                <SelectItem value="todas" className="text-black">
                  Todas las categorías
                </SelectItem>
                {categoriasUnicas && categoriasUnicas.length > 0 ? (
                  categoriasUnicas.map((categoria, index) => (
                    <SelectItem
                      key={`categoria-${index}`}
                      value={categoria}
                      className="text-black"
                    >
                      {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                    </SelectItem>
                  ))
                ) : (
                  <div className="px-2 py-1 text-sm text-gray-500">
                    Cargando categorías...
                  </div>
                )}
              </SelectContent>
            </Select>

            <Input
              placeholder="Buscar producto"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="flex-1 bg-white"
            />
          </div>

          {/* Grid de Productos */}
          <div className="grid grid-cols-3 gap-4">
            {productosFiltrados.map((producto) => (
              <div
                key={producto.id}
                className="bg-white rounded-lg p-4 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => agregarAlCarrito(producto)}
              >
                <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2">
                  {producto.nombre}
                </h3>
                <p className="text-lg font-bold text-gray-900">
                  S/.{producto.precio.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Panel Derecho - Carrito */}
        <div className="w-80 bg-white rounded-lg p-6 h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
            Detalle del pedido
          </h2>

          {/* Lista del carrito */}
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
            {carrito.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-3"
              >
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-800 line-clamp-2">
                    {item.nombre}
                  </h4>
                  <p className="text-sm text-gray-600">
                    S/.{item.precio.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-2 ml-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      actualizarCantidad(item.id, item.cantidad - 1)
                    }
                    className="h-6 w-6 p-0"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>

                  <span className="w-8 text-center text-sm font-medium">
                    {item.cantidad}
                  </span>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      actualizarCantidad(item.id, item.cantidad + 1)
                    }
                    className="h-6 w-6 p-0"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => eliminarDelCarrito(item.id)}
                    className="h-6 w-6 p-0 ml-2"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}

            {carrito.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                No hay productos en el carrito
              </p>
            )}
          </div>

          {/* Total y botón de pago */}
          {carrito.length > 0 && (
            <>
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">
                    Total a pagar
                  </span>
                  <span className="text-xl font-bold text-gray-900">
                    S/.{calcularTotal()}
                  </span>
                </div>
              </div>

              <Button
                className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 text-lg"
                onClick={procederAlPago}
              >
                PROCEDER AL PAGO
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
