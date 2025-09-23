# 🎫 PassMint

**Production-ready decentralized event ticketing platform with NFT tickets and mobile scanning**

PassMint empowers event organizers to create, sell, and manage tickets as NFTs while providing attendees with a seamless mobile experience for tickets and proof of attendance.

## ✨ Features

### For Organizers
- **Event Dashboard**: Create events, manage ticket tiers, track sales
- **Smart Ticketing**: ERC-721 NFT tickets with metadata
- **Payment Options**: Accept crypto (Web3) + fiat (Stripe/Coinbase Commerce)
- **Real-time Analytics**: Sales tracking, geographic insights, check-in rates
- **White-label Options**: Custom branding and embeddable widgets

### For Attendees
- **Seamless Purchase**: Buy tickets w/ crypto wallet or credit card
- **Mobile Wallet**: Scannable QR codes, ticket transfers
- **Proof of Attendance**: Automatic POA NFT airdrops after check-in
- **Offline Support**: QR verification without internet connection

### For Event Staff
- **Mobile Scanner**: Fast check-in with barcode scanning
- **Offline Mode**: Queue updates when internet is restored
- **Security**: Cryptographic signatures prevent ticket fraud

## 🏗️ Architecture

```
PassMint Monorepo
├── apps/
│   ├── web/           # Next.js organizer & attendee dashboard
│   └── mobile/        # React Native scanner + wallet app
├── packages/
│   ├── contracts/     # Solidity smart contracts (Foundry)
│   ├── server/        # Node.js API backend
│   ├── database/      # Prisma schema & migrations
│   └── ui/           # Shared UI components
└── .github/workflows/ # CI/CD automation
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker (for local database)
- Git

### 1. Clone & Install
```bash
git clone https://github.com/your-org/passmint.git
cd passmint
npm run setup
```

### 2. Environment Setup
```bash
# Copy environment templates
cp apps/web/.env.example apps/web/.env.local
cp packages/server/.env.example packages/server/.env
cp packages/contracts/.env.example packages/contracts/.env

# Configure your environment variables (see .env.example files)
```

### 3. Start Local Database
```bash
docker-compose up -d postgres redis
npm run db:migrate
```

### 4. Deploy Smart Contracts (Polygon Testnet)
```bash
cd packages/contracts
forge test  # Run tests first
npm run deploy:testnet
```

### 5. Start Development Servers
```bash
# Terminal 1: Backend API
cd packages/server && npm run dev

# Terminal 2: Web Dashboard  
cd apps/web && npm run dev

# Terminal 3: Mobile App (optional)
cd apps/mobile && npm run dev
```

### 6. Open Applications
- **Web Dashboard**: http://localhost:3000
- **API Documentation**: http://localhost:8000/docs
- **Mobile App**: Use Expo Go app and scan QR code

## 🎬 30-Second Demo Script

```bash
# 1. Create a demo event (2 mins)
curl -X POST localhost:8000/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Web3 Conference 2024",
    "date": "2024-02-15T18:00:00Z",
    "venue": "Convention Center",
    "ticketPrice": 50,
    "totalSupply": 100
  }'

# 2. Purchase ticket via API (30 secs)
curl -X POST localhost:8000/api/tickets/purchase \
  -H "Content-Type: application/json" \
  -d '{
    "eventId": "1",
    "paymentMethod": "crypto",
    "walletAddress": "0x..."
  }'

# 3. Scan ticket with mobile app
# Open mobile app → Scanner → Point at QR code → Verify ownership

# 4. Check-in attendee & mint POA
# Ticket marked as "used" + POA NFT airdropped automatically
```

## 🧪 Testing

### Smart Contracts
```bash
cd packages/contracts
forge test -vvv
forge coverage
```

### Backend API
```bash
cd packages/server
npm test
npm run test:e2e
```

### Frontend
```bash
cd apps/web
npm test
npm run test:e2e
```

### Mobile
```bash
cd apps/mobile
npm test
```

## 🚢 Deployment

### Production Checklist
- [ ] Smart contract audit completed
- [ ] Environment variables configured
- [ ] Payment processors setup (Stripe/Coinbase)
- [ ] Database backups enabled
- [ ] Monitoring & alerting configured
- [ ] Rate limiting enabled
- [ ] HTTPS/SSL certificates
- [ ] Error tracking (Sentry)

### Deploy Commands
```bash
# Web App (Vercel)
vercel --prod

# Backend API (Railway/Render)
railway up

# Mobile App (EAS Build)
cd apps/mobile && eas build --platform all
```

## 💰 Cost Estimates (Monthly)

### Infrastructure
- **Vercel Pro**: $20/month (web hosting)
- **Railway**: $25/month (API + database)  
- **Supabase Pro**: $25/month (auth + real-time)
- **IPFS Pinning**: $10/month (metadata storage)
- **Monitoring**: $15/month (Sentry + analytics)

### Blockchain Costs
- **Contract Deployment**: ~$50 (one-time)
- **Ticket Minting**: ~$0.01 per ticket (Polygon)
- **Check-in Transactions**: ~$0.005 per scan

**Total**: ~$145/month + usage-based blockchain fees

## 🔐 Security

### Smart Contract Security
- OpenZeppelin battle-tested contracts
- Reentrancy guards on all payable functions
- Access control for admin functions
- Pausable for emergency stops

### API Security
- JWT authentication
- Rate limiting (100 req/min per IP)
- Input validation & sanitization
- CORS properly configured

### Mobile Security
- Biometric unlock for wallet access
- Encrypted local storage
- Certificate pinning for API calls
- Offline signature verification

## 📚 Documentation

- [Smart Contract Documentation](./packages/contracts/README.md)
- [API Documentation](./packages/server/README.md)
- [Mobile App Guide](./apps/mobile/README.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.passmint.com](https://docs.passmint.com)
- **Discord**: [Join our community](https://discord.gg/passmint)
- **Email**: support@passmint.com

---

Built with ❤️ by the PassMint team