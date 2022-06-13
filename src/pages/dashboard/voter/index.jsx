import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { connect } from 'react-redux';
import PollContract from '../../../smart-contract/contracts/artifacts/Poll.json';
import { handleMetamaskTransaction } from '../../../utils/eth';
import axios from 'axios';

function Home({ web3, walletAddress, contract }) {
	const [polldetails, setpolldetails] = useState({});
	const [candidateDetails, setcandidateDetails] = useState({});
	let { pollId} = useParams();

	// const getPollName = async (address) => {
	// 	const contract = new web3.eth.Contract(PollContract.abi, address);
	// 	try {
	// 		const pollName = await contract.methods.pollName().call({ from: walletAddress });
	// 		console.log(pollName);
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// };

	// const getPollType = async (address) => {
	// 	const contract = new web3.eth.Contract(PollContract.abi, address);
	// 	try {
	// 		const pollType = await contract.methods.getPollType().call({ from: walletAddress });
	// 		console.log(pollType);
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// };

	// const getEndBlock = async (address) => {
	// 	const contract = new web3.eth.Contract(PollContract.abi, address);
	// 	try {
	// 		const endBlock = await contract.methods.endBlock().call({ from: walletAddress });
	// 		console.log(endBlock);
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// };

	// const getStartBlock = async (address) => {
	// 	const contract = new web3.eth.Contract(PollContract.abi, address);
	// 	try {
	// 		const startBlock = await contract.methods.startBlock().call({ from: walletAddress });
	// 		console.log(startBlock);
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// };

	useEffect(() => {
		async function getPollDetails() {
			const candidateDetails=await axios.get(`${process.env.REACT_APP_API_URL ||"http://localhost:4000"}/api/voter/${walletAddress}`);
			const pollDetails = await axios.get(
				`${process.env.REACT_APP_API_BASEURL||"http://localhost:4000"}/api/poll/${pollId}`
			);

			if (pollDetails.status === 200) {
				setpolldetails(pollDetails.data);
			}
		}

		getPollDetails();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const voteFor = async (to, candidateID) => {
		const contract = new web3.eth.Contract(PollContract.abi, to);

		try {
			const tx = contract.methods.voteFor(candidateID);
			const gas = await tx.estimateGas({ from: walletAddress });
			const gasPrice = await web3.eth.getGasPrice();
			const data = tx.encodeABI();
			const nonce = await web3.eth.getTransactionCount(walletAddress);

			const transactionID = await handleMetamaskTransaction({
				web3,
				walletAddress,
				nonce,
				to,
				gasPrice,
				gas,
				data,
			});

			console.log(transactionID);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div>
			<div className='section-header-primary'>
				<Typography variant='h4' fontSize='28px'>
					Digital Ballot For Polling
				</Typography>
			</div>
			<div className='p-8'>
				<div className='flex w-100'>
					<Typography variant='h6' className='flex-1'>
						Poll Name
					</Typography>
					<Typography variant='h6' className='flex-1'>
						{polldetails?.name}
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
						Poll Type
					</Typography>
					<Typography variant='h6' className='flex-1'>
						{polldetails?.pollType}
					</Typography>
				</div>
				<div className='flex w-100'>
					<Typography variant='h6' className='flex-1'>
						Poll Start Time
					</Typography>
					<Typography variant='h6' className='flex-1'>
						{polldetails?.startDate}
					</Typography>
				</div>
				<div className='flex w-100'>
					<Typography variant='h6' className='flex-1'>
						Poll End Time
					</Typography>
					<Typography variant='h6' className='flex-1'>
						{polldetails?.endDate}
					</Typography>
				</div>
			</div>
			<div className='text-center mb-4'>
				{!candidateDetails.verified && <Button variant='contained' color='primary'>
					Apply
				</Button>}
			</div>

			<div className='section-header-primary'>
				<Typography variant='h4' fontSize='28px'>
					Polling - Candidate List
				</Typography>
			</div>
			<div>
				{polldetails?.Candidates?.map((data) => (
					<div className='flex my-4 ml-[24px]' key={data.id}>
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
							{candidateDetails.verified &&
							<Button variant='contained' color='primary' size='small' onClick={()=>voteFor(polldetails.id,data.id)}>
								Click to Vote
							</Button>
	}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

const mapStateToProps = ({ auth }) => {
	return {
		web3: auth.web3,
		walletAddress: auth.walletAddress,
		contract: auth.contract,
	};
};

// const mapDispatchToProps = (dispatch) => {
// 	return {};
// };

export default connect(mapStateToProps)(Home);
