import { useEffect, useState } from "react";
import { SingleColumn } from "../../components/columns/SingleColumn";
import SimpleTable from "../../components/SimpleTable";
import { getPetition } from "../../resources/ApiFunction";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ReporteVenta() {
  const [filtering, setFiltering] = useState("");
  const [metodoPagoSeleccionado, setMetodoPagoSeleccionado] = useState("");
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [data, setData] = useState([]);
  const [dataFiltrada, setDataFiltrada] = useState([]);

  const loadProducts = () => {
    getPetition("venta/all-dto", setData);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    let dataParaFiltrar = data;

    if (metodoPagoSeleccionado && metodoPagoSeleccionado !== "") {
      dataParaFiltrar = dataParaFiltrar.filter(
        (venta) => venta.metodoPago === metodoPagoSeleccionado
      );
    }

    if (fechaInicio || fechaFin) {
      dataParaFiltrar = dataParaFiltrar.filter((venta) => {
        const fechaVenta = new Date(venta.fecha);

        if (fechaInicio && !fechaFin) {
          return fechaVenta >= fechaInicio;
        }

        if (!fechaInicio && fechaFin) {
          return fechaVenta <= fechaFin;
        }

        if (fechaInicio && fechaFin) {
          return fechaVenta >= fechaInicio && fechaVenta <= fechaFin;
        }

        return true;
      });
    }

    setDataFiltrada(dataParaFiltrar);
  }, [data, metodoPagoSeleccionado, fechaInicio, fechaFin]);

  const handleMetodoPagoChange = (value) => {
    setMetodoPagoSeleccionado(value);
  };

  return (
    <>
      <div className="bg-white py-16 flex flex-col ">
        <h2 className="scroll-m-20 text-black pb-2 text-3xl text-center font-semibold tracking-tight first:mt-0">
          REPORTE DE VENTAS
        </h2>
        <div className="flex flex-col w-full items-center  ">
          <div className="flex flex-col w-1/2 mb-4">
            {/* Selector de rango de fechas */}
            <label className="text-sm font-medium text-gray-700 mb-2">
              📅 Filtrar por rango de fechas
            </label>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs text-gray-600 mb-1 block">
                  Fecha inicio
                </label>
                <DatePicker
                  selected={fechaInicio}
                  onChange={(date) => setFechaInicio(date)}
                  selectsStart
                  startDate={fechaInicio}
                  endDate={fechaFin}
                  placeholderText="Seleccionar fecha inicio"
                  dateFormat="dd/MM/yyyy"
                  isClearable
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs text-gray-600 mb-1 block">
                  Fecha fin
                </label>
                <DatePicker
                  selected={fechaFin}
                  onChange={(date) => setFechaFin(date)}
                  selectsEnd
                  startDate={fechaInicio}
                  endDate={fechaFin}
                  minDate={fechaInicio}
                  placeholderText="Seleccionar fecha fin"
                  dateFormat="dd/MM/yyyy"
                  isClearable
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <label className="text-sm font-medium text-gray-700 mb-2">
              💳 Buscar por método de pago
            </label>
            <Select
              value={metodoPagoSeleccionado}
              onValueChange={handleMetodoPagoChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona método de pago" />
              </SelectTrigger>
              <SelectContent className="bg-white z-[100]">
                <SelectItem>Todos los métodos</SelectItem>
                <SelectItem value="tarjeta_credito">
                  💳 Tarjeta de Crédito
                </SelectItem>
                <SelectItem value="paypal">🌐 PayPal</SelectItem>
                <SelectItem value="efectivo">💵 Efectivo</SelectItem>
                <SelectItem value="transferencia">🏦 Transferencia</SelectItem>
                <SelectItem value="yape">📱 Yape</SelectItem>
                <SelectItem value="plin">📱 Plin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-center gap-5 mt-4">
          <Button className="bg-blue-800 hover:bg-blue-900 text-white cursor-pointer">
            📋 Generar Reporte
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
            disabled={dataFiltrada.length === 0}
          >
            📄 Generar PDF ({dataFiltrada.length} ventas)
          </Button>
        </div>
      </div>

      <SimpleTable
        filtering={filtering}
        setFiltering={setFiltering}
        columns={SingleColumn({ data: dataFiltrada })}
        data={dataFiltrada}
      />
    </>
  );
}
