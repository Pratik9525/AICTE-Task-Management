import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import success from "../assets/images/success.gif";
import { AuthContext } from "../context/AuthContext";

export default function Modal() {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              navigate(user.role == "applicant" ? "/applicant-dash" : "/admin");
            }}
          >
            X
          </button>
        </div>
        <img src={success} alt="this slowpoke moves" width="150" />
        <div className="body">
          <p style={{ marginTop: "0" }}>Thank you so much for applying!</p>
        </div>
        <button
          className="goto-btn ripple"
          onClick={() => {
            navigate(user.role == "applicant" ? "/applicant-dash" : "/admin");
          }}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
