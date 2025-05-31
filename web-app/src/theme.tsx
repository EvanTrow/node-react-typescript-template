import * as React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Router from './Router';

export default function Theme() {
	const theme = createTheme({
		palette: {
			mode: 'dark',
			primary: {
				light: '#b4e3f9',
				main: '#70caf2',
				dark: '#3f79ad',
				contrastText: '#fff',
			},
			secondary: {
				light: '#ff8ca5',
				main: '#f25976',
				dark: '#ba204b',
			},
		},
		components: {
			// MuiAutocomplete: {
			// 	defaultProps: { popup: { zIndex: 1300 } },
			// },
			// MuiDialog: {
			// 	defaultProps: {
			// 		fullScreen: isXsOrSm,
			// 	},
			// },
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router />
		</ThemeProvider>
	);
}
