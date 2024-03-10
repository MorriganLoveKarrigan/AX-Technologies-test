export interface PostEntity {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Query {
  _start: string;
  _limit: string;
  q: string;
  sort: string;
}

export interface CommentEntity {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
