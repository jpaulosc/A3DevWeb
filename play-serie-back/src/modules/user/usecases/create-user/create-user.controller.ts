import { Request, Response } from "express";
import { CreateUserUseCase } from "./create-user.usecase";
import { IUserRepository } from "../../repository/user.repository";
import { IPasswordHash } from "../../../../infra/shared/passwordHash";

export class CreateUserController {
  constructor(private userRepository: IUserRepository, private passwordHash: IPasswordHash){}
  async handle(request: Request, response: Response) {
    try {
      const createUserUsecase = new CreateUserUseCase(this.userRepository, this.passwordHash);
      const userCreated = await createUserUsecase.execute(request.body);
      return response.status(201).json(userCreated);
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }
}
