import { useState } from "react";
import SimpleTable from "../../components/SimpleTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TaskingColumn } from "../../components/columns/TaskingColumn";
import data from "../../MOCK_DATA.json";
import { Link } from "react-router-dom";

export default function Productos() {
  const [filtering, setFiltering] = useState("");
  return (
    <>
      <h2 className="scroll-m-20 text-white pb-2 text-3xl text-center font-semibold tracking-tight first:mt-0">
        GESTIÓN DE PRODUCTOS
      </h2>
      <div className="flex items-center py-4 px-4 justify-between bg-white rounded-t-sm ">
        <Input
          placeholder="Buscar producto"
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
        columns={TaskingColumn({ data })}
        data={data}
      />
    </>
  );
}
