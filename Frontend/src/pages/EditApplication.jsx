import { IonButton, IonContent, IonModal, IonPage } from "@ionic/react";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackBtn from "../components/BackBtn";
import { AuthContext } from "../context/AuthContext";
import { SchemeContext } from "../context/SchemeContext";
import Modal from "../components/Modal";
import "../styles/styles.css";
import lodash from "lodash";

const EditApplication = () => {
  const { selectedScheme, setSelectedScheme } = useContext(SchemeContext);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [newValues, setNewValues] = useState(user);

  async function handleFile(name, file) {
    let form = new FormData();
    form.append(name, file);
    form.append("applicantId", user._id);
    form.append("schemeId", selectedScheme._id);
    return form;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let res = await axios.post("applications/reapply", {
      newValues,
    });

    if (response.data.success) {
      navigate("/applicant-dash");
    }
  }

  return (
    <>
      <div>
        <BackBtn />

        <div style={{ margin: "auto 20px 20px" }}>
          <h2>Edit Application Form</h2>

          <form onSubmit={handleSubmit}>
            <select
              className="field"
              value={newValues.applicantType}
              onChange={(e) => {
                setNewValues({ ...newValues, applicantType: e.target.value });
              }}
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
              minLength="2"
              value={newValues.firstName}
              onChange={(e) => {
                setNewValues({ ...newValues, firstName: e.target.value });
              }}
            />
            <input
              type="type"
              placeholder="Last Name"
              className="field"
              required
              minLength="2"
              value={newValues.lastName}
              onChange={(e) => {
                setNewValues({ ...newValues, lastName: e.target.value });
              }}
            />

            <input
              type="tel"
              name="telphone"
              placeholder="8888888888"
              maxLength="10"
              title="Ten digits number"
              className="field"
              required
              value={newValues.phoneNo}
              onChange={(e) => {
                setNewValues({ ...newValues, phoneNo: e.target.value });
              }}
            />

            <select
              className="field"
              required
              value={newValues.gender}
              onChange={(e) => {
                setNewValues({ ...newValues, gender: e.target.value });
              }}
            >
              <option value="default" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <input
              name="institueName"
              placeholder="Institute Name"
              className="field"
              required
              value={newValues.instituteName}
              onChange={(e) => {
                setNewValues({ ...newValues, instituteName: e.target.value });
              }}
            />

            <select
              className="field"
              required
              value={newValues.yearOfStudy}
              onChange={(e) => {
                setNewValues({ ...newValues, yearOfStudy: e.target.value });
              }}
            >
              <option value="default" disabled>
                Select Year Of Study
              </option>
              <option value="I">I</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
              <option value="V">V</option>
              <option value="VI">VI</option>
            </select>

            <input
              name="yearOfPassout"
              type="num"
              placeholder="Year of Passout"
              className="field"
              maxLength="4"
              required
              value={newValues.yearOfPassout}
              onChange={(e) => {
                setNewValues({ ...newValues, yearOfPassout: e.target.value });
              }}
            />

            <label htmlFor="marksheet">Upload 10th Marksheet</label>

            <input
              type="file"
              id="marksheet"
              name="marksheet"
              style={{ width: "100%", marginTop: "10px" }}
              required
              accept="application/pdf"
            />

            <button type="submit" className="submit-btns ripple">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditApplication;
