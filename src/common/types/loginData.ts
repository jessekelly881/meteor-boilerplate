import { Type, Static } from '@sinclair/typebox';
import createValidator from '../createValidator';

const LoginData = Type.Object({
  email: Type.String({ format: 'email' }),
  password: Type.String(),
});

type LoginData = Static<typeof LoginData>;

export default LoginData;

export const validator = createValidator(LoginData);
