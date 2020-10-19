import { matchConfig } from "@babakness/exhaustive-type-checking";

export enum AppRoute {
    login = "/auth/login",
    signup = "/auth/signup",
    forgotPass = "/auth/forgotPass",
    validateEmail = "/auth/validateEmail",
}

export const matchAppRoute = matchConfig<AppRoute>();
