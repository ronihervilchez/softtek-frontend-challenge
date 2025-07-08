"use client";

import { getAuthHeaders, getAuthToken } from "@/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PeopleList from "../../../components/people-list";
import { ILoginResponse } from "../../../interfaces/api-response.interface";
import { IPerson } from "../../../interfaces/person.interface";

export default function PersonCards() {
  const [customPersonList, setCustomPersonList] = useState<ILoginResponse<IPerson[]>>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPersonajes = async () => {
      try {
        // Verificar si está autenticado
        const token = getAuthToken();
        if (!token) {
          router.push("/auth/login");
          return;
        }

        setLoading(true);

        const response = await axios.get("/api/personajes", {
          headers: getAuthHeaders(),
        });

        const personas: ILoginResponse<IPerson[]> = response.data;
        setCustomPersonList(personas);
      } catch (error: any) {
        console.error("Error fetching personas:", error);

        if (error.response?.status === 401) {
          // Token expirado o inválido
          router.push("/auth/login");
        } else {
          setError("Error al cargar los personajes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPersonajes();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Cargando personajes...</div>
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

  // Vista por defecto: Galería
  return (
    <div>
      <div className="text-center mb-12 mt-5">
        <h1 className="text-4xl font-bold mb-4">Galería de Personajes</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Descubre a los personajes más legendarios de Star Wars y conoce sus historias
        </p>
      </div>
      <PeopleList people={customPersonList as ILoginResponse<IPerson[]>}></PeopleList>
    </div>
  );
}
