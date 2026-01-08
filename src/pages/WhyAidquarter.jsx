import Header from "../components/Header";
import Footer from "../components/Footer";

export default function WhyAidquarter() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Why Choose Aidquarter?
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 text-center mb-12">
              Join Nigeria's most trusted platform for household professionals
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Verified Opportunities
                </h3>
                <p className="text-gray-600">
                  All families on our platform are verified, ensuring safe and
                  legitimate employment opportunities.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Fair Compensation
                </h3>
                <p className="text-gray-600">
                  Transparent payment terms and competitive rates for your
                  skills and experience.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Professional Support
                </h3>
                <p className="text-gray-600">
                  24/7 support team ready to assist you with any concerns or
                  questions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
