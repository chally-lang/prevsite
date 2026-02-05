// Import necessary modules for authentication, database access, and security
import { NextAuthOptions } from "next-auth"; // Types for NextAuth configuration
import CredentialsProvider from "next-auth/providers/credentials"; // Provider for email/password login
import { prisma } from "@/lib/prisma"; // Shared database client
import { compare } from "bcryptjs"; // Utility to safely compare hashed passwords

/**
 * NextAuth Configuration Options
 * Defines how users are authenticated, session management, and JWT handling.
 */
export const authOptions: NextAuthOptions = {
  // Use JSON Web Tokens for session management
  session: {
    strategy: "jwt",
  },
  // Custom pages for authentication flows
  pages: {
    signIn: "/login",
  },
  // Secret key used to sign and encrypt auth cookies
  secret: process.env.NEXTAUTH_SECRET,
  // Configure authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      /**
       * authorize function
       * Validates user credentials against the database.
       */
      async authorize(credentials) {
        try {
          // Ensure both email and password were provided
          if (!credentials?.email || !credentials?.password) {
            return null; // Fail authentication
          }

          // Look up the user in the database by their unique email address
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          // If no user is found with that email, fail authentication
          if (!user) {
            return null;
          }

          // Compare the provided plain-text password with the hashed password in the DB
          const isPasswordValid = await compare(credentials.password, user.password);

          // If the password doesn't match, fail authentication
          if (!isPasswordValid) {
            return null;
          }

          // On success, return a user object that will be encoded into the JWT
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role, // Include the user's role (ADMIN, STUDENT, etc.)
          };
        } catch (error) {
          // Log any unexpected errors during the authorization process
          console.error("Auth authorize error:", error);
          return null;
        }
      },
    }),
  ],
  // Callbacks to customize JWT and session behavior
  callbacks: {
    /**
     * session callback
     * Attaches custom user data (id, role) to the session object for use in the frontend.
     */
    async session({ session, token }) {
      try {
        if (token && session.user) {
          session.user.id = token.id as string; // Attach user ID from the token
          session.user.role = token.role as any; // Attach user role from the token
        }
      } catch (error) {
        console.error("Auth session callback error:", error);
      }
      return session;
    },
    /**
     * jwt callback
     * Attaches custom user data to the JWT token when it's created or updated.
     */
    async jwt({ token, user }) {
      try {
        if (user) {
          token.id = user.id; // Store user ID in the token
          token.role = user.role; // Store user role in the token
        }
      } catch (error) {
        console.error("Auth jwt callback error:", error);
      }
      return token;
    },
  },
};
