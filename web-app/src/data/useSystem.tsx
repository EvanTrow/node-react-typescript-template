import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { SystemLog } from '../types/types';

export const useSystemLogs = () => {
	return useQuery({
		queryKey: ['system-logs'],
		queryFn: async (): Promise<SystemLog[]> => {
			try {
				const res = await axios.get('/api/util/logs');

				return res.data as SystemLog[];
			} catch (error) {
				console.log('Error fetching system logs:', error);
				throw error;
			}
		},
		refetchInterval: 1000 * 15,
	});
};
