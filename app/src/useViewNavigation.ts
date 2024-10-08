import { useContext } from 'react';
import { NavigationContext } from './NavigationContext';

export const useViewNavigation = () => {
    const context = useContext(NavigationContext);

    if (!context) {
        throw new Error('useViewNavigation must be used within a NavigationProvider');
    }

    const { currentView, navigateTo } = context;

    return { currentView, navigateTo };
};
