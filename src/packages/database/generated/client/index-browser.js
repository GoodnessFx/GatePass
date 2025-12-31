
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  detectRuntime,
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.7.0
 * Query Engine version: 79fb5193cf0a8fdbef536e4b4a159cad677ab1b9
 */
Prisma.prismaVersion = {
  client: "5.7.0",
  engine: "79fb5193cf0a8fdbef536e4b4a159cad677ab1b9"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  throw new Error(`Extensions.getExtensionContext is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.defineExtension = () => {
  throw new Error(`Extensions.defineExtension is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
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
  resetToken: 'resetToken',
  resetTokenExpiry: 'resetTokenExpiry',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
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
        const runtime = detectRuntime()
        const edgeRuntimeName = {
          'workerd': 'Cloudflare Workers',
          'deno': 'Deno and Deno Deploy',
          'netlify': 'Netlify Edge Functions',
          'edge-light': 'Vercel Edge Functions',
        }[runtime]

        let message = 'PrismaClient is unable to run in '
        if (edgeRuntimeName !== undefined) {
          message += edgeRuntimeName + '. As an alternative, try Accelerate: https://pris.ly/d/accelerate.'
        } else {
          message += 'this browser environment, or has been bundled for the browser (running in `' + runtime + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://github.com/prisma/prisma/issues`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
