import * as React from 'react';
import { Link } from 'react-router-dom';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useSocket } from '../../Context/SocketContext';

import { styled } from '@mui/material/styles';
import {
	AppBar as MuiAppBar,
	AppBarProps as MuiAppBarProps,
	Box,
	IconButton,
	Toolbar,
	Typography,
	useTheme,
	Drawer,
	useMediaQuery,
	Avatar,
	CircularProgress,
	Menu,
	ListItemIcon,
	MenuItem,
	Divider,
} from '@mui/material';
import { Menu as MenuIcon, ChevronLeft, ChevronRight, Logout, Settings } from '@mui/icons-material';

import SideMenuMobile from './SideMenuMobile';
import MenuContent from './MenuContent';
import ErrorBoundary from '../ErrorBoundary';
import { OfflineBadge, OnlineBadge } from '../StyledBadge';
import { RcloneIcon } from '../../SvgIcons';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
	open?: boolean;
}>(({ theme }) => ({
	flexGrow: 1,
	transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	marginLeft: `-${drawerWidth}px`,
	marginTop: useMediaQuery(theme.breakpoints.down('sm')) ? 56 : 64,
	maxHeight: `calc(100vh - ${useMediaQuery(theme.breakpoints.down('sm')) ? 56 : 64}px)`,
	overflowY: 'auto',
	variants: [
		{
			props: ({ open }) => open,
			style: {
				transition: theme.transitions.create('margin', {
					easing: theme.transitions.easing.easeOut,
					duration: theme.transitions.duration.enteringScreen,
				}),
				marginLeft: 0,
			},
		},
	],
}));

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
	transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	variants: [
		{
			props: ({ open }) => open,
			style: {
				width: `calc(100% - ${drawerWidth}px)`,
				marginLeft: `${drawerWidth}px`,
				transition: theme.transitions.create(['margin', 'width'], {
					easing: theme.transitions.easing.easeOut,
					duration: theme.transitions.duration.enteringScreen,
				}),
			},
		},
	],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
	position: 'absolute',
	zIndex: 3,
	right: 0,
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
	top: -8,
}));

export const useNavigation = () => {
	const queryClient = useQueryClient();

	return useQuery({
		queryKey: ['navigation'],
		queryFn: (): Promise<{
			open: boolean;
		}> => {
			return queryClient.getQueryData(['navigation']) as Promise<{
				open: boolean;
			}>;
		},
	});
};

const Navigation: React.FC<{ children: React.JSX.Element }> = ({ children }) => {
	const theme = useTheme();

	const queryClient = useQueryClient();
	const { socket, connected: socketConnected } = useSocket();

	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	React.useEffect(() => {
		setOpen(!isMobile);
	}, [isMobile]);

	const [open, setOpen] = React.useState(!isMobile);
	const toggleDrawer = () => {
		setOpen(!open);
	};
	React.useEffect(() => {
		queryClient.setQueryData(['navigation'], { open });
	}, [open]);

	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	// scroll to top of page when navigating
	const mainRef = React.useRef<HTMLLIElement>(null);
	React.useEffect(() => {
		if (mainRef.current) {
			mainRef.current.scrollTo(0, 0);
		}
	}, [window.location.pathname]);

	return (
		<Box sx={{ display: 'flex' }}>
			<AppBar position='fixed' open={open && !isMobile}>
				<Toolbar>
					{!isMobile && (
						<IconButton
							color='inherit'
							aria-label='open drawer'
							onClick={toggleDrawer}
							edge='start'
							sx={[
								{
									mr: 2,
								},
								open && { display: 'none' },
							]}
						>
							<MenuIcon />
						</IconButton>
					)}
					<RcloneIcon sx={{ mr: 1 }} />
					<Box sx={{ flexGrow: 1 }}>
						<Typography variant='h6' noWrap component={Link} to='/' sx={{ color: 'inherit', textDecoration: 'none' }}>
							Rclone
						</Typography>
					</Box>

					{isMobile ? (
						<IconButton color='inherit' aria-label='open drawer' edge='end' onClick={toggleDrawer}>
							<MenuIcon />
						</IconButton>
					) : (
						<>
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} className='profile-icon'>
								{socketConnected ? (
									<OnlineBadge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant='dot'>
										<Avatar alt={'rclone'} src='/rclone-profile.png' />
									</OnlineBadge>
								) : (
									<OfflineBadge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant='dot'>
										<Avatar alt={'rclone'} src='/rclone-profile.png' />
									</OfflineBadge>
								)}
							</IconButton>
							<Menu
								sx={{ mt: '40px' }}
								id='menu-appbar'
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								<MenuItem
									onClick={() => {
										handleCloseUserMenu();
									}}
									component={Link}
									to='/settings'
								>
									<ListItemIcon>
										<Settings fontSize='small' />
									</ListItemIcon>
									<Typography textAlign='center'>Settings</Typography>
								</MenuItem>
								<Divider />
								<MenuItem
									onClick={() => {
										handleCloseUserMenu();
									}}
								>
									<ListItemIcon>
										<Logout fontSize='small' />
									</ListItemIcon>
									<Typography textAlign='center'>Logout</Typography>
								</MenuItem>
							</Menu>
						</>
					)}
					<SideMenuMobile open={open} toggleDrawer={toggleDrawer} />
				</Toolbar>
			</AppBar>
			{!isMobile && (
				<Drawer
					sx={{
						width: drawerWidth,
						flexShrink: 0,
						'& .MuiDrawer-paper': {
							width: drawerWidth,
							boxSizing: 'border-box',
						},
					}}
					variant='persistent'
					anchor='left'
					open={open}
				>
					<DrawerHeader>
						<IconButton onClick={toggleDrawer}>{theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}</IconButton>
					</DrawerHeader>

					<MenuContent toggleDrawer={toggleDrawer} />
				</Drawer>
			)}
			<Main open={isMobile || open} ref={mainRef}>
				<DrawerHeader />

				<ErrorBoundary>{children}</ErrorBoundary>
			</Main>
		</Box>
	);
};

export default Navigation;
