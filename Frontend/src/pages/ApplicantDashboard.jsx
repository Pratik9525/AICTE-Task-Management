import { useNavigate } from "react-router-dom";
import { MdOutlineError, MdCheckCircle, MdOutlineLogout } from "react-icons/md";
import empillus from "../assets/images/transparent-women-study.png";
import hat from "../assets/images/Icon/hat-graduation.svg";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import ToolBar from "../components/ToolBar";
import { SchemeContext } from "../context/SchemeContext";

const ApplicantDashboard = () => {
  const { user, Logout } = useContext(AuthContext);
  const [applications, setApplications] = useState({
    approvedApplications: [],
    pendingApplications: [],
    revertedApplications: [],
  });
  const { schemes, setSelectedScheme } = useContext(SchemeContext);

  async function getApplications() {
    let response = await axios.get("/applications/applicant", {
      params: { userId: user._id },
    });

    if (response.data.success) {
      let approvedApplications = [],
        pendingApplications = [],
        revertedApplications = [];
      response.data.body.item.map((item) => {
        item.studentStatus == "pending" && pendingApplications.push(item);
        item.studentStatus == "approved" && approvedApplications.push(item);
        item.studentStatus == "reverted" && revertedApplications.push(item);
      });
      setApplications({
        approvedApplications,
        pendingApplications,
        revertedApplications,
      });
    }
  }

  useEffect(() => {
    setSelectedScheme();
    getApplications();
  }, []);

  let colors = ["#EE6D6D", "#61A8EA", "#7CDB8B"];

  let navigate = useNavigate();

  return (
    <>
      <h3 style={{ position: "absolute", right: "15px", color: "white" }}>
        <MdOutlineLogout
          style={{ fontSize: "20px", marginRight: "10px" }}
          onClick={() => Logout()}
        />
      </h3>
      <div className="curve">
        <div
          style={{ margin: "auto 20px", color: "white", paddingTop: "40px" }}
        >
          <p style={{ fontSize: "30px", margin: 0 }}>Welcome,</p>
          <h1 style={{ fontWeight: "600", marginTop: 0 }}>
            {user.firstName} {user.lastName}
          </h1>

          <div className="alert-btn">
            <MdOutlineError style={{ fontSize: "20px", marginRight: "10px" }} />
            Alert: Aadhar Verification Pending
          </div>
        </div>

        <div className="exp-card">
          <div
            style={{
              position: "absolute",
              left: "20px",
              top: "20px",
            }}
            onClick={() => navigate("/schemes")}
          >
            <h3 className="fw-600" style={{ color: "#58616A" }}>
              Over 100+ schemes
              <br /> are available.
              <br /> Apply now.
            </h3>

            <button className="exp-btn">Explore Now</button>
          </div>

          <div className="exp-illus">
            <img src={empillus} alt="" />
          </div>
        </div>

        <h2 style={{ marginLeft: "20px", fontSize: "20px" }}>
          Popular Schemes
        </h2>

        <div className="scrolling-wrapper">
          <div className="container">
            {schemes
              .slice(user.phoneNo % 10, 3 + (user.phoneNo % 10))
              .map((item, index) => {
                return (
                  <div
                    className="card-schemes"
                    key={index}
                    onClick={() => setSelectedScheme(item)}
                  >
                    <div
                      style={{
                        backgroundColor: `${colors[index]}`,
                        padding: "20px 0",
                        borderRadius: "12px 12px 0 0",
                      }}
                    >
                      <img src={hat} className="s-img" alt="" />
                    </div>

                    <div className="parent">
                      <div className="card-s-sub fw-600">
                        <p className="card-sub-sname">{item.schemeName}</p>

                        <div className="fw-400" style={{ fontSize: "13px" }}>
                          By Govt of India
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {applications.approvedApplications.length > 0 && (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "auto 20px",
              }}
            >
              <h2 style={{ fontSize: "20px", widht: "192px" }}>
                Approved Applications
              </h2>
              <span
                style={{ fontSize: "14px" }}
                onClick={() =>
                  navigate("/status-page", {
                    state: {
                      applicationsArray: applications.approvedApplications,
                      title: "Approved Applications",
                      caption: "",
                    },
                  })
                }
              >
                View All
              </span>
            </div>

            {applications.approvedApplications.slice(0, 3).map((item) => (
              <div className="s-success" key={item._id}>
                <MdCheckCircle fontSize="25px" color="#6ECA98" />
                <div
                  className="fw-700"
                  style={{
                    color: "#6ECA98",
                    fontSize: "14px",
                    paddingLeft: "15px",
                  }}
                >
                  {item.scheme.schemeName}
                </div>
              </div>
            ))}
          </>
        )}

        {applications.pendingApplications.length > 0 && (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "auto 20px",
              }}
            >
              <h2 style={{ fontSize: "20px", widht: "192px" }}>
                Pending Applications
              </h2>

              <span
                style={{ fontSize: "14px" }}
                onClick={() =>
                  navigate("/status-page", {
                    state: {
                      applicationsArray: applications.pendingApplications,
                      title: "Pending Applications",
                      caption: "",
                    },
                  })
                }
              >
                View All
              </span>
            </div>

            {applications.pendingApplications.slice(0, 3).map((item) => (
              <div className="s-pending" key={item._id}>
                <div>
                  <MdOutlineError color="#FFAE35" fontSize="25px" />
                </div>

                <div
                  className="fw-700"
                  style={{
                    color: "#FFAE35",
                    fontSize: "14px",
                    paddingLeft: "15px",
                  }}
                >
                  {item.scheme.schemeName}
                </div>
              </div>
            ))}
          </>
        )}

        {applications.revertedApplications.length > 0 && (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "auto 20px",
              }}
            >
              <h2 style={{ fontSize: "20px", widht: "192px" }}>
                Reverted Applications
              </h2>

              <span
                style={{ fontSize: "14px" }}
                onClick={() =>
                  navigate("/status-page", {
                    state: {
                      applicationsArray: applications.revertedApplications,
                      title: "Reverted Applications",
                      caption: "",
                    },
                  })
                }
              >
                View All
              </span>
            </div>

            {applications.revertedApplications.slice(0, 3).map((item) => (
              <div className="s-reverted" key={item._id}>
                <div>
                  <MdOutlineError color="#FF4949" fontSize="25px" />
                </div>

                <div
                  className="fw-700"
                  style={{
                    color: "#FF4949",
                    fontSize: "14px",
                    paddingLeft: "15px",
                  }}
                >
                  {item.scheme.schemeName}
                </div>
              </div>
            ))}
          </>
        )}

        <div style={{ height: "47px" }}></div>
      </div>
      <ToolBar />
    </>
  );
};

export default ApplicantDashboard;
