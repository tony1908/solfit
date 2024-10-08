import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, Dimensions } from 'react-native';
import { LoginBackground, LogoImage } from './../constants/images';
import Button from "./../components/Button"; // Import your base64 image
import { useFonts, Rubik_400Regular, Rubik_700Bold } from '@expo-google-fonts/rubik'; // Load the bold font variant
import { client } from '../client'

const { width } = Dimensions.get('window');

export const LoginView = () => {
  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_700Bold,
  });

  if (!fontsLoaded) {
    return null; // Or a loading indicator
  }

  return (
      <View style={styles.container}>
        <View style={styles.backgroundContainer}>
          <ImageBackground source={{ uri: LoginBackground }} style={styles.backgroundImage}>

          </ImageBackground>
        </View>
        <View style={styles.box}>
          <View style={styles.header}>
            <Image source={{ uri: LogoImage }} style={styles.logo} />
          </View>
          <Text style={styles.description}>
            Dare to <Text style={styles.highlight}>challenge your life</Text> with exercise alone and with your friend.
          </Text>
          <Button text={"Get in"} onPress={() => { client.ui.auth.show()}} variant={"green"} />
          <View style={styles.footerCont}>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Need Help?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundContainer: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Adjusts the image to cover the entire area
  },
  box: {
    width: '100%',
    paddingVertical: 50,
    paddingHorizontal: 60,
    backgroundColor: '#fff',
    // Remove bottom border and shadow
    // borderWidth: 2,
    borderTopColor: '#000',
    borderTopWidth: 5,
    borderColor: '#000',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    // If shadow is needed at the top
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontSize: 32, // Increased font size
    fontWeight: 'bold',
    fontFamily: 'Rubik_700Bold',
  },
  description: {
    textAlign: 'center',
    marginTop: -30,
    marginBottom: 32,
    fontFamily: 'Rubik_400Regular',
    fontSize: 18, // Increased font size for description
  },
  highlight: {
    color: '#CCC0F2',
    fontFamily: 'Rubik_700Bold',
  },
  loginButton: {
    width: '100%',
    marginBottom: 16,
    height: 48,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#67e8f9',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupButton: {
    width: '100%',
    marginBottom: 32,
    height: 48,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#fff',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: '600',
    fontFamily: 'Rubik_700Bold',
  },
  helpLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpIcon: {
    marginRight: 4,
  },
  helpText: {
    color: '#67e8f9',
  },
  logo: {
    width: width * 0.40,
    height: width * 0.40,
    resizeMode: 'contain',
    marginTop: -50
  },
  footerLink: {
    fontSize: 18, // Increased font size for footer link
    fontWeight: 'bold',
    color: '#CCC0F2',
    textDecorationLine: 'underline',
    fontFamily: 'Rubik_700Bold',
  },
  footerCont: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
