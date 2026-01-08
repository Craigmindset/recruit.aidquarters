import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WhyAidquarter from "./pages/WhyAidquarter";
import Recruitment from "./pages/Recruitment";
import Support from "./pages/Support";
import LoginPage from "./pages/LoginPage";
import SignupFlow from "./pages/SignupFlow";
import ManagementCourse from "./pages/ManagementCourse";
import VerificationPending from "./pages/VerificationPending";

// Dashboard
import DashboardLayout from "./dashboard/DashboardLayout";
import Overview from "./dashboard/pages/Overview";
import Payment from "./dashboard/pages/Payment";
import Settings from "./dashboard/pages/Settings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/why-aidquarter" element={<WhyAidquarter />} />
        <Route path="/recruitment" element={<Recruitment />} />
        <Route path="/support" element={<Support />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup/:role" element={<SignupFlow />} />
        <Route path="/management-course" element={<ManagementCourse />} />
        <Route path="/verification-pending" element={<VerificationPending />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard/overview" replace />} />
          <Route path="overview" element={<Overview />} />
          <Route path="payment" element={<Payment />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
