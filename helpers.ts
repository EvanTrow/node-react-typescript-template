import moment from 'moment';
import { SystemLog } from './web-app/src/types/types';

export const recentLogs: SystemLog[] = [];
const maxLogs = 1500;

const addLog = (prefix: string, type: string, ...args: any[]) => {
	recentLogs.push({ timestamp: moment().valueOf(), module: prefix, type, args });
	if (recentLogs.length > maxLogs) {
		recentLogs.shift();
	}
};

export function createLogger(prefix: string) {
	return {
		log: (...args: any[]) => {
			console.log(`[${prefix}]`, ...args);
			addLog(prefix, 'LOG', ...args);
		},
		error: (...args: any[]) => {
			console.error(`[${prefix}]`, ...args);
			addLog(prefix, 'ERROR', ...args);
		},
		warn: (...args: any[]) => {
			console.warn(`[${prefix}]`, ...args);
			addLog(prefix, 'WARN', ...args);
		},
		info: (...args: any[]) => {
			console.info(`[${prefix}]`, ...args);
			addLog(prefix, 'INFO', ...args);
		},
	};
}

export function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
