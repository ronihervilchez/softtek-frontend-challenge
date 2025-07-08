import { IPerson } from "./person.interface";

export interface IHistoryList {
  histories: IHistory[];
  hasNextPage: boolean;
  lastEvaluatedKey?: Record<string, any>; // Para paginación de DynamoDB
}

export interface IHistory {
  id?: string | number;
  fechaCreacion?: string;
  personas: IPerson[];
}
