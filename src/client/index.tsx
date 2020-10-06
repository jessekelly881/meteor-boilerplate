import Ajv from "ajv";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { render } from "react-dom";
import { JSONSchemaBridge } from "uniforms-bridge-json-schema";
import { AutoForm } from "uniforms-unstyled";

const loginSchema = {
    title: "Login",
    type: "object",
    properties: {
        username: { type: "string" },
        password: { type: "string" },
    },
    required: ["username", "password"],
};

const ajv = new Ajv({ allErrors: true, useDefaults: true });

function createValidator(schema: object) {
    const validator = ajv.compile(schema);

    return (model: object) => {
        validator(model);
        return validator.errors?.length ? { details: validator.errors } : null;
    };
}

const schemaValidator = createValidator(loginSchema);
const bridge = new JSONSchemaBridge(loginSchema, schemaValidator);

const LoginForm = () => {
    const user = useTracker(() => Meteor.user());

    const login = ({ username, password }) => {
        Meteor.loginWithPassword(username, password, x =>
            alert(JSON.stringify(x)),
        );
    };

    return (
        <>
            <AutoForm schema={bridge} onSubmit={login} />
            <button onClick={Meteor.logout}>Logout</button>
            <span>{user?.username || "Anon"}</span>
        </>
    );
};

Meteor.startup(() => {
    render(<LoginForm />, document.getElementById("app"));
});
