import React, { useState } from "react";
import "../assets/css/details.css"; 
import pic8 from "../assets/images/pic8.png";
import pic9 from "../assets/images/pic9.jpeg";

const PersonalDetailsForm = () => {
    const [formData, setFormData] = useState({
        aadhaarNumber: "",
        fullName: "",
        dob: "",
        gender: "",
        address: "",
        pincode: "",
        state: "",
        country: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "aadhaarNumber" && value.length > 12) {
            setError("Aadhaar number must be 12 digits only.");
        } else {
            setError("");
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.aadhaarNumber.length !== 12) {
            setError("Aadhaar number must be exactly 12 digits.");
            return;
        }
        console.log("Form Submitted:", formData);
    };

    return (
        <div className="personal-page">
        <div className="personal-details-container">
            <h2>Personal Details Form</h2>
            <form onSubmit={handleSubmit}>
                

                <div className="input-container">
                    <label>Full Name:</label>
                    <input type="text" name="fullName" onChange={handleChange} required />
                </div>

                <div className="input-container">
                    <label>Date of Birth:</label>
                    <input type="date" name="dob" onChange={handleChange} required />
                </div>

                <div className="input-container">
                    <label>Gender:</label>
                    <select name="gender" onChange={handleChange} required>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="input-container">
                    <label>Aadhaar Number:</label>
                    <input 
                        type="text" 
                        name="aadhaarNumber" 
                        maxLength="12"
                        onChange={handleChange} 
                        required 
                    />
                    {error && <p className="error-message">{error}</p>}
                </div>

                <div className="input-container">
                    <label>Address:</label>
                    <input type="text" name="address" style={{height:"60px"}}onChange={handleChange} required />
                </div>

                <div className="input-container">
                    <label>Pin Code:</label>
                    <input type="text" name="pincode" onChange={handleChange} required />
                </div>

                <div className="input-container">
                    <label>State:</label>
                    <input type="text" name="state"  value="Andhra Pradesh" readOnly />
                </div>

                <div className="input-container">
                    <label>Country:</label>
                    <input type="text" name="country" value="India" readOnly  />
                </div>

                {/* Fingerprint and Iris Scan Buttons with Images */}
                <div className="biometric-section">
                    <div className="biometric-item">
                        <img src={pic8} alt="FingerPrint-Scan" style={{width: "230px",height: "100px",borderRadius: "10px",objectFit: "cover",boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",transition: "transform 0.3s ease-in-out",}}/>
                        <button type="button" className="biometric-btn">Capture Fingerprint</button>
                    </div>

                    <div className="biometric-item">
                        <img src={pic9} alt="Iris-Scan" style={{width: "230px",height: "100px",borderRadius: "10px",objectFit: "cover",boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",transition: "transform 0.3s ease-in-out",}}/>
                        <button type="button" className="biometric-btn">Capture Iris Scan</button>
                    </div>
                </div>
                

                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
        </div>
    );
};

export default PersonalDetailsForm;
