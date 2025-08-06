import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { RootStackParamList } from "../constants/types";
import Posts from "../screens/Posts";
import SinglePost from "../screens/SinglePost";

const PostNavigator = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Post" component={Posts} />
      <Stack.Screen name="SinglePost" component={SinglePost} />
    </Stack.Navigator>
  );
};

export default PostNavigator;
