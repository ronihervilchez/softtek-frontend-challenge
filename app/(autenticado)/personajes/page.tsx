"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import PeopleList from "../../../components/people-list";
import { IPerson } from "../../../interfaces/person.interface";

export default function PersonCards() {
  const [customPersonList, setPersonList] = useState<IPerson[]>([]);

  useEffect(() => {
    axios
      .get("/api/personajes")
      .then((response) => {
        const personas: IPerson[] = response.data;
        setPersonList(personas);
      })
      .catch((error) => {
        console.error("Error fetching personas:", error);
      });
  }, []);

  // Vista por defecto: Galería
  return (
    <div>
      <div className="text-center mb-12 mt-5">
        <h1 className="text-4xl font-bold mb-4">Galería de Personajes</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Descubre a los personajes más legendarios de Star Wars y conoce sus historias
        </p>
      </div>
      <PeopleList people={customPersonList}></PeopleList>
    </div>
  );
}
