import React, { createContext, useState, ReactNode } from 'react';

type NavigationContextType = {
    currentView: string;
    navigateTo: (view: string) => void;
};

export const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

type NavigationProviderProps = {
    children: ReactNode;
};

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
    const [currentView, setCurrentView] = useState<string>('home');

    const navigateTo = (view: string) => {
        setCurrentView(view);
    };

    return (
        <NavigationContext.Provider value={{ currentView, navigateTo }}>
            {children}
        </NavigationContext.Provider>
    );
};
