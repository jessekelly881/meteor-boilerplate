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

import { AutoForm } from "uniforms-unstyled";
import { Accounts } from "meteor/accounts-base";

const minToMs = (n: number) => 1000 * n;

const loginSchema = new JSONSchemaBridge(LoginData, loginDataValidator);
const signupSchema = new JSONSchemaBridge(SignupData, signupDataValidator);
const forgotPassSchema = new JSONSchemaBridge(
    ForgotPassData,
    forgotPassDataValidator,
);

const LoginForm = () => {
    const user = useTracker(() => Meteor.user());

    const login = ({ email, password }): LoginData => {
        Meteor.loginWithPassword(email, password, x =>
            alert(JSON.stringify(x)),
        );
    };

    const forgotPass = ({ email }: ForgotPassData) =>
        Accounts.forgotPassword({ email });

    const signup = ({ email, password }: SignupData) =>
        Accounts.createUser({
            email,
            username: email,
            password,
        });

    return (
        <>
            <span>{user?.username || "Anon"}</span>
            &nbsp;
            <button onClick={Meteor.logout}>Logout</button>
            <br />
            <br />
            <h2>Login</h2>
            <AutoForm schema={loginSchema} onSubmit={login} />
            <br />
            <br />
            <h2>Signup</h2>
            <AutoForm schema={signupSchema} onSubmit={signup} />
            <br />
            <br />
            <h2>Forgot pass</h2>
            <AutoForm schema={forgotPassSchema} onSubmit={forgotPass} />
        </>
    );
};

Meteor.startup(() => {
    render(<LoginForm />, document.getElementById("app"));
});

// Enable session timeout
startSessionTimeout({ expiryTime: minToMs(15) });
