## 9 - Tab Navigation & Dashboard Layout

In this section, we move beyond stack-based navigation to implement **Tab Navigation**. This is the standard "bottom bar" navigation seen in most mobile apps, allowing users to switch between top-level views like a Profile, a Feed, or a Creation screen.

---

### 1. Introduction to Tab Navigation

While **Stack navigation** handles screens that sit on top of each other (like a deck of cards), **Tabs** provide a persistent bottom-navigation bar. This allows users to switch between the primary sections of an app quickly without losing their place in each tab's individual state.

### 2. Creating a Dashboard Route Group

To organize pages visible only to logged-in users, we use a **Route Group** (a folder name wrapped in parentheses). This keeps the project structure clean without affecting the URL path.

Just like our `(auth)` group, we wrap the folder name in parentheses so that the folder name itself is omitted from the URL. This allows us to link directly to the filename or component name.

- **Folder Structure:** `/app/(dashboard)/`
- **New Pages Created:**
  - `profile.jsx`: User details and logout.
  - `books.jsx`: List of all books.
  - `create.jsx`: Form to add new books.

---

### 3. Setting Up the Tabs Layout

To implement tab navigation, create a `_layout.jsx` inside the `(dashboard)` folder. This file defines how the navigation bar looks and behaves.

**File:** `./app/(dashboard)/_layout.jsx`

```javascript
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { Colors } from "../../constants/Colors";

export default function DashboardLayout() {
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
        tabBarActiveTintColor: theme.iconColorFocused,
        tabBarInactiveTintColor: theme.iconColor,
      }}
    >
      <Tabs.Screen name="books" options={{ title: "Books" }} />
      <Tabs.Screen name="create" options={{ title: "Create" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
```

---

### 4. Key Tab Components & Props

| Property                    | Description                                                                             |
| :-------------------------- | :-------------------------------------------------------------------------------------- |
| **`screenOptions`**         | Global settings applied to every tab in this layout (e.g., hiding headers).             |
| **`tabBarActiveTintColor`** | The color of the label and icon when the tab is currently selected.                     |
| **`tabBarStyle`**           | Customizes the physical bar at the bottom (height, background color, padding).          |
| **`Tabs.Screen`**           | Used inside `<Tabs>` to define specific pages or override settings for individual tabs. |

---

### 5. Cleaning up the Root Layout

To prevent **double headers** (one appearing from the root Stack and one from the Tabs layout), ensure the `(dashboard)` group has its header hidden in your main entry point.

**File:** `./app/_layout.jsx`

```javascript
<Stack>
  <Stack.Screen name="(auth)" options={{ headerShown: false }} />
  <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
</Stack>
```

> [!TIP]
> **Pro Tip:** If your navigation changes don't show up immediately, reload the app manually (shake the phone or press **'r'** in the terminal). Live reload sometimes misses structural navigation updates.
