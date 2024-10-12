import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const FavoritesScreen = ({ favorites }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Favoris</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Text>{item.role}</Text>
            <Text>{item.status}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default FavoritesScreen;
