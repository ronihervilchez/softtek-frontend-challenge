import { IPerson } from "./person.interface";

export interface IHistoryList {
  histories: IHistory[];
  hasNextPage: boolean;
}

export interface IHistory {
  id?: string | number;
  fechaCreacion?: string;
  personas: IPerson[];
}
