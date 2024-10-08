import React from 'react';
import { Text } from 'react-native';
import { useReactiveClient } from '@dynamic-labs/react-hooks';
import { client } from '../client';
import { LoginView } from '../LoginView';
import DisplayHomeView from '../DisplayHomeView/DisplayHomeView';
import DisplayDetailsView from '../DisplayDetailsView/DisplayDetailsView';
import { useViewNavigation } from '../useViewNavigation';

export const Home: React.FC = () => {
  const { auth, sdk } = useReactiveClient(client);
  const { currentView } = useViewNavigation();

  if (!sdk.loaded) {
    return <Text>Loading...</Text>;
  }

  if (auth.token) {
    switch (currentView) {
      case 'home':
        return <DisplayHomeView />;
      case 'details':
        return <DisplayDetailsView />;
      default:
        return <Text>Unknown View</Text>;
    }
  }

  return <LoginView />;
};
