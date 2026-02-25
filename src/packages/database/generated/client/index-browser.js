
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  password: 'password',
  name: 'name',
  walletAddress: 'walletAddress',
  googleId: 'googleId',
  twitterId: 'twitterId',
  avatar: 'avatar',
  role: 'role',
  refreshToken: 'refreshToken',
  resetToken: 'resetToken',
  resetTokenExpiry: 'resetTokenExpiry',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  message: 'message',
  type: 'type',
  read: 'read',
  createdAt: 'createdAt'
};

exports.Prisma.EventScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  venue: 'venue',
  address: 'address',
  city: 'city',
  country: 'country',
  latitude: 'latitude',
  longitude: 'longitude',
  source: 'source',
  externalUrl: 'externalUrl',
  eventDate: 'eventDate',
  saleStart: 'saleStart',
  saleEnd: 'saleEnd',
  totalSupply: 'totalSupply',
  ticketPrice: 'ticketPrice',
  currency: 'currency',
  maxPerWallet: 'maxPerWallet',
  contractAddress: 'contractAddress',
  chainId: 'chainId',
  imageUrl: 'imageUrl',
  metadataUri: 'metadataUri',
  category: 'category',
  tags: 'tags',
  isPublic: 'isPublic',
  allowTransfers: 'allowTransfers',
  requireKYC: 'requireKYC',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  organizerId: 'organizerId'
};

exports.Prisma.TicketScalarFieldEnum = {
  id: 'id',
  tokenId: 'tokenId',
  contractAddress: 'contractAddress',
  chainId: 'chainId',
  txHash: 'txHash',
  blockNumber: 'blockNumber',
  metadataUri: 'metadataUri',
  seatNumber: 'seatNumber',
  section: 'section',
  tier: 'tier',
  isUsed: 'isUsed',
  usedAt: 'usedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  eventId: 'eventId',
  orderId: 'orderId'
};

exports.Prisma.OrderScalarFieldEnum = {
  id: 'id',
  totalAmount: 'totalAmount',
  quantity: 'quantity',
  currency: 'currency',
  paymentMethod: 'paymentMethod',
  paymentStatus: 'paymentStatus',
  stripePaymentId: 'stripePaymentId',
  coinbaseChargeId: 'coinbaseChargeId',
  blockchainTxHash: 'blockchainTxHash',
  paystackReference: 'paystackReference',
  flutterwaveReference: 'flutterwaveReference',
  mpesaCheckoutRequestId: 'mpesaCheckoutRequestId',
  paymentTxId: 'paymentTxId',
  customerEmail: 'customerEmail',
  customerName: 'customerName',
  billingAddress: 'billingAddress',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  userId: 'userId',
  eventId: 'eventId'
};

exports.Prisma.CheckInScalarFieldEnum = {
  id: 'id',
  checkedInAt: 'checkedInAt',
  checkedInBy: 'checkedInBy',
  location: 'location',
  poaTokenId: 'poaTokenId',
  poaContractAddr: 'poaContractAddr',
  poaTxHash: 'poaTxHash',
  ticketId: 'ticketId',
  eventId: 'eventId',
  userId: 'userId'
};

exports.Prisma.EventAnalyticsScalarFieldEnum = {
  id: 'id',
  date: 'date',
  ticketsSold: 'ticketsSold',
  revenue: 'revenue',
  uniqueBuyers: 'uniqueBuyers',
  checkIns: 'checkIns',
  checkInRate: 'checkInRate',
  noShows: 'noShows',
  topCountries: 'topCountries',
  topCities: 'topCities',
  hourlyBreakdown: 'hourlyBreakdown',
  eventId: 'eventId'
};

exports.Prisma.TicketTierScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  price: 'price',
  availableQuantity: 'availableQuantity',
  maxPerPerson: 'maxPerPerson',
  saleStart: 'saleStart',
  saleEnd: 'saleEnd',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  eventId: 'eventId'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  User: 'User',
  Notification: 'Notification',
  Event: 'Event',
  Ticket: 'Ticket',
  Order: 'Order',
  CheckIn: 'CheckIn',
  EventAnalytics: 'EventAnalytics',
  TicketTier: 'TicketTier'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
