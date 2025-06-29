TutorLink/
├── app/                             # Core navigation and screens
│   ├── _layout.jsx                 # Drawer navigator setup
│   ├── index.jsx                   # Home screen (Tutor Feed)
│   └── screens/                    # All app screens
│       ├── Login.jsx              # User login
│       ├── SignUp.jsx             # User registration
│       ├── ForgotPassword.jsx     # Password recovery
│       ├── Profile.jsx            # View/edit user profile
│       ├── EditProfile.jsx        # Form to update profile
│       ├── TutorDetails.jsx       # Detailed tutor profile view
│       ├── Favorites.jsx          # Favorited tutors list
│       ├── Bookings.jsx           # List of booked sessions
│       ├── BookingForm.jsx        # Form to book a session
│       ├── Messages.jsx           # Chat list screen
│       ├── ChatRoom.jsx           # Individual conversation screen
│       ├── Reviews.jsx            # User reviews given/received
│       ├── Settings.jsx           # General and account settings
│       ├── Notifications.jsx      # In-app notifications screen
│       ├── PaymentMethods.jsx     # Manage credit/debit cards
│       ├── Transactions.jsx       # Payment history
│       ├── AdminDashboard.jsx     # Admin panel (if needed)
│       ├── ManageUsers.jsx        # Admin - manage tutors/students
│       └── HelpCenter.jsx         # FAQs or contact support
│
├── components/                     # Reusable UI parts
│   ├── Header.jsx                 # App header with search/menu
│   ├── TutorCard.jsx             # Card for listing tutor
│   ├── SearchBar.jsx             # Search input component
│   ├── ChatBubble.jsx            # Chat message bubble
│   ├── NotificationItem.jsx      # A single notification card
│   ├── ReviewCard.jsx            # Shows reviews and ratings
│   ├── BookingItem.jsx           # Booking summary component
│   ├── ProfileAvatar.jsx         # Profile image circle component
│   └── DrawerContent.jsx         # Optional: custom drawer
│
├── assets/
│   └── images/
│       ├── Logo.png              # App logo
│       ├── DefaultAvatar.png     # Fallback user profile image
│       └── Illustrations/        # Optional UI illustrations
│
├── constants/
│   ├── colors.js                 # Color palette
│   └── icons.js                  # Commonly used icons
│
├── utils/
│   ├── api.js                    # API calls and services
│   ├── auth.js                   # Auth utility functions
│   └── helpers.js                # Generic helper functions
│
├── context/
│   ├── AuthContext.js            # Auth state management
│   ├── ThemeContext.js           # Theme/dark mode toggle
│   └── ChatContext.js            # Chat data sharing
│
├── hooks/
│   ├── useAuth.js                # Custom hook for authentication
│   ├── useBookings.js            # Booking-related logic
│   └── useNotifications.js       # Notification logic
│
├── navigation/
│   └── DrawerNavigator.js        # Drawer setup (if abstracted)
│
├── .env                          # Secrets and environment variables
├── app.config.js                 # Expo app config
├── README.md                     # Project overview
└── STRUCTURE.md                  # (This file)
