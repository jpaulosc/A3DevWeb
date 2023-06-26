import { IUserRepository } from "../../repository/user.repository";

export class GetAllUsersUseCase {
  constructor(private userRepository: IUserRepository){}
  async execute() {
    const result = await this.userRepository.getAllUsers();
    return result;
  }
}
