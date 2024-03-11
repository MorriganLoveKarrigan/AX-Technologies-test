import { apiClient, type ApiClientResponse } from '~/api/apiClient';
import type { CommentEntity } from '~/types';

export const getPostsComments = (id: string): Promise<ApiClientResponse<CommentEntity[]> | null> => {
  return apiClient.get(`/posts/${id}/comments`);
};
