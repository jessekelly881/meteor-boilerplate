import { Accounts } from 'meteor/accounts-base';
import config from '/src/config';
import { quickActionEmail } from '/src/server/email';

// @see https://docs.meteor.com/api/accounts-multi.html#AccountsCommon-config
Accounts.config({
  sendVerificationEmail: true,
  passwordResetTokenExpirationInDays: 2,
});

Accounts.emailTemplates.siteName = config.app.name;

// TODO: Translate email text based on user.locale
Accounts.emailTemplates.verifyEmail.subject = () => 'Verify email address';
Accounts.emailTemplates.verifyEmail.html = (_, url: string) =>
  quickActionEmail({
    url,
    title: 'Verify your email address',
    actionText: 'Verify email',
    description: 'Click the link below to verify your email address',
    subtext:
            "If you didn't request to verify this email address, just ignore this email.",
  });

// TODO: Translate email text based on user.locale
Accounts.emailTemplates.resetPassword.subject = () => 'Password reset';
Accounts.emailTemplates.resetPassword.html = (_, url: string) =>
  quickActionEmail({
    url,
    title: 'Reset your password',
    actionText: 'Reset password',
    description: 'Click the link below to reset your password',
    subtext:
            "If you didn't request to reset your password, just ignore this email.",
  });
