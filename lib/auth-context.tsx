import { createContext, useContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";
import { account } from "./appwrite";

type AuthContextType = {
  user: Models.User<Models.Preferences> | null;
  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (email: string, password: string) => Promise<string | null>;
  isLoadingUser: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProdivder({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );

  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const session = await account.get();
      setUser(session);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoadingUser(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      await account.create({ userId: ID.unique(), email, password });
      await signIn(email, password);
      await getUser();
      return null;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return "An error occured during sign up.";
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await account.createEmailPasswordSession({ email, password });
      await getUser();
      return null;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return "An error occured during sign in.";
    }
  };

  const signOut = async () => {
    try {
      await account.deleteSession({ sessionId: "current" });
      setUser(null);
    } catch (error) {
      console.log("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, signUp, signIn, isLoadingUser, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
