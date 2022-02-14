import { MissingParamError } from "../Errors/missingParamError";
import { badRequest } from "../Helpers/httpHelper";
import { Controller } from "../Protocols/controller";
import { httpRequest, httpResponse } from "../Protocols/http";

export class SignUpController implements Controller {
  handle(httpRequest: httpRequest): httpResponse {
    const requiredFields = [
      "name",
      "email",
      "password",
      "passwordConfirmation",
    ];
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }
  }
}
