import axios from "axios";
import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackBtn from "../components/BackBtn";
import { AuthContext } from "../context/AuthContext";
import { ServerContext } from "../context/ServerContext";
import { ToastContext } from "../context/ToastContext";
import "../styles/styles.css";
import { Browser } from "@capacitor/browser";

const ApplicationPreviewPage = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setToast } = useContext(ToastContext);

  const { server } = useContext(ServerContext);

  let { applicantData, applicationID, status, userId } = location.state;

  async function handleSubmit(btnstatus) {
    let response = await axios.post("/applications/action", {
      applicationId: applicationID,
      action: btnstatus,
      adminRole: user.role,
    });
    if (response.data.success) {
      setToast({
        message: "Application status has been updated",
        open: true,
      });
      navigate("/admin");
    }
  }

  async function getPdfPath() {
    let res = await axios.get("/view", {
      useParams: {
        userId: userId,
      },
    });
  }

  useEffect(() => {
    getPdfPath();
  }, []);

  return (
    <>
      <BackBtn />
      <div style={{ margin: "auto 20px" }}>
        <h2>Application Form Preview</h2>

        <form>
          <div className="preview-input-grid">
            <input
              type="text"
              className="field input-grid-item-l"
              placeholder="Applicant Type"
              disabled
            />

            <input
              type="type"
              placeholder="Applicant Type"
              className="field input-grid-item-r"
              required
              value={applicantData.applicantType}
              disabled
            />
          </div>

          <div className="preview-input-grid">
            <input
              type="text"
              className="field input-grid-item-l"
              placeholder="First Name"
              disabled
            />

            <input
              type="type"
              placeholder="First Name"
              className="field input-grid-item-r"
              required
              value={applicantData.firstName}
              disabled
            />
          </div>

          <div className="preview-input-grid">
            <input
              type="text"
              className="field input-grid-item-l"
              placeholder="Last Name"
              disabled
            />

            <input
              type="type"
              placeholder="Last Name"
              className="field input-grid-item-r"
              required
              value={applicantData.lastName}
              disabled
            />
          </div>

          <div className="preview-input-grid">
            <input
              type="text"
              className="field input-grid-item-l"
              placeholder="Phone Number"
              disabled
            />

            <input
              type="tel"
              name="telphone"
              placeholder="8888888888"
              maxLength="10"
              title="Ten digits number"
              className="field input-grid-item-r"
              required
              value={applicantData.phoneNo}
              disabled
            />
          </div>

          <div className="preview-input-grid">
            <input
              type="text"
              className="field input-grid-item-l"
              placeholder="Gender"
              disabled
            />

            <input
              type="text"
              className="field input-grid-item-r"
              placeholder="Gender"
              value={applicantData.gender}
              disabled
            />
          </div>

          {applicantData.applicantType == "student" ? (
            <>
              <div className="preview-input-grid">
                <input
                  type="text"
                  className="field input-grid-item-l"
                  name="institueName"
                  placeholder="Institute Name"
                  disabled
                />

                <input
                  type="text"
                  className="field input-grid-item-r"
                  name="institueName"
                  placeholder="Institute Name"
                  value={applicantData.instituteName}
                  disabled
                />
              </div>

              <div className="preview-input-grid">
                <input
                  type="text"
                  placeholder="Year of Study"
                  className="field input-grid-item-l"
                  name="yearOfStudy"
                  disabled
                />

                <input
                  type="text"
                  className="field input-grid-item-r"
                  placeholder="Year of Study"
                  value={applicantData.yearOfStudy}
                  disabled
                />
              </div>

              <div className="preview-input-grid">
                <input
                  name="yearOfPassout"
                  type="text"
                  placeholder="Year of Passout"
                  className="field input-grid-item-l"
                  disabled
                />

                <input
                  name="yearOfPassout"
                  type="text"
                  placeholder="Year of Passout"
                  className="field input-grid-item-r"
                  value={applicantData.yearOfPassout}
                  disabled
                />
              </div>
            </>
          ) : (
            <>
              <div className="preview-input-grid">
                <input
                  type="text"
                  className="field input-grid-item-l"
                  name="institueName"
                  placeholder="Institute Name"
                  disabled
                />

                <input
                  type="text"
                  className="field input-grid-item-r"
                  name="institueName"
                  placeholder="Institute Name"
                  value={applicantData.instituteName}
                  disabled
                />
              </div>

              <div className="preview-input-grid">
                <input
                  type="text"
                  className="field input-grid-item-l"
                  placeholder="Name of Department"
                  disabled
                />

                <input
                  type="text"
                  placeholder="Name of Department"
                  className="field input-grid-item-r"
                  name="departmentName"
                  value={applicantData.departmentName}
                  disabled
                />
              </div>

              <div className="preview-input-grid">
                <input
                  type="number"
                  className="field input-grid-item-l"
                  placeholder="Years of Experience"
                  disabled
                />

                <input
                  type="number"
                  placeholder="Years of Experience"
                  className="field input-grid-item-r"
                  name="yearsOfExperience"
                  value={applicantData.yearsOfExperience}
                  disabled
                />
              </div>

              <div className="preview-input-grid">
                <input
                  type="text"
                  className="field input-grid-item-l"
                  placeholder="Designation"
                  disabled
                />

                <input
                  type="text"
                  placeholder="Designation"
                  className="field input-grid-item-r"
                  name="designation"
                  value={applicantData.designation}
                  disabled
                />
              </div>
            </>
          )}

          {status == "pending" && (
            <>
              <span
                className="fw-500"
                style={{ color: "gray", fontSize: "15px", paddingLeft: "1px" }}
              >
                Remarks(optional)
              </span>
              <textarea name="txtDescEd"></textarea>

              <div
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="field"
                onClick={async () => {
                  await Browser.open({
                    url: `${server}/view?userId=${userId}`,
                  });
                }}
              >
                Download Pdf
              </div>

              <div className="grid-btn">
                <div
                  className="item1a revert-btn ripple"
                  onClick={() => handleSubmit("reverted")}
                >
                  Revert
                </div>
                <div
                  className="item1b approve-btn  ripple"
                  onClick={() => handleSubmit("approved")}
                >
                  Approve
                </div>
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default ApplicationPreviewPage;
