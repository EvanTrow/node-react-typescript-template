import { createContext, FC, useEffect, useState, ReactNode, useContext } from 'react';

import { io, Socket } from 'socket.io-client';

export interface SocketContextType {
	socket: Socket | null;
	connected: boolean;
}

export const SocketContext = createContext<SocketContextType>({
	socket: null,
	connected: false,
});

export const useSocket = (): SocketContextType => {
	const context = useContext(SocketContext);
	if (!context) {
		throw new Error('useSocket must be used within a SocketProvider');
	}
	return context;
};

interface SocketProviderProps {
	children: ReactNode;
}

export const SocketProvider: FC<SocketProviderProps> = ({ children }) => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [connected, setConnected] = useState(false);

	useEffect(() => {
		const connect = async () => {
			// Get the access token

			// Initialize the socket connection
			const newSocket = io('/', {
				path: '/api_ws',
			});
			console.log('Socket initialized');

			// Set the socket in state
			setSocket(newSocket);

			// Listen for connection events
			newSocket.on('connect', () => {
				console.log('Connected to the server');
				setConnected(true);
			});

			newSocket.on('disconnect', () => {
				console.log('Disconnected from the server');
				setConnected(false);
			});

			newSocket.on('connect_error', (error) => {
				console.error('Connection error:', error);
				setConnected(false);
			});
		};

		connect();

		// Clean up the socket when the component unmounts
		return () => {
			socket?.disconnect();
		};
	}, []);

	return <SocketContext.Provider value={{ socket, connected }}>{children}</SocketContext.Provider>;
};
