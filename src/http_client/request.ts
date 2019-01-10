export interface Request {
  method: string;
  url: string;
  headers: Headers,
  [prop: string]: string;
  body: any;
} 