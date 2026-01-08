import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import {
  Baby,
  Heart,
  Home,
  Car,
  CheckCircle,
  Shield,
  Clock,
} from "lucide-react";

const recruitmentRoles = [
  {
    id: "nanny",
    title: "Nanny",
    icon: Baby,
    description:
      "Caring, qualified childcare professionals to support your family's needs",
    requirements: [
      "Valid ID",
      "Facial Verification",
      "NIN Verification",
      "Guarantors",
      "Age Declaration (18+)",
      "Health Certification",
      "Childcare Experience",
    ],
  },
  {
    id: "caregiver",
    title: "Caregiver",
    icon: Heart,
    description:
      "Compassionate, professional care for elderly and patients with dedicated support",
    requirements: [
      "Valid ID",
      "Facial Verification",
      "NIN Verification",
      "Guarantors",
      "Age Declaration (18+)",
      "Health Certification",
      "Medical Training/Experience",
      "First Aid Certification",
    ],
  },
  {
    id: "househelp",
    title: "House Help",
    icon: Home,
    description:
      "Professional cleaning and household management services from experienced staff",
    requirements: [
      "Valid ID",
      "Facial Verification",
      "NIN Verification",
      "Guarantors",
      "Age Declaration (18+)",
      "Health Certification",
      "Housekeeping Experience",
    ],
  },
  {
    id: "driver",
    title: "Driver",
    icon: Car,
    description:
      "Reliable, licensed drivers for personal and family transportation needs",
    requirements: [
      "Valid ID",
      "Facial Verification",
      "NIN Verification",
      "Guarantors",
      "Age Declaration (18+)",
      "Health Certification",
      "Valid Driver's License",
      "Driving Experience (Min. 3 years)",
    ],
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 mb-4">
                Join Our Team of Vetted Professionals
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                Connect with families across Nigeria. Simple, secure, and
                focused on your success as a household professional.
              </p>
              <button
                onClick={() => navigate("/recruitment")}
                className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
              >
                Start Your Application
              </button>

              {/* Trust Badges */}
              <div className="mt-8 grid grid-cols-3 gap-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Background Verified
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-6 h-6 text-primary-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Reference Checked
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-6 h-6 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Age 18+
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <img
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop"
                  alt="Professional household staff"
                  className="rounded-lg w-full h-auto"
                />
                <div className="mt-6 text-center">
                  <div className="text-4xl font-bold text-primary-600">143+</div>
                  <div className="text-gray-600 font-medium">
                    Verified Workers
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recruitment Cards Section */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Join As A Professional
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We connect experienced, vetted professionals with families who
              need your expertise. Choose your role to begin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recruitmentRoles.map((role) => (
              <RecruitmentCard key={role.id} role={role} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Your Safety is Our Priority
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Every worker on our platform goes through a comprehensive vetting
              process to ensure the highest quality service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Background Verification
              </h3>
              <p className="text-sm text-gray-600">
                Comprehensive background checks and identity verification
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Reference Checks
              </h3>
              <p className="text-sm text-gray-600">
                Verified references from previous employers
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                24/7 Support
              </h3>
              <p className="text-sm text-gray-600">
                Round-the-clock customer support for any concerns
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function RecruitmentCard({ role }) {
  const navigate = useNavigate();
  const [showRequirements, setShowRequirements] = useState(false);
  const IconComponent = role.icon;

  const handleRegister = () => {
    navigate(`/signup/${role.id}`, {
      state: { requirements: role.requirements, roleTitle: role.title },
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow flex flex-col">
      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
        <IconComponent className="w-8 h-8 text-primary-600" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{role.title}</h3>
      <p className="text-sm text-gray-600 mb-6 flex-grow">{role.description}</p>
      <button
        onClick={handleRegister}
        className="w-full px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
      >
        Register
      </button>
    </div>
  );
}
