import React from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
// import { RiArrowLeftSLine } from "react-icons/ri";
import { TbEditOff } from "react-icons/tb";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import Candidate from "../../../components/Candidate";
import Voter from "../../../components/Voter";
import { RadioGroup } from "@mui/material";
// import { type } from "@testing-library/user-event/dist/types/setup/directApi";
// import axios from "axios";


function NewPoll() {
  const [poll, setPoll] = useState({
    pollId: "",
    name: "",
    description: "",
    startTime: "",
    endTime: "",
    type: "Public",
    candidates: [],
    voters: [],
  });


  const [openCandidateForm, setOpenCandidateForm] = useState(false);

  const handleOpenCandidateForm = () => {
    setOpenCandidateForm(true);
    console.log("OpenCandidateForm");
  };


  const handleCloseCandidateForm = () => setOpenCandidateForm(false);

  const [openVoterForm, setOpenVoterForm] = useState(false);

  const handleOpenVoterForm = () => {
    setOpenVoterForm(true);
    console.log("OpenVoterForm");
  };

  const handleCloseVoterForm = () => setOpenVoterForm(false);

  const [candidateEdit, setCandidateEdit] = useState(false);

  const [voterEdit, setVoterEdit] = useState(false);

  const [newCandidate, setNewCandidate] = useState({
    pollId: "",
    name: "",
    description: "",
    img_url: "",
    candidate_id: "",
    img: null,
  });

  const [newVoter, setNewVoter] = useState({
    pollId: "",
    name: "",
    email: "",
    voter_id: "",
    img_url: "",
  });

  const [candidateList, setCandidateList] = useState([]);
  const [voterList, setVoterList] = useState([]);


  const addCandidate = async () => {
    setCandidateList([...candidateList, newCandidate]);
    setOpenCandidateForm(false);
  };

  const removeCandidate = (candidate_id) => {
    setCandidateList(
      candidateList.filter(
        (candidate) => candidate.candidate_id !== candidate_id
      )
    );
  };


  const addVoter = () => {
    let form = new FormData();
    setVoterList([...voterList, newVoter]);
    setOpenVoterForm(false);
  };
  const removeVoter = (voter_id) => {
    setVoterList(voterList.filter((voter) => voter.voter_id !== voter_id));
  };
  const addToBlockchain = async () => {
    let form = new FormData();
    form.append("pollName", poll.name);
    form.append("blockNumber", "0");
    form.append(
      "candidateIds",
      JSON.stringify(candidateList.map((candidate) => candidate.candidate_id))
    );
    form.append("pollType", poll.type);
    let response = await fetch(
      "http://localhost:5000/api/poll/addToBlockchain",
      {
        method: "POST",
        body: form,
      }
    );
    let data = await response.json();
    //add pollId to all candidates and voters
    setCandidateList(
      candidateList.map((candidate) => {
        candidate.pollId = data.pollId;
        return candidate;
      })
    );
    setVoterList(
      voterList.map((voter) => {
        voter.pollId = data.pollId;
        return voter;
      })
    );
  };
  const saveToDatabase = async () => {
    let form = new FormData();
  };

  return (
    <div>
      <Modal
        open={openCandidateForm}
        onClose={handleCloseCandidateForm}
        className=""
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="w-full h-full flex justify-center items-center">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Candidate Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Candidate Name"
                value={newCandidate.name}
                onChange={(e) =>
                  setNewCandidate((pre) => ({ ...pre, name: e.target.value }))
                }
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Candidate Description
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Candidate Description"
                value={newCandidate.description}
                onChange={(e) =>
                  setNewCandidate((pre) => ({
                    ...pre,
                    description: e.target.value,
                  }))
                }
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Poll Id
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Poll Id"
                value={newCandidate.pollId}
                onChange={(e) =>
                  setNewCandidate((pre) => ({ ...pre, pollId: e.target.value }))
                }
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Image
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="candidateImg"
                type="file"
              />
            </div>
            <div className="flex items-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => addCandidate()}
              >
                Save
              </button>
              <button
                className="ml-3 bg-red-500 p-2 rounded text-white"
                onClick={handleCloseCandidateForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Voter Form */}
      <Modal
        open={openVoterForm}
        onClose={handleCloseVoterForm}
        className=""
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="w-full h-full flex justify-center items-center">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Voter Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Voter Name"
                value={newVoter.name}
                onChange={(e) =>
                  setNewVoter((pre) => ({ ...pre, name: e.target.value }))
                }
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Voter Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="email"
                placeholder="Voter Email"
                value={newVoter.email}
                onChange={(e) =>
                  setNewVoter((pre) => ({ ...pre, email: e.target.value }))
                }
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Poll Id
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Poll Id"
                value={newVoter.pollId}
                onChange={(e) =>
                  setNewVoter((pre) => ({ ...pre, pollId: e.target.value }))
                }
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="voterImg"
              >
                Image
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="file"
              />
            </div>
            <div className="flex items-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => addVoter()}
              >
                Save
              </button>
              <button
                className="ml-3 bg-red-500 p-2 rounded text-white"
                onClick={handleCloseVoterForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <div className="section-header-primary flex items-center justify-between">
        <div>
          <Typography variant="h4" fontSize="28px">
            New Poll
          </Typography>
        </div>
      </div>
      <div className="p-8">
        <div className="flex w-100 mb-2">
          <Typography variant="h6" className="flex-1">
            Poll Name
          </Typography>
          <Typography variant="h6" className="flex-1">
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              className="bg-gray-100 py-2 px-4 focus:border-b-2 border-[#1C4F46] focus:outline-none"
              value={poll.name}
              onChange={(e) =>
                setPoll((pre) => ({ ...pre, name: e.target.value }))
              }
            />
          </Typography>
        </div>
        <div className="flex w-100 mb-2">
          <Typography variant="h6" className="flex-1">
            Poll Description
          </Typography>
          <Typography variant="h6" className="flex-1">
            <textarea
              name="description"
              cols={23}
              className="bg-gray-100 py-2 px-4 focus:border-b-2 border-[#1C4F46] focus:outline-none"
              value={poll.description}
              onChange={(e) =>
                setPoll((pre) => ({ ...pre, description: e.target.value }))
              }
            />
          </Typography>
        </div>
        <div className="flex w-100 mb-2">
          <Typography variant="h6" className="flex-1">
            Poll Start Time
          </Typography>
          <Typography variant="h6" className="flex-1">
            <input
              type="datetime-local"
              name="startTime"
              id="startTime"
              value={poll.startTime}
              onChange={(e) =>
                setPoll((pre) => ({ ...pre, startTime: e.target.value }))
              }
            />
          </Typography>
        </div>
        <div className="flex w-100 mb-2">
          <Typography variant="h6" className="flex-1">
            Poll End Time
          </Typography>
          <Typography variant="h6" className="flex-1">
            <input
              type="datetime-local"
              name="endTime"
              id="endTime"
              value={poll.endTime}
              onChange={(e) =>
                setPoll((pre) => ({ ...pre, endTime: e.target.value }))
              }
            />
          </Typography>
        </div>
        <div className="flex w-100 mb-2">
          <Typography variant="h6" className="flex-1">
            Type of Poll
          </Typography>
          <Typography variant="h6" className="flex-1">
            <RadioGroup name="type" className="flex w-full flex-row">
              <label htmlFor="Public" className="inline">
                <input
                  type="radio"
                  name="type"
                  value="Public"
                  id="Public"
                  checked
                  className="inline mr-2"
                />
                Public
              </label>
              <label htmlFor="Private" className="inline ml-5">
                <input
                  type="radio"
                  name="type"
                  value="Private"
                  id="Public"
                  className="inline mr-2"
                />
                Private
              </label>
            </RadioGroup>
          </Typography>
        </div>
      </div>

      <div className="section-header-primary  flex items-center justify-between">
        <div>
          <Typography variant="h4" fontSize="28px">
            Polling 1 - Candidate List
          </Typography>
        </div>
        <div className="flex">
          {!candidateEdit && (
            <FiEdit
              className="h-6 w-6 mr-3"
              onClick={() => setCandidateEdit(true)}
            />
          )}
          {candidateEdit && (
            <TbEditOff
              className="h-6 w-6 mr-3"
              onClick={() => setCandidateEdit(false)}
            />
          )}
          <IconButton onClick={handleOpenCandidateForm}>
            <AiOutlinePlusCircle className="h-6 w-6" />
          </IconButton>
        </div>
      </div>
      <div>
        <Candidate user="organizer" editMode={candidateEdit}></Candidate>
        <Candidate user="organizer" editMode={candidateEdit}></Candidate>
        <Candidate user="organizer" editMode={candidateEdit}></Candidate>
        <Candidate user="organizer" editMode={candidateEdit}></Candidate>
      </div>
      <div className="section-header-primary  flex items-center justify-between">
        <div>
          <Typography variant="h4" fontSize="28px">
            Pollling 1-Voter's List
          </Typography>
        </div>
        <div className="flex">
          {!voterEdit && (
            <FiEdit
              className="h-6 w-6 mr-3 cursor:pointer"
              onClick={() => setVoterEdit(true)}
            />
          )}
          {voterEdit && (
            <TbEditOff
              className="h-6 w-6 mr-3 cursor:pointer"
              onClick={() => setVoterEdit(false)}
            />
          )}
          <IconButton onClick={handleOpenVoterForm}>
            <AiOutlinePlusCircle className="h-6 w-6" />
          </IconButton>
        </div>
      </div>
      <Voter editMode={voterEdit}></Voter>
      <Voter editMode={voterEdit}></Voter>
      <Voter editMode={voterEdit}></Voter>
    </div>
  );
}

export default NewPoll;
