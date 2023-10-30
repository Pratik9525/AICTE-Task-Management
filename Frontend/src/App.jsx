import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthContextProvider from "./context/AuthContext";
import SchemeContextProvider from "./context/SchemeContext";
import ApplicantDashboard from "./pages/ApplicantDashboard";
import RegisteredClgs from "./pages/RegisteredClgs";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

import ServerContextProvider from "./context/ServerContext";
import OurSchemes from "./pages/OurSchemes";
import ToastContextProvider from "./context/ToastContext";
import ApplicantRegForm from "./pages/ApplicantRegForm";
import { setupIonicReact } from "@ionic/react";
import AdminDash from "./pages/AdminDash";
import ApplicationPreviewPage from "./pages/ApplicationPreviewPage";
import AllSchemes from "./pages/AllSchemes";
import ApplyScheme from "./pages/ApplyScheme";
import StatusApplications from "./components/StatusApplications";
import ApplicantStatusMaster from "./pages/ApplicantStatusMaster";
import SchemeStatusMaster from "./pages/SchemeStatusMaster";
import DepartmentStatusMaster from "./pages/DepartmentStatusMaster";
import Modal from "./components/Modal";
import InstituteDash from "./pages/InstituteDash";
import TrackApplication from "./pages/TrackApplication";
import InstitueFormPreview from "./pages/InstituteFormPreview";
import EditApplication from "./pages/EditApplication";

setupIonicReact();

const App = () => {
  return (
    <BrowserRouter>
      <ToastContextProvider>
        <ServerContextProvider>
          <AuthContextProvider>
            <SchemeContextProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/applicant-reg-form"
                  element={<ApplicantRegForm />}
                />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/applicant-dash"
                  element={<ApplicantDashboard />}
                />
                <Route path="/clgsregistered" element={<RegisteredClgs />} />

                <Route path="/ourschemes" element={<OurSchemes />} />

                <Route path="/schemes" element={<AllSchemes />} />
                <Route path="/applyscheme" element={<ApplyScheme />} />
                <Route path="/status-page" element={<StatusApplications />} />
                <Route path="/admin" index element={<AdminDash />} />

                <Route
                  path="/admin/admin-schemes-status"
                  element={<SchemeStatusMaster />}
                />
                <Route
                  path="/admin/admin-applicants-status"
                  element={<ApplicantStatusMaster />}
                />

                <Route
                  path="/admin/application-form-preview"
                  element={<ApplicationPreviewPage />}
                />
                <Route
                  path="/admin/institute-form-preview"
                  element={<InstitueFormPreview />}
                />
                <Route
                  path="/admin/admin-department-status"
                  element={<DepartmentStatusMaster />}
                />
                <Route
                  path="/track-application"
                  element={<TrackApplication />}
                />
                <Route path="/edit-application" element={<EditApplication />} />
                <Route path="/institute-dash" element={<InstituteDash />} />
                <Route path="/thankyou" element={<Modal />} />
              </Routes>
            </SchemeContextProvider>
          </AuthContextProvider>
        </ServerContextProvider>
      </ToastContextProvider>
    </BrowserRouter>
  );
};

export default App;
