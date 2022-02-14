import { MissingParamError } from "Presentation/Errors/missingParamError";
import { httpRequest, httpResponse } from "Presentation/Protocols/http";
import { badRequest } from "Presentation/Helpers/httpHelper";

export class SignUpController {
  handle(httpRequest: httpRequest): httpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError("name"));
    }
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError("email"));
    }
  }
}
