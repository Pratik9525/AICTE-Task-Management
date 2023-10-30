import BackBtn from "../components/BackBtn";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const ApplicantRegForm = () => {
  const { register, registrationInput, setRegistrationInput } =
    useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();
    register();
  }

  return (
    <>
      <BackBtn />

      <form
        onSubmit={handleSubmit}
        className="page-center"
        style={{ margin: "auto 20px" }}
      >
        <h2>Applicant Registration Form</h2>
        <select
          className="field"
          required
          value={registrationInput.applicantType}
          onChange={(e) =>
            setRegistrationInput({
              ...registrationInput,
              applicantType: e.target.value,
            })
          }
        >
          <option value="default" disabled>
            I'm a...
          </option>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>

        <input
          type="type"
          placeholder="First Name"
          className="field"
          required
          value={registrationInput.firstName}
          onChange={(e) => {
            setRegistrationInput({
              ...registrationInput,
              firstName: e.target.value,
            });
          }}
          minLength="2"
        />
        <input
          type="type"
          placeholder="Last Name"
          className="field"
          required
          minLength="2"
          value={registrationInput.lastName}
          onChange={(e) => {
            setRegistrationInput({
              ...registrationInput,
              lastName: e.target.value,
            });
          }}
        />

        <div style={{ display: "flex", width: "100%" }}>
          <input
            style={{
              width: "50px",
              borderTopRightRadius: "0px",
              borderBottomRightRadius: "0px",
            }}
            type="text"
            defaultValue="+91"
            className="field country-code"
            disabled
          />
          <input
            type="number"
            name="telphone"
            placeholder="8888888888"
            maxLength="10"
            title="Ten digits number"
            className="field"
            required
            style={{
              borderTopLeftRadius: "0px",
              borderBottomLeftRadius: "0px",
            }}
            value={registrationInput.phoneNo}
            onChange={(e) => {
              if (e.target.value.length > 10) {
                return;
              }
              setRegistrationInput({
                ...registrationInput,
                phoneNo: e.target.value,
              });
            }}
          />
        </div>

        <select
          className="field"
          required
          value={registrationInput.gender}
          onChange={(e) => {
            setRegistrationInput({
              ...registrationInput,
              gender: e.target.value,
            });
          }}
        >
          <option value="default" disabled>
            Select Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <button
          type="submit"
          className="submit-btns ripple"
          onSubmit={handleSubmit}
        >
          Proceed
        </button>
      </form>
    </>
  );
};

export default ApplicantRegForm;
