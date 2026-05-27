# 🛒 DataMart — Supermarket Management System

A full-featured **Supermarket Management System** built with **React** and **Vite**, designed to streamline day-to-day supermarket operations including billing, inventory tracking, delivery management, employee administration, and profit analytics.

> **Live Frontend:** Demo with username = 100 and password = 100 [DataMart](https://datamart-supermarket.netlify.app/)

> **Backend API:** Configured via environment variables (see [Getting Started](#-getting-started))

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Backend Repository](#-backend-repository)
- [Role-Based Access](#-role-based-access)
- [Screenshots](#-screenshots)
- [License](#-license)

---

## ✨ Features

### 🔐 Authentication & Authorization
- Employee login with ID and password
- Role-based access control (**Admin**, **Manager**, **Cashier**)
- Persistent sessions via `localStorage`
- Real-time session invalidation through WebSockets — employees are automatically logged out when their status changes

### 🧾 Billing
- Add products by ID and quantity to build a bill
- Server-side bill generation with automatic price, discount, and total calculation
- Customer details input (name, phone number)
- Print-ready bill with formatted layout (A4-optimized)
- Payment processing and bill saving

### 📦 Stock Management
- View all currently available products with live quantity, selling price, discount, and expiry date
- Color-coded status indicators:
  - 🟢 **Green** — Healthy stock
  - 🟡 **Yellow** — Low stock (< 10 units)
  - 🔴 **Red** — Expiring soon (≤ 5 days)
- Expired stock history with loss tracking
- **Real-time updates** via WebSocket — stock changes from billing or deliveries are reflected instantly

### 🚚 Delivery Management
- Manage **suppliers** — add new suppliers with ID, name, category, and contact
- Record **deliveries** — log incoming goods with cost price, selling price, expenses, and expiry date
- View all delivery history and filter deliveries by supplier
- Click on a supplier card to see all their delivery records in a modal

### 👥 Employee Management *(Admin only)*
- View all active employees in a table format
- **Add** new employees with ID, name, designation, daily wage, and password
- **Edit** existing employee details — fetch by ID, modify fields, and update
- **Delete** employees from the system
- Real-time status enforcement — changing an employee's status triggers automatic logout via WebSocket

### 📊 Profits & Analytics Dashboard
- **Summary cards** — Total sales expenses, revenue, sales profit, and expired loss
- **Date range filter** — Analyze profits for any custom period (default: last 30 days)
- Interactive charts powered by **Recharts**:
  - 📊 Sales profit by category (Bar chart)
  - 📈 Profit trend over time (Line chart)
  - 🥧 Category profit contribution (Pie chart)
  - 📊 Expired loss by category (Bar chart)
  - 🥧 Expired loss category breakdown (Pie chart)
- **Product-level tables** — Profit and loss breakdown per product
- **Monthly stats** — Profit vs. loss comparison by month for a selected year
- **Yearly stats** — Year-over-year profit and loss comparison
- Click any chart to view in **fullscreen modal**
- **Real-time refresh** — Charts update live when stock changes via WebSocket

---

## 🛠 Tech Stack

| Layer        | Technology                                                        |
|--------------|-------------------------------------------------------------------|
| **Frontend** | [React 19](https://react.dev/) + [Vite 7](https://vitejs.dev/)   |
| **Routing**  | [React Router DOM v7](https://reactrouter.com/)                   |
| **Charts**   | [Recharts](https://recharts.org/)                                 |
| **HTTP**     | [Axios](https://axios-http.com/)                                  |
| **Real-time**| [Socket.IO Client](https://socket.io/)                            |
| **Icons**    | [Font Awesome 6](https://fontawesome.com/)                        |
| **Styling**  | Vanilla CSS (custom per module)                                   |

---

## 📁 Project Structure

```
SuperMarket/
├── index.html              # Entry HTML file
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── eslint.config.js        # ESLint configuration
├── Report.pdf              # Project report document
├── dist/                   # Production build output
├── public/                 # Static public assets
└── src/
    ├── main.jsx            # React DOM entry point
    ├── App.jsx             # Root component with routing & auth
    ├── auth.jsx            # AuthContext provider (login, logout, WebSocket session)
    ├── login.jsx           # Login page
    ├── login.css
    ├── home.jsx            # Dashboard home with navigation cards
    ├── home.css
    ├── billing.jsx         # Billing & invoice generation
    ├── billing.css
    ├── stock.jsx           # Stock inventory management
    ├── stock.css
    ├── delivery.jsx        # Supplier & delivery management
    ├── delivery.css
    ├── employee.jsx        # Employee CRUD operations
    ├── employee.css
    ├── profit.jsx          # Analytics dashboard with charts
    ├── profit.css
    ├── index.css           # Global styles
    └── assets/             # Images and icons
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kv-18-vk/SuperMarket.git
   cd SuperMarket
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**  
   Create a `.env` file in the project root (refer to `.env.example`):
   ```env
   VITE_BACKEND_URL=http://localhost:5000
   ```
   Replace the URL with your deployed backend URL if applicable.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**  
   Navigate to the URL shown in the terminal (typically `http://localhost:5173`)

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🔗 Backend Repository

> The backend server (REST API + WebSocket) is maintained in a **separate repository**.

### 👉 [SuperMarket_Backend](https://github.com/kv-18-vk/SuperMarket_Backend)

The backend handles:
- **REST API** — All CRUD operations for billing, stock, deliveries, employees, suppliers, and profit analytics
- **WebSocket (Socket.IO)** — Real-time events for stock updates (`stockUpdated`) and employee status changes (`statusChanged`)
- **Database** — Data persistence and query execution
- **Authentication** — Employee credential verification

> The frontend connects to the backend via the `VITE_BACKEND_URL` environment variable configured in your `.env` file.

---

## 🔒 Role-Based Access

| Module       | Admin | Manager | Cashier |
|--------------|:-----:|:-------:|:-------:|
| **Billing**  |  ✅   |   ✅    |   ✅    |
| **Stock**    |  ✅   |   ✅    |   ❌    |
| **Delivery** |  ✅   |   ✅    |   ❌    |
| **Employee** |  ✅   |   ❌    |   ❌    |
| **Profits**  |  ✅   |   ✅    |   ❌    |

---

## 📸 Screenshots & Database Information

> For detailed screenshots of the application, as well as the **ER model**, **ER diagram**, and comprehensive information about the database schema and architecture, please refer to the **[Report.pdf](./Report.pdf)** included in this repository.

---

## 📄 License

This project is for educational and demonstration purposes.
