import { Button } from "@/components/ui/button";
import { BsFilterLeft } from "react-icons/bs";

export const SingleColumn = ({ data }) => {
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
  return columns;
};
