import { apiClient, type ApiClientResponse } from '~/api/apiClient';
import type { PostEntity, Query } from '~/types';

export const getPosts = (query: Query): Promise<ApiClientResponse<PostEntity[]> | null> => {
  return apiClient.get(`/posts`, query);
};

export const getPostById = (id: string): Promise<ApiClientResponse<PostEntity> | null> => {
  return apiClient.get(`/posts/${id}`);
};
