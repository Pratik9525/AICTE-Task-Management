import BackBtn from "../components/BackBtn";
import SchemeCard from "../components/SchemeCard";
import ToolBar from "../components/ToolBar";
import institute from "../assets/images/Icon/institute.svg";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useContext, useEffect, useReducer, useState } from "react";
import lodash from "lodash";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const DepartmentStatusMaster = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const location = useLocation();
  let { title, caption, status, applicationID } = location.state;

  const [departmentData, setdepartmentData] = useState({ items: [] });

  async function getApplications() {
    let response = await axios.get("/departments/applications", {
      params: {
        status: status,
        userRole: user.role,
      },
    });
    if (response.data.success) {
      setdepartmentData(response.data.body);
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
          {departmentData.items.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() =>
                  navigate("/admin/admin-schemes-status", {
                    state: {
                      departmentId: item._id,
                      status: status,
                      title: "Choose a scheme",
                      caption: caption,
                    },
                  })
                }
              >
                <SchemeCard
                  sname={item.departmentName}
                  stats={departmentData.counter[item._id]}
                  img={institute}
                />
              </div>
            );
          })}
        </div>
      </div>
      <ToolBar />
    </>
  );
};

export default DepartmentStatusMaster;
