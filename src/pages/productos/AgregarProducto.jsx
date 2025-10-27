import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
  SelectValue,
} from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import { getPetition, postPetition } from "../../resources/ApiFunction";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export default function AgregarProducto() {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const [proveedores, setProveedores] = useState([]);
  useEffect(() => {
    getPetition("proveedor/all", setProveedores);
  }, []);
  console.log(proveedores);

  const onSubmit = async (data) => {
    try {
      await postPetition("producto/add", data, (response) => {
        console.log(response);
        navigate("/productos");
      });
    } catch (error) {
      console.log("Error al crear Producto", error);
    }
  };
  return (
    <div className="flex justify-center items-center h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-xl rounded-lg shadow-md p-8 mx-auto my-10"
      >
        <h1 className="text-center font-bold text-3xl mb-10">
          AGREGAR PRODUCTO
        </h1>

        <div className="space-y-6">
          <Input
            placeholder="Ingresar nombre"
            className="w-full "
            {...register("nombre")}
          />

          <Input
            placeholder="Ingresar precio"
            className="w-full"
            {...register("precio")}
          />
          <Input
            placeholder="Ingresar stock"
            className="w-full"
            {...register("stock")}
          />

          <Select onValueChange={(value) => setValue("categoria", value)}>
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

          <Select
            onValueChange={(value) => setValue("proveedor", Number(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona proveedor" />
            </SelectTrigger>
            <SelectContent className="bg-white z-[100]">
              <SelectGroup>
                {proveedores.map((item) => (
                  <SelectItem key={item.id} value={item.id.toString()}>
                    {item.razonSocial}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
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
