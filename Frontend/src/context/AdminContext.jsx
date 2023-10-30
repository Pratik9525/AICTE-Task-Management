import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function AdminContextProvider() {
  const [applications, setApplications] = useState({
    approvedApplications: [],
    pendingApplications: [],
    revertedApplications: [],
  });
  const [schemes, setSchemes] = useState({
    approvedSchemes: [],
    pendingSchemes: [],
    revertedSchemes: [],
  });
  const navigate = useNavigate();

  async function getApplications() {
    let response = await axios.get("/applications");
    if (response.data.success) {
      let approvedApplications = [],
        pendingApplications = [],
        revertedApplications = [];
      response.data.body.items.map((item) => {
        item.status == "pending" && pendingApplications.push(item);
        item.status == "approved" && approvedApplications.push(item);
        item.status == "reverted" && revertedApplications.push(item);
      });
      setApplications({
        approvedApplications,
        pendingApplications,
        revertedApplications,
      });
    }
  }

  useEffect(() => {
    getApplications();
  }, []);
  return <Outlet context={{ applications, schemes, navigate }} />;
}
