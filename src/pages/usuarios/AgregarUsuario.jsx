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

export default function AgregarUsuario() {
  return (
    <div className="flex justify-center items-center h-full">
      <form className="bg-white w-full max-w-xl rounded-lg shadow-md p-8 mx-auto my-10">
        <h1 className="text-center font-bold text-3xl mb-10">
          AGREGAR USUARIO
        </h1>

        <div className="space-y-6">
          <Input placeholder="Ingresar nombre" className="w-full " />

          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona Rol" />
            </SelectTrigger>
            <SelectContent className="bg-white z-[100]">
              <SelectItem value="admin">Administrador</SelectItem>
              <SelectItem value="cajero">Cajero</SelectItem>
              <SelectItem value="almacenero">Almacenero</SelectItem>
            </SelectContent>
          </Select>

          <Input placeholder="Ingresar direccion" className="w-full " />
          <div className="gap-2 flex">
            <Input placeholder="Correo" className="w-1/2 " />
            <Input placeholder="Nombre de usuario" className="w-1/2 " />
          </div>
          <div className="gap-2 flex">
            <Input placeholder="Contraseña" className="w-1/2" type="password" />
            <Input
              placeholder="Confirmar contraseña"
              className="w-1/2"
              type="password"
            />
          </div>
        </div>

        <div className="flex justify-center gap-5 mt-10">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-2 rounded-md w-36">
            AGREGAR
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
