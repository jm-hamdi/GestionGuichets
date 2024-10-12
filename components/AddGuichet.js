import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons'; // Importing the FontAwesome icon set

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
      setImageUri(result.assets[0].uri); // Set the selected image URI
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
      <Text style={styles.subtitle}>
        Veuillez saisir les informations de votre organisation pour la créer
      </Text>

      <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        <View style={styles.imageRow}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              {/* Replace text with an icon */}
              <FontAwesome name="file-image-o" size={40} color="#999" />
            </View>
          )}

          <View style={styles.textContainer}>
            <Text style={styles.infoText}>Formats autorisés: <Text style={styles.infoTextblue}>.png et .svg</Text></Text>
            <Text style={styles.infoText}>Taille maximale autorisée: <Text style={styles.infoTextblue}>2 Mo</Text></Text>
            <Text style={styles.infoText}>Dimensions idéales de l’image: <Text style={styles.infoTextblue}>100px * 100px</Text></Text>
          </View>
        </View>
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

// Styles
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
    marginBottom: 20,
  },
  infoTextblue: {
    color: 'blue',
  },
  imageRow: {
    flexDirection: 'row', // Align children in a row
    alignItems: 'center', // Center the items vertically
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50, // Make the image circular
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10, // Space between the image and the text
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
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
    marginRight: 10, // Space between the placeholder and the text
  },
  imageText: {
    color: '#999',
  },
  infoText: {
    textAlign: 'left', // Align text to the left
    fontSize: 11,
    color: '#666',
    marginBottom: 8, // Add space between the text
  },
  textContainer: {
    flex: 1, // Take the remaining space for the text
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
