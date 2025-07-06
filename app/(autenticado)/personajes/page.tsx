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
  return <PeopleList people={customPersonList}></PeopleList>;
}
