export default function SchemeCard(props) {
  return (
    <div
      className="schemecard ripple"
      style={{ justifyContent: "space-between" }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={props.img} alt="" style={{ width: "50px" }} />
        <div style={{ fontSize: "14px", padding: "0 20px" }}>
          {props.sname}
          <div
            style={{
              color: "gray",
              fontSize: "12px",
              textTransform: "capitalize",
            }}
          >
            {props.stype} {props.text && "| " + props.text}
          </div>
        </div>
      </div>

      <div className="fw-700">{props.stats && <div>{props.stats}</div>}</div>
    </div>
  );
}
