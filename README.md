# GatePass

GatePass is a  blockchain-inspired event ticketing platform that revolutionizes how events are created, managed, and attended. Built with modern web technologies, it provides a seamless experience for both event organizers and attendees without traditional authentication barriers.


## 🎯 Core Features

### 🎪 **Event Management**
- **Multi-step Event Creation**: Guided workflow with progress tracking
- **Event Details**: Title, category, venue, address, website, image upload
- **Date & Time Management**: Manual input + calendar selection for start/end dates and times
- **Ticket Tier Configuration**: Multiple tiers with pricing, quantity limits, and sale windows
- **Advanced Settings**: Transfer policies, royalties, whitelist, KYC requirements, refunds, private events
- **Event Publishing**: Deploy events with blockchain integration

### 🎫 **Ticketing System**
- **Smart Ticket Generation**: Blockchain-based NFT tickets with metadata
- **QR Code Integration**: Secure, scannable tickets with cryptographic verification
- **Ticket Transfer**: Peer-to-peer ticket transfers and resale capabilities
- **Proof of Attendance (POA)**: Automatic NFT badges minted upon event check-in
- **Secure PDF Generation**: Downloadable ticket PDFs with security features

### 👥 **User Experience**
- **Role-Based Access**: Direct selection as Attendee or Organizer (no signup required)
- **Attendee Dashboard**: Ticket management, POA badge gallery, event browsing
- **Organizer Dashboard**: Event creation, analytics, scanner access
- **Mobile-First Design**: Responsive UI optimized for all devices
- **Dark/Light Theme**: Toggle between themes with persistent preferences

### 🔍 **Event Discovery**
- **Advanced Search**: Text-based event search with real-time filtering
- **Category Filtering**: Browse by event categories (Conference, Workshop, Festival, etc.)
- **Niche Selection**: Filter by specialized niches (AI, Startup, Tech, etc.)
- **Location-Based Discovery**: Geolocation sync with radius filtering (5-50km)
- **Distance Display**: Show approximate distance and city for nearby events

### 💳 **Payment Processing**
- **Multiple Payment Methods**: Crypto wallets, Paystack, Flutterwave, M-Pesa
- **Real-time Pricing**: Dynamic pricing with fees, taxes, and discount calculations
- **Seasonal Promotions**: Automatic discount detection and promo code application
- **Secure Checkout**: PCI-compliant payment processing with receipt generation
- **Multi-currency Support**: NGN, USD, GHS, KES, ZAR ,MPesaand more

### 📱 **Mobile Scanner**
- **QR Code Scanning**: Fast ticket validation with camera integration
- **Offline Verification**: Cryptographic signature validation without internet
- **Batch Check-in**: Multiple ticket processing for event staff
- **Real-time Status**: Live ticket validation with fraud detection
- **Staff Management**: Organizer and staff check-in capabilities

### 📊 **Analytics & Insights**
- **Sales Tracking**: Revenue, ticket sales, and conversion metrics
- **Attendee Analytics**: Check-in rates, geographic distribution, demographics
- **Real-time Dashboards**: Live event performance monitoring
- **Financial Reports**: Detailed revenue breakdowns and fee calculations
- **Event Performance**: Attendance tracking and engagement metrics

### 🔗 **Blockchain Integration**
- **Smart Contracts**: Solidity contracts for ticket minting and POA generation
- **Wallet Connection**: Web3 wallet integration with address display
- **NFT Tickets**: ERC-721 compliant tickets with transferable ownership
- **Proof of Attendance**: Automatic POA NFT minting upon check-in
- **Fraud Prevention**: Blockchain-based ownership verification

### 🎨 **User Interface**
- **Modern Design**: Clean, intuitive interface with consistent styling
- **Accessibility**: Keyboard navigation, screen reader support, ARIA labels
- **Notifications**: Toast notifications with Sonner for user feedback
- **Loading States**: Progress indicators and skeleton loading
- **Error Handling**: Graceful error states with recovery options

### 🔧 **Developer Features**
- **Component Library**: Reusable UI components (buttons, cards, inputs, calendars)
- **Type Safety**: Full TypeScript implementation
- **Hot Reload**: Vite development server with instant updates
- **Build Optimization**: Production-ready builds with code splitting
- **Testing Framework**: Comprehensive test suite for contracts and components

