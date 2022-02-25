import { InvalidParamError, MissingParamError } from "../Errors";
import { badRequest, internalServerError } from "../Helpers/httpHelper";
import {
  Controller,
  EmailValidator,
  httpRequest,
  httpResponse,
} from "../Protocols";

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
      const { email, password, passwordConfirmation } = httpRequest.body;
      const isValid = this.emailValidator.isValid(email);

      if (!isValid) return badRequest(new InvalidParamError("email"));

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError("passwordConfirmation"));
      }
    } catch (error) {
      return internalServerError();
    }
  }
}
