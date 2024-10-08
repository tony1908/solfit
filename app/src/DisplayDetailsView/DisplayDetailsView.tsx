import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Alert, Text } from 'react-native';
import { useReactiveClient } from '@dynamic-labs/react-hooks';
import {
    PublicKey,
    TransactionMessage,
    VersionedTransaction,
    TransactionInstruction,
} from '@solana/web3.js';
import { Buffer } from 'buffer';
import { sha256 } from 'js-sha256';
import DetailsHeader from '../components/DetailsHeader';
import CompletedDays from '../components/CompletedDays';
import Button from '../components/Button';
import HabitBreakdown from '../components/HabitBreakdown';
import { DetailBackground } from '../constants/images';
import SwipeBackView from "../SwipeBackView";
import { client } from '../client';
import { challengePDA, programId } from './setup';
import JoinBetCard from "../components/JoinBetCard";

const RUNNING_THRESHOLD = 1500;
const RUNNING_DIVISOR = 1000;

const DisplayDetailsView = () => {
    const { wallets } = useReactiveClient(client);

    const params = {
        title: 'Daily Meditation Challenge',
        subtitle: 'Meditate every day for a week',
        id: 'meditation123',
        reward: 'Inner peace and clarity',
        rules: 'Take a moment each day to reconnect with yourself. Meditation brings clarity, calm, and inner peace. By dedicating just 20 minutes a day, you will develop a habit of mindfulness that can improve your mental well-being. Let\'s begin this journey towards a more peaceful mind',
        category: 'meditation',
        startDate: '2023-10-01',
        endDate: '2023-10-07',
        description: `
            Take a moment each day to reconnect with yourself. Meditation brings clarity, calm, 
            and inner peace. By dedicating just 20 minutes a day, you'll develop a habit of mindfulness 
            that can improve your mental well-being. Let's begin this journey towards a more peaceful mind.
        `,
    };

    const { title, subtitle, rules, category } = params;

    const [isJoined, setIsJoined] = useState(false);
    const [hasClaimed, setHasClaimed] = useState(false);
    const [completionData, setCompletionData] = useState([]);
    const [timesCompleted, setTimesCompleted] = useState(0);
    const [totalValue, setTotalValue] = useState(0);
    const [daysCompletion, setDaysCompletion] = useState([]);

    const groupedRunningData = [
        { date: '2023-10-01', value: 2000 },
        { date: '2023-10-02', value: 1600 },
        { date: '2023-10-03', value: 1700 },
        { date: '2023-10-04', value: 1700 },
        { date: '2023-10-05', value: 1700 },
        { date: '2023-10-06', value: 1700 },
        { date: '2023-10-07', value: 1700 },
    ];

    useEffect(() => {
        if (isJoined) {
            processRunningData();
        }
    }, [isJoined]);

    const mapCompletionDataToDays = (data) => {
        const weekDays = ['M', 'T', 'W', 'TH', 'F', 'SA', 'SU'];
        return weekDays.map((day, index) => ({
            day,
            completed: data[index] > RUNNING_THRESHOLD,
        }));
    };

    const processRunningData = () => {
        if (groupedRunningData && groupedRunningData.length > 0) {
            const data = groupedRunningData.map((item) => item.value);
            setCompletionData(data);

            const completedTimes = groupedRunningData.filter((item) => item.value > RUNNING_THRESHOLD).length;
            setTimesCompleted(completedTimes);

            const total = groupedRunningData.reduce((sum, item) => sum + item.value, 0);
            setTotalValue((total / RUNNING_DIVISOR).toFixed(1));

            setDaysCompletion(mapCompletionDataToDays(data));
        }
    };

    const handleButtonPress = async () => {
        try {
            const wallet = wallets.userWallets[0];
            const connection = client.solana.getConnection();
            const userPublicKey = new PublicKey(wallet.address);

            // Calculate the instruction discriminator
            const instructionName = 'joinChallenge';
            const discriminatorSeed = `global:${instructionName}`;
            const hash = sha256.digest(discriminatorSeed);
            const discriminator = Buffer.from(hash).slice(0, 8);

            // Instruction data (discriminator only)
            const instructionData = discriminator;

            const instruction = new TransactionInstruction({
                keys: [
                    { pubkey: challengePDA, isSigner: false, isWritable: true },
                ],
                programId,
                data: instructionData,
            });

            const latestBlockhash = await connection.getLatestBlockhash();

            // Create a versioned transaction
            const messageV0 = new TransactionMessage({
                payerKey: userPublicKey,
                recentBlockhash: latestBlockhash.blockhash,
                instructions: [instruction],
            }).compileToV0Message();

            const transaction = new VersionedTransaction(messageV0);

            // Include appOrigin if required
            const signer = client.solana.getSigner({
                wallet,
                appOrigin: 'your-app-identifier', // Replace with your actual app origin
            });

            const { signature } = await signer.signAndSendTransaction(transaction);

            console.log(
                `Transaction successful: https://solscan.io/tx/${signature}?cluster=devnet`,
            );

            setIsJoined(true);
            Alert.alert('Challenge Joined', 'You have successfully joined the challenge!', [{ text: 'OK' }]);
        } catch (error) {
            console.error('Error joining challenge:', error);
            Alert.alert('Error', 'Failed to join the challenge. Please try again.', [{ text: 'OK' }]);
        }
    };


    const handleButtonPressClaim = async () => {
        try {
            const wallet = wallets.userWallets[0];
            const connection = client.solana.getConnection();
            const userPublicKey = new PublicKey(wallet.address);

            // Calculate the instruction discriminator
            const instructionName = 'finishChallenge';
            const discriminatorSeed = `global:${instructionName}`;
            const hash = sha256.digest(discriminatorSeed);
            const discriminator = Buffer.from(hash).slice(0, 8);

            // Instruction data (discriminator only)
            const instructionData = discriminator;

            const instruction = new TransactionInstruction({
                keys: [
                    { pubkey: challengePDA, isSigner: false, isWritable: true },
                ],
                programId,
                data: instructionData,
            });

            const latestBlockhash = await connection.getLatestBlockhash();

            // Create a versioned transaction
            const messageV0 = new TransactionMessage({
                payerKey: userPublicKey,
                recentBlockhash: latestBlockhash.blockhash,
                instructions: [instruction],
            }).compileToV0Message();

            const transaction = new VersionedTransaction(messageV0);

            // Include appOrigin if required
            const signer = client.solana.getSigner({
                wallet,
                appOrigin: 'your-app-identifier', // Replace with your actual app origin
            });

            const { signature } = await signer.signAndSendTransaction(transaction);

            console.log(
                `Transaction successful: https://solscan.io/tx/${signature}?cluster=devnet`,
            );

            setHasClaimed(true);
            Alert.alert('Reward Claimed', 'You have successfully claimed your rewards!', [{ text: 'OK' }]);
        } catch (error) {
            console.error('Error claiming reward:', error);
            Alert.alert('Error', 'Failed to claim the reward. Please try again.', [{ text: 'OK' }]);
        }
    };

    return (
        <SwipeBackView>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.container}>
                <DetailsHeader
                    title={title}
                    subtitle={subtitle}
                    image={DetailBackground}
                    description={rules}
                />
                <View style={styles.contentContainer}>
                    {!isJoined ? (
                        <View style={styles.section}>
                            <JoinBetCard
                                type={category}
                                timesCompleted={timesCompleted}
                                totalValue={totalValue}
                                onButtonPress={handleButtonPress}
                            />
                        </View>
                    ) : (
                        <>
                            <View style={styles.section}>
                                <CompletedDays days={daysCompletion} />
                            </View>
                            <View style={styles.sectionSummary}>
                                <HabitBreakdown
                                    type={category}
                                    timesCompleted={7}
                                    totalValue={12}
                                />
                                {!hasClaimed ? (
                                    <Button text={"Claim"} onPress={handleButtonPressClaim} variant={"green"} />
                                ) : (
                                    <Text style={styles.successMessage}>Successfully claimed! 🎉🏆</Text>
                                )}
                            </View>
                        </>
                    )}
                </View>
            </ScrollView>
        </SwipeBackView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFBF7',
    },
    contentContainer: {
        paddingHorizontal: 16,
    },
    section: {
        marginBottom: 24,
        marginTop: -24,
    },
    sectionSummary: {
        marginBottom: 24,
    },
    successMessage: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4CAF50',
        textAlign: 'center',
        marginTop: 16,
    },
    buttonContainer: {
        marginTop: 24,
    },
});

export default DisplayDetailsView;
