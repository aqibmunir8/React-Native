import { StyleSheet, Text, View, Image } from "react-native";
import Logo from "../assets/img/logo_light.png";
import { Link } from "expo-router";
import ThemedView from "../components/ThemedView";
import ThemedLogo from "../components/ThemedLogo";
import Spacer from "../components/Spacer";

const Home = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedLogo />
      <Text style={[styles.title, { marginTop: 20 }]}>The Number 1</Text>
      <Spacer height={10} />
      <Text>Reading List App</Text>
      <Spacer height={5}/>

      <Link href="/about" style={styles.link}>
        About Page
      </Link>
      <Link href="/about" style={styles.link}>
        Contact Page
      </Link>
    </ThemedView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  img: {
    maxWidth: "10%",
    marginVertical: 20,
  },
  link: {
    marginVertical: 10,
    borderBottomWidth: 1,
  },
});
