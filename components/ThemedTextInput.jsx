import { TextInput, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

export default function ThemedTextInput({ style, ...props }) {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <TextInput
      placeholderTextColor={theme.iconColor}
      style={[
        {
          backgroundColor: theme.uiBackground,
          color: "white",
          padding: 15,
          borderRadius: 6,
        },
        style,
      ]}
      {...props}
    />
  );
}
