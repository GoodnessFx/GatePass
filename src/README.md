# 🎫 GatePass

**Production-ready decentralized event ticketing platform with NFT tickets and mobile scanning**

GatePass empowers event organizers to create, sell, and manage tickets as NFTs while providing attendees with a seamless mobile experience for tickets and proof of attendance.

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
GatePass Monorepo
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

