### Video 6: Custom Themed UI Components

In this section, I moved away from hardcoded styles and created a reusable suite of themed components. This allows the app to switch seamlessly between Light and Dark modes using a single source of truth (Colors.js).

#### Key Features Implemented:

- **Centralized Theme Logic:** Created components that automatically detect the system `colorScheme` using the `useColorScheme` hook.
- **ThemedView:** A wrapper component that handles background colors for both modes.
- **ThemedText:** A smart text component that switches between `text` and `title` colors based on a `title` prop.
- **ThemedLogo:** Automatically toggles between `logo_light.png` and `logo_dark.png` depending on the theme.
- **Spacer Utility:** A clean way to handle layout spacing without cluttering styles with repetitive margins and paddings.
- **ThemedCard:** A reusable container for UI elements with pre-defined border radius and themed background.

---

- **ThemedView:** A smart container that automatically sets the background color based on the current system theme (Light/Dark).

```javascript
./components/ThemedView.jsx
```

```javascript
import ThemedView from "../components/ThemedView";

const Home = () => {
  return (
    <ThemedView style={styles.container}>{/* Content goes here */}</ThemedView>
  );
};
```

---

- **ThemedText:** A typography component that toggles between `text` and `title` colors using a boolean `title` prop.

```javascript
./components/ThemedText.jsx
```

```javascript
import ThemedText from "../components/ThemedText";

const Home = () => {
  return (
    <ThemedView>
      <ThemedText title={true} style={styles.title}>
        Main Heading
      </ThemedText>
      <ThemedText>Regular body text description.</ThemedText>
    </ThemedView>
  );
};
```

---

- **ThemedLogo:** Automatically toggles between `logo_light.png` and `logo_dark.png` depending on the theme.

```javascript
./components/ThemedLogo.jsx
```

```javascript
import ThemedLogo from "../components/ThemedLogo";

const Home = () => {
  return (
    <ThemedView>
      <ThemedLogo style={styles.img} />
    </ThemedView>
  );
};
```

---

- **ThemedCard:** A pre-styled container with specific padding and radius that uses the theme's `uiBackground` color.

```javascript
./components/ThemedCard.jsx
```

```javascript
import ThemedCard from "../components/ThemedCard";
import ThemedText from "../components/ThemedText";

const Home = () => {
  return (
    <ThemedCard>
      <ThemedText>This text sits inside a themed card.</ThemedText>
    </ThemedCard>
  );
};
```

---

- **Spacer:** A utility component used to create consistent vertical or horizontal gaps without writing custom margin styles.

```javascript
./components/Spacer.jsx
```

```javascript
import Spacer from "../components/Spacer";

const Home = () => {
  return (
    <ThemedView>
      <ThemedText title={true}>Top Section</ThemedText>
      <Spacer height={20} />
      <ThemedText>Bottom Section after a 20px gap</ThemedText>
    </ThemedView>
  );
};
```

---

### 🛠️ Components Created:

| Component    | Purpose                                                      |
| :----------- | :----------------------------------------------------------- |
| `ThemedView` | Replaces standard `View` to provide theme-aware backgrounds. |
| `ThemedText` | Replaces standard `Text` to provide theme-aware typography.  |
| `ThemedLogo` | Swaps logos dynamically based on Light/Dark mode.            |
| `ThemedCard` | A styled container for grouping content.                     |
| `Spacer`     | A layout utility for consistent vertical/horizontal spacing. |
