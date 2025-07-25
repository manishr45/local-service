# 🍱 Tiffin Management System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green.svg)](https://mongodb.com)

A comprehensive digital platform connecting users with home chefs and tiffin service providers, streamlining the entire tiffin ordering, delivery, and management process.

## 🌟 Project Overview

The Tiffin Management System aims to modernize traditional tiffin services by providing a digital platform that connects customers with home-based food vendors. This system facilitates seamless ordering, delivery tracking, subscription management, and business analytics.

## 🚀 Features

### 👥 For Customers
- **Easy Registration & Login**: Quick account creation with email/phone verification
- **Multiple Addresses**: Manage home, office, and other delivery locations
- **Smart Ordering**: One-time orders and flexible subscription plans
- **Order Tracking**: Real-time status updates from preparation to delivery
- **Dietary Preferences**: Set vegetarian, vegan, gluten-free preferences
- **Order History**: View and reorder from past orders
- **Rating & Reviews**: Rate food quality and delivery service

### 👨‍🍳 For Vendors (Home Chefs)
- **Business Profile**: Showcase your kitchen and specialties
- **Menu Management**: Add, edit, and manage menu items with photos
- **Order Management**: Accept/decline orders with real-time notifications
- **Subscription Plans**: Create daily, weekly, monthly tiffin plans
- **Service Areas**: Define delivery zones and charges
- **Analytics Dashboard**: Track orders, earnings, and performance
- **Business Hours**: Set availability and holiday schedules

### 🛡️ For Administrators
- **Vendor Verification**: Approve and manage vendor registrations
- **User Management**: Monitor user accounts and resolve issues
- **Order Oversight**: Track all platform orders and handle disputes
- **Analytics & Reporting**: Platform-wide performance metrics
- **Content Management**: Manage promotional content and policies

## 🛠️ Technology Stack

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for secure authentication
- **Socket.io** for real-time updates
- **Cloudinary** for image storage
- **Nodemailer** for email notifications
- **Bcrypt** for password hashing
- **Helmet** for security headers

### Frontend
- **React.js 18** with functional components
- **Redux Toolkit** for state management
- **React Router v6** for navigation
- **Tailwind CSS** for styling
- **Headless UI** for accessible components
- **React Hook Form** for form handling
- **Framer Motion** for animations
- **Axios** for API calls

### Development Tools
- **Nodemon** for backend hot reloading
- **Concurrently** for running multiple processes
- **ESLint** for code linting
- **Prettier** for code formatting

## 📦 Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn** package manager
- **Git** for version control

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/manishr45/local-service.git
   cd local-service
   ```

2. **Run the automated setup script**
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

3. **Manual setup (if preferred)**
   ```bash
   # Install root dependencies
   npm install
   
   # Install server dependencies
   cd server && npm install && cd ..
   
   # Install client dependencies
   cd client && npm install && cd ..
   ```

4. **Configure environment variables**
   ```bash
   cp server/.env.example server/.env
   ```
   
   Edit `server/.env` with your configuration:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/tiffin_management
   
   # JWT Secret (use a strong secret in production)
   JWT_SECRET=your_super_secret_jwt_key_here
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Cloudinary (for image uploads)
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   
   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   
   # Frontend URL
   CLIENT_URL=http://localhost:3000
   ```

5. **Start the development servers**
   ```bash
   npm run dev
   ```
   
   This will start:
   - Backend server on http://localhost:5000
   - Frontend development server on http://localhost:3000

## 🏗️ Project Structure

