import { NavLink } from 'react-router-dom';
import { h } from 'react-ts-fns';
import Routes from '/src/common/routes';

const link = (to: Routes) => (
  children: ReturnType<typeof h>,
  props: Object = {},
) => h(NavLink, { to, ...props }, children);

export const loginLink = link(Routes.login);
export const signupLink = link(Routes.signup);
