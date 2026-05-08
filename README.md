# Video 2 — Text, View & Image Components

In this lesson, we learned how React Native renders native UI components instead of HTML.
We used `View`, `Text`, and `Image` from `react-native` and styled them with the `StyleSheet` API.

## What we built

- `View` acts like a container, similar to a `div` in web development.
- `Text` is used for any rendered text content.
- `Image` is used for local or remote images, with the required `source` prop.

## Key Components

- **Text:** Output text inside the UI.
- **View:** Layout container that uses Flexbox by default.
- **Image:** Display images from the local `assets` folder.

## Example Code

```jsx
import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import Logo from '../assets/img/logo_light.png';

const Home = () => {
  return (
    <View style={styles.container}>
      <Image source={Logo} style={{ width: 400, height: 100 }} />
      <Text style={[styles.title, { color: 'purple' }]}>The Number 1</Text>
      <Text style={{ margin: 10, marginBottom: 30 }}>Reading List App</Text>
      <View style={styles.card}>
        <Text>Hello, this is a card.</Text>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  card: {
    backgroundColor: '#eee',
    padding: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    elevation: 5,
  },
});
```

## Styling Techniques

- `StyleSheet.create()` is the recommended way to define styles.
- Use `style={[styles.title, { color: 'purple' }]}` to combine multiple style rules.
- Inline styles are also supported via the `style` prop.

## Notes

- We renamed the component to `Home` and kept the styles in a dedicated object.
- The page demonstrates centered layout, text styling, and basic card UI.