## 🚀 Detailed Feature Breakdown

### **Landing Page & Navigation**
- **Hero Section**: Compelling value proposition with call-to-action buttons
- **Role Selection**: Direct "Join as Attendee" or "Join as Organizer" without signup
- **Feature Showcase**: Interactive cards highlighting key platform benefits
- **Seasonal Promotions**: Dynamic promotion banners with discount codes
- **Social Proof**: Testimonials and platform statistics
- **Footer**: Links, social media, newsletter signup, and company information

### **Header & Navigation**
- **Role Badge**: Clear indication of current user role (Attendee/Organizer)
- **Theme Toggle**: Switch between dark and light modes with persistence
- **Wallet Status**: Connect/disconnect Web3 wallets with address display
- **Notifications**: Bell icon for system notifications and updates
- **User Menu**: Logout, settings, and profile management
- **Home Navigation**: Quick return to dashboard or landing page

### **Event Creation Workflow (Organizers)**
**Step 1: Event Details**
- Event title, description, and category selection
- Venue name, full address, and website URL
- Event image upload with preview
- Event type and visibility settings

**Step 2: Date & Time**
- Start/end date with manual input and calendar picker
- Start/end time with timezone selection
- Duration calculation and validation
- Recurring event options

**Step 3: Ticket Configuration**
- Multiple ticket tiers with custom names
- Individual pricing, quantity limits, and availability windows
- Maximum tickets per person restrictions
- Early bird and VIP tier options

**Step 4: Advanced Settings**
- Ticket transfer and resale policies
- Royalty percentages for secondary sales
- Whitelist and KYC requirements
- Refund policies and deadlines
- Private event access controls

### **Attendee Dashboard**
**Ticket Management**
- Active tickets with QR codes and seat information
- Ticket status tracking (confirmed, pending, attended)
- Quick actions: view details, download PDF, transfer
- Upcoming events timeline with countdown timers

**POA Badge Gallery**
- Collectible NFT badges from attended events
- Rarity indicators (Common, Rare, Epic, Legendary)
- Badge descriptions and achievement details
- Social sharing capabilities

**Quick Actions**
- Browse events shortcut
- Wallet connection status
- Recent activity feed

### **Event Discovery & Purchase**
**Search & Filtering**
- Real-time text search across event titles and descriptions
- Category dropdown (Conference, Workshop, Festival, Concert, etc.)
- Niche filtering (AI, Startup, Tech, Arts, Sports, etc.)
- Date range selection
- Price range filtering

**Location Features**
- "Use My Location" button for geolocation access
- Radius selection (Any, 5km, 10km, 25km, 50km)
- Distance display on event cards
- City and venue information

**Event Cards**
- High-quality event images with overlay information
- Event title, date, time, and venue
- Price range and availability status
- Category and niche badges
- Distance indicator (when location is enabled)
- Quick purchase buttons

**Purchase Flow**
- Ticket tier selection with detailed descriptions
- Quantity selection with real-time pricing
- Promotional code input with validation
- Payment method selection (crypto/fiat)
- Secure checkout with receipt generation
- Automatic PDF ticket generation

### **Payment System**
**Supported Methods**
- Cryptocurrency wallets (MetaMask, WalletConnect)
- Paystack (Nigeria, Ghana, South Africa)
- Flutterwave (Multi-country support)
- M-Pesa (Kenya, Tanzania)

**Pricing Features**
- Dynamic fee calculation (2.5% platform fee)
- Tax calculation based on location
- Seasonal discount application
- Multi-currency support with real-time conversion
- Transparent pricing breakdown

**Security**
- PCI DSS compliant payment processing
- Encrypted transaction data
- Fraud detection and prevention
- Secure token storage

### **Mobile Scanner (Event Staff)**
**Scanning Capabilities**
- Camera-based QR code scanning
- Batch ticket processing
- Offline signature verification
- Real-time validation feedback

**Staff Features**
- Organizer and staff check-in modes
- Ticket status updates
- Attendee information display
- Check-in history and logs

