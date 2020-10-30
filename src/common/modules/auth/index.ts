/**
 * @module auth
 * @desc App authentication module.
 */
import { Accounts } from 'meteor/accounts-base';

export interface User {
  email: string;
  password: string;
  username: string;
  profile: {
    name: string;
    locale: string;
  };
}

/**
 * createUser :: User -> IO ()
 * Create user function.
 */
export const createUser = (user: User) => Accounts.createUser(user);
