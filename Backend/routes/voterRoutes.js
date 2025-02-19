const express = require("express");
const { getVoters,sendEmails } = require("../controllers/voterController");
const router = express.Router();

router.get("/getAll", getVoters); // Endpoint to fetch voters
router.post("/send-mails", sendEmails);
module.exports = router;
