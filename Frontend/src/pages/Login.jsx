// import { IonContent, IonPage } from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import BackBtn from "../components/BackBtn";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/aicte_logo_new.png";

const Login = () => {
  const { Login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({ username: "", password: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    Login(inputs.username, inputs.password);
  }

  useEffect(() => {
    if (user) {
      if (user.role == "applicant") {
        navigate("/applicant-dash");
      } else if (user.role == "admin" || user.role == "departmentAdmin") {
        navigate("/admin");
      }
    }
  }, []);

  const [isKeyboardOpen, setIsKeyboardOpen] = useState();

  const listener = () => {
    const MIN_KEYBOARD_HEIGHT = 250; // N.B.! this might not always be correct

    const isMobile = window.innerWidth < 768;
    const isKeyboardOpen =
      isMobile &&
      window.screen.height - MIN_KEYBOARD_HEIGHT > window.visualViewport.height;

    setIsKeyboardOpen(isKeyboardOpen);
  };

  window.visualViewport.addEventListener("resize", listener);

  return (
    <>
      {/* <BackBtn /> */}
      <div className="page-center full-page">
        <form onSubmit={handleSubmit} style={{ margin: "auto 20px" }}>
          <img
            src={logo}
            alt=""
            style={{ marginBottom: "20px", width: "100%" }}
          />
          <h1
            style={{ textAlign: "center", marginTop: "0px", fontSize: "30px" }}
          >
            Login to your Account
          </h1>
          <input
            type="email"
            placeholder="Email"
            className="field"
            autoComplete="on"
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="field"
            autoComplete="on"
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />

          {/* <div style={{ display: "flex", alignItems: "center" }}>
            <input type="checkbox" />
            <span style={{ marginLeft: "5px", fontSize: "15px" }}>
              Remember Me
            </span>
          </div> */}

          <button type="submit" className="submit-btns ripple">
            Sign In
          </button>
          {/* <div style={{ textAlign: "center", marginTop: "20px" }}>
            <a
              href="#"
              className="fw-600"
              style={{
                fontSize: "14px",

                textDecoration: "none",
                color: "inherit",
              }}
            >
              Forget Password?
            </a>
          </div> */}
        </form>

        <div
          style={{
            position: "absolute",
            bottom: "20px",
            textAlign: "center",
            // zIndex: "-99999999",
            // width: "100%",
            // left: "0px",
            // bottom: "0px",
            // margin: "auto",
            // overflow: "hidden",
          }}
        >
          <div
            style={{
              display: isKeyboardOpen ? "none" : "block",
            }}
          >
            <div className="fw-500">Do not have an account?</div>

            <div>
              <Link
                to="/register"
                className="fw-500"
                style={{ fontSize: "14px", color: "inherit" }}
              >
                Register Here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
