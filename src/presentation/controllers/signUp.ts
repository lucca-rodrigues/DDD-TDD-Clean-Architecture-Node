import { MissingParamError } from "../Errors/missingParamError";
import { badRequest } from "../Helpers/httpHelper";
import { Controller } from "../Protocols/controller";
import { httpRequest, httpResponse } from "../Protocols/http";

export class SignUpController implements Controller {
  handle(httpRequest: httpRequest): httpResponse {
    // if (!httpRequest.body.name) {
    //   return badRequest(new MissingParamError("name"));
    // }
    // if (!httpRequest.body.email) {
    //   return badRequest(new MissingParamError("email"));
    // }

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
