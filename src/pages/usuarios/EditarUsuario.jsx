import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getPetition, putPetition } from "../../resources/ApiFunction";
import { useForm } from "react-hook-form";

export default function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      id: Number(id),
    },
  });
  useEffect(() => {
    getPetition(`usuario/buscar/${id}`, (data) => {
      setValue("nombre", data.nombre);
      setValue("rol", data.rol);
      setValue("direccion", data.direccion);
      setValue("correo", data.correo);
      setValue("nombre_usuario", data.nombreUsuario);
      setValue("contrasena", data.contrasena);
      console.log("Datos del usuario:", data);
    });
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await putPetition(`usuario/update/${id}`, data, (response) => {
        console.log(response);
        navigate("/usuarios");
      });
    } catch (error) {
      console.log("Error al editar Usuario", error);
    }
  };
  return (
    <div className="flex justify-center items-center h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-xl rounded-lg shadow-md p-8 mx-auto my-10"
      >
        <h1 className="text-center font-bold text-3xl mb-10">EDITAR USUARIO</h1>

        <div className="space-y-6">
          <Input
            placeholder="Ingresar nombre"
            className="w-full "
            {...register("nombre")}
          />

          <Select
            value={watch("rol")}
            onValueChange={(value) => setValue("rol", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona Rol" />
            </SelectTrigger>
            <SelectContent className="bg-white z-[100]">
              <SelectItem value="Administrador">Administrador</SelectItem>
              <SelectItem value="Cajero">Cajero</SelectItem>
              <SelectItem value="Almacenero">Almacenero</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Ingresar direccion"
            className="w-full "
            {...register("direccion")}
          />
          <div className="gap-2 flex">
            <Input
              placeholder="Correo"
              className="w-1/2 "
              {...register("correo")}
            />
            <Input
              placeholder="Nombre de usuario"
              className="w-1/2 "
              {...register("nombre_usuario")}
            />
          </div>
          <div className="gap-2 flex">
            <Input
              placeholder="Contraseña"
              className="w-1/2"
              type="password"
              {...register("contrasena")}
            />
            <Input
              placeholder="Confirmar contraseña"
              className="w-1/2"
              type="password"
            />
          </div>
        </div>

        <div className="flex justify-center gap-5 mt-10">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-2 rounded-md w-36">
            EDITAR
          </Button>
          <Link to="/usuarios">
            <Button className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-2 rounded-md w-36">
              CANCELAR
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
