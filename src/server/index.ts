import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

Accounts.config({
    sendVerificationEmail: true,
});

const SEED_USERNAME = "meteorite@m.com";
const SEED_PASSWORD = "password";

Meteor.startup(() => {
    if (!Accounts.findUserByUsername(SEED_USERNAME)) {
        Accounts.createUser({
            username: SEED_USERNAME,
            password: SEED_PASSWORD,
        });
    }
});
