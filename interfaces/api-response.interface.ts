export interface ILoginResponse<T> {
  success: boolean;
  data: T;
  message: string;
  timestamp: Date;
}
