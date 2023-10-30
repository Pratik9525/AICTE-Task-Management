import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const SchemeContext = createContext();

export default function SchemeContextProvider({ children }) {
  const [schemes, setSchemes] = useState([]);
  const { user } = useContext(AuthContext);

  const [selectedScheme, setSelectedScheme] = useState();
  let navigate = useNavigate();

  async function getSchemes() {
    let response = await axios.get("/schemes", {
      params: {
        stakeholder: user.applicantType,
      },
    });

    response?.data?.success == true && setSchemes(response.data.body);
  }

  useEffect(() => {
    if (selectedScheme) {
      navigate("/previewscheme");
    }
  }, [selectedScheme]);

  useEffect(() => {
    getSchemes();
  }, []);

  return (
    <SchemeContext.Provider
      value={{
        schemes,
        setSelectedScheme,
        selectedScheme,
      }}
    >
      {children}
    </SchemeContext.Provider>
  );
}
