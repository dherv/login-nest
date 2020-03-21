import * as bcrypt from 'bcrypt';

export class BCryptService {
  async hash(password: string | undefined): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async compare(
    password: string | undefined,
    hash: string | undefined,
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
