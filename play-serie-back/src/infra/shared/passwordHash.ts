export interface IPasswordHash {
  hashPassword(password: string): Promise<string>
  valite(password: string, passwordHash: string): Promise<boolean>
}
