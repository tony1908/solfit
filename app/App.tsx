import { StatusBar } from "expo-status-bar";
import { FC } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { Home } from "./src/Home";
import { client } from "./src/client";
import Header from './src/components/Header'; // Import the Header component

import { NavigationProvider } from './src/NavigationContext';

const App: FC = () => {

    return (
        <NavigationProvider>
            <View style={styles.container}>
                {/* Add your custom header */}
                <Header title="" />
                <client.reactNative.WebView />
                <SafeAreaView style={styles.safeArea}>
                    <Home />
                </SafeAreaView>
                <StatusBar style="auto" />
            </View>
        </NavigationProvider>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
});

export default App;
