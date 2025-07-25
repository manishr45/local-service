# Tiffin Management System

A comprehensive digital platform connecting users with home chefs and tiffin service providers, streamlining the entire tiffin ordering, delivery, and management process.

## 🚀 Features

### For Customers
- **Easy Registration & Login**: Quick account creation with email/phone verification
- **Multiple Addresses**: Manage home, office, and other delivery locations
- **Smart Ordering**: One-time orders and flexible subscription plans
- **Order Tracking**: Real-time status updates from preparation to delivery
- **Dietary Preferences**: Set vegetarian, vegan, gluten-free preferences
- **Order History**: View and reorder from past orders
- **Rating & Reviews**: Rate food quality and delivery service

### For Vendors (Home Chefs)
- **Business Profile**: Showcase your kitchen and specialties
- **Menu Management**: Add, edit, and manage menu items with photos
- **Order Management**: Accept/decline orders with real-time notifications
- **Subscription Plans**: Create daily, weekly, monthly tiffin plans
- **Service Areas**: Define delivery zones and charges
- **Analytics Dashboard**: Track orders, earnings, and performance
- **Business Hours**: Set availability and holiday schedules

### For Administrators
- **Vendor Verification**: Approve and manage vendor registrations
- **User Management**: Monitor user accounts and resolve issues
- **Order Oversight**: Track all platform orders and handle disputes
- **Analytics & Reporting**: Platform-wide performance metrics
- **Content Management**: Manage promotional content and policies

## 🛠️ Technology Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Socket.io** for real-time updates
- **Cloudinary** for image storage
- **Nodemailer** for email notifications

### Frontend
- **React.js 18** with TypeScript support
- **Redux Toolkit** for state management
- **React Router v6** for navigation
- **Tailwind CSS** for styling
- **Headless UI** for accessible components
- **React Hook Form** for form handling
- **Framer Motion** for animations

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tiffin-management-system
   ```

2. **Install dependencies**
   ```bash
   npm run install-deps
   ```

3. **Set up environment variables**
   ```bash
   cp server/.env.example server/.env
   ```
   
   Fill in your environment variables:
   ```env
   MONGODB_URI=mongodb://localhost:27017/tiffin_management
   JWT_SECRET=your_super_secret_jwt_key
   PORT=5000
   CLIENT_URL=http://localhost:3000
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Backend server on http://localhost:5000
   - Frontend development server on http://localhost:3000

## 🏗️ Project Structure

```
tiffin-management-system/
├── server/                     # Backend API
│   ├── models/                # Database schemas
│   │   ├── User.js
│   │   ├── Vendor.js
│   │   ├── Order.js
│   │   └── Admin.js
│   ├── routes/                # API endpoints
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── vendors.js
│   │   ├── orders.js
│   │   └── admin.js
│   ├── middleware/            # Custom middleware
│   │   └── auth.js
│   ├── controllers/           # Route controllers
│   ├── utils/                # Utility functions
│   └── index.js              # Server entry point
├── client/                    # Frontend React app
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── store/           # Redux store & slices
│   │   ├── services/        # API service layer
│   │   ├── hooks/           # Custom React hooks
│   │   └── utils/           # Helper functions
│   ├── public/              # Static assets
│   └── package.json
└── package.json             # Root package.json
```

## 🔐 Authentication & Authorization

The system implements role-based access control with three user types:

- **Users**: Can place orders, manage profiles, and view order history
- **Vendors**: Can manage menus, accept orders, and view analytics
- **Admins**: Can manage users, vendors, and platform settings

JWT tokens are used for stateless authentication with 7-day expiration.

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

### User Endpoints
```
GET  /api/users/profile         # Get user profile
PUT  /api/users/profile         # Update user profile
POST /api/users/address         # Add new address
PUT  /api/users/address/:id     # Update address
DELETE /api/users/address/:id   # Delete address
```

### Vendor Endpoints
```
GET  /api/vendors               # Get all vendors
GET  /api/vendors/:id           # Get vendor details
PUT  /api/vendors/profile       # Update vendor profile
POST /api/vendors/menu          # Add menu item
PUT  /api/vendors/menu/:id      # Update menu item
DELETE /api/vendors/menu/:id    # Delete menu item
```

### Order Endpoints
```
POST /api/orders                # Create new order
GET  /api/orders                # Get user/vendor orders
GET  /api/orders/:id            # Get order details
PUT  /api/orders/:id/status     # Update order status
DELETE /api/orders/:id          # Cancel order
```

## 🎨 UI Components

The frontend uses a design system built with Tailwind CSS:

### Color Palette
- **Primary**: Orange tones (#f3770b) for main actions
- **Secondary**: Green tones (#22c55e) for success states
- **Neutral**: Gray scale for text and backgrounds
- **Status**: Red (danger), Yellow (warning), Green (success)

### Component Library
- Form inputs with validation
- Buttons with loading states
- Cards and modals
- Data tables and lists
- Navigation components
- Notification toasts

## 🔄 Real-time Features

Socket.io integration provides real-time updates for:
- Order status changes
- New order notifications for vendors
- Live chat support (planned)
- Delivery tracking (planned)

## 📊 Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String,
  phone: String,
  addresses: [AddressSchema],
  preferences: PreferenceSchema,
  // ... authentication fields
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
  // ... business details
}
```

### Orders Collection
```javascript
{
  orderNumber: String,
  user: ObjectId,
  vendor: ObjectId,
  items: [OrderItemSchema],
  deliveryAddress: AddressSchema,
  status: String,
  payment: PaymentSchema,
  // ... order details
}
```

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

## 🚀 Deployment

### Development
The project is configured for easy local development with hot reloading.

### Production
For production deployment:

1. **Build the frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Set production environment variables**
3. **Deploy to your preferred platform** (Heroku, Railway, Vercel, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Development Roadmap

### Phase 1 - MVP (Current)
- [x] Authentication system
- [x] Basic user/vendor/admin models
- [ ] Core ordering functionality
- [ ] Basic admin panel

### Phase 2 - Enhanced Features
- [ ] Payment integration
- [ ] Advanced order management
- [ ] Rating & review system
- [ ] Email notifications

### Phase 3 - Advanced Features
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Marketing features
- [ ] Multi-language support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Email: support@tiffinmanagement.com (example)
- Documentation: [Development Plan](DEVELOPMENT_PLAN.md)

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by the need to digitize traditional tiffin services
- Designed to empower home-based food entrepreneurs

---

**Note**: This is an active development project. Features and documentation are continuously being updated.

