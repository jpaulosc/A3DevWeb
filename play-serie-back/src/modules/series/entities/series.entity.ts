import {randomUUID} from "crypto";

interface ISerieProps {
  name: string
  description: string
  image: string
  platform: string
  userId: string
}

export class Series {
  id: string;
  name: string;
  description: string;
  image: string;
  platform: string;
  userId: string;

  constructor(data: ISerieProps) {

    if (!data.name) {
      throw new Error("Name is required");
    }

    if (!data.description) {
      throw new Error("Description is required");
    }

    this.id = randomUUID();
    this.name = data.name;
    this.image = data.image;
    this.description = data.description;
    this.platform = data.platform;
    this.userId = data.userId;
  }
}
