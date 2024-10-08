import React, { useRef } from 'react';
import {
    View,
    PanResponder,
    GestureResponderEvent,
    PanResponderGestureState,
    StyleSheet,
} from 'react-native';
import { useViewNavigation } from './useViewNavigation';

interface SwipeBackViewProps {
    children: React.ReactNode;
}

const SwipeBackView: React.FC<SwipeBackViewProps> = ({ children }) => {
    const { navigateTo } = useViewNavigation();

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (
                _evt: GestureResponderEvent,
                gestureState: PanResponderGestureState
            ) => {
                // Start detecting when the user moves horizontally
                return (
                    Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
                    Math.abs(gestureState.dx) > 20
                );
            },
            onPanResponderRelease: (
                _evt: GestureResponderEvent,
                gestureState: PanResponderGestureState
            ) => {
                if (gestureState.dx > 50) {
                    // User swiped right
                    navigateTo('home');
                }
            },
        })
    ).current;

    return (
        <View {...panResponder.panHandlers} style={styles.container}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default SwipeBackView;
