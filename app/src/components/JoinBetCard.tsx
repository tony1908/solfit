import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useFonts, Rubik_400Regular, Rubik_700Bold } from '@expo-google-fonts/rubik';
import { RunningIcon, MeditationIcon, WorkoutIcon, SwimmingIcon } from '../constants/images';
import Button from "./Button";

interface JoinBetCardProps {
    type: 'running' | 'workout' | 'meditation';
    timesCompleted: number;
    totalValue: number;
    onButtonPress: () => void;
}

const JoinBetCard: React.FC<JoinBetCardProps> = ({ type, timesCompleted, totalValue, onButtonPress }) => {
    let [fontsLoaded] = useFonts({
        Rubik_400Regular,
        Rubik_700Bold,
    });

    if (!fontsLoaded) {
        return null;
    }

    const habitDetails = {
        running: {
            title: 'EXERCISE',
            icon: 'run',
            totalLabel: 'Total Kilometers',
            image: RunningIcon,
        },
        workout: {
            title: 'WORKOUT',
            icon: 'dumbbell',
            totalLabel: 'Total Minutes',
            image: WorkoutIcon,
        },
        meditation: {
            title: 'MEDITATION',
            icon: 'meditation',
            totalLabel: 'Total Sessions',
            image: MeditationIcon,
        },
        swimming: {
            title: 'SWIMMING',
            icon: 'swimming',
            totalLabel: 'Total Kilometers',
            image: SwimmingIcon,
        },
    };

    const { title, icon, totalLabel, image } = habitDetails[type];

    return (
        <View style={styles.section}>
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <View style={styles.iconContainer}>
                        <Image
                            source={{ uri: image }}
                            style={styles.iconImage}
                        />
                    </View>
                    <Text style={styles.potText}>Pot</Text>
                    <Text style={styles.habitTitle}>0.1 SOL</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.habitStats}>
                    <View style={styles.habitStat}>
                        <Text style={styles.habitStatValue}>0.01</Text>
                        <Text style={styles.habitStatLabel}>Bet</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.habitStat}>
                        <Text style={styles.habitStatValue}>10</Text>
                        <Text style={styles.habitStatLabel}>Players</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button text="Join" onPress={onButtonPress} variant="green" />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        marginBottom: 16,
        padding: 5,
    },
    card: {
        flex: 1,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
        padding: 20, // Reduced padding for less space
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        marginBottom: 16,
    },
    cardHeader: {
        alignItems: 'center',
        marginTop: -70,
        marginBottom: 0, // Reduced margin for less space
    },
    potText: {
        fontSize: 18,
        color: 'black',
        fontFamily: 'Rubik_400Regular',
        marginTop: 8,
    },
    habitTitle: {
        fontSize: 40, // Increased font size for better proportion
        fontWeight: 'bold',
        color: '#6073BF',
        fontFamily: 'Rubik_700Bold',
        marginTop: 4, // Slightly reduced margin
    },
    divider: {
        height: 1,
        backgroundColor: '#D9D9D9',
        marginVertical: 12, // Reduced vertical margin
    },
    habitStats: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    habitStat: {
        alignItems: 'center',
        width: '40%',
    },
    habitStatValue: {
        fontSize: 26, // Increased font size
        fontWeight: 'bold',
        color: 'black',
        fontFamily: 'Rubik_700Bold',
    },
    habitStatLabel: {
        fontSize: 16, // Slightly increased font size
        color: 'black',
        fontFamily: 'Rubik_400Regular',
    },
    statDivider: {
        height: '50%', // Reduced height for better proportion
        width: 1,
        backgroundColor: '#D9D9D9',
        marginHorizontal: 12, // Reduced horizontal margin
    },
    iconContainer: {
        width: 100, // Increased size
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconImage: {
        width: 115, // Increased size
        height: 100,
        borderRadius: 0,
    },
    buttonContainer: {
        marginTop: 20, // Reduced space above the button
        alignItems: 'center',
    },
    button: {
        width: '60%',
    },
});

export default JoinBetCard;
