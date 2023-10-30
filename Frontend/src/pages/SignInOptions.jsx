import { IonContent, IonPage } from "@ionic/react";
import { useNavigate } from "react-router-dom";
import BackBtn from "../components/BackBtn";

const SignInOptions = () => {
  let navigate = useNavigate();
  return (
    // <IonPage>
    //   <IonContent>
    <div className="page-center">
      <h1>Made4Innovation</h1>

      <h2 style={{ margin: "0 0 30px", fontWeight: "500" }}>Proceed As</h2>

      <div className="btns ripple" onClick={() => navigate.to("/studentdash")}>
        <img src="#" alt="" style={{ marginRight: "10px" }} />
        Student
      </div>

      <div className="btns ripple" onClick={() => navigate.to("#")}>
        <img src="#" alt="" style={{ marginRight: "10px" }} />
        Faculty
      </div>

      <div className="btns ripple" onClick={() => navigate.to("#")}>
        <img src="#" alt="" style={{ marginRight: "10px" }} />
        Admin
      </div>

      {/* <div className="submit-btns ripple">Proceed</div> */}
    </div>
    //   </IonContent>
    // </IonPage>
  );
};

export default SignInOptions;
