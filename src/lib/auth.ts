import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { emailOTP, twoFactor } from "better-auth/plugins";
import { sendEmail } from "./Email/email";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("safer");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          return {
            data: {
              ...user,
              twoFactorEnabled: true,
            },
          };
        },
      },
    },
  },

  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    emailOTP({
      overrideDefaultEmailVerification: true,

      otpLength: 6,

      expiresIn: 300,

      allowedAttempts: 3,

      // sendVerificationOnSignUp: true,

      async sendVerificationOTP({ email, otp, type }) {
        if (type === "email-verification") {
          await sendEmail({
            to: email,
            subject: "Verify your email - Safer",
            html: `
            <div>
              <h1>verify your email</h1> 

              <p>Your 6 digit verification code is:<p>

              <h1>${otp}<h1/>

              <p>This code will expire in 5 minutes.</p>
            </div>
            `,
          });
        }
      },
    }),

    // for 2FA
    twoFactor({
      otpOptions: {
        async sendOTP({ user, otp }) {
          console.log("from two factor plugin auth.ts", { user, otp });

          await sendEmail({
            to: user.email,
            subject: "Your login verification code - Safer",
            html: `
            <div>
            <h1>Login verification</h1>

            <p>Your login verification code is:</p>

            <h2>${otp}</h2>

            <p>This code will expire soon.</p>
            </div>
            `,
          });
        },
      },
    }),
  ],
});
