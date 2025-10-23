import { useState } from "react";
import SimpleTable from "../../../components/SimpleTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TaskingColumn } from "../../../components/columns/TaskingColumn";
import data from "../../../MOCK_DATA.json";
import { Link } from "react-router-dom";

export default function Proveedores() {
  const [filtering, setFiltering] = useState("");
  return (
    <>
      <div className="bg-white py-16 flex flex-col ">
        <h2 className="scroll-m-20 text-black pb-2 text-3xl text-center font-semibold tracking-tight first:mt-0">
          GESTIÓN DE PROVEEDORES
        </h2>
        <div className="flex items-center py-4 px-4 justify-between  rounded-t-sm ">
          <Input
            placeholder="Buscar proveedor"
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
            className="w-full mx-4"
          />
          <Link to="/inventario/proveedores/agregar">
            <Button className="bg-blue-800 text-white cursor-pointer">
              Nuevo Proveedor
            </Button>
          </Link>
        </div>
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
