import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useViewNavigation } from "../useViewNavigation";
import {EmptyLogin} from '../constants/images'

const Header = ({ title }: { title: string }) => {
    const { currentView } = useViewNavigation();

    // Conditional background color based on the current view
    const backgroundColor = currentView === 'details' ? '#D7DCEF' : '#FCFBF7';

    return (
        <View style={[styles.headerContainer, { backgroundColor }]}>
            {/* Empty string can be passed for an empty title */}
            <Text style={styles.headerText}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        paddingTop: 50, // Adjust for status bar padding if needed
        paddingBottom: 20,
        paddingHorizontal: 15,
        alignItems: 'center',

        // Removing shadow and elevation
        elevation: 0, // For Android
        shadowOpacity: 0, // For iOS
        borderBottomWidth: 0, // Remove bottom border for iOS
    },
    headerText: {
        fontSize: 20,
        color: '#000', // You can change this to fit your needs
        fontWeight: 'bold',
    },
});

export default Header;
