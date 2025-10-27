import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPetition, putPetition } from "../../resources/ApiFunction";
import { useForm } from "react-hook-form";

export default function EditarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      id: Number(id),
    },
  });
  const [proveedores, setProveedores] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState("");
  const [selectedProveedor, setSelectedProveedor] = useState("");

  useEffect(() => {
    // Cargar proveedores primero
    getPetition("proveedor/all", (proveedoresData) => {
      setProveedores(proveedoresData);

      // Después cargar el producto
      getPetition(`producto/buscar/${id}`, (data) => {
        setValue("nombre", data.nombre);
        setValue("precio", data.precio);
        setValue("categoria", data.categoria);
        setValue("proveedor", data.proveedor);

        // Establecer valores en el estado local
        setSelectedCategoria(data.categoria || "");

        // Convertir el proveedor a string para el Select
        const proveedorString = data.proveedor ? data.proveedor.toString() : "";
        setSelectedProveedor(proveedorString);

        console.log("Datos del producto:", data);
        console.log("Proveedor como número:", data.proveedor);
        console.log("Proveedor como string:", proveedorString);
        console.log("Proveedores disponibles:", proveedoresData);
      });
    });
  }, [id, setValue]);

  const handleCategoriaChange = (value) => {
    setSelectedCategoria(value);
    setValue("categoria", value);
  };

  const handleProveedorChange = (value) => {
    setSelectedProveedor(value);
    // Convertir de vuelta a número para el formulario
    setValue("proveedor", Number(value));
  };

  const onSubmit = async (data) => {
    try {
      await putPetition(`producto/update/${id}`, data, (response) => {
        console.log(response);
        navigate("/productos");
      });
    } catch (error) {
      console.log("Error al editar Producto", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-xl rounded-lg shadow-md p-8 mx-auto my-10"
      >
        <h1 className="text-center font-bold text-3xl mb-10">
          EDITAR PRODUCTO
        </h1>

        <div className="space-y-6">
          <Input
            placeholder="Ingresar nombre"
            className="w-full"
            {...register("nombre")}
          />

          <Input
            placeholder="Ingresar precio"
            className="w-full"
            {...register("precio")}
          />

          <Select
            value={selectedCategoria}
            onValueChange={handleCategoriaChange}
          >
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
            value={selectedProveedor}
            onValueChange={handleProveedorChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona proveedor" />
            </SelectTrigger>
            <SelectContent className="bg-white z-[100]">
              {proveedores && proveedores.length > 0 ? (
                proveedores.map((item) => (
                  <SelectItem
                    key={item.id}
                    value={item.id.toString()}
                    className="text-black"
                  >
                    {item.razonSocial}
                  </SelectItem>
                ))
              ) : (
                <div className="px-2 py-1 text-sm text-gray-500">
                  Cargando proveedores...
                </div>
              )}
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
