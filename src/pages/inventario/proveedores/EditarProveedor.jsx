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

export default function EditarProveedor() {
  return (
    <div className="flex justify-center items-center h-full">
      <form className="bg-white w-full max-w-xl rounded-lg shadow-md p-8 mx-auto my-10">
        <h1 className="text-center font-bold text-3xl mb-10">
          EDITAR PROVEEDOR
        </h1>

        <div className="space-y-6">
          <Input placeholder="RUC" className="w-full " />

          <Input placeholder="Razón social" className="w-full" />
          <Input placeholder="Telefono" className="w-full" />
          <Input placeholder="Correo" className="w-full" />
          <Input placeholder="Direccion" className="w-full" />
        </div>

        <div className="flex justify-center gap-5 mt-10">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-2 rounded-md w-36">
            AGREGAR
          </Button>
          <Link to="/inventario/proveedores">
            <Button className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-2 rounded-md w-36">
              CANCELAR
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
