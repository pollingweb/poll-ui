export const handleMetamaskTransaction = async ({ web3, nonce, to, gasPrice, gas, data }) => {
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
			<a href={`https://rinkeby.etherscan.io/tx/${transactionID}`}>View Transaction Status</a>
		);
		return transactionID;
	} catch (err) {
		console.error(err);
	}
};
