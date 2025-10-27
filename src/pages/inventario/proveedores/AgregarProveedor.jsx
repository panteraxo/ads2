import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { postPetition } from "../../../resources/ApiFunction";
import { useForm } from "react-hook-form";

export default function AgregarProveedor() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await postPetition("proveedor/add", data, (response) => {
        console.log(response);
        navigate("/inventario/proveedores");
      });
    } catch (error) {
      console.log("Error al crear Proveedor", error);
    }
  };
  return (
    <div className="flex justify-center items-center h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-xl rounded-lg shadow-md p-8 mx-auto my-10"
      >
        <h1 className="text-center font-bold text-3xl mb-10">
          REGISTRO DE PROVEEDOR
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
