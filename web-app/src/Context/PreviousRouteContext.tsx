import React, { createContext, useContext, useEffect, useRef } from 'react';
import { useLocation, Location } from 'react-router-dom';

interface PreviousRouteContextProps {
	previousLocation: Location | null;
}

const PreviousRouteContext = createContext<PreviousRouteContextProps>({
	previousLocation: null,
});

export const usePreviousRoute = () => useContext(PreviousRouteContext);

export const PreviousRouteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const location = useLocation();
	const previousLocationRef = useRef<Location | null>(null);

	useEffect(() => {
		previousLocationRef.current = location;
	}, [location]);

	return <PreviousRouteContext.Provider value={{ previousLocation: previousLocationRef.current }}>{children}</PreviousRouteContext.Provider>;
};
