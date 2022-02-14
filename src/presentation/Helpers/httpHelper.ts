import { httpResponse } from "Presentation/Protocols/http";

export const badRequest = (error: Error): httpResponse => ({
  statusCode: 400,
  body: error,
});
