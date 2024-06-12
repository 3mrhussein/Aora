import { Models } from 'react-native-appwrite';
import { UserDocumentType } from './user.types';
interface VideoType {
  title: string;
  prompt: string;
  thumbnail: string;
  video: string;
  creator: UserDocumentType;
}

export type VideoDocumentType = Models.Document & VideoType;
