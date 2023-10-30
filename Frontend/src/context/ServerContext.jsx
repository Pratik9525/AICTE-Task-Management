import axios from "axios";
import { createContext, useEffect, useRef, useState } from "react";

export const ServerContext = createContext();

export default function ServerContextProvider({ children }) {
  const [server, setServer] = useState();
  const [checked, setChecked] = useState();

  useEffect(() => {
    let serverToggle = localStorage.getItem("toggle");
    let localServer = localStorage.getItem("localServer");
    serverToggle = serverToggle === "true";
    setChecked(serverToggle);
    if (!serverToggle) {
      localServer ? setServer(localServer) : setServer("http://192.168.42.106");
    } else {
      setServer("https://backend-made4innovation.vercel.app");
    }
  }, []);

  useEffect(() => {
    if (server) {
      axios.defaults.baseURL = server;
    }
  }, [server]);

  function handleInputChange(e) {
    setServer(e.target.value);
    localStorage.setItem("localServer", e.target.value);
  }

  function handleToggleChange(e) {
    setChecked(e.detail.checked);
    localStorage.setItem("toggle", e.detail.checked);
    if (e.detail.checked) {
      setServer("https://backend-made4innovation.vercel.app");
    } else {
      let localServer = localStorage.getItem("localServer");
      localServer ? setServer(localServer) : setServer("http://192.168.42.106");
    }
  }

  return (
    <ServerContext.Provider
      value={{
        server,
        setServer,
        checked,
        handleToggleChange,
        handleInputChange,
      }}
    >
      {server && children}
    </ServerContext.Provider>
  );
}
