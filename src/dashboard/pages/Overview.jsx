import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, Clock, AlertCircle, Calendar, MapPin, Briefcase } from 'lucide-react'

export default function Overview() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser')
    
    if (!loggedInUser) {
      navigate('/login')
      return
    }

    const userData = JSON.parse(loggedInUser)
    setUser(userData)

    // Check if welcome was shown
    const welcomeShown = sessionStorage.getItem('welcomeShown')
    if (!welcomeShown) {
      setShowWelcome(true)
      sessionStorage.setItem('welcomeShown', 'true')
    }
  }, [navigate])

  const handleContinueWelcome = () => {
    setShowWelcome(false)
  }

  if (!user) {
    return null
  }

  return (
    <>
      {/* Welcome Modal */}
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
              Thank you for joining Aidquarter. Your application as a {user.role} is being processed.
            </p>

            <button
              onClick={handleContinueWelcome}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome back, {user.firstName}! Here's your application status.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Role</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1 capitalize">{user.role}</h3>
            <p className="text-sm text-gray-600">Your application role</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Status</span>
            </div>
            <h3 className="text-2xl font-bold text-yellow-600 mb-1">Pending</h3>
            <p className="text-sm text-gray-600">Under verification</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Applied</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {new Date(user.createdAt).toLocaleDateString()}
            </h3>
            <p className="text-sm text-gray-600">Application date</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Full Name</span>
                <span className="font-medium text-gray-900">{user.firstName} {user.lastName}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Email</span>
                <span className="font-medium text-gray-900">{user.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Phone</span>
                <span className="font-medium text-gray-900">{user.phone}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">State</span>
                <span className="font-medium text-gray-900">{user.state}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Role</span>
                <span className="font-medium text-gray-900 capitalize">{user.role}</span>
              </div>
            </div>
          </div>

          {/* Application Status */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Application Status</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Application Submitted</h4>
                  <p className="text-sm text-gray-600">Your application has been received successfully</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Document Review</h4>
                  <p className="text-sm text-gray-600">Your submitted documents are being verified</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 rounded-full border-2 border-yellow-500 flex items-center justify-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Background Check</h4>
                  <p className="text-sm text-gray-600">Conducting comprehensive background verification</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Final Approval</h4>
                  <p className="text-sm text-gray-600">Admin review and final approval pending</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-yellow-800">
                    <strong>Estimated Time:</strong> Your application will be reviewed within 24-48 hours. You will receive an email notification once the process is complete.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-3">Next Steps</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Check your email regularly for updates on your application status</li>
            <li>• Ensure your contact information is up to date in Settings</li>
            <li>• Review payment terms and conditions in the Payment section</li>
            <li>• Once approved, you'll receive access to job opportunities</li>
          </ul>
        </div>
      </div>
    </>
  )
}
