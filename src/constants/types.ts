export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

type Reactions = {
  likes: number;
  dislikes: number;
};

export type Posts = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reactions;
  views: number;
  userId: number;
};

export interface PostsResponse {
  posts: Posts[];
  total: number;
  skip: number;
  limit: number;
}
