import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";

export default function AgregarMovimiento() {
  return (
    <div className="flex justify-center items-center h-full">
      <form className="bg-white w-full max-w-xl rounded-lg shadow-md p-8 mx-auto my-10">
        <h1 className="text-center font-bold text-3xl mb-10">
          ENTRADAS Y SALIDAS
        </h1>

        <div className="space-y-6">
          <Input placeholder="Buscar producto" className="w-full " />

          <Input placeholder="Ingresar cantidad" className="w-full" />
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Motivo" />
            </SelectTrigger>
            <SelectContent className="bg-white z-[100]">
              <SelectItem value="motivo1">Motivo 1</SelectItem>
              <SelectItem value="motivo2">Motivo 2</SelectItem>
              <SelectItem value="motivo3">Motivo 3</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="Observaciones" className="w-full" />
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