**Security Features**
- Cryptographic signature validation
- Duplicate ticket detection
- Fraud prevention alerts
- Secure offline operation

### **Analytics Dashboard (Organizers)**
**Sales Metrics**
- Total revenue and ticket sales
- Conversion rates and funnel analysis
- Payment method breakdown
- Refund and chargeback tracking

**Attendee Insights**
- Geographic distribution maps
- Check-in rates and timing
- Demographic analysis
- Engagement metrics

**Performance Tracking**
- Real-time event monitoring
- Capacity utilization
- Revenue per attendee
- Marketing campaign effectiveness

### **Blockchain Features**
**Smart Contracts**
- Event ticket factory contracts
- Individual event ticket contracts
- Proof of Attendance (POA) contracts
- Automated royalty distribution

**NFT Integration**
- ERC-721 compliant tickets
- Metadata storage on IPFS
- Automatic POA minting upon check-in
- Secondary market support

**Wallet Integration**
- Web3 wallet connection
- Transaction signing
- Balance display
- Network switching support

## Tech Stack

- Frontend
  - React + TypeScript
  - Vite (dev server and build)
  - UI components under `src/components/ui` (button, card, input, select, tabs, popover, calendar, etc.)
  - Icons: `lucide-react`
  - Notifications: `sonner`
  - Date utilities: `date-fns`
  - Calendar: `react-day-picker`

- Payments & Utilities
  - Custom gateway wrappers: Paystack, Flutterwave, M‑Pesa (`src/utils/payments/gateways`)
  - Seasonal promotions: (`src/utils/promotions/seasonal`)
  - Ticket PDFs: (`src/utils/ticketing/pdfGenerator`)

- Blockchain (Contracts)
  - Solidity contracts in `src/packages/contracts/src`
  - Factory and ticket contracts: `EventTicketFactory.sol`, `PassMintTicket.sol`, `PassMintPOA.sol`
  - Tests under `src/packages/contracts/test`

- Backend & Data (placeholders/optional)
  - `src/packages/server` and `src/packages/database` directories scaffold future server/data layers
  - `src/utils/supabase` contains utilities for potential Supabase integration (authentication removed in app UI)

## Project Structure

```
GatePass/
├── index.html
├── package.json
├── src/
│   ├── App.tsx                      # App routing and role‑based header
│   ├── components/
│   │   ├── LandingPage.tsx          # Role selection, marketing sections
│   │   ├── OrganizerDashboard.tsx   # Organizer tools and analytics entry
│   │   ├── AttendeeDashboard.tsx    # Attendee tickets and badges
│   │   ├── EventCreation.tsx        # Multi‑step event creation
│   │   ├── TicketPurchase.tsx       # Event browsing and checkout
│   │   ├── MobileScanner.tsx        # Ticket scanning utilities
│   │   ├── Analytics.tsx            # Insights view
│   │   ├── WalletConnection.tsx     # Wallet connect control
│   │   └── ui/                      # Shared UI components (card, input, tabs, calendar…)
│   ├── utils/
│   │   ├── payments/                # Gateway wrappers
│   │   ├── promotions/              # Seasonal promo logic
│   │   ├── ticketing/               # PDF generation
│   │   └── supabase/                # Optional integrations
│   ├── packages/
│   │   ├── contracts/               # Solidity contracts & tests
│   │   ├── database/                # Future data layer
│   │   └── server/                  # Future server layer
│   └── styles/                      # Global styles
└── vite.config.ts
```

## 🔄 Complete User Flows

### **👤 Attendee Journey**

**1. Discovery & Registration**
```
Landing Page → "Join as Attendee" → Attendee Dashboard
```

**2. Event Discovery**
```
Dashboard → "Browse Events" → Search/Filter → Location Sync (optional) → Event Selection
```

**3. Ticket Purchase**
```
Event Details → Tier Selection → Quantity → Promo Code → Payment Method → Checkout → PDF Generation → Dashboard Update
```

**4. Event Attendance**
```
Dashboard → Ticket QR Code → Event Check-in → POA NFT Minting → Badge Collection
```

**5. Post-Event**
```
Dashboard → POA Badges → Social Sharing → Event Reviews → Future Event Recommendations
```

