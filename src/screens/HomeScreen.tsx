import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import IdeaBank from "./IdeaBank";
import Counter from "./Counter";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Profile from "./Profile";
import PostNavigator from "../navigation/PostNavigator";

const HomeScreen = () => {
  const Tabs = createBottomTabNavigator();
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName:
            | keyof typeof Ionicons.glyphMap
            | undefined
            | keyof typeof MaterialCommunityIcons.glyphMap;

          if (route.name === "Idea Bank") {
            iconName = focused ? "bulb" : "bulb-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === "Counter") {
            iconName = "counter";
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Coin Flip") {
            iconName = focused ? "cash" : "cash-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === "Posts") {
            iconName = focused ? "post" : "post-outline";
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Profile") {
            iconName = "face-man-profile";
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          }
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        tabBarStyle: {
          paddingBottom: 5,
          height: 70,
        },
      })}
    >
      <Tabs.Screen name="Idea Bank" component={IdeaBank}></Tabs.Screen>
      <Tabs.Screen name="Counter" component={Counter}></Tabs.Screen>
      <Tabs.Screen name="Posts" component={PostNavigator}></Tabs.Screen>
      <Tabs.Screen name="Profile" component={Profile}></Tabs.Screen>
    </Tabs.Navigator>
  );
};

export default HomeScreen;
