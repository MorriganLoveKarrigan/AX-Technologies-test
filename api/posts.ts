import { apiClient } from '~/api/apiClient';
import type { PostEntity, Query } from '~/types';

export const getPosts = (query: Query): Promise<PostEntity[] | null> => {
  return apiClient.get(`/posts`, query);
};

export const getPostById = (id: string): Promise<PostEntity | null> => {
  return apiClient.get(`/posts/${id}`);
};
