import { matchConfig } from "@babakness/exhaustive-type-checking";

/**
 * AppRoute
 * @desc Routes within the app.
 * @enum {string}
 */
export enum AppRoute {
    login = "/auth/login",
    signup = "/auth/signup",
    forgotPass = "/auth/forgotPass",
    validateEmail = "/auth/validateEmail",
}

export const matchAppRoute = matchConfig<AppRoute>();
