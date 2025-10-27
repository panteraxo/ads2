import { FaLongArrowAltLeft } from "react-icons/fa";

const Home = () => {
  return (
    <div className="bg-white p-4 h-full flex flex-row">
      <div className="w-1/12 flex justify-end items-center pr-8">
        <FaLongArrowAltLeft size={40} />
      </div>
      <div className="flex flex-col gap-4 justify-center items-center w-11/12">
        <h1 className="text-2xl font-bold mb-4">Bienvenido a TINKU</h1>
        <p>Seleccione una opción del menú para comenzar.</p>
        <p className="text-gray-600">
          Aquí puedes gestionar tus ventas, inventario y reportes.
        </p>
      </div>
    </div>
  );
};

export default Home;
