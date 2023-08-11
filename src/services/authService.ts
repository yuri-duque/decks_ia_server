import { LoginRequestDto, LoginResponseDto } from "../dtos/login/loginDto";
import { User } from "../entities/User";
import UserRepository from "../repositories/userRepository";
import CustomError from "../utils/customError";
import { encrypt } from "../utils/crypt";
import { generateToken } from "../utils/jwt";

export default class AuthService {
  userRepository!: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async login({ email, password }: LoginRequestDto): Promise<LoginResponseDto> {
    const encryptedPassword = await encrypt(password);

    const user = await this.userRepository.getByEmailAndPassword(email, encryptedPassword);
    if (!user) throw new CustomError("Email or password is invalid");

    await this._updateLastLogin(user);

    const token = await generateToken(user);

    const { _id, name } = user;

    return { _id, name, email, token } as LoginResponseDto;
  }

  async _updateLastLogin(user: User) {
    user.lastLogin = new Date();
    await this.userRepository.update(user._id as string, user);
  }
}
