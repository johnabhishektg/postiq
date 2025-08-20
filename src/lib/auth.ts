import { db } from "@/app/db/database";
import { betterAuth } from "better-auth";
import { config } from "dotenv";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

config({ path: ".env.local" });

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
  }),
  socialProviders: {
    linkedin: {
      clientId: process.env.LINKEDIN_CLIENT_ID as string,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
      // disableSignUp: true,
    },
  },
});
