import { User } from "../../../modules/user/entity/user.entity";
import {createHmac} from "crypto";
import { IToken } from "./token";
import {sign} from "jsonwebtoken";

export class TokenJWT implements IToken {
    private JWTSECRET = process.env.JWT_SECRETKEY || "";
    private JWTSECRET_CRYPTYO = createHmac("sha256", this.JWTSECRET).digest("base64");

    create({id, name, email}: User): string {
        const token = sign({id, name, email}, this.JWTSECRET_CRYPTYO, {
            subject: id,
            expiresIn: "15m"
        });
        return token;
    }

}
