import { Pressable, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";

const ThemedButton = ({ children, style, ...props }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.btn,
        pressed && styles.pressed,
        style, // Allows overriding styles from outside
      ]}
      {...props} // Spreads onPres and other props to the Pressable
    >
      {children}
    </Pressable>
  );
};

export default ThemedButton;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.primary, // Constant purple color
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7, // Visual feedback: button fades slightly when touched - Visual feedback: button becomes fainter when pressed
  },
});
