import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { MdOutlineLogout } from "react-icons/md";

const AdminDash = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
      },
    },
  };

  const labels = ["January", "February", "March", "April", "May", "June"];

  const data = {
    labels,
    datasets: [
      {
        label: "Pending",
        data: [400, 100, 390, 30, 410, 230, 180, 200],
        // data: labels.map(() => faker.datatype.number({ min: 300, max: 1000 })),
        borderColor: "#FFAE35",
        backgroundColor: "#FFE4AF",
      },
      {
        label: "Approved",
        // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        data: [0, 300, 230, 150, 300, 390, 150, 0],
        borderColor: "#5caf69",
        backgroundColor: "#FAF9FE",
      },
    ],
  };

  const { user, Logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const [applicationsCount, setApplicationsCount] = useState({});

  async function getApplicationsCount() {
    let response = await axios.get("/applications/statistics", {
      params: {
        departmentId: user.department?._id,
        userRole: user.role,
      },
    });
    if (response.data.success) {
      setApplicationsCount(response.data.body.countStatistics);
    }
  }

  useEffect(() => {
    getApplicationsCount();
  }, []);

  return (
    <>
      <h3
        style={{
          position: "absolute",
          right: "15px",
          color: "white",
          zIndex: "1",
        }}
      >
        <MdOutlineLogout
          style={{ fontSize: "20px", marginRight: "10px" }}
          onClick={() => Logout()}
        />
      </h3>
      <div
        style={{
          borderRadius: "0% 0% 100% 50% / 0% 0% 15% 15%",
          backgroundColor: "#ffa318",
          height: "135px",
        }}
      >
        <div
          style={{
            borderRadius: "0% 0% 100% 50% / 0% 0% 15% 15%",
            backgroundColor: "#000000",
            height: "130px",
          }}
        >
          <div
            style={{
              position: "absolute",
              margin: "auto 20px",
              color: "white",
              paddingTop: "40px",
              zIndex: 1,
            }}
          >
            <p style={{ fontSize: "30px", margin: 0 }}>Welcome,</p>
            <h1 style={{ fontWeight: "600", marginTop: 0 }}>
              {user.role == "departmentAdmin"
                ? "Institution Admin"
                : "AICTE Admin"}
            </h1>
          </div>

          <div className="curve-2"> </div>
        </div>
      </div>

      <div className="grid-container">
        <div
          className="a-card item1"
          onClick={() => {
            user.role == "departmentAdmin"
              ? navigate("/admin/admin-schemes-status", {
                  state: {
                    status: "approved",
                    caption: "Approved Applications",
                    title: "Choose a scheme",
                  },
                })
              : navigate("/admin/admin-department-status", {
                  state: {
                    status: "approved",
                    caption: "Approved Applications",
                    title: "Choose a department",
                  },
                });
          }}
        >
          <h3 className="a-card-text">
            Approved
            <br /> Applications
          </h3>
          <div className="c-item c-2">
            {applicationsCount.approvedApplicationsCount}
          </div>
        </div>

        <div
          className="a-card item2"
          onClick={() => {
            user.role == "departmentAdmin"
              ? navigate("/admin/admin-schemes-status", {
                  state: {
                    status: "pending",
                    caption: "Pending Applications",
                    title: "Choose a scheme",
                  },
                })
              : navigate("/admin/admin-department-status", {
                  state: {
                    status: "pending",
                    caption: "Pending Applications",
                    title: "Choose a department",
                  },
                });
          }}
        >
          <h3 className="a-card-text">
            Pending
            <br /> Applications
          </h3>
          <div className="c-item c-3">
            {applicationsCount.pendingApplicationsCount}
          </div>
        </div>

        <div
          className="a-card item3"
          onClick={() => {
            user.role == "departmentAdmin"
              ? navigate("/admin/admin-schemes-status", {
                  state: {
                    status: "reverted",
                    caption: "Reverted Applications",
                    title: "Choose a scheme",
                  },
                })
              : navigate("/admin/admin-department-status", {
                  state: {
                    status: "reverted",
                    caption: "Reverted Applications",
                    title: "Choose a department",
                  },
                });
          }}
        >
          <h3 className="a-card-text">
            Reverted
            <br />
            Applications
          </h3>
          <div className="c-item c-4">
            {applicationsCount.revertedApplicationsCount}
          </div>
        </div>
      </div>

      <h3 style={{ marginBottom: "10px", textAlign: "center" }}>
        Data Visualization
      </h3>
      <Line options={options} data={data} />
    </>
  );
};

export default AdminDash;
