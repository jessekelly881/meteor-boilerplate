import { Accounts } from "meteor/accounts-base";
import config from "/src/config";

Accounts.config({
    // @see https://docs.meteor.com/api/accounts-multi.html#AccountsCommon-config
    sendVerificationEmail: true,
});

Accounts.emailTemplates.siteName = config.app.name;
