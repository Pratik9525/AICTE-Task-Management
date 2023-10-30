import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackBtn from "../components/BackBtn";
import { AuthContext } from "../context/AuthContext";
import { SchemeContext } from "../context/SchemeContext";
import "../styles/styles.css";
import lodash from "lodash";

const ApplyScheme = () => {
  const { selectedScheme, setSelectedScheme } = useContext(SchemeContext);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  let additionalDetails =
    user.applicantType == "student"
      ? {
          instituteName: "",
          yearOfPassout: "",
          yearOfStudy: "default",
        }
      : {
          instituteName: "",
          departmentName: "",
          yearsOfExperience: "",
          designation: "",
        };

  const [additionalInput, setAdditionalInput] = useState(additionalDetails);

  async function handleFile(name, file) {
    let form = new FormData();
    form.append(name, file);
    form.append("applicantId", user._id);
    form.append("schemeId", selectedScheme._id);
    return form;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let form = await handleFile("marksheet", e.target.marksheet.files[0]);

    let res = await axios.post("/upload", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (user.instituteName == undefined) {
      localStorage.setItem(
        "auth",
        JSON.stringify({
          auth: true,
          user: lodash.merge(user, additionalInput),
        })
      );
    }

    let response = await axios.post("/applications", {
      additionalInput: additionalInput,
      applicantId: user._id,
      schemeId: selectedScheme._id,
    });

    if (response.data.success) {
      navigate("/thankyou");
    }
  }

  return (
    <>
      {selectedScheme && (
        <div>
          <BackBtn />

          <div style={{ margin: "auto 20px 20px" }}>
            <h2>Scheme Application Form</h2>

            <form onSubmit={handleSubmit}>
              <select className="field" value={user.applicantType} disabled>
                <option value="default">I'm a...</option>
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
              </select>

              <input
                type="type"
                placeholder="First Name"
                className="field"
                required
                minLength="2"
                value={user.firstName}
                disabled
              />
              <input
                type="type"
                placeholder="Last Name"
                className="field"
                required
                minLength="2"
                value={user.lastName}
                disabled
              />

              <input
                type="tel"
                name="telphone"
                placeholder="8888888888"
                maxLength="10"
                title="Ten digits number"
                className="field"
                required
                value={user.phoneNo}
                disabled
              />

              <select className="field" required value={user.gender} disabled>
                <option value="default" disabled>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              {user.applicantType == "student" ? (
                <>
                  <input
                    name="institueName"
                    placeholder="Institute Name"
                    className="field"
                    required
                    value={user.instituteName || additionalInput.instituteName}
                    disabled={user.instituteName != undefined}
                    onChange={(e) =>
                      setAdditionalInput({
                        ...additionalInput,
                        instituteName: e.target.value,
                      })
                    }
                  />

                  <select
                    className="field"
                    required
                    value={user.yearOfStudy || additionalInput.yearOfStudy}
                    onChange={(e) =>
                      setAdditionalInput({
                        ...additionalInput,
                        yearOfStudy: e.target.value,
                      })
                    }
                    disabled={user.yearOfStudy != undefined}
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
                    value={user.yearOfPassout || additionalInput.yearOfPassout}
                    onChange={(e) =>
                      setAdditionalInput({
                        ...additionalInput,
                        yearOfPassout: e.target.value,
                      })
                    }
                    disabled={user.yearOfStudy != undefined}
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
                </>
              ) : (
                <>
                  <input
                    name="institueName"
                    placeholder="Institute Name"
                    className="field"
                    required
                    value={user.instituteName || additionalInput.instituteName}
                    disabled={user.instituteName != undefined}
                    onChange={(e) =>
                      setAdditionalInput({
                        ...additionalInput,
                        instituteName: e.target.value,
                      })
                    }
                  />

                  <input
                    name="departmentName"
                    type="text"
                    placeholder="Name of Department"
                    className="field"
                    required
                    value={
                      user.departmentName || additionalInput.departmentName
                    }
                    onChange={(e) =>
                      setAdditionalInput({
                        ...additionalInput,
                        departmentName: e.target.value,
                      })
                    }
                    disabled={user.departmentName != undefined}
                  />

                  <input
                    name="yearsOfExperience"
                    type="number"
                    placeholder="Year of Experience"
                    className="field"
                    required
                    value={
                      user.yearsOfExperience ||
                      additionalInput.yearsOfExperience
                    }
                    onChange={(e) =>
                      setAdditionalInput({
                        ...additionalInput,
                        yearsOfExperience: e.target.value,
                      })
                    }
                    disabled={user.yearsOfExperience != undefined}
                  />

                  <input
                    name="designation"
                    type="text"
                    placeholder="Designation"
                    className="field"
                    required
                    value={user.designation || additionalInput.designation}
                    onChange={(e) =>
                      setAdditionalInput({
                        ...additionalInput,
                        designation: e.target.value,
                      })
                    }
                    disabled={user.designation != undefined}
                  />
                </>
              )}

              <button type="submit" className="submit-btns ripple">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplyScheme;
