import logo from "../assets/images/aicte_logo_new.png";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ToastContext } from "../context/ToastContext";
import { Link } from "react-router-dom";

const Register = () => {
  const { registrationInput, setRegistrationInput, validate } =
    useContext(AuthContext);
  const { setToast } = useContext(ToastContext);

  function handleSubmit(e) {
    e.preventDefault();

    // validate();

    // registrationInput.password.length >= 6
    //   ? registrationInput.password.toLowerCase() !== registrationInput.password
    //     ? registrationInput.password.toUpperCase() !==
    //       registrationInput.password
    //       ? registrationInput.password == registrationInput.confirmPassword
    //         ? validate(registrationInput.username)
    //         : setToast({
    //             message: "Password doesn't match with confirm password field",
    //             open: true,
    //           })
    //       : setToast({
    //           message: "Password should contain atleast one lower character!",
    //           open: true,
    //         })
    //     : setToast({
    //         message: "Password should contain atleast one uppercase character!",
    //         open: true,
    //       })
    //   : setToast({
    //       message: "Password should be of atleast 6 characters long",
    //       open: true,
    //     });

    registrationInput.password == registrationInput.confirmPassword
      ? validate()
      : setToast({
          message: "Password doesn't match with confirm password field",
          open: true,
        });
  }

  const [isKeyboardOpen, setIsKeyboardOpen] = useState();

  const listener = () => {
    const MIN_KEYBOARD_HEIGHT = 300; // N.B.! this might not always be correct

    const isMobile = window.innerWidth < 768;
    const isKeyboardOpen =
      isMobile &&
      window.screen.height - MIN_KEYBOARD_HEIGHT > window.visualViewport.height;

    setIsKeyboardOpen(isKeyboardOpen);
  };

  window.visualViewport.addEventListener("resize", listener);

  return (
    // <IonPage>
    //   <IonContent>
    <>
      {/* <BackBtn /> */}

      <div className="page-center" style={{ height: "100vh" }}>
        <form onSubmit={handleSubmit} style={{ margin: "auto 20px" }}>
          <img
            src={logo}
            alt=""
            style={{ marginBottom: "20px", width: "100%" }}
          />
          <h1
            style={{ textAlign: "center", marginTop: "0px", fontSize: "30px" }}
          >
            Register your Account
          </h1>
          <input
            type="email"
            placeholder="Email"
            className="field"
            value={registrationInput.username}
            onChange={(e) =>
              setRegistrationInput({
                ...registrationInput,
                username: e.target.value,
              })
            }
            name="email"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="field"
            value={registrationInput.password}
            onChange={(e) =>
              setRegistrationInput({
                ...registrationInput,
                password: e.target.value,
              })
            }
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="field"
            value={registrationInput.confirmPassword}
            onChange={(e) =>
              setRegistrationInput({
                ...registrationInput,
                confirmPassword: e.target.value,
              })
            }
            required
          />

          <button className="submit-btns ripple">Register</button>
        </form>

        {/* <div className="or">
            <hr className="div-or" />
            <span>or</span>
            <hr className="div-or" />
          </div>

          <div className="btns">
            <img src={google} alt="" style={{ marginRight: "10px" }} />
            Sign in with Google
          </div> */}

        <div
          style={{
            position: "fixed",
            bottom: "20px",
            textAlign: "center",
            display: isKeyboardOpen ? "none" : "block",
          }}
        >
          <div className="fw-500">Already have an account?</div>
          <Link
            to="/login"
            className="fw-500"
            style={{ fontSize: "14px", color: "inherit" }}
          >
            Login Here
          </Link>
        </div>
      </div>
    </>
    //   </IonContent>
    // </IonPage>
  );
};

export default Register;
