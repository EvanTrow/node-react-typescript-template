import React from 'react';
import { CircularProgress, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Route, Routes, Navigate } from 'react-router-dom';

import Navigation from './components/navigation/Navigation';

import Dashboard from './pages/Dashboard';
import SystemLogs from './pages/SystemLogs';

export const NotFound = () => {
	return (
		<Typography variant='h5' gutterBottom style={{ marginTop: 100, textAlign: 'center' }}>
			Page not found!
		</Typography>
	);
};

const AccountPendingApproval = () => {
	return (
		<Typography variant='h5' gutterBottom style={{ marginTop: 100, textAlign: 'center' }}>
			Account Pending Approval
		</Typography>
	);
};

function App() {
	const theme = useTheme();

	const isMd = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<Routes>
			<Route path='/' element={<Navigation children={<Dashboard />} />} />
			<Route path='/logs' element={<Navigation children={<SystemLogs />} />} />

			<Route path='*' element={<Navigation children={<NotFound />} />} />
		</Routes>
	);
}

export default App;
