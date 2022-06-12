import React, { memo, FunctionComponent } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import classname from 'classnames';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

import { AiFillHome } from 'react-icons/ai';
import { RiArrowRightSLine } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';

import { NavLink } from 'react-router-dom';

type SidebarProps = {
	mobileOpen: boolean;
	setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// const useStyles = makeStyles((theme: any) => ({
// 	root: {
// 		backgroundColor: '#E6E9F1',
// 		color: '#25468A',
// 		borderRight: '0',
// 		[theme.breakpoints.up('sm')]: {
// 			top: '64px',
// 		},
// 	},
// }));

function Sidebar({ mobileOpen, setMobileOpen }: SidebarProps) {
	const handleDrawerToggle = () => {
		setMobileOpen((pre: boolean) => !pre);
	};

	return (
		<Box
			component='nav'
			sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
			aria-label='mailbox folders'
		>
			<Drawer
				variant='temporary'
				open={mobileOpen}
				onClose={handleDrawerToggle}
				ModalProps={{
					keepMounted: true,
				}}
				sx={{
					display: { xs: 'block', sm: 'none' },
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
				}}
				// classes={{ paper: classes.root }}
			>
				<img src='/assets/images/Logo.png' alt='logo' />
			</Drawer>
			<Drawer
				variant='permanent'
				sx={{
					display: { xs: 'none', sm: 'block' },
					'& .MuiDrawer-paper': {
						boxSizing: 'border-box',
						width: 240,
					},
				}}
				// classes={{ paper: classes.root }}
				open
			>
				<div style={{ padding: '24px', marginBottom: '16px' }}>
					<img src='/assets/images/Logo.png' alt='logo' style={{ width: '100%' }} />
				</div>
				<Divider />
				<div style={{ padding: '20px' }}>
					<Button
						variant='contained'
						color='primary'
						fullWidth
						startIcon={<AiFillHome />}
						style={{ marginBottom: '8px' }}
					>
						Digital Ballot
					</Button>
					<Button
						variant='contained'
						color='secondary'
						fullWidth
						startIcon={<FaUserCircle />}
						endIcon={<RiArrowRightSLine />}
					>
						Profile
					</Button>
				</div>
				<Divider />
			</Drawer>
		</Box>
	);
}

export default memo(Sidebar);
