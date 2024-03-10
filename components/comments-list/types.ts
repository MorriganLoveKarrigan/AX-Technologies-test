import type { CommentEntity } from '~/types';

export interface CommentsListProps {
  comments: CommentEntity[];
  loading: boolean;
}
