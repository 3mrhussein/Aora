import {
  account,
  avatars,
  config,
  databases,
} from '@/lib/appwrite';
import { ID, Query } from 'react-native-appwrite';
import { signIn } from './login';

export const createUser = async (
  email: string,
  password: string,
  name: string
) => {
  const newAccount = await account
    .create(ID.unique(), email, password, name)
    .then(
      function (response) {
        return response;
      },
      function (err) {
        console.log(
          err,
          'Error happened while creating user'
        );
        throw new Error(err);
      }
    );
  if (!newAccount) throw Error('Account is not new');
  const avatarUrl = await avatars.getInitials(name);

  await signIn(email, password).then(() => {
    databases.createDocument(
      config.databaseId,
      config.usersCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username: name,
        avatar: avatarUrl,
      }
    );
  });
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.usersCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );
    if (!currentUser)
      throw new Error('Current User Not Exist');
    return currentUser.documents[0];
  } catch (err) {
    console.log(err);
  }
};

export const logoutUser = async () => {
  try {
    const session = await account.deleteSession('current');
    return session;
  } catch (err) {
    throw new Error(err);
  }
};
