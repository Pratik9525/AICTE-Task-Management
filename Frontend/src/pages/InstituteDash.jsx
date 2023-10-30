import { useNavigate } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import ToolBar from "../components/ToolBar";
import SchemeCard from "../components/SchemeCard";
import institute from "../assets/images/Icon/institute.svg";

const InstituteDash = () => {
  let navigate = useNavigate();

  const { Logout } = useContext(AuthContext);

  const [applications, setApplications] = useState([]);

  async function getApplications() {
    let res = await axios.get("/institutions/applications", {
      params: {
        status: "pending",
      },
    });
    if (res.data.success) {
      setApplications(res.data.body.items);
    }
  }

  useEffect(() => {
    getApplications();
  }, []);

  return (
    <>
      <h3 style={{ position: "absolute", right: "15px", color: "white" }}>
        <MdOutlineLogout
          style={{ fontSize: "20px", marginRight: "10px" }}
          onClick={() => Logout()}
        />
      </h3>
      <div className="curve-i">
        <div
          style={{ margin: "auto 20px", color: "white", paddingTop: "40px" }}
        >
          <p style={{ fontSize: "30px", margin: 0 }}>Welcome,</p>
          <h1 style={{ fontWeight: "600", marginTop: 0, marginBottom: "10px" }}>
            Institute Admin
          </h1>
          <div className="clg-name-card">
            <h3
              className="fw-600"
              style={{ color: "#58616A", margin: 0, fontSize: "12px" }}
            >
              Indian Institute of Technology (BHU) Varanasi
            </h3>
          </div>
        </div>
      </div>

      <div style={{ margin: "auto 20px" }}>
        <h2>Pending Applications</h2>

        {applications.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                navigate("/admin/institute-form-preview", {
                  state: {
                    userId: item.applicant._id,
                    applicantData: item.applicant,
                    scheme: item.scheme,
                    applicationId: item._id,
                  },
                });
              }}
            >
              <SchemeCard
                key={index}
                sname={item.applicant.firstName + " " + item.applicant.lastName}
                stype={item.applicant.applicantType}
                text={item.applicant.yearOfStudy}
                img={institute}
              />
            </div>
          );
        })}
      </div>

      <div style={{ height: "60px" }}></div>

      <ToolBar />
    </>
  );
};

export default InstituteDash;
