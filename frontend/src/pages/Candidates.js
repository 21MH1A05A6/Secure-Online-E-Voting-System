import React, { useEffect, useState, useCallback } from "react";
import web3 from "../blockchain/web3";
import VotingContract from "../blockchain/VotingContract";
import { useNavigate } from "react-router-dom";
import "../assets/css/candidates.css"; // Import the dedicated CSS file

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasVoted, setHasVoted] = useState(false);
  const [account, setAccount] = useState("");

  const navigate = useNavigate();
  
  const LogoutButton = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/loginpage");
  };

  const loadAccount = useCallback(async () => {
    const accounts = await web3.eth.getAccounts();
    if (accounts.length > 0) {
      setAccount(accounts[0]);
    } else {
      console.error("No MetaMask account detected.");
    }
  }, []);

  const loadCandidates = useCallback(async () => {
    try {
      const candidateCount = await VotingContract.methods.getCandidatesCount().call();
      if (candidateCount > 0) {
        const candidatesArray = await Promise.all(
          [...Array(Number(candidateCount))].map(async (_, i) => {
            const candidate = await VotingContract.methods.getCandidate(i + 1).call();
            return {
              id: i + 1,
              name: candidate[0],
              party: candidate[1],
              candidatePhoto: candidate[2] ? `http://localhost:5000/uploads/${candidate[2]}` : null,
              partySymbol: candidate[3] ? `http://localhost:5000/uploads/${candidate[3]}` : null,
              votes: candidate[4].toString(),
            };
          })
        );
        setCandidates(candidatesArray);
      }
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
    setLoading(false);
  }, []);

  const handleVote = async (candidateId) => {
    try {
      const voterId = localStorage.getItem("voterId");
      if (!voterId) {
        alert("Voter ID is missing. Please log in again.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/elections/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ voterId, candidateId }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setHasVoted(true);
        loadCandidates();
      } else {
        alert(data.message || "Voting failed.");
      }
    } catch (error) {
      console.error("Error casting vote:", error);
      alert("Voting failed. Please try again.");
    }
  };

  useEffect(() => {
    loadAccount();
    loadCandidates();
  }, [loadAccount, loadCandidates]);

  return (
    <div className="candidate-container">
      <button className="logout-btn" onClick={LogoutButton}>Logout</button>
      <h2 className="candidate-title">Candidates List</h2>
      {loading ? (
        <p className="loading-text">Loading candidates...</p>
      ) : candidates.length === 0 ? (
        <p className="no-candidates-text">No candidates found.</p>
      ) : (
        <ul className="candidate-list">
          {candidates.map((candidate) => (
            <li key={candidate.id} className="candidate-card">
              <strong className="candidate-name">{candidate.name} - {candidate.party}</strong>
              <br />
              {candidate.candidatePhoto && <img className="candidate-photo" src={candidate.candidatePhoto} alt={candidate.name} />}
              {candidate.partySymbol && <img className="party-symbol" src={candidate.partySymbol} alt={candidate.party} />}
              <p className="vote-count">Votes: {candidate.votes}</p>
              <button className="vote-btn" onClick={() => handleVote(candidate.id)} disabled={hasVoted}>
                {hasVoted ? "Voted" : "Vote"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CandidateList;
