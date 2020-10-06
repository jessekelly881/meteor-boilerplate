import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

Accounts.config({
    sendVerificationEmail: true,
});

const SEED_EMAIL = "meteorite@m.com";
const SEED_PASSWORD = "password";

Meteor.startup(() => {
    if (!Accounts.findUserByUsername(SEED_EMAIL)) {
        Accounts.createUser({
            username: SEED_EMAIL,
            email: SEED_EMAIL,
            password: SEED_PASSWORD,
        });
    }
});
