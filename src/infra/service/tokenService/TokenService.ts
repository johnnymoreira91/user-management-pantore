import { ITokenService } from "@domain/services/tokenService/ITokenService";
import { ENV } from "@infra/config/params";
import { sign } from 'jsonwebtoken'

export class TokenService implements ITokenService {
  private readonly secretKey = ENV.SECRET_KEY
  constructor() {
    this.secretKey = process.env.SECRET_KEY
  }
  generateToken(data: any): string {
    const token = sign(data, this.secretKey, { expiresIn: "1h" });
    return token;
  }
}