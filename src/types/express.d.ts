// import "express";
import { JwtPayload } from ".";

declare global {
  namespace Express {
    export interface Request {
      payload?: JwtPayload;
      userToken?: any;
      userKey?: any;
      validInput?: any;
    }

    export interface Response {
      withData(response: any, status?: boolean, message?: string): Express.Response;
      noData(status?: boolean, message?: string): Express.Response;
      withErrorCode(options: {
        status?: boolean;
        message?: string;
        errCode?: string | null;
        response?: any;
      }): Express.Response;
    }
  }
}

// interface CustomRequest extends Express.Request {
//   payload: JwtPayload;
//   userToken?: any;
//   userKey?: any;
// }

// interface CustomResponse extends Express.Response {
//   withData(response: any, status?: boolean, message?: string): Express.Response;
//   noData(status?: boolean, message?: string): Express.Response;
//   withErrorCode(options: {
//     status?: boolean;
//     message?: string;
//     errCode?: string | null;
//     response?: any;
//   }): Express.Response;
// }

// declare module "express-serve-static-core" {
//   interface Request extends CustomRequest {}
//   interface Response extends CustomResponse {}
// }
