import { Resend } from 'resend';

export const sendEmail = async (subject: string, template: any) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'ibragimrustamov85@gmail.com',
    subject,
    text: '',
    react: template,
  });

  if (error) {
    throw error;
  }

  return data;
};
