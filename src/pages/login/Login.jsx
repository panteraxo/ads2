import React, { useState } from "react";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", { usuario, clave });
    // Aquí iría tu lógica de autenticación
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Panel izquierdo - Imagen del negocio */}
      <div className="flex flex-1 items-center justify-center bg-gray-100 border-r-2 border-gray-300">
        <div className="w-4/5 h-3/5 bg-gray-300 flex flex-col items-center justify-center border-2 border-dashed border-gray-500 rounded-lg">
          <p className="text-2xl text-gray-600 font-bold m-0">ÁREA DE IMAGEN</p>
          <p className="text-sm text-gray-400 mt-2">
            Coloca aquí la imagen de tu negocio
          </p>
        </div>
      </div>

      {/* Panel derecho - Formulario de login */}
      <div className="flex flex-1 items-center justify-center bg-[#2c3e50]">
        <div className="w-96 p-10">
          {/* Logo placeholder */}
          <div className="text-center mb-10">
            <div className="w-30 h-30 bg-[#34495e] border-3 border-gray-100 rounded-full mx-auto mb-5 flex items-center justify-center">
              <span className="text-gray-100 text-2xl font-bold">LOGO</span>
            </div>
            <h1 className="text-gray-100 text-5xl font-bold m-0 tracking-widest">
              TINKU
            </h1>
            <p className="text-gray-100 text-lg italic m-0">market</p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="mb-6">
              <label className="text-gray-100 text-base mb-2 block">
                <span className="mr-2">👤</span> Usuario
              </label>
              <input
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="w-full px-4 py-3 text-base border-2 border-gray-100 rounded bg-gray-100 outline-none"
                placeholder="Ingrese su usuario"
              />
            </div>

            <div className="mb-6">
              <label className="text-gray-100 text-base mb-2 block">
                <span className="mr-2">🔒</span> Clave
              </label>
              <input
                type="password"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                className="w-full px-4 py-3 text-base border-2 border-gray-100 rounded bg-gray-100 outline-none"
                placeholder="Ingrese su contraseña"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-green-600 text-white text-lg font-bold border-none rounded cursor-pointer mt-2 transition-colors duration-300 hover:bg-green-700"
            >
              INGRESAR
            </button>
          </form>

          {/* Mensaje inferior */}
          <p className="text-gray-100 text-xs text-center mt-8 leading-relaxed">
            <span className="mr-2">🛡️</span> Sistema exclusivo para personal
            autorizado
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
