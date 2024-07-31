export interface CustomError extends Error {
  status: string | number;
  data: null;
  message: string;
}
