import { IonButton } from "@ionic/react";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackBtn from "../components/BackBtn";
import { AuthContext } from "../context/AuthContext";
import { ServerContext } from "../context/ServerContext";
import { ToastContext } from "../context/ToastContext";
import "../styles/styles.css";
import { Browser } from "@capacitor/browser";

const InstitueFormPreview = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setToast } = useContext(ToastContext);

  const { server } = useContext(ServerContext);

  let { userId, applicantData, scheme, applicationId } = location.state;

  async function handleSubmit(btnstatus) {
    let response = await axios.post("/action", {
      applicantId: applicantData._id,
      action: btnstatus,
      scheme: scheme,
      applicationId: applicationId,
    });
    if (response.data.success) {
      setToast({
        message: "Application status has been updated",
        open: true,
      });
      navigate("/institute-dash");
    }
  }

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
              style={{ textTransform: "capitalize" }}
            />
          </div>

          <div className="preview-input-grid">
            <input
              type="text"
              className="field input-grid-item-l"
              placeholder="Email"
              disabled
            />

            <input
              type="text"
              className="field input-grid-item-r"
              placeholder="Email"
              value={applicantData.username}
              disabled
            />
          </div>

          <div className="preview-input-grid">
            <input
              type="text"
              className="field input-grid-item-l"
              placeholder="Year of study"
              disabled
            />

            <input
              type="text"
              className="field input-grid-item-r"
              placeholder="Year of study"
              value={applicantData.yearOfStudy}
              disabled
            />
          </div>

          <div className="preview-input-grid">
            <input
              type="text"
              className="field input-grid-item-l"
              placeholder="Year of passout"
              disabled
            />

            <input
              type="text"
              className="field input-grid-item-r"
              placeholder="Year of passout"
              value={applicantData.yearOfPassout}
              disabled
            />
          </div>

          <h4 style={{ marginBottom: "0" }}>10th Marksheet</h4>
          {/* <iframe
            src={`${server}/view?userId=${userId}#toolbar=0`}
            type=""
            style={{ width: "100%", height: "480px", marginBottom: "20px" }}
          /> */}
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
          <br />
          <br />

          <span
            className="fw-500"
            style={{
              color: "gray",
              fontSize: "15px",
              paddingLeft: "1px",
            }}
          >
            Remarks(optional)
          </span>
          <textarea name="txtDescEd"></textarea>

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
        </form>
      </div>
    </>
  );
};

export default InstitueFormPreview;
