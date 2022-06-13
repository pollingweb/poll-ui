import React from 'react';
import Web3 from 'web3';
import PollIOContract from './smart-contract/contracts/artifacts/PollIO.json';
import PollContract from './smart-contract/contracts/artifacts/Poll.json';

const web3 = new Web3('https://rinkeby.infura.io/v3/2c6b7e477a774f919361c4f491d4ffcd');

class App extends React.Component {
	state = {
		address: '',
		balance: '',
		contract: '',
		previousPolls: [],
	};

	handleConnectMetamask = async () => {
		if (window.ethereum) {
			try {
				const response = await window.ethereum.request({ method: 'eth_requestAccounts' });
				this.setState({ address: response[0] });
			} catch (err) {
				console.log(err);
			}
			const contract = new web3.eth.Contract(
				PollIOContract.abi,
				'0xe07eB21048a121fA55B6d9ED9715164958d8Bd6D'
			);
			this.setState({ contract });
		} else {
			window.alert('Install Metamask');
		}
	};

	handleMetamaskTransaction = async ({ nonce, to, gasPrice, gas, data }) => {
		try {
			const transactionID = await window.ethereum.request({
				method: 'eth_sendTransaction',
				params: [
					{
						nonce: web3.utils.toHex(nonce),
						from: this.state.address,
						to,
						gasPrice: web3.utils.toHex(gasPrice),
						gas: web3.utils.toHex(gas),
						data,
					},
				],
			});
			window.alert(
				<a href={`https://rinkeby.etherscan.io/tx/${transactionID}`}>
					View Transaction Status
				</a>
			);
			return transactionID;
		} catch (err) {
			console.error(err);
		}
	};

	getPreviousPolls = async () => {
		try {
			const previousPolls = await this.state.contract.methods
				.getPreviousPolls()
				.call({ from: this.state.address });
			this.setState({ previousPolls });
			console.log(previousPolls);
		} catch (err) {
			console.error(err);
		}
	};

	getPollName = async (address) => {
		const contract = new web3.eth.Contract(PollContract.abi, address);
		try {
			const pollName = await contract.methods.pollName().call({ from: this.state.address });
			console.log(pollName);
		} catch (err) {
			console.error(err);
		}
	};

	getPollType = async (address) => {
		const contract = new web3.eth.Contract(PollContract.abi, address);
		try {
			const pollType = await contract.methods
				.getPollType()
				.call({ from: this.state.address });
			console.log(pollType);
		} catch (err) {
			console.error(err);
		}
	};

	getEndBlock = async (address) => {
		const contract = new web3.eth.Contract(PollContract.abi, address);
		try {
			const endBlock = await contract.methods.endBlock().call({ from: this.state.address });
			console.log(endBlock);
		} catch (err) {
			console.error(err);
		}
	};

	getStartBlock = async (address) => {
		const contract = new web3.eth.Contract(PollContract.abi, address);
		try {
			const startBlock = await contract.methods
				.startBlock()
				.call({ from: this.state.address });
			console.log(startBlock);
		} catch (err) {
			console.error(err);
		}
	};

	getResultOf = async (to, candidateID) => {
		const contract = new web3.eth.Contract(PollContract.abi, to);
		try {
			const resultOf = await contract.methods
				.getResultOf(candidateID)
				.call({ from: this.state.address });
			console.log(resultOf);
		} catch (err) {
			console.error(err);
		}
	};

	createPoll = async () => {
		try {
			const tx = this.state.contract.methods.createPoll(
				'test poll 1',
				100,
				['c1', 'c2', 'c3', 'c4', 'c5', 'c6'],
				'Public'
			);
			const gas = await tx.estimateGas({ from: this.state.address });
			const gasPrice = await web3.eth.getGasPrice();
			const data = tx.encodeABI();
			const nonce = await web3.eth.getTransactionCount(this.state.address);

			const transactionID = await this.handleMetamaskTransaction({
				nonce,
				to: '0xe07eB21048a121fA55B6d9ED9715164958d8Bd6D',
				gasPrice,
				gas,
				data,
			});

			console.log(transactionID);
		} catch (err) {
			console.error(err);
		}
	};

