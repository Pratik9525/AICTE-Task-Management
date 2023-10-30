import { MdAccountCircle, MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import hat from "../assets/images/Icon/hat-graduation.svg";
import { IoHome } from "react-icons/io5";

function ToolBar() {
  let navigate = useNavigate();
  return (
    <div className="toolbar">
      <IoHome
        color="#fff"
        fontSize="22px"
        onClick={() => navigate("/applicant-dash")}
      />
      <img
        src={hat}
        alt=""
        className="tab-icon"
        onClick={() => navigate("/schemes")}
      />
      <MdAccountCircle color="#fff" fontSize="25px" />
    </div>
  );
}

export default ToolBar;
