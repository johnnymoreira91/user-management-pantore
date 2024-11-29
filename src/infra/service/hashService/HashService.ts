import { IHashService } from "@domain/services/hashService/IHashService";
import { hash, compare } from "bcrypt";

export class HashService implements IHashService {
  async encryptPassword(password: string): Promise<string> {
    const saltRounds = 10;
    password = await hash(password, saltRounds);
    return password
  }
  isPasswordValid(password: string, hash: string): Promise<boolean> {
    return compare(hash, password);
  }
}