	renamePoll = async (to, newName) => {
		const contract = new web3.eth.Contract(PollContract.abi, to);

		try {
			const tx = contract.methods.renamePoll(newName);
			const gas = await tx.estimateGas({ from: this.state.address });
			const gasPrice = await web3.eth.getGasPrice();
			const data = tx.encodeABI();
			const nonce = await web3.eth.getTransactionCount(this.state.address);

			const transactionID = await this.handleMetamaskTransaction({
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

	increasePollDuration = async (to, extendedBlocks) => {
		const contract = new web3.eth.Contract(PollContract.abi, to);

		try {
			const tx = contract.methods.increasePollDuration(extendedBlocks);
			const gas = await tx.estimateGas({ from: this.state.address });
			const gasPrice = await web3.eth.getGasPrice();
			const data = tx.encodeABI();
			const nonce = await web3.eth.getTransactionCount(this.state.address);

			const transactionID = await this.handleMetamaskTransaction({
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

	cancelPoll = async (to) => {
		const contract = new web3.eth.Contract(PollContract.abi, to);

		try {
			const tx = contract.methods.cancelPoll();
			const gas = await tx.estimateGas({ from: this.state.address });
			const gasPrice = await web3.eth.getGasPrice();
			const data = tx.encodeABI();
			const nonce = await web3.eth.getTransactionCount(this.state.address);

			const transactionID = await this.handleMetamaskTransaction({
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

	endPoll = async (to) => {
		const contract = new web3.eth.Contract(PollContract.abi, to);

		try {
			const tx = contract.methods.endPoll();
			const gas = await tx.estimateGas({ from: this.state.address });
			const gasPrice = await web3.eth.getGasPrice();
			const data = tx.encodeABI();
			const nonce = await web3.eth.getTransactionCount(this.state.address);

			const transactionID = await this.handleMetamaskTransaction({
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

	voteFor = async (to, candidateID) => {
		const contract = new web3.eth.Contract(PollContract.abi, to);

		try {
			const tx = contract.methods.voteFor(candidateID);
			const gas = await tx.estimateGas({ from: this.state.address });
			const gasPrice = await web3.eth.getGasPrice();
			const data = tx.encodeABI();
			const nonce = await web3.eth.getTransactionCount(this.state.address);

			const transactionID = await this.handleMetamaskTransaction({
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

	render() {
		return (
			<>
				<button onClick={this.handleConnectMetamask}>Connect with Metamask</button>
				<h3>Address: {this.state.address}</h3>
				<h3>Balance: {this.state.balance}</h3>
				<button onClick={this.getPreviousPolls}>Get Previous Polls</button>
				<button onClick={this.createPoll}>Create Poll</button>
				<button onClick={() => this.getPollName(this.state.previousPolls[0])}>
					Get Poll Name
				</button>
				<button onClick={() => this.getPollType(this.state.previousPolls[0])}>
					Get Poll Type
				</button>
				<button
					onClick={() => this.renamePoll(this.state.previousPolls[0], 'test poll 01')}
				>
					Rename Poll
				</button>
				<button onClick={() => this.getStartBlock(this.state.previousPolls[0])}>
					Get Start Block
				</button>
				<button onClick={() => this.getEndBlock(this.state.previousPolls[0])}>
					Get End Block
				</button>
				<button onClick={() => this.increasePollDuration(this.state.previousPolls[0], 50)}>
					Increase Poll Duration
				</button>
				<button onClick={() => this.cancelPoll(this.state.previousPolls[0])}>
					Cancel Poll
				</button>
				<button onClick={() => this.endPoll(this.state.previousPolls[0])}>End Poll</button>
				<button onClick={() => this.voteFor(this.state.previousPolls[0], 'c1')}>
					Vote For
				</button>
				<button onClick={() => this.getResultOf(this.state.previousPolls[0], 'c1')}>
					Get Result Of
				</button>
			</>
		);
	}
}

export default App;
