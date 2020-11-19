import { Link } from "react-router-dom";
import { h } from "react-ts-fns";
import Routes from "/src/common/routes";

export const link = h.bind(null, Link);

export const loginLink = link.bind(null, { to: Routes.login });
export const signupLink = link.bind(null, { to: Routes.signup });
