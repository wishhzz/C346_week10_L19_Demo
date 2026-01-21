import React, { useState } from 'react';
import { StatusBar, View, Button, Text, TextInput, Alert, ToastAndroid, StyleSheet } from 'react-native';

const Edit = ({ navigation, route }) => {
  const { id, card_name, card_pic } = route.params;
  const [name, setName] = useState(card_name);
  const [pic, setPic] = useState(card_pic);

  const baseUrl = "https://onlinecardappwebservice-4zgf.onrender.com";

  const handleUpdate = () => {
    fetch(`${baseUrl}/updatecard/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ card_name: name, card_pic: pic })
    })
    .then((response) => {
      if (response.ok) {
        ToastAndroid.show('Card updated successfully!', ToastAndroid.SHORT);
        navigation.navigate('Home');
      }
    })
    .catch(error => console.error(error));
  };

  const handleDelete = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to remove this card?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => {
            fetch(`${baseUrl}/deletecard/${id}`, { method: 'DELETE' })
            .then(() => {
              ToastAndroid.show('Card deleted successfully', ToastAndroid.SHORT);
              navigation.navigate('Home');
            })
            .catch(error => console.error(error));
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <Text style={styles.label}>Card Name:</Text>
      <TextInput 
        style={styles.input} 
        value={name} 
        onChangeText={(text) => setName(text)} 
      />
      
      <Text style={styles.label}>Card Pic URL:</Text>
      <TextInput 
        style={styles.input} 
        value={pic} 
        onChangeText={(text) => setPic(text)} 
      />

      <View style={styles.buttonContainer}>
        <Button title='Update' onPress={handleUpdate} color="#2196F3" />
        <View style={{ height: 10 }} />
        <Button title='Delete' onPress={handleDelete} color="#F44336" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontWeight: 'bold', marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginTop: 5, borderRadius: 4 },
  buttonContainer: { marginTop: 20 }
});

export default Edit;