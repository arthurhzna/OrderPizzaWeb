# Pizza Ordering Web Application

A modern web application for ordering pizzas built with React, TypeScript, and Redux Toolkit. This application provides a seamless experience for users to browse menus, create orders, and manage their shopping cart.

## 🚀 Features

- **Interactive Menu**: Browse through available pizza options
- **Shopping Cart**: Add, update, and remove items from your cart
- **Order Management**: Create and track orders
- **User Management**: Create and manage user profiles
- **Responsive Design**: Built with Tailwind CSS for a mobile-first approach

## 🛠️ Technology Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Code Quality**: ESLint
- **Package Manager**: npm

## 📦 Project Structure
```plaintext
src/
├── features/ # Feature-based components
│ ├── cart/ # Shopping cart functionality
│ ├── menu/ # Menu display components
│ ├── order/ # Order management
│ └── user/ # User management
├── services/ # API services
├── ui/ # Reusable UI components
└── utils/ # Helper functions
```


## 🚦 Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
```

2. Navigate to the project directory
```bash
cd OrderPizzaWeb
```

3. Install dependencies
```bash
npm install
```

### Running the Application

#### Development Mode
```bash
npm run dev
```

#### Build for Production
```bash
npm run build
```

#### Preview Production Build
```bash
npm run preview
```

## 🔍 Available Routes

- `/` - Home page
- `/menu` - Pizza menu
- `/cart` - Shopping cart
- `/order/new` - Create new order
- `/order/:orderId` - View specific order

## 🧰 Main Components

- **AppLayout**: Main layout wrapper component
- **Menu**: Displays available pizza options
- **Cart**: Shopping cart management
- **CreateOrder**: Order creation form
- **Order**: Order details and status
- **Error**: Error handling component
- **Home**: Landing page component

## 🔧 Configuration Files

- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `eslint.config.js` - ESLint configuration

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details
