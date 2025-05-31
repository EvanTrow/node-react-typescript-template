import * as React from 'react';
import { Link } from 'react-router-dom';

import { Stack, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme, ListSubheader, Collapse, LinearProgress } from '@mui/material';
import {
	AccountCircle,
	AdminPanelSettings,
	Dashboard,
	Download,
	ExpandLess,
	ExpandMore,
	FolderOpen,
	Home,
	HomeRounded,
	ManageSearch,
	Movie,
	Settings,
	Subtitles,
	SupervisorAccount,
	ThumbUpOffAlt,
	Tv,
	VideoLibrary,
} from '@mui/icons-material';

import { SmallBadge } from '../StyledBadge';

export default function MenuContent({ toggleDrawer }: { toggleDrawer: () => void }) {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<>
			<Stack sx={{ flexGrow: 1, width: '100%' }}>
				{/* Main List */}
				<List
					dense
					subheader={
						<ListSubheader component='div' id='nested-list-subheader'>
							Rclone
						</ListSubheader>
					}
				>
					{/* Home */}
					<ListItem disablePadding sx={{ display: 'block' }}>
						<ListItemButton
							selected={window.location.pathname === '/'}
							onClick={() => {
								isMobile && toggleDrawer();
							}}
							component={Link}
							to='/'
						>
							<ListItemIcon>
								<Dashboard />
							</ListItemIcon>
							<ListItemText primary='Dashboard' />
						</ListItemButton>
					</ListItem>
				</List>

				{/* System */}
				<List
					dense
					subheader={
						<ListSubheader component='div' id='nested-list-subheader'>
							System
						</ListSubheader>
					}
				>
					{/* Logs */}
					<ListItem disablePadding sx={{ display: 'block' }}>
						<ListItemButton
							selected={window.location.pathname === '/logs'}
							onClick={() => {
								isMobile && toggleDrawer();
							}}
							component={Link}
							to='/logs'
						>
							<ListItemIcon>
								<ManageSearch />
							</ListItemIcon>
							<ListItemText primary='Logs' />
						</ListItemButton>
					</ListItem>
				</List>
			</Stack>

			{/* Secondary List */}
			<List dense>
				{/* Admin */}
				<ListItem disablePadding sx={{ display: 'block' }}>
					<ListItemButton
						selected={window.location.pathname === '/settings'}
						onClick={() => {
							isMobile && toggleDrawer();
						}}
						component={Link}
						to='/settings'
					>
						<ListItemIcon>
							<Settings />
						</ListItemIcon>
						<ListItemText primary='Settings' />
					</ListItemButton>
				</ListItem>
			</List>
		</>
	);
}
