import BackBtn from "./BackBtn";
import SchemeCard from "./SchemeCard";
import ToolBar from "./ToolBar";
import institute from "../assets/images/Icon/institute.svg";

const RevertedApplications = () => {
  return (
    <>
      <BackBtn />
      <div style={{ margin: "auto 20px" }}>
        <h2 style={{ marginBottom: "5px" }}>Reverted Applications</h2>
        <span className="fw-500" style={{ fontSize: "16px", color: "#aaaaaa" }}>
          Choose a Scheme
        </span>
        <div style={{ marginTop: "20px" }}>
          <SchemeCard sname=" Mayank" stype="Scholarship" img={institute} />
        </div>
        <ToolBar />
      </div>
    </>
  );
};

export default RevertedApplications;
