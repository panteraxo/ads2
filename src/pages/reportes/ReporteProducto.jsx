import { useEffect, useState } from "react";
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
import { SingleColumn } from "../../components/columns/SingleColumn";
import { getPetition } from "../../resources/ApiFunction";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ReporteProducto() {
  const [filtering, setFiltering] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [data, setData] = useState([]);
  const [dataFiltrada, setDataFiltrada] = useState([]);
  const [generandoPDF, setGenerandoPDF] = useState(false);

  const loadProducts = () => {
    getPetition("producto/all-dto", setData);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Obtener categorías únicas de los datos
  const categoriasUnicas = [
    ...new Set(data.map((producto) => producto.categoria)),
  ].filter((categoria) => categoria && categoria.trim() !== "");

  // Filtrar datos por categoría
  useEffect(() => {
    let dataParaFiltrar = data;

    // Filtrar por categoría si hay una seleccionada
    if (categoriaSeleccionada && categoriaSeleccionada !== "todas") {
      dataParaFiltrar = data.filter(
        (producto) => producto.categoria === categoriaSeleccionada
      );
    }

    setDataFiltrada(dataParaFiltrar);
  }, [data, categoriaSeleccionada]);

  const handleCategoriaChange = (value) => {
    setCategoriaSeleccionada(value);
  };

  const limpiarFiltros = () => {
    setFiltering("");
    setCategoriaSeleccionada("");
  };

  // Función para obtener los datos filtrados que se muestran en la tabla
  const obtenerDatosMostrados = () => {
    return dataFiltrada.filter((producto) =>
      producto.nombre.toLowerCase().includes(filtering.toLowerCase())
    );
  };

  // Función para exportar a PDF
  const exportarAPDF = () => {
    setGenerandoPDF(true);

    try {
      // Crear nueva instancia de jsPDF
      const doc = new jsPDF({
        orientation: "landscape", // Horizontal para más columnas
        unit: "mm",
        format: "a4",
      });

      // Obtener datos a exportar
      const datosParaExportar = obtenerDatosMostrados();

      if (datosParaExportar.length === 0) {
        alert("No hay datos para exportar");
        return;
      }

      // Configurar fuente para soportar caracteres especiales
      doc.setFont("helvetica", "normal");

      // Título del documento
      doc.setFontSize(18);
      doc.setTextColor(40, 40, 40);
      doc.text(
        "REPORTE DE PRODUCTOS",
        doc.internal.pageSize.getWidth() / 2,
        20,
        {
          align: "center",
        }
      );

      // Información del reporte
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      const fechaActual = new Date().toLocaleDateString("es-PE", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      doc.text(`Generado el: ${fechaActual}`, 20, 30);
      doc.text(`Total de productos: ${datosParaExportar.length}`, 20, 35);

      // Mostrar filtros aplicados
      let yPosition = 40;
      if (categoriaSeleccionada && categoriaSeleccionada !== "todas") {
        doc.text(`Categoría filtrada: ${categoriaSeleccionada}`, 20, yPosition);
        yPosition += 5;
      }
      if (filtering) {
        doc.text(`Búsqueda aplicada: "${filtering}"`, 20, yPosition);
        yPosition += 5;
      }

      // Preparar encabezados de columnas
      const encabezados = [
        "ID",
        "Nombre",
        "Descripción",
        "Precio",
        "Stock",
        "Categoría",
        "Proveedor",
      ];

      // Preparar datos de filas
      const filas = datosParaExportar.map((producto) => [
        producto.id || "N/A",
        producto.nombre || "N/A",
        producto.descripcion || "N/A",
        `S/. ${producto.precio ? producto.precio.toFixed(2) : "0.00"}`,
        producto.stock || 0,
        producto.categoria || "N/A",
        producto.proveedor?.nombre || "N/A",
      ]);

      // Generar tabla usando autoTable directamente
      autoTable(doc, {
        head: [encabezados],
        body: filas,
        startY: yPosition + 10,
        theme: "striped",
        headStyles: {
          fillColor: [41, 128, 185], // Color azul
          textColor: 255,
          fontSize: 10,
          fontStyle: "bold",
          halign: "center",
        },
        bodyStyles: {
          fontSize: 9,
          textColor: 50,
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
        columnStyles: {
          0: { cellWidth: 15, halign: "center" }, // ID
          1: { cellWidth: 45 }, // Nombre
          2: { cellWidth: 50 }, // Descripción
          3: { cellWidth: 25, halign: "right" }, // Precio
          4: { cellWidth: 20, halign: "center" }, // Stock
          5: { cellWidth: 30 }, // Categoría
          6: { cellWidth: 35 }, // Proveedor
        },
        margin: { top: 20, right: 15, bottom: 20, left: 15 },
        didDrawPage: function (data) {
          // Pie de página
          const pageHeight = doc.internal.pageSize.getHeight();
          doc.setFontSize(8);
          doc.setTextColor(100, 100, 100);
          doc.text(
            `Página ${data.pageNumber}`,
            doc.internal.pageSize.getWidth() - 30,
            pageHeight - 10
          );

          // Línea separadora en el pie
          doc.setLineWidth(0.5);
          doc.setDrawColor(200, 200, 200);
          doc.line(
            15,
            pageHeight - 15,
            doc.internal.pageSize.getWidth() - 15,
            pageHeight - 15
          );
        },
      });

      // Generar nombre del archivo
      const nombreArchivo = `reporte_productos_${
        new Date().toISOString().split("T")[0]
      }.pdf`;

      // Descargar el PDF
      doc.save(nombreArchivo);

      console.log(`PDF generado exitosamente: ${nombreArchivo}`);
      alert(`PDF generado exitosamente: ${nombreArchivo}`);
    } catch (error) {
      console.error("Error al generar PDF:", error);
      alert("Error al generar el PDF. Inténtalo de nuevo.");
    } finally {
      setGenerandoPDF(false);
    }
  };

  return (
    <>
      <div className="bg-white py-16 flex flex-col ">
        <h2 className="scroll-m-20 text-black pb-2 text-3xl text-center font-semibold tracking-tight first:mt-0">
          REPORTE DE PRODUCTOS
        </h2>
        <div className="flex flex-col w-full items-center  ">
          <div className="flex flex-col w-1/2 mb-4">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Buscar por nombre
            </label>
            <Input
              placeholder="Buscar producto"
              value={filtering}
              onChange={(e) => setFiltering(e.target.value)}
              className="w-full "
            />
          </div>

          <div className="flex flex-col w-1/2 mb-4">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Buscar por categoría
            </label>
            <Select
              value={categoriaSeleccionada}
              onValueChange={handleCategoriaChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona categoría" />
              </SelectTrigger>
              <SelectContent className="bg-white z-[100]">
                <SelectItem value="todas" className="text-black">
                  Todas las categorías
                </SelectItem>
                {categoriasUnicas.length > 0 ? (
                  categoriasUnicas.map((categoria, index) => (
                    <SelectItem
                      key={`categoria-${index}`}
                      value={categoria}
                      className="text-black"
                    >
                      {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                    </SelectItem>
                  ))
                ) : (
                  <div className="px-2 py-1 text-sm text-gray-500">
                    No hay categorías disponibles
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-center gap-5 mt-4">
          <Button className="bg-blue-800 hover:bg-blue-900 text-white cursor-pointer">
            📋 Generar Reporte
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
            onClick={exportarAPDF}
            disabled={generandoPDF || obtenerDatosMostrados().length === 0}
          >
            {generandoPDF ? (
              <>
                <span className="mr-2">⏳</span>
                Generando PDF...
              </>
            ) : (
              <>
                <span className="mr-2">📄</span>
                Exportar a PDF ({obtenerDatosMostrados().length} productos)
              </>
            )}
          </Button>
        </div>

        {/* Mostrar mensaje si no hay datos para exportar */}
        {obtenerDatosMostrados().length === 0 && (
          <div className="flex justify-center mt-4">
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-yellow-800 text-sm">
                ⚠️ No hay productos para exportar con los filtros actuales
              </p>
            </div>
          </div>
        )}
      </div>

      <SimpleTable
        filtering={filtering}
        setFiltering={setFiltering}
        columns={SingleColumn({ data: dataFiltrada })}
        data={dataFiltrada}
      />
    </>
  );
}
