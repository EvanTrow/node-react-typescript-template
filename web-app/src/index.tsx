import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';

import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Theme from './theme';

import { SocketProvider } from './Context/SocketContext';
import { PreviousRouteProvider } from './Context/PreviousRouteContext';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			retry: 2,
			retryDelay: 250,

			staleTime: 1000 * 60,
		},
	},
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<BrowserRouter>
		<PreviousRouteProvider>
			<SnackbarProvider maxSnack={3} autoHideDuration={4000}>
				<QueryClientProvider client={queryClient}>
					<SocketProvider>
						<Theme />
					</SocketProvider>
				</QueryClientProvider>
			</SnackbarProvider>
		</PreviousRouteProvider>
	</BrowserRouter>
);

reportWebVitals();
