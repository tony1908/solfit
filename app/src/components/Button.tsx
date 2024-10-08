import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
    text: string;
    onPress: () => void;
    variant?: 'default' | 'green';
}

class Button extends React.Component<ButtonProps> {
    static defaultProps = {
        variant: 'default',
    };

    render() {
        const { text, onPress, variant } = this.props;

        const buttonStyle = [styles.button];
        const textStyle = [styles.buttonText];

        if (variant === 'green') {
            buttonStyle.push(styles.greenButton);
            textStyle.push(styles.greenButtonText);
        }

        return (
            <TouchableOpacity style={buttonStyle} onPress={onPress}>
                <Text style={textStyle}>{text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        height: 48,
        backgroundColor: '#CCC0F2',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'black',
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 0,
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
    },
    greenButton: {
        backgroundColor: '#19C2B1',
    },
    greenButtonText: {
        color: 'white',
    },
});

export default Button;
