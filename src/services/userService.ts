import { RegisterUserDto } from "../dtos/user/registerUserDto";
import { User } from "../entities/User";
import UserRepository from "../repositories/userRepository";
import { encrypt } from "../utils/crypt";
import CustomError from "../utils/customError";

export default class UserService {
  userRepository!: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async create({ name, email, password, confirmPassword }: RegisterUserDto): Promise<User> {
    this._validateName(name);
    this._validateEmail(email);
    this._validatePassword(password);
    this._validateConfirmPassword(password, confirmPassword);

    const encryptedPassword = await encrypt(password);

    const user = new User({ name, email, password: encryptedPassword });

    const userExists = await this.userRepository.getByEmail(user.email);
    if (userExists) throw new CustomError("User already exists");

    const newUser = this.userRepository.create(user);
    return newUser;
  }

  _validatePassword(password: string): void {
    if (!password) throw new CustomError("Password is required");
  }

  _validateConfirmPassword(password: string, confirmPassword: string): void {
    if (password !== confirmPassword)
      throw new CustomError("Password and Confirm Password must be equals");
  }

  _validateName(name: string): void {
    if (!name) throw new CustomError("Name is required");
  }

  _validateEmail(email: string): void {
    if (!email) throw new CustomError("Email is required");

    const regex = /\S+@\S+\.\S+/;
    if (!regex.test(email)) throw new CustomError("Email is invalid");
  }
}
