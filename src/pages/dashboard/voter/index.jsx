import React, { useState, useEffect } from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { connect } from 'react-redux';
import PollContract from '../../../smart-contract/contracts/artifacts/Poll.json';
import { handleMetamaskTransaction } from '../../../utils/eth';

function Home({ web3, walletAddress, contract }) {
	const getPollName = async (address) => {
		const contract = new web3.eth.Contract(PollContract.abi, address);
		try {
			const pollName = await contract.methods.pollName().call({ from: walletAddress });
			console.log(pollName);
		} catch (err) {
			console.error(err);
		}
	};

	const getPollType = async (address) => {
		const contract = new web3.eth.Contract(PollContract.abi, address);
		try {
			const pollType = await contract.methods.getPollType().call({ from: walletAddress });
			console.log(pollType);
		} catch (err) {
			console.error(err);
		}
	};

	const getEndBlock = async (address) => {
		const contract = new web3.eth.Contract(PollContract.abi, address);
		try {
			const endBlock = await contract.methods.endBlock().call({ from: walletAddress });
			console.log(endBlock);
		} catch (err) {
			console.error(err);
		}
	};

	const getStartBlock = async (address) => {
		const contract = new web3.eth.Contract(PollContract.abi, address);
		try {
			const startBlock = await contract.methods.startBlock().call({ from: walletAddress });
			console.log(startBlock);
		} catch (err) {
			console.error(err);
		}
	};

	const getResultOf = async (to, candidateID) => {
		const contract = new web3.eth.Contract(PollContract.abi, to);
		try {
			const resultOf = await contract.methods
				.getResultOf(candidateID)
				.call({ from: walletAddress });
			console.log(resultOf);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getPollName('id');
		getPollType('id');
		getEndBlock('id');
		getStartBlock('id');
		getResultOf('a', 's');
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
