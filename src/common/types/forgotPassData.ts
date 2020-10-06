import createValidator from "../createValidator";
import { Type, Static } from "@sinclair/typebox";

const ForgotPassData = Type.Object({
    email: Type.String({ format: "email" }),
});

type ForgotPassData = Static<typeof ForgotPassData>;

export default ForgotPassData;

export const validator = createValidator(ForgotPassData);
