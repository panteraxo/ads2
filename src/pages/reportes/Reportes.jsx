import { Link, Outlet, useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Reportes() {
  const { pathname } = useLocation();
  const parts = pathname.split("/");
  const lastPart = parts[parts.length - 1];
  return (
    <Tabs defaultValue={lastPart} selectedValue={lastPart}>
      <TabsList>
        <Link to="/reportes/ventas">
          <TabsTrigger value="ventas">Ventas</TabsTrigger>
        </Link>
        <Link to="/reportes/productos">
          <TabsTrigger value="productos">Productos</TabsTrigger>
        </Link>
      </TabsList>
      <TabsContent value="ventas">
        <Outlet />
      </TabsContent>
      <TabsContent value="productos">
        <Outlet />
      </TabsContent>
    </Tabs>
  );
}
