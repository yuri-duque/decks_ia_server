/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import CustomError from "./customError";

export enum STATUS {
  success = 200,
  error = 500,
  badRequest = 400,
  unauthorized = 401,
}

export default function responseMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  response.success = (message: string, data?: any) => {
    const body = {
      message,
      data,
    };
    return buildResponse(response, STATUS.success, body);
  };

  response.error = (error: Error, defaultMsg: string, data?: any) => {
    if (error instanceof CustomError) {
      const body = {
        message: error.message,
        data,
      };
      return buildResponse(response, error.statusCode, body);
    }

    const body = {
      defaultMsg,
      error: error?.message,
      data,
    };

    return buildResponse(response, STATUS.error, body);
  };

  response.badRequest = (message: string, data?: any, error?: Error) => {
    const body = {
      message,
      data,
      error: error?.message,
    };
    return buildResponse(response, STATUS.badRequest, body);
  };

  response.unauthorized = (message: string, data?: any) => {
    const body = {
      message,
      data,
    };
    return buildResponse(response, STATUS.unauthorized, body);
  };

  next();
}

function buildResponse(response: Response, status: STATUS, body: any) {
  log(status, body);
  return response.status(status).send(body);
}

function log(status: STATUS, body: any) {
  const statusName = STATUS[status];

  const { message, error } = body;
  const logMessage = `[Response] - ${statusName}: ${JSON.stringify({
    message,
    error,
  })}`;

  if (status === STATUS.success) {
    console.log(logMessage);
  } else {
    console.error(logMessage);
  }
}
