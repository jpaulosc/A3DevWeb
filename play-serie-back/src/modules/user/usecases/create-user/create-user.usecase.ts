import { IPasswordHash } from "../../../../infra/shared/passwordHash";
import { User } from "../../entity/user.entity";
import { IUserRepository } from "../../repository/user.repository";

interface IUserRequest {
  name: string
  lastName: string
  email: string
  password: string
}

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository, private passwordHash: IPasswordHash){}
  async execute(data: IUserRequest) {
    // Verificar se já não existe um usuário com este email
    const userExists = await this.userRepository.findByEmail(data.email);

    if (userExists) {
      throw new Error("User is already exists");
    }

    const user = new User(data);

    const passwordHash = await this.passwordHash.hashPassword(user.password);

    const userCreated = await this.userRepository.save({
      ...user, password: passwordHash
    });

    return userCreated;
  }
}
