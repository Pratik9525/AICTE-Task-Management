import { useContext, useEffect, useState } from "react";
import { IonButton, IonToggle } from "@ionic/react";

import { ServerContext } from "../context/ServerContext";
import axios from "axios";

function ModalAxios() {
  const { server, checked, handleToggleChange, handleInputChange } =
    useContext(ServerContext);
  const [connected, setConnected] = useState(false);

  async function checkServerStatus() {
    let response = await axios.get(server);
    if (response.data.success) {
      setConnected(true);
    } else {
      setConnected(false);
    }
  }
  useEffect(() => {
    checkServerStatus();
  }, [server, checked]);

  function reload() {
    if (connected) {
      window.location.reload();
    }
  }

  return (
    <>
      <br />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <IonToggle
            checked={checked}
            onIonChange={(e) => handleToggleChange(e)}
            style={{ marginRight: "20px" }}
          />
          {checked ? "Vercel" : "Localhost"}
        </div>
        <div>
          {connected && (
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "green",
              }}
            ></div>
          )}
        </div>
      </div>
      <input
        type="text"
        id="checkbox"
        className="field"
        disabled={checked}
        value={server}
        onChange={handleInputChange}
      ></input>

      {connected && <IonButton onClick={() => reload()}>Connect</IonButton>}
    </>
  );
}

export default ModalAxios;
