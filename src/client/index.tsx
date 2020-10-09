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

i18n.addTranslations("en-US", "Common", {
    hello: "Hello {$name} {$0}!",
});

i18n.addTranslations("es-MX", "Common", {
    hello: "Hello {$name} {$0}!",
});

interface Lang {
    code: string;
    nativeName: string;
}

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
        profile: {},
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
                <h2>Login</h2>
                <AutoForm schema={loginSchema} onSubmit={login} />
                <Link to="/signup">Signup</Link>
                &nbsp;
                <Link to="/forgot-pass">Forgot pass</Link>
            </Route>
            <Route exact path="/signup">
                <h2>Signup</h2>
                <AutoForm schema={signupSchema} onSubmit={signup} />
                <Link to="/login">Login</Link>
            </Route>
            <Route exact path="/forgot-pass">
                <h2>Forgot pass</h2>
                <AutoForm schema={forgotPassSchema} onSubmit={forgotPass} />
                <Link to="/login">Login</Link>
            </Route>
        </Switch>
    </Router>
);

const App = () => {
    const user = useTracker(() => Meteor.user());
    const [locale, setLocale] = useState(i18n.getLocale());

    i18n.onChangeLocale(setLocale);

    return (
        <>
            <span>{user?.username || "Anon"}</span>
            <button onClick={Meteor.logout}>Logout</button>
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

// getBrowserLang :: () => String
const getBrowserLang = () =>
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    "en-US";

i18n.setLocale(getBrowserLang());
