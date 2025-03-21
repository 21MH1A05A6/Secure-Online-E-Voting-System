const Election = require('../models/Election'); // Import Election Model
const { Web3 } = require('web3');
const Voting = require('../../blockchain-voting/build/contracts/Voting.json'); // Adjust path if needed
const User= require('../models/User');

// Configure Web3 with Ganache or Ethereum node
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545")); // Update with actual blockchain network
const contractAddress = "0x02651CDDC343ee45556903c69eDCa9faCb226558"; // Replace with actual deployed contract address
const contract = new web3.eth.Contract(Voting.abi, contractAddress);

const createElection = async (req, res) => {
    try {
        console.log('Election Name:', req.body.electionName);
        console.log('Received Files:', req.files);

        // Extract candidates data
        const candidates = [];
        for (let i = 0; req.body[`candidates[${i}].name`]; i++) {
            const candidate = {
                name: req.body[`candidates[${i}].name`],
                party: req.body[`candidates[${i}].party`],
            };

            // Attach uploaded files if they exist
            const candidatePhoto = req.files.find(file => file.fieldname === `candidates[${i}].candidatePhoto`);
            const partySymbol = req.files.find(file => file.fieldname === `candidates[${i}].partySymbol`);

            candidate.candidatePhoto = candidatePhoto ? candidatePhoto.filename : null; // Store filename instead of path
            candidate.partySymbol = partySymbol ? partySymbol.filename : null;

            candidates.push(candidate);
        }

        console.log('Processed Candidates:', candidates);

        // Save to MongoDB
        const newElection = new Election({
            electionName: req.body.electionName,
            candidates: candidates,
        });

        await newElection.save(); // Insert data into MongoDB
        console.log('Election saved successfully:', newElection);

        // Connect to blockchain
        const accounts = await web3.eth.getAccounts();
        const owner = accounts[0]; // Use first account from Ganache

        const candidateIds = [];

        // 🔹 Add candidates to blockchain and collect their IDs
        for (const candidate of candidates) {
            await contract.methods.addCandidate(candidate.name, candidate.party, candidate.candidatePhoto, candidate.partySymbol).send({
                from: owner,
                gas: 3000000
            });

            // Get the latest candidate ID by checking candidatesCount
            const candidateCount = await contract.methods.getCandidatesCount().call();
            candidateIds.push(parseInt(candidateCount)); // Ensure ID is a number
        }

        console.log("Candidate IDs stored in blockchain:", candidateIds);

        // 🔹 Now create election with the candidate IDs
        await contract.methods.createElection(req.body.electionName, candidateIds).send({
            from: owner,
            gas: 3000000
        });

        console.log("Election stored in blockchain successfully!");

        res.status(201).json({ 
            message: 'Election created successfully!', 
            election: newElection 
        });

    } catch (error) {
        console.error('Error creating election:', error);
        res.status(500).json({ message: 'Failed to create election', error: error.message });
    }
};

/**
 * 🔹 Function to allow voters to cast their vote for a candidate
 */
const voteForCandidate = async (req, res) => {
  try {
      const { voterId, candidateId } = req.body;

      // Ensure voterId and candidateId are provided
      if (!voterId || !candidateId) {
          return res.status(400).json({ error: "Voter ID and Candidate ID are required" });
      }

      // Find the voter in MongoDB
      const voter = await User.findOne({ voterId });

      if (!voter || !voter.tempPassword) {
          return res.status(400).json({ error: "Voter is not eligible to vote or has already voted" });
      }

      // Send transaction from the admin's address
      const adminAccount = (await web3.eth.getAccounts())[0];

      await contract.methods.vote(candidateId, voterId).send({
          from: adminAccount,
          gas: 3000000,
      });

      // Update tempPasswordExpiry to the current timestamp
      voter.tempPasswordExpiry = new Date();
      await voter.save();

      res.status(200).json({ message: "Vote cast successfully!" });
  } catch (error) {
      console.error("Error casting vote:", error);
      res.status(500).json({ error: "Voting failed. Please try again." });
  }
};


module.exports = { createElection, voteForCandidate };
