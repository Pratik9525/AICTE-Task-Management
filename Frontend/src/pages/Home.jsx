import "../styles/styles.css";
import { Link, useNavigate } from "react-router-dom";
import ModalAxios from "../components/ModalAxios";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ margin: "auto 20px" }}>
      <h3>Go to Page: </h3>
      <Link to="/login">Login</Link> <br />
      <Link to="/register">Register</Link> <br />
      <Link to="/thankyou">Thank You Page</Link> <br />
      <Link to="/institute-dash">Institute Dashboard</Link> <br />
      <br />
      <ModalAxios />
    </div>
  );
};

export default Home;
