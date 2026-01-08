import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import Header from "../components/Header";

export default function Dashboard() {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(loggedInUser));
  }, [navigate]);

  const handleContinue = () => {
    setShowWelcome(false);
    // Navigate to verification pending page
    navigate("/verification-pending");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {showWelcome && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome, {user.firstName}!
            </h2>

            <p className="text-gray-600 mb-8">
              Thank you for joining Aidquarter. Your application as a{" "}
              {user.role} is being processed.
            </p>

            <button
              onClick={handleContinue}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">
                Personal Information
              </h3>
              <div className="space-y-1 text-sm text-blue-800">
                <p>
                  <strong>Name:</strong> {user.firstName} {user.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Phone:</strong> {user.phone}
                </p>
                <p>
                  <strong>Role:</strong>{" "}
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">
                Application Status
              </h3>
              <div className="space-y-1 text-sm text-yellow-800">
                <p>
                  <strong>Status:</strong> Pending Verification
                </p>
                <p>
                  <strong>Submitted:</strong>{" "}
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
                <p className="mt-3 text-yellow-900 font-medium">
                  Your application is under admin review. You will be notified
                  within 48 hours.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <button
              onClick={() => navigate("/verification-pending")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              View Verification Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
