import { Accounts } from 'meteor/accounts-base';
import config from '/src/config';

// @see https://docs.meteor.com/api/accounts-multi.html#AccountsCommon-config
Accounts.config({
  sendVerificationEmail: true,
  passwordResetTokenExpirationInDays: 2,
});

Accounts.emailTemplates.siteName = config.app.name;
