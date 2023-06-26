import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./authenticate-user.usecase";
import { IUserRepository } from "../../repository/user.repository";
import { IPasswordHash } from "../../../../infra/shared/passwordHash";
import { IToken } from "../../../../infra/shared/token/token";

export class AuthenticateUserController {
  constructor(private userRepository: IUserRepository, private passwordHash: IPasswordHash, private token: IToken){}
  async handle(request: Request, response: Response){
    try {
      const authenticaseUseCase = new AuthenticateUserUseCase(this.userRepository, this.passwordHash, this.token);
      const result = await authenticaseUseCase.execute(request.body);
      return response.status(200).json(result);
    } catch (err: any) {
      return response.status(401).json(err.message);
    }

  }
}
