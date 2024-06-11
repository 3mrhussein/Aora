import { account } from '@/lib/appwrite';

export const signIn = async (email, password) => {
  return await account
    .createEmailPasswordSession(email, password)
    .then((session) => session)
    .catch((err) => {
      throw new Error(err);
    });
};
