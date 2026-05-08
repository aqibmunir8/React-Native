import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Logo from "../assets/img/logo_light.png";

const Home = () => {
  return (
    <View style={styles.container}>
      <Image source={Logo} />
      <Text style={[styles.title, { color: "purple" }]}>The Number 1</Text>
      <Text style={{ margin: 10, marginBottom: 30 }}>Reading List App</Text>

      <View style={styles.card}>
        <Text>Hello, this is a card.</Text>
      </View>
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
  card: {
    backgroundColor: "#eee",
    padding: 20,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 0,
    elevation: 5,
  },
  img: {
    maxWidth: "10%",
    marginVertical: 20,
  },
});
