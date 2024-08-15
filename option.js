import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const option = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 30,
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          if (credentials.identity_number) {
            console.log("login by nik");
            // return null if user doesn't input a data
            if (!credentials.identity_number || !credentials.password)
              return null;

            // check if the user with the identity_number actually exists
            const user = await prisma.user.findUnique({
              where: {
                identity_number: credentials.identity_number,
              },
            });

            // if the user doesn't exist, return null
            if (!user) return null;

            if (credentials.role === "ADMIN") {
              if (user.role !== "ADMIN" && user.role !== "SUPERADMIN")
                return null;
            } else if (credentials.role === "UMKM") {
              if (user.role !== "UMKM") {
                console.log("not umkm");
                return null;
              }
            } else {
              return null;
            }

            console.log(credentials.role);

            // variable to check password
            let isPassValid = false;

            // if user exists, compare the password
            // if password is null, check with the temporary password
            if (!user.password) {
              // check if the password is the same as the temporary password
              if (credentials.password === user.temp_password) {
                isPassValid = true;
              } else {
                isPassValid = false;
              }
            } else {
              // if there's a password, check in this condition.
              isPassValid = await bcrypt.compare(
                credentials.password,
                user.password
              );
            }

            if (!isPassValid) return null;

            return user;
          } else if (credentials.email) {
            console.log("login by email");
            // check if there is email and password
            if (!credentials.email || !credentials.password) {
              return null;
            }

            console.log(credentials.email);
            console.log(credentials.password);

            // get and check if user with this email is exist
            const user = await prisma.user.findUnique({
              where: {
                email: credentials.email,
              },
            });

            console.log(user);

            // if the role is user, return null
            if (user.role !== "USER") {
              return null;
            }

            // if there is no user with this email return null
            if (!user) return null;

            // variable to check password
            let isPassValid = false;

            // if user exists, compare the password
            // if password is null, check with the temporary password
            if (!user.password) {
              // check if the password is the same as the temporary password
              if (credentials.password === user.temp_password) {
                isPassValid = true;
              } else {
                isPassValid = false;
              }
            } else {
              // if there's a password, check in this condition.
              isPassValid = await bcrypt.compare(
                credentials.password,
                user.password
              );
            }

            if (!isPassValid) return null;

            return user;
          }
        } catch (error) {
          console.log(error.message);
        }
      },
    }),
    // CredentialsProvider({
    //   name: "credentials_umkm",
    //   credentials: {},
    //   async authorize(credentials) {
    //     try {
    //       console.log("login by email");
    //       // return null if user doesn't input a data
    //       if (!credentials.identity_number || !credentials.password)
    //         return null;

    //       // check if the user with the identity_number actually exists
    //       const user = await prisma.user.findUnique({
    //         where: {
    //           identity_number: credentials.identity_number,
    //         },
    //       });

    //       // if the user doesn't exist, return null
    //       if (!user) return null;

    //       // if the user doesn't exist, return null
    //       if (user.role !== "UMKM") return null;

    //       // variable to check password
    //       let isPassValid = false;

    //       // if user exists, compare the password
    //       // if password is null, check with the temporary password
    //       if (!user.password) {
    //         // check if the password is the same as the temporary password
    //         if (credentials.password === user.temp_password) {
    //           isPassValid = true;
    //         } else {
    //           isPassValid = false;
    //         }
    //       } else {
    //         // if there's a password, check in this condition.
    //         isPassValid = await bcrypt.compare(
    //           credentials.password,
    //           user.password
    //         );
    //       }

    //       if (!isPassValid) return null;

    //       return user;
    //     } catch (error) {
    //       console.log(error.message);
    //     }
    //   },
    // }),
  ],
  pages: {
    signIn: ["/auth/signin", "/auth/user/signin", "auth/umkm/signin"],
    signOut: "/auth/signout",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.role = user.role;
      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
  },
};