### **🎪 Organizer Journey**

**1. Setup & Registration**
```
Landing Page → "Join as Organizer" → Organizer Dashboard
```

**2. Event Creation**
```
Dashboard → "Create Event" → Event Details → Date/Time → Ticket Tiers → Advanced Settings → Publish
```

**3. Event Management**
```
Dashboard → Event Analytics → Sales Tracking → Attendee Management → Marketing Tools
```

**4. Event Day Operations**
```
Mobile Scanner → Ticket Validation → Check-in Processing → Real-time Analytics → Issue Resolution
```

**5. Post-Event Analysis**
```
Analytics Dashboard → Revenue Reports → Attendee Insights → Performance Metrics → Future Planning
```

### **💳 Payment Flows**

**Cryptocurrency Payment**
```
Checkout → Connect Wallet → Select Token → Approve Transaction → Confirm Payment → Receipt Generation
```

**Fiat Payment (Paystack/Flutterwave)**
```
Checkout → Enter Details → Select Gateway → Payment Processing → Confirmation → Receipt Generation
```

**Mobile Money (M-Pesa)**
```
Checkout → Enter Phone → STK Push → PIN Entry → Confirmation → Receipt Generation
```

### **📱 Mobile Scanner Flow**

**Event Staff Check-in**
```
Scanner App → Event Selection → Camera Activation → QR Scan → Validation → Check-in Confirmation → POA Minting
```

**Offline Mode**
```
Scanner App → Offline Mode → QR Scan → Signature Validation → Queue Updates → Sync When Online
```

## 📋 Features Summary

### **✅ Implemented Features**
- ✅ Role-based navigation (Attendee/Organizer)
- ✅ Multi-step event creation with progress tracking
- ✅ Manual date input + calendar selection for events
- ✅ Multiple ticket tiers with pricing and limits
- ✅ Advanced event settings (transfers, royalties, KYC, refunds)
- ✅ Event browsing with search and category filters
- ✅ Location-based event discovery with radius filtering
- ✅ Niche filtering for specialized events
- ✅ Multiple payment gateways (Paystack, Flutterwave, M-Pesa)
- ✅ Cryptocurrency wallet integration
- ✅ Seasonal promotions and discount codes
- ✅ Secure PDF ticket generation
- ✅ QR code scanning for event check-in
- ✅ Proof of Attendance (POA) NFT system
- ✅ Analytics dashboard for organizers
- ✅ Dark/light theme toggle
- ✅ Mobile-responsive design
- ✅ Toast notifications system
- ✅ Attendee dashboard with ticket management
- ✅ POA badge gallery with rarity system
- ✅ Footer with social links and newsletter signup

### **🔧 Technical Features**
- ✅ React + TypeScript for type safety
- ✅ Vite for fast development and building
- ✅ Component library with reusable UI elements
- ✅ Solidity smart contracts for blockchain integration
- ✅ Real-time pricing calculations
- ✅ Geolocation API integration
- ✅ Local storage for theme persistence
- ✅ Responsive grid layouts
- ✅ Loading states and error handling
- ✅ Form validation and user feedback

## 🛠️ Development Setup

### **Prerequisites**
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** for version control
- **Modern browser** with Web3 support (Chrome, Firefox, Edge)

### **Installation**
```bash
# Clone the repository
git clone <repository-url>
cd GatePass

# Install dependencies
npm install

# Start development server
npm run dev
```

### **Development Commands**
```bash
# Start dev server (usually runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests (if configured)
npm test

# Lint code
npm run lint

# Format code
npm run format
```

### **Environment Setup**
Create a `.env.local` file in the root directory:
```env
# Payment Gateway Keys (for production)
VITE_PAYSTACK_PUBLIC_KEY=your_paystack_key
VITE_FLUTTERWAVE_PUBLIC_KEY=your_flutterwave_key

# Blockchain Configuration
VITE_CHAIN_ID=137
VITE_RPC_URL=https://polygon-rpc.com

# Optional: Analytics and Monitoring
VITE_ANALYTICS_ID=your_analytics_id
```

