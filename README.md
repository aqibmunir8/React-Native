### Video 5: Light and Dark Modes

In this lesson, I implemented dynamic theming. The app now detects whether the user's device is in Light or Dark mode and applies the corresponding color palette automatically using a centralized configuration.

#### Key Features Implemented:

- **System Theme Detection:** Used the `useColorScheme` hook to detect user preferences.
- **Centralized Constants:** Created a `Colors.js` file to act as a single source of truth for all theme-related colors.
- **Dynamic Navigation Styling:** Updated the `_layout.jsx` to dynamically style the header background and tint based on the active theme.
- **Adaptive Status Bar:** Integrated `expo-status-bar` with the `auto` setting to ensure system icons (battery, clock) remain visible regardless of background color.

### 🛠️ Core Implementation:

- **Centralized Colors Object:** Stores light, dark, and universal (primary/warning) colors.

```javascript
./constants/Colors.js
```

```javascript
export const Colors = {
  primary: "#6849a7",
  dark: {
    background: "#252231",
    navBackground: "#201e2b",
    text: "#d4d4d4",
    title: "#fff",
  },
  light: {
    background: "#e0dfe8",
    navBackground: "#e8e7ef",
    text: "#625f72",
    title: "#201e2b",
  },
};
```

---

- **Theme Logic in Layout:** Determining the active theme and applying it to the Stack Header.

```javascript
./app/_layout.jsx
```

```javascript
import { useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";
import { Stack } from "expo-router";

const _layout = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.navBackground },
        headerTintColor: theme.title,
      }}
    >
      {/* Screens */}
    </Stack>
  );
};
```

---

- **Inline Theming (Temporary):** Applying theme colors to individual pages using style arrays before moving to custom components.

```javascript
./app/about.jsx
```

```javascript
const About = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={{ color: theme.text }}>About Page</Text>
    </View>
  );
};
```

---

### ⚠️ Troubleshooting the Status Bar

During development, the status bar icons (clock/battery) were disappearing against the background.

**The Fix:** Instead of hardcoding colors, I used the `StatusBar` component from `expo-status-bar`.

- **Incorrect:** `<StatusBar value="auto" />` (Value is not a valid prop).
- **Correct:** `<StatusBar style="auto" />` (Automatically flips icon colors based on the background).

### 💡 What's Next?

While inline styling works, it's messy to repeat this logic in every file. In Video 6, I will move this logic into **Reusable Themed Components**.

---

**Note on your Status Bar issue:** Even with `style="auto"`, sometimes the simulator gets stuck. A "Hard Reload" (pressing **R** in the terminal) usually forces it to re-calculate the contrast and fix the icon colors!
