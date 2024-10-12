// GuichetList.js
import React from 'react';
import { View, Text, FlatList, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';

const GuichetList = ({ guichets, toggleFavorite, deleteGuichet }) => {
  return (
    <FlatList
      data={guichets}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.guichetItem}>
          <Image source={{ uri: item.icon }} style={styles.icon} />
          <View style={styles.details}>
            <Text style={styles.roleText}>{item.role}</Text>
            <Text>{item.status}</Text>
          </View>
          <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
            <Text style={[styles.favorite, item.favorite ? styles.favActive : styles.favInactive]}>★</Text>
          </TouchableOpacity>
          <Button title="Supprimer" onPress={() => deleteGuichet(item.id)} />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  guichetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  roleText: {
    fontWeight: 'bold',
  },
  favorite: {
    fontSize: 24,
  },
  favActive: {
    color: 'yellow',
  },
  favInactive: {
    color: 'gray',
  },
});

export default GuichetList;
