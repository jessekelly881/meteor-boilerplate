import React from 'react';
import { Meteor } from 'meteor/meteor';
import { init as startSessionTimeout } from 'meteor/simonsimcity:client-session-timeout';
import { useTracker } from 'meteor/react-meteor-data';
import { render } from 'react-dom';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';
import LoginData, {
  validator as loginDataValidator,
} from '/src/common/types/loginData';
import SignupData, {
  validator as signupDataValidator,
} from '/src/common/types/signupData';
import ForgotPassData, {
  validator as forgotPassDataValidator,
} from '/src/common/types/forgotPassData';
import { createUser } from '/src/common/modules/auth';
import './serviceWorker';
import config from '/src/config';
import { tags, h } from 'react-ts-fns';
import { links, mappedRouter } from '/src/client/router';
import Routes, { matchRoutes } from '/src/common/routes';
import 'normalize.css';

import { AutoForm } from 'uniforms-unstyled';
import { Accounts } from 'meteor/accounts-base';
import { i18n } from 'meteor/universe:i18n';
import { Lang, defaultLang, t } from '/src/common/i18n';

const {
  login: loginLink,
  signup: signupLink,
  forgotPass: forgotPassLink,
} = links;

const { h2, hr, span, br, div, button, select, option } = tags;

// getLangs :: () => string
const getLangs = (): Lang[] =>
  i18n.getLanguages().map((code: string) => ({
    code,
    nativeName: i18n.getLanguageNativeName(code),
  }));

const loginSchema = new JSONSchemaBridge(LoginData, loginDataValidator);
const signupSchema = new JSONSchemaBridge(SignupData, signupDataValidator);
const forgotPassSchema = new JSONSchemaBridge(
  ForgotPassData,
  forgotPassDataValidator,
);

const login = ({ email, password }: LoginData): void => {
  Meteor.loginWithPassword(email, password, x => alert(JSON.stringify(x)));
};

/**
 * signup :: (SignupData, string) -> IO ()
 * User signup function.
 */
const signup = ({ email, password, name }: SignupData, locale: string) =>
  createUser({
    email,
    username: email,
    password,
    profile: {
      name,
      locale,
    },
  });

const forgotPass = ({ email }: ForgotPassData) =>
  Accounts.forgotPassword({ email });

const loginPage = () =>
  div([
    h2(t('login')),
        <AutoForm schema={loginSchema} onSubmit={login} />,
        signupLink(t('signup')),
        forgotPassLink(t('forgotPass')),
  ]);

const welcomePage = () =>
  div([span(t('Welcome!')), br(), loginLink(t('login'))]);

const signupPage = () =>
  div([
    h2(t('signup')),
        <AutoForm
            schema={signupSchema}
            onSubmit={(data: SignupData) => signup(data, i18n.getLocale())}
        />,
        loginLink(t('login')),
  ]);

const forgotPassPage = () =>
  div([
    h2(t('forgotPass')),
        <AutoForm schema={forgotPassSchema} onSubmit={forgotPass} />,
        loginLink(t('login')),
  ]);

const appRouter = () =>
  mappedRouter(
    matchRoutes({
      [Routes.login]: () => loginPage,
      [Routes.signup]: () => signupPage,
      [Routes.forgotPass]: () => forgotPassPage,
      [Routes.validateEmail]: () => welcomePage,
    }),
  );

const updateUserLocale = (locale: string): void =>
  Meteor.users.update(Meteor.userId(), {
    $set: {
      profile: {
        locale,
      },
    },
  });

const app = () => {
  const user = useTracker(() => Meteor.user());

  i18n.setLocale(user?.profile?.locale || defaultLang);

  i18n.onChangeLocale((locale: string) => {
    if (user) {
      updateUserLocale(locale);
    }
  });

  return [
    span(user?.username || 'Anon'),
    button({ onClick: Meteor.logout }, t('logout')),
    select(
      { onChange: e => i18n.setLocale(e.target.value) },
      getLangs().map((lang: Lang) =>
        option(
          {
            key: lang.code,
            selected: i18n.getLocale() === lang.code,
            value: lang.code,
          },
          lang.nativeName,
        ),
      ),
    ),
    hr(),
    appRouter(),
    br(),
    br(),
    span(config.copyright),
  ];
};

Meteor.startup(() => {
  render(h(app), document.getElementById('app'));
});

// Enable session timeout
const minToMs = (n: number) => 1000 * n;
startSessionTimeout({ expiryTime: minToMs(15) });
