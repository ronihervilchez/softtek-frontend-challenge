"use client";

import { getAuthHeaders, getAuthToken } from "@/lib/utils";
import axios from "axios";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { ILoginResponse } from "../../../interfaces/api-response.interface";
import { IHistoryList } from "../../../interfaces/history.interface";
import { agregarPersonas } from "../../redux/reducers/personas-slice";

export default function History() {
  const [currentPage, setCurrentPage] = useState(1);
  const [historyList, setHistoryList] = useState<Record<number, IHistoryList>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [limit] = useState(4); // Límite de elementos por página
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        // Verificar si está autenticado
        const token = getAuthToken();
        if (!token) {
          router.push("/auth/login");
          return;
        }

        // Si ya tenemos datos para esta página, no hacer nueva request
        if (historyList[currentPage]) {
          setLoading(false);
          return;
        }

        setLoading(true);
        setError(null);

        // Construir el body para la request
        const requestBody: any = {
          limit: limit,
        };

        // Para cargar la página siguiente, usar el lastEvaluatedKey de la página anterior
        // (que ya está cargada y me dice dónde continuar)
        const previousPage = historyList[currentPage - 1] as IHistoryList | undefined;
        if (previousPage?.lastEvaluatedKey) {
          requestBody.lastEvaluatedKey = previousPage.lastEvaluatedKey;
        }

        const response = await axios.post("/api/historial", requestBody, {
          headers: getAuthHeaders(),
        });

        const history: ILoginResponse<IHistoryList> = response.data;
        setHistoryList((prev) => ({ ...prev, [currentPage]: history.data }));
      } catch (error: any) {
        console.error("Error fetching historial:", error);

        if (error.response?.status === 401) {
          // Token expirado o inválido
          router.push("/auth/login");
        } else {
          setError("Error al cargar el historial");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHistorial();
  }, [currentPage, limit, router]); // Remover historyList de las dependencias

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    const currentPageData = historyList[currentPage];
    if (currentPageData?.hasNextPage) {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Cargando historial...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!historyList[currentPage]) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500">No hay datos de historial disponibles</div>
      </div>
    );
  }

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
        {historyList[currentPage]?.histories.map((item) => (
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

        <Button
          variant="outline"
          size="sm"
          onClick={goToNext}
          disabled={!historyList[currentPage]?.hasNextPage}
        >
          Siguiente
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
