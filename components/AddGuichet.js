import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons'; // Importing the FontAwesome icon set
import RNPickerSelect from 'react-native-picker-select'; // Importing the picker

const AddGuichet = ({ setGuichets, navigation }) => {
  const [guichetName, setGuichetName] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [imageUri, setImageUri] = useState(null);

  // Image picker function
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

  // Function to handle saving the guichet
  const handleSaveGuichet = () => {
    // Validation for required fields
    if (!guichetName || !role || !status || !imageUri) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs requis.");
      return;
    }

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

      {/* Image Picker */}
      <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        <View style={styles.imageRow}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              {/* Icon instead of text for placeholder */}
              <FontAwesome name="file-image-o" size={40} color="#999" />
            </View>
          )}

          <View style={styles.textContainer}>
            <Text style={styles.infoText}>
              Formats autorisés: <Text style={styles.infoTextblue}>.png et .svg</Text>
            </Text>
            <Text style={styles.infoText}>
              Taille maximale autorisée: <Text style={styles.infoTextblue}>2 Mo</Text>
            </Text>
            <Text style={styles.infoText}>
              Dimensions idéales de l’image: <Text style={styles.infoTextblue}>100px * 100px</Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Guichet Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Nom de guichet"
        value={guichetName}
        onChangeText={setGuichetName}
      />

      {/* Role Dropdown */}
      <RNPickerSelect
        onValueChange={(value) => setRole(value)}
        items={[
          { label: 'Admin', value: 'admin' },
          { label: 'User', value: 'user' },
          { label: 'Manager', value: 'manager' },
        ]}
        style={{
          ...pickerSelectStyles,
          iconContainer: {
            top: 15,
            right: 12,
            width: 25,
            opacity: 0.7,
          },
        }}
        placeholder={{ label: "Sélectionnez un rôle", value: null }}
        useNativeAndroidPickerStyle={false}
        Icon={() => {
          return <FontAwesome name="chevron-down" size={20} color="gray" />;
        }}
      />

      {/* Status Dropdown */}
      <RNPickerSelect
        onValueChange={(value) => setStatus(value)}
        items={[
          { label: 'Actif', value: 'actif' },
          { label: 'Inactif', value: 'inactif' },
        ]}
        style={{
          ...pickerSelectStyles,
          iconContainer: {
            top: 15,
            right: 12,
            width: 25,
            opacity: 0.7,
          },
        }}
        placeholder={{ label: "Sélectionnez un statut", value: null }}
        useNativeAndroidPickerStyle={false}
        Icon={() => {
          return <FontAwesome name="chevron-down" size={20} color="gray" />;
        }}
      />

      {/* Save Button */}
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
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  imageContainer: {
    marginBottom: 20,
  },
  imageRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
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
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  infoText: {
    fontSize: 11,
    color: '#666',
    marginBottom: 8,
  },
  infoTextblue: {
    color: 'blue',
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

// Picker styles for iOS and Android
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  inputAndroid: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});

export default AddGuichet;
