import { NavLink, Route, BrowserRouter } from 'react-router-dom';
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

const route = (path: Routes = null) => (
  children: ReturnType<typeof h>,
  props: Object = {},
) => h(Route, { path, ...props }, children);

type RoutesObj = {
  [key in keyof typeof Routes]: ReturnType<typeof route>;
};

export const routes = getKeys(Routes).reduce(
  (o, r) => Object.assign(o, { [r]: route(r as Routes) }),
  {},
) as RoutesObj;

type RouteMap = (r: Routes) => ReturnType<typeof h>;

/**
 * mappedRouter
 * Given a map from a route to an element, returns the app router.
 */
export const mappedRouter = (routeMap: RouteMap) =>
  h(
    BrowserRouter,
    getKeys(Routes).map(r =>
      h(Route, { path: `/${r}`, component: routeMap(r as Routes) }),
    ),
  );

export default mappedRouter;
