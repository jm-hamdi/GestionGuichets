import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const AddGuichet = ({ setGuichets, navigation }) => {
  const [guichetName, setGuichetName] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri); // Use the URI from the assets array
    }
  };

  const handleSaveGuichet = () => {
    const newGuichet = {
      id: Date.now(), // Generate a unique id
      name: guichetName,
      role: role,
      status: status,
      icon: imageUri,
    };
    setGuichets(prevGuichets => [...prevGuichets, newGuichet]);
    navigation.goBack(); // Navigate back to MainScreen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créez un nouveau guichet</Text>
      
      <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.imageText}>Importer une image</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Nom de guichet"
        value={guichetName}
        onChangeText={setGuichetName}
      />
      <TextInput
        style={styles.input}
        placeholder="Role"
        value={role}
        onChangeText={setRole}
      />
      <TextInput
        style={styles.input}
        placeholder="Statut"
        value={status}
        onChangeText={setStatus}
      />

      <TouchableOpacity style={styles.button} onPress={handleSaveGuichet}>
        <Text style={styles.buttonText}>Valider</Text>
      </TouchableOpacity>
    </View>
  );
};

// Same styles as before but updated the image styles
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
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50, // Make the image circular
    borderWidth: 1,
    borderColor: '#ccc',
  },
  placeholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  imageText: {
    color: '#999',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddGuichet;
