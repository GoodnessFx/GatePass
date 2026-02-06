# GatePass 🎟️

> **The Decentralized Event Ticketing Platform for the Future**

GatePass is a modern, blockchain-inspired event ticketing platform that revolutionizes how events are created, managed, and attended. By bridging the gap between Web2 convenience and Web3 security, it provides a seamless experience for organizers and attendees alike.

---

## 🌟 Key Features

### 🎪 **For Organizers**
- **Intuitive Event Management**: Create and manage events with a guided, multi-step workflow.
- **Flexible Ticketing**: Define multiple ticket tiers, pricing strategies, and sale windows.
- **Real-Time Analytics**: Monitor sales, revenue, and attendee demographics in real-time.
- **Mobile Scanner**: Dedicated mobile scanner for seamless entry management and ticket validation.
- **Blockchain Publishing**: Securely publish events and mint NFT tickets.

### 🎫 **For Attendees**
- **Seamless Discovery**: Find events by category, niche, or location (with geolocation support).
- **Secure Purchasing**: Buy tickets using Crypto (ETH, MATIC), Credit Cards (Paystack, Flutterwave), or M-Pesa.
- **NFT Tickets**: Own your tickets as NFTs, enabling secure transfer and resale.
- **Proof of Attendance (POA)**: Earn unique digital badges for attending events.
- **Privacy First**: Join as an attendee without mandatory account creation for browsing.

---

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js, Prisma ORM
- **Database**: SQLite (Dev) / PostgreSQL (Prod)
- **Blockchain**: Solidity, Ethers.js (Polygon/Ethereum)
- **State Management**: React Hooks & Context
- **UI Components**: Radix UI, Lucide React, Shadcn/ui
- **Payments**: Paystack, Flutterwave, Crypto
- **Maps & Location**: Haversine Formula, Geolocation API

---

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/gatepass.git
    cd gatepass
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory (see `.env.example` if available) or set the following variables:
    ```env
    # Server
    PORT=3000
    DATABASE_URL="file:./dev.db"
    JWT_SECRET="your-super-secret-key"

    # Payments (Public Keys for Frontend)
    VITE_PAYSTACK_PUBLIC_KEY="pk_test_..."
    VITE_FLUTTERWAVE_PUBLIC_KEY="FLWPUBK_TEST-..."

    # Blockchain
    VITE_RPC_URL="https://polygon-rpc.com"
    ```

4.  **Database Setup**
    Initialize the database and generate the Prisma client:
    ```bash
    npx prisma generate --schema=./src/packages/database/schema.prisma
    npx prisma db push --schema=./src/packages/database/schema.prisma
    ```

5.  **Seed Data (Optional)**
    Seed the database with demo events (including external events from X/Facebook):
    ```bash
    npx ts-node src/packages/server/src/scripts/seedEvents.ts
    ```

6.  **Run the Application**
    Start the development server:
    ```bash
    npm run dev
    ```

---

## 📂 Project Structure

```
gatepass/
├── public/              # Static assets
├── src/
│   ├── components/      # React UI components
│   │   ├── ui/          # Reusable design system components
│   │   └── ...          # Feature-specific components
│   ├── packages/        # Monorepo-style packages
│   │   ├── database/    # Prisma schema and client
│   │   ├── server/      # Backend API logic
│   │   └── contracts/   # Solidity smart contracts
│   ├── services/        # API service layers
│   ├── utils/           # Helper functions (Payments, PDF, etc.)
│   ├── types/           # TypeScript definitions
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Entry point
├── vite.config.ts       # Vite configuration
└── package.json         # Project dependencies
```

---

## 🔒 Security & Payments

GatePass implements robust security measures:
- **RBAC**: Role-Based Access Control for Organizers and Admins.
- **Webhook Verification**: HMAC signature verification for all payment webhooks (Paystack/Flutterwave).
- **Secure Ticketing**: Cryptographically signed PDF tickets and on-chain NFT verification.

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.
