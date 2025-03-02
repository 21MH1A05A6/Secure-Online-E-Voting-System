const express = require("express");
const { upload, uploadFileToS3 } = require("../config/awsS3");

const router = express.Router();

router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        
        const userId = req.body.userId;  // Assuming user ID is sent in request
        const fileUrl = await uploadFileToS3(req.file, `user_uploads/${userId}`);
        
        res.status(200).json({ message: "File uploaded successfully", url: fileUrl });
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ message: "File upload failed" });
    }
});

module.exports = router;
