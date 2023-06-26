import { Request, Response } from "express";
import { IUserRepository } from "../../repository/user.repository";
import { GetAllUsersUseCase } from "./get-all-users.usecase";

export class GetAllUsersController {
  constructor(private userRepository: IUserRepository){}
  async handle(request: Request, response: Response) {
    try {
      const getAllUsersUseCase = new GetAllUsersUseCase(this.userRepository);
      const result = await getAllUsersUseCase.execute();
      return response.status(200).json(result);
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }
}