### **Project Structure Deep Dive**
```
GatePass/
├── public/                          # Static assets
├── src/
│   ├── components/                  # React components
│   │   ├── ui/                     # Reusable UI components
│   │   │   ├── button.tsx          # Button component
│   │   │   ├── card.tsx            # Card component
│   │   │   ├── input.tsx           # Input component
│   │   │   ├── select.tsx          # Select component
│   │   │   ├── calendar.tsx        # Calendar component
│   │   │   └── ...                 # Other UI components
│   │   ├── LandingPage.tsx         # Marketing and role selection
│   │   ├── EventCreation.tsx       # Multi-step event creation
│   │   ├── TicketPurchase.tsx      # Event browsing and purchase
│   │   ├── AttendeeDashboard.tsx   # Attendee ticket management
│   │   ├── OrganizerDashboard.tsx  # Organizer tools
│   │   ├── MobileScanner.tsx       # QR code scanning
│   │   ├── Analytics.tsx           # Performance insights
│   │   ├── WalletConnection.tsx    # Web3 wallet integration
│   │   └── Footer.tsx              # Site footer
│   ├── utils/                      # Utility functions
│   │   ├── payments/               # Payment gateway integrations
│   │   │   └── gateways/          # Individual gateway implementations
│   │   ├── promotions/            # Seasonal promotion logic
│   │   │   └── seasonal.ts        # Discount calculations
│   │   ├── ticketing/             # PDF generation and QR codes
│   │   │   └── pdfGenerator.ts    # Secure PDF creation
│   │   └── supabase/              # Database utilities (optional)
│   ├── packages/                   # Monorepo packages
│   │   ├── contracts/             # Solidity smart contracts
│   │   │   ├── src/               # Contract source files
│   │   │   └── test/              # Contract tests
│   │   ├── database/              # Database schema and migrations
│   │   └── server/                # Backend API (future)
│   ├── styles/                    # Global styles and themes
│   │   └── globals.css            # CSS variables and utilities
│   ├── App.tsx                    # Main application component
│   ├── main.tsx                   # Application entry point
│   └── index.css                  # Global styles
├── package.json                   # Dependencies and scripts
├── vite.config.ts                # Vite configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

## Configuration Notes

- Payments
  - Gateway wrappers are included; production usage requires API keys/credentials and domain whitelisting.
  - For local development, the gateways may be mocked or limited; adjust implementations in `src/utils/payments/gateways` as needed.
  - Paystack integration example: set `VITE_PAYSTACK_PUBLIC_KEY` and call `paystackCheckout({ email, amount, currency })` — see `src/utils/payments/gateways.ts:19-52`.

- Wallet
  - The wallet connection component exposes `onConnect`/`isConnected` props and shows the address in the header when connected.
  - Wallet connect flow is triggered from Landing and Header; see `src/App.tsx:124-148`.

- Authentication
  - Traditional auth has been removed. Users select a role directly from the landing page.
  - Logout is available from the header’s user menu.

## Location & Niches

- Location Sync
  - Click `Use My Location` in the event browser to allow geolocation access.
  - Pick a distance radius (`Any`, `5 km`, `10 km`, `25 km`, `50 km`).
  - Events show an approximate distance and city tag where available.
  - If geolocation is denied or unavailable, browsing works normally without filtering.

- Niches
  - Use the `Niches` dropdown to focus on specific niches such as `AI`, `Startup`, or `Festival`.
  - Niche data is part of the mock event metadata and can be extended.

## Accessibility & UX

- Keyboard‑accessible controls (buttons, inputs, calendar popovers).
- Clear role labels in the header (`Attendee`/`Organizer`).
- Date fields accept both manual typing and calendar selection.
- Notifications use `sonner` for minimal, non‑intrusive feedback.

## Roadmap Ideas

- Real payment flows with receipts and webhooks.
- Persistent user profiles and saved wallets.
- Event publishing workflow and public listings.
- Organizer multi‑user teams and permissions.
- Advanced analytics (funnels, cohorts, live dashboards).
- On‑chain ticket issuance and verifiable POA tokens.

## Contributing

- Fork the repo and create feature branches.
- Keep PRs focused and include a brief rationale.
- Run the dev server locally to validate UI changes.

Lock In