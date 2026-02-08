# GatePass - Decentralized Event Ticketing Platform

GatePass is a next-generation event ticketing platform that leverages blockchain technology (NFTs) to provide secure, verifiable, and transferable tickets. It bridges the gap between Web2 convenience and Web3 security, offering a seamless experience for both organizers and attendees.

![GatePass Banner](https://via.placeholder.com/1200x400?text=GatePass+Event+Platform)

## 🚀 Features

### For Attendees
- **Seamless Onboarding**: Login with Email (Magic Link), Google, Twitter, or Web3 Wallet.
- **Easy Purchasing**: Buy tickets using Fiat (Card, Bank Transfer, Mobile Money) or Crypto.
- **NFT Tickets**: Receive tickets as NFTs (Polygon) for true ownership and collectibility.
- **Transfer & Resell**: Securely transfer tickets to friends or resell on the secondary market.
- **Real-time Updates**: Receive notifications for event updates, sales, and more.

### For Organizers
- **Event Management**: Create and manage events (Physical, Virtual, Hybrid).
- **Dashboard**: Real-time analytics on sales, revenue, and attendance.
- **Ticket Tiers**: Create multiple ticket categories (VIP, Regular, Early Bird).
- **Verification**: Verify tickets using the built-in QR code scanner.
- **Payouts**: Receive payouts in Fiat or Crypto.

## 🏗 Architecture

GatePass follows a modern microservices-inspired architecture, separating the Frontend, Backend API, and Blockchain interactions.

```mermaid
graph TD
    subgraph Client
        Web[Web App (React/Vite)]
        Mobile[Mobile App (React Native)]
    end

    subgraph Backend
        LB[Load Balancer]
        API[API Server (Express/Node.js)]
        Worker[Background Workers (Bull/Redis)]
    end

    subgraph Data
        DB[(PostgreSQL/SQLite)]
        Redis[(Redis Cache)]
    end

    subgraph External
        Blockchain[Polygon Network]
        Paystack[Paystack/Flutterwave]
        Email[Email Service]
        IPFS[IPFS Storage]
    end

    Web --> LB
    Mobile --> LB
    LB --> API
    API --> DB
    API --> Redis
    API --> Worker
    Worker --> Blockchain
    Worker --> Email
    API --> Paystack
    Worker --> IPFS
```

## 🛠 Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Shadcn UI, Framer Motion.
- **Backend**: Node.js, Express, TypeScript.
- **Database**: Prisma ORM, SQLite (Dev) / PostgreSQL (Prod).
- **Blockchain**: Ethers.js, Solidity (Smart Contracts), Polygon.
- **State Management**: React Query, Zustand.
- **Authentication**: JWT, Passport.js (Social Login).

## 🏁 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or pnpm

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/gatepass.git
    cd gatepass
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables**
    Copy `.env.example` to `.env` in `src/packages/server` and root.
    ```bash
    cp src/packages/server/.env.example src/packages/server/.env
    cp .env.example .env
    ```

4.  **Database Setup**
    Initialize the database and seed it with demo data.
    ```bash
    cd src/packages/server
    npx prisma migrate dev
    npx tsx src/scripts/seedEvents.ts
    ```

5.  **Run the Application**
    Start both the backend and frontend servers.

    **Backend:**
    ```bash
    cd src/packages/server
    npm run dev
    ```

    **Frontend:**
    ```bash
    # Open a new terminal
    npm run dev
    ```

6.  **Access the App**
    - Frontend: [http://localhost:3000](http://localhost:3000)
    - Backend API: [http://localhost:8000](http://localhost:8000)
    - API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

## 🧪 Testing

To run the test suite:

```bash
cd src/packages/server
npm test
```

## 🔧 Troubleshooting

-   **Database Errors**: If you encounter database errors, try resetting the database:
    ```bash
    npx prisma migrate reset
    ```
-   **Port Conflicts**: Ensure ports 8000 (server) and 5173 (frontend) are free.
-   **Dependency Issues**: If `npm install` fails, try deleting `node_modules` and `package-lock.json` and reinstalling.

## 📄 API Documentation

The API documentation is available at `http://localhost:8000/docs` when the server is running. It provides detailed endpoints for Events, Orders, Auth, and Notifications.

## 🔒 Security

- **JWT Authentication**: Secure stateless authentication.
- **Webhook Verification**: HMAC signature verification for payment gateways.
- **Rate Limiting**: Protection against DDoS and brute force.
- **Input Validation**: Joi/Zod validation for all inputs.

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
