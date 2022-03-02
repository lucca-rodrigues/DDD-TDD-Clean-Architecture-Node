import { InternalServerError } from "../Errors/internalServerError";
import { httpResponse } from "../Protocols";

export const badRequest = (error: Error): httpResponse => ({
  statusCode: 400,
  body: error,
});

export const internalServerError = (): httpResponse => ({
  statusCode: 500,
  body: new InternalServerError(),
});

export const success = (data: any): httpResponse => ({
  statusCode: 200,
  body: data,
});
