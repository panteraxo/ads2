import { useEffect, useState } from "react";
import SimpleTable from "../../components/SimpleTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TaskingColumn } from "../../components/columns/TaskingColumn";
import { Link } from "react-router-dom";
import { deletePetition, getPetition } from "../../resources/ApiFunction";

export default function Usuarios() {
  const [filtering, setFiltering] = useState("");
  const [data, setData] = useState([]);

  const loadProducts = () => {
    getPetition("usuario/all", setData);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    try {
      await deletePetition(`usuario/delete/${id}`, (response) => {
        console.log("Usuario eliminado exitosamente:", response);
      }).then(() => {
        loadProducts();
      });
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert("Error al eliminar el usuario. Inténtalo de nuevo.");
    }
  };
  return (
    <>
      <h2 className="scroll-m-20 text-white pb-2 text-3xl text-center font-semibold tracking-tight first:mt-0">
        GESTIÓN DE USUARIOS
      </h2>
      <div className="flex items-center py-4 px-4 justify-between bg-white rounded-t-sm ">
        <Input
          placeholder="Buscar usuario"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          className="w-full mx-4"
        />
        <Link to="/usuarios/agregar">
          <Button className="bg-blue-800 text-white cursor-pointer">
            Nuevo Usuario
          </Button>
        </Link>
      </div>
      <SimpleTable
        filtering={filtering}
        setFiltering={setFiltering}
        columns={TaskingColumn({
          data,
          onDelete: handleDeleteProduct,
          editPath: "/usuarios/editar",
        })}
        data={data}
      />
    </>
  );
}
