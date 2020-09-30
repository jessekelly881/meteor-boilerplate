import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";

Meteor.startup(() => {
    render(
        <h1>Simple Meteor App with React</h1>,
        document.getElementById("app"),
    );
});
