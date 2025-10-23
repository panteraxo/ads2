import { useState } from "react";
import SimpleTable from "../../components/SimpleTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import data from "../../MOCK_DATA.json";
import { SingleColumn } from "../../components/columns/SingleColumn";

export default function Reportes() {
  const [filtering, setFiltering] = useState("");
  return (
    <>
      <div className="bg-white py-16 flex flex-col ">
        <h2 className="scroll-m-20 text-black pb-2 text-3xl text-center font-semibold tracking-tight first:mt-0">
          REPORTE DE PRODUCTOS
        </h2>
        <div className="flex flex-col w-full items-center  ">
          <div className="flex flex-col w-1/2 mb-4">
            <label>Buscar por nombre</label>
            <Input
              placeholder="Buscar producto"
              value={filtering}
              onChange={(e) => setFiltering(e.target.value)}
              className="w-full "
            />
          </div>
          <div className="flex flex-col w-1/2 mb-4">
            <label>Buscar por categoria</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona proveedor" />
              </SelectTrigger>
              <SelectContent className="bg-white z-[100]">
                <SelectItem value="proveedor1">Proveedor 1</SelectItem>
                <SelectItem value="proveedor2">Proveedor 2</SelectItem>
                <SelectItem value="proveedor3">Proveedor 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-center gap-5 mt-4">
          <Button className="bg-blue-800 text-white cursor-pointer">
            Generar Reporte
          </Button>
          <Button className="bg-blue-800 text-white cursor-pointer">
            Exportar a PDF
          </Button>
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
