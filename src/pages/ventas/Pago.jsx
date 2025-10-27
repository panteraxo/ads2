import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { postPetition } from "../../resources/ApiFunction";

export default function Pago() {
  const location = useLocation();
  const navigate = useNavigate();
  const [procesandoPago, setProcesandoPago] = useState(false);

  // React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      metodo_pago: "",
    },
  });

  // Obtener datos de la venta desde la navegación
  const datosVenta = location.state;

  // Observar el valor del método de pago
  const metodoPago = watch("metodo_pago");

  useEffect(() => {
    // Si no hay datos de venta, redirigir a ventas
    if (!datosVenta) {
      navigate("/ventas");
    }
  }, [datosVenta, navigate]);

  // Función para agrupar productos duplicados
  const agruparProductos = (detalles) => {
    const productosAgrupados = {};

    detalles.forEach((detalle) => {
      const productoId = detalle.producto.id;

      if (productosAgrupados[productoId]) {
        // Si el producto ya existe, sumar la cantidad
        productosAgrupados[productoId].cantidad += detalle.cantidad;
        productosAgrupados[productoId].subtotal =
          productosAgrupados[productoId].cantidad *
          productosAgrupados[productoId].precio_unitario;
      } else {
        // Si es un producto nuevo, agregarlo
        productosAgrupados[productoId] = {
          cantidad: detalle.cantidad,
          precio_unitario: detalle.precio_unitario,
          subtotal: detalle.subtotal,
          producto: detalle.producto,
        };
      }
    });

    return Object.values(productosAgrupados);
  };

  const onSubmit = async (formData) => {
    console.log("Datos del formulario:", formData);

    setProcesandoPago(true);

    try {
      // Agrupar productos duplicados antes de enviar
      const detallesAgrupados = agruparProductos(datosVenta.detalles);

      console.log("Detalles originales:", datosVenta.detalles);
      console.log("Detalles agrupados:", detallesAgrupados);

      // Preparar datos según el formato esperado por el backend
      const ventaRequestDTO = {
        metodo_pago: formData.metodo_pago,
        detalles: detallesAgrupados.map((detalle) => ({
          cantidad: detalle.cantidad,
          precio_unitario: detalle.precio_unitario,
          producto: detalle.producto.id, // Solo el ID del producto
        })),
      };

      console.log("Datos a enviar al backend:", ventaRequestDTO);

      // Enviar al endpoint del backend
      await postPetition("venta/add-completa", ventaRequestDTO, (response) => {
        console.log("Venta registrada exitosamente:", response);

        // Mostrar mensaje de éxito con detalles
        const mensaje = `¡Venta procesada exitosamente!

Código de venta: ${response.cod_venta}
Total: S/.${response.precio_total.toFixed(2)}
Método de pago: ${formData.metodo_pago}`;

        alert(mensaje);

        // Redirigir a ventas
        navigate("/ventas");
      });
    } catch (error) {
      console.error("Error al procesar la venta:", error);

      // Mostrar mensaje de error más específico
      let mensajeError = "Error al procesar la venta. Inténtalo de nuevo.";

      if (
        error.response &&
        error.response.data &&
        error.response.data.mensaje
      ) {
        mensajeError = error.response.data.mensaje;
      }

      alert(mensajeError);
    } finally {
      setProcesandoPago(false);
    }
  };

  const handleMetodoPagoChange = (value) => {
    setValue("metodo_pago", value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  if (!datosVenta) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-800 p-6 flex items-center justify-center">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    );
  }

  // Agrupar productos para mostrar en el resumen
  const detallesParaMostrar = agruparProductos(datosVenta.detalles);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-800 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-center text-white text-4xl font-bold mb-8">
          PROCESAR PAGO
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded-lg p-6">
            {/* Resumen de la compra */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Resumen de la compra
              </h2>

              {/* Mostrar aviso si hay productos agrupados */}
              {detallesParaMostrar.length !== datosVenta.detalles.length && (
                <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 text-sm">
                    ℹ️ Se han agrupado productos duplicados:{" "}
                    {datosVenta.detalles.length} → {detallesParaMostrar.length}{" "}
                    ítems
                  </p>
                </div>
              )}

              <div className="space-y-2 mb-4">
                {detallesParaMostrar.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b pb-2"
                  >
                    <div>
                      <span className="font-medium">
                        {item.producto.nombre}
                      </span>
                      <span className="text-gray-600 ml-2">
                        x{item.cantidad}
                      </span>
                      <span className="text-gray-500 text-sm block">
                        S/.{item.precio_unitario.toFixed(2)} c/u
                      </span>
                    </div>
                    <span className="font-medium">
                      S/.{item.subtotal.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">
                    Total productos:{" "}
                    {detallesParaMostrar.reduce(
                      (total, item) => total + item.cantidad,
                      0
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total a pagar:</span>
                  <span>
                    S/.
                    {detallesParaMostrar
                      .reduce((total, item) => total + item.subtotal, 0)
                      .toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Selección de método de pago */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                Método de pago
              </h3>

              <Select value={metodoPago} onValueChange={handleMetodoPagoChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona método de pago" />
                </SelectTrigger>
                <SelectContent className="bg-white z-[100]">
                  <SelectItem value="efectivo" className="text-black">
                    💵 Efectivo
                  </SelectItem>
                  <SelectItem value="tarjeta_credito" className="text-black">
                    💳 Tarjeta de Crédito
                  </SelectItem>
                  <SelectItem value="tarjeta_debito" className="text-black">
                    💳 Tarjeta de Débito
                  </SelectItem>
                  <SelectItem value="transferencia" className="text-black">
                    🏦 Transferencia Bancaria
                  </SelectItem>
                  <SelectItem value="yape" className="text-black">
                    📱 Yape
                  </SelectItem>
                  <SelectItem value="plin" className="text-black">
                    📱 Plin
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Campo oculto para React Hook Form */}
              <input
                type="hidden"
                {...register("metodo_pago", {
                  required: "Por favor selecciona un método de pago",
                })}
              />

              {/* Mostrar error de validación */}
              {errors.metodo_pago && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.metodo_pago.message}
                </p>
              )}
            </div>

            {/* Información adicional para el usuario */}
            {metodoPago && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-2">
                  Método seleccionado:{" "}
                  {metodoPago.replace("_", " ").toUpperCase()}
                </h4>
                <p className="text-blue-600 text-sm">
                  {metodoPago === "efectivo" &&
                    "Asegúrate de tener el monto exacto."}
                  {metodoPago === "tarjeta_credito" &&
                    "Se procesará el pago con tarjeta de crédito."}
                  {metodoPago === "tarjeta_debito" &&
                    "Se procesará el pago con tarjeta de débito."}
                  {metodoPago === "transferencia" &&
                    "Se generarán los datos para la transferencia."}
                  {metodoPago === "yape" &&
                    "Se mostrará el QR para el pago con Yape."}
                  {metodoPago === "plin" &&
                    "Se mostrará el QR para el pago con Plin."}
                </p>
              </div>
            )}

            {/* Información de debug (solo en desarrollo) */}
            {process.env.NODE_ENV === "development" && (
              <div className="mb-6 p-3 bg-gray-100 rounded text-xs">
                <strong>Debug:</strong> Válido: {isValid ? "Sí" : "No"} |
                Productos originales: {datosVenta.detalles.length} | Productos
                agrupados: {detallesParaMostrar.length} | Método:{" "}
                {metodoPago || "No seleccionado"}
              </div>
            )}

            {/* Botones */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => navigate("/ventas")}
                disabled={procesandoPago}
              >
                ← Volver a Ventas
              </Button>

              <Button
                type="submit"
                className="flex-1 bg-green-700 hover:bg-green-800 text-white font-bold"
                disabled={procesandoPago || !isValid}
              >
                {procesandoPago ? (
                  <>
                    <span className="mr-2">⏳</span>
                    Procesando...
                  </>
                ) : (
                  <>
                    <span className="mr-2">✅</span>
                    CONFIRMAR PAGO
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
