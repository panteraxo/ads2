import { Button } from "@/components/ui/button";
import { MdEdit } from "react-icons/md";

import { BsFilterLeft } from "react-icons/bs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export const TaskingColumn = ({ data }) => {
  if (!data || data.length === 0) {
    return [];
  }

  const keys = Object.keys(data[0]);

  const columns = keys.map((key) => {
    if (key === "id") {
      return {
        accessorKey: key,
        header: () => (
          <Button variant="ghost">
            ID
            <BsFilterLeft className="ml-2 h-4 w-4" />
          </Button>
        ),
      };
    }

    return {
      accessorKey: key,
      header: () => (
        <Button variant="ghost">
          {key.charAt(0).toUpperCase() + key.slice(1)}
          <BsFilterLeft className="ml-2 h-4 w-4" />
        </Button>
      ),
    };
  });
  columns.push({
    header: "Opciones",
    cell: ({ row }) => (
      <div className="flex">
        <div className="ml-2">
          <Link to="/productos/editar">
            <MdEdit className="text-yellow-300 size-6" />
          </Link>
        </div>
        <div className="ml-2 ">
          <AlertDialog className="display-flex absolute">
            <AlertDialogTrigger>
              <FaTrashAlt className="text-red-500 size-6" />
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white  z-[100] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-md">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-lg font-medium">
                  ¿Está seguro de que desea eliminar este producto?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede deshacer El producto será eliminado
                  permanentemente de la base de datos.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-2 rounded-md w-36"
                  onClick={() => {
                    // deleteLocation(row.original.id);
                    console.log("Eliminando producto con ID:", row.original.id);
                  }}
                >
                  Si
                </AlertDialogAction>
                <AlertDialogCancel className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-2 rounded-md w-36">
                  No
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    ),
  });
  return columns;
};
