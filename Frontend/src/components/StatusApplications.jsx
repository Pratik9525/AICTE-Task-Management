import BackBtn from "./BackBtn";
import SchemeCard from "./SchemeCard";
import ToolBar from "./ToolBar";
import institute from "../assets/images/Icon/institute.svg";
import { useLocation, useNavigate } from "react-router-dom";

const StatusApplications = () => {
  const location = useLocation();
  let title = location.state.title;
  let caption = location.state.caption;
  let applications = location.state.applicationsArray;

  const navigate = useNavigate();
  return (
    <>
      <BackBtn />
      <div style={{ margin: "auto 20px 60px" }}>
        <h2 style={{ marginBottom: "5px" }}>{title}</h2>
        <span className="fw-500" style={{ fontSize: "16px", color: "#aaaaaa" }}>
          {caption}
        </span>
        <div style={{ marginTop: "20px" }}>
          {applications.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                navigate("/edit-application");
              }}
            >
              <SchemeCard
                key={index}
                sname={item.scheme.schemeName}
                stype={item.scheme.type}
                text={
                  "Applied On : " +
                  new Date(item.createdAt).toLocaleDateString()
                }
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

export default StatusApplications;
