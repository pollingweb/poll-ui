import React from 'react'
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
interface EditModeType{
	  editMode:boolean
}
function Voter({editMode}:EditModeType) {
  return (
    <>
    <div className='flex my-4 ml-[24px]'>
					<div className='flex-1'>
						<div className='list-icon-primary inline-flex'>SD</div>
						<Typography variant='h6' className='inline align-middle ml-4'>
							Voter1
						</Typography>
					</div>
					<div className='flex-1 flex items-center space-x-4'>
						<Button variant='contained' color='primary' size='small'>
							See Full Profile
						</Button>
						{editMode && <Button variant='contained' color='primary' size='small'>Delete</Button>}
					</div>
				</div>
    </>
  )
}

export default Voter