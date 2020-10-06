import createValidator from "../createValidator";
import { Type, Static } from "@sinclair/typebox";

const LoginData = Type.Object({
    email: Type.String({ format: "email" }),
    password: Type.String(),
});

type LoginData = Static<typeof LoginData>;

export default LoginData;

export const validator = createValidator(LoginData);
