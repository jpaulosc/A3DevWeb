import {randomUUID} from "crypto";

interface PlatformProps {
  name: string
  image: string | null
}

export class Platform {
    id: string;
    name: string;
    image: string | null;

    constructor(data: PlatformProps) {
        if (!data.name) {
            throw new Error ("Name is Required");
        }
        this.id = randomUUID();
        this.name = data.name;
        this.image = data.image;
    }
}
