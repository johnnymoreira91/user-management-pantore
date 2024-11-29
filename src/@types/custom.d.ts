declare namespace Express {
  export interface Request {
    userId: number;
    roleId: number
  }
  export interface Response {
    time: number
  }
}