import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

function BackBtn() {
  let navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        margin: "20px 0 20px 20px",
        width: "90px",
      }}
      onClick={() => navigate(-1)}
    >
      <MdOutlineKeyboardBackspace
        className="back-btn"
        style={{ marginRight: "10px" }}
      />

      <span style={{ paddingTop: "3px" }}>Back</span>
    </div>
  );
}

export default BackBtn;
