import { StackScreenProps } from "@react-navigation/stack";

export type RootStackParamList = {
  Login: undefined;
  AuthLoading: undefined;
  Profile: undefined;
  Home: undefined;
  Post: undefined;
  SinglePost: { id: number };
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
export type AuthLoadingScreenProps = StackScreenProps<
  RootStackParamList,
  "AuthLoading"
>;
export type ProfileScreenProps = StackScreenProps<
  RootStackParamList,
  "Profile"
>;
export type PostScreenProps = StackScreenProps<RootStackParamList, "Post">;
export type SinglePostScreenProps = StackScreenProps<
  RootStackParamList,
  "SinglePost"
>;
