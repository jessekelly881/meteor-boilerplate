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
import { createUser } from "/src/common/modules/auth";
import "./serviceWorker";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "normalize.css";

import { AutoForm } from "uniforms-unstyled";
import { Accounts } from "meteor/accounts-base";
import i18n from "meteor/universe:i18n";
import { Lang, defaultLang, t } from "/src/common/i18n";

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
                <AutoForm
                    schema={signupSchema}
                    onSubmit={(data: SignupData) =>
                        signup(data, i18n.getLocale())
                    }
                />
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

const updateUserLocale = (locale: string): void =>
    Meteor.users.update(Meteor.userId(), {
        $set: {
            profile: {
                locale,
            },
        },
    });

const App = () => {
    const user = useTracker(() => Meteor.user());

    if (user) {
        i18n.setLocale(user?.profile?.locale);
    } else {
        i18n.setLocale(defaultLang);
    }

    i18n.onChangeLocale((locale: string) => {
        if (user) {
            updateUserLocale(locale);
        }
    });

    return (
        <>
            <span>{user?.username || "Anon"}</span>
            <button onClick={Meteor.logout}>{t("logout")}</button>
            &nbsp; Locale: {i18n.getLocale()}
            <select onChange={e => i18n.setLocale(e.target.value)}>
                {getLangs().map((lang: Lang) => (
                    <option
                        key={lang.code}
                        selected={i18n.getLocale() == lang.code}
                        value={lang.code}>
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
