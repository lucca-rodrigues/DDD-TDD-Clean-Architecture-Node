import { AddAccount } from "../../Domain/UseCases/Account/addAccount";
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
  private readonly addAccount: AddAccount;

  constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
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
      const { name, email, password, passwordConfirmation } = httpRequest.body;
      const isValid = this.emailValidator.isValid(email);

      if (!isValid) return badRequest(new InvalidParamError("email"));

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError("passwordConfirmation"));
      }
      this.addAccount.add({
        name,
        email,
        password,
      });
    } catch (error) {
      return internalServerError();
    }
  }
}
