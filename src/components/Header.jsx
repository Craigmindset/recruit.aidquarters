import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">AQ</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Aidquarter</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 font-medium transition"
            >
              Home
            </Link>
            <Link
              to="/why-aidquarter"
              className="text-gray-700 hover:text-primary-600 font-medium transition"
            >
              Why Aidquarter
            </Link>
            <Link
              to="/recruitment"
              className="text-gray-700 hover:text-primary-600 font-medium transition"
            >
              Recruitment
            </Link>
            <Link
              to="/support"
              className="text-gray-700 hover:text-primary-600 font-medium transition"
            >
              Support
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
            >
              Login / Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Side Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[70vw] max-w-sm bg-white shadow-xl z-50 transform transition-transform duration-300 ease-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full overflow-y-auto overscroll-contain">
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">AQ</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                Aidquarter
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Drawer Links */}
          <nav className="flex-1 px-4 py-6">
            <div className="flex flex-col space-y-1">
              {[
                { label: "Home", path: "/" },
                { label: "Why Aidquarter", path: "/why-aidquarter" },
                { label: "Recruitment", path: "/recruitment" },
                { label: "Support", path: "/support" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary-600 font-medium rounded-lg transition"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Drawer Footer */}
          <div className="p-4 border-t">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate("/login");
              }}
              className="w-full px-6 py-3 bg-red-800 text-white rounded-lg hover:bg-primary-700 transition font-medium"
            >
              Login / Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
