const Election = require('../models/Election'); // Import Election Model

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

      candidate.candidatePhoto = candidatePhoto ? candidatePhoto.path : null;
      candidate.partySymbol = partySymbol ? partySymbol.path : null;

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

    res.status(201).json({ message: 'Election created successfully!', election: newElection });
  } catch (error) {
    console.error('Error creating election:', error);
    res.status(500).json({ message: 'Failed to create election', error: error.message });
  }
};

module.exports = { createElection };
