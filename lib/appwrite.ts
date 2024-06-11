import {
  Client,
  Account,
  Avatars,
  Databases,
  Storage,
} from 'react-native-appwrite';

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.amr.aora',
  projectId: '665b796b00331e4f5966',
  databaseId: '665c204400364aee6c2b',
  usersCollectionId: '665c206400238995add5',
  videosCollectionId: '665c20940025bd2d1591',
  storageId: '665c2231002f55b7fc9d',
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);
export const account = new Account(client);
export const avatars = new Avatars(client);

export const databases = new Databases(client);

export const storage = new Storage(client);
