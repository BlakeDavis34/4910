import React, { useState } from "react";

const Referral = () => {
  const [referralCode, setReferralCode] = useState("");

  const handleInputChange = (event) => {
    setReferralCode(event.target.value);
  };

  const handleReferralSubmit = (event) => {
    event.preventDefault();
    // Send the referral code to your backend API
  };

  return (
    <form onSubmit={handleReferralSubmit}>
      <label htmlFor="referralCode">Referral Code:</label>
      <input type="text" id="referralCode" value={referralCode} onChange={handleInputChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Referral;