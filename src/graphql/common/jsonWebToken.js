import jwt from "jsonwebtoken";
import { UserRole } from "../enum";

const { JWT_SECRET_KEY, JWT_EXPIRED } = process.env;

export const jwtGetPayload = (token) => {
    try {
        const payload = jwt.verify(token, JWT_SECRET_KEY, {
            ignoreExpiration: true,
        });

        return [payload, null];
    } catch (error) {
        return [null, { message: error.message }];
    }
};

export const jwtToken = async (account) => {
    const token = await jwt.sign(
        {
            id: account.id,
            name: account.name,
            email: account.email,
            role: account.role,
        },
        JWT_SECRET_KEY,
        {
            expiresIn: JWT_EXPIRED
        }
    );
    return token;
};
