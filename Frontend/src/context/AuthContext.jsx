import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContext } from "../context/ToastContext";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState();
  const [user, setUser] = useState({});
  const [registrationInput, setRegistrationInput] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    applicantType: "default",
    phoneNo: "",
    gender: "default",
    firstName: "",
    lastName: "",
  });
  let navigate = useNavigate();
  const { setToast } = useContext(ToastContext);

  useEffect(() => {
    let localStorageAuth = JSON.parse(localStorage.getItem("auth"));
    if (localStorageAuth) {
      setAuth(localStorageAuth.auth);
      setUser(localStorageAuth.user);
    } else {
      setAuth(false);
      setUser({});
    }
  }, [auth]);

  function Logout() {
    setAuth(false);
    setUser();
    localStorage.removeItem("auth");
    navigate("/login");
  }

  function Login(username, password) {
    axios
      .post("/authenticate/login", {
        username: username,
        password: password,
      })
      .then(function (response) {
        if (response.data.success == true) {
          localStorage.setItem(
            "auth",
            JSON.stringify({ auth: true, user: response.data.body })
          );
          setUser(response.data.body);
          setToast({
            message: "Login Successful!",
            open: true,
          });
          setAuth(true);
          if (response.data.body.role == "applicant") {
            navigate("/applicant-dash");
          } else if (
            response.data.body.role == "admin" ||
            response.data.body.role == "departmentAdmin"
          ) {
            navigate("/admin");
          } else if (response.data.body.role == "institute") {
            navigate("/institute-dash");
          }
        } else {
          setToast({ message: response.data.message, open: true });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function validate() {
    let response = await axios.post("/authenticate/applicant/validate", {
      username: registrationInput.username,
    });
    response.data.success
      ? navigate("/applicant-reg-form")
      : setToast({ message: response.data.message, open: true });
  }

  function register() {
    registrationInput.phoneNo = Number(registrationInput.phoneNo);
    axios
      .post("/authenticate/applicant/register", {
        username: registrationInput.username,
        password: registrationInput.password,
        phoneNo: registrationInput.phoneNo,
        gender: registrationInput.gender,
        firstName: registrationInput.firstName,
        lastName: registrationInput.lastName,
        applicantType: registrationInput.applicantType,
      })
      .then(function (response) {
        if (response.data.success == true) {
          localStorage.setItem(
            "auth",
            JSON.stringify({ auth: true, user: response.data.body })
          );
          setAuth(true);
          setUser(response.data.body);
          setToast({
            message: "Registration Successful!",
            open: true,
          });
          if (response.data.body.role == "applicant") {
            navigate("/applicant-dash");
          } else {
            navigate("/admin");
          }
        } else {
          setToast({
            message: response.data.message,
            open: true,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <AuthContext.Provider
      value={{
        Login,
        Logout,
        register,
        registrationInput,
        setRegistrationInput,
        validate,
        user,
      }}
    >
      {typeof auth != "undefined" && typeof user == "object" && children}
    </AuthContext.Provider>
  );
}
