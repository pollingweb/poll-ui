import React, { useState } from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Home() {
	return (
		<div>
			<div className='section-header-primary'>
				<Typography variant='h4' fontSize='28px'>
					Digital Ballot For Polling1
				</Typography>
			</div>
			<div className='p-8'>
				<div className='flex w-100'>
					<Typography variant='h6' className='flex-1'>
						Poll Name
					</Typography>
					<Typography variant='h6' className='flex-1'>
						Polling 1
					</Typography>
				</div>
				<div className='flex w-100'>
					<Typography variant='h6' className='flex-1'>
						Poll Agenda
					</Typography>
					<Typography variant='h6' className='flex-1'>
						Polling 1
					</Typography>
				</div>
				<div className='flex w-100'>
					<Typography variant='h6' className='flex-1'>
						Poll Location
					</Typography>
					<Typography variant='h6' className='flex-1'>
						Konnagar
					</Typography>
				</div>
				<div className='flex w-100'>
					<Typography variant='h6' className='flex-1'>
						Poll Start Time
					</Typography>
					<Typography variant='h6' className='flex-1'>
						1st Jan 2022, 05:20hrs
					</Typography>
				</div>
				<div className='flex w-100'>
					<Typography variant='h6' className='flex-1'>
						Poll End Time
					</Typography>
					<Typography variant='h6' className='flex-1'>
						2nd Jan 2022, 05:20hrs
					</Typography>
				</div>
			</div>
			<div className='text-center mb-4'>
				<Button variant='contained' color='primary'>
					Apply
				</Button>
			</div>

			<div className='section-header-primary'>
				<Typography variant='h4' fontSize='28px'>
					Polling 1 - Candidate List
				</Typography>
			</div>
			<div>
				<div className='flex my-4 ml-[24px]'>
					<div className='flex-1'>
						<div className='list-icon-primary inline-flex'>SD</div>
						<Typography variant='h6' className='inline align-middle ml-4'>
							Polling 1 - Candidate List
						</Typography>
					</div>
					<div className='flex-1 flex items-center space-x-4'>
						<Button variant='contained' color='primary' size='small'>
							See Full Profile
						</Button>
						<Button variant='contained' color='primary' size='small'>
							Click to Vote
						</Button>
					</div>
				</div>
				<div className='flex my-4 ml-[24px]'>
					<div className='flex-1'>
						<div className='list-icon-primary inline-flex'>SD</div>
						<Typography variant='h6' className='inline align-middle ml-4'>
							Polling 1 - Candidate List
						</Typography>
					</div>
					<div className='flex-1 flex items-center space-x-4'>
						<Button variant='contained' color='primary' size='small'>
							See Full Profile
						</Button>
						<Button variant='contained' color='primary' size='small'>
							Click to Vote
						</Button>
					</div>
				</div>
				<div className='flex my-4 ml-[24px]'>
					<div className='flex-1'>
						<div className='list-icon-primary inline-flex'>SD</div>
						<Typography variant='h6' className='inline align-middle ml-4'>
							Polling 1 - Candidate List
						</Typography>
					</div>
					<div className='flex-1 flex items-center space-x-4'>
						<Button variant='contained' color='primary' size='small'>
							See Full Profile
						</Button>
						<Button variant='contained' color='primary' size='small'>
							Click to Vote
						</Button>
					</div>
				</div>
				<div className='flex my-4 ml-[24px]'>
					<div className='flex-1'>
						<div className='list-icon-primary inline-flex'>SD</div>
						<Typography variant='h6' className='inline align-middle ml-4'>
							Polling 1 - Candidate List
						</Typography>
					</div>
					<div className='flex-1 flex items-center space-x-4'>
						<Button variant='contained' color='primary' size='small'>
							See Full Profile
						</Button>
						<Button variant='contained' color='primary' size='small'>
							Click to Vote
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
