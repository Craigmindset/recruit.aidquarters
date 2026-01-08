import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { X, AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";
import Header from "../components/Header";

// Role requirements mapping
const roleRequirements = {
  nanny: [
    "Valid ID",
    "Facial Verification",
    "NIN Verification",
    "Guarantors",
    "Age Declaration (18+)",
    "Health Certification",
    "Childcare Experience",
  ],
  caregiver: [
    "Valid ID",
    "Facial Verification",
    "NIN Verification",
    "Guarantors",
    "Age Declaration (18+)",
    "Health Certification",
    "Medical Training/Experience",
    "First Aid Certification",
  ],
  househelp: [
    "Valid ID",
    "Facial Verification",
    "NIN Verification",
    "Guarantors",
    "Age Declaration (18+)",
    "Health Certification",
    "Housekeeping Experience",
  ],
  driver: [
    "Valid ID",
    "Facial Verification",
    "NIN Verification",
    "Guarantors",
    "Age Declaration (18+)",
    "Health Certification",
    "Valid Driver's License",
    "Driving Experience (Min. 3 years)",
  ],
};

export default function SignupFlow() {
  const { role } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0); // 0: questionnaire, 1: personal info, 2: NIN/DOB, 3: facial
  const [showRequirementsPopup, setShowRequirementsPopup] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  // Form data state
  const [questionnaireData, setQuestionnaireData] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
  });

  const [personalData, setPersonalData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    otp: "",
    phone: "",
    state: "",
    role: role || "",
    password: "",
    confirmPassword: "",
  });

  const [addressData, setAddressData] = useState({
    address: "",
    nin: "",
    dob: "",
  });

  // Load cached data on mount
  useEffect(() => {
    const cachedData = localStorage.getItem(`signup_${role}`);
    if (cachedData) {
      try {
        const parsed = JSON.parse(cachedData);
        if (parsed.questionnaireData)
          setQuestionnaireData(parsed.questionnaireData);
        if (parsed.personalData)
          setPersonalData({ ...personalData, ...parsed.personalData });
        if (parsed.addressData) setAddressData(parsed.addressData);
        if (parsed.currentStep) setCurrentStep(parsed.currentStep);
      } catch (e) {
        console.error("Error loading cached data:", e);
      }
    }
  }, [role]);

  // Save to cache whenever data changes
  useEffect(() => {
    const dataToCache = {
      questionnaireData,
      personalData: { ...personalData, password: "", confirmPassword: "" }, // Don't cache passwords
      addressData,
      currentStep,
    };
    localStorage.setItem(`signup_${role}`, JSON.stringify(dataToCache));
  }, [questionnaireData, personalData, addressData, currentStep, role]);

  const requirements = roleRequirements[role] || [];

  const handleQuestionnaireSubmit = (e) => {
    e.preventDefault();

    // Check if all answers are "yes"
    const allAnswers = Object.values(questionnaireData);
    const allYes = allAnswers.every((answer) => answer === "yes");

    if (!allYes) {
      alert(
        'Sorry, you don\'t qualify to apply at this time. All questions must be answered "Yes" to proceed.'
      );
      return;
    }

    setCurrentStep(1);
    setShowRequirementsPopup(false);
  };

  const handleSendOTP = () => {
    if (!personalData.email) {
      alert("Please enter your email address");
      return;
    }
    // Simulate OTP send
    setOtpSent(true);
    alert("OTP has been sent to your email. Use code: 111111");
  };

  const handleVerifyOTP = () => {
    if (!personalData.otp) {
      alert("Please enter the OTP");
      return;
    }
    // Verify OTP is exactly 111111
    if (personalData.otp === "111111") {
      setEmailVerified(true);
      alert("Email verified successfully!");
    } else {
      alert("Invalid OTP. Please use code: 111111");
    }
  };

  const handlePersonalInfoSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!emailVerified) {
      alert("Please verify your email before continuing");
      return;
    }

    if (personalData.password !== personalData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (personalData.password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    setCurrentStep(2);
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();

    // Validate NIN (should be 11 digits)
    if (addressData.nin.length !== 11) {
      alert("NIN must be 11 digits");
      return;
    }

    // Validate age (must be 18+)
    const birthDate = new Date(addressData.dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (age < 18 || (age === 18 && monthDiff < 0)) {
      alert("You must be at least 18 years old to register");
      return;
    }

    setCurrentStep(3);
  };

  const handleFacialVerification = () => {
    // Simulate facial verification
    setTimeout(() => {
      // Clear cached data on successful signup
      localStorage.removeItem(`signup_${role}`);

      // Save user data
      const userData = {
        ...personalData,
        ...addressData,
        role,
        verified: false,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem("currentUser", JSON.stringify(userData));

      // Show success and redirect
      alert(
        "Facial verification successful! Your application has been submitted."
      );
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Requirements Popup */}
        {showRequirementsPopup && currentStep === 0 && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {role.charAt(0).toUpperCase() + role.slice(1)} -
                    Requirements
                  </h2>
                  <button
                    onClick={() => navigate("/")}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <AlertCircle className="w-6 h-6 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">
                        Documents Required for{" "}
                        {role.charAt(0).toUpperCase() + role.slice(1)}{" "}
                        Registration
                      </h3>
                      <p className="text-blue-800 text-sm mb-3">
                        Please ensure you have the following documents ready
                        before proceeding:
                      </p>
                      <ul className="space-y-2">
                        {requirements.map((req, index) => (
                          <li
                            key={index}
                            className="flex items-center text-blue-900"
                          >
                            <CheckCircle2 className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span className="text-sm">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowRequirementsPopup(false)}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  I Understand, Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[
              "Questionnaire",
              "Personal Info",
              "NIN & Address",
              "Verification",
            ].map((step, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    index <= currentStep
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {index + 1}
                </div>
                {index < 3 && (
                  <div
                    className={`h-1 w-12 md:w-24 ${
                      index < currentStep ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 0: Questionnaire */}
        {currentStep === 0 && !showRequirementsPopup && (
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Pre-Registration Questionnaire
            </h2>
            <form onSubmit={handleQuestionnaireSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-3">
                  1. Are you above the age of 18 and a Nationality of Nigeria?
                </label>
                <div className="space-x-6">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="q1"
                      value="yes"
                      checked={questionnaireData.q1 === "yes"}
                      onChange={(e) =>
                        setQuestionnaireData({
                          ...questionnaireData,
                          q1: e.target.value,
                        })
                      }
                      className="mr-2"
                      required
                    />
                    Yes
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="q1"
                      value="no"
                      checked={questionnaireData.q1 === "no"}
                      onChange={(e) =>
                        setQuestionnaireData({
                          ...questionnaireData,
                          q1: e.target.value,
                        })
                      }
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-3">
                  2. Are you registering at your own consent or will?
                </label>
                <div className="space-x-6">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="q2"
                      value="yes"
                      checked={questionnaireData.q2 === "yes"}
                      onChange={(e) =>
                        setQuestionnaireData({
                          ...questionnaireData,
                          q2: e.target.value,
                        })
                      }
                      className="mr-2"
                      required
                    />
                    Yes
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="q2"
                      value="no"
                      checked={questionnaireData.q2 === "no"}
                      onChange={(e) =>
                        setQuestionnaireData({
                          ...questionnaireData,
                          q2: e.target.value,
                        })
                      }
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-3">
                  3. Do you consent to verification and scrutiny of your data,
                  which may cover Criminal records, Birth certification, Health
                  records, previous working role, etc?
                </label>
                <div className="space-x-6">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="q3"
                      value="yes"
                      checked={questionnaireData.q3 === "yes"}
                      onChange={(e) =>
                        setQuestionnaireData({
                          ...questionnaireData,
                          q3: e.target.value,
                        })
                      }
                      className="mr-2"
                      required
                    />
                    Yes
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="q3"
                      value="no"
                      checked={questionnaireData.q3 === "no"}
                      onChange={(e) =>
                        setQuestionnaireData({
                          ...questionnaireData,
                          q3: e.target.value,
                        })
                      }
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-3">
                  4. Are you experienced in this chosen role?
                </label>
                <div className="space-x-6">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="q4"
                      value="yes"
                      checked={questionnaireData.q4 === "yes"}
                      onChange={(e) =>
                        setQuestionnaireData({
                          ...questionnaireData,
                          q4: e.target.value,
                        })
                      }
                      className="mr-2"
                      required
                    />
                    Yes
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="q4"
                      value="no"
                      checked={questionnaireData.q4 === "no"}
                      onChange={(e) =>
                        setQuestionnaireData({
                          ...questionnaireData,
                          q4: e.target.value,
                        })
                      }
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-3">
                  5. Do you agree to abide by the platform's terms, policies,
                  and code of conduct?
                </label>
                <div className="space-x-6">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="q5"
                      value="yes"
                      checked={questionnaireData.q5 === "yes"}
                      onChange={(e) =>
                        setQuestionnaireData({
                          ...questionnaireData,
                          q5: e.target.value,
                        })
                      }
                      className="mr-2"
                      required
                    />
                    Yes
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="q5"
                      value="no"
                      checked={questionnaireData.q5 === "no"}
                      onChange={(e) =>
                        setQuestionnaireData({
                          ...questionnaireData,
                          q5: e.target.value,
                        })
                      }
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Continue
              </button>
            </form>
          </div>
        )}

        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Personal Information
            </h2>
            <form onSubmit={handlePersonalInfoSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={personalData.firstName}
                    onChange={(e) =>
                      setPersonalData({
                        ...personalData,
                        firstName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={personalData.lastName}
                    onChange={(e) =>
                      setPersonalData({
                        ...personalData,
                        lastName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={personalData.email}
                    onChange={(e) =>
                      setPersonalData({
                        ...personalData,
                        email: e.target.value,
                      })
                    }
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    required
                    disabled={emailVerified}
                  />
                  {!emailVerified && (
                    <button
                      type="button"
                      onClick={handleSendOTP}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                      {otpSent ? "Resend OTP" : "Send OTP"}
                    </button>
                  )}
                  {emailVerified && (
                    <div className="flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Verified
                    </div>
                  )}
                </div>
              </div>

              {otpSent && !emailVerified && (
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Enter OTP
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={personalData.otp}
                      onChange={(e) =>
                        setPersonalData({
                          ...personalData,
                          otp: e.target.value,
                        })
                      }
                      placeholder="Enter 6-digit OTP"
                      maxLength="6"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOTP}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                    >
                      Verify
                    </button>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={personalData.phone}
                  onChange={(e) =>
                    setPersonalData({ ...personalData, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  State
                </label>
                <select
                  value={personalData.state}
                  onChange={(e) =>
                    setPersonalData({ ...personalData, state: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                >
                  <option value="">Select State</option>
                  <option value="Lagos">Lagos</option>
                  <option value="Abuja">Abuja</option>
                  <option value="Kano">Kano</option>
                  <option value="Rivers">Rivers</option>
                  <option value="Oyo">Oyo</option>
                  {/* Add more states as needed */}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Role
                </label>
                <input
                  type="text"
                  value={role.charAt(0).toUpperCase() + role.slice(1)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                  disabled
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={personalData.password}
                    onChange={(e) =>
                      setPersonalData({
                        ...personalData,
                        password: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent pr-10"
                    required
                    minLength="8"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={personalData.confirmPassword}
                    onChange={(e) =>
                      setPersonalData({
                        ...personalData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent pr-10"
                    required
                    minLength="8"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Continue
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Address & NIN */}
        {currentStep === 2 && (
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Address & Identity Verification
            </h2>
            <form onSubmit={handleAddressSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Address
                </label>
                <textarea
                  value={addressData.address}
                  onChange={(e) =>
                    setAddressData({ ...addressData, address: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  rows="3"
                  required
                  placeholder="Enter your full address"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  NIN (National Identification Number)
                </label>
                <input
                  type="text"
                  value={addressData.nin}
                  onChange={(e) =>
                    setAddressData({
                      ...addressData,
                      nin: e.target.value.replace(/\D/g, "").slice(0, 11),
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                  maxLength="11"
                  placeholder="11-digit NIN"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={addressData.dob}
                  onChange={(e) =>
                    setAddressData({ ...addressData, dob: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Continue to Verification
              </button>
            </form>
          </div>
        )}

        {/* Step 3: Facial Verification */}
        {currentStep === 3 && (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Facial Verification
            </h2>

            <div className="mb-8">
              <div className="w-64 h-64 mx-auto bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                <div className="text-gray-500">
                  <svg
                    className="w-32 h-32 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <p className="mt-4 text-sm">Camera Preview</p>
                </div>
              </div>

              <p className="text-gray-600 mb-4">
                Please position your face in the center of the frame and click
                the button below to capture your photo for verification.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Verification Tips:
                </h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Ensure good lighting</li>
                  <li>• Remove glasses or face coverings</li>
                  <li>• Look directly at the camera</li>
                  <li>• Keep a neutral expression</li>
                </ul>
              </div>
            </div>

            <button
              onClick={handleFacialVerification}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Capture & Verify
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
