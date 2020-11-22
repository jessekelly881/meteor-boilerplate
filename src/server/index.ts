import { Accounts } from 'meteor/accounts-base';
import config from '/src/config';
import { quickActionEmail } from '/src/server/email';

const emailContext = {
  config,
};

// TODO: Translate email text based on user.locale
const verifyEmail = {
  subject: () => 'Verify email address',
  html: (_, url: string) =>
    quickActionEmail({
      ...emailContext,
      url,
      title: 'Verify your email address',
      actionText: 'Verify email',
      description: 'Click the link below to verify your email address',
      subtext:
                "If you didn't request to verify this email address, just ignore this email.",
    }),
};

const resetPassword = {
  subject: () => 'Password reset',
  html: (_, url: string) =>
    quickActionEmail({
      ...emailContext,
      url,
      title: 'Reset your password',
      actionText: 'Reset password',
      description: 'Click the link below to reset your password',
      subtext:
                "If you didn't request to reset your password, just ignore this email.",
    }),
};

// @see https://docs.meteor.com/api/accounts-multi.html#AccountsCommon-config
Accounts.config({
  sendVerificationEmail: true,
  passwordResetTokenExpirationInDays: 2,
});

Accounts.emailTemplates.siteName = config.app.name;
Accounts.emailTemplates.verifyEmail = verifyEmail;
Accounts.emailTemplates.resetPassword = resetPassword;
