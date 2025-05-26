import React, { createContext, useContext, useEffect, useState } from 'react';
import { getDatabase } from '../db/database';

type PgliteContextType = {
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
};

const PgliteContext = createContext<PgliteContextType>({
  isLoading: true,
  isInitialized: false,
  error: null,
});

export const usePgliteContext = () => useContext(PgliteContext);

export const PgliteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        await getDatabase();
        setIsInitialized(true);
        setError(null);
      } catch (err) {
        console.error('Database Initialization failed:', err);
        setError('Database Initialization failed. Please refresh the page and try again.');
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, []);

  return (
    <PgliteContext.Provider value={{ isInitialized, isLoading , error }}>
      {children}
    </PgliteContext.Provider>
  );
};