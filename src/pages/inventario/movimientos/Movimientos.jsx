import { useEffect, useState } from "react";
import SimpleTable from "../../../components/SimpleTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SingleColumn } from "../../../components/columns/SingleColumn";
import { getPetition } from "../../../resources/ApiFunction";

export default function Movimientos() {
  const [filtering, setFiltering] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    getPetition("movimiento/all-dto", setData);
  }, []);
  console.log(data);
  return (
    <>
      <div className="bg-white py-16 flex flex-col ">
        <h2 className="scroll-m-20 text-black pb-2 text-3xl text-center font-semibold tracking-tight first:mt-0">
          GESTIÓN DE MOVIMIENTOS
        </h2>
        <div className="flex items-center py-4 px-4 justify-between  rounded-t-sm ">
          <Input
            placeholder="Buscar movimiento"
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
            className="w-full mx-4"
          />
          <Link to="/inventario/movimientos/agregar">
            <Button className="bg-blue-800 text-white cursor-pointer">
              Ingreso y salida
            </Button>
          </Link>
        </div>
      </div>
      <SimpleTable
        filtering={filtering}
        setFiltering={setFiltering}
        columns={SingleColumn({ data })}
        data={data}
      />
    </>
  );
}
