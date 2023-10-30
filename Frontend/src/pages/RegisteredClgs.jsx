// import { IonContent, IonPage } from "@ionic/react";
import BackBtn from "../components/BackBtn";
import SchemeCard from "../components/SchemeCard";
import ToolBar from "../components/ToolBar";
import angleleft from "../assets/images/Icon/angle-left.svg";
import institute from "../assets/images/Icon/institute.svg";

const RegisteredClgs = () => {
  const n = 4;
  let msgcards = [];
  for (let i = 0; i < n; ++i) {
    msgcards.push(
      <>
        <SchemeCard color="white" img={institute} icon={angleleft} />
        <SchemeCard img={institute} icon={angleleft} />
      </>
    );
  }

  return (
    <div style={{ margin: "auto 20px" }}>
      <BackBtn />
      <h2>Registered Colleges</h2>
      {msgcards}
      <div style={{ height: "70px" }}></div>
      <ToolBar />
    </div>
  );
};

export default RegisteredClgs;
