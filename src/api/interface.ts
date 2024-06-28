export interface ApiResponse<T = undefined> {
  isSuccess: number;
  statusCode: number;
  message: string;
  error: string | null;
  data?: T; // Optional data property, with a generic type
}
