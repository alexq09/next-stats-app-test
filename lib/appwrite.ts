import { Account, Client, TablesDB } from "react-native-appwrite";

export const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_NAME!);

export const account = new Account(client);
export const databases = new TablesDB(client);

export const DATABASE_ID = process.env.EXPO_PUBLIC_DB_ID!;
export const ORG_TABLE_ID = process.env.EXPO_PUBLIC_ORG_TABLE_ID!;
