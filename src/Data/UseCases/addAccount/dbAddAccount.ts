import { AccountModel } from "../../../Domain/Models/Account/accountModel";
import {
  AddAccount,
  AddAccountModel,
} from "../../../Domain/UseCases/Account/addAccount";
import { Encrypter } from "../../Protocols/encrypter";

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter;

  constructor(encrypter: Encrypter) {
    this.encrypter = encrypter;
  }
  async add(account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password);
    return new Promise((resolve) => resolve(null));
  }
}
