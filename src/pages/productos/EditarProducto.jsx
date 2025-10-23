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

export default function EditarProducto() {
  console.log("estas en editar");

  return (
    <div className="flex justify-center items-center h-full">
      <form className="bg-white w-full max-w-xl rounded-lg shadow-md p-8 mx-auto my-10">
        <h1 className="text-center font-bold text-3xl mb-10">
          EDITAR PRODUCTO
        </h1>

        <div className="space-y-6">
          <Input placeholder="Ingresar nombre" className="w-full " />

          <Input placeholder="Ingresar precio" className="w-full" />

          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona categoria" />
            </SelectTrigger>
            <SelectContent className="bg-white z-[100]">
              <SelectItem value="electronica">Electrónica</SelectItem>
              <SelectItem value="ropa">Ropa</SelectItem>
              <SelectItem value="hogar">Hogar</SelectItem>
              <SelectItem value="alimentos">Alimentos</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona proveedor" />
            </SelectTrigger>
            <SelectContent className="bg-white z-[100]">
              <SelectItem value="proveedor1">Proveedor 1</SelectItem>
              <SelectItem value="proveedor2">Proveedor 2</SelectItem>
              <SelectItem value="proveedor3">Proveedor 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-center gap-5 mt-10">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-2 rounded-md w-36">
            EDITAR
          </Button>
          <Link to="/productos">
            <Button className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-2 rounded-md w-36">
              CANCELAR
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
