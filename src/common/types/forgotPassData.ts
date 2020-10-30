import { Type, Static } from '@sinclair/typebox';
import createValidator from '../createValidator';

const ForgotPassData = Type.Object({
  email: Type.String({ format: 'email' }),
});

type ForgotPassData = Static<typeof ForgotPassData>;

export default ForgotPassData;

export const validator = createValidator(ForgotPassData);
