import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submit = e => {
        e.preventDefault();

        Meteor.loginWithPassword(username, password);
    };

    return (
        <form onSubmit={submit} className="login-form">
            <label htmlFor="username">Username</label>

            <input
                type="text"
                placeholder="Username"
                name="username"
                required
                onChange={e => setUsername(e.target.value)}
            />

            <label htmlFor="password">Password</label>

            <input
                type="password"
                placeholder="Password"
                name="password"
                required
                onChange={e => setPassword(e.target.value)}
            />

            <button type="submit">Log In</button>
        </form>
    );
};

Meteor.startup(() => {
    render(
        <>
            <LoginForm />
            <span>{Meteor.userId() || "Anon"}</span>
        </>,
        document.getElementById("app"),
    );
});
