import Header from '../components/Header'
import Footer from '../components/Footer'
import { BookOpen, Video, FileText, Award } from 'lucide-react'

export default function ManagementCourse() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 text-center">
            Management Course
          </h1>
          <p className="text-lg text-gray-600 text-center mb-10 max-w-3xl mx-auto">
            Enhance your skills with our professional development courses designed for household professionals.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Course Materials</h3>
              <p className="text-sm text-gray-600">Access comprehensive learning resources</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Video className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Video Tutorials</h3>
              <p className="text-sm text-gray-600">Learn through interactive video lessons</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Certifications</h3>
              <p className="text-sm text-gray-600">Earn recognized certificates</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Expert Training</h3>
              <p className="text-sm text-gray-600">Learn from industry professionals</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Coming Soon</h2>
            <p className="text-blue-800 max-w-2xl mx-auto">
              Our management course platform is currently under development. Once your application is approved, 
              you'll get access to a wide range of professional development courses to enhance your skills 
              and increase your earning potential.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
