import { Person } from "./person.interface";

export interface IHistory {
  id?: string | number;
  fechaCreacion?: string;
  personas: Person[];
}
