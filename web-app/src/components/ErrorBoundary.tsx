import React, { Component, ReactNode } from 'react';
import { Box, Typography, Button } from '@mui/material';

interface ErrorBoundaryProps {
	children: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
		};
	}

	static getDerivedStateFromError(error: Error) {
		// Update state to trigger fallback UI
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		// You can log the error to an error reporting service here
		console.error('Error caught in ErrorBoundary:', error, errorInfo);
	}

	handleRetry = () => {
		// Reset state to retry rendering children
		this.setState({ hasError: false, error: null });
	};

	render() {
		if (this.state.hasError) {
			return (
				<Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='100vh' p={2} textAlign='center'>
					<Typography variant='h4' gutterBottom>
						Something went wrong.
					</Typography>
					{this.state.error && (
						<Typography variant='body1' color='textSecondary' gutterBottom>
							{this.state.error.message}
						</Typography>
					)}
					<Button variant='contained' color='primary' onClick={this.handleRetry}>
						Retry
					</Button>
				</Box>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
