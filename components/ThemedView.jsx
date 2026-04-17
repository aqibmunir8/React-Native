import { View, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

const ThemedView = ({ style, ...props }) => {
  // Removed children from here
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  return (
    <View style={[{ backgroundColor: theme.background }, style]} {...props} />
  ); // made this view component -> self-closing. And when we do this, React automatically renders the children in the same way. So we don't have  to manually output them.
};

export default ThemedView;
