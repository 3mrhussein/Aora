import { Models } from 'react-native-appwrite';

export interface UserType {
  username: string;
  email: string;
  avatar: string;
  accountId: string;
}

export type UserDocumentType = Models.Document & UserType;
