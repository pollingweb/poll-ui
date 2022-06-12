import React from 'react'
import Loader from '../components/Loader'
import PollModal from '../components/PollModal'
import Web3 from 'web3';
import PollIOContract from "../smart-contract/contracts/artifacts/PollIO.json";
import PollContract from "../smart-contract/contracts/artifacts/Poll.json";
import Modal from '@mui/material/Modal';

const web3 = new Web3("https://rinkeby.infura.io/v3/2c6b7e477a774f919361c4f491d4ffcd");

function PreSignUp() {
    const [loading, setLoading] = React.useState(true);
    const [pollId, setPollId] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const metaMaskConnect = async () => {
        if (window.ethereum) {
            try {
                const response = await window.ethereum.request({method: "eth_requestAccounts"});
                // this.setState({address: response[0]});
            } catch (err) {
                console.log(err);
            }
            const contract = new web3.eth.Contract(PollIOContract.abi, "0xe07eB21048a121fA55B6d9ED9715164958d8Bd6D");
            // this.setState({contract});
        } else {
            window.alert("Install Metamask");
        }
    }
  return (<>
    <div>preSignUp</div>
    <div className="flex items-center rounded-xl bg-[#1c4f46] w-64 py-1 px-3" onClick={()=>metaMaskConnect()}>
      <img src="../assets/images/MetaMask.png" className="h-10 w-16 rounded-full" alt="" /> 
      <span className="text-white ml-3"> Connect Metamask</span>
    </div>
    <Modal
    open={open}
    onClose={handleClose}
    className=""
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <div className="w-full h-full flex justify-center items-center">
    <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="pollId"
              >
                Poll ID
              </label>
              <input id="pollId" onChange={(e)=>setPollId(e.target.value)}/>
              <input type="button"/>
              </div>
        </div></Modal>
    </>
  )
}

export default PreSignUp