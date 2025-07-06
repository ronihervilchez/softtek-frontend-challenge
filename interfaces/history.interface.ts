import { Person } from "./person.interface";

export interface History {
  id?: string | number;
  fechaCreacion?: string;
  personas: Person[];
}