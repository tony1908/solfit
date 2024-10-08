import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {
    RunningIcon,
    MeditationIcon,
    WorkoutIcon,
    SwimmingIcon,
} from '../constants/images'; // Import SwimmingIcon
import { useViewNavigation } from '../useViewNavigation';

interface TaskCardProps {
    iconName: string;
    iconType: string;
    iconBackground: string;
    title: string;
    subtitle: string;
    status: string;
    id: string;
    reward: string;
    rules: string;
    category: string;
    startDate: string;
    endDate: string;
}

const TaskCard: React.FC<TaskCardProps> = ({
                                               iconName,
                                               iconType,
                                               iconBackground,
                                               title,
                                               subtitle,
                                               status,
                                               id,
                                               reward,
                                               rules,
                                               category,
                                               startDate,
                                               endDate,
                                           }) => {
    const { navigateTo } = useViewNavigation();

    const getStatusStyle = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active':
                return styles.activeButton;
            case 'joined':
                return styles.joinedButton;
            case 'completed':
                return styles.completedButton;
            case 'failed':
                return styles.failedButton;
            default:
                return styles.defaultButton; // Fallback style
        }
    };

    // Base64 images
    const images: { [key: string]: string } = {
        running: RunningIcon,
        workout: WorkoutIcon,
        meditation: MeditationIcon,
        swimming: SwimmingIcon, // Add swimming option
    };

    const imageSource = images[category] || WorkoutIcon; // Use default image if category does not match

    return (
        <TouchableOpacity
            style={styles.taskCard}
            onPress={() => navigateTo('details')}
        >
            <View style={styles.taskInfo}>
                <View style={[styles.iconContainer]}>
                    <Image
                        source={{ uri: imageSource }}
                        style={styles.iconImage}
                    />
                </View>
                <View>
                    <Text style={styles.taskTitle}>{title}</Text>
                    <Text style={styles.taskSubtitle}>{rules}</Text>
                </View>
            </View>
            <View style={[styles.button, getStatusStyle(status)]}>
                <Text style={styles.buttonText}>{status}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    taskCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#160042',
        borderRadius: 16,
        padding: 16,
        backgroundColor: '#FCFBF7',
        marginBottom: 8,
    },
    taskInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    iconImage: {
        width: 56,
        height: 56,
        borderRadius: 28,
    },
    taskTitle: {
        fontSize: 18,
        color: 'black',
    },
    taskSubtitle: {
        fontSize: 14,
        color: 'black',
    },
    button: {
        height: 40,
        paddingHorizontal: 16,
        borderRadius: 24,
        justifyContent: 'center',
    },
    activeButton: {
        backgroundColor: '#F8E878',
    },
    joinedButton: {
        backgroundColor: '#AAAFEF',
    },
    completedButton: {
        backgroundColor: '#19C2B1',
    },
    failedButton: {
        backgroundColor: '#FF9D9D',
    },
    defaultButton: {
        backgroundColor: '#F7D8A9', // Fallback color
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
    },
    buttonTextComplete: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default TaskCard;
