import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Baby, Heart, Home, Car } from "lucide-react";

const recruitmentRoles = [
  {
    id: "nanny",
    title: "Nanny",
    icon: Baby,
    description:
      "Caring, qualified childcare professionals to support family needs",
  },
  {
    id: "caregiver",
    title: "Caregiver",
    icon: Heart,
    description: "Compassionate, professional care for elderly and patients",
  },
  {
    id: "househelp",
    title: "House Help",
    icon: Home,
    description: "Professional cleaning and household management services",
  },
  {
    id: "driver",
    title: "Driver",
    icon: Car,
    description: "Reliable, licensed drivers for transportation needs",
  },
];

export default function Recruitment() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 text-center">
            Join Our Team
          </h1>
          <p className="text-lg text-gray-600 text-center mb-10 max-w-3xl mx-auto">
            Choose your role and start your application process to become part
            of Nigeria's premier household professional network.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recruitmentRoles.map((role) => {
              const IconComponent = role.icon;
              return (
                <div
                  key={role.id}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow flex flex-col"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {role.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-6 flex-grow">
                    {role.description}
                  </p>
                  <button
                    onClick={() => navigate(`/signup/${role.id}`)}
                    className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                  >
                    Apply Now
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
