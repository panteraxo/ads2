import { useEffect, useState } from "react";
import SimpleTable from "../../components/SimpleTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TaskingColumn } from "../../components/columns/TaskingColumn";
import { getPetition, deletePetition } from "../../resources/ApiFunction";

export default function Productos() {
  const [filtering, setFiltering] = useState("");
  const [data, setData] = useState([]);

  const loadProducts = () => {
    getPetition("producto/all-dto", setData);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  console.log(data);

  const handleDeleteProduct = async (id) => {
    try {
      await deletePetition(`producto/delete/${id}`, (response) => {
        console.log("Producto eliminado exitosamente:", response);
      }).then(() => {
        loadProducts();
      });
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      alert("Error al eliminar el producto. Inténtalo de nuevo.");
    }
  };

  return (
    <>
      <h2 className="scroll-m-20 text-white pb-2 text-3xl text-center font-semibold tracking-tight first:mt-0">
        GESTIÓN DE PRODUCTOS
      </h2>
      <div className="flex items-center py-4 px-4 justify-between bg-white rounded-t-sm border-2 border-blue-500">
        <Input
          placeholdeaaaaaaaaaaaaaaaaar="Buscar producto"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          className="w-full mx-4"
        />
        <Link to="/productos/agregar">
          <Button className="bg-blue-800 text-white cursor-pointer">
            Nuevo Producto
          </Button>
        </Link>
      </div>
      <SimpleTable
        filtering={filtering}
        setFiltering={setFiltering}
        columns={TaskingColumn({
          data,
          onDelete: handleDeleteProduct,
          editPath: "/productos/editar",
        })}
        data={data}
      />
    </>
  );
}
