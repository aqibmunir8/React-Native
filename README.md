## 13- Text Inputs & State Management

### 1. The TextInput Component

React Native provides a native `<TextInput />` for user data entry. By default, it is **completely unstyled**, appearing as an invisible field unless you look closely at the placeholder.

- **Placeholder:** `placeholder="Email"` gives the user a hint of what to type.
- **Keyboard Optimization:** Use `keyboardType="email-address"` to show the `@` symbol immediately, improving UX for login forms.
- **Security:** For passwords, the `secureTextEntry={true}` prop hides characters (replacing them with dots or stars).

### 2. Creating a Reusable "ThemedTextInput"

Since inputs are used throughout the app, we extract them into a custom component that automatically respects the user's **Light/Dark mode**.

**File:** `./components/ThemedTextInput.jsx`

```jsx
import { TextInput, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

const ThemedTextInput = ({ style, ...props }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <TextInput
      style={[
        {
          backgroundColor: theme.uiBackground,
          color: theme.text,
          padding: 20,
          borderRadius: 6,
        },
        style,
      ]}
      placeholderTextColor={theme.iconColor} // Helps visibility in both themes
      {...props}
    />
  );
};

export default ThemedTextInput;
```

---

### 3. State Management with `useState`

To capture what the user is typing, we use **Two-Way Data Binding**. This means the input shows the state value, and the state updates whenever the text changes.

- **onChangeText:** A prop that automatically receives the current string from the input.
- **Value:** Points back to the state variable, allowing the code to reset the form easily.

```jsx
const [email, setEmail] = useState("");

<ThemedTextInput
  placeholder="Email"
  value={email}
  onChangeText={setEmail} // Automatically passes the text to the setter
  keyboardType="email-address"
/>;
```

---

### 4. Improving UX: Dismissing the Keyboard

On mobile, the keyboard often stays open even if you click outside the input. To fix this, we wrap our screen in `TouchableWithoutFeedback`.

- **The logic:** If the user taps anywhere on the screen that isn't a button or input, we trigger `Keyboard.dismiss()`.

**Implementation in `login.jsx`:**

```jsx
import { TouchableWithoutFeedback, Keyboard } from "react-native";

return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ThemedView style={styles.container}>
      {/* Your form components here */}
    </ThemedView>
  </TouchableWithoutFeedback>
);
```

### Key Takeaways

- **Controlled Components:** By linking the `value` to state and `onChangeText` to a setter, you have absolute control over the input data.
- **Visual Polish:** Adding `padding` and `borderRadius` to inputs makes them look like modern mobile components rather than web-style boxes.
- **Interaction Flow:** Small touches like `Keyboard.dismiss` and `secureTextEntry` are what separate professional apps from amateur ones.

| **Feature**        | **Implementation**             | **Description**                                         |
| ------------------ | ------------------------------ | ------------------------------------------------------- |
| **Email Field**    | `keyboardType="email-address"` | Shows `@` and `.com` shortcuts on the keyboard.         |
| **Password Field** | `secureTextEntry={true}`       | Hides sensitive characters as the user types.           |
| **Dismiss Keypad** | `Keyboard.dismiss`             | Programmatically closes the keyboard on tap-away.       |
| **Submit Logic**   | `onPress` on a Button          | Collects local state (`email`, `password`) for the API. |
