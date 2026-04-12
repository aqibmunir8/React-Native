import { StyleSheet, Text, View, Image } from "react-native";
import Logo from "../assets/img/logo_light.png";
import { Link } from "expo-router";

const Home = () => {
  return (
    <View style={styles.container}>
      <Image source={Logo} />
      <Text style={[styles.title, { marginTop: 20 }]}>The Number 1</Text>
      <Text style={{ margin: 10, marginBottom: 30 }}>Reading List App</Text>
      <Link href="/about" style={styles.link}>
        About Page
      </Link>
      <Link href="/about" style={styles.link}>
        Contact Page
      </Link>
    </View>
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
