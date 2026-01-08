import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, CheckCircle2, AlertCircle } from "lucide-react";
import Header from "../components/Header";

export default function VerificationPending() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 48,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
      navigate("/login");
      return;
    }

    const userData = JSON.parse(loggedInUser);
    setUser(userData);

    // Calculate time remaining (48 hours from creation)
    const createdAt = new Date(userData.createdAt);
    const deadline = new Date(createdAt.getTime() + 48 * 60 * 60 * 1000); // 48 hours later

    // Update countdown every second
    const interval = setInterval(() => {
      const now = new Date();
      const diff = deadline - now;

      if (diff <= 0) {
        setTimeRemaining({ hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-12 h-12 text-yellow-600" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Verification In Progress
            </h1>

            <p className="text-gray-600 text-lg">
              Your application is being reviewed by our admin team
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 text-center mb-6">
              Estimated Review Time
            </h2>

            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="bg-white rounded-lg p-4 text-center shadow-md">
                <div className="text-4xl font-bold text-primary-600">
                  {timeRemaining.hours.toString().padStart(2, "0")}
                </div>
                <div className="text-sm text-gray-600 mt-2">Hours</div>
              </div>

              <div className="bg-white rounded-lg p-4 text-center shadow-md">
                <div className="text-4xl font-bold text-primary-600">
                  {timeRemaining.minutes.toString().padStart(2, "0")}
                </div>
                <div className="text-sm text-gray-600 mt-2">Minutes</div>
              </div>

              <div className="bg-white rounded-lg p-4 text-center shadow-md">
                <div className="text-4xl font-bold text-primary-600">
                  {timeRemaining.seconds.toString().padStart(2, "0")}
                </div>
                <div className="text-sm text-gray-600 mt-2">Seconds</div>
              </div>
            </div>
          </div>

          {/* Verification Steps */}
          <div className="space-y-4 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Verification Progress
            </h3>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  Application Submitted
                </h4>
                <p className="text-sm text-gray-600">
                  Your application has been received successfully
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Document Review</h4>
                <p className="text-sm text-gray-600">
                  Your submitted documents are being verified
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 rounded-full border-2 border-yellow-500 flex items-center justify-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  Background Check
                </h4>
                <p className="text-sm text-gray-600">
                  Conducting comprehensive background verification
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Final Approval</h4>
                <p className="text-sm text-gray-600">
                  Admin review and final approval pending
                </p>
              </div>
            </div>
          </div>

          {/* Important Information */}
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">
                  What Happens Next?
                </h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>
                    • You will receive an email notification once your
                    verification is complete
                  </li>
                  <li>• The review process typically takes 24-48 hours</li>
                  <li>
                    • If additional information is needed, our team will contact
                    you
                  </li>
                  <li>
                    • Once approved, you can start receiving job assignments
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
