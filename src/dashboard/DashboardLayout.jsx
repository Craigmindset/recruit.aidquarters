import { useState } from 'react'
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom'
import { Home, DollarSign, Settings, LogOut, User, Menu, X, BookOpen } from 'lucide-react'

export default function DashboardLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState(() => {
    const loggedInUser = localStorage.getItem('loggedInUser')
    return loggedInUser ? JSON.parse(loggedInUser) : null
  })

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser')
    navigate('/login')
  }

  const sidebarLinks = [
    { path: '/dashboard/overview', label: 'Overview', icon: Home },
    { path: '/dashboard/payment', label: 'Payment', icon: DollarSign },
    { path: '/dashboard/settings', label: 'Settings', icon: Settings },
  ]

  const isActive = (path) => location.pathname === path

  if (!user) {
    navigate('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">AQ</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Aidquarter</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition">
                Home
              </Link>
              <Link to="/management-course" className="text-gray-700 hover:text-blue-600 font-medium transition">
                Management Course
              </Link>
              <Link to="/why-aidquarter" className="text-gray-700 hover:text-blue-600 font-medium transition">
                Why Aidquarter
              </Link>
            </div>

            {/* Profile & Logout */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-700">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-medium">{user.firstName}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition font-medium flex items-center space-x-1"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-4">
                <Link 
                  to="/" 
                  className="text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/management-course" 
                  className="text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Management Course
                </Link>
                <Link 
                  to="/why-aidquarter" 
                  className="text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Why Aidquarter
                </Link>
                <div className="pt-4 border-t">
                  <div className="flex items-center space-x-2 text-gray-700 mb-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="font-medium">{user.firstName}</span>
                  </div>
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false)
                      handleLogout()
                    }}
                    className="w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition font-medium flex items-center space-x-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Layout with Sidebar */}
      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 bg-white shadow-sm min-h-[calc(100vh-4rem)] sticky top-16">
          <nav className="p-4">
            <div className="space-y-2">
              {sidebarLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                      isActive(link.path)
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                )
              })}
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Mobile Sidebar Navigation */}
        <div className="lg:hidden w-full">
          <div className="bg-white border-b">
            <div className="flex overflow-x-auto">
              {sidebarLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-2 px-4 py-3 whitespace-nowrap transition ${
                      isActive(link.path)
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium text-sm">{link.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
