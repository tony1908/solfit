import React from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useFonts, Rubik_400Regular, Rubik_700Bold } from '@expo-google-fonts/rubik'; // Load the bold font variant

const CompletedDays = ({ days }) => {
    let [fontsLoaded] = useFonts({
        Rubik_400Regular,
        Rubik_700Bold,  // Load the bold variant of the Rubik font
    });

    if (!fontsLoaded) {
        return null; // Render nothing until the font is loaded
    }

    // Calculate the number of completed days
    const completedCount = days.filter(day => day.completed).length;

    const renderDay = ({ item }) => (
        <View style={styles.dayContainer}>
            <Text style={styles.dayText}>{item.day}</Text>
            <View
                style={[
                    styles.iconContainer,
                    item.completed ? styles.completed : styles.notCompleted,
                ]}
            >
                <MaterialCommunityIcons
                    name="check"
                    size={20} // Slightly increased icon size
                    style={item.completed ? styles.iconCompleted : styles.iconNotCompleted}
                />
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Display dynamic completed count */}
            <Text style={styles.headerText}>Completed days ({completedCount}-10)</Text>
            <FlatList
                data={days}
                renderItem={renderDay}
                keyExtractor={(item, index) => index.toString()}
                numColumns={5}
                contentContainerStyle={styles.grid}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 8,
        shadowColor: "black",
        shadowOpacity: 1,
        shadowRadius: 0, // Solid shadow
        shadowOffset: { width: 4, height: 4 }, // Increased shadow offset
        marginHorizontal: 5, // Adjusted margin for a more rectangular shape
    },
    headerText: {
        fontSize: 20, // Slightly larger font size
        fontWeight: "bold", // Bold text
        fontFamily: "Rubik_700Bold", // Use the bold variant of Rubik
        marginBottom: 16,
        marginTop: 24,
        textAlign: "center",
    },
    grid: {
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 24,
    },
    dayContainer: {
        alignItems: "center",
        margin: 7, // Increased margin for better spacing
    },
    dayText: {
        marginBottom: 6, // Slightly increased margin between text and icon
        fontSize: 16, // Larger font size
        fontFamily: "Rubik_400Regular", // Using Rubik font
    },
    iconContainer: {
        width: 48, // Larger for better visual appearance
        height: 48,
        borderRadius: 20, // Proportional rounded corners
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
    },
    completed: {
        backgroundColor: "#19C2B1",
        borderColor: "black", // Black border for completed days
    },
    notCompleted: {
        backgroundColor: "white",
        borderColor: "#D9D9D9", // Grey border for not completed days
    },
    iconCompleted: {
        color: "white",
    },
    iconNotCompleted: {
        color: "#D9D9D9",
    },
});

export default CompletedDays;
