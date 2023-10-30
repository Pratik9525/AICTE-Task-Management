import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import BackBtn from "../components/BackBtn";
import { SchemeContext } from "../context/SchemeContext";

export default function SchemePreview() {
  const { selectedScheme } = useContext(SchemeContext);
  let navigate = useNavigate();

  return (
    <>
      <BackBtn />
      <div style={{ margin: "auto 20px" }}>
        <h4 style={{ marginBottom: "10px", fontSize: "16px" }}>
          {selectedScheme.schemeName}
        </h4>
        <p
          style={{
            marginTop: 0,
            fontSize: "14px",
            textTransform: "capitalize",
          }}
        >
          {selectedScheme.type} |{" "}
          {"Deadline: " +
            new Date(selectedScheme.deadline).toLocaleDateString()}
        </p>
        <h4 style={{ marginBottom: "10px", fontSize: "16px" }}>DEPARTMENT</h4>
        <p style={{ marginTop: 0, fontSize: "14px" }}>
          {selectedScheme.department.departmentName}
        </p>
        <h4 style={{ marginBottom: "10px", fontSize: "16px" }}>DESCRIPTION</h4>
        <p style={{ marginTop: 0, fontSize: "14px" }}>
          {selectedScheme.description}
        </p>
        <h4 style={{ marginBottom: "10px", fontSize: "16px" }}>ELIGIBILITY</h4>
        <p style={{ marginTop: 0, fontSize: "14px" }}>
          {selectedScheme.eligibility}
        </p>
        <button
          type="submit"
          className="submit-btns ripple"
          onClick={() => navigate("/applyscheme")}
        >
          Apply Now
        </button>
        <div style={{ height: "20px" }}></div>
      </div>
    </>
  );
}
