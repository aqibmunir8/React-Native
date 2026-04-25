import { Stack, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { Colors } from "../../constants/Colors";

const DashboardLayout = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Hide the top header bar
        tabBarStyle: {
          backgroundColor: theme.navBackground,
          height: 90,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      <Tabs.Screen name="create" options={{ title: "Create" }} />
      <Tabs.Screen name="books" options={{ title: "Books" }} />
    </Tabs>
  );
};

export default DashboardLayout;
