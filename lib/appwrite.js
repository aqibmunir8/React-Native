import { Client, Account, Avatars, Databases } from "react-native-appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("69ec70d9001345eceb34")
  .setPlatform("xyz.003301.shelfie");

export const account = new Account(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);
