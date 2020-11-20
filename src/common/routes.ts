import { matchConfig } from '@babakness/exhaustive-type-checking';

/**
 * Routes
 * @desc Routes within the app.
 * @enum {string}
 */
enum Routes {
  login = 'login',
  signup = 'signup',
  forgotPass = 'forgotPass',
  validateEmail = 'validateEmail',
}

export const matchRoutes = matchConfig<Routes>();
export default Routes;
