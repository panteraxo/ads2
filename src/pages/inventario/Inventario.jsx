const Inventario = () => {
  return (
    <div className="flex flex-col h-full align-center items-center justify-center gap-4">
      <div className="h-1/2 w-full justify-center items-center flex">
        <h1 className="text-2xl font-bold text-center text-white">
          INVENTARIO
        </h1>
      </div>
      <div className="flex justify-center  gap-52 h-1/2  w-full">
        <a href="/inventario/movimientos">
          <button className="cursor-pointer flex items-center gap-4 px-8 py-4 max-w-60 bg-gray-100 text-black shadow-[0_8px_10px_rgba(0,0,0,0.8)] transform transition-transform duration-300 hover:scale-110 ">
            <span>MOVIMIENTOS</span>
          </button>
        </a>

        <a href="/inventario/proveedores">
          <button className="cursor-pointer flex items-center max-w-60 gap-4 px-8 py-4  bg-gray-100 text-black shadow-[0_8px_10px_rgba(0,0,0,0.8)] transform transition-transform duration-300 hover:scale-110 ">
            <span>PROVEEDORES</span>
          </button>
        </a>
      </div>
    </div>
  );
};

export default Inventario;
