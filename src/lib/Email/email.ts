import nodemailer from "nodemailer";

type SendEmailProps = {
  to: string;
  subject: string;
  html: string;
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmail = async ({ to, subject, html }: SendEmailProps) => {
  try {
    const result = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });

    return {
      success: true,
      messageId: result.messageId,
    };
  } catch (error) {
    console.log("Email send fail", error);
    return {
      success: false,
      error,
    };
  }
};
