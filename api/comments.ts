import { apiClient } from '~/api/apiClient';
import type { CommentEntity } from '~/types';

export const getPostsComments = (id: string): Promise<CommentEntity[] | null> => {
  return apiClient.get(`/posts/${id}/comments`);
};
