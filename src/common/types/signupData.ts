import createValidator from "../createValidator";
import { Type, Static } from "@sinclair/typebox";

const SignupData = Type.Object({
    name: Type.String(),
    email: Type.String({ format: "email" }),
    password: Type.String(),
});

type SignupData = Static<typeof SignupData>;

export default SignupData;

export const validator = createValidator(SignupData);
