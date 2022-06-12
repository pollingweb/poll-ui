import React from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { RiArrowLeftSLine } from 'react-icons/ri';
import {AiOutlinePlusCircle} from 'react-icons/ai';
import {FiEdit} from 'react-icons/fi';
import Candidate from '../../../components/Candidate';
import Voter from '../../../components/Voter';
function poll_detail() {
  return (
    <div>
    <div className='section-header-primary flex items-center justify-between'>
      <div>
    <Typography variant='h4' fontSize='28px'>
      Polling-1 Detail
    </Typography>
    </div>
    <div>
    <FiEdit className='h-6 w-6'/>
    </div>

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
    <Button variant='contained' color='primary' className='bg-red-500'>
      End Poll
    </Button>
  </div>

  <div className='section-header-primary  flex items-center justify-between'>
    <div>
    <Typography variant='h4' fontSize='28px'>
      Polling 1 - Candidate List
    </Typography>
    </div>
    <div className='flex'>
    <FiEdit className='h-6 w-6 mr-3'/>
    <AiOutlinePlusCircle className='h-6 w-6'/>
      </div>
  </div>
  <div>
    <Candidate user="organizer" editMode={false}></Candidate>
    <Candidate user="organizer" editMode={false}></Candidate>
            <Candidate user="organizer" editMode={false}></Candidate>
            <Candidate user="organizer" editMode={false}></Candidate>
  </div>
  <div className='section-header-primary  flex items-center justify-between'>
    <div>
    <Typography variant='h4' fontSize='28px'>
      Pollling 1-Voter's List
    </Typography>
    </div>
    <div className='flex'>
    <FiEdit className='h-6 w-6 mr-3'/>
    <AiOutlinePlusCircle className='h-6 w-6'/>
      </div>
  </div>
        <Voter editMode={false}></Voter>
        <Voter editMode={false}></Voter>
        <Voter editMode={false}></Voter>
  </div>)
}

export default poll_detail