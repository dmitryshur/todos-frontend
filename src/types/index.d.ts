declare const PRODUCTION: boolean;
declare const API_URL: string;

export interface Action {
  type: string | undefined;
  payload?: any;
}

export interface Error {
  code: number;
  error: string;
}
