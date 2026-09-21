import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { signInSchema } from "@/lib/validation";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = signInSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;

        if (user.isSuspended) {
          throw new Error("Account is suspended. Please contact support.");
        }

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) {
          // Log failed login attempt
          try {
            await prisma.auditLog.create({
              data: {
                userId: user.id,
                action: "FAILED_LOGIN",
                details: `Failed login attempt for email ${email}`,
              },
            });
          } catch {
            // ignore audit log failure
          }
          return null;
        }

        // Log successful login
        try {
          await prisma.auditLog.create({
            data: {
              userId: user.id,
              action: "LOGIN",
              details: `User logged in with role ${user.role}`,
            },
          });
        } catch {
          // ignore
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role || "REGISTERED_USER";
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string;
      }
      if (token?.role) {
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
});

