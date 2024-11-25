import { FindUserDTO } from './user.dto.js';
import { UserRepository } from './user.repository.js';

export class UserService {
  userRepository: UserRepository;

  constructor() {
    this.findOrCreateOne=this.findOrCreateOne.bind(this);
    this.userRepository = new UserRepository();
  }

  async findOrCreateOne(findUserDto: FindUserDTO) {
    const existingUser = await this.userRepository.findOne(findUserDto);
    if (existingUser) return existingUser;
    return await this.userRepository.createOne(findUserDto);
  }

}
