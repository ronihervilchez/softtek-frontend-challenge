"use client";

import axios from "axios";
import { ChevronLeft, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { IHistory } from "../../../interfaces/history.interface";
import { agregarPersonas } from "../../redux/reducers/personas-slice";

export default function History() {
  const [currentPage, setCurrentPage] = useState(1);
  const [historyList, setHistoryList] = useState<Record<number, IHistory[]>>({});
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/api/historial")
      .then((response) => {
        const history: IHistory[] = response.data;
        setHistoryList({ ...historyList, [currentPage]: history });
      })
      .catch((error) => {
        console.error("Error fetching personas:", error);
      });
  }, [currentPage]);

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // const goToNext = () => {
  //   if (currentPage < totalPages) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

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
        {historyList[currentPage]?.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div
                className="p-2 rounded-lg bg-primary/10 cursor-pointer"
                onClick={() => {
                  dispatch(agregarPersonas(item.personas));
                  router.push(`historial/detalle`);
                }}
              >
                <Eye className="h-4 w-4 text-primary" />
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

        {/* <Button variant="outline" size="sm" onClick={goToNext} disabled={currentPage === totalPages}>
          Siguiente
          <ChevronRight className="h-4 w-4" />
        </Button> */}
      </div>
    </div>
  );
}
