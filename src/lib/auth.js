import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "auth.db");

export const auth = betterAuth({
  database: new Database(dbPath),
  secret: process.env.BETTER_AUTH_SECRET || "bazardor_super_secret_session_token_key_2026_xyz!",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "dummy_github_id",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "dummy_github_secret",
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "dummy_google_id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "dummy_google_secret",
    },
  },
});
