# Video 1 — Introduction & Setup

This branch contains the initial Expo Router setup for the app.
We removed the default root `App.js` and `index.js`, and created a new `app` folder with `app/index.jsx`.

Remove the App.js and index.js from the Project Repo Folder

![image.png](<images/image%20(5).png>)
We will create an `app` folder in the root directory of project which is where the **_expo router_** expects to find all of the page components.
Now inside `app folder` we will create an `index.jsx` → to represent the homepage component of the application

`index.jsx` inside the `app` this component that generally gets rendered when we run the application. Also, any additional pages that we want the app to have in the future, they're all going to go inside this app folder

[ extension React Snipped on VSCode ]

![image.png](<images/image%20(6).png>)

use and here we use Snippet from that → `RFNES` `rfnes` → to have boilder code

./app/index.jsx

```jsx
import { StyleSheet, Text, View } from "react-native";
import React from "react";

const index = () => {
  return (
    <View>
      <Text>index</Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
```

and rename `index` to `home`

---

#### Now

it is the time reload the App. and we get the Error as the Application-or-React-native is looking for the initial index.js to run and we don’t have that and you can see here the entry point in the `package.json`

![image.png](<images/asfd%20(1).png>)
![image.png](<images/asfd%20(2).png>)

The first thing we need to do is install the Expo router package because the Expo router knows to look inside the app folder for an index page to be that homepage. And the second thing we need to do is update the entry point to the application to reference the Expo router.

check URL : [`https://docs.expo.dev/router/installation/`](https://docs.expo.dev/router/installation/)

```jsx
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
```

add this into ./app.json in the `expo` : { —, }

```jsx
"scheme": "newapp",
    "experiments": {
      "typedRoutes": true
    },
```

and edit and make this in the ./package.json

```jsx

  "main": "expo-router/entry",

```

It's all going to be up here in the top left hidden away.

![1000476004.jpg](images/1000476004.jpg)

what we have done

1- we've created a new React Native app.
2- We've set up Expo Go on our phone to preview the app as we develop.
3- we've also installed the Expo router package, which is going to make it really easy to have multiple screens and navigate between them later on

---
