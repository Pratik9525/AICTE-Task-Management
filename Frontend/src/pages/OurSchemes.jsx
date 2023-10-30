// import {
//   IonContent,
//   IonPage,
//   IonAccordion,
//   IonAccordionGroup,
//   IonItem,
//   IonLabel,
// } from "@ionic/react";
import BackBtn from "../components/BackBtn";
import ToolBar from "../components/ToolBar";

const OurSchemes = () => {
  return (
    // <IonPage>
    //   <IonContent>
    <div style={{ margin: "auto 20px" }}>
      <BackBtn />
      <h2 style={{ marginBottom: "10px" }}>Our Schemes</h2>
      {/* <IonAccordionGroup style={{ margin: "auto -20px" }}>
        <IonAccordion value="first">
          <IonItem slot="header" color="white">
            <IonLabel style={{ fontWeight: "500", margin: "15px 0" }}>
              Current Scheme
            </IonLabel>
          </IonItem>
          <div
            className="ion-padding"
            slot="content"
            style={{ marginLeft: "20px", color: "grey" }}
          >
            First Content
          </div>
        </IonAccordion>

        <IonAccordion value="second">
          <IonItem slot="header" color="white">
            <IonLabel style={{ fontWeight: "500", margin: "15px 0" }}>
              Add a new Scheme
            </IonLabel>
          </IonItem>
          <div
            className="ion-padding"
            slot="content"
            style={{ marginLeft: "20px", color: "grey" }}
          >
            First Content
          </div>
        </IonAccordion>

        <IonAccordion value="third">
          <IonItem slot="header" color="white">
            <IonLabel style={{ fontWeight: "500", margin: "15px 0" }}>
              Edit a scheme
            </IonLabel>
          </IonItem>
          <div
            className="ion-padding"
            slot="content"
            style={{ marginLeft: "20px", color: "grey" }}
          >
            First Content
          </div>
        </IonAccordion>
      </IonAccordionGroup> */}
      <ToolBar />
    </div>
    //   </IonContent>
    // </IonPage>
  );
};

export default OurSchemes;
