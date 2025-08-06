import { StackScreenProps } from "@react-navigation/stack";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  AuthLoading: undefined;
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

export type LoginScreenProps = StackScreenProps<RootStackParamList, "Login">;
export type HomeScreenProps = StackScreenProps<RootStackParamList, "Home">;
export type AuthLoadingScreenProps = StackScreenProps<
  RootStackParamList,
  "AuthLoading"
>;
