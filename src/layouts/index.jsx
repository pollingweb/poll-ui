import React, { useState } from 'react';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import Sidebar from '../components/sidebar';
import Header from '../components/header';
import { Outlet } from 'react-router-dom';

export default function Layout() {
	const [mobileOpen, setMobileOpen] = useState(false);
	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

			<Box
				component='main'
				sx={{
					flexGrow: 1,
					width: { sm: `calc(100% - 240px)` },
					background: 'white',
					minHeight: '100vh',
				}}
			>
				<Header />
				<Outlet />
			</Box>
		</Box>
	);
}
