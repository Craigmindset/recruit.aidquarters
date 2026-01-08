# Aidquarter Recruitment Portal

A comprehensive web application for recruiting household professionals (Nannies, Caregivers, House Help, and Drivers) for the Aidquarter platform.

## Features

- **Header Navigation**: Home, Why Aidquarter, Recruitment, Support, and Login/Signup
- **Hero Section**: Inspired by the main Aidquarter site
- **Role-based Recruitment**: Cards for Nanny, Caregiver, House Help, and Drivers
- **Pre-registration Questionnaire**: 5-question screening process
- **Multi-step Signup Flow**:
  - Step 0: Questionnaire (qualification screening)
  - Step 1: Personal Information with email OTP verification
  - Step 2: Address, NIN, and Date of Birth
  - Step 3: Facial Verification
- **Form Caching**: Data is saved to localStorage to prevent data loss
- **Role-specific Requirements**: Different documentation requirements per role
- **Login System**: Secure authentication
- **User Dashboard**: Welcome screen with user information
- **Verification Pending Page**: 48-hour countdown timer for admin review

## Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

## Technology Stack

- **React 18**: UI library
- **React Router**: Navigation and routing
- **Tailwind CSS**: Styling and responsive design
- **Lucide React**: Icons
- **Vite**: Build tool and development server
- **LocalStorage**: Form caching and user session management

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation header
│   └── Footer.jsx          # Footer component
├── pages/
│   ├── HomePage.jsx        # Landing page with hero and cards
│   ├── WhyAidquarter.jsx   # Why choose platform page
│   ├── Recruitment.jsx     # Recruitment roles page
│   ├── Support.jsx         # Support/contact page
│   ├── SignupFlow.jsx      # Multi-step signup process
│   ├── LoginPage.jsx       # Login page
│   ├── Dashboard.jsx       # User dashboard
│   └── VerificationPending.jsx  # Admin verification countdown
├── App.jsx                 # Main app with routing
├── main.jsx               # Entry point
└── index.css              # Global styles
```

## Key Features Explained

### Questionnaire System

Before signup, users must answer 5 yes/no questions. All answers must be "Yes" to proceed.

### Email Verification

- Users receive OTP to their email
- Must verify email before completing signup
- OTP simulation included (6-digit code)

### Form Caching

- All form data is saved to localStorage
- Data persists if user leaves and returns
- Passwords are not cached for security
- Cache is cleared upon successful signup

### Role-based Requirements

Each role has specific documentation requirements:

- **Nanny**: Valid ID, Facial Verification, NIN, Guarantors, Age 18+, Health Cert, Childcare Experience
- **Caregiver**: Additional Medical Training and First Aid Certification
- **House Help**: Housekeeping Experience required
- **Driver**: Valid Driver's License and 3+ years driving experience

### Verification Process

- Facial verification (simulated)
- 48-hour countdown for admin review
- Progress tracking with visual indicators

## Usage

1. **Browse Roles**: View available positions on the home page
2. **Register**: Click "Register" on any role card
3. **Complete Questionnaire**: Answer all 5 questions with "Yes"
4. **Fill Personal Info**: Complete step 1 with email verification
5. **Add Address & NIN**: Complete step 2 with identity information
6. **Facial Verification**: Complete step 3 for biometric verification
7. **Login**: Sign in with your credentials
8. **Dashboard**: View welcome screen and application status
9. **Track Progress**: Monitor 48-hour verification countdown

## Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## Preview Production Build

```bash
npm run preview
```

## Notes

- This is a demo application with simulated backend functionality
- Data is stored in localStorage (not a real database)
- OTP verification is simulated
- Facial verification is simulated
- For production, integrate with a real backend API
