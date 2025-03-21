// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

contract Voting {
    struct Candidate {
        uint id;
        string name;
        string party;
        string candidatePhoto;
        string partySymbol;
        uint voteCount;
    }

    struct Election {
        string electionName;
        uint[] candidateIds;
    }

    mapping(uint => Candidate) public candidates;
    mapping(string => Election) public elections;
    mapping(string => bool) public hasVoted; // Changed from address to string (voterId)
    uint public candidatesCount = 0;

    event CandidateAdded(uint id, string name, string party, string candidatePhoto, string partySymbol);
    event ElectionCreated(string electionName, uint[] candidateIds);
    event VoteCasted(uint candidateId, string voterId);

    function addCandidate(string memory _name, string memory _party, string memory _candidatePhoto, string memory _partySymbol) public {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, _party, _candidatePhoto, _partySymbol, 0);
        emit CandidateAdded(candidatesCount, _name, _party, _candidatePhoto, _partySymbol);
    }

    function createElection(string memory _electionName, uint[] memory _candidateIds) public {
        elections[_electionName] = Election(_electionName, _candidateIds);
        emit ElectionCreated(_electionName, _candidateIds);
    }

    function vote(uint _candidateId, string memory _voterId) public {
        require(!hasVoted[_voterId], "You have already voted");  // Check by voterId
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate");

        candidates[_candidateId].voteCount++;
        hasVoted[_voterId] = true; // Mark voterId as voted
        emit VoteCasted(_candidateId, _voterId);
    }

    function getCandidatesCount() public view returns (uint) {
        return candidatesCount;
    }

    function getCandidate(uint _id) public view returns (string memory, string memory, string memory, string memory, uint) {
        require(_id > 0 && _id <= candidatesCount, "Candidate does not exist");
        Candidate memory c = candidates[_id];
        return (c.name, c.party, c.candidatePhoto, c.partySymbol, c.voteCount);
    }
}
