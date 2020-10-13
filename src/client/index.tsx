import { Meteor } from "meteor/meteor";
import { init as startSessionTimeout } from "meteor/simonsimcity:client-session-timeout";
import { useTracker } from "meteor/react-meteor-data";
import React from "react";
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

    return (
        <>
            <span>{user?.username || "Anon"}</span>
            &nbsp;
            <button onClick={Meteor.logout}>Logout</button>
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
