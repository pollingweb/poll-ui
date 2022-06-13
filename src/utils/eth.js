export const handleMetamaskTransaction = async ({
	web3,
	walletAddress,
	nonce,
	to,
	gasPrice,
	gas,
	data,
}) => {
	console.log({ web3, nonce, to, gasPrice, gas, data });
	try {
		const transactionID = await window.ethereum.request({
			method: 'eth_sendTransaction',
			params: [
				{
					nonce: web3.utils.toHex(nonce),
					from: walletAddress,
					to,
					gasPrice: web3.utils.toHex(gasPrice),
					gas: web3.utils.toHex(gas),
					data,
				},
			],
		});
		console.log(transactionID);
		window.alert(
			<a href={`https://rinkeby.etherscan.io/tx/${transactionID}`}>View Transaction Status</a>
		);
		return transactionID;
	} catch (err) {
		console.error(err);
	}
};
