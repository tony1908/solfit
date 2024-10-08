import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions } from 'react-native';

const DetailsHeader = ({ title, subtitle, image, description }) => {
    return (
        <ImageBackground source={{ uri: `${image}` }} style={styles.header}>
            <View style={styles.overlay}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
                <Text></Text>
                <Text style={styles.subtitle}>{description}</Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    header: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 2.5, // Updated to half the height of the screen
    },
    overlay: {
        marginTop: 20,
        padding: 16,
        borderRadius: 10,
    },
    title: {
        fontSize: 34,
        color: 'black',
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 18,
        color: 'black',
    },
});

export default DetailsHeader;
