import { NavLink } from 'react-router-dom';
import { h } from 'react-ts-fns';
import Routes from '/src/common/routes';
import { getKeys } from '/src/utils';

const link = (to: Routes) => (
  children: ReturnType<typeof h>,
  props: Object = {},
) => h(NavLink, { to, ...props }, children);

type LinksObj = {
  [key in keyof typeof Routes]: ReturnType<typeof link>;
};

export const links = getKeys(Routes).reduce(
  (o, r) => Object.assign(o, { [r]: link(r as Routes) }),
  {},
) as LinksObj;

const router = {};
export default router;
