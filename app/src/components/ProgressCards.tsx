import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// Define image constants
import {BetIcon, EmptyStar, StarIcon} from '../constants/images';


const ProgressCards = () => {
    return (
        <View style={styles.container}>
            {/* First Card */}
            <View style={styles.card}>
                <Text style={styles.title}>0/2 bets completed this month</Text>
                <View style={styles.iconsContainer}>
                    <View style={styles.iconWrapper}>
                        <Image
                            source={{ uri: BetIcon }}
                            style={styles.icon}
                        />
                    </View>
                    <View style={styles.iconWrapper}>
                        <Image
                            source={{ uri: BetIcon }}
                            style={styles.icon}
                        />
                    </View>
                </View>
            </View>

            {/* Second Card */}
            <View style={styles.card}>
                <Text style={styles.title}>1/4 goals completed this month</Text>
                <View style={styles.iconsContainer}>
                    <View style={styles.iconWrapper}>
                        <Image
                            source={{ uri: StarIcon }}
                            style={[styles.icon, styles.filledStar]}
                        />
                    </View>
                    <View style={styles.iconWrapper}>
                        <Image
                            source={{ uri: EmptyStar }}
                            style={styles.icon}
                        />
                    </View>
                    <View style={styles.iconWrapper}>
                        <Image
                            source={{ uri: EmptyStar }}
                            style={styles.icon}
                        />
                    </View>
                    <View style={styles.iconWrapper}>
                        <Image
                            source={{ uri: EmptyStar }}
                            style={styles.icon}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ProgressCards;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Side-by-side layout
        justifyContent: 'center',
        alignItems: 'flex-start', // Align items to the top
        padding: 0,
        marginBottom: 10,
    },
    card: {
        width: '48%', // Each card takes up 48% of the container width
        marginHorizontal: 4, // Reduced margin for more width
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 8,
        backgroundColor: 'white',
        padding: 16,
        flexDirection: 'column',
        justifyContent: 'space-between',
        // Shadow properties for iOS
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        // Elevation property for Android
        elevation: 4,
    },
    title: {
        fontSize: 14, // Reduced font size for smaller text
        marginBottom: 8,
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    iconWrapper: {
        width: 30, // Reduced size from 40 to 30
        height: 30,
/*        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 15,*/
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 2,
    },
    icon: {
        width: 35, // Reduced size from 20 to 15
        height: 35,
       // tintColor: 'black',
    },
    filledStar: {
        //tintColor: '#FFC300', // Color for the filled icon
    },
});