```
tiffin-management-system/
├── 📁 server/                     # Backend API
│   ├── 📁 models/                # Database schemas
│   │   ├── 📄 User.js           # Customer model
│   │   ├── 📄 Vendor.js         # Home chef model
│   │   ├── 📄 Order.js          # Order management model
│   │   └── 📄 Admin.js          # Admin model
│   ├── 📁 routes/                # API endpoints
│   │   ├── 📄 auth.js           # Authentication routes
│   │   ├── 📄 users.js          # User management routes
│   │   ├── 📄 vendors.js        # Vendor management routes
│   │   ├── 📄 orders.js         # Order management routes
│   │   └── 📄 admin.js          # Admin routes
│   ├── 📁 middleware/            # Custom middleware
│   │   └── 📄 auth.js           # Authentication middleware
│   ├── 📁 controllers/           # Route controllers
│   ├── 📁 utils/                # Utility functions
│   ├── 📄 .env.example         # Environment variables template
│   ├── 📄 package.json         # Server dependencies
│   └── 📄 index.js             # Server entry point
├── 📁 client/                    # Frontend React app
│   ├── 📁 src/
│   │   ├── 📁 components/       # Reusable UI components
│   │   │   ├── 📁 Layout/       # Layout components
│   │   │   ├── 📁 UI/           # UI components
│   │   │   └── 📁 Auth/         # Authentication components
│   │   ├── 📁 pages/           # Page components
│   │   ├── 📁 store/           # Redux store & slices
│   │   │   └── 📁 slices/      # Redux slices
│   │   ├── 📁 services/        # API service layer
│   │   ├── 📁 hooks/           # Custom React hooks
│   │   └── 📁 utils/           # Helper functions
│   ├── 📁 public/              # Static assets
│   ├── 📄 package.json         # Client dependencies
│   └── 📄 tailwind.config.js   # Tailwind configuration
├── 📄 package.json             # Root package.json
├── 📄 setup.sh                 # Automated setup script
├── 📄 README.md                # Project documentation
└── 📄 DEVELOPMENT_PLAN.md      # Detailed development roadmap
```

## 🔐 Authentication & Authorization

The system implements a robust authentication system with role-based access control:

### User Roles
- **Customers**: Can place orders, manage profiles, and view order history
- **Vendors**: Can manage menus, accept orders, and view analytics
- **Admins**: Can manage users, vendors, and platform settings

### Security Features
- JWT tokens with 7-day expiration
- Password hashing with bcrypt
- Rate limiting on authentication routes
- Protected routes with role verification
- CORS configuration for API security

## 📱 API Documentation

### Authentication Endpoints
```
POST /api/auth/register/user     # Register new customer
POST /api/auth/register/vendor   # Register new vendor
POST /api/auth/login            # Login (all user types)
GET  /api/auth/me               # Get current user profile
POST /api/auth/change-password  # Change password
POST /api/auth/logout           # Logout
```

### User Management
```
GET  /api/users/profile         # Get user profile
PUT  /api/users/profile         # Update user profile
POST /api/users/address         # Add new address
PUT  /api/users/address/:id     # Update address
DELETE /api/users/address/:id   # Delete address
```

### Vendor Management
```
GET  /api/vendors               # Get all vendors
GET  /api/vendors/:id           # Get vendor details
PUT  /api/vendors/profile       # Update vendor profile
POST /api/vendors/menu          # Add menu item
PUT  /api/vendors/menu/:id      # Update menu item
DELETE /api/vendors/menu/:id    # Delete menu item
```

### Order Management
```
POST /api/orders                # Create new order
GET  /api/orders                # Get user/vendor orders
GET  /api/orders/:id            # Get order details
PUT  /api/orders/:id/status     # Update order status
DELETE /api/orders/:id          # Cancel order
```

## 🎨 UI/UX Design

