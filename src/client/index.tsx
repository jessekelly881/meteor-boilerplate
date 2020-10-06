import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { render } from "react-dom";
import { JSONSchemaBridge } from "uniforms-bridge-json-schema";
import LoginData, {
    validator as loginDataValidator,
} from "/src/lib/types/loginData";
import { AutoForm } from "uniforms-unstyled";

const loginSchema = new JSONSchemaBridge(LoginData, loginDataValidator);

const LoginForm = () => {
    const user = useTracker(() => Meteor.user());

    const login = ({ username, password }) => {
        Meteor.loginWithPassword(username, password, x =>
            alert(JSON.stringify(x)),
        );
    };

    return (
        <>
            <AutoForm schema={loginSchema} onSubmit={login} />
            <button onClick={Meteor.logout}>Logout</button>
            <span>{user?.username || "Anon"}</span>
        </>
    );
};

Meteor.startup(() => {
    render(<LoginForm />, document.getElementById("app"));
});
