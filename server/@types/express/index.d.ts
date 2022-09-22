type User = {
  name: string;
  role: string;
  token?: string;
}

declare namespace Express {
  export interface Request {
    user: User
  }
}