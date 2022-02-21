import { InvalidParamError } from "../Errors/invalidParamError";
import { MissingParamError } from "../Errors/missingParamError";
import { badRequest, internalServerError } from "../Helpers/httpHelper";
import { Controller } from "../Protocols/controller";
import { EmailValidator } from "../Protocols/emailValidator";
import { httpRequest, httpResponse } from "../Protocols/http";

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;
  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  handle(httpRequest: httpRequest): httpResponse {
    try {
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
      const isValid = this.emailValidator.isValid(httpRequest.body.email);
      if (!isValid) return badRequest(new InvalidParamError("email"));
    } catch (error) {
      return internalServerError();
    }
  }
}
