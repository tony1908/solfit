import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {client} from "../client";
import {ProfileImageIcon} from '../constants/images';

interface HeaderProps {
    username: string;
}

class HeaderTitle extends React.Component<HeaderProps> {
    getGreeting() {
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            return 'Good Morning';
        } else if (currentHour < 18) {
            return 'Good Afternoon';
        } else {
            return 'Good Evening';
        }
    }

    render() {
        const { username } = this.props;
        const greeting = this.getGreeting();

        return (
            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>
                        {greeting}, <Text style={styles.boldText}></Text>
                    </Text>
                    <Text style={styles.headerText}>
                        <Text style={styles.boldText}>{username}</Text> 👋
                    </Text>
                </View>
                <Image
                    source={{uri:ProfileImageIcon}}
                    style={styles.profileImage}
                    onTouchStart={() => client.ui.userProfile.show()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    header: {
        flexDirection: 'column',
    },
    headerText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'black',
    },
    boldText: {
        color: 'black',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25, // Makes the image circular
    },
});

export default HeaderTitle;