### Design System
- **Primary Color**: Orange (#f3770b) for main actions and branding
- **Secondary Color**: Green (#22c55e) for success states and positive actions
- **Neutral Colors**: Gray scale for text, backgrounds, and borders
- **Status Colors**: Red (danger), Yellow (warning), Green (success)

### Component Library
- Responsive form inputs with validation
- Interactive buttons with loading states
- Information cards and modals
- Data tables and lists
- Navigation components
- Toast notifications

## 🧪 Testing

### Backend Testing
```bash
cd server
npm test
```

### Frontend Testing
```bash
cd client
npm test
```

### End-to-End Testing
```bash
npm run test:e2e
```

## 📊 Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  phone: String (unique),
  addresses: [AddressSchema],
  preferences: {
    dietaryRestrictions: [String],
    spiceLevel: String,
    cuisinePreferences: [String]
  },
  // ... authentication and verification fields
}
```

### Vendors Collection
```javascript
{
  businessName: String,
  kitchenAddress: AddressSchema,
  menuItems: [MenuItemSchema],
  subscriptionPlans: [PlanSchema],
  serviceAreas: [ServiceAreaSchema],
  verificationStatus: String,
  rating: { average: Number, count: Number },
  // ... business and financial details
}
```

### Orders Collection
```javascript
{
  orderNumber: String (unique),
  user: ObjectId (ref: User),
  vendor: ObjectId (ref: Vendor),
  items: [OrderItemSchema],
  deliveryAddress: AddressSchema,
  status: String,
  payment: PaymentSchema,
  subscription: SubscriptionSchema,
  // ... order tracking and details
}
```

## 🚀 Deployment

### Development Environment
The project is configured for easy local development with hot reloading and automatic restarts.

### Production Deployment

1. **Build the frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Set production environment variables**
   ```bash
   export NODE_ENV=production
   export MONGODB_URI=your_production_mongodb_uri
   export JWT_SECRET=your_production_jwt_secret
   ```

3. **Deploy to cloud platform** (Heroku, Railway, Vercel, DigitalOcean, etc.)

### Recommended Hosting
- **Backend**: Railway, Heroku, or DigitalOcean App Platform
- **Database**: MongoDB Atlas
- **Frontend**: Vercel, Netlify, or serve from backend
- **Images**: Cloudinary or AWS S3

## 📈 Development Status

### ✅ Completed Features
- [x] Complete project structure setup
- [x] Backend API with Express.js and MongoDB
- [x] User, Vendor, Order, and Admin data models
- [x] JWT-based authentication system
- [x] Role-based access control
- [x] Frontend React application with Redux
- [x] Responsive UI with Tailwind CSS
- [x] Protected routes and authorization
- [x] Real-time capabilities setup (Socket.io)
- [x] Development environment configuration

### 🚧 In Progress
- [ ] Complete backend API routes implementation
- [ ] Functional login/register forms with validation
- [ ] Order placement and management system
- [ ] Vendor menu management interface
- [ ] Admin panel for vendor approval

### 📋 Upcoming Features
- [ ] Payment gateway integration
- [ ] Email notification system
- [ ] Advanced order tracking
- [ ] Rating and review system
- [ ] Mobile app development (React Native)
- [ ] Advanced analytics and reporting

## 🤝 Contributing

We welcome contributions to the Tiffin Management System! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes and commit**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow the established code structure and naming conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Follow the UI/UX design system

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support & Contact

- **GitHub Issues**: [Create an issue](https://github.com/manishr45/local-service/issues)
- **Email**: support@tiffinmanagement.com (example)
- **Documentation**: [Development Plan](DEVELOPMENT_PLAN.md)

## 🙏 Acknowledgments

- Built with modern web technologies and best practices
- Inspired by the need to digitize traditional tiffin services
- Designed to empower home-based food entrepreneurs
- Community-driven development approach

## 📚 Additional Resources

- [Development Plan](DEVELOPMENT_PLAN.md) - Detailed feature roadmap
- [API Documentation](docs/API.md) - Complete API reference
- [Deployment Guide](docs/DEPLOYMENT.md) - Production deployment instructions
- [Contributing Guidelines](CONTRIBUTING.md) - How to contribute to the project

---

**🎯 Mission**: To create a comprehensive platform that bridges the gap between home chefs and food lovers, making homemade meals accessible to everyone while empowering local food entrepreneurs.

**🌟 Vision**: To become the leading platform for home-based food services, fostering community connections through food.

---

<div align="center">

**Built with ❤️ for the community**

[⭐ Star this repo](https://github.com/manishr45/local-service) | [🐛 Report Bug](https://github.com/manishr45/local-service/issues) | [💡 Request Feature](https://github.com/manishr45/local-service/issues)

</div>

