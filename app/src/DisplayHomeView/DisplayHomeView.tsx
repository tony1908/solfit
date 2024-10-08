import React, { useState, useCallback, useRef } from 'react';
import {View, StyleSheet, Text, ActivityIndicator, ScrollView, Platform, Button} from 'react-native';
import HeaderTitle from '../components/HeaderTitle';
import TaskCard from '../components/TaskCard';
import {client} from "../client";
import ProgressCards from "../components/ProgressCards";

const DisplayHomeView = () => {
  const [loadingTasks, setLoadingTasks] = useState(false);
  const modalizeRef = useRef(null);

  const userName = 'John Doe';

  const activesChallenges = [
    {
      uuid: '1',
      category: 'meditation',
      title: 'Daily Meditation',
      description: 'Meditate for 10 minutes every day',
      status: 'active',
      reward: '50 points',
      rules: 'Meditate.',
      start_date: '2023-10-01',
      end_date: '2023-10-31',
    },
    {
      uuid: '2',
      category: 'steps',
      title: 'Step Challenge',
      description: 'Walk 10,000 steps daily',
      status: 'active',
      reward: '100 points',
      rules: 'Sync with your pedometer.',
      start_date: '2023-10-01',
      end_date: '2023-10-31',
    },
    {
      uuid: '3',
      category: 'swimming',
      title: 'Swim Challenge',
      description: 'Swim 500 meters daily',
      status: 'active',
      reward: '150 points',
      rules: 'Track via smartwatch.',
      start_date: '2023-10-01',
      end_date: '2023-10-31',
    },
    // Add more challenges as needed
  ];

  const getIconSettings = (category) => {
    switch (category) {
      case 'meditation':
        return { iconName: 'meditation', iconType: 'MaterialCommunityIcons', iconBackground: '#A3D9FF' };
      case 'steps':
        return { iconName: 'walk', iconType: 'MaterialCommunityIcons', iconBackground: '#FFC1E3' };
      case 'workout':
        return { iconName: 'dumbbell', iconType: 'MaterialCommunityIcons', iconBackground: '#FFB6C1' };
      case 'running':
        return { iconName: 'run', iconType: 'MaterialCommunityIcons', iconBackground: '#CCC1F2' };
      case 'swimming':
        return { iconName: 'swim', iconType: 'MaterialCommunityIcons', iconBackground: '#4A90E2' };
      default:
        return { iconName: 'help', iconType: 'MaterialCommunityIcons', iconBackground: '#CCC' };
    }
  };

  const openBottomSheet = () => {
    if (modalizeRef.current) {
      modalizeRef.current.open();
    }
  };

  return (
      <View style={styles.container}>
        <HeaderTitle username={userName} />
        <ProgressCards/>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>CHALLENGES</Text>
            {loadingTasks ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                activesChallenges
                    .filter(
                        (task) =>
                            !(
                                Platform.OS === 'android' &&
                                (task.category === 'meditation' ||
                                    task.category === 'running' ||
                                    task.category === 'swimming')
                            )
                    )
                    .map((task, index) => {
                      const { iconName, iconType, iconBackground } = getIconSettings(task.category);
                      return (
                          <TaskCard
                              key={index}
                              iconName={iconName}
                              iconType={iconType}
                              iconBackground={iconBackground}
                              title={task.title}
                              subtitle={task.description}
                              status={task.status}
                              id={task.uuid}
                              reward={task.reward}
                              rules={task.rules}
                              category={task.category}
                              startDate={task.start_date}
                              endDate={task.end_date}
                          />
                      );
                    })
            )}
          </View>
        </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FCFBF7',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 16,
  },
  modalContent: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#333',
  },
});

export default DisplayHomeView;
