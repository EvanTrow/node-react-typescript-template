import express from 'express';
import { createLogger, recentLogs } from '../helpers';

// logging
const console = createLogger('Util');

const router = express.Router();

router.get('/logs', async (req, res) => {
	try {
		console.info('Fetching recent logs');

		res.json(recentLogs);
	} catch (error) {
		console.error('Failed to get logs', error);
		res.status(500).json({ message: String(error) });
	}
});

export const utilRoutes = router;
