import { Client, Account, Avatars } from "react-native-appwrite";

export const client = new Client();

client.setProject("69ec7eceb34").setPlatform("xyz.elfie");

export const account = new Account(client);
export const avatars = new Avatars(client);
