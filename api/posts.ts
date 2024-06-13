import { config, databases, storage } from '@/lib/appwrite';
import { ImagePickerAsset } from 'expo-image-picker';
import { ID, ImageGravity, Models, Query } from 'react-native-appwrite';

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      [Query.orderDesc('$createdAt')]
    );
    return posts.documents;
  } catch (err) {
    throw new Error(err as string);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      [Query.orderDesc('$createdAt'), Query.limit(7)]
    );
    return posts.documents;
  } catch (err) {
    throw new Error(err as string);
  }
};
export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      [Query.search('title', query)]
    );
    return posts.documents;
  } catch (err) {
    throw new Error(err as string);
  }
};
export const getUserPosts = async (userId): Promise<Models.Document[]> => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      [Query.equal('creator', userId)]
    );
    return posts.documents;
  } catch (err) {
    throw new Error(err as string);
  }
};

export const getFilePreview = async (fileId, type) => {
  let fileUrl;
  try {
    if (type === 'video') {
      fileUrl = storage.getFileView(config.storageId, fileId);
    } else if (type === 'image')
      fileUrl = storage.getFilePreview(
        config.storageId,
        fileId,
        2000,
        2000,
        ImageGravity.Top,
        100
      );
    else throw new Error('Invalid file type');

    if (!fileUrl) throw Error('File Url is not generated correctly');
    return fileUrl;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const uploadFile = async (file: ImagePickerAsset, type) => {
  if (!file) return;
  const asset = {
    name: file.fileName as string,
    type: file.mimeType ?? (file.type as string),
    size: file.fileSize as number,
    uri: file.uri,
  };
  try {
    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      {
        ...asset,
      }
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);

    return fileUrl;
  } catch (err) {
    throw new Error(err as string);
  }
};

export const createVideo = async (form) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, 'image'),
      uploadFile(form.video, 'video'),
    ]);

    const newPost = await databases.createDocument(
      config.databaseId,
      config.videosCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );
    return newPost;
  } catch (err) {
    throw new Error(err as string);
  }
};
