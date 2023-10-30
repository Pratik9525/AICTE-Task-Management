import SchemeCard from "../components/SchemeCard";
import ToolBar from "../components/ToolBar";
import institute from "../assets/images/Icon/institute.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import BackBtn from "../components/BackBtn";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const SchemeStatusMaster = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  let { title, caption, status, departmentId } = location.state;
  const navigate = useNavigate();

  const [schemesByStatus, setSchemesByStatus] = useState({ items: [] });

  async function getSchemesByStatus() {
    let response = await axios.get("/schemes/applications", {
      params: {
        status: status,
        departmentId: departmentId,
        userRole: user.role,
      },
    });
    if (response.data.success) {
      setSchemesByStatus(response.data.body);
    }
  }

  useEffect(() => {
    getSchemesByStatus();
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
          {schemesByStatus.items.map((item, index) => (
            <div
              key={index}
              onClick={() =>
                navigate("/admin/admin-applicants-status", {
                  state: {
                    status: status,
                    schemeID: item._id,
                    caption: item.schemeName,
                    title: "Choose an applicant for ",
                  },
                })
              }
            >
              <SchemeCard
                sname={item.schemeName}
                stype={item.type}
                // text={"Stakeholder " + item.stakeholder}
                stats={schemesByStatus.counter[item._id]}
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

export default SchemeStatusMaster;
