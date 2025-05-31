import React from 'react';

import MenuContent from './MenuContent';
import { Drawer, drawerClasses, Stack, Avatar, Typography, Divider, Button, CircularProgress } from '@mui/material';
import { LogoutRounded } from '@mui/icons-material';
import { OnlineBadge } from '../StyledBadge';
import { useSocket } from '../../Context/SocketContext';

interface SideMenuMobileProps {
	open: boolean | undefined;
	toggleDrawer: () => void;
}

export default function SideMenuMobile({ open, toggleDrawer }: SideMenuMobileProps) {
	const { connected: socketConnected } = useSocket();

	return (
		<Drawer
			anchor='right'
			open={open}
			onClose={toggleDrawer}
			sx={{
				zIndex: 1202,
				display: { xs: 'auto', md: 'none' },

				[`& .${drawerClasses.paper}`]: {
					backgroundImage: 'none',
					backgroundColor: 'background.paper',
				},
			}}
		>
			<Stack
				sx={{
					height: '100%',
					width: '60dvw',
				}}
			>
				<Stack direction='row' sx={{ p: 2, pb: 0, gap: 1 }}>
					<Stack direction='row' sx={{ gap: 1, alignItems: 'center', flexGrow: 1, p: 1 }}>
						{/* {auth.user ? (
							socketConnected ? (
								<OnlineBadge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant='dot'>
									<Avatar alt={auth.user.displayName} src={auth.user.picture ?? ''} sx={{ width: 24, height: 24 }} />
								</OnlineBadge>
							) : (
								<Avatar alt={auth.user.displayName} src={auth.user.picture ?? ''} sx={{ width: 24, height: 24 }} />
							)
						) : (
							<CircularProgress color='inherit' />
						)}

						<Typography component='p' variant='h6'>
							{auth.user?.displayName}
						</Typography> */}
					</Stack>
				</Stack>
				<Divider />
				<Stack sx={{ flexGrow: 1 }}>
					<MenuContent toggleDrawer={toggleDrawer} />
					<Divider />
				</Stack>
				<Stack sx={{ p: 2 }}>
					<Button
						variant='outlined'
						fullWidth
						startIcon={<LogoutRounded />}
						onClick={() => {
							toggleDrawer();
						}}
					>
						Logout
					</Button>
				</Stack>
			</Stack>
		</Drawer>
	);
}
