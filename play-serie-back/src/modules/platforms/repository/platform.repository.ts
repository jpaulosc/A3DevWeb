import { Platform } from "../entity/platform.entity";

export interface IPlatformRepository {
  findByName(name: string): Promise<Platform | null>
  getAll(): Promise<Platform[]>
  save(platform: Platform, image: string): Promise<Platform>
  update(platform: Platform, image: string): Promise<Platform>
}
