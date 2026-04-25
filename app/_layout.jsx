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
        <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default _layout;

const styles = StyleSheet.create({});
