import type { PostEntity } from '~/types';

export interface PostListProps {
  posts: PostEntity[] | null;
  loading: boolean;
}
