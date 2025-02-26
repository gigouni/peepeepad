import React, { createContext, useContext, useState } from 'react';

interface EventContextProps {
  event: { type: string; id: number } | null;
  setEvent: (event: string) => void;
}

const EventContext = createContext<EventContextProps | undefined>(undefined);

// eslint-disable-next-line react/function-component-definition
export const EventProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [event, setEventState] = useState<{ type: string; id: number } | null>(
    null,
  );

  const setEvent = React.useCallback((type: string) => {
    setEventState({ type, id: Date.now() });
  }, []);

  const value = React.useMemo(() => ({ event, setEvent }), [event, setEvent]);

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
};

export const useEvent = (): EventContextProps => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within an EventProvider');
  }

  return context;
};
