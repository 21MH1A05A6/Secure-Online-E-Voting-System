import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/view-voters.css";

const ViewVoters = () => {
  const [voters, setVoters] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVoters = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/voters/getAll");
        setVoters(response.data);
      } catch (error) {
        console.error("Error fetching voters:", error);
      }
    };
    fetchVoters();
  }, []);

  // Function to send emails with temporary login credentials
  const sendEmails = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/voters/send-mails", {}); // Sending an empty object
      alert("Emails sent successfully!");
    } catch (error) {
      console.error("Error sending emails:", error);
    }
  };
  

  return (
    <div className="view-voters-container">
      <h2>Registered Voters</h2>
      <button className="send-mails-btn" onClick={sendEmails} disabled={loading}>
        {loading ? "Sending..." : "Send Mails"}
      </button>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {voters.map((voter, index) => (
            <tr key={index}>
              <td>{voter.username}</td>
              <td>{voter.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewVoters;
