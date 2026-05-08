# Video 3 — File-Based Navigation

This branch demonstrates Expo Router file-based routing in React Native.
By placing screen files inside the `app` folder, each file becomes a route.

## What was implemented

- `app/index.jsx` as the home page route `/`
- `app/about.jsx` as the page route `/about`
- Navigation using `<Link href="/about">` and `<Link href="/">`

## Example Home page

```jsx
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reading List App</Text>
      <Link href="/about" style={styles.link}>
        <Text style={styles.linkText}>About Page</Text>
      </Link>
    </View>
  )
}

export default Home
```

## Example About page

```jsx
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const About = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Page</Text>
      <Link href="/" style={styles.link}>
        <Text style={styles.linkText}>Back to Home Page</Text>
      </Link>
    </View>
  )
}

export default About
```

## Key learnings

- `index.jsx` maps to the root route `/`.
- `about.jsx` maps to `/about` automatically.
- `Link` from `expo-router` is used for navigation instead of web anchors.
- `href` values match file paths, so link to home uses `/`.

## Styling links

Use the `style` prop on `Link` to apply consistent branding.

```js
link: {
  marginVertical: 10,
  borderBottomWidth: 1,
}
```

## Notes

This branch shows how easy it is to add new pages to the app simply by creating files in the `app` folder.
