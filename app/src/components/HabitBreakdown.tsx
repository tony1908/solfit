import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useFonts, Rubik_400Regular, Rubik_700Bold } from '@expo-google-fonts/rubik';
import { RunningIcon, MeditationIcon, WorkoutIcon, SwimmingIcon } from '../constants/images';

interface HabitBreakdownProps {
    type: 'running' | 'workout' | 'meditation';
    timesCompleted: number;
    totalValue: number;
}

const HabitBreakdown: React.FC<HabitBreakdownProps> = ({ type, timesCompleted, totalValue }) => {
    let [fontsLoaded] = useFonts({
        Rubik_400Regular,
        Rubik_700Bold,  // Load the bold variant of the Rubik font
    });

    if (!fontsLoaded) {
        return null;  // Render nothing or a loading component until fonts are loaded
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
            title: 'Swimming',
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
                    <Text style={styles.cardHeaderText}>Activity Breakdowns</Text>
                </View>
                <View style={styles.habitItem}>
                    <View style={styles.iconContainer}>
                        <Image
                            source={{ uri: image }}
                            style={styles.iconImage}
                        />
                    </View>
                    <Text style={styles.habitTitle}>{title}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.habitStats}>
                    <View style={styles.habitStat}>
                        <Text style={styles.habitStatValue}>{timesCompleted}</Text>
                        <Text style={styles.habitStatLabel}>Times Completed</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.habitStat}>
                        <Text style={styles.habitStatValue}>{totalValue}</Text>
                        <Text style={styles.habitStatLabel}>{totalLabel}</Text>
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
        padding: 35,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        marginBottom: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    cardHeaderText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        fontFamily: 'Rubik_700Bold',  // Use the bold variant of Rubik
    },
    habitItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    habitTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#6073BF',
        fontFamily: 'Rubik_700Bold',  // Use the bold variant of Rubik
    },
    divider: {
        height: 1,
        backgroundColor: '#D9D9D9',
        marginVertical: 16,
    },
    habitStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    habitStat: {
        alignItems: 'center',
    },
    habitStatValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        fontFamily: 'Rubik_700Bold',  // Use the bold variant of Rubik
    },
    habitStatLabel: {
        fontSize: 14,
        color: 'black',
        fontFamily: 'Rubik_400Regular',
    },
    statDivider: {
        height: '100%',
        width: 1,
        backgroundColor: '#D9D9D9',
        marginHorizontal: 16,
    },
    iconContainer: {
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    iconImage: {
        width: 70,
        height: 70,
        borderRadius: 0,
    },
});

export default HabitBreakdown;
