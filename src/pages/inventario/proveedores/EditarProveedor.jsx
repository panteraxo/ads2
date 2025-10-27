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
import { useForm } from "react-hook-form";
import { getPetition, putPetition } from "../../../resources/ApiFunction";
import { useEffect } from "react";

export default function EditarProveedor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      id: Number(id),
    },
  });
  useEffect(() => {
    getPetition(`proveedor/buscar/${id}`, (data) => {
      setValue("razon_social", data.razonSocial);
      setValue("telefono", data.telefono);
      setValue("ruc", data.ruc);
      setValue("correo", data.correo);
      setValue("direccion", data.direccion);
      console.log("Datos del proveedor:", data);
    });
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await putPetition(`proveedor/update/${id}`, data, (response) => {
        console.log(response);
        navigate("/inventario/proveedores");
      });
    } catch (error) {
      console.log("Error al editar Proveedor", error);
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
          EDITAR PROVEEDOR
        </h1>

        <div className="space-y-6">
          <Input placeholder="RUC" className="w-full " {...register("ruc")} />

          <Input
            placeholder="Razón social"
            className="w-full"
            {...register("razon_social")}
          />
          <Input
            placeholder="Telefono"
            className="w-full"
            {...register("telefono")}
          />
          <Input
            placeholder="Correo"
            className="w-full"
            {...register("correo")}
          />
          <Input
            placeholder="Direccion"
            className="w-full"
            {...register("direccion")}
          />
        </div>

        <div className="flex justify-center gap-5 mt-10">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-2 rounded-md w-36">
            EDITAR
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
