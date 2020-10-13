import { Meteor } from "meteor/meteor";
import { init as startSessionTimeout } from "meteor/simonsimcity:client-session-timeout";
import { useTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import { render } from "react-dom";
import { JSONSchemaBridge } from "uniforms-bridge-json-schema";
import LoginData, {
    validator as loginDataValidator,
} from "/src/common/types/loginData";
import SignupData, {
    validator as signupDataValidator,
} from "/src/common/types/signupData";
import ForgotPassData, {
    validator as forgotPassDataValidator,
} from "/src/common/types/forgotPassData";
import "./serviceWorker.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "normalize.css";

import { AutoForm } from "uniforms-unstyled";
import { Accounts } from "meteor/accounts-base";
import i18n from "meteor/universe:i18n";
import { Lang, getLang } from "/src/common/i18n";

console.log(getLang());
const t = i18n.__;

// getLangs :: () => String
const getLangs = (): Lang[] =>
    i18n.getLanguages().map((code: String) => ({
        code,
        nativeName: i18n.getLanguageNativeName(code),
    }));

const loginSchema = new JSONSchemaBridge(LoginData, loginDataValidator);
const signupSchema = new JSONSchemaBridge(SignupData, signupDataValidator);
const forgotPassSchema = new JSONSchemaBridge(
    ForgotPassData,
    forgotPassDataValidator,
);

const login = ({ email, password }): LoginData => {
    Meteor.loginWithPassword(email, password, x => alert(JSON.stringify(x)));
};

const signup = ({ email, password }: SignupData) =>
    Accounts.createUser({
        email,
        username: email,
        password,
        profile: {
            locale: i18n.getLocale(),
        },
    });

const forgotPass = ({ email }: ForgotPassData) =>
    Accounts.forgotPassword({ email });

const AppRouter = () => (
    <Router>
        <Switch>
            <Route exact path="/">
                <span>Home</span>
                <Link to="/login">Login</Link>
            </Route>
            <Route exact path="/login">
                <h2>{t("login")}</h2>
                <AutoForm schema={loginSchema} onSubmit={login} />
                <Link to="/signup">{t("signup")}</Link>
                &nbsp;
                <Link to="/forgot-pass">{t("forgotPass")}</Link>
            </Route>
            <Route exact path="/signup">
                <h2>{t("signup")}</h2>
                <AutoForm schema={signupSchema} onSubmit={signup} />
                <Link to="/login">{t("login")}</Link>
            </Route>
            <Route exact path="/forgot-pass">
                <h2>{t("forgotPass")}</h2>
                <AutoForm schema={forgotPassSchema} onSubmit={forgotPass} />
                <Link to="/login">{t("login")}</Link>
            </Route>
        </Switch>
    </Router>
);

// getBrowserLang :: () => String
const getBrowserLang = () =>
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    "en-US";

const App = () => {
    const user = useTracker(() => Meteor.user());
    const [locale, setLocale] = useState(i18n.getLocale());

    i18n.onChangeLocale(setLocale);

    i18n.onChangeLocale((locale: string) => {
        if (user) {
            Meteor.users.update(Meteor.userId(), {
                $set: {
                    profile: {
                        locale,
                    },
                },
            });
        }
    });

    return (
        <>
            <span>{user?.username || "Anon"}</span>
            <button onClick={Meteor.logout}>{t("logout")}</button>
            &nbsp; Locale: {i18n.getLanguageNativeName(locale)}
            <select onChange={e => i18n.setLocale(e.target.value)}>
                {getLangs().map((lang: Lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.nativeName}
                    </option>
                ))}
            </select>
            <hr />
            <AppRouter />
        </>
    );
};

Meteor.startup(() => {
    render(<App />, document.getElementById("app"));
});

// Enable session timeout
const minToMs = (n: number) => 1000 * n;
startSessionTimeout({ expiryTime: minToMs(15) });
