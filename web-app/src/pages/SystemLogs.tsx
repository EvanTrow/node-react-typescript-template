import React from 'react';
import moment from 'moment';

import { SystemLog } from '../types/types';
import { useSystemLogs } from '../data/useSystem';

import { alpha, Autocomplete, Box, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useTheme } from '@mui/material';

export default function SystemLogsPage() {
	const theme = useTheme();
	const bottomRef = React.useRef<HTMLSpanElement>(null);

	const { data: logs, isLoading, refetch } = useSystemLogs();

	const [selectedModules, setSelectedModules] = React.useState<string[] | null>(null);

	const modules = React.useMemo(() => {
		if (!logs) return [];
		return Array.from(new Set(logs.map((log) => log.module)));
	}, [logs]);

	const filteredLogs = React.useMemo(() => {
		if (!logs) return [];
		return selectedModules && selectedModules.length > 0 ? logs.filter((log) => selectedModules.includes(log.module)) : logs;
	}, [logs, selectedModules]);

	React.useEffect(() => {
		if (!isLoading && logs) {
			refetch();
		}
	}, []);
	React.useEffect(() => {
		if (logs) {
			setTimeout(() => {
				bottomRef.current?.scrollIntoView();
			}, 10);
		}
	}, [logs]);

	const getColor = (log: SystemLog) => {
		switch (log.type.toUpperCase()) {
			case 'ERROR':
				return alpha(theme.palette.error.main, 0.2);
			case 'WARN':
				return alpha(theme.palette.warning.main, 0.2);
			case 'INFO':
				return alpha(theme.palette.info.main, 0.2);
			default:
				return undefined;
		}
	};

	return (
		<Box sx={{ m: 2, mb: 12 }}>
			<Box sx={{ mb: 1, display: 'flex' }}>
				<Box sx={{ flexGrow: 1, minWidth: 125 }}>
					<Typography variant='h6' gutterBottom>
						System Logs
					</Typography>
				</Box>
				<Box>
					<Autocomplete
						multiple
						options={modules}
						value={selectedModules ?? []}
						onChange={(event, newValue) => {
							setSelectedModules(newValue.length === modules.length ? [] : newValue);
						}}
						renderInput={(params) => <TextField {...params} label='Module(s)' variant='outlined' size='small' />}
						sx={{ minWidth: 150 }}
					/>
				</Box>
			</Box>
			{isLoading ? (
				<LinearProgress />
			) : (
				<TableContainer component={Paper}>
					<Table size='small'>
						<TableHead>
							<TableRow sx={{ padding: 0 }}>
								<TableCell align='left' sx={{ p: '4px 4px' }} width={175}>
									Timestamp
								</TableCell>
								<TableCell align='left' sx={{ p: '4px 4px' }} width={175}>
									Module
								</TableCell>
								<TableCell align='left' sx={{ p: '4px 4px' }}>
									Arguments
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{filteredLogs?.map((log, index) => (
								<TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 }, p: 0, backgroundColor: getColor(log) }}>
									<TableCell align='left' sx={{ p: '0 4px' }}>
										{moment(log.timestamp).format('l LTS')}
									</TableCell>
									<TableCell align='left' sx={{ p: '0 4px' }}>
										{log.module}
									</TableCell>
									<TableCell align='left' sx={{ p: '0 4px' }}>
										<pre style={{ padding: 0, margin: '2px 0' }}>{log.args.map((arg) => (typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg)).join(' ')}</pre>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
			<span ref={bottomRef} />
		</Box>
	);
}
