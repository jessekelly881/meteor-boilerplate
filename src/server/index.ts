import { Accounts } from "meteor/accounts-base";
import config from "/src/config";

const quickActionEmail = Handlebars.templates["quickActionEmail"];

// @see https://docs.meteor.com/api/accounts-multi.html#AccountsCommon-config
Accounts.config({
    sendVerificationEmail: true,
    passwordResetTokenExpirationInDays: 2,
});

Accounts.emailTemplates.siteName = config.app.name;

Accounts.emailTemplates.verifyEmail.subject = () => "Verify email address";
Accounts.emailTemplates.verifyEmail.html = (user, url: string) =>
    quickActionEmail({
        url,
        title: "Verify your email address",
        actionText: "Verify email",
        description:
            "Welcome to MeteorApp! Click the link below to verify your email address",
        subtext:
            "If you didn't request to join MeteorApp, just ignore this email.",
    });
