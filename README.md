# Video 1 — Introduction & Setup

This branch contains the initial Expo Router setup for the app.
We removed the default root `App.js` and `index.js`, and created a new `app` folder with `app/index.jsx`.

## What was changed

1. Deleted root `App.js` and `index.js`.
2. Created `app/index.jsx` as the new home page.
3. Updated `package.json` main entry to:

```json
"main": "expo-router/entry"
```

4. Added Expo Router and supporting dependencies:

```bash
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
```

5. Updated `app.json` under `expo`:

```json
"scheme": "newapp",
"experiments": {
  "typedRoutes": true
}
```

## Why these changes matter

- `expo-router` expects an `app` folder where pages like `index.jsx` live.
- The default Expo entrypoint is replaced by `expo-router/entry` so the router can load the app pages.
- This setup prepares the project for file-based navigation and future screens.

## app/index.jsx

```jsx
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const home = () => {
  return (
    <View>
      <Text>index</Text>
    </View>
  )
}

export default home

const styles = StyleSheet.create({})
```

## Summary

- Created a new React Native app structure using Expo Router.
- Made the app ready for page-based routing in the `app` folder.
- Installed required Expo Router packages and updated configuration.
