/* eslint-disable @typescript-eslint/no-explicit-any */
import * as express from "express";

declare global {
  namespace Express {
    interface Response {
      /**
       * return response with status 200
       */
      success(message: string, data?: any);

      /**
       * return response with status 500
       */
      error(error: Error, defaultMsg: string, data?: any): Response;

      /**
       * return response with status 400
       */
      badRequest(message: string, data?: any, error?: Error): Response;

      /**
       * return response with status 401
       */
      unauthorized(message: string, data?: any): Response;
    }
  }
}
