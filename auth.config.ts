import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";
export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validateFields = LoginSchema.safeParse(credentials);

        if (validateFields.success) {
          const { email, password } = validateFields.data;
          const user = await getUserByEmail(email);
          //The dont have password when they logged in using google or other social providers. So we dont allow them to use credentials provider, without actual registering.
          if (!user || !user.password) return null;

          //Then if user exists and has password, lets check if password matches to database password
          const passwordsMatch = await bcrypt.compare(password, user.password);

          //Then if password matches, just return user
          if (passwordsMatch) return user;
        }

        //return null by default
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
