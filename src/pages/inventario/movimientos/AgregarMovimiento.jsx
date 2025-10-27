import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Selecto from "react-select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getPetition, postPetition } from "../../../resources/ApiFunction";

export default function AgregarMovimiento() {
  const [tipoMovimiento, setTipoMovimiento] = useState("Entrada");
  const [productos, setProductos] = useState([]);
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  useEffect(() => {
    getPetition("producto/all-dto", setProductos);
    setValue("tipo", "Entrada");
  }, [setValue]);
  const options = productos.map((producto) => ({
    value: producto.id,
    label: producto.nombre,
  }));

  // Función para manejar cambio del RadioGroup
  const handleTipoMovimientoChange = (value) => {
    setTipoMovimiento(value);
    setValue("tipo", value);
  };

  const onSubmit = async (data) => {
    try {
      await postPetition("movimiento/add", data, (response) => {
        console.log(response);
        navigate("/inventario/movimientos");
      });
    } catch (error) {
      console.log("Error al crear Movimiento", error);
    }
  };
  /* const onSubmit = (data) => console.log(data); */

  return (
    <div className="flex justify-center items-center h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-xl rounded-lg shadow-md p-8 mx-auto my-10"
      >
        <h1 className="text-center font-bold text-3xl mb-10">
          ENTRADAS Y SALIDAS
        </h1>

        <div className="space-y-6">
          <RadioGroup
            value={tipoMovimiento}
            onValueChange={handleTipoMovimientoChange}
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="Entrada" id="r1" />
              <label htmlFor="r1">Entrada</label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="Salida" id="r2" />
              <label htmlFor="r2">Salida</label>
            </div>
          </RadioGroup>
          <Selecto
            options={options}
            onChange={(selected) => setValue("producto", selected.value)}
          />

          <Input
            type="number"
            placeholder="Ingresar cantidad"
            className="w-full"
            {...register("cantidad")}
          />
          {tipoMovimiento === "Entrada" ? (
            <Select onValueChange={(value) => setValue("motivo", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Motivo" />
              </SelectTrigger>
              <SelectContent className="bg-white z-[100]">
                <SelectItem value="Compra">Compra</SelectItem>
                <SelectItem value="Devolucion_Cliente">
                  Devolución de cliente
                </SelectItem>
                <SelectItem value="Ajuste">Ajuste</SelectItem>
                <SelectItem value="Produccion">Producción</SelectItem>
                <SelectItem value="Transferencia">Transferencia</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <Select onValueChange={(value) => setValue("motivo", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Motivo" />
              </SelectTrigger>
              <SelectContent className="bg-white z-[100]">
                <SelectItem value="Venta">Venta</SelectItem>
                <SelectItem value="Merma">Merma</SelectItem>
                <SelectItem value="Devolucion_Proveedor">
                  Devolución a proveedor
                </SelectItem>
                <SelectItem value="Ajuste_Negativo">Ajuste negativo</SelectItem>
                <SelectItem value="Transferencia">Transferencia</SelectItem>
              </SelectContent>
            </Select>
          )}
          <Input
            placeholder="Observaciones"
            className="w-full"
            {...register("observaciones")}
          />
        </div>

        <div className="flex justify-center gap-5 mt-10">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-2 rounded-md w-36">
            AGREGAR
          </Button>
          <Link to="/inventario/movimientos">
            <Button className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-2 rounded-md w-36">
              CANCELAR
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
