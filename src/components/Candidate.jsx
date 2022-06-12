import React from 'react'
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
interface User{
    user:string,
	editMode:boolean
}
function Candidate({user,editMode}:User) {
  return (
    <>
    <div className='flex my-4 ml-[24px]'>
					<div className='flex-1'>
						<div className='list-icon-primary inline-flex'>SD</div>
						<Typography variant='h6' className='inline align-middle ml-4'>
							Candidate1
						</Typography>
					</div>
					<div className='flex-1 flex items-center space-x-4'>
						<Button variant='contained' color='primary' size='small'>
							See Full Profile
						</Button>
                        {
                        user === 'voter' ? <Button variant='contained' color='primary' size='small'>Click to Vote</Button>:null}
						{user === 'organizer' && editMode && <Button variant='contained' color='primary' size='small'>Delete</Button>}
					</div>
				</div>
    </>
  )
}

export default Candidate