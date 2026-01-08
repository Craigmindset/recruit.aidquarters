import { useState, useEffect } from 'react'
import { DollarSign, CreditCard, Clock, CheckCircle2, AlertCircle } from 'lucide-react'

export default function Payment() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser))
    }
  }, [])

  if (!user) {
    return null
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Information</h1>
        <p className="text-gray-600">Manage your payment details and view transaction history.</p>
      </div>

      {/* Payment Status */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
        <div className="flex items-start">
          <AlertCircle className="w-6 h-6 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-yellow-900 mb-2">Payment Setup Pending</h3>
            <p className="text-yellow-800">
              Your payment account will be activated once your application is approved. You'll be able to receive payments for completed jobs through the platform.
            </p>
          </div>
        </div>
      </div>

      {/* Payment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">₦0.00</h3>
          <p className="text-sm text-gray-600">Total Earnings</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">₦0.00</h3>
          <p className="text-sm text-gray-600">Pending Payments</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">0</h3>
          <p className="text-sm text-gray-600">Completed Jobs</p>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h3>
        
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="font-semibold text-gray-900 mb-2">No Payment Method Added</h4>
          <p className="text-gray-600 mb-4">
            You'll be able to add your bank account details once your application is approved.
          </p>
          <button 
            disabled
            className="px-6 py-2 bg-gray-300 text-gray-500 rounded-lg font-semibold cursor-not-allowed"
          >
            Add Payment Method
          </button>
        </div>
      </div>

      {/* Payment Terms */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Terms & Conditions</h3>
        
        <div className="space-y-4 text-gray-700">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Payment Schedule</h4>
            <p className="text-sm">
              Payments are processed weekly for completed and verified jobs. Earnings are transferred to your registered bank account every Monday.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Service Fee</h4>
            <p className="text-sm">
              Aidquarter charges a 10% service fee on all transactions. This fee covers platform maintenance, insurance, and support services.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Payment Protection</h4>
            <p className="text-sm">
              All payments are held securely by Aidquarter until job completion is confirmed. This ensures fair compensation for your work.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Dispute Resolution</h4>
            <p className="text-sm">
              In case of payment disputes, our support team will mediate within 48 hours. All disputes are resolved fairly based on platform policies.
            </p>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-xl shadow-md p-6 mt-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Transaction History</h3>
        
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-600">No transactions yet. Your payment history will appear here once you start receiving jobs.</p>
        </div>
      </div>
    </div>
  )
}
