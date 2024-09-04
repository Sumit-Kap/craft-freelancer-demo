import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.googleClientId as string,
      clientSecret: process.env.googleClientSecret as string,
    }),
  ],
});
