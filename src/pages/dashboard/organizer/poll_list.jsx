import React from 'react'
import Poll from '../../../components/Poll';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { RiArrowLeftSLine } from 'react-icons/ri';
import {AiOutlinePlusCircle} from 'react-icons/ai';
import { useContext,createContext,useState } from 'react';
const PollListContext=createContext([]);
function Poll_list() {
    //const [polls, setPolls] = useState([{"name":"Polling","place":"Polling","start_date":"2020-01-01","end_date":"2020-01-01","status":"Active"},{"name":"Polling","place":"Polling","start_date":"2020-01-01","end_date":"2020-01-01","status":"Active"}]);
  return (<>
    <div className='section-header-primary flex justify-between items-center mb-1'>
      <div className='flex items-center'>
				<IconButton className='p-0 mr-4'>
					<RiArrowLeftSLine color='white' fontSize='2rem' />
				</IconButton>
				<Typography variant='h4' fontSize='28px' className='translate-y-[4px]'>
				Polling List
				</Typography>
      </div>
      <a href='polls/create'><button className='flex justify-between items-center mr-4'>
        <AiOutlinePlusCircle className='h-8 w-8 mr-2'></AiOutlinePlusCircle>
       <span>Create New Poll</span></button></a>

		</div>
        <Poll></Poll>
        <Poll></Poll>

    </>)}

export default Poll_list