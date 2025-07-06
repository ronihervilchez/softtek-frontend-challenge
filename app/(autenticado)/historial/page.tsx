import { FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import mockHistory from "@/mocks/historial-mock.json";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { IHistory } from "../../../interfaces/history.interface";

export default function History() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Procesar datos del historial y ordenar por fecha descendente
  const historyData: IHistory[] = mockHistory
    .map((item, index) => ({
      id: item.id ?? `query-${index + 1}`,
      fechaCreacion: item.fechaCreacion,
      personas: item.people,
    }))
    .sort((a, b) => new Date(b.fechaCreacion ?? "").getTime() - new Date(a.fechaCreacion ?? "").getTime());

  // Calcular paginación
  const totalPages = Math.ceil(historyData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = historyData.slice(startIndex, endIndex);

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-6xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Historial de Consultas</h2>
        <p className="text-muted-foreground">
          Revisa las consultas realizadas anteriormente en la plataforma
        </p>
      </div>

      {/* Lista de consultas */}
      <div className="space-y-4">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Consulta #{item.id}</span>
                  <Badge variant="outline" className="text-xs">
                    {item.personas.length} {item.personas.length === 1 ? "persona" : "personas"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {item.personas.length > 0
                    ? (() => {
                        const additionalCount = item.personas.length - 2;
                        const namesPreview = item.personas
                          .slice(0, 2)
                          .map((p) => p.nombre)
                          .join(", ");
                        const additionalText = additionalCount > 0 ? ` y ${additionalCount} más` : "";
                        return `Incluye: ${namesPreview}${additionalText}`;
                      })()
                    : "Sin personajes"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{formatDate(item.fechaCreacion ?? "")}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Controles de paginación */}
      <div className="flex items-center justify-between mt-6">
        <Button variant="outline" size="sm" onClick={goToPrevious} disabled={currentPage === 1}>
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </Button>

        <div className="text-sm text-muted-foreground">
          Página {currentPage} de {totalPages}
        </div>

        <Button variant="outline" size="sm" onClick={goToNext} disabled={currentPage === totalPages}>
          Siguiente
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
