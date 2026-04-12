import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { Stack, Slot } from "expo-router";
import { Colors } from "../constants/Colors";
import { StatusBar } from "expo-status-bar";

const _layout = () => {
  const colorScheme = useColorScheme();
  let theme = Colors[colorScheme] ?? Colors.light; // Fallback to light if null
  return (
    <>
      <StatusBar value="auto" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.navBackground },
          headerTintColor: theme.title,
        }}
      >
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen
          name="about"
          options={{ title: "About Us", headerShown: true }}
        />
        <Stack.Screen
          name="contact"
          options={{ title: "Contact Us", headerShown: true }}
        />
      </Stack>
    </>
  );
};

export default _layout;

const styles = StyleSheet.create({});
