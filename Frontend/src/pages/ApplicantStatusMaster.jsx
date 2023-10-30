import BackBtn from "../components/BackBtn";
import SchemeCard from "../components/SchemeCard";
import ToolBar from "../components/ToolBar";
import institute from "../assets/images/Icon/institute.svg";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const ApplicantStatusMaster = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const location = useLocation();
  let { title, caption, status, schemeID, applicationID } = location.state;

  const [applicationData, setApplicationData] = useState([]);

  async function getApplications() {
    let response = await axios.get("/applications/scheme", {
      params: {
        schemeId: schemeID,
        status: status,
        userRole: user.role,
      },
    });
    if (response.data.success) {
      setApplicationData(response.data.body.item);
    }
  }

  useEffect(() => {
    getApplications();
  }, []);

  return (
    <>
      <BackBtn />
      <div style={{ margin: "auto 20px 60px" }}>
        <h2 style={{ marginBottom: "5px" }}>{title}</h2>
        <span className="fw-500" style={{ fontSize: "16px", color: "#aaaaaa" }}>
          {caption}
        </span>
        <div style={{ marginTop: "20px" }}>
          {applicationData.map((item, index) => (
            <div
              key={index}
              onClick={() =>
                navigate("/admin/application-form-preview", {
                  state: {
                    applicationID: item._id,
                    applicantData: item.applicant,
                    status: status,
                  },
                })
              }
            >
              <SchemeCard
                sname={item.applicant.firstName + " " + item.applicant.lastName}
                stype={item.applicant.applicantType}
                text={item.applicant.instituteName}
                img={institute}
              />
            </div>
          ))}
        </div>
      </div>
      <ToolBar />
    </>
  );
};

export default ApplicantStatusMaster;
