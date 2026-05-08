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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
  },
  link: {
    marginVertical: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#007AFF',
  },
  linkText: {
    color: '#007AFF',
    fontSize: 16,
  },
})
