export const sendVerificationEmail = async ({ email, token }) => {
  const provider = process.env.EMAIL_PROVIDER || 'log';
  const verificationUrl = `${process.env.CLIENT_URL || 'http://localhost:3000'}/verify-email/${token}`;

  if (provider === 'disabled') {
    return { sent: false, provider, reason: 'Email delivery disabled' };
  }

  // Hook point for real providers (SMTP, Resend, SES, etc.)
  // For now we keep the template dependency-light and log email payload.
  console.log('📧 Verification email hook', {
    provider,
    to: email,
    verificationUrl
  });

  return { sent: true, provider };
};
