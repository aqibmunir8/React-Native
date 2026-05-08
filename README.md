# Video 4 — Layouts and Stack Navigation

This branch adds `app/_layout.jsx` and uses the Expo Router `Stack` component to enable native stack-style navigation.

## What was implemented

- Created `app/_layout.jsx` as the layout wrapper.
- Used `<Stack />` to render screens with a native header bar.
- Configured global stack options with `screenOptions`.
- Added individual screen entries for `index` and `about`.

## Example layout file

```jsx
import { StyleSheet } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4f4f4',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="about"
        options={{
          title: 'About Us',
        }}
      />
    </Stack>
  )
}

export default _layout

const styles = StyleSheet.create({})
```

## Key concepts

### Layout file

- `_layout.jsx` wraps your pages and acts like a shared page template.
- It can include headers, footers, and global navigation settings.
- Layouts use `<Slot />` or `<Stack />` to render child routes.

### Stack navigation

- `<Stack />` provides native-like screen transitions.
- It automatically renders a header bar and back button.
- Use `<Stack.Screen />` to customize titles and per-screen options.

## Customization

- `headerStyle` customizes the header background.
- `headerTintColor` changes the header text and back button color.
- `headerTitleStyle` controls title appearance.
- `headerShown: false` can hide the top bar for a specific screen.

## Notes

This branch illustrates how to move from simple file-based routes to a structured navigation layout with shared app chrome and native stack behavior.
