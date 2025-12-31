
/**
 * Client
**/

import * as runtime from './runtime/library';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Event
 * 
 */
export type Event = $Result.DefaultSelection<Prisma.$EventPayload>
/**
 * Model Ticket
 * 
 */
export type Ticket = $Result.DefaultSelection<Prisma.$TicketPayload>
/**
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model CheckIn
 * 
 */
export type CheckIn = $Result.DefaultSelection<Prisma.$CheckInPayload>
/**
 * Model EventAnalytics
 * 
 */
export type EventAnalytics = $Result.DefaultSelection<Prisma.$EventAnalyticsPayload>
/**
 * Model TicketTier
 * 
 */
export type TicketTier = $Result.DefaultSelection<Prisma.$TicketTierPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.event`: Exposes CRUD operations for the **Event** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Events
    * const events = await prisma.event.findMany()
    * ```
    */
  get event(): Prisma.EventDelegate<ExtArgs>;

  /**
   * `prisma.ticket`: Exposes CRUD operations for the **Ticket** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tickets
    * const tickets = await prisma.ticket.findMany()
    * ```
    */
  get ticket(): Prisma.TicketDelegate<ExtArgs>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.OrderDelegate<ExtArgs>;

  /**
   * `prisma.checkIn`: Exposes CRUD operations for the **CheckIn** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CheckIns
    * const checkIns = await prisma.checkIn.findMany()
    * ```
    */
  get checkIn(): Prisma.CheckInDelegate<ExtArgs>;

  /**
   * `prisma.eventAnalytics`: Exposes CRUD operations for the **EventAnalytics** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EventAnalytics
    * const eventAnalytics = await prisma.eventAnalytics.findMany()
    * ```
    */
  get eventAnalytics(): Prisma.EventAnalyticsDelegate<ExtArgs>;

  /**
   * `prisma.ticketTier`: Exposes CRUD operations for the **TicketTier** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TicketTiers
    * const ticketTiers = await prisma.ticketTier.findMany()
    * ```
    */
  get ticketTier(): Prisma.TicketTierDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.7.0
   * Query Engine version: 79fb5193cf0a8fdbef536e4b4a159cad677ab1b9
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray | { toJSON(): unknown }

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Event: 'Event',
    Ticket: 'Ticket',
    Order: 'Order',
    CheckIn: 'CheckIn',
    EventAnalytics: 'EventAnalytics',
    TicketTier: 'TicketTier'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'user' | 'event' | 'ticket' | 'order' | 'checkIn' | 'eventAnalytics' | 'ticketTier'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>,
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Event: {
        payload: Prisma.$EventPayload<ExtArgs>
        fields: Prisma.EventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findFirst: {
            args: Prisma.EventFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findMany: {
            args: Prisma.EventFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          create: {
            args: Prisma.EventCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          delete: {
            args: Prisma.EventDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          update: {
            args: Prisma.EventUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          deleteMany: {
            args: Prisma.EventDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.EventUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.EventUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          aggregate: {
            args: Prisma.EventAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateEvent>
          }
          groupBy: {
            args: Prisma.EventGroupByArgs<ExtArgs>,
            result: $Utils.Optional<EventGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventCountArgs<ExtArgs>,
            result: $Utils.Optional<EventCountAggregateOutputType> | number
          }
        }
      }
      Ticket: {
        payload: Prisma.$TicketPayload<ExtArgs>
        fields: Prisma.TicketFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TicketFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TicketPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TicketFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          findFirst: {
            args: Prisma.TicketFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TicketPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TicketFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          findMany: {
            args: Prisma.TicketFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>[]
          }
          create: {
            args: Prisma.TicketCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          delete: {
            args: Prisma.TicketDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          update: {
            args: Prisma.TicketUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          deleteMany: {
            args: Prisma.TicketDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.TicketUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.TicketUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          aggregate: {
            args: Prisma.TicketAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateTicket>
          }
          groupBy: {
            args: Prisma.TicketGroupByArgs<ExtArgs>,
            result: $Utils.Optional<TicketGroupByOutputType>[]
          }
          count: {
            args: Prisma.TicketCountArgs<ExtArgs>,
            result: $Utils.Optional<TicketCountAggregateOutputType> | number
          }
        }
      }
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>
        fields: Prisma.OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateOrder>
          }
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>,
            result: $Utils.Optional<OrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>,
            result: $Utils.Optional<OrderCountAggregateOutputType> | number
          }
        }
      }
      CheckIn: {
        payload: Prisma.$CheckInPayload<ExtArgs>
        fields: Prisma.CheckInFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CheckInFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CheckInPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CheckInFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CheckInPayload>
          }
          findFirst: {
            args: Prisma.CheckInFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CheckInPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CheckInFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CheckInPayload>
          }
          findMany: {
            args: Prisma.CheckInFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CheckInPayload>[]
          }
          create: {
            args: Prisma.CheckInCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CheckInPayload>
          }
          delete: {
            args: Prisma.CheckInDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CheckInPayload>
          }
          update: {
            args: Prisma.CheckInUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CheckInPayload>
          }
          deleteMany: {
            args: Prisma.CheckInDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.CheckInUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.CheckInUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CheckInPayload>
          }
          aggregate: {
            args: Prisma.CheckInAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateCheckIn>
          }
          groupBy: {
            args: Prisma.CheckInGroupByArgs<ExtArgs>,
            result: $Utils.Optional<CheckInGroupByOutputType>[]
          }
          count: {
            args: Prisma.CheckInCountArgs<ExtArgs>,
            result: $Utils.Optional<CheckInCountAggregateOutputType> | number
          }
        }
      }
      EventAnalytics: {
        payload: Prisma.$EventAnalyticsPayload<ExtArgs>
        fields: Prisma.EventAnalyticsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventAnalyticsFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EventAnalyticsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventAnalyticsFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EventAnalyticsPayload>
          }
          findFirst: {
            args: Prisma.EventAnalyticsFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EventAnalyticsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventAnalyticsFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EventAnalyticsPayload>
          }
          findMany: {
            args: Prisma.EventAnalyticsFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EventAnalyticsPayload>[]
          }
          create: {
            args: Prisma.EventAnalyticsCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EventAnalyticsPayload>
          }
          delete: {
            args: Prisma.EventAnalyticsDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EventAnalyticsPayload>
          }
          update: {
            args: Prisma.EventAnalyticsUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EventAnalyticsPayload>
          }
          deleteMany: {
            args: Prisma.EventAnalyticsDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.EventAnalyticsUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.EventAnalyticsUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EventAnalyticsPayload>
          }
          aggregate: {
            args: Prisma.EventAnalyticsAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateEventAnalytics>
          }
          groupBy: {
            args: Prisma.EventAnalyticsGroupByArgs<ExtArgs>,
            result: $Utils.Optional<EventAnalyticsGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventAnalyticsCountArgs<ExtArgs>,
            result: $Utils.Optional<EventAnalyticsCountAggregateOutputType> | number
          }
        }
      }
      TicketTier: {
        payload: Prisma.$TicketTierPayload<ExtArgs>
        fields: Prisma.TicketTierFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TicketTierFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TicketTierPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TicketTierFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TicketTierPayload>
          }
          findFirst: {
            args: Prisma.TicketTierFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TicketTierPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TicketTierFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TicketTierPayload>
          }
          findMany: {
            args: Prisma.TicketTierFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TicketTierPayload>[]
          }
          create: {
            args: Prisma.TicketTierCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TicketTierPayload>
          }
          delete: {
            args: Prisma.TicketTierDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TicketTierPayload>
          }
          update: {
            args: Prisma.TicketTierUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TicketTierPayload>
          }
          deleteMany: {
            args: Prisma.TicketTierDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.TicketTierUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.TicketTierUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TicketTierPayload>
          }
          aggregate: {
            args: Prisma.TicketTierAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateTicketTier>
          }
          groupBy: {
            args: Prisma.TicketTierGroupByArgs<ExtArgs>,
            result: $Utils.Optional<TicketTierGroupByOutputType>[]
          }
          count: {
            args: Prisma.TicketTierCountArgs<ExtArgs>,
            result: $Utils.Optional<TicketTierCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    organizedEvents: number
    orders: number
    checkIns: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organizedEvents?: boolean | UserCountOutputTypeCountOrganizedEventsArgs
    orders?: boolean | UserCountOutputTypeCountOrdersArgs
    checkIns?: boolean | UserCountOutputTypeCountCheckInsArgs
  }

  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOrganizedEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCheckInsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CheckInWhereInput
  }



  /**
   * Count Type EventCountOutputType
   */

  export type EventCountOutputType = {
    orders: number
    tickets: number
    checkIns: number
    analytics: number
    tiers: number
  }

  export type EventCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | EventCountOutputTypeCountOrdersArgs
    tickets?: boolean | EventCountOutputTypeCountTicketsArgs
    checkIns?: boolean | EventCountOutputTypeCountCheckInsArgs
    analytics?: boolean | EventCountOutputTypeCountAnalyticsArgs
    tiers?: boolean | EventCountOutputTypeCountTiersArgs
  }

  // Custom InputTypes

  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCountOutputType
     */
    select?: EventCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }


  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketWhereInput
  }


  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountCheckInsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CheckInWhereInput
  }


  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountAnalyticsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventAnalyticsWhereInput
  }


  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountTiersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketTierWhereInput
  }



  /**
   * Count Type OrderCountOutputType
   */

  export type OrderCountOutputType = {
    tickets: number
  }

  export type OrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tickets?: boolean | OrderCountOutputTypeCountTicketsArgs
  }

  // Custom InputTypes

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderCountOutputType
     */
    select?: OrderCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketWhereInput
  }



  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    walletAddress: string | null
    googleId: string | null
    twitterId: string | null
    avatar: string | null
    role: string | null
    resetToken: string | null
    resetTokenExpiry: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    walletAddress: string | null
    googleId: string | null
    twitterId: string | null
    avatar: string | null
    role: string | null
    resetToken: string | null
    resetTokenExpiry: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    walletAddress: number
    googleId: number
    twitterId: number
    avatar: number
    role: number
    resetToken: number
    resetTokenExpiry: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    walletAddress?: true
    googleId?: true
    twitterId?: true
    avatar?: true
    role?: true
    resetToken?: true
    resetTokenExpiry?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    walletAddress?: true
    googleId?: true
    twitterId?: true
    avatar?: true
    role?: true
    resetToken?: true
    resetTokenExpiry?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    walletAddress?: true
    googleId?: true
    twitterId?: true
    avatar?: true
    role?: true
    resetToken?: true
    resetTokenExpiry?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string | null
    name: string | null
    walletAddress: string | null
    googleId: string | null
    twitterId: string | null
    avatar: string | null
    role: string
    resetToken: string | null
    resetTokenExpiry: Date | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    walletAddress?: boolean
    googleId?: boolean
    twitterId?: boolean
    avatar?: boolean
    role?: boolean
    resetToken?: boolean
    resetTokenExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organizedEvents?: boolean | User$organizedEventsArgs<ExtArgs>
    orders?: boolean | User$ordersArgs<ExtArgs>
    checkIns?: boolean | User$checkInsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    walletAddress?: boolean
    googleId?: boolean
    twitterId?: boolean
    avatar?: boolean
    role?: boolean
    resetToken?: boolean
    resetTokenExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organizedEvents?: boolean | User$organizedEventsArgs<ExtArgs>
    orders?: boolean | User$ordersArgs<ExtArgs>
    checkIns?: boolean | User$checkInsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      organizedEvents: Prisma.$EventPayload<ExtArgs>[]
      orders: Prisma.$OrderPayload<ExtArgs>[]
      checkIns: Prisma.$CheckInPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string | null
      name: string | null
      walletAddress: string | null
      googleId: string | null
      twitterId: string | null
      avatar: string | null
      role: string
      resetToken: string | null
      resetTokenExpiry: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }


  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' > & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    organizedEvents<T extends User$organizedEventsArgs<ExtArgs> = {}>(args?: Subset<T, User$organizedEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, 'findMany'> | Null>;

    orders<T extends User$ordersArgs<ExtArgs> = {}>(args?: Subset<T, User$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'findMany'> | Null>;

    checkIns<T extends User$checkInsArgs<ExtArgs> = {}>(args?: Subset<T, User$checkInsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CheckInPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly walletAddress: FieldRef<"User", 'String'>
    readonly googleId: FieldRef<"User", 'String'>
    readonly twitterId: FieldRef<"User", 'String'>
    readonly avatar: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly resetToken: FieldRef<"User", 'String'>
    readonly resetTokenExpiry: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }


  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }


  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }


  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }


  /**
   * User.organizedEvents
   */
  export type User$organizedEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EventInclude<ExtArgs> | null
    where?: EventWhereInput
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    cursor?: EventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }


  /**
   * User.orders
   */
  export type User$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }


  /**
   * User.checkIns
   */
  export type User$checkInsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckIn
     */
    select?: CheckInSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CheckInInclude<ExtArgs> | null
    where?: CheckInWhereInput
    orderBy?: CheckInOrderByWithRelationInput | CheckInOrderByWithRelationInput[]
    cursor?: CheckInWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CheckInScalarFieldEnum | CheckInScalarFieldEnum[]
  }


  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
  }



  /**
   * Model Event
   */

  export type AggregateEvent = {
    _count: EventCountAggregateOutputType | null
    _avg: EventAvgAggregateOutputType | null
    _sum: EventSumAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  export type EventAvgAggregateOutputType = {
    latitude: number | null
    longitude: number | null
    totalSupply: number | null
    ticketPrice: number | null
    maxPerWallet: number | null
    chainId: number | null
  }

  export type EventSumAggregateOutputType = {
    latitude: number | null
    longitude: number | null
    totalSupply: number | null
    ticketPrice: number | null
    maxPerWallet: number | null
    chainId: number | null
  }

  export type EventMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    venue: string | null
    address: string | null
    city: string | null
    country: string | null
    latitude: number | null
    longitude: number | null
    eventDate: Date | null
    saleStart: Date | null
    saleEnd: Date | null
    totalSupply: number | null
    ticketPrice: number | null
    currency: string | null
    maxPerWallet: number | null
    contractAddress: string | null
    chainId: number | null
    imageUrl: string | null
    metadataUri: string | null
    category: string | null
    tags: string | null
    isPublic: boolean | null
    allowTransfers: boolean | null
    requireKYC: boolean | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
    organizerId: string | null
  }

  export type EventMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    venue: string | null
    address: string | null
    city: string | null
    country: string | null
    latitude: number | null
    longitude: number | null
    eventDate: Date | null
    saleStart: Date | null
    saleEnd: Date | null
    totalSupply: number | null
    ticketPrice: number | null
    currency: string | null
    maxPerWallet: number | null
    contractAddress: string | null
    chainId: number | null
    imageUrl: string | null
    metadataUri: string | null
    category: string | null
    tags: string | null
    isPublic: boolean | null
    allowTransfers: boolean | null
    requireKYC: boolean | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
    organizerId: string | null
  }

  export type EventCountAggregateOutputType = {
    id: number
    title: number
    description: number
    venue: number
    address: number
    city: number
    country: number
    latitude: number
    longitude: number
    eventDate: number
    saleStart: number
    saleEnd: number
    totalSupply: number
    ticketPrice: number
    currency: number
    maxPerWallet: number
    contractAddress: number
    chainId: number
    imageUrl: number
    metadataUri: number
    category: number
    tags: number
    isPublic: number
    allowTransfers: number
    requireKYC: number
    status: number
    createdAt: number
    updatedAt: number
    organizerId: number
    _all: number
  }


  export type EventAvgAggregateInputType = {
    latitude?: true
    longitude?: true
    totalSupply?: true
    ticketPrice?: true
    maxPerWallet?: true
    chainId?: true
  }

  export type EventSumAggregateInputType = {
    latitude?: true
    longitude?: true
    totalSupply?: true
    ticketPrice?: true
    maxPerWallet?: true
    chainId?: true
  }

  export type EventMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    venue?: true
    address?: true
    city?: true
    country?: true
    latitude?: true
    longitude?: true
    eventDate?: true
    saleStart?: true
    saleEnd?: true
    totalSupply?: true
    ticketPrice?: true
    currency?: true
    maxPerWallet?: true
    contractAddress?: true
    chainId?: true
    imageUrl?: true
    metadataUri?: true
    category?: true
    tags?: true
    isPublic?: true
    allowTransfers?: true
    requireKYC?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    organizerId?: true
  }

  export type EventMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    venue?: true
    address?: true
    city?: true
    country?: true
    latitude?: true
    longitude?: true
    eventDate?: true
    saleStart?: true
    saleEnd?: true
    totalSupply?: true
    ticketPrice?: true
    currency?: true
    maxPerWallet?: true
    contractAddress?: true
    chainId?: true
    imageUrl?: true
    metadataUri?: true
    category?: true
    tags?: true
    isPublic?: true
    allowTransfers?: true
    requireKYC?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    organizerId?: true
  }

  export type EventCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    venue?: true
    address?: true
    city?: true
    country?: true
    latitude?: true
    longitude?: true
    eventDate?: true
    saleStart?: true
    saleEnd?: true
    totalSupply?: true
    ticketPrice?: true
    currency?: true
    maxPerWallet?: true
    contractAddress?: true
    chainId?: true
    imageUrl?: true
    metadataUri?: true
    category?: true
    tags?: true
    isPublic?: true
    allowTransfers?: true
    requireKYC?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    organizerId?: true
    _all?: true
  }

  export type EventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Event to aggregate.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Events
    **/
    _count?: true | EventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventMaxAggregateInputType
  }

  export type GetEventAggregateType<T extends EventAggregateArgs> = {
        [P in keyof T & keyof AggregateEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvent[P]>
      : GetScalarType<T[P], AggregateEvent[P]>
  }




  export type EventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
    orderBy?: EventOrderByWithAggregationInput | EventOrderByWithAggregationInput[]
    by: EventScalarFieldEnum[] | EventScalarFieldEnum
    having?: EventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventCountAggregateInputType | true
    _avg?: EventAvgAggregateInputType
    _sum?: EventSumAggregateInputType
    _min?: EventMinAggregateInputType
    _max?: EventMaxAggregateInputType
  }

  export type EventGroupByOutputType = {
    id: string
    title: string
    description: string | null
    venue: string
    address: string | null
    city: string | null
    country: string | null
    latitude: number | null
    longitude: number | null
    eventDate: Date
    saleStart: Date
    saleEnd: Date
    totalSupply: number
    ticketPrice: number
    currency: string
    maxPerWallet: number
    contractAddress: string | null
    chainId: number
    imageUrl: string | null
    metadataUri: string | null
    category: string
    tags: string
    isPublic: boolean
    allowTransfers: boolean
    requireKYC: boolean
    status: string
    createdAt: Date
    updatedAt: Date
    organizerId: string
    _count: EventCountAggregateOutputType | null
    _avg: EventAvgAggregateOutputType | null
    _sum: EventSumAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  type GetEventGroupByPayload<T extends EventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventGroupByOutputType[P]>
            : GetScalarType<T[P], EventGroupByOutputType[P]>
        }
      >
    >


  export type EventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    venue?: boolean
    address?: boolean
    city?: boolean
    country?: boolean
    latitude?: boolean
    longitude?: boolean
    eventDate?: boolean
    saleStart?: boolean
    saleEnd?: boolean
    totalSupply?: boolean
    ticketPrice?: boolean
    currency?: boolean
    maxPerWallet?: boolean
    contractAddress?: boolean
    chainId?: boolean
    imageUrl?: boolean
    metadataUri?: boolean
    category?: boolean
    tags?: boolean
    isPublic?: boolean
    allowTransfers?: boolean
    requireKYC?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organizerId?: boolean
    organizer?: boolean | UserDefaultArgs<ExtArgs>
    orders?: boolean | Event$ordersArgs<ExtArgs>
    tickets?: boolean | Event$ticketsArgs<ExtArgs>
    checkIns?: boolean | Event$checkInsArgs<ExtArgs>
    analytics?: boolean | Event$analyticsArgs<ExtArgs>
    tiers?: boolean | Event$tiersArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    venue?: boolean
    address?: boolean
    city?: boolean
    country?: boolean
    latitude?: boolean
    longitude?: boolean
    eventDate?: boolean
    saleStart?: boolean
    saleEnd?: boolean
    totalSupply?: boolean
    ticketPrice?: boolean
    currency?: boolean
    maxPerWallet?: boolean
    contractAddress?: boolean
    chainId?: boolean
    imageUrl?: boolean
    metadataUri?: boolean
    category?: boolean
    tags?: boolean
    isPublic?: boolean
    allowTransfers?: boolean
    requireKYC?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organizerId?: boolean
  }

  export type EventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organizer?: boolean | UserDefaultArgs<ExtArgs>
    orders?: boolean | Event$ordersArgs<ExtArgs>
    tickets?: boolean | Event$ticketsArgs<ExtArgs>
    checkIns?: boolean | Event$checkInsArgs<ExtArgs>
    analytics?: boolean | Event$analyticsArgs<ExtArgs>
    tiers?: boolean | Event$tiersArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $EventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Event"
    objects: {
      organizer: Prisma.$UserPayload<ExtArgs>
      orders: Prisma.$OrderPayload<ExtArgs>[]
      tickets: Prisma.$TicketPayload<ExtArgs>[]
      checkIns: Prisma.$CheckInPayload<ExtArgs>[]
      analytics: Prisma.$EventAnalyticsPayload<ExtArgs>[]
      tiers: Prisma.$TicketTierPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      venue: string
      address: string | null
      city: string | null
      country: string | null
      latitude: number | null
      longitude: number | null
      eventDate: Date
      saleStart: Date
      saleEnd: Date
      totalSupply: number
      ticketPrice: number
      currency: string
      maxPerWallet: number
      contractAddress: string | null
      chainId: number
      imageUrl: string | null
      metadataUri: string | null
      category: string
      tags: string
      isPublic: boolean
      allowTransfers: boolean
      requireKYC: boolean
      status: string
      createdAt: Date
      updatedAt: Date
      organizerId: string
    }, ExtArgs["result"]["event"]>
    composites: {}
  }


  type EventGetPayload<S extends boolean | null | undefined | EventDefaultArgs> = $Result.GetResult<Prisma.$EventPayload, S>

  type EventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<EventFindManyArgs, 'select' | 'include' | 'distinct' > & {
      select?: EventCountAggregateInputType | true
    }

  export interface EventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Event'], meta: { name: 'Event' } }
    /**
     * Find zero or one Event that matches the filter.
     * @param {EventFindUniqueArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends EventFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, EventFindUniqueArgs<ExtArgs>>
    ): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Event that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {EventFindUniqueOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends EventFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, EventFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Event that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends EventFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, EventFindFirstArgs<ExtArgs>>
    ): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Event that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends EventFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, EventFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Events
     * const events = await prisma.event.findMany()
     * 
     * // Get first 10 Events
     * const events = await prisma.event.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventWithIdOnly = await prisma.event.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends EventFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, EventFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Event.
     * @param {EventCreateArgs} args - Arguments to create a Event.
     * @example
     * // Create one Event
     * const Event = await prisma.event.create({
     *   data: {
     *     // ... data to create a Event
     *   }
     * })
     * 
    **/
    create<T extends EventCreateArgs<ExtArgs>>(
      args: SelectSubset<T, EventCreateArgs<ExtArgs>>
    ): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Delete a Event.
     * @param {EventDeleteArgs} args - Arguments to delete one Event.
     * @example
     * // Delete one Event
     * const Event = await prisma.event.delete({
     *   where: {
     *     // ... filter to delete one Event
     *   }
     * })
     * 
    **/
    delete<T extends EventDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, EventDeleteArgs<ExtArgs>>
    ): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Event.
     * @param {EventUpdateArgs} args - Arguments to update one Event.
     * @example
     * // Update one Event
     * const event = await prisma.event.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends EventUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, EventUpdateArgs<ExtArgs>>
    ): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Events.
     * @param {EventDeleteManyArgs} args - Arguments to filter Events to delete.
     * @example
     * // Delete a few Events
     * const { count } = await prisma.event.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends EventDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, EventDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends EventUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, EventUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Event.
     * @param {EventUpsertArgs} args - Arguments to update or create a Event.
     * @example
     * // Update or create a Event
     * const event = await prisma.event.upsert({
     *   create: {
     *     // ... data to create a Event
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Event we want to update
     *   }
     * })
    **/
    upsert<T extends EventUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, EventUpsertArgs<ExtArgs>>
    ): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCountArgs} args - Arguments to filter Events to count.
     * @example
     * // Count the number of Events
     * const count = await prisma.event.count({
     *   where: {
     *     // ... the filter for the Events we want to count
     *   }
     * })
    **/
    count<T extends EventCountArgs>(
      args?: Subset<T, EventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventAggregateArgs>(args: Subset<T, EventAggregateArgs>): Prisma.PrismaPromise<GetEventAggregateType<T>>

    /**
     * Group by Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventGroupByArgs['orderBy'] }
        : { orderBy?: EventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Event model
   */
  readonly fields: EventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Event.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    organizer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    orders<T extends Event$ordersArgs<ExtArgs> = {}>(args?: Subset<T, Event$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'findMany'> | Null>;

    tickets<T extends Event$ticketsArgs<ExtArgs> = {}>(args?: Subset<T, Event$ticketsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, 'findMany'> | Null>;

    checkIns<T extends Event$checkInsArgs<ExtArgs> = {}>(args?: Subset<T, Event$checkInsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CheckInPayload<ExtArgs>, T, 'findMany'> | Null>;

    analytics<T extends Event$analyticsArgs<ExtArgs> = {}>(args?: Subset<T, Event$analyticsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventAnalyticsPayload<ExtArgs>, T, 'findMany'> | Null>;

    tiers<T extends Event$tiersArgs<ExtArgs> = {}>(args?: Subset<T, Event$tiersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketTierPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Event model
   */ 
  interface EventFieldRefs {
    readonly id: FieldRef<"Event", 'String'>
    readonly title: FieldRef<"Event", 'String'>
    readonly description: FieldRef<"Event", 'String'>
    readonly venue: FieldRef<"Event", 'String'>
    readonly address: FieldRef<"Event", 'String'>
    readonly city: FieldRef<"Event", 'String'>
    readonly country: FieldRef<"Event", 'String'>
    readonly latitude: FieldRef<"Event", 'Float'>
    readonly longitude: FieldRef<"Event", 'Float'>
    readonly eventDate: FieldRef<"Event", 'DateTime'>
    readonly saleStart: FieldRef<"Event", 'DateTime'>
    readonly saleEnd: FieldRef<"Event", 'DateTime'>
    readonly totalSupply: FieldRef<"Event", 'Int'>
    readonly ticketPrice: FieldRef<"Event", 'Float'>
    readonly currency: FieldRef<"Event", 'String'>
    readonly maxPerWallet: FieldRef<"Event", 'Int'>
    readonly contractAddress: FieldRef<"Event", 'String'>
    readonly chainId: FieldRef<"Event", 'Int'>
    readonly imageUrl: FieldRef<"Event", 'String'>
    readonly metadataUri: FieldRef<"Event", 'String'>
    readonly category: FieldRef<"Event", 'String'>
    readonly tags: FieldRef<"Event", 'String'>
    readonly isPublic: FieldRef<"Event", 'Boolean'>
    readonly allowTransfers: FieldRef<"Event", 'Boolean'>
    readonly requireKYC: FieldRef<"Event", 'Boolean'>
    readonly status: FieldRef<"Event", 'String'>
    readonly createdAt: FieldRef<"Event", 'DateTime'>
    readonly updatedAt: FieldRef<"Event", 'DateTime'>
    readonly organizerId: FieldRef<"Event", 'String'>
  }
    

  // Custom InputTypes

  /**
   * Event findUnique
   */
  export type EventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }


  /**
   * Event findUniqueOrThrow
   */
  export type EventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }


  /**
   * Event findFirst
   */
  export type EventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }


  /**
   * Event findFirstOrThrow
   */
  export type EventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }


  /**
   * Event findMany
   */
  export type EventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Events to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }


  /**
   * Event create
   */
  export type EventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to create a Event.
     */
    data: XOR<EventCreateInput, EventUncheckedCreateInput>
  }


  /**
   * Event update
   */
  export type EventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to update a Event.
     */
    data: XOR<EventUpdateInput, EventUncheckedUpdateInput>
    /**
     * Choose, which Event to update.
     */
    where: EventWhereUniqueInput
  }


  /**
   * Event updateMany
   */
  export type EventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
  }


  /**
   * Event upsert
   */
  export type EventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The filter to search for the Event to update in case it exists.
     */
    where: EventWhereUniqueInput
    /**
     * In case the Event found by the `where` argument doesn't exist, create a new Event with this data.
     */
    create: XOR<EventCreateInput, EventUncheckedCreateInput>
    /**
     * In case the Event was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventUpdateInput, EventUncheckedUpdateInput>
  }


  /**
   * Event delete
   */
  export type EventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter which Event to delete.
     */
    where: EventWhereUniqueInput
  }


  /**
   * Event deleteMany
   */
  export type EventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Events to delete
     */
    where?: EventWhereInput
  }


  /**
   * Event.orders
   */
  export type Event$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }


  /**
   * Event.tickets
   */
  export type Event$ticketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketInclude<ExtArgs> | null
    where?: TicketWhereInput
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    cursor?: TicketWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }


  /**
   * Event.checkIns
   */
  export type Event$checkInsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckIn
     */
    select?: CheckInSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CheckInInclude<ExtArgs> | null
    where?: CheckInWhereInput
    orderBy?: CheckInOrderByWithRelationInput | CheckInOrderByWithRelationInput[]
    cursor?: CheckInWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CheckInScalarFieldEnum | CheckInScalarFieldEnum[]
  }


  /**
   * Event.analytics
   */
  export type Event$analyticsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAnalytics
     */
    select?: EventAnalyticsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EventAnalyticsInclude<ExtArgs> | null
    where?: EventAnalyticsWhereInput
    orderBy?: EventAnalyticsOrderByWithRelationInput | EventAnalyticsOrderByWithRelationInput[]
    cursor?: EventAnalyticsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventAnalyticsScalarFieldEnum | EventAnalyticsScalarFieldEnum[]
  }


  /**
   * Event.tiers
   */
  export type Event$tiersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketTier
     */
    select?: TicketTierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketTierInclude<ExtArgs> | null
    where?: TicketTierWhereInput
    orderBy?: TicketTierOrderByWithRelationInput | TicketTierOrderByWithRelationInput[]
    cursor?: TicketTierWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TicketTierScalarFieldEnum | TicketTierScalarFieldEnum[]
  }


  /**
   * Event without action
   */
  export type EventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EventInclude<ExtArgs> | null
  }



  /**
   * Model Ticket
   */

  export type AggregateTicket = {
    _count: TicketCountAggregateOutputType | null
    _avg: TicketAvgAggregateOutputType | null
    _sum: TicketSumAggregateOutputType | null
    _min: TicketMinAggregateOutputType | null
    _max: TicketMaxAggregateOutputType | null
  }

  export type TicketAvgAggregateOutputType = {
    tokenId: number | null
    chainId: number | null
    blockNumber: number | null
  }

  export type TicketSumAggregateOutputType = {
    tokenId: number | null
    chainId: number | null
    blockNumber: number | null
  }

  export type TicketMinAggregateOutputType = {
    id: string | null
    tokenId: number | null
    contractAddress: string | null
    chainId: number | null
    txHash: string | null
    blockNumber: number | null
    metadataUri: string | null
    seatNumber: string | null
    section: string | null
    tier: string | null
    isUsed: boolean | null
    usedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    eventId: string | null
    orderId: string | null
  }

  export type TicketMaxAggregateOutputType = {
    id: string | null
    tokenId: number | null
    contractAddress: string | null
    chainId: number | null
    txHash: string | null
    blockNumber: number | null
    metadataUri: string | null
    seatNumber: string | null
    section: string | null
    tier: string | null
    isUsed: boolean | null
    usedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    eventId: string | null
    orderId: string | null
  }

  export type TicketCountAggregateOutputType = {
    id: number
    tokenId: number
    contractAddress: number
    chainId: number
    txHash: number
    blockNumber: number
    metadataUri: number
    seatNumber: number
    section: number
    tier: number
    isUsed: number
    usedAt: number
    createdAt: number
    updatedAt: number
    eventId: number
    orderId: number
    _all: number
  }


  export type TicketAvgAggregateInputType = {
    tokenId?: true
    chainId?: true
    blockNumber?: true
  }

  export type TicketSumAggregateInputType = {
    tokenId?: true
    chainId?: true
    blockNumber?: true
  }

  export type TicketMinAggregateInputType = {
    id?: true
    tokenId?: true
    contractAddress?: true
    chainId?: true
    txHash?: true
    blockNumber?: true
    metadataUri?: true
    seatNumber?: true
    section?: true
    tier?: true
    isUsed?: true
    usedAt?: true
    createdAt?: true
    updatedAt?: true
    eventId?: true
    orderId?: true
  }

  export type TicketMaxAggregateInputType = {
    id?: true
    tokenId?: true
    contractAddress?: true
    chainId?: true
    txHash?: true
    blockNumber?: true
    metadataUri?: true
    seatNumber?: true
    section?: true
    tier?: true
    isUsed?: true
    usedAt?: true
    createdAt?: true
    updatedAt?: true
    eventId?: true
    orderId?: true
  }

  export type TicketCountAggregateInputType = {
    id?: true
    tokenId?: true
    contractAddress?: true
    chainId?: true
    txHash?: true
    blockNumber?: true
    metadataUri?: true
    seatNumber?: true
    section?: true
    tier?: true
    isUsed?: true
    usedAt?: true
    createdAt?: true
    updatedAt?: true
    eventId?: true
    orderId?: true
    _all?: true
  }

  export type TicketAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ticket to aggregate.
     */
    where?: TicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tickets
    **/
    _count?: true | TicketCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TicketAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TicketSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TicketMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TicketMaxAggregateInputType
  }

  export type GetTicketAggregateType<T extends TicketAggregateArgs> = {
        [P in keyof T & keyof AggregateTicket]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTicket[P]>
      : GetScalarType<T[P], AggregateTicket[P]>
  }




  export type TicketGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketWhereInput
    orderBy?: TicketOrderByWithAggregationInput | TicketOrderByWithAggregationInput[]
    by: TicketScalarFieldEnum[] | TicketScalarFieldEnum
    having?: TicketScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TicketCountAggregateInputType | true
    _avg?: TicketAvgAggregateInputType
    _sum?: TicketSumAggregateInputType
    _min?: TicketMinAggregateInputType
    _max?: TicketMaxAggregateInputType
  }

  export type TicketGroupByOutputType = {
    id: string
    tokenId: number
    contractAddress: string
    chainId: number
    txHash: string | null
    blockNumber: number | null
    metadataUri: string | null
    seatNumber: string | null
    section: string | null
    tier: string | null
    isUsed: boolean
    usedAt: Date | null
    createdAt: Date
    updatedAt: Date
    eventId: string
    orderId: string
    _count: TicketCountAggregateOutputType | null
    _avg: TicketAvgAggregateOutputType | null
    _sum: TicketSumAggregateOutputType | null
    _min: TicketMinAggregateOutputType | null
    _max: TicketMaxAggregateOutputType | null
  }

  type GetTicketGroupByPayload<T extends TicketGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TicketGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TicketGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TicketGroupByOutputType[P]>
            : GetScalarType<T[P], TicketGroupByOutputType[P]>
        }
      >
    >


  export type TicketSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tokenId?: boolean
    contractAddress?: boolean
    chainId?: boolean
    txHash?: boolean
    blockNumber?: boolean
    metadataUri?: boolean
    seatNumber?: boolean
    section?: boolean
    tier?: boolean
    isUsed?: boolean
    usedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    eventId?: boolean
    orderId?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
    order?: boolean | OrderDefaultArgs<ExtArgs>
    checkIn?: boolean | Ticket$checkInArgs<ExtArgs>
  }, ExtArgs["result"]["ticket"]>

  export type TicketSelectScalar = {
    id?: boolean
    tokenId?: boolean
    contractAddress?: boolean
    chainId?: boolean
    txHash?: boolean
    blockNumber?: boolean
    metadataUri?: boolean
    seatNumber?: boolean
    section?: boolean
    tier?: boolean
    isUsed?: boolean
    usedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    eventId?: boolean
    orderId?: boolean
  }

  export type TicketInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
    order?: boolean | OrderDefaultArgs<ExtArgs>
    checkIn?: boolean | Ticket$checkInArgs<ExtArgs>
  }


  export type $TicketPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Ticket"
    objects: {
      event: Prisma.$EventPayload<ExtArgs>
      order: Prisma.$OrderPayload<ExtArgs>
      checkIn: Prisma.$CheckInPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tokenId: number
      contractAddress: string
      chainId: number
      txHash: string | null
      blockNumber: number | null
      metadataUri: string | null
      seatNumber: string | null
      section: string | null
      tier: string | null
      isUsed: boolean
      usedAt: Date | null
      createdAt: Date
      updatedAt: Date
      eventId: string
      orderId: string
    }, ExtArgs["result"]["ticket"]>
    composites: {}
  }


  type TicketGetPayload<S extends boolean | null | undefined | TicketDefaultArgs> = $Result.GetResult<Prisma.$TicketPayload, S>

  type TicketCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TicketFindManyArgs, 'select' | 'include' | 'distinct' > & {
      select?: TicketCountAggregateInputType | true
    }

  export interface TicketDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Ticket'], meta: { name: 'Ticket' } }
    /**
     * Find zero or one Ticket that matches the filter.
     * @param {TicketFindUniqueArgs} args - Arguments to find a Ticket
     * @example
     * // Get one Ticket
     * const ticket = await prisma.ticket.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TicketFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, TicketFindUniqueArgs<ExtArgs>>
    ): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Ticket that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {TicketFindUniqueOrThrowArgs} args - Arguments to find a Ticket
     * @example
     * // Get one Ticket
     * const ticket = await prisma.ticket.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TicketFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, TicketFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Ticket that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketFindFirstArgs} args - Arguments to find a Ticket
     * @example
     * // Get one Ticket
     * const ticket = await prisma.ticket.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TicketFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, TicketFindFirstArgs<ExtArgs>>
    ): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Ticket that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketFindFirstOrThrowArgs} args - Arguments to find a Ticket
     * @example
     * // Get one Ticket
     * const ticket = await prisma.ticket.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TicketFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, TicketFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Tickets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tickets
     * const tickets = await prisma.ticket.findMany()
     * 
     * // Get first 10 Tickets
     * const tickets = await prisma.ticket.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ticketWithIdOnly = await prisma.ticket.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TicketFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TicketFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Ticket.
     * @param {TicketCreateArgs} args - Arguments to create a Ticket.
     * @example
     * // Create one Ticket
     * const Ticket = await prisma.ticket.create({
     *   data: {
     *     // ... data to create a Ticket
     *   }
     * })
     * 
    **/
    create<T extends TicketCreateArgs<ExtArgs>>(
      args: SelectSubset<T, TicketCreateArgs<ExtArgs>>
    ): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Delete a Ticket.
     * @param {TicketDeleteArgs} args - Arguments to delete one Ticket.
     * @example
     * // Delete one Ticket
     * const Ticket = await prisma.ticket.delete({
     *   where: {
     *     // ... filter to delete one Ticket
     *   }
     * })
     * 
    **/
    delete<T extends TicketDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, TicketDeleteArgs<ExtArgs>>
    ): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Ticket.
     * @param {TicketUpdateArgs} args - Arguments to update one Ticket.
     * @example
     * // Update one Ticket
     * const ticket = await prisma.ticket.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TicketUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, TicketUpdateArgs<ExtArgs>>
    ): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Tickets.
     * @param {TicketDeleteManyArgs} args - Arguments to filter Tickets to delete.
     * @example
     * // Delete a few Tickets
     * const { count } = await prisma.ticket.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TicketDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TicketDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tickets
     * const ticket = await prisma.ticket.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TicketUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, TicketUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Ticket.
     * @param {TicketUpsertArgs} args - Arguments to update or create a Ticket.
     * @example
     * // Update or create a Ticket
     * const ticket = await prisma.ticket.upsert({
     *   create: {
     *     // ... data to create a Ticket
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ticket we want to update
     *   }
     * })
    **/
    upsert<T extends TicketUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, TicketUpsertArgs<ExtArgs>>
    ): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Tickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketCountArgs} args - Arguments to filter Tickets to count.
     * @example
     * // Count the number of Tickets
     * const count = await prisma.ticket.count({
     *   where: {
     *     // ... the filter for the Tickets we want to count
     *   }
     * })
    **/
    count<T extends TicketCountArgs>(
      args?: Subset<T, TicketCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TicketCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ticket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TicketAggregateArgs>(args: Subset<T, TicketAggregateArgs>): Prisma.PrismaPromise<GetTicketAggregateType<T>>

    /**
     * Group by Ticket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TicketGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TicketGroupByArgs['orderBy'] }
        : { orderBy?: TicketGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TicketGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTicketGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Ticket model
   */
  readonly fields: TicketFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Ticket.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TicketClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    event<T extends EventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDefaultArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    checkIn<T extends Ticket$checkInArgs<ExtArgs> = {}>(args?: Subset<T, Ticket$checkInArgs<ExtArgs>>): Prisma__CheckInClient<$Result.GetResult<Prisma.$CheckInPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Ticket model
   */ 
  interface TicketFieldRefs {
    readonly id: FieldRef<"Ticket", 'String'>
    readonly tokenId: FieldRef<"Ticket", 'Int'>
    readonly contractAddress: FieldRef<"Ticket", 'String'>
    readonly chainId: FieldRef<"Ticket", 'Int'>
    readonly txHash: FieldRef<"Ticket", 'String'>
    readonly blockNumber: FieldRef<"Ticket", 'Int'>
    readonly metadataUri: FieldRef<"Ticket", 'String'>
    readonly seatNumber: FieldRef<"Ticket", 'String'>
    readonly section: FieldRef<"Ticket", 'String'>
    readonly tier: FieldRef<"Ticket", 'String'>
    readonly isUsed: FieldRef<"Ticket", 'Boolean'>
    readonly usedAt: FieldRef<"Ticket", 'DateTime'>
    readonly createdAt: FieldRef<"Ticket", 'DateTime'>
    readonly updatedAt: FieldRef<"Ticket", 'DateTime'>
    readonly eventId: FieldRef<"Ticket", 'String'>
    readonly orderId: FieldRef<"Ticket", 'String'>
  }
    

  // Custom InputTypes

  /**
   * Ticket findUnique
   */
  export type TicketFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Ticket to fetch.
     */
    where: TicketWhereUniqueInput
  }


  /**
   * Ticket findUniqueOrThrow
   */
  export type TicketFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Ticket to fetch.
     */
    where: TicketWhereUniqueInput
  }


  /**
   * Ticket findFirst
   */
  export type TicketFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Ticket to fetch.
     */
    where?: TicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tickets.
     */
    cursor?: TicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tickets.
     */
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }


  /**
   * Ticket findFirstOrThrow
   */
  export type TicketFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Ticket to fetch.
     */
    where?: TicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tickets.
     */
    cursor?: TicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tickets.
     */
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }


  /**
   * Ticket findMany
   */
  export type TicketFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Tickets to fetch.
     */
    where?: TicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tickets.
     */
    cursor?: TicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }


  /**
   * Ticket create
   */
  export type TicketCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * The data needed to create a Ticket.
     */
    data: XOR<TicketCreateInput, TicketUncheckedCreateInput>
  }


  /**
   * Ticket update
   */
  export type TicketUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * The data needed to update a Ticket.
     */
    data: XOR<TicketUpdateInput, TicketUncheckedUpdateInput>
    /**
     * Choose, which Ticket to update.
     */
    where: TicketWhereUniqueInput
  }


  /**
   * Ticket updateMany
   */
  export type TicketUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tickets.
     */
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyInput>
    /**
     * Filter which Tickets to update
     */
    where?: TicketWhereInput
  }


  /**
   * Ticket upsert
   */
  export type TicketUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * The filter to search for the Ticket to update in case it exists.
     */
    where: TicketWhereUniqueInput
    /**
     * In case the Ticket found by the `where` argument doesn't exist, create a new Ticket with this data.
     */
    create: XOR<TicketCreateInput, TicketUncheckedCreateInput>
    /**
     * In case the Ticket was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TicketUpdateInput, TicketUncheckedUpdateInput>
  }


  /**
   * Ticket delete
   */
  export type TicketDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter which Ticket to delete.
     */
    where: TicketWhereUniqueInput
  }


  /**
   * Ticket deleteMany
   */
  export type TicketDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tickets to delete
     */
    where?: TicketWhereInput
  }


  /**
   * Ticket.checkIn
   */
  export type Ticket$checkInArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckIn
     */
    select?: CheckInSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CheckInInclude<ExtArgs> | null
    where?: CheckInWhereInput
  }


  /**
   * Ticket without action
   */
  export type TicketDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketInclude<ExtArgs> | null
  }



  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderAvgAggregateOutputType = {
    totalAmount: number | null
    quantity: number | null
  }

  export type OrderSumAggregateOutputType = {
    totalAmount: number | null
    quantity: number | null
  }

  export type OrderMinAggregateOutputType = {
    id: string | null
    totalAmount: number | null
    quantity: number | null
    currency: string | null
    paymentMethod: string | null
    paymentStatus: string | null
    stripePaymentId: string | null
    coinbaseChargeId: string | null
    blockchainTxHash: string | null
    paystackReference: string | null
    flutterwaveReference: string | null
    mpesaCheckoutRequestId: string | null
    paymentTxId: string | null
    customerEmail: string | null
    customerName: string | null
    billingAddress: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    eventId: string | null
  }

  export type OrderMaxAggregateOutputType = {
    id: string | null
    totalAmount: number | null
    quantity: number | null
    currency: string | null
    paymentMethod: string | null
    paymentStatus: string | null
    stripePaymentId: string | null
    coinbaseChargeId: string | null
    blockchainTxHash: string | null
    paystackReference: string | null
    flutterwaveReference: string | null
    mpesaCheckoutRequestId: string | null
    paymentTxId: string | null
    customerEmail: string | null
    customerName: string | null
    billingAddress: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    eventId: string | null
  }

  export type OrderCountAggregateOutputType = {
    id: number
    totalAmount: number
    quantity: number
    currency: number
    paymentMethod: number
    paymentStatus: number
    stripePaymentId: number
    coinbaseChargeId: number
    blockchainTxHash: number
    paystackReference: number
    flutterwaveReference: number
    mpesaCheckoutRequestId: number
    paymentTxId: number
    customerEmail: number
    customerName: number
    billingAddress: number
    createdAt: number
    updatedAt: number
    userId: number
    eventId: number
    _all: number
  }


  export type OrderAvgAggregateInputType = {
    totalAmount?: true
    quantity?: true
  }

  export type OrderSumAggregateInputType = {
    totalAmount?: true
    quantity?: true
  }

  export type OrderMinAggregateInputType = {
    id?: true
    totalAmount?: true
    quantity?: true
    currency?: true
    paymentMethod?: true
    paymentStatus?: true
    stripePaymentId?: true
    coinbaseChargeId?: true
    blockchainTxHash?: true
    paystackReference?: true
    flutterwaveReference?: true
    mpesaCheckoutRequestId?: true
    paymentTxId?: true
    customerEmail?: true
    customerName?: true
    billingAddress?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    eventId?: true
  }

  export type OrderMaxAggregateInputType = {
    id?: true
    totalAmount?: true
    quantity?: true
    currency?: true
    paymentMethod?: true
    paymentStatus?: true
    stripePaymentId?: true
    coinbaseChargeId?: true
    blockchainTxHash?: true
    paystackReference?: true
    flutterwaveReference?: true
    mpesaCheckoutRequestId?: true
    paymentTxId?: true
    customerEmail?: true
    customerName?: true
    billingAddress?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    eventId?: true
  }

  export type OrderCountAggregateInputType = {
    id?: true
    totalAmount?: true
    quantity?: true
    currency?: true
    paymentMethod?: true
    paymentStatus?: true
    stripePaymentId?: true
    coinbaseChargeId?: true
    blockchainTxHash?: true
    paystackReference?: true
    flutterwaveReference?: true
    mpesaCheckoutRequestId?: true
    paymentTxId?: true
    customerEmail?: true
    customerName?: true
    billingAddress?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    eventId?: true
    _all?: true
  }

  export type OrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[]
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum
    having?: OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _avg?: OrderAvgAggregateInputType
    _sum?: OrderSumAggregateInputType
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }

  export type OrderGroupByOutputType = {
    id: string
    totalAmount: number
    quantity: number
    currency: string
    paymentMethod: string
    paymentStatus: string
    stripePaymentId: string | null
    coinbaseChargeId: string | null
    blockchainTxHash: string | null
    paystackReference: string | null
    flutterwaveReference: string | null
    mpesaCheckoutRequestId: string | null
    paymentTxId: string | null
    customerEmail: string
    customerName: string | null
    billingAddress: string | null
    createdAt: Date
    updatedAt: Date
    userId: string
    eventId: string
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    totalAmount?: boolean
    quantity?: boolean
    currency?: boolean
    paymentMethod?: boolean
    paymentStatus?: boolean
    stripePaymentId?: boolean
    coinbaseChargeId?: boolean
    blockchainTxHash?: boolean
    paystackReference?: boolean
    flutterwaveReference?: boolean
    mpesaCheckoutRequestId?: boolean
    paymentTxId?: boolean
    customerEmail?: boolean
    customerName?: boolean
    billingAddress?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    eventId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
    tickets?: boolean | Order$ticketsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectScalar = {
    id?: boolean
    totalAmount?: boolean
    quantity?: boolean
    currency?: boolean
    paymentMethod?: boolean
    paymentStatus?: boolean
    stripePaymentId?: boolean
    coinbaseChargeId?: boolean
    blockchainTxHash?: boolean
    paystackReference?: boolean
    flutterwaveReference?: boolean
    mpesaCheckoutRequestId?: boolean
    paymentTxId?: boolean
    customerEmail?: boolean
    customerName?: boolean
    billingAddress?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    eventId?: boolean
  }

  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
    tickets?: boolean | Order$ticketsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      event: Prisma.$EventPayload<ExtArgs>
      tickets: Prisma.$TicketPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      totalAmount: number
      quantity: number
      currency: string
      paymentMethod: string
      paymentStatus: string
      stripePaymentId: string | null
      coinbaseChargeId: string | null
      blockchainTxHash: string | null
      paystackReference: string | null
      flutterwaveReference: string | null
      mpesaCheckoutRequestId: string | null
      paymentTxId: string | null
      customerEmail: string
      customerName: string | null
      billingAddress: string | null
      createdAt: Date
      updatedAt: Date
      userId: string
      eventId: string
    }, ExtArgs["result"]["order"]>
    composites: {}
  }


  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>

  type OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct' > & {
      select?: OrderCountAggregateInputType | true
    }

  export interface OrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order'], meta: { name: 'Order' } }
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends OrderFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>
    ): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Order that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends OrderFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>
    ): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends OrderFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
    **/
    create<T extends OrderCreateArgs<ExtArgs>>(
      args: SelectSubset<T, OrderCreateArgs<ExtArgs>>
    ): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
    **/
    delete<T extends OrderDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>
    ): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends OrderUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>
    ): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends OrderDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends OrderUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
    **/
    upsert<T extends OrderUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>
    ): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Order model
   */
  readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    event<T extends EventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDefaultArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    tickets<T extends Order$ticketsArgs<ExtArgs> = {}>(args?: Subset<T, Order$ticketsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Order model
   */ 
  interface OrderFieldRefs {
    readonly id: FieldRef<"Order", 'String'>
    readonly totalAmount: FieldRef<"Order", 'Float'>
    readonly quantity: FieldRef<"Order", 'Int'>
    readonly currency: FieldRef<"Order", 'String'>
    readonly paymentMethod: FieldRef<"Order", 'String'>
    readonly paymentStatus: FieldRef<"Order", 'String'>
    readonly stripePaymentId: FieldRef<"Order", 'String'>
    readonly coinbaseChargeId: FieldRef<"Order", 'String'>
    readonly blockchainTxHash: FieldRef<"Order", 'String'>
    readonly paystackReference: FieldRef<"Order", 'String'>
    readonly flutterwaveReference: FieldRef<"Order", 'String'>
    readonly mpesaCheckoutRequestId: FieldRef<"Order", 'String'>
    readonly paymentTxId: FieldRef<"Order", 'String'>
    readonly customerEmail: FieldRef<"Order", 'String'>
    readonly customerName: FieldRef<"Order", 'String'>
    readonly billingAddress: FieldRef<"Order", 'String'>
    readonly createdAt: FieldRef<"Order", 'DateTime'>
    readonly updatedAt: FieldRef<"Order", 'DateTime'>
    readonly userId: FieldRef<"Order", 'String'>
    readonly eventId: FieldRef<"Order", 'String'>
  }
    

  // Custom InputTypes

  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }


  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }


  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }


  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }


  /**
   * Order findMany
   */
  export type OrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }


  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>
  }


  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput
  }


  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
  }


  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
  }


  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput
  }


  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput
  }


  /**
   * Order.tickets
   */
  export type Order$ticketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketInclude<ExtArgs> | null
    where?: TicketWhereInput
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    cursor?: TicketWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }


  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrderInclude<ExtArgs> | null
  }



  /**
   * Model CheckIn
   */

  export type AggregateCheckIn = {
    _count: CheckInCountAggregateOutputType | null
    _avg: CheckInAvgAggregateOutputType | null
    _sum: CheckInSumAggregateOutputType | null
    _min: CheckInMinAggregateOutputType | null
    _max: CheckInMaxAggregateOutputType | null
  }

  export type CheckInAvgAggregateOutputType = {
    poaTokenId: number | null
  }

  export type CheckInSumAggregateOutputType = {
    poaTokenId: number | null
  }

  export type CheckInMinAggregateOutputType = {
    id: string | null
    checkedInAt: Date | null
    checkedInBy: string | null
    location: string | null
    poaTokenId: number | null
    poaContractAddr: string | null
    poaTxHash: string | null
    ticketId: string | null
    eventId: string | null
    userId: string | null
  }

  export type CheckInMaxAggregateOutputType = {
    id: string | null
    checkedInAt: Date | null
    checkedInBy: string | null
    location: string | null
    poaTokenId: number | null
    poaContractAddr: string | null
    poaTxHash: string | null
    ticketId: string | null
    eventId: string | null
    userId: string | null
  }

  export type CheckInCountAggregateOutputType = {
    id: number
    checkedInAt: number
    checkedInBy: number
    location: number
    poaTokenId: number
    poaContractAddr: number
    poaTxHash: number
    ticketId: number
    eventId: number
    userId: number
    _all: number
  }


  export type CheckInAvgAggregateInputType = {
    poaTokenId?: true
  }

  export type CheckInSumAggregateInputType = {
    poaTokenId?: true
  }

  export type CheckInMinAggregateInputType = {
    id?: true
    checkedInAt?: true
    checkedInBy?: true
    location?: true
    poaTokenId?: true
    poaContractAddr?: true
    poaTxHash?: true
    ticketId?: true
    eventId?: true
    userId?: true
  }

  export type CheckInMaxAggregateInputType = {
    id?: true
    checkedInAt?: true
    checkedInBy?: true
    location?: true
    poaTokenId?: true
    poaContractAddr?: true
    poaTxHash?: true
    ticketId?: true
    eventId?: true
    userId?: true
  }

  export type CheckInCountAggregateInputType = {
    id?: true
    checkedInAt?: true
    checkedInBy?: true
    location?: true
    poaTokenId?: true
    poaContractAddr?: true
    poaTxHash?: true
    ticketId?: true
    eventId?: true
    userId?: true
    _all?: true
  }

  export type CheckInAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CheckIn to aggregate.
     */
    where?: CheckInWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CheckIns to fetch.
     */
    orderBy?: CheckInOrderByWithRelationInput | CheckInOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CheckInWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CheckIns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CheckIns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CheckIns
    **/
    _count?: true | CheckInCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CheckInAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CheckInSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CheckInMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CheckInMaxAggregateInputType
  }

  export type GetCheckInAggregateType<T extends CheckInAggregateArgs> = {
        [P in keyof T & keyof AggregateCheckIn]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCheckIn[P]>
      : GetScalarType<T[P], AggregateCheckIn[P]>
  }




  export type CheckInGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CheckInWhereInput
    orderBy?: CheckInOrderByWithAggregationInput | CheckInOrderByWithAggregationInput[]
    by: CheckInScalarFieldEnum[] | CheckInScalarFieldEnum
    having?: CheckInScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CheckInCountAggregateInputType | true
    _avg?: CheckInAvgAggregateInputType
    _sum?: CheckInSumAggregateInputType
    _min?: CheckInMinAggregateInputType
    _max?: CheckInMaxAggregateInputType
  }

  export type CheckInGroupByOutputType = {
    id: string
    checkedInAt: Date
    checkedInBy: string | null
    location: string | null
    poaTokenId: number | null
    poaContractAddr: string | null
    poaTxHash: string | null
    ticketId: string
    eventId: string
    userId: string
    _count: CheckInCountAggregateOutputType | null
    _avg: CheckInAvgAggregateOutputType | null
    _sum: CheckInSumAggregateOutputType | null
    _min: CheckInMinAggregateOutputType | null
    _max: CheckInMaxAggregateOutputType | null
  }

  type GetCheckInGroupByPayload<T extends CheckInGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CheckInGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CheckInGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CheckInGroupByOutputType[P]>
            : GetScalarType<T[P], CheckInGroupByOutputType[P]>
        }
      >
    >


  export type CheckInSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    checkedInAt?: boolean
    checkedInBy?: boolean
    location?: boolean
    poaTokenId?: boolean
    poaContractAddr?: boolean
    poaTxHash?: boolean
    ticketId?: boolean
    eventId?: boolean
    userId?: boolean
    ticket?: boolean | TicketDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["checkIn"]>

  export type CheckInSelectScalar = {
    id?: boolean
    checkedInAt?: boolean
    checkedInBy?: boolean
    location?: boolean
    poaTokenId?: boolean
    poaContractAddr?: boolean
    poaTxHash?: boolean
    ticketId?: boolean
    eventId?: boolean
    userId?: boolean
  }

  export type CheckInInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ticket?: boolean | TicketDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }


  export type $CheckInPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CheckIn"
    objects: {
      ticket: Prisma.$TicketPayload<ExtArgs>
      event: Prisma.$EventPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      checkedInAt: Date
      checkedInBy: string | null
      location: string | null
      poaTokenId: number | null
      poaContractAddr: string | null
      poaTxHash: string | null
      ticketId: string
      eventId: string
      userId: string
    }, ExtArgs["result"]["checkIn"]>
    composites: {}
  }


  type CheckInGetPayload<S extends boolean | null | undefined | CheckInDefaultArgs> = $Result.GetResult<Prisma.$CheckInPayload, S>

  type CheckInCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CheckInFindManyArgs, 'select' | 'include' | 'distinct' > & {
      select?: CheckInCountAggregateInputType | true
    }

  export interface CheckInDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CheckIn'], meta: { name: 'CheckIn' } }
    /**
     * Find zero or one CheckIn that matches the filter.
     * @param {CheckInFindUniqueArgs} args - Arguments to find a CheckIn
     * @example
     * // Get one CheckIn
     * const checkIn = await prisma.checkIn.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CheckInFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, CheckInFindUniqueArgs<ExtArgs>>
    ): Prisma__CheckInClient<$Result.GetResult<Prisma.$CheckInPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one CheckIn that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {CheckInFindUniqueOrThrowArgs} args - Arguments to find a CheckIn
     * @example
     * // Get one CheckIn
     * const checkIn = await prisma.checkIn.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends CheckInFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, CheckInFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__CheckInClient<$Result.GetResult<Prisma.$CheckInPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first CheckIn that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckInFindFirstArgs} args - Arguments to find a CheckIn
     * @example
     * // Get one CheckIn
     * const checkIn = await prisma.checkIn.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CheckInFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, CheckInFindFirstArgs<ExtArgs>>
    ): Prisma__CheckInClient<$Result.GetResult<Prisma.$CheckInPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first CheckIn that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckInFindFirstOrThrowArgs} args - Arguments to find a CheckIn
     * @example
     * // Get one CheckIn
     * const checkIn = await prisma.checkIn.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends CheckInFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, CheckInFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__CheckInClient<$Result.GetResult<Prisma.$CheckInPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more CheckIns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckInFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CheckIns
     * const checkIns = await prisma.checkIn.findMany()
     * 
     * // Get first 10 CheckIns
     * const checkIns = await prisma.checkIn.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const checkInWithIdOnly = await prisma.checkIn.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CheckInFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CheckInFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CheckInPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a CheckIn.
     * @param {CheckInCreateArgs} args - Arguments to create a CheckIn.
     * @example
     * // Create one CheckIn
     * const CheckIn = await prisma.checkIn.create({
     *   data: {
     *     // ... data to create a CheckIn
     *   }
     * })
     * 
    **/
    create<T extends CheckInCreateArgs<ExtArgs>>(
      args: SelectSubset<T, CheckInCreateArgs<ExtArgs>>
    ): Prisma__CheckInClient<$Result.GetResult<Prisma.$CheckInPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Delete a CheckIn.
     * @param {CheckInDeleteArgs} args - Arguments to delete one CheckIn.
     * @example
     * // Delete one CheckIn
     * const CheckIn = await prisma.checkIn.delete({
     *   where: {
     *     // ... filter to delete one CheckIn
     *   }
     * })
     * 
    **/
    delete<T extends CheckInDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, CheckInDeleteArgs<ExtArgs>>
    ): Prisma__CheckInClient<$Result.GetResult<Prisma.$CheckInPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one CheckIn.
     * @param {CheckInUpdateArgs} args - Arguments to update one CheckIn.
     * @example
     * // Update one CheckIn
     * const checkIn = await prisma.checkIn.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CheckInUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, CheckInUpdateArgs<ExtArgs>>
    ): Prisma__CheckInClient<$Result.GetResult<Prisma.$CheckInPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more CheckIns.
     * @param {CheckInDeleteManyArgs} args - Arguments to filter CheckIns to delete.
     * @example
     * // Delete a few CheckIns
     * const { count } = await prisma.checkIn.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CheckInDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CheckInDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CheckIns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckInUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CheckIns
     * const checkIn = await prisma.checkIn.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CheckInUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, CheckInUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CheckIn.
     * @param {CheckInUpsertArgs} args - Arguments to update or create a CheckIn.
     * @example
     * // Update or create a CheckIn
     * const checkIn = await prisma.checkIn.upsert({
     *   create: {
     *     // ... data to create a CheckIn
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CheckIn we want to update
     *   }
     * })
    **/
    upsert<T extends CheckInUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, CheckInUpsertArgs<ExtArgs>>
    ): Prisma__CheckInClient<$Result.GetResult<Prisma.$CheckInPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of CheckIns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckInCountArgs} args - Arguments to filter CheckIns to count.
     * @example
     * // Count the number of CheckIns
     * const count = await prisma.checkIn.count({
     *   where: {
     *     // ... the filter for the CheckIns we want to count
     *   }
     * })
    **/
    count<T extends CheckInCountArgs>(
      args?: Subset<T, CheckInCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CheckInCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CheckIn.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckInAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CheckInAggregateArgs>(args: Subset<T, CheckInAggregateArgs>): Prisma.PrismaPromise<GetCheckInAggregateType<T>>

    /**
     * Group by CheckIn.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckInGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CheckInGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CheckInGroupByArgs['orderBy'] }
        : { orderBy?: CheckInGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CheckInGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCheckInGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CheckIn model
   */
  readonly fields: CheckInFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CheckIn.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CheckInClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    ticket<T extends TicketDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TicketDefaultArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    event<T extends EventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDefaultArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the CheckIn model
   */ 
  interface CheckInFieldRefs {
    readonly id: FieldRef<"CheckIn", 'String'>
    readonly checkedInAt: FieldRef<"CheckIn", 'DateTime'>
    readonly checkedInBy: FieldRef<"CheckIn", 'String'>
    readonly location: FieldRef<"CheckIn", 'String'>
    readonly poaTokenId: FieldRef<"CheckIn", 'Int'>
    readonly poaContractAddr: FieldRef<"CheckIn", 'String'>
    readonly poaTxHash: FieldRef<"CheckIn", 'String'>
    readonly ticketId: FieldRef<"CheckIn", 'String'>
    readonly eventId: FieldRef<"CheckIn", 'String'>
    readonly userId: FieldRef<"CheckIn", 'String'>
  }
    

  // Custom InputTypes

  /**
   * CheckIn findUnique
   */
  export type CheckInFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckIn
     */
    select?: CheckInSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CheckInInclude<ExtArgs> | null
    /**
     * Filter, which CheckIn to fetch.
     */
    where: CheckInWhereUniqueInput
  }


  /**
   * CheckIn findUniqueOrThrow
   */
  export type CheckInFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckIn
     */
    select?: CheckInSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CheckInInclude<ExtArgs> | null
    /**
     * Filter, which CheckIn to fetch.
     */
    where: CheckInWhereUniqueInput
  }


  /**
   * CheckIn findFirst
   */
  export type CheckInFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckIn
     */
    select?: CheckInSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CheckInInclude<ExtArgs> | null
    /**
     * Filter, which CheckIn to fetch.
     */
    where?: CheckInWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CheckIns to fetch.
     */
    orderBy?: CheckInOrderByWithRelationInput | CheckInOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CheckIns.
     */
    cursor?: CheckInWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CheckIns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CheckIns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CheckIns.
     */
    distinct?: CheckInScalarFieldEnum | CheckInScalarFieldEnum[]
  }


  /**
   * CheckIn findFirstOrThrow
   */
  export type CheckInFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckIn
     */
    select?: CheckInSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CheckInInclude<ExtArgs> | null
    /**
     * Filter, which CheckIn to fetch.
     */
    where?: CheckInWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CheckIns to fetch.
     */
    orderBy?: CheckInOrderByWithRelationInput | CheckInOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CheckIns.
     */
    cursor?: CheckInWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CheckIns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CheckIns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CheckIns.
     */
    distinct?: CheckInScalarFieldEnum | CheckInScalarFieldEnum[]
  }


  /**
   * CheckIn findMany
   */
  export type CheckInFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckIn
     */
    select?: CheckInSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CheckInInclude<ExtArgs> | null
    /**
     * Filter, which CheckIns to fetch.
     */
    where?: CheckInWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CheckIns to fetch.
     */
    orderBy?: CheckInOrderByWithRelationInput | CheckInOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CheckIns.
     */
    cursor?: CheckInWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CheckIns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CheckIns.
     */
    skip?: number
    distinct?: CheckInScalarFieldEnum | CheckInScalarFieldEnum[]
  }


  /**
   * CheckIn create
   */
  export type CheckInCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckIn
     */
    select?: CheckInSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CheckInInclude<ExtArgs> | null
    /**
     * The data needed to create a CheckIn.
     */
    data: XOR<CheckInCreateInput, CheckInUncheckedCreateInput>
  }


  /**
   * CheckIn update
   */
  export type CheckInUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckIn
     */
    select?: CheckInSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CheckInInclude<ExtArgs> | null
    /**
     * The data needed to update a CheckIn.
     */
    data: XOR<CheckInUpdateInput, CheckInUncheckedUpdateInput>
    /**
     * Choose, which CheckIn to update.
     */
    where: CheckInWhereUniqueInput
  }


  /**
   * CheckIn updateMany
   */
  export type CheckInUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CheckIns.
     */
    data: XOR<CheckInUpdateManyMutationInput, CheckInUncheckedUpdateManyInput>
    /**
     * Filter which CheckIns to update
     */
    where?: CheckInWhereInput
  }


  /**
   * CheckIn upsert
   */
  export type CheckInUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckIn
     */
    select?: CheckInSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CheckInInclude<ExtArgs> | null
    /**
     * The filter to search for the CheckIn to update in case it exists.
     */
    where: CheckInWhereUniqueInput
    /**
     * In case the CheckIn found by the `where` argument doesn't exist, create a new CheckIn with this data.
     */
    create: XOR<CheckInCreateInput, CheckInUncheckedCreateInput>
    /**
     * In case the CheckIn was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CheckInUpdateInput, CheckInUncheckedUpdateInput>
  }


  /**
   * CheckIn delete
   */
  export type CheckInDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckIn
     */
    select?: CheckInSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CheckInInclude<ExtArgs> | null
    /**
     * Filter which CheckIn to delete.
     */
    where: CheckInWhereUniqueInput
  }


  /**
   * CheckIn deleteMany
   */
  export type CheckInDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CheckIns to delete
     */
    where?: CheckInWhereInput
  }


  /**
   * CheckIn without action
   */
  export type CheckInDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckIn
     */
    select?: CheckInSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CheckInInclude<ExtArgs> | null
  }



  /**
   * Model EventAnalytics
   */

  export type AggregateEventAnalytics = {
    _count: EventAnalyticsCountAggregateOutputType | null
    _avg: EventAnalyticsAvgAggregateOutputType | null
    _sum: EventAnalyticsSumAggregateOutputType | null
    _min: EventAnalyticsMinAggregateOutputType | null
    _max: EventAnalyticsMaxAggregateOutputType | null
  }

  export type EventAnalyticsAvgAggregateOutputType = {
    ticketsSold: number | null
    revenue: number | null
    uniqueBuyers: number | null
    checkIns: number | null
    checkInRate: number | null
    noShows: number | null
  }

  export type EventAnalyticsSumAggregateOutputType = {
    ticketsSold: number | null
    revenue: number | null
    uniqueBuyers: number | null
    checkIns: number | null
    checkInRate: number | null
    noShows: number | null
  }

  export type EventAnalyticsMinAggregateOutputType = {
    id: string | null
    date: Date | null
    ticketsSold: number | null
    revenue: number | null
    uniqueBuyers: number | null
    checkIns: number | null
    checkInRate: number | null
    noShows: number | null
    topCountries: string | null
    topCities: string | null
    hourlyBreakdown: string | null
    eventId: string | null
  }

  export type EventAnalyticsMaxAggregateOutputType = {
    id: string | null
    date: Date | null
    ticketsSold: number | null
    revenue: number | null
    uniqueBuyers: number | null
    checkIns: number | null
    checkInRate: number | null
    noShows: number | null
    topCountries: string | null
    topCities: string | null
    hourlyBreakdown: string | null
    eventId: string | null
  }

  export type EventAnalyticsCountAggregateOutputType = {
    id: number
    date: number
    ticketsSold: number
    revenue: number
    uniqueBuyers: number
    checkIns: number
    checkInRate: number
    noShows: number
    topCountries: number
    topCities: number
    hourlyBreakdown: number
    eventId: number
    _all: number
  }


  export type EventAnalyticsAvgAggregateInputType = {
    ticketsSold?: true
    revenue?: true
    uniqueBuyers?: true
    checkIns?: true
    checkInRate?: true
    noShows?: true
  }

  export type EventAnalyticsSumAggregateInputType = {
    ticketsSold?: true
    revenue?: true
    uniqueBuyers?: true
    checkIns?: true
    checkInRate?: true
    noShows?: true
  }

  export type EventAnalyticsMinAggregateInputType = {
    id?: true
    date?: true
    ticketsSold?: true
    revenue?: true
    uniqueBuyers?: true
    checkIns?: true
    checkInRate?: true
    noShows?: true
    topCountries?: true
    topCities?: true
    hourlyBreakdown?: true
    eventId?: true
  }

  export type EventAnalyticsMaxAggregateInputType = {
    id?: true
    date?: true
    ticketsSold?: true
    revenue?: true
    uniqueBuyers?: true
    checkIns?: true
    checkInRate?: true
    noShows?: true
    topCountries?: true
    topCities?: true
    hourlyBreakdown?: true
    eventId?: true
  }

  export type EventAnalyticsCountAggregateInputType = {
    id?: true
    date?: true
    ticketsSold?: true
    revenue?: true
    uniqueBuyers?: true
    checkIns?: true
    checkInRate?: true
    noShows?: true
    topCountries?: true
    topCities?: true
    hourlyBreakdown?: true
    eventId?: true
    _all?: true
  }

  export type EventAnalyticsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventAnalytics to aggregate.
     */
    where?: EventAnalyticsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventAnalytics to fetch.
     */
    orderBy?: EventAnalyticsOrderByWithRelationInput | EventAnalyticsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventAnalyticsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventAnalytics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventAnalytics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EventAnalytics
    **/
    _count?: true | EventAnalyticsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventAnalyticsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventAnalyticsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventAnalyticsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventAnalyticsMaxAggregateInputType
  }

  export type GetEventAnalyticsAggregateType<T extends EventAnalyticsAggregateArgs> = {
        [P in keyof T & keyof AggregateEventAnalytics]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEventAnalytics[P]>
      : GetScalarType<T[P], AggregateEventAnalytics[P]>
  }




  export type EventAnalyticsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventAnalyticsWhereInput
    orderBy?: EventAnalyticsOrderByWithAggregationInput | EventAnalyticsOrderByWithAggregationInput[]
    by: EventAnalyticsScalarFieldEnum[] | EventAnalyticsScalarFieldEnum
    having?: EventAnalyticsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventAnalyticsCountAggregateInputType | true
    _avg?: EventAnalyticsAvgAggregateInputType
    _sum?: EventAnalyticsSumAggregateInputType
    _min?: EventAnalyticsMinAggregateInputType
    _max?: EventAnalyticsMaxAggregateInputType
  }

  export type EventAnalyticsGroupByOutputType = {
    id: string
    date: Date
    ticketsSold: number
    revenue: number
    uniqueBuyers: number
    checkIns: number
    checkInRate: number
    noShows: number
    topCountries: string | null
    topCities: string | null
    hourlyBreakdown: string | null
    eventId: string
    _count: EventAnalyticsCountAggregateOutputType | null
    _avg: EventAnalyticsAvgAggregateOutputType | null
    _sum: EventAnalyticsSumAggregateOutputType | null
    _min: EventAnalyticsMinAggregateOutputType | null
    _max: EventAnalyticsMaxAggregateOutputType | null
  }

  type GetEventAnalyticsGroupByPayload<T extends EventAnalyticsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventAnalyticsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventAnalyticsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventAnalyticsGroupByOutputType[P]>
            : GetScalarType<T[P], EventAnalyticsGroupByOutputType[P]>
        }
      >
    >


  export type EventAnalyticsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    ticketsSold?: boolean
    revenue?: boolean
    uniqueBuyers?: boolean
    checkIns?: boolean
    checkInRate?: boolean
    noShows?: boolean
    topCountries?: boolean
    topCities?: boolean
    hourlyBreakdown?: boolean
    eventId?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventAnalytics"]>

  export type EventAnalyticsSelectScalar = {
    id?: boolean
    date?: boolean
    ticketsSold?: boolean
    revenue?: boolean
    uniqueBuyers?: boolean
    checkIns?: boolean
    checkInRate?: boolean
    noShows?: boolean
    topCountries?: boolean
    topCities?: boolean
    hourlyBreakdown?: boolean
    eventId?: boolean
  }

  export type EventAnalyticsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
  }


  export type $EventAnalyticsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EventAnalytics"
    objects: {
      event: Prisma.$EventPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      date: Date
      ticketsSold: number
      revenue: number
      uniqueBuyers: number
      checkIns: number
      checkInRate: number
      noShows: number
      topCountries: string | null
      topCities: string | null
      hourlyBreakdown: string | null
      eventId: string
    }, ExtArgs["result"]["eventAnalytics"]>
    composites: {}
  }


  type EventAnalyticsGetPayload<S extends boolean | null | undefined | EventAnalyticsDefaultArgs> = $Result.GetResult<Prisma.$EventAnalyticsPayload, S>

  type EventAnalyticsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<EventAnalyticsFindManyArgs, 'select' | 'include' | 'distinct' > & {
      select?: EventAnalyticsCountAggregateInputType | true
    }

  export interface EventAnalyticsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EventAnalytics'], meta: { name: 'EventAnalytics' } }
    /**
     * Find zero or one EventAnalytics that matches the filter.
     * @param {EventAnalyticsFindUniqueArgs} args - Arguments to find a EventAnalytics
     * @example
     * // Get one EventAnalytics
     * const eventAnalytics = await prisma.eventAnalytics.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends EventAnalyticsFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, EventAnalyticsFindUniqueArgs<ExtArgs>>
    ): Prisma__EventAnalyticsClient<$Result.GetResult<Prisma.$EventAnalyticsPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one EventAnalytics that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {EventAnalyticsFindUniqueOrThrowArgs} args - Arguments to find a EventAnalytics
     * @example
     * // Get one EventAnalytics
     * const eventAnalytics = await prisma.eventAnalytics.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends EventAnalyticsFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, EventAnalyticsFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__EventAnalyticsClient<$Result.GetResult<Prisma.$EventAnalyticsPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first EventAnalytics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAnalyticsFindFirstArgs} args - Arguments to find a EventAnalytics
     * @example
     * // Get one EventAnalytics
     * const eventAnalytics = await prisma.eventAnalytics.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends EventAnalyticsFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, EventAnalyticsFindFirstArgs<ExtArgs>>
    ): Prisma__EventAnalyticsClient<$Result.GetResult<Prisma.$EventAnalyticsPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first EventAnalytics that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAnalyticsFindFirstOrThrowArgs} args - Arguments to find a EventAnalytics
     * @example
     * // Get one EventAnalytics
     * const eventAnalytics = await prisma.eventAnalytics.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends EventAnalyticsFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, EventAnalyticsFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__EventAnalyticsClient<$Result.GetResult<Prisma.$EventAnalyticsPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more EventAnalytics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAnalyticsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EventAnalytics
     * const eventAnalytics = await prisma.eventAnalytics.findMany()
     * 
     * // Get first 10 EventAnalytics
     * const eventAnalytics = await prisma.eventAnalytics.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventAnalyticsWithIdOnly = await prisma.eventAnalytics.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends EventAnalyticsFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, EventAnalyticsFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventAnalyticsPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a EventAnalytics.
     * @param {EventAnalyticsCreateArgs} args - Arguments to create a EventAnalytics.
     * @example
     * // Create one EventAnalytics
     * const EventAnalytics = await prisma.eventAnalytics.create({
     *   data: {
     *     // ... data to create a EventAnalytics
     *   }
     * })
     * 
    **/
    create<T extends EventAnalyticsCreateArgs<ExtArgs>>(
      args: SelectSubset<T, EventAnalyticsCreateArgs<ExtArgs>>
    ): Prisma__EventAnalyticsClient<$Result.GetResult<Prisma.$EventAnalyticsPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Delete a EventAnalytics.
     * @param {EventAnalyticsDeleteArgs} args - Arguments to delete one EventAnalytics.
     * @example
     * // Delete one EventAnalytics
     * const EventAnalytics = await prisma.eventAnalytics.delete({
     *   where: {
     *     // ... filter to delete one EventAnalytics
     *   }
     * })
     * 
    **/
    delete<T extends EventAnalyticsDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, EventAnalyticsDeleteArgs<ExtArgs>>
    ): Prisma__EventAnalyticsClient<$Result.GetResult<Prisma.$EventAnalyticsPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one EventAnalytics.
     * @param {EventAnalyticsUpdateArgs} args - Arguments to update one EventAnalytics.
     * @example
     * // Update one EventAnalytics
     * const eventAnalytics = await prisma.eventAnalytics.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends EventAnalyticsUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, EventAnalyticsUpdateArgs<ExtArgs>>
    ): Prisma__EventAnalyticsClient<$Result.GetResult<Prisma.$EventAnalyticsPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more EventAnalytics.
     * @param {EventAnalyticsDeleteManyArgs} args - Arguments to filter EventAnalytics to delete.
     * @example
     * // Delete a few EventAnalytics
     * const { count } = await prisma.eventAnalytics.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends EventAnalyticsDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, EventAnalyticsDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventAnalytics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAnalyticsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EventAnalytics
     * const eventAnalytics = await prisma.eventAnalytics.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends EventAnalyticsUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, EventAnalyticsUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one EventAnalytics.
     * @param {EventAnalyticsUpsertArgs} args - Arguments to update or create a EventAnalytics.
     * @example
     * // Update or create a EventAnalytics
     * const eventAnalytics = await prisma.eventAnalytics.upsert({
     *   create: {
     *     // ... data to create a EventAnalytics
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EventAnalytics we want to update
     *   }
     * })
    **/
    upsert<T extends EventAnalyticsUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, EventAnalyticsUpsertArgs<ExtArgs>>
    ): Prisma__EventAnalyticsClient<$Result.GetResult<Prisma.$EventAnalyticsPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of EventAnalytics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAnalyticsCountArgs} args - Arguments to filter EventAnalytics to count.
     * @example
     * // Count the number of EventAnalytics
     * const count = await prisma.eventAnalytics.count({
     *   where: {
     *     // ... the filter for the EventAnalytics we want to count
     *   }
     * })
    **/
    count<T extends EventAnalyticsCountArgs>(
      args?: Subset<T, EventAnalyticsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventAnalyticsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EventAnalytics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAnalyticsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventAnalyticsAggregateArgs>(args: Subset<T, EventAnalyticsAggregateArgs>): Prisma.PrismaPromise<GetEventAnalyticsAggregateType<T>>

    /**
     * Group by EventAnalytics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAnalyticsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EventAnalyticsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventAnalyticsGroupByArgs['orderBy'] }
        : { orderBy?: EventAnalyticsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EventAnalyticsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventAnalyticsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EventAnalytics model
   */
  readonly fields: EventAnalyticsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EventAnalytics.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventAnalyticsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    event<T extends EventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDefaultArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the EventAnalytics model
   */ 
  interface EventAnalyticsFieldRefs {
    readonly id: FieldRef<"EventAnalytics", 'String'>
    readonly date: FieldRef<"EventAnalytics", 'DateTime'>
    readonly ticketsSold: FieldRef<"EventAnalytics", 'Int'>
    readonly revenue: FieldRef<"EventAnalytics", 'Float'>
    readonly uniqueBuyers: FieldRef<"EventAnalytics", 'Int'>
    readonly checkIns: FieldRef<"EventAnalytics", 'Int'>
    readonly checkInRate: FieldRef<"EventAnalytics", 'Float'>
    readonly noShows: FieldRef<"EventAnalytics", 'Int'>
    readonly topCountries: FieldRef<"EventAnalytics", 'String'>
    readonly topCities: FieldRef<"EventAnalytics", 'String'>
    readonly hourlyBreakdown: FieldRef<"EventAnalytics", 'String'>
    readonly eventId: FieldRef<"EventAnalytics", 'String'>
  }
    

  // Custom InputTypes

  /**
   * EventAnalytics findUnique
   */
  export type EventAnalyticsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAnalytics
     */
    select?: EventAnalyticsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EventAnalyticsInclude<ExtArgs> | null
    /**
     * Filter, which EventAnalytics to fetch.
     */
    where: EventAnalyticsWhereUniqueInput
  }


  /**
   * EventAnalytics findUniqueOrThrow
   */
  export type EventAnalyticsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAnalytics
     */
    select?: EventAnalyticsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EventAnalyticsInclude<ExtArgs> | null
    /**
     * Filter, which EventAnalytics to fetch.
     */
    where: EventAnalyticsWhereUniqueInput
  }


  /**
   * EventAnalytics findFirst
   */
  export type EventAnalyticsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAnalytics
     */
    select?: EventAnalyticsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EventAnalyticsInclude<ExtArgs> | null
    /**
     * Filter, which EventAnalytics to fetch.
     */
    where?: EventAnalyticsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventAnalytics to fetch.
     */
    orderBy?: EventAnalyticsOrderByWithRelationInput | EventAnalyticsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventAnalytics.
     */
    cursor?: EventAnalyticsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventAnalytics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventAnalytics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventAnalytics.
     */
    distinct?: EventAnalyticsScalarFieldEnum | EventAnalyticsScalarFieldEnum[]
  }


  /**
   * EventAnalytics findFirstOrThrow
   */
  export type EventAnalyticsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAnalytics
     */
    select?: EventAnalyticsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EventAnalyticsInclude<ExtArgs> | null
    /**
     * Filter, which EventAnalytics to fetch.
     */
    where?: EventAnalyticsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventAnalytics to fetch.
     */
    orderBy?: EventAnalyticsOrderByWithRelationInput | EventAnalyticsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventAnalytics.
     */
    cursor?: EventAnalyticsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventAnalytics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventAnalytics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventAnalytics.
     */
    distinct?: EventAnalyticsScalarFieldEnum | EventAnalyticsScalarFieldEnum[]
  }


  /**
   * EventAnalytics findMany
   */
  export type EventAnalyticsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAnalytics
     */
    select?: EventAnalyticsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EventAnalyticsInclude<ExtArgs> | null
    /**
     * Filter, which EventAnalytics to fetch.
     */
    where?: EventAnalyticsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventAnalytics to fetch.
     */
    orderBy?: EventAnalyticsOrderByWithRelationInput | EventAnalyticsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EventAnalytics.
     */
    cursor?: EventAnalyticsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventAnalytics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventAnalytics.
     */
    skip?: number
    distinct?: EventAnalyticsScalarFieldEnum | EventAnalyticsScalarFieldEnum[]
  }


  /**
   * EventAnalytics create
   */
  export type EventAnalyticsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAnalytics
     */
    select?: EventAnalyticsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EventAnalyticsInclude<ExtArgs> | null
    /**
     * The data needed to create a EventAnalytics.
     */
    data: XOR<EventAnalyticsCreateInput, EventAnalyticsUncheckedCreateInput>
  }


  /**
   * EventAnalytics update
   */
  export type EventAnalyticsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAnalytics
     */
    select?: EventAnalyticsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EventAnalyticsInclude<ExtArgs> | null
    /**
     * The data needed to update a EventAnalytics.
     */
    data: XOR<EventAnalyticsUpdateInput, EventAnalyticsUncheckedUpdateInput>
    /**
     * Choose, which EventAnalytics to update.
     */
    where: EventAnalyticsWhereUniqueInput
  }


  /**
   * EventAnalytics updateMany
   */
  export type EventAnalyticsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EventAnalytics.
     */
    data: XOR<EventAnalyticsUpdateManyMutationInput, EventAnalyticsUncheckedUpdateManyInput>
    /**
     * Filter which EventAnalytics to update
     */
    where?: EventAnalyticsWhereInput
  }


  /**
   * EventAnalytics upsert
   */
  export type EventAnalyticsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAnalytics
     */
    select?: EventAnalyticsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EventAnalyticsInclude<ExtArgs> | null
    /**
     * The filter to search for the EventAnalytics to update in case it exists.
     */
    where: EventAnalyticsWhereUniqueInput
    /**
     * In case the EventAnalytics found by the `where` argument doesn't exist, create a new EventAnalytics with this data.
     */
    create: XOR<EventAnalyticsCreateInput, EventAnalyticsUncheckedCreateInput>
    /**
     * In case the EventAnalytics was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventAnalyticsUpdateInput, EventAnalyticsUncheckedUpdateInput>
  }


  /**
   * EventAnalytics delete
   */
  export type EventAnalyticsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAnalytics
     */
    select?: EventAnalyticsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EventAnalyticsInclude<ExtArgs> | null
    /**
     * Filter which EventAnalytics to delete.
     */
    where: EventAnalyticsWhereUniqueInput
  }


  /**
   * EventAnalytics deleteMany
   */
  export type EventAnalyticsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventAnalytics to delete
     */
    where?: EventAnalyticsWhereInput
  }


  /**
   * EventAnalytics without action
   */
  export type EventAnalyticsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventAnalytics
     */
    select?: EventAnalyticsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EventAnalyticsInclude<ExtArgs> | null
  }



  /**
   * Model TicketTier
   */

  export type AggregateTicketTier = {
    _count: TicketTierCountAggregateOutputType | null
    _avg: TicketTierAvgAggregateOutputType | null
    _sum: TicketTierSumAggregateOutputType | null
    _min: TicketTierMinAggregateOutputType | null
    _max: TicketTierMaxAggregateOutputType | null
  }

  export type TicketTierAvgAggregateOutputType = {
    price: number | null
    availableQuantity: number | null
    maxPerPerson: number | null
  }

  export type TicketTierSumAggregateOutputType = {
    price: number | null
    availableQuantity: number | null
    maxPerPerson: number | null
  }

  export type TicketTierMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    price: number | null
    availableQuantity: number | null
    maxPerPerson: number | null
    saleStart: Date | null
    saleEnd: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    eventId: string | null
  }

  export type TicketTierMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    price: number | null
    availableQuantity: number | null
    maxPerPerson: number | null
    saleStart: Date | null
    saleEnd: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    eventId: string | null
  }

  export type TicketTierCountAggregateOutputType = {
    id: number
    name: number
    description: number
    price: number
    availableQuantity: number
    maxPerPerson: number
    saleStart: number
    saleEnd: number
    createdAt: number
    updatedAt: number
    eventId: number
    _all: number
  }


  export type TicketTierAvgAggregateInputType = {
    price?: true
    availableQuantity?: true
    maxPerPerson?: true
  }

  export type TicketTierSumAggregateInputType = {
    price?: true
    availableQuantity?: true
    maxPerPerson?: true
  }

  export type TicketTierMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    price?: true
    availableQuantity?: true
    maxPerPerson?: true
    saleStart?: true
    saleEnd?: true
    createdAt?: true
    updatedAt?: true
    eventId?: true
  }

  export type TicketTierMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    price?: true
    availableQuantity?: true
    maxPerPerson?: true
    saleStart?: true
    saleEnd?: true
    createdAt?: true
    updatedAt?: true
    eventId?: true
  }

  export type TicketTierCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    price?: true
    availableQuantity?: true
    maxPerPerson?: true
    saleStart?: true
    saleEnd?: true
    createdAt?: true
    updatedAt?: true
    eventId?: true
    _all?: true
  }

  export type TicketTierAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TicketTier to aggregate.
     */
    where?: TicketTierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TicketTiers to fetch.
     */
    orderBy?: TicketTierOrderByWithRelationInput | TicketTierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TicketTierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TicketTiers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TicketTiers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TicketTiers
    **/
    _count?: true | TicketTierCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TicketTierAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TicketTierSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TicketTierMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TicketTierMaxAggregateInputType
  }

  export type GetTicketTierAggregateType<T extends TicketTierAggregateArgs> = {
        [P in keyof T & keyof AggregateTicketTier]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTicketTier[P]>
      : GetScalarType<T[P], AggregateTicketTier[P]>
  }




  export type TicketTierGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketTierWhereInput
    orderBy?: TicketTierOrderByWithAggregationInput | TicketTierOrderByWithAggregationInput[]
    by: TicketTierScalarFieldEnum[] | TicketTierScalarFieldEnum
    having?: TicketTierScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TicketTierCountAggregateInputType | true
    _avg?: TicketTierAvgAggregateInputType
    _sum?: TicketTierSumAggregateInputType
    _min?: TicketTierMinAggregateInputType
    _max?: TicketTierMaxAggregateInputType
  }

  export type TicketTierGroupByOutputType = {
    id: string
    name: string
    description: string | null
    price: number
    availableQuantity: number
    maxPerPerson: number
    saleStart: Date
    saleEnd: Date
    createdAt: Date
    updatedAt: Date
    eventId: string
    _count: TicketTierCountAggregateOutputType | null
    _avg: TicketTierAvgAggregateOutputType | null
    _sum: TicketTierSumAggregateOutputType | null
    _min: TicketTierMinAggregateOutputType | null
    _max: TicketTierMaxAggregateOutputType | null
  }

  type GetTicketTierGroupByPayload<T extends TicketTierGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TicketTierGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TicketTierGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TicketTierGroupByOutputType[P]>
            : GetScalarType<T[P], TicketTierGroupByOutputType[P]>
        }
      >
    >


  export type TicketTierSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    availableQuantity?: boolean
    maxPerPerson?: boolean
    saleStart?: boolean
    saleEnd?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    eventId?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ticketTier"]>

  export type TicketTierSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    availableQuantity?: boolean
    maxPerPerson?: boolean
    saleStart?: boolean
    saleEnd?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    eventId?: boolean
  }

  export type TicketTierInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
  }


  export type $TicketTierPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TicketTier"
    objects: {
      event: Prisma.$EventPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      price: number
      availableQuantity: number
      maxPerPerson: number
      saleStart: Date
      saleEnd: Date
      createdAt: Date
      updatedAt: Date
      eventId: string
    }, ExtArgs["result"]["ticketTier"]>
    composites: {}
  }


  type TicketTierGetPayload<S extends boolean | null | undefined | TicketTierDefaultArgs> = $Result.GetResult<Prisma.$TicketTierPayload, S>

  type TicketTierCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TicketTierFindManyArgs, 'select' | 'include' | 'distinct' > & {
      select?: TicketTierCountAggregateInputType | true
    }

  export interface TicketTierDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TicketTier'], meta: { name: 'TicketTier' } }
    /**
     * Find zero or one TicketTier that matches the filter.
     * @param {TicketTierFindUniqueArgs} args - Arguments to find a TicketTier
     * @example
     * // Get one TicketTier
     * const ticketTier = await prisma.ticketTier.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TicketTierFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, TicketTierFindUniqueArgs<ExtArgs>>
    ): Prisma__TicketTierClient<$Result.GetResult<Prisma.$TicketTierPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one TicketTier that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {TicketTierFindUniqueOrThrowArgs} args - Arguments to find a TicketTier
     * @example
     * // Get one TicketTier
     * const ticketTier = await prisma.ticketTier.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TicketTierFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, TicketTierFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__TicketTierClient<$Result.GetResult<Prisma.$TicketTierPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first TicketTier that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketTierFindFirstArgs} args - Arguments to find a TicketTier
     * @example
     * // Get one TicketTier
     * const ticketTier = await prisma.ticketTier.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TicketTierFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, TicketTierFindFirstArgs<ExtArgs>>
    ): Prisma__TicketTierClient<$Result.GetResult<Prisma.$TicketTierPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first TicketTier that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketTierFindFirstOrThrowArgs} args - Arguments to find a TicketTier
     * @example
     * // Get one TicketTier
     * const ticketTier = await prisma.ticketTier.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TicketTierFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, TicketTierFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__TicketTierClient<$Result.GetResult<Prisma.$TicketTierPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more TicketTiers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketTierFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TicketTiers
     * const ticketTiers = await prisma.ticketTier.findMany()
     * 
     * // Get first 10 TicketTiers
     * const ticketTiers = await prisma.ticketTier.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ticketTierWithIdOnly = await prisma.ticketTier.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TicketTierFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TicketTierFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketTierPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a TicketTier.
     * @param {TicketTierCreateArgs} args - Arguments to create a TicketTier.
     * @example
     * // Create one TicketTier
     * const TicketTier = await prisma.ticketTier.create({
     *   data: {
     *     // ... data to create a TicketTier
     *   }
     * })
     * 
    **/
    create<T extends TicketTierCreateArgs<ExtArgs>>(
      args: SelectSubset<T, TicketTierCreateArgs<ExtArgs>>
    ): Prisma__TicketTierClient<$Result.GetResult<Prisma.$TicketTierPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Delete a TicketTier.
     * @param {TicketTierDeleteArgs} args - Arguments to delete one TicketTier.
     * @example
     * // Delete one TicketTier
     * const TicketTier = await prisma.ticketTier.delete({
     *   where: {
     *     // ... filter to delete one TicketTier
     *   }
     * })
     * 
    **/
    delete<T extends TicketTierDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, TicketTierDeleteArgs<ExtArgs>>
    ): Prisma__TicketTierClient<$Result.GetResult<Prisma.$TicketTierPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one TicketTier.
     * @param {TicketTierUpdateArgs} args - Arguments to update one TicketTier.
     * @example
     * // Update one TicketTier
     * const ticketTier = await prisma.ticketTier.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TicketTierUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, TicketTierUpdateArgs<ExtArgs>>
    ): Prisma__TicketTierClient<$Result.GetResult<Prisma.$TicketTierPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more TicketTiers.
     * @param {TicketTierDeleteManyArgs} args - Arguments to filter TicketTiers to delete.
     * @example
     * // Delete a few TicketTiers
     * const { count } = await prisma.ticketTier.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TicketTierDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TicketTierDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TicketTiers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketTierUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TicketTiers
     * const ticketTier = await prisma.ticketTier.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TicketTierUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, TicketTierUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TicketTier.
     * @param {TicketTierUpsertArgs} args - Arguments to update or create a TicketTier.
     * @example
     * // Update or create a TicketTier
     * const ticketTier = await prisma.ticketTier.upsert({
     *   create: {
     *     // ... data to create a TicketTier
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TicketTier we want to update
     *   }
     * })
    **/
    upsert<T extends TicketTierUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, TicketTierUpsertArgs<ExtArgs>>
    ): Prisma__TicketTierClient<$Result.GetResult<Prisma.$TicketTierPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of TicketTiers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketTierCountArgs} args - Arguments to filter TicketTiers to count.
     * @example
     * // Count the number of TicketTiers
     * const count = await prisma.ticketTier.count({
     *   where: {
     *     // ... the filter for the TicketTiers we want to count
     *   }
     * })
    **/
    count<T extends TicketTierCountArgs>(
      args?: Subset<T, TicketTierCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TicketTierCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TicketTier.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketTierAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TicketTierAggregateArgs>(args: Subset<T, TicketTierAggregateArgs>): Prisma.PrismaPromise<GetTicketTierAggregateType<T>>

    /**
     * Group by TicketTier.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketTierGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TicketTierGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TicketTierGroupByArgs['orderBy'] }
        : { orderBy?: TicketTierGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TicketTierGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTicketTierGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TicketTier model
   */
  readonly fields: TicketTierFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TicketTier.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TicketTierClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    event<T extends EventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDefaultArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the TicketTier model
   */ 
  interface TicketTierFieldRefs {
    readonly id: FieldRef<"TicketTier", 'String'>
    readonly name: FieldRef<"TicketTier", 'String'>
    readonly description: FieldRef<"TicketTier", 'String'>
    readonly price: FieldRef<"TicketTier", 'Float'>
    readonly availableQuantity: FieldRef<"TicketTier", 'Int'>
    readonly maxPerPerson: FieldRef<"TicketTier", 'Int'>
    readonly saleStart: FieldRef<"TicketTier", 'DateTime'>
    readonly saleEnd: FieldRef<"TicketTier", 'DateTime'>
    readonly createdAt: FieldRef<"TicketTier", 'DateTime'>
    readonly updatedAt: FieldRef<"TicketTier", 'DateTime'>
    readonly eventId: FieldRef<"TicketTier", 'String'>
  }
    

  // Custom InputTypes

  /**
   * TicketTier findUnique
   */
  export type TicketTierFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketTier
     */
    select?: TicketTierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketTierInclude<ExtArgs> | null
    /**
     * Filter, which TicketTier to fetch.
     */
    where: TicketTierWhereUniqueInput
  }


  /**
   * TicketTier findUniqueOrThrow
   */
  export type TicketTierFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketTier
     */
    select?: TicketTierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketTierInclude<ExtArgs> | null
    /**
     * Filter, which TicketTier to fetch.
     */
    where: TicketTierWhereUniqueInput
  }


  /**
   * TicketTier findFirst
   */
  export type TicketTierFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketTier
     */
    select?: TicketTierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketTierInclude<ExtArgs> | null
    /**
     * Filter, which TicketTier to fetch.
     */
    where?: TicketTierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TicketTiers to fetch.
     */
    orderBy?: TicketTierOrderByWithRelationInput | TicketTierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TicketTiers.
     */
    cursor?: TicketTierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TicketTiers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TicketTiers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TicketTiers.
     */
    distinct?: TicketTierScalarFieldEnum | TicketTierScalarFieldEnum[]
  }


  /**
   * TicketTier findFirstOrThrow
   */
  export type TicketTierFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketTier
     */
    select?: TicketTierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketTierInclude<ExtArgs> | null
    /**
     * Filter, which TicketTier to fetch.
     */
    where?: TicketTierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TicketTiers to fetch.
     */
    orderBy?: TicketTierOrderByWithRelationInput | TicketTierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TicketTiers.
     */
    cursor?: TicketTierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TicketTiers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TicketTiers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TicketTiers.
     */
    distinct?: TicketTierScalarFieldEnum | TicketTierScalarFieldEnum[]
  }


  /**
   * TicketTier findMany
   */
  export type TicketTierFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketTier
     */
    select?: TicketTierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketTierInclude<ExtArgs> | null
    /**
     * Filter, which TicketTiers to fetch.
     */
    where?: TicketTierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TicketTiers to fetch.
     */
    orderBy?: TicketTierOrderByWithRelationInput | TicketTierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TicketTiers.
     */
    cursor?: TicketTierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TicketTiers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TicketTiers.
     */
    skip?: number
    distinct?: TicketTierScalarFieldEnum | TicketTierScalarFieldEnum[]
  }


  /**
   * TicketTier create
   */
  export type TicketTierCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketTier
     */
    select?: TicketTierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketTierInclude<ExtArgs> | null
    /**
     * The data needed to create a TicketTier.
     */
    data: XOR<TicketTierCreateInput, TicketTierUncheckedCreateInput>
  }


  /**
   * TicketTier update
   */
  export type TicketTierUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketTier
     */
    select?: TicketTierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketTierInclude<ExtArgs> | null
    /**
     * The data needed to update a TicketTier.
     */
    data: XOR<TicketTierUpdateInput, TicketTierUncheckedUpdateInput>
    /**
     * Choose, which TicketTier to update.
     */
    where: TicketTierWhereUniqueInput
  }


  /**
   * TicketTier updateMany
   */
  export type TicketTierUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TicketTiers.
     */
    data: XOR<TicketTierUpdateManyMutationInput, TicketTierUncheckedUpdateManyInput>
    /**
     * Filter which TicketTiers to update
     */
    where?: TicketTierWhereInput
  }


  /**
   * TicketTier upsert
   */
  export type TicketTierUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketTier
     */
    select?: TicketTierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketTierInclude<ExtArgs> | null
    /**
     * The filter to search for the TicketTier to update in case it exists.
     */
    where: TicketTierWhereUniqueInput
    /**
     * In case the TicketTier found by the `where` argument doesn't exist, create a new TicketTier with this data.
     */
    create: XOR<TicketTierCreateInput, TicketTierUncheckedCreateInput>
    /**
     * In case the TicketTier was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TicketTierUpdateInput, TicketTierUncheckedUpdateInput>
  }


  /**
   * TicketTier delete
   */
  export type TicketTierDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketTier
     */
    select?: TicketTierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketTierInclude<ExtArgs> | null
    /**
     * Filter which TicketTier to delete.
     */
    where: TicketTierWhereUniqueInput
  }


  /**
   * TicketTier deleteMany
   */
  export type TicketTierDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TicketTiers to delete
     */
    where?: TicketTierWhereInput
  }


  /**
   * TicketTier without action
   */
  export type TicketTierDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketTier
     */
    select?: TicketTierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TicketTierInclude<ExtArgs> | null
  }



  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
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

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const EventScalarFieldEnum: {
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

  export type EventScalarFieldEnum = (typeof EventScalarFieldEnum)[keyof typeof EventScalarFieldEnum]


  export const TicketScalarFieldEnum: {
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

  export type TicketScalarFieldEnum = (typeof TicketScalarFieldEnum)[keyof typeof TicketScalarFieldEnum]


  export const OrderScalarFieldEnum: {
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

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const CheckInScalarFieldEnum: {
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

  export type CheckInScalarFieldEnum = (typeof CheckInScalarFieldEnum)[keyof typeof CheckInScalarFieldEnum]


  export const EventAnalyticsScalarFieldEnum: {
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

  export type EventAnalyticsScalarFieldEnum = (typeof EventAnalyticsScalarFieldEnum)[keyof typeof EventAnalyticsScalarFieldEnum]


  export const TicketTierScalarFieldEnum: {
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

  export type TicketTierScalarFieldEnum = (typeof TicketTierScalarFieldEnum)[keyof typeof TicketTierScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringNullableFilter<"User"> | string | null
    name?: StringNullableFilter<"User"> | string | null
    walletAddress?: StringNullableFilter<"User"> | string | null
    googleId?: StringNullableFilter<"User"> | string | null
    twitterId?: StringNullableFilter<"User"> | string | null
    avatar?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    resetToken?: StringNullableFilter<"User"> | string | null
    resetTokenExpiry?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    organizedEvents?: EventListRelationFilter
    orders?: OrderListRelationFilter
    checkIns?: CheckInListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    walletAddress?: SortOrderInput | SortOrder
    googleId?: SortOrderInput | SortOrder
    twitterId?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    role?: SortOrder
    resetToken?: SortOrderInput | SortOrder
    resetTokenExpiry?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organizedEvents?: EventOrderByRelationAggregateInput
    orders?: OrderOrderByRelationAggregateInput
    checkIns?: CheckInOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    walletAddress?: string
    googleId?: string
    twitterId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringNullableFilter<"User"> | string | null
    name?: StringNullableFilter<"User"> | string | null
    avatar?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    resetToken?: StringNullableFilter<"User"> | string | null
    resetTokenExpiry?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    organizedEvents?: EventListRelationFilter
    orders?: OrderListRelationFilter
    checkIns?: CheckInListRelationFilter
  }, "id" | "email" | "walletAddress" | "googleId" | "twitterId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    walletAddress?: SortOrderInput | SortOrder
    googleId?: SortOrderInput | SortOrder
    twitterId?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    role?: SortOrder
    resetToken?: SortOrderInput | SortOrder
    resetTokenExpiry?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    walletAddress?: StringNullableWithAggregatesFilter<"User"> | string | null
    googleId?: StringNullableWithAggregatesFilter<"User"> | string | null
    twitterId?: StringNullableWithAggregatesFilter<"User"> | string | null
    avatar?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: StringWithAggregatesFilter<"User"> | string
    resetToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    resetTokenExpiry?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type EventWhereInput = {
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    id?: StringFilter<"Event"> | string
    title?: StringFilter<"Event"> | string
    description?: StringNullableFilter<"Event"> | string | null
    venue?: StringFilter<"Event"> | string
    address?: StringNullableFilter<"Event"> | string | null
    city?: StringNullableFilter<"Event"> | string | null
    country?: StringNullableFilter<"Event"> | string | null
    latitude?: FloatNullableFilter<"Event"> | number | null
    longitude?: FloatNullableFilter<"Event"> | number | null
    eventDate?: DateTimeFilter<"Event"> | Date | string
    saleStart?: DateTimeFilter<"Event"> | Date | string
    saleEnd?: DateTimeFilter<"Event"> | Date | string
    totalSupply?: IntFilter<"Event"> | number
    ticketPrice?: FloatFilter<"Event"> | number
    currency?: StringFilter<"Event"> | string
    maxPerWallet?: IntFilter<"Event"> | number
    contractAddress?: StringNullableFilter<"Event"> | string | null
    chainId?: IntFilter<"Event"> | number
    imageUrl?: StringNullableFilter<"Event"> | string | null
    metadataUri?: StringNullableFilter<"Event"> | string | null
    category?: StringFilter<"Event"> | string
    tags?: StringFilter<"Event"> | string
    isPublic?: BoolFilter<"Event"> | boolean
    allowTransfers?: BoolFilter<"Event"> | boolean
    requireKYC?: BoolFilter<"Event"> | boolean
    status?: StringFilter<"Event"> | string
    createdAt?: DateTimeFilter<"Event"> | Date | string
    updatedAt?: DateTimeFilter<"Event"> | Date | string
    organizerId?: StringFilter<"Event"> | string
    organizer?: XOR<UserRelationFilter, UserWhereInput>
    orders?: OrderListRelationFilter
    tickets?: TicketListRelationFilter
    checkIns?: CheckInListRelationFilter
    analytics?: EventAnalyticsListRelationFilter
    tiers?: TicketTierListRelationFilter
  }

  export type EventOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    venue?: SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    eventDate?: SortOrder
    saleStart?: SortOrder
    saleEnd?: SortOrder
    totalSupply?: SortOrder
    ticketPrice?: SortOrder
    currency?: SortOrder
    maxPerWallet?: SortOrder
    contractAddress?: SortOrderInput | SortOrder
    chainId?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    metadataUri?: SortOrderInput | SortOrder
    category?: SortOrder
    tags?: SortOrder
    isPublic?: SortOrder
    allowTransfers?: SortOrder
    requireKYC?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organizerId?: SortOrder
    organizer?: UserOrderByWithRelationInput
    orders?: OrderOrderByRelationAggregateInput
    tickets?: TicketOrderByRelationAggregateInput
    checkIns?: CheckInOrderByRelationAggregateInput
    analytics?: EventAnalyticsOrderByRelationAggregateInput
    tiers?: TicketTierOrderByRelationAggregateInput
  }

  export type EventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    title?: StringFilter<"Event"> | string
    description?: StringNullableFilter<"Event"> | string | null
    venue?: StringFilter<"Event"> | string
    address?: StringNullableFilter<"Event"> | string | null
    city?: StringNullableFilter<"Event"> | string | null
    country?: StringNullableFilter<"Event"> | string | null
    latitude?: FloatNullableFilter<"Event"> | number | null
    longitude?: FloatNullableFilter<"Event"> | number | null
    eventDate?: DateTimeFilter<"Event"> | Date | string
    saleStart?: DateTimeFilter<"Event"> | Date | string
    saleEnd?: DateTimeFilter<"Event"> | Date | string
    totalSupply?: IntFilter<"Event"> | number
    ticketPrice?: FloatFilter<"Event"> | number
    currency?: StringFilter<"Event"> | string
    maxPerWallet?: IntFilter<"Event"> | number
    contractAddress?: StringNullableFilter<"Event"> | string | null
    chainId?: IntFilter<"Event"> | number
    imageUrl?: StringNullableFilter<"Event"> | string | null
    metadataUri?: StringNullableFilter<"Event"> | string | null
    category?: StringFilter<"Event"> | string
    tags?: StringFilter<"Event"> | string
    isPublic?: BoolFilter<"Event"> | boolean
    allowTransfers?: BoolFilter<"Event"> | boolean
    requireKYC?: BoolFilter<"Event"> | boolean
    status?: StringFilter<"Event"> | string
    createdAt?: DateTimeFilter<"Event"> | Date | string
    updatedAt?: DateTimeFilter<"Event"> | Date | string
    organizerId?: StringFilter<"Event"> | string
    organizer?: XOR<UserRelationFilter, UserWhereInput>
    orders?: OrderListRelationFilter
    tickets?: TicketListRelationFilter
    checkIns?: CheckInListRelationFilter
    analytics?: EventAnalyticsListRelationFilter
    tiers?: TicketTierListRelationFilter
  }, "id">

  export type EventOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    venue?: SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    eventDate?: SortOrder
    saleStart?: SortOrder
    saleEnd?: SortOrder
    totalSupply?: SortOrder
    ticketPrice?: SortOrder
    currency?: SortOrder
    maxPerWallet?: SortOrder
    contractAddress?: SortOrderInput | SortOrder
    chainId?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    metadataUri?: SortOrderInput | SortOrder
    category?: SortOrder
    tags?: SortOrder
    isPublic?: SortOrder
    allowTransfers?: SortOrder
    requireKYC?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organizerId?: SortOrder
    _count?: EventCountOrderByAggregateInput
    _avg?: EventAvgOrderByAggregateInput
    _max?: EventMaxOrderByAggregateInput
    _min?: EventMinOrderByAggregateInput
    _sum?: EventSumOrderByAggregateInput
  }

  export type EventScalarWhereWithAggregatesInput = {
    AND?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    OR?: EventScalarWhereWithAggregatesInput[]
    NOT?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Event"> | string
    title?: StringWithAggregatesFilter<"Event"> | string
    description?: StringNullableWithAggregatesFilter<"Event"> | string | null
    venue?: StringWithAggregatesFilter<"Event"> | string
    address?: StringNullableWithAggregatesFilter<"Event"> | string | null
    city?: StringNullableWithAggregatesFilter<"Event"> | string | null
    country?: StringNullableWithAggregatesFilter<"Event"> | string | null
    latitude?: FloatNullableWithAggregatesFilter<"Event"> | number | null
    longitude?: FloatNullableWithAggregatesFilter<"Event"> | number | null
    eventDate?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    saleStart?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    saleEnd?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    totalSupply?: IntWithAggregatesFilter<"Event"> | number
    ticketPrice?: FloatWithAggregatesFilter<"Event"> | number
    currency?: StringWithAggregatesFilter<"Event"> | string
    maxPerWallet?: IntWithAggregatesFilter<"Event"> | number
    contractAddress?: StringNullableWithAggregatesFilter<"Event"> | string | null
    chainId?: IntWithAggregatesFilter<"Event"> | number
    imageUrl?: StringNullableWithAggregatesFilter<"Event"> | string | null
    metadataUri?: StringNullableWithAggregatesFilter<"Event"> | string | null
    category?: StringWithAggregatesFilter<"Event"> | string
    tags?: StringWithAggregatesFilter<"Event"> | string
    isPublic?: BoolWithAggregatesFilter<"Event"> | boolean
    allowTransfers?: BoolWithAggregatesFilter<"Event"> | boolean
    requireKYC?: BoolWithAggregatesFilter<"Event"> | boolean
    status?: StringWithAggregatesFilter<"Event"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    organizerId?: StringWithAggregatesFilter<"Event"> | string
  }

  export type TicketWhereInput = {
    AND?: TicketWhereInput | TicketWhereInput[]
    OR?: TicketWhereInput[]
    NOT?: TicketWhereInput | TicketWhereInput[]
    id?: StringFilter<"Ticket"> | string
    tokenId?: IntFilter<"Ticket"> | number
    contractAddress?: StringFilter<"Ticket"> | string
    chainId?: IntFilter<"Ticket"> | number
    txHash?: StringNullableFilter<"Ticket"> | string | null
    blockNumber?: IntNullableFilter<"Ticket"> | number | null
    metadataUri?: StringNullableFilter<"Ticket"> | string | null
    seatNumber?: StringNullableFilter<"Ticket"> | string | null
    section?: StringNullableFilter<"Ticket"> | string | null
    tier?: StringNullableFilter<"Ticket"> | string | null
    isUsed?: BoolFilter<"Ticket"> | boolean
    usedAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    createdAt?: DateTimeFilter<"Ticket"> | Date | string
    updatedAt?: DateTimeFilter<"Ticket"> | Date | string
    eventId?: StringFilter<"Ticket"> | string
    orderId?: StringFilter<"Ticket"> | string
    event?: XOR<EventRelationFilter, EventWhereInput>
    order?: XOR<OrderRelationFilter, OrderWhereInput>
    checkIn?: XOR<CheckInNullableRelationFilter, CheckInWhereInput> | null
  }

  export type TicketOrderByWithRelationInput = {
    id?: SortOrder
    tokenId?: SortOrder
    contractAddress?: SortOrder
    chainId?: SortOrder
    txHash?: SortOrderInput | SortOrder
    blockNumber?: SortOrderInput | SortOrder
    metadataUri?: SortOrderInput | SortOrder
    seatNumber?: SortOrderInput | SortOrder
    section?: SortOrderInput | SortOrder
    tier?: SortOrderInput | SortOrder
    isUsed?: SortOrder
    usedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    eventId?: SortOrder
    orderId?: SortOrder
    event?: EventOrderByWithRelationInput
    order?: OrderOrderByWithRelationInput
    checkIn?: CheckInOrderByWithRelationInput
  }

  export type TicketWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    contractAddress_tokenId?: TicketContractAddressTokenIdCompoundUniqueInput
    AND?: TicketWhereInput | TicketWhereInput[]
    OR?: TicketWhereInput[]
    NOT?: TicketWhereInput | TicketWhereInput[]
    tokenId?: IntFilter<"Ticket"> | number
    contractAddress?: StringFilter<"Ticket"> | string
    chainId?: IntFilter<"Ticket"> | number
    txHash?: StringNullableFilter<"Ticket"> | string | null
    blockNumber?: IntNullableFilter<"Ticket"> | number | null
    metadataUri?: StringNullableFilter<"Ticket"> | string | null
    seatNumber?: StringNullableFilter<"Ticket"> | string | null
    section?: StringNullableFilter<"Ticket"> | string | null
    tier?: StringNullableFilter<"Ticket"> | string | null
    isUsed?: BoolFilter<"Ticket"> | boolean
    usedAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    createdAt?: DateTimeFilter<"Ticket"> | Date | string
    updatedAt?: DateTimeFilter<"Ticket"> | Date | string
    eventId?: StringFilter<"Ticket"> | string
    orderId?: StringFilter<"Ticket"> | string
    event?: XOR<EventRelationFilter, EventWhereInput>
    order?: XOR<OrderRelationFilter, OrderWhereInput>
    checkIn?: XOR<CheckInNullableRelationFilter, CheckInWhereInput> | null
  }, "id" | "contractAddress_tokenId">

  export type TicketOrderByWithAggregationInput = {
    id?: SortOrder
    tokenId?: SortOrder
    contractAddress?: SortOrder
    chainId?: SortOrder
    txHash?: SortOrderInput | SortOrder
    blockNumber?: SortOrderInput | SortOrder
    metadataUri?: SortOrderInput | SortOrder
    seatNumber?: SortOrderInput | SortOrder
    section?: SortOrderInput | SortOrder
    tier?: SortOrderInput | SortOrder
    isUsed?: SortOrder
    usedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    eventId?: SortOrder
    orderId?: SortOrder
    _count?: TicketCountOrderByAggregateInput
    _avg?: TicketAvgOrderByAggregateInput
    _max?: TicketMaxOrderByAggregateInput
    _min?: TicketMinOrderByAggregateInput
    _sum?: TicketSumOrderByAggregateInput
  }

  export type TicketScalarWhereWithAggregatesInput = {
    AND?: TicketScalarWhereWithAggregatesInput | TicketScalarWhereWithAggregatesInput[]
    OR?: TicketScalarWhereWithAggregatesInput[]
    NOT?: TicketScalarWhereWithAggregatesInput | TicketScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Ticket"> | string
    tokenId?: IntWithAggregatesFilter<"Ticket"> | number
    contractAddress?: StringWithAggregatesFilter<"Ticket"> | string
    chainId?: IntWithAggregatesFilter<"Ticket"> | number
    txHash?: StringNullableWithAggregatesFilter<"Ticket"> | string | null
    blockNumber?: IntNullableWithAggregatesFilter<"Ticket"> | number | null
    metadataUri?: StringNullableWithAggregatesFilter<"Ticket"> | string | null
    seatNumber?: StringNullableWithAggregatesFilter<"Ticket"> | string | null
    section?: StringNullableWithAggregatesFilter<"Ticket"> | string | null
    tier?: StringNullableWithAggregatesFilter<"Ticket"> | string | null
    isUsed?: BoolWithAggregatesFilter<"Ticket"> | boolean
    usedAt?: DateTimeNullableWithAggregatesFilter<"Ticket"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Ticket"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Ticket"> | Date | string
    eventId?: StringWithAggregatesFilter<"Ticket"> | string
    orderId?: StringWithAggregatesFilter<"Ticket"> | string
  }

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    id?: StringFilter<"Order"> | string
    totalAmount?: FloatFilter<"Order"> | number
    quantity?: IntFilter<"Order"> | number
    currency?: StringFilter<"Order"> | string
    paymentMethod?: StringFilter<"Order"> | string
    paymentStatus?: StringFilter<"Order"> | string
    stripePaymentId?: StringNullableFilter<"Order"> | string | null
    coinbaseChargeId?: StringNullableFilter<"Order"> | string | null
    blockchainTxHash?: StringNullableFilter<"Order"> | string | null
    paystackReference?: StringNullableFilter<"Order"> | string | null
    flutterwaveReference?: StringNullableFilter<"Order"> | string | null
    mpesaCheckoutRequestId?: StringNullableFilter<"Order"> | string | null
    paymentTxId?: StringNullableFilter<"Order"> | string | null
    customerEmail?: StringFilter<"Order"> | string
    customerName?: StringNullableFilter<"Order"> | string | null
    billingAddress?: StringNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    userId?: StringFilter<"Order"> | string
    eventId?: StringFilter<"Order"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    event?: XOR<EventRelationFilter, EventWhereInput>
    tickets?: TicketListRelationFilter
  }

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder
    totalAmount?: SortOrder
    quantity?: SortOrder
    currency?: SortOrder
    paymentMethod?: SortOrder
    paymentStatus?: SortOrder
    stripePaymentId?: SortOrderInput | SortOrder
    coinbaseChargeId?: SortOrderInput | SortOrder
    blockchainTxHash?: SortOrderInput | SortOrder
    paystackReference?: SortOrderInput | SortOrder
    flutterwaveReference?: SortOrderInput | SortOrder
    mpesaCheckoutRequestId?: SortOrderInput | SortOrder
    paymentTxId?: SortOrderInput | SortOrder
    customerEmail?: SortOrder
    customerName?: SortOrderInput | SortOrder
    billingAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    eventId?: SortOrder
    user?: UserOrderByWithRelationInput
    event?: EventOrderByWithRelationInput
    tickets?: TicketOrderByRelationAggregateInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    totalAmount?: FloatFilter<"Order"> | number
    quantity?: IntFilter<"Order"> | number
    currency?: StringFilter<"Order"> | string
    paymentMethod?: StringFilter<"Order"> | string
    paymentStatus?: StringFilter<"Order"> | string
    stripePaymentId?: StringNullableFilter<"Order"> | string | null
    coinbaseChargeId?: StringNullableFilter<"Order"> | string | null
    blockchainTxHash?: StringNullableFilter<"Order"> | string | null
    paystackReference?: StringNullableFilter<"Order"> | string | null
    flutterwaveReference?: StringNullableFilter<"Order"> | string | null
    mpesaCheckoutRequestId?: StringNullableFilter<"Order"> | string | null
    paymentTxId?: StringNullableFilter<"Order"> | string | null
    customerEmail?: StringFilter<"Order"> | string
    customerName?: StringNullableFilter<"Order"> | string | null
    billingAddress?: StringNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    userId?: StringFilter<"Order"> | string
    eventId?: StringFilter<"Order"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    event?: XOR<EventRelationFilter, EventWhereInput>
    tickets?: TicketListRelationFilter
  }, "id">

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder
    totalAmount?: SortOrder
    quantity?: SortOrder
    currency?: SortOrder
    paymentMethod?: SortOrder
    paymentStatus?: SortOrder
    stripePaymentId?: SortOrderInput | SortOrder
    coinbaseChargeId?: SortOrderInput | SortOrder
    blockchainTxHash?: SortOrderInput | SortOrder
    paystackReference?: SortOrderInput | SortOrder
    flutterwaveReference?: SortOrderInput | SortOrder
    mpesaCheckoutRequestId?: SortOrderInput | SortOrder
    paymentTxId?: SortOrderInput | SortOrder
    customerEmail?: SortOrder
    customerName?: SortOrderInput | SortOrder
    billingAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    eventId?: SortOrder
    _count?: OrderCountOrderByAggregateInput
    _avg?: OrderAvgOrderByAggregateInput
    _max?: OrderMaxOrderByAggregateInput
    _min?: OrderMinOrderByAggregateInput
    _sum?: OrderSumOrderByAggregateInput
  }

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    OR?: OrderScalarWhereWithAggregatesInput[]
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Order"> | string
    totalAmount?: FloatWithAggregatesFilter<"Order"> | number
    quantity?: IntWithAggregatesFilter<"Order"> | number
    currency?: StringWithAggregatesFilter<"Order"> | string
    paymentMethod?: StringWithAggregatesFilter<"Order"> | string
    paymentStatus?: StringWithAggregatesFilter<"Order"> | string
    stripePaymentId?: StringNullableWithAggregatesFilter<"Order"> | string | null
    coinbaseChargeId?: StringNullableWithAggregatesFilter<"Order"> | string | null
    blockchainTxHash?: StringNullableWithAggregatesFilter<"Order"> | string | null
    paystackReference?: StringNullableWithAggregatesFilter<"Order"> | string | null
    flutterwaveReference?: StringNullableWithAggregatesFilter<"Order"> | string | null
    mpesaCheckoutRequestId?: StringNullableWithAggregatesFilter<"Order"> | string | null
    paymentTxId?: StringNullableWithAggregatesFilter<"Order"> | string | null
    customerEmail?: StringWithAggregatesFilter<"Order"> | string
    customerName?: StringNullableWithAggregatesFilter<"Order"> | string | null
    billingAddress?: StringNullableWithAggregatesFilter<"Order"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    userId?: StringWithAggregatesFilter<"Order"> | string
    eventId?: StringWithAggregatesFilter<"Order"> | string
  }

  export type CheckInWhereInput = {
    AND?: CheckInWhereInput | CheckInWhereInput[]
    OR?: CheckInWhereInput[]
    NOT?: CheckInWhereInput | CheckInWhereInput[]
    id?: StringFilter<"CheckIn"> | string
    checkedInAt?: DateTimeFilter<"CheckIn"> | Date | string
    checkedInBy?: StringNullableFilter<"CheckIn"> | string | null
    location?: StringNullableFilter<"CheckIn"> | string | null
    poaTokenId?: IntNullableFilter<"CheckIn"> | number | null
    poaContractAddr?: StringNullableFilter<"CheckIn"> | string | null
    poaTxHash?: StringNullableFilter<"CheckIn"> | string | null
    ticketId?: StringFilter<"CheckIn"> | string
    eventId?: StringFilter<"CheckIn"> | string
    userId?: StringFilter<"CheckIn"> | string
    ticket?: XOR<TicketRelationFilter, TicketWhereInput>
    event?: XOR<EventRelationFilter, EventWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type CheckInOrderByWithRelationInput = {
    id?: SortOrder
    checkedInAt?: SortOrder
    checkedInBy?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    poaTokenId?: SortOrderInput | SortOrder
    poaContractAddr?: SortOrderInput | SortOrder
    poaTxHash?: SortOrderInput | SortOrder
    ticketId?: SortOrder
    eventId?: SortOrder
    userId?: SortOrder
    ticket?: TicketOrderByWithRelationInput
    event?: EventOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type CheckInWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    ticketId?: string
    AND?: CheckInWhereInput | CheckInWhereInput[]
    OR?: CheckInWhereInput[]
    NOT?: CheckInWhereInput | CheckInWhereInput[]
    checkedInAt?: DateTimeFilter<"CheckIn"> | Date | string
    checkedInBy?: StringNullableFilter<"CheckIn"> | string | null
    location?: StringNullableFilter<"CheckIn"> | string | null
    poaTokenId?: IntNullableFilter<"CheckIn"> | number | null
    poaContractAddr?: StringNullableFilter<"CheckIn"> | string | null
    poaTxHash?: StringNullableFilter<"CheckIn"> | string | null
    eventId?: StringFilter<"CheckIn"> | string
    userId?: StringFilter<"CheckIn"> | string
    ticket?: XOR<TicketRelationFilter, TicketWhereInput>
    event?: XOR<EventRelationFilter, EventWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "ticketId">

  export type CheckInOrderByWithAggregationInput = {
    id?: SortOrder
    checkedInAt?: SortOrder
    checkedInBy?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    poaTokenId?: SortOrderInput | SortOrder
    poaContractAddr?: SortOrderInput | SortOrder
    poaTxHash?: SortOrderInput | SortOrder
    ticketId?: SortOrder
    eventId?: SortOrder
    userId?: SortOrder
    _count?: CheckInCountOrderByAggregateInput
    _avg?: CheckInAvgOrderByAggregateInput
    _max?: CheckInMaxOrderByAggregateInput
    _min?: CheckInMinOrderByAggregateInput
    _sum?: CheckInSumOrderByAggregateInput
  }

  export type CheckInScalarWhereWithAggregatesInput = {
    AND?: CheckInScalarWhereWithAggregatesInput | CheckInScalarWhereWithAggregatesInput[]
    OR?: CheckInScalarWhereWithAggregatesInput[]
    NOT?: CheckInScalarWhereWithAggregatesInput | CheckInScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CheckIn"> | string
    checkedInAt?: DateTimeWithAggregatesFilter<"CheckIn"> | Date | string
    checkedInBy?: StringNullableWithAggregatesFilter<"CheckIn"> | string | null
    location?: StringNullableWithAggregatesFilter<"CheckIn"> | string | null
    poaTokenId?: IntNullableWithAggregatesFilter<"CheckIn"> | number | null
    poaContractAddr?: StringNullableWithAggregatesFilter<"CheckIn"> | string | null
    poaTxHash?: StringNullableWithAggregatesFilter<"CheckIn"> | string | null
    ticketId?: StringWithAggregatesFilter<"CheckIn"> | string
    eventId?: StringWithAggregatesFilter<"CheckIn"> | string
    userId?: StringWithAggregatesFilter<"CheckIn"> | string
  }

  export type EventAnalyticsWhereInput = {
    AND?: EventAnalyticsWhereInput | EventAnalyticsWhereInput[]
    OR?: EventAnalyticsWhereInput[]
    NOT?: EventAnalyticsWhereInput | EventAnalyticsWhereInput[]
    id?: StringFilter<"EventAnalytics"> | string
    date?: DateTimeFilter<"EventAnalytics"> | Date | string
    ticketsSold?: IntFilter<"EventAnalytics"> | number
    revenue?: FloatFilter<"EventAnalytics"> | number
    uniqueBuyers?: IntFilter<"EventAnalytics"> | number
    checkIns?: IntFilter<"EventAnalytics"> | number
    checkInRate?: FloatFilter<"EventAnalytics"> | number
    noShows?: IntFilter<"EventAnalytics"> | number
    topCountries?: StringNullableFilter<"EventAnalytics"> | string | null
    topCities?: StringNullableFilter<"EventAnalytics"> | string | null
    hourlyBreakdown?: StringNullableFilter<"EventAnalytics"> | string | null
    eventId?: StringFilter<"EventAnalytics"> | string
    event?: XOR<EventRelationFilter, EventWhereInput>
  }

  export type EventAnalyticsOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    ticketsSold?: SortOrder
    revenue?: SortOrder
    uniqueBuyers?: SortOrder
    checkIns?: SortOrder
    checkInRate?: SortOrder
    noShows?: SortOrder
    topCountries?: SortOrderInput | SortOrder
    topCities?: SortOrderInput | SortOrder
    hourlyBreakdown?: SortOrderInput | SortOrder
    eventId?: SortOrder
    event?: EventOrderByWithRelationInput
  }

  export type EventAnalyticsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    eventId_date?: EventAnalyticsEventIdDateCompoundUniqueInput
    AND?: EventAnalyticsWhereInput | EventAnalyticsWhereInput[]
    OR?: EventAnalyticsWhereInput[]
    NOT?: EventAnalyticsWhereInput | EventAnalyticsWhereInput[]
    date?: DateTimeFilter<"EventAnalytics"> | Date | string
    ticketsSold?: IntFilter<"EventAnalytics"> | number
    revenue?: FloatFilter<"EventAnalytics"> | number
    uniqueBuyers?: IntFilter<"EventAnalytics"> | number
    checkIns?: IntFilter<"EventAnalytics"> | number
    checkInRate?: FloatFilter<"EventAnalytics"> | number
    noShows?: IntFilter<"EventAnalytics"> | number
    topCountries?: StringNullableFilter<"EventAnalytics"> | string | null
    topCities?: StringNullableFilter<"EventAnalytics"> | string | null
    hourlyBreakdown?: StringNullableFilter<"EventAnalytics"> | string | null
    eventId?: StringFilter<"EventAnalytics"> | string
    event?: XOR<EventRelationFilter, EventWhereInput>
  }, "id" | "eventId_date">

  export type EventAnalyticsOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    ticketsSold?: SortOrder
    revenue?: SortOrder
    uniqueBuyers?: SortOrder
    checkIns?: SortOrder
    checkInRate?: SortOrder
    noShows?: SortOrder
    topCountries?: SortOrderInput | SortOrder
    topCities?: SortOrderInput | SortOrder
    hourlyBreakdown?: SortOrderInput | SortOrder
    eventId?: SortOrder
    _count?: EventAnalyticsCountOrderByAggregateInput
    _avg?: EventAnalyticsAvgOrderByAggregateInput
    _max?: EventAnalyticsMaxOrderByAggregateInput
    _min?: EventAnalyticsMinOrderByAggregateInput
    _sum?: EventAnalyticsSumOrderByAggregateInput
  }

  export type EventAnalyticsScalarWhereWithAggregatesInput = {
    AND?: EventAnalyticsScalarWhereWithAggregatesInput | EventAnalyticsScalarWhereWithAggregatesInput[]
    OR?: EventAnalyticsScalarWhereWithAggregatesInput[]
    NOT?: EventAnalyticsScalarWhereWithAggregatesInput | EventAnalyticsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EventAnalytics"> | string
    date?: DateTimeWithAggregatesFilter<"EventAnalytics"> | Date | string
    ticketsSold?: IntWithAggregatesFilter<"EventAnalytics"> | number
    revenue?: FloatWithAggregatesFilter<"EventAnalytics"> | number
    uniqueBuyers?: IntWithAggregatesFilter<"EventAnalytics"> | number
    checkIns?: IntWithAggregatesFilter<"EventAnalytics"> | number
    checkInRate?: FloatWithAggregatesFilter<"EventAnalytics"> | number
    noShows?: IntWithAggregatesFilter<"EventAnalytics"> | number
    topCountries?: StringNullableWithAggregatesFilter<"EventAnalytics"> | string | null
    topCities?: StringNullableWithAggregatesFilter<"EventAnalytics"> | string | null
    hourlyBreakdown?: StringNullableWithAggregatesFilter<"EventAnalytics"> | string | null
    eventId?: StringWithAggregatesFilter<"EventAnalytics"> | string
  }

  export type TicketTierWhereInput = {
    AND?: TicketTierWhereInput | TicketTierWhereInput[]
    OR?: TicketTierWhereInput[]
    NOT?: TicketTierWhereInput | TicketTierWhereInput[]
    id?: StringFilter<"TicketTier"> | string
    name?: StringFilter<"TicketTier"> | string
    description?: StringNullableFilter<"TicketTier"> | string | null
    price?: FloatFilter<"TicketTier"> | number
    availableQuantity?: IntFilter<"TicketTier"> | number
    maxPerPerson?: IntFilter<"TicketTier"> | number
    saleStart?: DateTimeFilter<"TicketTier"> | Date | string
    saleEnd?: DateTimeFilter<"TicketTier"> | Date | string
    createdAt?: DateTimeFilter<"TicketTier"> | Date | string
    updatedAt?: DateTimeFilter<"TicketTier"> | Date | string
    eventId?: StringFilter<"TicketTier"> | string
    event?: XOR<EventRelationFilter, EventWhereInput>
  }

  export type TicketTierOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    availableQuantity?: SortOrder
    maxPerPerson?: SortOrder
    saleStart?: SortOrder
    saleEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    eventId?: SortOrder
    event?: EventOrderByWithRelationInput
  }

  export type TicketTierWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TicketTierWhereInput | TicketTierWhereInput[]
    OR?: TicketTierWhereInput[]
    NOT?: TicketTierWhereInput | TicketTierWhereInput[]
    name?: StringFilter<"TicketTier"> | string
    description?: StringNullableFilter<"TicketTier"> | string | null
    price?: FloatFilter<"TicketTier"> | number
    availableQuantity?: IntFilter<"TicketTier"> | number
    maxPerPerson?: IntFilter<"TicketTier"> | number
    saleStart?: DateTimeFilter<"TicketTier"> | Date | string
    saleEnd?: DateTimeFilter<"TicketTier"> | Date | string
    createdAt?: DateTimeFilter<"TicketTier"> | Date | string
    updatedAt?: DateTimeFilter<"TicketTier"> | Date | string
    eventId?: StringFilter<"TicketTier"> | string
    event?: XOR<EventRelationFilter, EventWhereInput>
  }, "id">

  export type TicketTierOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    availableQuantity?: SortOrder
    maxPerPerson?: SortOrder
    saleStart?: SortOrder
    saleEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    eventId?: SortOrder
    _count?: TicketTierCountOrderByAggregateInput
    _avg?: TicketTierAvgOrderByAggregateInput
    _max?: TicketTierMaxOrderByAggregateInput
    _min?: TicketTierMinOrderByAggregateInput
    _sum?: TicketTierSumOrderByAggregateInput
  }

  export type TicketTierScalarWhereWithAggregatesInput = {
    AND?: TicketTierScalarWhereWithAggregatesInput | TicketTierScalarWhereWithAggregatesInput[]
    OR?: TicketTierScalarWhereWithAggregatesInput[]
    NOT?: TicketTierScalarWhereWithAggregatesInput | TicketTierScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TicketTier"> | string
    name?: StringWithAggregatesFilter<"TicketTier"> | string
    description?: StringNullableWithAggregatesFilter<"TicketTier"> | string | null
    price?: FloatWithAggregatesFilter<"TicketTier"> | number
    availableQuantity?: IntWithAggregatesFilter<"TicketTier"> | number
    maxPerPerson?: IntWithAggregatesFilter<"TicketTier"> | number
    saleStart?: DateTimeWithAggregatesFilter<"TicketTier"> | Date | string
    saleEnd?: DateTimeWithAggregatesFilter<"TicketTier"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"TicketTier"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TicketTier"> | Date | string
    eventId?: StringWithAggregatesFilter<"TicketTier"> | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password?: string | null
    name?: string | null
    walletAddress?: string | null
    googleId?: string | null
    twitterId?: string | null
    avatar?: string | null
    role?: string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organizedEvents?: EventCreateNestedManyWithoutOrganizerInput
    orders?: OrderCreateNestedManyWithoutUserInput
    checkIns?: CheckInCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password?: string | null
    name?: string | null
    walletAddress?: string | null
    googleId?: string | null
    twitterId?: string | null
    avatar?: string | null
    role?: string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organizedEvents?: EventUncheckedCreateNestedManyWithoutOrganizerInput
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    checkIns?: CheckInUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    twitterId?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizedEvents?: EventUpdateManyWithoutOrganizerNestedInput
    orders?: OrderUpdateManyWithoutUserNestedInput
    checkIns?: CheckInUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    twitterId?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizedEvents?: EventUncheckedUpdateManyWithoutOrganizerNestedInput
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    checkIns?: CheckInUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    twitterId?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    twitterId?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventCreateInput = {
    id?: string
    title: string
    description?: string | null
    venue: string
    address?: string | null
    city?: string | null
    country?: string | null
    latitude?: number | null
    longitude?: number | null
    eventDate: Date | string
    saleStart: Date | string
    saleEnd: Date | string
    totalSupply: number
    ticketPrice: number
    currency?: string
    maxPerWallet?: number
    contractAddress?: string | null
    chainId?: number
    imageUrl?: string | null
    metadataUri?: string | null
    category?: string
    tags: string
    isPublic?: boolean
    allowTransfers?: boolean
    requireKYC?: boolean
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    organizer: UserCreateNestedOneWithoutOrganizedEventsInput
    orders?: OrderCreateNestedManyWithoutEventInput
    tickets?: TicketCreateNestedManyWithoutEventInput
    checkIns?: CheckInCreateNestedManyWithoutEventInput
    analytics?: EventAnalyticsCreateNestedManyWithoutEventInput
    tiers?: TicketTierCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    venue: string
    address?: string | null
    city?: string | null
    country?: string | null
    latitude?: number | null
    longitude?: number | null
    eventDate: Date | string
    saleStart: Date | string
    saleEnd: Date | string
    totalSupply: number
    ticketPrice: number
    currency?: string
    maxPerWallet?: number
    contractAddress?: string | null
    chainId?: number
    imageUrl?: string | null
    metadataUri?: string | null
    category?: string
    tags: string
    isPublic?: boolean
    allowTransfers?: boolean
    requireKYC?: boolean
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    organizerId: string
    orders?: OrderUncheckedCreateNestedManyWithoutEventInput
    tickets?: TicketUncheckedCreateNestedManyWithoutEventInput
    checkIns?: CheckInUncheckedCreateNestedManyWithoutEventInput
    analytics?: EventAnalyticsUncheckedCreateNestedManyWithoutEventInput
    tiers?: TicketTierUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    venue?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    saleStart?: DateTimeFieldUpdateOperationsInput | Date | string
    saleEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    totalSupply?: IntFieldUpdateOperationsInput | number
    ticketPrice?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    maxPerWallet?: IntFieldUpdateOperationsInput | number
    contractAddress?: NullableStringFieldUpdateOperationsInput | string | null
    chainId?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    metadataUri?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    tags?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    allowTransfers?: BoolFieldUpdateOperationsInput | boolean
    requireKYC?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizer?: UserUpdateOneRequiredWithoutOrganizedEventsNestedInput
    orders?: OrderUpdateManyWithoutEventNestedInput
    tickets?: TicketUpdateManyWithoutEventNestedInput
    checkIns?: CheckInUpdateManyWithoutEventNestedInput
    analytics?: EventAnalyticsUpdateManyWithoutEventNestedInput
    tiers?: TicketTierUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    venue?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    saleStart?: DateTimeFieldUpdateOperationsInput | Date | string
    saleEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    totalSupply?: IntFieldUpdateOperationsInput | number
    ticketPrice?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    maxPerWallet?: IntFieldUpdateOperationsInput | number
    contractAddress?: NullableStringFieldUpdateOperationsInput | string | null
    chainId?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    metadataUri?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    tags?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    allowTransfers?: BoolFieldUpdateOperationsInput | boolean
    requireKYC?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizerId?: StringFieldUpdateOperationsInput | string
    orders?: OrderUncheckedUpdateManyWithoutEventNestedInput
    tickets?: TicketUncheckedUpdateManyWithoutEventNestedInput
    checkIns?: CheckInUncheckedUpdateManyWithoutEventNestedInput
    analytics?: EventAnalyticsUncheckedUpdateManyWithoutEventNestedInput
    tiers?: TicketTierUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    venue?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    saleStart?: DateTimeFieldUpdateOperationsInput | Date | string
    saleEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    totalSupply?: IntFieldUpdateOperationsInput | number
    ticketPrice?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    maxPerWallet?: IntFieldUpdateOperationsInput | number
    contractAddress?: NullableStringFieldUpdateOperationsInput | string | null
    chainId?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    metadataUri?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    tags?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    allowTransfers?: BoolFieldUpdateOperationsInput | boolean
    requireKYC?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    venue?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    saleStart?: DateTimeFieldUpdateOperationsInput | Date | string
    saleEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    totalSupply?: IntFieldUpdateOperationsInput | number
    ticketPrice?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    maxPerWallet?: IntFieldUpdateOperationsInput | number
    contractAddress?: NullableStringFieldUpdateOperationsInput | string | null
    chainId?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    metadataUri?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    tags?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    allowTransfers?: BoolFieldUpdateOperationsInput | boolean
    requireKYC?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizerId?: StringFieldUpdateOperationsInput | string
  }

  export type TicketCreateInput = {
    id?: string
    tokenId: number
    contractAddress: string
    chainId: number
    txHash?: string | null
    blockNumber?: number | null
    metadataUri?: string | null
    seatNumber?: string | null
    section?: string | null
    tier?: string | null
    isUsed?: boolean
    usedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    event: EventCreateNestedOneWithoutTicketsInput
    order: OrderCreateNestedOneWithoutTicketsInput
    checkIn?: CheckInCreateNestedOneWithoutTicketInput
  }

  export type TicketUncheckedCreateInput = {
    id?: string
    tokenId: number
    contractAddress: string
    chainId: number
    txHash?: string | null
    blockNumber?: number | null
    metadataUri?: string | null
    seatNumber?: string | null
    section?: string | null
    tier?: string | null
    isUsed?: boolean
    usedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    eventId: string
    orderId: string
    checkIn?: CheckInUncheckedCreateNestedOneWithoutTicketInput
  }

  export type TicketUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenId?: IntFieldUpdateOperationsInput | number
    contractAddress?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableIntFieldUpdateOperationsInput | number | null
    metadataUri?: NullableStringFieldUpdateOperationsInput | string | null
    seatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    section?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: NullableStringFieldUpdateOperationsInput | string | null
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUpdateOneRequiredWithoutTicketsNestedInput
    order?: OrderUpdateOneRequiredWithoutTicketsNestedInput
    checkIn?: CheckInUpdateOneWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenId?: IntFieldUpdateOperationsInput | number
    contractAddress?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableIntFieldUpdateOperationsInput | number | null
    metadataUri?: NullableStringFieldUpdateOperationsInput | string | null
    seatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    section?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: NullableStringFieldUpdateOperationsInput | string | null
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventId?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    checkIn?: CheckInUncheckedUpdateOneWithoutTicketNestedInput
  }

  export type TicketUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenId?: IntFieldUpdateOperationsInput | number
    contractAddress?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableIntFieldUpdateOperationsInput | number | null
    metadataUri?: NullableStringFieldUpdateOperationsInput | string | null
    seatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    section?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: NullableStringFieldUpdateOperationsInput | string | null
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenId?: IntFieldUpdateOperationsInput | number
    contractAddress?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableIntFieldUpdateOperationsInput | number | null
    metadataUri?: NullableStringFieldUpdateOperationsInput | string | null
    seatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    section?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: NullableStringFieldUpdateOperationsInput | string | null
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventId?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
  }

  export type OrderCreateInput = {
    id?: string
    totalAmount: number
    quantity: number
    currency: string
    paymentMethod: string
    paymentStatus?: string
    stripePaymentId?: string | null
    coinbaseChargeId?: string | null
    blockchainTxHash?: string | null
    paystackReference?: string | null
    flutterwaveReference?: string | null
    mpesaCheckoutRequestId?: string | null
    paymentTxId?: string | null
    customerEmail: string
    customerName?: string | null
    billingAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutOrdersInput
    event: EventCreateNestedOneWithoutOrdersInput
    tickets?: TicketCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateInput = {
    id?: string
    totalAmount: number
    quantity: number
    currency: string
    paymentMethod: string
    paymentStatus?: string
    stripePaymentId?: string | null
    coinbaseChargeId?: string | null
    blockchainTxHash?: string | null
    paystackReference?: string | null
    flutterwaveReference?: string | null
    mpesaCheckoutRequestId?: string | null
    paymentTxId?: string | null
    customerEmail: string
    customerName?: string | null
    billingAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    eventId: string
    tickets?: TicketUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    stripePaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    coinbaseChargeId?: NullableStringFieldUpdateOperationsInput | string | null
    blockchainTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    paystackReference?: NullableStringFieldUpdateOperationsInput | string | null
    flutterwaveReference?: NullableStringFieldUpdateOperationsInput | string | null
    mpesaCheckoutRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentTxId?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    billingAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOrdersNestedInput
    event?: EventUpdateOneRequiredWithoutOrdersNestedInput
    tickets?: TicketUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    stripePaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    coinbaseChargeId?: NullableStringFieldUpdateOperationsInput | string | null
    blockchainTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    paystackReference?: NullableStringFieldUpdateOperationsInput | string | null
    flutterwaveReference?: NullableStringFieldUpdateOperationsInput | string | null
    mpesaCheckoutRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentTxId?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    billingAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    tickets?: TicketUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    stripePaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    coinbaseChargeId?: NullableStringFieldUpdateOperationsInput | string | null
    blockchainTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    paystackReference?: NullableStringFieldUpdateOperationsInput | string | null
    flutterwaveReference?: NullableStringFieldUpdateOperationsInput | string | null
    mpesaCheckoutRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentTxId?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    billingAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    stripePaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    coinbaseChargeId?: NullableStringFieldUpdateOperationsInput | string | null
    blockchainTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    paystackReference?: NullableStringFieldUpdateOperationsInput | string | null
    flutterwaveReference?: NullableStringFieldUpdateOperationsInput | string | null
    mpesaCheckoutRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentTxId?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    billingAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
  }

  export type CheckInCreateInput = {
    id?: string
    checkedInAt?: Date | string
    checkedInBy?: string | null
    location?: string | null
    poaTokenId?: number | null
    poaContractAddr?: string | null
    poaTxHash?: string | null
    ticket: TicketCreateNestedOneWithoutCheckInInput
    event: EventCreateNestedOneWithoutCheckInsInput
    user: UserCreateNestedOneWithoutCheckInsInput
  }

  export type CheckInUncheckedCreateInput = {
    id?: string
    checkedInAt?: Date | string
    checkedInBy?: string | null
    location?: string | null
    poaTokenId?: number | null
    poaContractAddr?: string | null
    poaTxHash?: string | null
    ticketId: string
    eventId: string
    userId: string
  }

  export type CheckInUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    checkedInAt?: DateTimeFieldUpdateOperationsInput | Date | string
    checkedInBy?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    poaTokenId?: NullableIntFieldUpdateOperationsInput | number | null
    poaContractAddr?: NullableStringFieldUpdateOperationsInput | string | null
    poaTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    ticket?: TicketUpdateOneRequiredWithoutCheckInNestedInput
    event?: EventUpdateOneRequiredWithoutCheckInsNestedInput
    user?: UserUpdateOneRequiredWithoutCheckInsNestedInput
  }

  export type CheckInUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    checkedInAt?: DateTimeFieldUpdateOperationsInput | Date | string
    checkedInBy?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    poaTokenId?: NullableIntFieldUpdateOperationsInput | number | null
    poaContractAddr?: NullableStringFieldUpdateOperationsInput | string | null
    poaTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    ticketId?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type CheckInUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    checkedInAt?: DateTimeFieldUpdateOperationsInput | Date | string
    checkedInBy?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    poaTokenId?: NullableIntFieldUpdateOperationsInput | number | null
    poaContractAddr?: NullableStringFieldUpdateOperationsInput | string | null
    poaTxHash?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CheckInUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    checkedInAt?: DateTimeFieldUpdateOperationsInput | Date | string
    checkedInBy?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    poaTokenId?: NullableIntFieldUpdateOperationsInput | number | null
    poaContractAddr?: NullableStringFieldUpdateOperationsInput | string | null
    poaTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    ticketId?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type EventAnalyticsCreateInput = {
    id?: string
    date?: Date | string
    ticketsSold?: number
    revenue?: number
    uniqueBuyers?: number
    checkIns?: number
    checkInRate?: number
    noShows?: number
    topCountries?: string | null
    topCities?: string | null
    hourlyBreakdown?: string | null
    event: EventCreateNestedOneWithoutAnalyticsInput
  }

  export type EventAnalyticsUncheckedCreateInput = {
    id?: string
    date?: Date | string
    ticketsSold?: number
    revenue?: number
    uniqueBuyers?: number
    checkIns?: number
    checkInRate?: number
    noShows?: number
    topCountries?: string | null
    topCities?: string | null
    hourlyBreakdown?: string | null
    eventId: string
  }

  export type EventAnalyticsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    ticketsSold?: IntFieldUpdateOperationsInput | number
    revenue?: FloatFieldUpdateOperationsInput | number
    uniqueBuyers?: IntFieldUpdateOperationsInput | number
    checkIns?: IntFieldUpdateOperationsInput | number
    checkInRate?: FloatFieldUpdateOperationsInput | number
    noShows?: IntFieldUpdateOperationsInput | number
    topCountries?: NullableStringFieldUpdateOperationsInput | string | null
    topCities?: NullableStringFieldUpdateOperationsInput | string | null
    hourlyBreakdown?: NullableStringFieldUpdateOperationsInput | string | null
    event?: EventUpdateOneRequiredWithoutAnalyticsNestedInput
  }

  export type EventAnalyticsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    ticketsSold?: IntFieldUpdateOperationsInput | number
    revenue?: FloatFieldUpdateOperationsInput | number
    uniqueBuyers?: IntFieldUpdateOperationsInput | number
    checkIns?: IntFieldUpdateOperationsInput | number
    checkInRate?: FloatFieldUpdateOperationsInput | number
    noShows?: IntFieldUpdateOperationsInput | number
    topCountries?: NullableStringFieldUpdateOperationsInput | string | null
    topCities?: NullableStringFieldUpdateOperationsInput | string | null
    hourlyBreakdown?: NullableStringFieldUpdateOperationsInput | string | null
    eventId?: StringFieldUpdateOperationsInput | string
  }

  export type EventAnalyticsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    ticketsSold?: IntFieldUpdateOperationsInput | number
    revenue?: FloatFieldUpdateOperationsInput | number
    uniqueBuyers?: IntFieldUpdateOperationsInput | number
    checkIns?: IntFieldUpdateOperationsInput | number
    checkInRate?: FloatFieldUpdateOperationsInput | number
    noShows?: IntFieldUpdateOperationsInput | number
    topCountries?: NullableStringFieldUpdateOperationsInput | string | null
    topCities?: NullableStringFieldUpdateOperationsInput | string | null
    hourlyBreakdown?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EventAnalyticsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    ticketsSold?: IntFieldUpdateOperationsInput | number
    revenue?: FloatFieldUpdateOperationsInput | number
    uniqueBuyers?: IntFieldUpdateOperationsInput | number
    checkIns?: IntFieldUpdateOperationsInput | number
    checkInRate?: FloatFieldUpdateOperationsInput | number
    noShows?: IntFieldUpdateOperationsInput | number
    topCountries?: NullableStringFieldUpdateOperationsInput | string | null
    topCities?: NullableStringFieldUpdateOperationsInput | string | null
    hourlyBreakdown?: NullableStringFieldUpdateOperationsInput | string | null
    eventId?: StringFieldUpdateOperationsInput | string
  }

  export type TicketTierCreateInput = {
    id?: string
    name: string
    description?: string | null
    price: number
    availableQuantity: number
    maxPerPerson?: number
    saleStart: Date | string
    saleEnd: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    event: EventCreateNestedOneWithoutTiersInput
  }

  export type TicketTierUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    price: number
    availableQuantity: number
    maxPerPerson?: number
    saleStart: Date | string
    saleEnd: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    eventId: string
  }

  export type TicketTierUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    availableQuantity?: IntFieldUpdateOperationsInput | number
    maxPerPerson?: IntFieldUpdateOperationsInput | number
    saleStart?: DateTimeFieldUpdateOperationsInput | Date | string
    saleEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUpdateOneRequiredWithoutTiersNestedInput
  }

  export type TicketTierUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    availableQuantity?: IntFieldUpdateOperationsInput | number
    maxPerPerson?: IntFieldUpdateOperationsInput | number
    saleStart?: DateTimeFieldUpdateOperationsInput | Date | string
    saleEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventId?: StringFieldUpdateOperationsInput | string
  }

  export type TicketTierUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    availableQuantity?: IntFieldUpdateOperationsInput | number
    maxPerPerson?: IntFieldUpdateOperationsInput | number
    saleStart?: DateTimeFieldUpdateOperationsInput | Date | string
    saleEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketTierUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    availableQuantity?: IntFieldUpdateOperationsInput | number
    maxPerPerson?: IntFieldUpdateOperationsInput | number
    saleStart?: DateTimeFieldUpdateOperationsInput | Date | string
    saleEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EventListRelationFilter = {
    every?: EventWhereInput
    some?: EventWhereInput
    none?: EventWhereInput
  }

  export type OrderListRelationFilter = {
    every?: OrderWhereInput
    some?: OrderWhereInput
    none?: OrderWhereInput
  }

  export type CheckInListRelationFilter = {
    every?: CheckInWhereInput
    some?: CheckInWhereInput
    none?: CheckInWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type EventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CheckInOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    walletAddress?: SortOrder
    googleId?: SortOrder
    twitterId?: SortOrder
    avatar?: SortOrder
    role?: SortOrder
    resetToken?: SortOrder
    resetTokenExpiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    walletAddress?: SortOrder
    googleId?: SortOrder
    twitterId?: SortOrder
    avatar?: SortOrder
    role?: SortOrder
    resetToken?: SortOrder
    resetTokenExpiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    walletAddress?: SortOrder
    googleId?: SortOrder
    twitterId?: SortOrder
    avatar?: SortOrder
    role?: SortOrder
    resetToken?: SortOrder
    resetTokenExpiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type TicketListRelationFilter = {
    every?: TicketWhereInput
    some?: TicketWhereInput
    none?: TicketWhereInput
  }

  export type EventAnalyticsListRelationFilter = {
    every?: EventAnalyticsWhereInput
    some?: EventAnalyticsWhereInput
    none?: EventAnalyticsWhereInput
  }

  export type TicketTierListRelationFilter = {
    every?: TicketTierWhereInput
    some?: TicketTierWhereInput
    none?: TicketTierWhereInput
  }

  export type TicketOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EventAnalyticsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TicketTierOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EventCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    venue?: SortOrder
    address?: SortOrder
    city?: SortOrder
    country?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    eventDate?: SortOrder
    saleStart?: SortOrder
    saleEnd?: SortOrder
    totalSupply?: SortOrder
    ticketPrice?: SortOrder
    currency?: SortOrder
    maxPerWallet?: SortOrder
    contractAddress?: SortOrder
    chainId?: SortOrder
    imageUrl?: SortOrder
    metadataUri?: SortOrder
    category?: SortOrder
    tags?: SortOrder
    isPublic?: SortOrder
    allowTransfers?: SortOrder
    requireKYC?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organizerId?: SortOrder
  }

  export type EventAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
    totalSupply?: SortOrder
    ticketPrice?: SortOrder
    maxPerWallet?: SortOrder
    chainId?: SortOrder
  }

  export type EventMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    venue?: SortOrder
    address?: SortOrder
    city?: SortOrder
    country?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    eventDate?: SortOrder
    saleStart?: SortOrder
    saleEnd?: SortOrder
    totalSupply?: SortOrder
    ticketPrice?: SortOrder
    currency?: SortOrder
    maxPerWallet?: SortOrder
    contractAddress?: SortOrder
    chainId?: SortOrder
    imageUrl?: SortOrder
    metadataUri?: SortOrder
    category?: SortOrder
    tags?: SortOrder
    isPublic?: SortOrder
    allowTransfers?: SortOrder
    requireKYC?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organizerId?: SortOrder
  }

  export type EventMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    venue?: SortOrder
    address?: SortOrder
    city?: SortOrder
    country?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    eventDate?: SortOrder
    saleStart?: SortOrder
    saleEnd?: SortOrder
    totalSupply?: SortOrder
    ticketPrice?: SortOrder
    currency?: SortOrder
    maxPerWallet?: SortOrder
    contractAddress?: SortOrder
    chainId?: SortOrder
    imageUrl?: SortOrder
    metadataUri?: SortOrder
    category?: SortOrder
    tags?: SortOrder
    isPublic?: SortOrder
    allowTransfers?: SortOrder
    requireKYC?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organizerId?: SortOrder
  }

  export type EventSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
    totalSupply?: SortOrder
    ticketPrice?: SortOrder
    maxPerWallet?: SortOrder
    chainId?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EventRelationFilter = {
    is?: EventWhereInput
    isNot?: EventWhereInput
  }

  export type OrderRelationFilter = {
    is?: OrderWhereInput
    isNot?: OrderWhereInput
  }

  export type CheckInNullableRelationFilter = {
    is?: CheckInWhereInput | null
    isNot?: CheckInWhereInput | null
  }

  export type TicketContractAddressTokenIdCompoundUniqueInput = {
    contractAddress: string
    tokenId: number
  }

  export type TicketCountOrderByAggregateInput = {
    id?: SortOrder
    tokenId?: SortOrder
    contractAddress?: SortOrder
    chainId?: SortOrder
    txHash?: SortOrder
    blockNumber?: SortOrder
    metadataUri?: SortOrder
    seatNumber?: SortOrder
    section?: SortOrder
    tier?: SortOrder
    isUsed?: SortOrder
    usedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    eventId?: SortOrder
    orderId?: SortOrder
  }

  export type TicketAvgOrderByAggregateInput = {
    tokenId?: SortOrder
    chainId?: SortOrder
    blockNumber?: SortOrder
  }

  export type TicketMaxOrderByAggregateInput = {
    id?: SortOrder
    tokenId?: SortOrder
    contractAddress?: SortOrder
    chainId?: SortOrder
    txHash?: SortOrder
    blockNumber?: SortOrder
    metadataUri?: SortOrder
    seatNumber?: SortOrder
    section?: SortOrder
    tier?: SortOrder
    isUsed?: SortOrder
    usedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    eventId?: SortOrder
    orderId?: SortOrder
  }

  export type TicketMinOrderByAggregateInput = {
    id?: SortOrder
    tokenId?: SortOrder
    contractAddress?: SortOrder
    chainId?: SortOrder
    txHash?: SortOrder
    blockNumber?: SortOrder
    metadataUri?: SortOrder
    seatNumber?: SortOrder
    section?: SortOrder
    tier?: SortOrder
    isUsed?: SortOrder
    usedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    eventId?: SortOrder
    orderId?: SortOrder
  }

  export type TicketSumOrderByAggregateInput = {
    tokenId?: SortOrder
    chainId?: SortOrder
    blockNumber?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder
    totalAmount?: SortOrder
    quantity?: SortOrder
    currency?: SortOrder
    paymentMethod?: SortOrder
    paymentStatus?: SortOrder
    stripePaymentId?: SortOrder
    coinbaseChargeId?: SortOrder
    blockchainTxHash?: SortOrder
    paystackReference?: SortOrder
    flutterwaveReference?: SortOrder
    mpesaCheckoutRequestId?: SortOrder
    paymentTxId?: SortOrder
    customerEmail?: SortOrder
    customerName?: SortOrder
    billingAddress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    eventId?: SortOrder
  }

  export type OrderAvgOrderByAggregateInput = {
    totalAmount?: SortOrder
    quantity?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder
    totalAmount?: SortOrder
    quantity?: SortOrder
    currency?: SortOrder
    paymentMethod?: SortOrder
    paymentStatus?: SortOrder
    stripePaymentId?: SortOrder
    coinbaseChargeId?: SortOrder
    blockchainTxHash?: SortOrder
    paystackReference?: SortOrder
    flutterwaveReference?: SortOrder
    mpesaCheckoutRequestId?: SortOrder
    paymentTxId?: SortOrder
    customerEmail?: SortOrder
    customerName?: SortOrder
    billingAddress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    eventId?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder
    totalAmount?: SortOrder
    quantity?: SortOrder
    currency?: SortOrder
    paymentMethod?: SortOrder
    paymentStatus?: SortOrder
    stripePaymentId?: SortOrder
    coinbaseChargeId?: SortOrder
    blockchainTxHash?: SortOrder
    paystackReference?: SortOrder
    flutterwaveReference?: SortOrder
    mpesaCheckoutRequestId?: SortOrder
    paymentTxId?: SortOrder
    customerEmail?: SortOrder
    customerName?: SortOrder
    billingAddress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    eventId?: SortOrder
  }

  export type OrderSumOrderByAggregateInput = {
    totalAmount?: SortOrder
    quantity?: SortOrder
  }

  export type TicketRelationFilter = {
    is?: TicketWhereInput
    isNot?: TicketWhereInput
  }

  export type CheckInCountOrderByAggregateInput = {
    id?: SortOrder
    checkedInAt?: SortOrder
    checkedInBy?: SortOrder
    location?: SortOrder
    poaTokenId?: SortOrder
    poaContractAddr?: SortOrder
    poaTxHash?: SortOrder
    ticketId?: SortOrder
    eventId?: SortOrder
    userId?: SortOrder
  }

  export type CheckInAvgOrderByAggregateInput = {
    poaTokenId?: SortOrder
  }

  export type CheckInMaxOrderByAggregateInput = {
    id?: SortOrder
    checkedInAt?: SortOrder
    checkedInBy?: SortOrder
    location?: SortOrder
    poaTokenId?: SortOrder
    poaContractAddr?: SortOrder
    poaTxHash?: SortOrder
    ticketId?: SortOrder
    eventId?: SortOrder
    userId?: SortOrder
  }

  export type CheckInMinOrderByAggregateInput = {
    id?: SortOrder
    checkedInAt?: SortOrder
    checkedInBy?: SortOrder
    location?: SortOrder
    poaTokenId?: SortOrder
    poaContractAddr?: SortOrder
    poaTxHash?: SortOrder
    ticketId?: SortOrder
    eventId?: SortOrder
    userId?: SortOrder
  }

  export type CheckInSumOrderByAggregateInput = {
    poaTokenId?: SortOrder
  }

  export type EventAnalyticsEventIdDateCompoundUniqueInput = {
    eventId: string
    date: Date | string
  }

  export type EventAnalyticsCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    ticketsSold?: SortOrder
    revenue?: SortOrder
    uniqueBuyers?: SortOrder
    checkIns?: SortOrder
    checkInRate?: SortOrder
    noShows?: SortOrder
    topCountries?: SortOrder
    topCities?: SortOrder
    hourlyBreakdown?: SortOrder
    eventId?: SortOrder
  }

  export type EventAnalyticsAvgOrderByAggregateInput = {
    ticketsSold?: SortOrder
    revenue?: SortOrder
    uniqueBuyers?: SortOrder
    checkIns?: SortOrder
    checkInRate?: SortOrder
    noShows?: SortOrder
  }

  export type EventAnalyticsMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    ticketsSold?: SortOrder
    revenue?: SortOrder
    uniqueBuyers?: SortOrder
    checkIns?: SortOrder
    checkInRate?: SortOrder
    noShows?: SortOrder
    topCountries?: SortOrder
    topCities?: SortOrder
    hourlyBreakdown?: SortOrder
    eventId?: SortOrder
  }

  export type EventAnalyticsMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    ticketsSold?: SortOrder
    revenue?: SortOrder
    uniqueBuyers?: SortOrder
    checkIns?: SortOrder
    checkInRate?: SortOrder
    noShows?: SortOrder
    topCountries?: SortOrder
    topCities?: SortOrder
    hourlyBreakdown?: SortOrder
    eventId?: SortOrder
  }

  export type EventAnalyticsSumOrderByAggregateInput = {
    ticketsSold?: SortOrder
    revenue?: SortOrder
    uniqueBuyers?: SortOrder
    checkIns?: SortOrder
    checkInRate?: SortOrder
    noShows?: SortOrder
  }

  export type TicketTierCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    availableQuantity?: SortOrder
    maxPerPerson?: SortOrder
    saleStart?: SortOrder
    saleEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    eventId?: SortOrder
  }

  export type TicketTierAvgOrderByAggregateInput = {
    price?: SortOrder
    availableQuantity?: SortOrder
    maxPerPerson?: SortOrder
  }

  export type TicketTierMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    availableQuantity?: SortOrder
    maxPerPerson?: SortOrder
    saleStart?: SortOrder
    saleEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    eventId?: SortOrder
  }

  export type TicketTierMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    availableQuantity?: SortOrder
    maxPerPerson?: SortOrder
    saleStart?: SortOrder
    saleEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    eventId?: SortOrder
  }

  export type TicketTierSumOrderByAggregateInput = {
    price?: SortOrder
    availableQuantity?: SortOrder
    maxPerPerson?: SortOrder
  }

  export type EventCreateNestedManyWithoutOrganizerInput = {
    create?: XOR<EventCreateWithoutOrganizerInput, EventUncheckedCreateWithoutOrganizerInput> | EventCreateWithoutOrganizerInput[] | EventUncheckedCreateWithoutOrganizerInput[]
    connectOrCreate?: EventCreateOrConnectWithoutOrganizerInput | EventCreateOrConnectWithoutOrganizerInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type OrderCreateNestedManyWithoutUserInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type CheckInCreateNestedManyWithoutUserInput = {
    create?: XOR<CheckInCreateWithoutUserInput, CheckInUncheckedCreateWithoutUserInput> | CheckInCreateWithoutUserInput[] | CheckInUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CheckInCreateOrConnectWithoutUserInput | CheckInCreateOrConnectWithoutUserInput[]
    connect?: CheckInWhereUniqueInput | CheckInWhereUniqueInput[]
  }

  export type EventUncheckedCreateNestedManyWithoutOrganizerInput = {
    create?: XOR<EventCreateWithoutOrganizerInput, EventUncheckedCreateWithoutOrganizerInput> | EventCreateWithoutOrganizerInput[] | EventUncheckedCreateWithoutOrganizerInput[]
    connectOrCreate?: EventCreateOrConnectWithoutOrganizerInput | EventCreateOrConnectWithoutOrganizerInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type CheckInUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CheckInCreateWithoutUserInput, CheckInUncheckedCreateWithoutUserInput> | CheckInCreateWithoutUserInput[] | CheckInUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CheckInCreateOrConnectWithoutUserInput | CheckInCreateOrConnectWithoutUserInput[]
    connect?: CheckInWhereUniqueInput | CheckInWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EventUpdateManyWithoutOrganizerNestedInput = {
    create?: XOR<EventCreateWithoutOrganizerInput, EventUncheckedCreateWithoutOrganizerInput> | EventCreateWithoutOrganizerInput[] | EventUncheckedCreateWithoutOrganizerInput[]
    connectOrCreate?: EventCreateOrConnectWithoutOrganizerInput | EventCreateOrConnectWithoutOrganizerInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutOrganizerInput | EventUpsertWithWhereUniqueWithoutOrganizerInput[]
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutOrganizerInput | EventUpdateWithWhereUniqueWithoutOrganizerInput[]
    updateMany?: EventUpdateManyWithWhereWithoutOrganizerInput | EventUpdateManyWithWhereWithoutOrganizerInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type OrderUpdateManyWithoutUserNestedInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutUserInput | OrderUpsertWithWhereUniqueWithoutUserInput[]
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutUserInput | OrderUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutUserInput | OrderUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type CheckInUpdateManyWithoutUserNestedInput = {
    create?: XOR<CheckInCreateWithoutUserInput, CheckInUncheckedCreateWithoutUserInput> | CheckInCreateWithoutUserInput[] | CheckInUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CheckInCreateOrConnectWithoutUserInput | CheckInCreateOrConnectWithoutUserInput[]
    upsert?: CheckInUpsertWithWhereUniqueWithoutUserInput | CheckInUpsertWithWhereUniqueWithoutUserInput[]
    set?: CheckInWhereUniqueInput | CheckInWhereUniqueInput[]
    disconnect?: CheckInWhereUniqueInput | CheckInWhereUniqueInput[]
    delete?: CheckInWhereUniqueInput | CheckInWhereUniqueInput[]
    connect?: CheckInWhereUniqueInput | CheckInWhereUniqueInput[]
    update?: CheckInUpdateWithWhereUniqueWithoutUserInput | CheckInUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CheckInUpdateManyWithWhereWithoutUserInput | CheckInUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CheckInScalarWhereInput | CheckInScalarWhereInput[]
  }

  export type EventUncheckedUpdateManyWithoutOrganizerNestedInput = {
    create?: XOR<EventCreateWithoutOrganizerInput, EventUncheckedCreateWithoutOrganizerInput> | EventCreateWithoutOrganizerInput[] | EventUncheckedCreateWithoutOrganizerInput[]
    connectOrCreate?: EventCreateOrConnectWithoutOrganizerInput | EventCreateOrConnectWithoutOrganizerInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutOrganizerInput | EventUpsertWithWhereUniqueWithoutOrganizerInput[]
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutOrganizerInput | EventUpdateWithWhereUniqueWithoutOrganizerInput[]
    updateMany?: EventUpdateManyWithWhereWithoutOrganizerInput | EventUpdateManyWithWhereWithoutOrganizerInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutUserInput | OrderUpsertWithWhereUniqueWithoutUserInput[]
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutUserInput | OrderUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutUserInput | OrderUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type CheckInUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CheckInCreateWithoutUserInput, CheckInUncheckedCreateWithoutUserInput> | CheckInCreateWithoutUserInput[] | CheckInUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CheckInCreateOrConnectWithoutUserInput | CheckInCreateOrConnectWithoutUserInput[]
    upsert?: CheckInUpsertWithWhereUniqueWithoutUserInput | CheckInUpsertWithWhereUniqueWithoutUserInput[]
    set?: CheckInWhereUniqueInput | CheckInWhereUniqueInput[]
    disconnect?: CheckInWhereUniqueInput | CheckInWhereUniqueInput[]
    delete?: CheckInWhereUniqueInput | CheckInWhereUniqueInput[]
    connect?: CheckInWhereUniqueInput | CheckInWhereUniqueInput[]
    update?: CheckInUpdateWithWhereUniqueWithoutUserInput | CheckInUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CheckInUpdateManyWithWhereWithoutUserInput | CheckInUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CheckInScalarWhereInput | CheckInScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutOrganizedEventsInput = {
    create?: XOR<UserCreateWithoutOrganizedEventsInput, UserUncheckedCreateWithoutOrganizedEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrganizedEventsInput
    connect?: UserWhereUniqueInput
  }

  export type OrderCreateNestedManyWithoutEventInput = {
    create?: XOR<OrderCreateWithoutEventInput, OrderUncheckedCreateWithoutEventInput> | OrderCreateWithoutEventInput[] | OrderUncheckedCreateWithoutEventInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutEventInput | OrderCreateOrConnectWithoutEventInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type TicketCreateNestedManyWithoutEventInput = {
    create?: XOR<TicketCreateWithoutEventInput, TicketUncheckedCreateWithoutEventInput> | TicketCreateWithoutEventInput[] | TicketUncheckedCreateWithoutEventInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutEventInput | TicketCreateOrConnectWithoutEventInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type CheckInCreateNestedManyWithoutEventInput = {
    create?: XOR<CheckInCreateWithoutEventInput, CheckInUncheckedCreateWithoutEventInput> | CheckInCreateWithoutEventInput[] | CheckInUncheckedCreateWithoutEventInput[]
    connectOrCreate?: CheckInCreateOrConnectWithoutEventInput | CheckInCreateOrConnectWithoutEventInput[]
    connect?: CheckInWhereUniqueInput | CheckInWhereUniqueInput[]
  }

  export type EventAnalyticsCreateNestedManyWithoutEventInput = {
    create?: XOR<EventAnalyticsCreateWithoutEventInput, EventAnalyticsUncheckedCreateWithoutEventInput> | EventAnalyticsCreateWithoutEventInput[] | EventAnalyticsUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventAnalyticsCreateOrConnectWithoutEventInput | EventAnalyticsCreateOrConnectWithoutEventInput[]
    connect?: EventAnalyticsWhereUniqueInput | EventAnalyticsWhereUniqueInput[]
  }

  export type TicketTierCreateNestedManyWithoutEventInput = {
    create?: XOR<TicketTierCreateWithoutEventInput, TicketTierUncheckedCreateWithoutEventInput> | TicketTierCreateWithoutEventInput[] | TicketTierUncheckedCreateWithoutEventInput[]
    connectOrCreate?: TicketTierCreateOrConnectWithoutEventInput | TicketTierCreateOrConnectWithoutEventInput[]
    connect?: TicketTierWhereUniqueInput | TicketTierWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<OrderCreateWithoutEventInput, OrderUncheckedCreateWithoutEventInput> | OrderCreateWithoutEventInput[] | OrderUncheckedCreateWithoutEventInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutEventInput | OrderCreateOrConnectWithoutEventInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type TicketUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<TicketCreateWithoutEventInput, TicketUncheckedCreateWithoutEventInput> | TicketCreateWithoutEventInput[] | TicketUncheckedCreateWithoutEventInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutEventInput | TicketCreateOrConnectWithoutEventInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type CheckInUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<CheckInCreateWithoutEventInput, CheckInUncheckedCreateWithoutEventInput> | CheckInCreateWithoutEventInput[] | CheckInUncheckedCreateWithoutEventInput[]
    connectOrCreate?: CheckInCreateOrConnectWithoutEventInput | CheckInCreateOrConnectWithoutEventInput[]
    connect?: CheckInWhereUniqueInput | CheckInWhereUniqueInput[]
  }

  export type EventAnalyticsUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<EventAnalyticsCreateWithoutEventInput, EventAnalyticsUncheckedCreateWithoutEventInput> | EventAnalyticsCreateWithoutEventInput[] | EventAnalyticsUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventAnalyticsCreateOrConnectWithoutEventInput | EventAnalyticsCreateOrConnectWithoutEventInput[]
    connect?: EventAnalyticsWhereUniqueInput | EventAnalyticsWhereUniqueInput[]
  }

  export type TicketTierUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<TicketTierCreateWithoutEventInput, TicketTierUncheckedCreateWithoutEventInput> | TicketTierCreateWithoutEventInput[] | TicketTierUncheckedCreateWithoutEventInput[]
    connectOrCreate?: TicketTierCreateOrConnectWithoutEventInput | TicketTierCreateOrConnectWithoutEventInput[]
    connect?: TicketTierWhereUniqueInput | TicketTierWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutOrganizedEventsNestedInput = {
    create?: XOR<UserCreateWithoutOrganizedEventsInput, UserUncheckedCreateWithoutOrganizedEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrganizedEventsInput
    upsert?: UserUpsertWithoutOrganizedEventsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOrganizedEventsInput, UserUpdateWithoutOrganizedEventsInput>, UserUncheckedUpdateWithoutOrganizedEventsInput>
  }

  export type OrderUpdateManyWithoutEventNestedInput = {
    create?: XOR<OrderCreateWithoutEventInput, OrderUncheckedCreateWithoutEventInput> | OrderCreateWithoutEventInput[] | OrderUncheckedCreateWithoutEventInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutEventInput | OrderCreateOrConnectWithoutEventInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutEventInput | OrderUpsertWithWhereUniqueWithoutEventInput[]
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutEventInput | OrderUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutEventInput | OrderUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type TicketUpdateManyWithoutEventNestedInput = {
    create?: XOR<TicketCreateWithoutEventInput, TicketUncheckedCreateWithoutEventInput> | TicketCreateWithoutEventInput[] | TicketUncheckedCreateWithoutEventInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutEventInput | TicketCreateOrConnectWithoutEventInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutEventInput | TicketUpsertWithWhereUniqueWithoutEventInput[]
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutEventInput | TicketUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutEventInput | TicketUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type CheckInUpdateManyWithoutEventNestedInput = {
    create?: XOR<CheckInCreateWithoutEventInput, CheckInUncheckedCreateWithoutEventInput> | CheckInCreateWithoutEventInput[] | CheckInUncheckedCreateWithoutEventInput[]
    connectOrCreate?: CheckInCreateOrConnectWithoutEventInput | CheckInCreateOrConnectWithoutEventInput[]
    upsert?: CheckInUpsertWithWhereUniqueWithoutEventInput | CheckInUpsertWithWhereUniqueWithoutEventInput[]
    set?: CheckInWhereUniqueInput | CheckInWhereUniqueInput[]
    disconnect?: CheckInWhereUniqueInput | CheckInWhereUniqueInput[]
    delete?: CheckInWhereUniqueInput | CheckInWhereUniqueInput[]
    connect?: CheckInWhereUniqueInput | CheckInWhereUniqueInput[]
    update?: CheckInUpdateWithWhereUniqueWithoutEventInput | CheckInUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: CheckInUpdateManyWithWhereWithoutEventInput | CheckInUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: CheckInScalarWhereInput | CheckInScalarWhereInput[]
  }

  export type EventAnalyticsUpdateManyWithoutEventNestedInput = {
    create?: XOR<EventAnalyticsCreateWithoutEventInput, EventAnalyticsUncheckedCreateWithoutEventInput> | EventAnalyticsCreateWithoutEventInput[] | EventAnalyticsUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventAnalyticsCreateOrConnectWithoutEventInput | EventAnalyticsCreateOrConnectWithoutEventInput[]
    upsert?: EventAnalyticsUpsertWithWhereUniqueWithoutEventInput | EventAnalyticsUpsertWithWhereUniqueWithoutEventInput[]
    set?: EventAnalyticsWhereUniqueInput | EventAnalyticsWhereUniqueInput[]
    disconnect?: EventAnalyticsWhereUniqueInput | EventAnalyticsWhereUniqueInput[]
    delete?: EventAnalyticsWhereUniqueInput | EventAnalyticsWhereUniqueInput[]
    connect?: EventAnalyticsWhereUniqueInput | EventAnalyticsWhereUniqueInput[]
    update?: EventAnalyticsUpdateWithWhereUniqueWithoutEventInput | EventAnalyticsUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: EventAnalyticsUpdateManyWithWhereWithoutEventInput | EventAnalyticsUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: EventAnalyticsScalarWhereInput | EventAnalyticsScalarWhereInput[]
  }

  export type TicketTierUpdateManyWithoutEventNestedInput = {
    create?: XOR<TicketTierCreateWithoutEventInput, TicketTierUncheckedCreateWithoutEventInput> | TicketTierCreateWithoutEventInput[] | TicketTierUncheckedCreateWithoutEventInput[]
    connectOrCreate?: TicketTierCreateOrConnectWithoutEventInput | TicketTierCreateOrConnectWithoutEventInput[]
    upsert?: TicketTierUpsertWithWhereUniqueWithoutEventInput | TicketTierUpsertWithWhereUniqueWithoutEventInput[]
    set?: TicketTierWhereUniqueInput | TicketTierWhereUniqueInput[]
    disconnect?: TicketTierWhereUniqueInput | TicketTierWhereUniqueInput[]
    delete?: TicketTierWhereUniqueInput | TicketTierWhereUniqueInput[]
    connect?: TicketTierWhereUniqueInput | TicketTierWhereUniqueInput[]
    update?: TicketTierUpdateWithWhereUniqueWithoutEventInput | TicketTierUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: TicketTierUpdateManyWithWhereWithoutEventInput | TicketTierUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: TicketTierScalarWhereInput | TicketTierScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<OrderCreateWithoutEventInput, OrderUncheckedCreateWithoutEventInput> | OrderCreateWithoutEventInput[] | OrderUncheckedCreateWithoutEventInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutEventInput | OrderCreateOrConnectWithoutEventInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutEventInput | OrderUpsertWithWhereUniqueWithoutEventInput[]
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutEventInput | OrderUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutEventInput | OrderUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type TicketUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<TicketCreateWithoutEventInput, TicketUncheckedCreateWithoutEventInput> | TicketCreateWithoutEventInput[] | TicketUncheckedCreateWithoutEventInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutEventInput | TicketCreateOrConnectWithoutEventInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutEventInput | TicketUpsertWithWhereUniqueWithoutEventInput[]
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutEventInput | TicketUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutEventInput | TicketUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type CheckInUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<CheckInCreateWithoutEventInput, CheckInUncheckedCreateWithoutEventInput> | CheckInCreateWithoutEventInput[] | CheckInUncheckedCreateWithoutEventInput[]
    connectOrCreate?: CheckInCreateOrConnectWithoutEventInput | CheckInCreateOrConnectWithoutEventInput[]
    upsert?: CheckInUpsertWithWhereUniqueWithoutEventInput | CheckInUpsertWithWhereUniqueWithoutEventInput[]
    set?: CheckInWhereUniqueInput | CheckInWhereUniqueInput[]
    disconnect?: CheckInWhereUniqueInput | CheckInWhereUniqueInput[]
    delete?: CheckInWhereUniqueInput | CheckInWhereUniqueInput[]
    connect?: CheckInWhereUniqueInput | CheckInWhereUniqueInput[]
    update?: CheckInUpdateWithWhereUniqueWithoutEventInput | CheckInUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: CheckInUpdateManyWithWhereWithoutEventInput | CheckInUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: CheckInScalarWhereInput | CheckInScalarWhereInput[]
  }

  export type EventAnalyticsUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<EventAnalyticsCreateWithoutEventInput, EventAnalyticsUncheckedCreateWithoutEventInput> | EventAnalyticsCreateWithoutEventInput[] | EventAnalyticsUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventAnalyticsCreateOrConnectWithoutEventInput | EventAnalyticsCreateOrConnectWithoutEventInput[]
    upsert?: EventAnalyticsUpsertWithWhereUniqueWithoutEventInput | EventAnalyticsUpsertWithWhereUniqueWithoutEventInput[]
    set?: EventAnalyticsWhereUniqueInput | EventAnalyticsWhereUniqueInput[]
    disconnect?: EventAnalyticsWhereUniqueInput | EventAnalyticsWhereUniqueInput[]
    delete?: EventAnalyticsWhereUniqueInput | EventAnalyticsWhereUniqueInput[]
    connect?: EventAnalyticsWhereUniqueInput | EventAnalyticsWhereUniqueInput[]
    update?: EventAnalyticsUpdateWithWhereUniqueWithoutEventInput | EventAnalyticsUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: EventAnalyticsUpdateManyWithWhereWithoutEventInput | EventAnalyticsUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: EventAnalyticsScalarWhereInput | EventAnalyticsScalarWhereInput[]
  }

  export type TicketTierUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<TicketTierCreateWithoutEventInput, TicketTierUncheckedCreateWithoutEventInput> | TicketTierCreateWithoutEventInput[] | TicketTierUncheckedCreateWithoutEventInput[]
    connectOrCreate?: TicketTierCreateOrConnectWithoutEventInput | TicketTierCreateOrConnectWithoutEventInput[]
    upsert?: TicketTierUpsertWithWhereUniqueWithoutEventInput | TicketTierUpsertWithWhereUniqueWithoutEventInput[]
    set?: TicketTierWhereUniqueInput | TicketTierWhereUniqueInput[]
    disconnect?: TicketTierWhereUniqueInput | TicketTierWhereUniqueInput[]
    delete?: TicketTierWhereUniqueInput | TicketTierWhereUniqueInput[]
    connect?: TicketTierWhereUniqueInput | TicketTierWhereUniqueInput[]
    update?: TicketTierUpdateWithWhereUniqueWithoutEventInput | TicketTierUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: TicketTierUpdateManyWithWhereWithoutEventInput | TicketTierUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: TicketTierScalarWhereInput | TicketTierScalarWhereInput[]
  }

  export type EventCreateNestedOneWithoutTicketsInput = {
    create?: XOR<EventCreateWithoutTicketsInput, EventUncheckedCreateWithoutTicketsInput>
    connectOrCreate?: EventCreateOrConnectWithoutTicketsInput
    connect?: EventWhereUniqueInput
  }

  export type OrderCreateNestedOneWithoutTicketsInput = {
    create?: XOR<OrderCreateWithoutTicketsInput, OrderUncheckedCreateWithoutTicketsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutTicketsInput
    connect?: OrderWhereUniqueInput
  }

  export type CheckInCreateNestedOneWithoutTicketInput = {
    create?: XOR<CheckInCreateWithoutTicketInput, CheckInUncheckedCreateWithoutTicketInput>
    connectOrCreate?: CheckInCreateOrConnectWithoutTicketInput
    connect?: CheckInWhereUniqueInput
  }

  export type CheckInUncheckedCreateNestedOneWithoutTicketInput = {
    create?: XOR<CheckInCreateWithoutTicketInput, CheckInUncheckedCreateWithoutTicketInput>
    connectOrCreate?: CheckInCreateOrConnectWithoutTicketInput
    connect?: CheckInWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EventUpdateOneRequiredWithoutTicketsNestedInput = {
    create?: XOR<EventCreateWithoutTicketsInput, EventUncheckedCreateWithoutTicketsInput>
    connectOrCreate?: EventCreateOrConnectWithoutTicketsInput
    upsert?: EventUpsertWithoutTicketsInput
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutTicketsInput, EventUpdateWithoutTicketsInput>, EventUncheckedUpdateWithoutTicketsInput>
  }

  export type OrderUpdateOneRequiredWithoutTicketsNestedInput = {
    create?: XOR<OrderCreateWithoutTicketsInput, OrderUncheckedCreateWithoutTicketsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutTicketsInput
    upsert?: OrderUpsertWithoutTicketsInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutTicketsInput, OrderUpdateWithoutTicketsInput>, OrderUncheckedUpdateWithoutTicketsInput>
  }

  export type CheckInUpdateOneWithoutTicketNestedInput = {
    create?: XOR<CheckInCreateWithoutTicketInput, CheckInUncheckedCreateWithoutTicketInput>
    connectOrCreate?: CheckInCreateOrConnectWithoutTicketInput
    upsert?: CheckInUpsertWithoutTicketInput
    disconnect?: CheckInWhereInput | boolean
    delete?: CheckInWhereInput | boolean
    connect?: CheckInWhereUniqueInput
    update?: XOR<XOR<CheckInUpdateToOneWithWhereWithoutTicketInput, CheckInUpdateWithoutTicketInput>, CheckInUncheckedUpdateWithoutTicketInput>
  }

  export type CheckInUncheckedUpdateOneWithoutTicketNestedInput = {
    create?: XOR<CheckInCreateWithoutTicketInput, CheckInUncheckedCreateWithoutTicketInput>
    connectOrCreate?: CheckInCreateOrConnectWithoutTicketInput
    upsert?: CheckInUpsertWithoutTicketInput
    disconnect?: CheckInWhereInput | boolean
    delete?: CheckInWhereInput | boolean
    connect?: CheckInWhereUniqueInput
    update?: XOR<XOR<CheckInUpdateToOneWithWhereWithoutTicketInput, CheckInUpdateWithoutTicketInput>, CheckInUncheckedUpdateWithoutTicketInput>
  }

  export type UserCreateNestedOneWithoutOrdersInput = {
    create?: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrdersInput
    connect?: UserWhereUniqueInput
  }

  export type EventCreateNestedOneWithoutOrdersInput = {
    create?: XOR<EventCreateWithoutOrdersInput, EventUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: EventCreateOrConnectWithoutOrdersInput
    connect?: EventWhereUniqueInput
  }

  export type TicketCreateNestedManyWithoutOrderInput = {
    create?: XOR<TicketCreateWithoutOrderInput, TicketUncheckedCreateWithoutOrderInput> | TicketCreateWithoutOrderInput[] | TicketUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutOrderInput | TicketCreateOrConnectWithoutOrderInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type TicketUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<TicketCreateWithoutOrderInput, TicketUncheckedCreateWithoutOrderInput> | TicketCreateWithoutOrderInput[] | TicketUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutOrderInput | TicketCreateOrConnectWithoutOrderInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrdersInput
    upsert?: UserUpsertWithoutOrdersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOrdersInput, UserUpdateWithoutOrdersInput>, UserUncheckedUpdateWithoutOrdersInput>
  }

  export type EventUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<EventCreateWithoutOrdersInput, EventUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: EventCreateOrConnectWithoutOrdersInput
    upsert?: EventUpsertWithoutOrdersInput
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutOrdersInput, EventUpdateWithoutOrdersInput>, EventUncheckedUpdateWithoutOrdersInput>
  }

  export type TicketUpdateManyWithoutOrderNestedInput = {
    create?: XOR<TicketCreateWithoutOrderInput, TicketUncheckedCreateWithoutOrderInput> | TicketCreateWithoutOrderInput[] | TicketUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutOrderInput | TicketCreateOrConnectWithoutOrderInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutOrderInput | TicketUpsertWithWhereUniqueWithoutOrderInput[]
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutOrderInput | TicketUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutOrderInput | TicketUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type TicketUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<TicketCreateWithoutOrderInput, TicketUncheckedCreateWithoutOrderInput> | TicketCreateWithoutOrderInput[] | TicketUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutOrderInput | TicketCreateOrConnectWithoutOrderInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutOrderInput | TicketUpsertWithWhereUniqueWithoutOrderInput[]
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutOrderInput | TicketUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutOrderInput | TicketUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type TicketCreateNestedOneWithoutCheckInInput = {
    create?: XOR<TicketCreateWithoutCheckInInput, TicketUncheckedCreateWithoutCheckInInput>
    connectOrCreate?: TicketCreateOrConnectWithoutCheckInInput
    connect?: TicketWhereUniqueInput
  }

  export type EventCreateNestedOneWithoutCheckInsInput = {
    create?: XOR<EventCreateWithoutCheckInsInput, EventUncheckedCreateWithoutCheckInsInput>
    connectOrCreate?: EventCreateOrConnectWithoutCheckInsInput
    connect?: EventWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCheckInsInput = {
    create?: XOR<UserCreateWithoutCheckInsInput, UserUncheckedCreateWithoutCheckInsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCheckInsInput
    connect?: UserWhereUniqueInput
  }

  export type TicketUpdateOneRequiredWithoutCheckInNestedInput = {
    create?: XOR<TicketCreateWithoutCheckInInput, TicketUncheckedCreateWithoutCheckInInput>
    connectOrCreate?: TicketCreateOrConnectWithoutCheckInInput
    upsert?: TicketUpsertWithoutCheckInInput
    connect?: TicketWhereUniqueInput
    update?: XOR<XOR<TicketUpdateToOneWithWhereWithoutCheckInInput, TicketUpdateWithoutCheckInInput>, TicketUncheckedUpdateWithoutCheckInInput>
  }

  export type EventUpdateOneRequiredWithoutCheckInsNestedInput = {
    create?: XOR<EventCreateWithoutCheckInsInput, EventUncheckedCreateWithoutCheckInsInput>
    connectOrCreate?: EventCreateOrConnectWithoutCheckInsInput
    upsert?: EventUpsertWithoutCheckInsInput
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutCheckInsInput, EventUpdateWithoutCheckInsInput>, EventUncheckedUpdateWithoutCheckInsInput>
  }

  export type UserUpdateOneRequiredWithoutCheckInsNestedInput = {
    create?: XOR<UserCreateWithoutCheckInsInput, UserUncheckedCreateWithoutCheckInsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCheckInsInput
    upsert?: UserUpsertWithoutCheckInsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCheckInsInput, UserUpdateWithoutCheckInsInput>, UserUncheckedUpdateWithoutCheckInsInput>
  }

  export type EventCreateNestedOneWithoutAnalyticsInput = {
    create?: XOR<EventCreateWithoutAnalyticsInput, EventUncheckedCreateWithoutAnalyticsInput>
    connectOrCreate?: EventCreateOrConnectWithoutAnalyticsInput
    connect?: EventWhereUniqueInput
  }

  export type EventUpdateOneRequiredWithoutAnalyticsNestedInput = {
    create?: XOR<EventCreateWithoutAnalyticsInput, EventUncheckedCreateWithoutAnalyticsInput>
    connectOrCreate?: EventCreateOrConnectWithoutAnalyticsInput
    upsert?: EventUpsertWithoutAnalyticsInput
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutAnalyticsInput, EventUpdateWithoutAnalyticsInput>, EventUncheckedUpdateWithoutAnalyticsInput>
  }

  export type EventCreateNestedOneWithoutTiersInput = {
    create?: XOR<EventCreateWithoutTiersInput, EventUncheckedCreateWithoutTiersInput>
    connectOrCreate?: EventCreateOrConnectWithoutTiersInput
    connect?: EventWhereUniqueInput
  }

  export type EventUpdateOneRequiredWithoutTiersNestedInput = {
    create?: XOR<EventCreateWithoutTiersInput, EventUncheckedCreateWithoutTiersInput>
    connectOrCreate?: EventCreateOrConnectWithoutTiersInput
    upsert?: EventUpsertWithoutTiersInput
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutTiersInput, EventUpdateWithoutTiersInput>, EventUncheckedUpdateWithoutTiersInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EventCreateWithoutOrganizerInput = {
    id?: string
    title: string
    description?: string | null
    venue: string
    address?: string | null
    city?: string | null
    country?: string | null
    latitude?: number | null
    longitude?: number | null
    eventDate: Date | string
    saleStart: Date | string
    saleEnd: Date | string
    totalSupply: number
    ticketPrice: number
    currency?: string
    maxPerWallet?: number
    contractAddress?: string | null
    chainId?: number
    imageUrl?: string | null
    metadataUri?: string | null
    category?: string
    tags: string
    isPublic?: boolean
    allowTransfers?: boolean
    requireKYC?: boolean
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderCreateNestedManyWithoutEventInput
    tickets?: TicketCreateNestedManyWithoutEventInput
    checkIns?: CheckInCreateNestedManyWithoutEventInput
    analytics?: EventAnalyticsCreateNestedManyWithoutEventInput
    tiers?: TicketTierCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutOrganizerInput = {
    id?: string
    title: string
    description?: string | null
    venue: string
    address?: string | null
    city?: string | null
    country?: string | null
    latitude?: number | null
    longitude?: number | null
    eventDate: Date | string
    saleStart: Date | string
    saleEnd: Date | string
    totalSupply: number
    ticketPrice: number
    currency?: string
    maxPerWallet?: number
    contractAddress?: string | null
    chainId?: number
    imageUrl?: string | null
    metadataUri?: string | null
    category?: string
    tags: string
    isPublic?: boolean
    allowTransfers?: boolean
    requireKYC?: boolean
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutEventInput
    tickets?: TicketUncheckedCreateNestedManyWithoutEventInput
    checkIns?: CheckInUncheckedCreateNestedManyWithoutEventInput
    analytics?: EventAnalyticsUncheckedCreateNestedManyWithoutEventInput
    tiers?: TicketTierUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutOrganizerInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutOrganizerInput, EventUncheckedCreateWithoutOrganizerInput>
  }

  export type OrderCreateWithoutUserInput = {
    id?: string
    totalAmount: number
    quantity: number
    currency: string
    paymentMethod: string
    paymentStatus?: string
    stripePaymentId?: string | null
    coinbaseChargeId?: string | null
    blockchainTxHash?: string | null
    paystackReference?: string | null
    flutterwaveReference?: string | null
    mpesaCheckoutRequestId?: string | null
    paymentTxId?: string | null
    customerEmail: string
    customerName?: string | null
    billingAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    event: EventCreateNestedOneWithoutOrdersInput
    tickets?: TicketCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutUserInput = {
    id?: string
    totalAmount: number
    quantity: number
    currency: string
    paymentMethod: string
    paymentStatus?: string
    stripePaymentId?: string | null
    coinbaseChargeId?: string | null
    blockchainTxHash?: string | null
    paystackReference?: string | null
    flutterwaveReference?: string | null
    mpesaCheckoutRequestId?: string | null
    paymentTxId?: string | null
    customerEmail: string
    customerName?: string | null
    billingAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    eventId: string
    tickets?: TicketUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutUserInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput>
  }

  export type CheckInCreateWithoutUserInput = {
    id?: string
    checkedInAt?: Date | string
    checkedInBy?: string | null
    location?: string | null
    poaTokenId?: number | null
    poaContractAddr?: string | null
    poaTxHash?: string | null
    ticket: TicketCreateNestedOneWithoutCheckInInput
    event: EventCreateNestedOneWithoutCheckInsInput
  }

  export type CheckInUncheckedCreateWithoutUserInput = {
    id?: string
    checkedInAt?: Date | string
    checkedInBy?: string | null
    location?: string | null
    poaTokenId?: number | null
    poaContractAddr?: string | null
    poaTxHash?: string | null
    ticketId: string
    eventId: string
  }

  export type CheckInCreateOrConnectWithoutUserInput = {
    where: CheckInWhereUniqueInput
    create: XOR<CheckInCreateWithoutUserInput, CheckInUncheckedCreateWithoutUserInput>
  }

  export type EventUpsertWithWhereUniqueWithoutOrganizerInput = {
    where: EventWhereUniqueInput
    update: XOR<EventUpdateWithoutOrganizerInput, EventUncheckedUpdateWithoutOrganizerInput>
    create: XOR<EventCreateWithoutOrganizerInput, EventUncheckedCreateWithoutOrganizerInput>
  }

  export type EventUpdateWithWhereUniqueWithoutOrganizerInput = {
    where: EventWhereUniqueInput
    data: XOR<EventUpdateWithoutOrganizerInput, EventUncheckedUpdateWithoutOrganizerInput>
  }

  export type EventUpdateManyWithWhereWithoutOrganizerInput = {
    where: EventScalarWhereInput
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyWithoutOrganizerInput>
  }

  export type EventScalarWhereInput = {
    AND?: EventScalarWhereInput | EventScalarWhereInput[]
    OR?: EventScalarWhereInput[]
    NOT?: EventScalarWhereInput | EventScalarWhereInput[]
    id?: StringFilter<"Event"> | string
    title?: StringFilter<"Event"> | string
    description?: StringNullableFilter<"Event"> | string | null
    venue?: StringFilter<"Event"> | string
    address?: StringNullableFilter<"Event"> | string | null
    city?: StringNullableFilter<"Event"> | string | null
    country?: StringNullableFilter<"Event"> | string | null
    latitude?: FloatNullableFilter<"Event"> | number | null
    longitude?: FloatNullableFilter<"Event"> | number | null
    eventDate?: DateTimeFilter<"Event"> | Date | string
    saleStart?: DateTimeFilter<"Event"> | Date | string
    saleEnd?: DateTimeFilter<"Event"> | Date | string
    totalSupply?: IntFilter<"Event"> | number
    ticketPrice?: FloatFilter<"Event"> | number
    currency?: StringFilter<"Event"> | string
    maxPerWallet?: IntFilter<"Event"> | number
    contractAddress?: StringNullableFilter<"Event"> | string | null
    chainId?: IntFilter<"Event"> | number
    imageUrl?: StringNullableFilter<"Event"> | string | null
    metadataUri?: StringNullableFilter<"Event"> | string | null
    category?: StringFilter<"Event"> | string
    tags?: StringFilter<"Event"> | string
    isPublic?: BoolFilter<"Event"> | boolean
    allowTransfers?: BoolFilter<"Event"> | boolean
    requireKYC?: BoolFilter<"Event"> | boolean
    status?: StringFilter<"Event"> | string
    createdAt?: DateTimeFilter<"Event"> | Date | string
    updatedAt?: DateTimeFilter<"Event"> | Date | string
    organizerId?: StringFilter<"Event"> | string
  }

  export type OrderUpsertWithWhereUniqueWithoutUserInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutUserInput, OrderUncheckedUpdateWithoutUserInput>
    create: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutUserInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutUserInput, OrderUncheckedUpdateWithoutUserInput>
  }

  export type OrderUpdateManyWithWhereWithoutUserInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutUserInput>
  }

  export type OrderScalarWhereInput = {
    AND?: OrderScalarWhereInput | OrderScalarWhereInput[]
    OR?: OrderScalarWhereInput[]
    NOT?: OrderScalarWhereInput | OrderScalarWhereInput[]
    id?: StringFilter<"Order"> | string
    totalAmount?: FloatFilter<"Order"> | number
    quantity?: IntFilter<"Order"> | number
    currency?: StringFilter<"Order"> | string
    paymentMethod?: StringFilter<"Order"> | string
    paymentStatus?: StringFilter<"Order"> | string
    stripePaymentId?: StringNullableFilter<"Order"> | string | null
    coinbaseChargeId?: StringNullableFilter<"Order"> | string | null
    blockchainTxHash?: StringNullableFilter<"Order"> | string | null
    paystackReference?: StringNullableFilter<"Order"> | string | null
    flutterwaveReference?: StringNullableFilter<"Order"> | string | null
    mpesaCheckoutRequestId?: StringNullableFilter<"Order"> | string | null
    paymentTxId?: StringNullableFilter<"Order"> | string | null
    customerEmail?: StringFilter<"Order"> | string
    customerName?: StringNullableFilter<"Order"> | string | null
    billingAddress?: StringNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    userId?: StringFilter<"Order"> | string
    eventId?: StringFilter<"Order"> | string
  }

  export type CheckInUpsertWithWhereUniqueWithoutUserInput = {
    where: CheckInWhereUniqueInput
    update: XOR<CheckInUpdateWithoutUserInput, CheckInUncheckedUpdateWithoutUserInput>
    create: XOR<CheckInCreateWithoutUserInput, CheckInUncheckedCreateWithoutUserInput>
  }

  export type CheckInUpdateWithWhereUniqueWithoutUserInput = {
    where: CheckInWhereUniqueInput
    data: XOR<CheckInUpdateWithoutUserInput, CheckInUncheckedUpdateWithoutUserInput>
  }

  export type CheckInUpdateManyWithWhereWithoutUserInput = {
    where: CheckInScalarWhereInput
    data: XOR<CheckInUpdateManyMutationInput, CheckInUncheckedUpdateManyWithoutUserInput>
  }

  export type CheckInScalarWhereInput = {
    AND?: CheckInScalarWhereInput | CheckInScalarWhereInput[]
    OR?: CheckInScalarWhereInput[]
    NOT?: CheckInScalarWhereInput | CheckInScalarWhereInput[]
    id?: StringFilter<"CheckIn"> | string
    checkedInAt?: DateTimeFilter<"CheckIn"> | Date | string
    checkedInBy?: StringNullableFilter<"CheckIn"> | string | null
    location?: StringNullableFilter<"CheckIn"> | string | null
    poaTokenId?: IntNullableFilter<"CheckIn"> | number | null
    poaContractAddr?: StringNullableFilter<"CheckIn"> | string | null
    poaTxHash?: StringNullableFilter<"CheckIn"> | string | null
    ticketId?: StringFilter<"CheckIn"> | string
    eventId?: StringFilter<"CheckIn"> | string
    userId?: StringFilter<"CheckIn"> | string
  }

  export type UserCreateWithoutOrganizedEventsInput = {
    id?: string
    email: string
    password?: string | null
    name?: string | null
    walletAddress?: string | null
    googleId?: string | null
    twitterId?: string | null
    avatar?: string | null
    role?: string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderCreateNestedManyWithoutUserInput
    checkIns?: CheckInCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOrganizedEventsInput = {
    id?: string
    email: string
    password?: string | null
    name?: string | null
    walletAddress?: string | null
    googleId?: string | null
    twitterId?: string | null
    avatar?: string | null
    role?: string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    checkIns?: CheckInUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOrganizedEventsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOrganizedEventsInput, UserUncheckedCreateWithoutOrganizedEventsInput>
  }

  export type OrderCreateWithoutEventInput = {
    id?: string
    totalAmount: number
    quantity: number
    currency: string
    paymentMethod: string
    paymentStatus?: string
    stripePaymentId?: string | null
    coinbaseChargeId?: string | null
    blockchainTxHash?: string | null
    paystackReference?: string | null
    flutterwaveReference?: string | null
    mpesaCheckoutRequestId?: string | null
    paymentTxId?: string | null
    customerEmail: string
    customerName?: string | null
    billingAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutOrdersInput
    tickets?: TicketCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutEventInput = {
    id?: string
    totalAmount: number
    quantity: number
    currency: string
    paymentMethod: string
    paymentStatus?: string
    stripePaymentId?: string | null
    coinbaseChargeId?: string | null
    blockchainTxHash?: string | null
    paystackReference?: string | null
    flutterwaveReference?: string | null
    mpesaCheckoutRequestId?: string | null
    paymentTxId?: string | null
    customerEmail: string
    customerName?: string | null
    billingAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    tickets?: TicketUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutEventInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutEventInput, OrderUncheckedCreateWithoutEventInput>
  }

  export type TicketCreateWithoutEventInput = {
    id?: string
    tokenId: number
    contractAddress: string
    chainId: number
    txHash?: string | null
    blockNumber?: number | null
    metadataUri?: string | null
    seatNumber?: string | null
    section?: string | null
    tier?: string | null
    isUsed?: boolean
    usedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    order: OrderCreateNestedOneWithoutTicketsInput
    checkIn?: CheckInCreateNestedOneWithoutTicketInput
  }

  export type TicketUncheckedCreateWithoutEventInput = {
    id?: string
    tokenId: number
    contractAddress: string
    chainId: number
    txHash?: string | null
    blockNumber?: number | null
    metadataUri?: string | null
    seatNumber?: string | null
    section?: string | null
    tier?: string | null
    isUsed?: boolean
    usedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    orderId: string
    checkIn?: CheckInUncheckedCreateNestedOneWithoutTicketInput
  }

  export type TicketCreateOrConnectWithoutEventInput = {
    where: TicketWhereUniqueInput
    create: XOR<TicketCreateWithoutEventInput, TicketUncheckedCreateWithoutEventInput>
  }

  export type CheckInCreateWithoutEventInput = {
    id?: string
    checkedInAt?: Date | string
    checkedInBy?: string | null
    location?: string | null
    poaTokenId?: number | null
    poaContractAddr?: string | null
    poaTxHash?: string | null
    ticket: TicketCreateNestedOneWithoutCheckInInput
    user: UserCreateNestedOneWithoutCheckInsInput
  }

  export type CheckInUncheckedCreateWithoutEventInput = {
    id?: string
    checkedInAt?: Date | string
    checkedInBy?: string | null
    location?: string | null
    poaTokenId?: number | null
    poaContractAddr?: string | null
    poaTxHash?: string | null
    ticketId: string
    userId: string
  }

  export type CheckInCreateOrConnectWithoutEventInput = {
    where: CheckInWhereUniqueInput
    create: XOR<CheckInCreateWithoutEventInput, CheckInUncheckedCreateWithoutEventInput>
  }

  export type EventAnalyticsCreateWithoutEventInput = {
    id?: string
    date?: Date | string
    ticketsSold?: number
    revenue?: number
    uniqueBuyers?: number
    checkIns?: number
    checkInRate?: number
    noShows?: number
    topCountries?: string | null
    topCities?: string | null
    hourlyBreakdown?: string | null
  }

  export type EventAnalyticsUncheckedCreateWithoutEventInput = {
    id?: string
    date?: Date | string
    ticketsSold?: number
    revenue?: number
    uniqueBuyers?: number
    checkIns?: number
    checkInRate?: number
    noShows?: number
    topCountries?: string | null
    topCities?: string | null
    hourlyBreakdown?: string | null
  }

  export type EventAnalyticsCreateOrConnectWithoutEventInput = {
    where: EventAnalyticsWhereUniqueInput
    create: XOR<EventAnalyticsCreateWithoutEventInput, EventAnalyticsUncheckedCreateWithoutEventInput>
  }

  export type TicketTierCreateWithoutEventInput = {
    id?: string
    name: string
    description?: string | null
    price: number
    availableQuantity: number
    maxPerPerson?: number
    saleStart: Date | string
    saleEnd: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TicketTierUncheckedCreateWithoutEventInput = {
    id?: string
    name: string
    description?: string | null
    price: number
    availableQuantity: number
    maxPerPerson?: number
    saleStart: Date | string
    saleEnd: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TicketTierCreateOrConnectWithoutEventInput = {
    where: TicketTierWhereUniqueInput
    create: XOR<TicketTierCreateWithoutEventInput, TicketTierUncheckedCreateWithoutEventInput>
  }

  export type UserUpsertWithoutOrganizedEventsInput = {
    update: XOR<UserUpdateWithoutOrganizedEventsInput, UserUncheckedUpdateWithoutOrganizedEventsInput>
    create: XOR<UserCreateWithoutOrganizedEventsInput, UserUncheckedCreateWithoutOrganizedEventsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOrganizedEventsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOrganizedEventsInput, UserUncheckedUpdateWithoutOrganizedEventsInput>
  }

  export type UserUpdateWithoutOrganizedEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    twitterId?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutUserNestedInput
    checkIns?: CheckInUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOrganizedEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    twitterId?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    checkIns?: CheckInUncheckedUpdateManyWithoutUserNestedInput
  }

  export type OrderUpsertWithWhereUniqueWithoutEventInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutEventInput, OrderUncheckedUpdateWithoutEventInput>
    create: XOR<OrderCreateWithoutEventInput, OrderUncheckedCreateWithoutEventInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutEventInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutEventInput, OrderUncheckedUpdateWithoutEventInput>
  }

  export type OrderUpdateManyWithWhereWithoutEventInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutEventInput>
  }

  export type TicketUpsertWithWhereUniqueWithoutEventInput = {
    where: TicketWhereUniqueInput
    update: XOR<TicketUpdateWithoutEventInput, TicketUncheckedUpdateWithoutEventInput>
    create: XOR<TicketCreateWithoutEventInput, TicketUncheckedCreateWithoutEventInput>
  }

  export type TicketUpdateWithWhereUniqueWithoutEventInput = {
    where: TicketWhereUniqueInput
    data: XOR<TicketUpdateWithoutEventInput, TicketUncheckedUpdateWithoutEventInput>
  }

  export type TicketUpdateManyWithWhereWithoutEventInput = {
    where: TicketScalarWhereInput
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyWithoutEventInput>
  }

  export type TicketScalarWhereInput = {
    AND?: TicketScalarWhereInput | TicketScalarWhereInput[]
    OR?: TicketScalarWhereInput[]
    NOT?: TicketScalarWhereInput | TicketScalarWhereInput[]
    id?: StringFilter<"Ticket"> | string
    tokenId?: IntFilter<"Ticket"> | number
    contractAddress?: StringFilter<"Ticket"> | string
    chainId?: IntFilter<"Ticket"> | number
    txHash?: StringNullableFilter<"Ticket"> | string | null
    blockNumber?: IntNullableFilter<"Ticket"> | number | null
    metadataUri?: StringNullableFilter<"Ticket"> | string | null
    seatNumber?: StringNullableFilter<"Ticket"> | string | null
    section?: StringNullableFilter<"Ticket"> | string | null
    tier?: StringNullableFilter<"Ticket"> | string | null
    isUsed?: BoolFilter<"Ticket"> | boolean
    usedAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    createdAt?: DateTimeFilter<"Ticket"> | Date | string
    updatedAt?: DateTimeFilter<"Ticket"> | Date | string
    eventId?: StringFilter<"Ticket"> | string
    orderId?: StringFilter<"Ticket"> | string
  }

  export type CheckInUpsertWithWhereUniqueWithoutEventInput = {
    where: CheckInWhereUniqueInput
    update: XOR<CheckInUpdateWithoutEventInput, CheckInUncheckedUpdateWithoutEventInput>
    create: XOR<CheckInCreateWithoutEventInput, CheckInUncheckedCreateWithoutEventInput>
  }

  export type CheckInUpdateWithWhereUniqueWithoutEventInput = {
    where: CheckInWhereUniqueInput
    data: XOR<CheckInUpdateWithoutEventInput, CheckInUncheckedUpdateWithoutEventInput>
  }

  export type CheckInUpdateManyWithWhereWithoutEventInput = {
    where: CheckInScalarWhereInput
    data: XOR<CheckInUpdateManyMutationInput, CheckInUncheckedUpdateManyWithoutEventInput>
  }

  export type EventAnalyticsUpsertWithWhereUniqueWithoutEventInput = {
    where: EventAnalyticsWhereUniqueInput
    update: XOR<EventAnalyticsUpdateWithoutEventInput, EventAnalyticsUncheckedUpdateWithoutEventInput>
    create: XOR<EventAnalyticsCreateWithoutEventInput, EventAnalyticsUncheckedCreateWithoutEventInput>
  }

  export type EventAnalyticsUpdateWithWhereUniqueWithoutEventInput = {
    where: EventAnalyticsWhereUniqueInput
    data: XOR<EventAnalyticsUpdateWithoutEventInput, EventAnalyticsUncheckedUpdateWithoutEventInput>
  }

  export type EventAnalyticsUpdateManyWithWhereWithoutEventInput = {
    where: EventAnalyticsScalarWhereInput
    data: XOR<EventAnalyticsUpdateManyMutationInput, EventAnalyticsUncheckedUpdateManyWithoutEventInput>
  }

  export type EventAnalyticsScalarWhereInput = {
    AND?: EventAnalyticsScalarWhereInput | EventAnalyticsScalarWhereInput[]
    OR?: EventAnalyticsScalarWhereInput[]
    NOT?: EventAnalyticsScalarWhereInput | EventAnalyticsScalarWhereInput[]
    id?: StringFilter<"EventAnalytics"> | string
    date?: DateTimeFilter<"EventAnalytics"> | Date | string
    ticketsSold?: IntFilter<"EventAnalytics"> | number
    revenue?: FloatFilter<"EventAnalytics"> | number
    uniqueBuyers?: IntFilter<"EventAnalytics"> | number
    checkIns?: IntFilter<"EventAnalytics"> | number
    checkInRate?: FloatFilter<"EventAnalytics"> | number
    noShows?: IntFilter<"EventAnalytics"> | number
    topCountries?: StringNullableFilter<"EventAnalytics"> | string | null
    topCities?: StringNullableFilter<"EventAnalytics"> | string | null
    hourlyBreakdown?: StringNullableFilter<"EventAnalytics"> | string | null
    eventId?: StringFilter<"EventAnalytics"> | string
  }

  export type TicketTierUpsertWithWhereUniqueWithoutEventInput = {
    where: TicketTierWhereUniqueInput
    update: XOR<TicketTierUpdateWithoutEventInput, TicketTierUncheckedUpdateWithoutEventInput>
    create: XOR<TicketTierCreateWithoutEventInput, TicketTierUncheckedCreateWithoutEventInput>
  }

  export type TicketTierUpdateWithWhereUniqueWithoutEventInput = {
    where: TicketTierWhereUniqueInput
    data: XOR<TicketTierUpdateWithoutEventInput, TicketTierUncheckedUpdateWithoutEventInput>
  }

  export type TicketTierUpdateManyWithWhereWithoutEventInput = {
    where: TicketTierScalarWhereInput
    data: XOR<TicketTierUpdateManyMutationInput, TicketTierUncheckedUpdateManyWithoutEventInput>
  }

  export type TicketTierScalarWhereInput = {
    AND?: TicketTierScalarWhereInput | TicketTierScalarWhereInput[]
    OR?: TicketTierScalarWhereInput[]
    NOT?: TicketTierScalarWhereInput | TicketTierScalarWhereInput[]
    id?: StringFilter<"TicketTier"> | string
    name?: StringFilter<"TicketTier"> | string
    description?: StringNullableFilter<"TicketTier"> | string | null
    price?: FloatFilter<"TicketTier"> | number
    availableQuantity?: IntFilter<"TicketTier"> | number
    maxPerPerson?: IntFilter<"TicketTier"> | number
    saleStart?: DateTimeFilter<"TicketTier"> | Date | string
    saleEnd?: DateTimeFilter<"TicketTier"> | Date | string
    createdAt?: DateTimeFilter<"TicketTier"> | Date | string
    updatedAt?: DateTimeFilter<"TicketTier"> | Date | string
    eventId?: StringFilter<"TicketTier"> | string
  }

  export type EventCreateWithoutTicketsInput = {
    id?: string
    title: string
    description?: string | null
    venue: string
    address?: string | null
    city?: string | null
    country?: string | null
    latitude?: number | null
    longitude?: number | null
    eventDate: Date | string
    saleStart: Date | string
    saleEnd: Date | string
    totalSupply: number
    ticketPrice: number
    currency?: string
    maxPerWallet?: number
    contractAddress?: string | null
    chainId?: number
    imageUrl?: string | null
    metadataUri?: string | null
    category?: string
    tags: string
    isPublic?: boolean
    allowTransfers?: boolean
    requireKYC?: boolean
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    organizer: UserCreateNestedOneWithoutOrganizedEventsInput
    orders?: OrderCreateNestedManyWithoutEventInput
    checkIns?: CheckInCreateNestedManyWithoutEventInput
    analytics?: EventAnalyticsCreateNestedManyWithoutEventInput
    tiers?: TicketTierCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutTicketsInput = {
    id?: string
    title: string
    description?: string | null
    venue: string
    address?: string | null
    city?: string | null
    country?: string | null
    latitude?: number | null
    longitude?: number | null
    eventDate: Date | string
    saleStart: Date | string
    saleEnd: Date | string
    totalSupply: number
    ticketPrice: number
    currency?: string
    maxPerWallet?: number
    contractAddress?: string | null
    chainId?: number
    imageUrl?: string | null
    metadataUri?: string | null
    category?: string
    tags: string
    isPublic?: boolean
    allowTransfers?: boolean
    requireKYC?: boolean
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    organizerId: string
    orders?: OrderUncheckedCreateNestedManyWithoutEventInput
    checkIns?: CheckInUncheckedCreateNestedManyWithoutEventInput
    analytics?: EventAnalyticsUncheckedCreateNestedManyWithoutEventInput
    tiers?: TicketTierUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutTicketsInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutTicketsInput, EventUncheckedCreateWithoutTicketsInput>
  }

  export type OrderCreateWithoutTicketsInput = {
    id?: string
    totalAmount: number
    quantity: number
    currency: string
    paymentMethod: string
    paymentStatus?: string
    stripePaymentId?: string | null
    coinbaseChargeId?: string | null
    blockchainTxHash?: string | null
    paystackReference?: string | null
    flutterwaveReference?: string | null
    mpesaCheckoutRequestId?: string | null
    paymentTxId?: string | null
    customerEmail: string
    customerName?: string | null
    billingAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutOrdersInput
    event: EventCreateNestedOneWithoutOrdersInput
  }

  export type OrderUncheckedCreateWithoutTicketsInput = {
    id?: string
    totalAmount: number
    quantity: number
    currency: string
    paymentMethod: string
    paymentStatus?: string
    stripePaymentId?: string | null
    coinbaseChargeId?: string | null
    blockchainTxHash?: string | null
    paystackReference?: string | null
    flutterwaveReference?: string | null
    mpesaCheckoutRequestId?: string | null
    paymentTxId?: string | null
    customerEmail: string
    customerName?: string | null
    billingAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    eventId: string
  }

  export type OrderCreateOrConnectWithoutTicketsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutTicketsInput, OrderUncheckedCreateWithoutTicketsInput>
  }

  export type CheckInCreateWithoutTicketInput = {
    id?: string
    checkedInAt?: Date | string
    checkedInBy?: string | null
    location?: string | null
    poaTokenId?: number | null
    poaContractAddr?: string | null
    poaTxHash?: string | null
    event: EventCreateNestedOneWithoutCheckInsInput
    user: UserCreateNestedOneWithoutCheckInsInput
  }

  export type CheckInUncheckedCreateWithoutTicketInput = {
    id?: string
    checkedInAt?: Date | string
    checkedInBy?: string | null
    location?: string | null
    poaTokenId?: number | null
    poaContractAddr?: string | null
    poaTxHash?: string | null
    eventId: string
    userId: string
  }

  export type CheckInCreateOrConnectWithoutTicketInput = {
    where: CheckInWhereUniqueInput
    create: XOR<CheckInCreateWithoutTicketInput, CheckInUncheckedCreateWithoutTicketInput>
  }

  export type EventUpsertWithoutTicketsInput = {
    update: XOR<EventUpdateWithoutTicketsInput, EventUncheckedUpdateWithoutTicketsInput>
    create: XOR<EventCreateWithoutTicketsInput, EventUncheckedCreateWithoutTicketsInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutTicketsInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutTicketsInput, EventUncheckedUpdateWithoutTicketsInput>
  }

  export type EventUpdateWithoutTicketsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    venue?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    saleStart?: DateTimeFieldUpdateOperationsInput | Date | string
    saleEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    totalSupply?: IntFieldUpdateOperationsInput | number
    ticketPrice?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    maxPerWallet?: IntFieldUpdateOperationsInput | number
    contractAddress?: NullableStringFieldUpdateOperationsInput | string | null
    chainId?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    metadataUri?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    tags?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    allowTransfers?: BoolFieldUpdateOperationsInput | boolean
    requireKYC?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizer?: UserUpdateOneRequiredWithoutOrganizedEventsNestedInput
    orders?: OrderUpdateManyWithoutEventNestedInput
    checkIns?: CheckInUpdateManyWithoutEventNestedInput
    analytics?: EventAnalyticsUpdateManyWithoutEventNestedInput
    tiers?: TicketTierUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutTicketsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    venue?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    saleStart?: DateTimeFieldUpdateOperationsInput | Date | string
    saleEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    totalSupply?: IntFieldUpdateOperationsInput | number
    ticketPrice?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    maxPerWallet?: IntFieldUpdateOperationsInput | number
    contractAddress?: NullableStringFieldUpdateOperationsInput | string | null
    chainId?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    metadataUri?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    tags?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    allowTransfers?: BoolFieldUpdateOperationsInput | boolean
    requireKYC?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizerId?: StringFieldUpdateOperationsInput | string
    orders?: OrderUncheckedUpdateManyWithoutEventNestedInput
    checkIns?: CheckInUncheckedUpdateManyWithoutEventNestedInput
    analytics?: EventAnalyticsUncheckedUpdateManyWithoutEventNestedInput
    tiers?: TicketTierUncheckedUpdateManyWithoutEventNestedInput
  }

  export type OrderUpsertWithoutTicketsInput = {
    update: XOR<OrderUpdateWithoutTicketsInput, OrderUncheckedUpdateWithoutTicketsInput>
    create: XOR<OrderCreateWithoutTicketsInput, OrderUncheckedCreateWithoutTicketsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutTicketsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutTicketsInput, OrderUncheckedUpdateWithoutTicketsInput>
  }

  export type OrderUpdateWithoutTicketsInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    stripePaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    coinbaseChargeId?: NullableStringFieldUpdateOperationsInput | string | null
    blockchainTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    paystackReference?: NullableStringFieldUpdateOperationsInput | string | null
    flutterwaveReference?: NullableStringFieldUpdateOperationsInput | string | null
    mpesaCheckoutRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentTxId?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    billingAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOrdersNestedInput
    event?: EventUpdateOneRequiredWithoutOrdersNestedInput
  }

  export type OrderUncheckedUpdateWithoutTicketsInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    stripePaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    coinbaseChargeId?: NullableStringFieldUpdateOperationsInput | string | null
    blockchainTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    paystackReference?: NullableStringFieldUpdateOperationsInput | string | null
    flutterwaveReference?: NullableStringFieldUpdateOperationsInput | string | null
    mpesaCheckoutRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentTxId?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    billingAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
  }

  export type CheckInUpsertWithoutTicketInput = {
    update: XOR<CheckInUpdateWithoutTicketInput, CheckInUncheckedUpdateWithoutTicketInput>
    create: XOR<CheckInCreateWithoutTicketInput, CheckInUncheckedCreateWithoutTicketInput>
    where?: CheckInWhereInput
  }

  export type CheckInUpdateToOneWithWhereWithoutTicketInput = {
    where?: CheckInWhereInput
    data: XOR<CheckInUpdateWithoutTicketInput, CheckInUncheckedUpdateWithoutTicketInput>
  }

  export type CheckInUpdateWithoutTicketInput = {
    id?: StringFieldUpdateOperationsInput | string
    checkedInAt?: DateTimeFieldUpdateOperationsInput | Date | string
    checkedInBy?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    poaTokenId?: NullableIntFieldUpdateOperationsInput | number | null
    poaContractAddr?: NullableStringFieldUpdateOperationsInput | string | null
    poaTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    event?: EventUpdateOneRequiredWithoutCheckInsNestedInput
    user?: UserUpdateOneRequiredWithoutCheckInsNestedInput
  }

  export type CheckInUncheckedUpdateWithoutTicketInput = {
    id?: StringFieldUpdateOperationsInput | string
    checkedInAt?: DateTimeFieldUpdateOperationsInput | Date | string
    checkedInBy?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    poaTokenId?: NullableIntFieldUpdateOperationsInput | number | null
    poaContractAddr?: NullableStringFieldUpdateOperationsInput | string | null
    poaTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    eventId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateWithoutOrdersInput = {
    id?: string
    email: string
    password?: string | null
    name?: string | null
    walletAddress?: string | null
    googleId?: string | null
    twitterId?: string | null
    avatar?: string | null
    role?: string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organizedEvents?: EventCreateNestedManyWithoutOrganizerInput
    checkIns?: CheckInCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOrdersInput = {
    id?: string
    email: string
    password?: string | null
    name?: string | null
    walletAddress?: string | null
    googleId?: string | null
    twitterId?: string | null
    avatar?: string | null
    role?: string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organizedEvents?: EventUncheckedCreateNestedManyWithoutOrganizerInput
    checkIns?: CheckInUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOrdersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
  }

  export type EventCreateWithoutOrdersInput = {
    id?: string
    title: string
    description?: string | null
    venue: string
    address?: string | null
    city?: string | null
    country?: string | null
    latitude?: number | null
    longitude?: number | null
    eventDate: Date | string
    saleStart: Date | string
    saleEnd: Date | string
    totalSupply: number
    ticketPrice: number
    currency?: string
    maxPerWallet?: number
    contractAddress?: string | null
    chainId?: number
    imageUrl?: string | null
    metadataUri?: string | null
    category?: string
    tags: string
    isPublic?: boolean
    allowTransfers?: boolean
    requireKYC?: boolean
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    organizer: UserCreateNestedOneWithoutOrganizedEventsInput
    tickets?: TicketCreateNestedManyWithoutEventInput
    checkIns?: CheckInCreateNestedManyWithoutEventInput
    analytics?: EventAnalyticsCreateNestedManyWithoutEventInput
    tiers?: TicketTierCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutOrdersInput = {
    id?: string
    title: string
    description?: string | null
    venue: string
    address?: string | null
    city?: string | null
    country?: string | null
    latitude?: number | null
    longitude?: number | null
    eventDate: Date | string
    saleStart: Date | string
    saleEnd: Date | string
    totalSupply: number
    ticketPrice: number
    currency?: string
    maxPerWallet?: number
    contractAddress?: string | null
    chainId?: number
    imageUrl?: string | null
    metadataUri?: string | null
    category?: string
    tags: string
    isPublic?: boolean
    allowTransfers?: boolean
    requireKYC?: boolean
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    organizerId: string
    tickets?: TicketUncheckedCreateNestedManyWithoutEventInput
    checkIns?: CheckInUncheckedCreateNestedManyWithoutEventInput
    analytics?: EventAnalyticsUncheckedCreateNestedManyWithoutEventInput
    tiers?: TicketTierUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutOrdersInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutOrdersInput, EventUncheckedCreateWithoutOrdersInput>
  }

  export type TicketCreateWithoutOrderInput = {
    id?: string
    tokenId: number
    contractAddress: string
    chainId: number
    txHash?: string | null
    blockNumber?: number | null
    metadataUri?: string | null
    seatNumber?: string | null
    section?: string | null
    tier?: string | null
    isUsed?: boolean
    usedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    event: EventCreateNestedOneWithoutTicketsInput
    checkIn?: CheckInCreateNestedOneWithoutTicketInput
  }

  export type TicketUncheckedCreateWithoutOrderInput = {
    id?: string
    tokenId: number
    contractAddress: string
    chainId: number
    txHash?: string | null
    blockNumber?: number | null
    metadataUri?: string | null
    seatNumber?: string | null
    section?: string | null
    tier?: string | null
    isUsed?: boolean
    usedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    eventId: string
    checkIn?: CheckInUncheckedCreateNestedOneWithoutTicketInput
  }

  export type TicketCreateOrConnectWithoutOrderInput = {
    where: TicketWhereUniqueInput
    create: XOR<TicketCreateWithoutOrderInput, TicketUncheckedCreateWithoutOrderInput>
  }

  export type UserUpsertWithoutOrdersInput = {
    update: XOR<UserUpdateWithoutOrdersInput, UserUncheckedUpdateWithoutOrdersInput>
    create: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOrdersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOrdersInput, UserUncheckedUpdateWithoutOrdersInput>
  }

  export type UserUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    twitterId?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizedEvents?: EventUpdateManyWithoutOrganizerNestedInput
    checkIns?: CheckInUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    twitterId?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizedEvents?: EventUncheckedUpdateManyWithoutOrganizerNestedInput
    checkIns?: CheckInUncheckedUpdateManyWithoutUserNestedInput
  }

  export type EventUpsertWithoutOrdersInput = {
    update: XOR<EventUpdateWithoutOrdersInput, EventUncheckedUpdateWithoutOrdersInput>
    create: XOR<EventCreateWithoutOrdersInput, EventUncheckedCreateWithoutOrdersInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutOrdersInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutOrdersInput, EventUncheckedUpdateWithoutOrdersInput>
  }

  export type EventUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    venue?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    saleStart?: DateTimeFieldUpdateOperationsInput | Date | string
    saleEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    totalSupply?: IntFieldUpdateOperationsInput | number
    ticketPrice?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    maxPerWallet?: IntFieldUpdateOperationsInput | number
    contractAddress?: NullableStringFieldUpdateOperationsInput | string | null
    chainId?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    metadataUri?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    tags?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    allowTransfers?: BoolFieldUpdateOperationsInput | boolean
    requireKYC?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizer?: UserUpdateOneRequiredWithoutOrganizedEventsNestedInput
    tickets?: TicketUpdateManyWithoutEventNestedInput
    checkIns?: CheckInUpdateManyWithoutEventNestedInput
    analytics?: EventAnalyticsUpdateManyWithoutEventNestedInput
    tiers?: TicketTierUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    venue?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    saleStart?: DateTimeFieldUpdateOperationsInput | Date | string
    saleEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    totalSupply?: IntFieldUpdateOperationsInput | number
    ticketPrice?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    maxPerWallet?: IntFieldUpdateOperationsInput | number
    contractAddress?: NullableStringFieldUpdateOperationsInput | string | null
    chainId?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    metadataUri?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    tags?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    allowTransfers?: BoolFieldUpdateOperationsInput | boolean
    requireKYC?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizerId?: StringFieldUpdateOperationsInput | string
    tickets?: TicketUncheckedUpdateManyWithoutEventNestedInput
    checkIns?: CheckInUncheckedUpdateManyWithoutEventNestedInput
    analytics?: EventAnalyticsUncheckedUpdateManyWithoutEventNestedInput
    tiers?: TicketTierUncheckedUpdateManyWithoutEventNestedInput
  }

  export type TicketUpsertWithWhereUniqueWithoutOrderInput = {
    where: TicketWhereUniqueInput
    update: XOR<TicketUpdateWithoutOrderInput, TicketUncheckedUpdateWithoutOrderInput>
    create: XOR<TicketCreateWithoutOrderInput, TicketUncheckedCreateWithoutOrderInput>
  }

  export type TicketUpdateWithWhereUniqueWithoutOrderInput = {
    where: TicketWhereUniqueInput
    data: XOR<TicketUpdateWithoutOrderInput, TicketUncheckedUpdateWithoutOrderInput>
  }

  export type TicketUpdateManyWithWhereWithoutOrderInput = {
    where: TicketScalarWhereInput
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyWithoutOrderInput>
  }

  export type TicketCreateWithoutCheckInInput = {
    id?: string
    tokenId: number
    contractAddress: string
    chainId: number
    txHash?: string | null
    blockNumber?: number | null
    metadataUri?: string | null
    seatNumber?: string | null
    section?: string | null
    tier?: string | null
    isUsed?: boolean
    usedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    event: EventCreateNestedOneWithoutTicketsInput
    order: OrderCreateNestedOneWithoutTicketsInput
  }

  export type TicketUncheckedCreateWithoutCheckInInput = {
    id?: string
    tokenId: number
    contractAddress: string
    chainId: number
    txHash?: string | null
    blockNumber?: number | null
    metadataUri?: string | null
    seatNumber?: string | null
    section?: string | null
    tier?: string | null
    isUsed?: boolean
    usedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    eventId: string
    orderId: string
  }

  export type TicketCreateOrConnectWithoutCheckInInput = {
    where: TicketWhereUniqueInput
    create: XOR<TicketCreateWithoutCheckInInput, TicketUncheckedCreateWithoutCheckInInput>
  }

  export type EventCreateWithoutCheckInsInput = {
    id?: string
    title: string
    description?: string | null
    venue: string
    address?: string | null
    city?: string | null
    country?: string | null
    latitude?: number | null
    longitude?: number | null
    eventDate: Date | string
    saleStart: Date | string
    saleEnd: Date | string
    totalSupply: number
    ticketPrice: number
    currency?: string
    maxPerWallet?: number
    contractAddress?: string | null
    chainId?: number
    imageUrl?: string | null
    metadataUri?: string | null
    category?: string
    tags: string
    isPublic?: boolean
    allowTransfers?: boolean
    requireKYC?: boolean
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    organizer: UserCreateNestedOneWithoutOrganizedEventsInput
    orders?: OrderCreateNestedManyWithoutEventInput
    tickets?: TicketCreateNestedManyWithoutEventInput
    analytics?: EventAnalyticsCreateNestedManyWithoutEventInput
    tiers?: TicketTierCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutCheckInsInput = {
    id?: string
    title: string
    description?: string | null
    venue: string
    address?: string | null
    city?: string | null
    country?: string | null
    latitude?: number | null
    longitude?: number | null
    eventDate: Date | string
    saleStart: Date | string
    saleEnd: Date | string
    totalSupply: number
    ticketPrice: number
    currency?: string
    maxPerWallet?: number
    contractAddress?: string | null
    chainId?: number
    imageUrl?: string | null
    metadataUri?: string | null
    category?: string
    tags: string
    isPublic?: boolean
    allowTransfers?: boolean
    requireKYC?: boolean
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    organizerId: string
    orders?: OrderUncheckedCreateNestedManyWithoutEventInput
    tickets?: TicketUncheckedCreateNestedManyWithoutEventInput
    analytics?: EventAnalyticsUncheckedCreateNestedManyWithoutEventInput
    tiers?: TicketTierUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutCheckInsInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutCheckInsInput, EventUncheckedCreateWithoutCheckInsInput>
  }

  export type UserCreateWithoutCheckInsInput = {
    id?: string
    email: string
    password?: string | null
    name?: string | null
    walletAddress?: string | null
    googleId?: string | null
    twitterId?: string | null
    avatar?: string | null
    role?: string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organizedEvents?: EventCreateNestedManyWithoutOrganizerInput
    orders?: OrderCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCheckInsInput = {
    id?: string
    email: string
    password?: string | null
    name?: string | null
    walletAddress?: string | null
    googleId?: string | null
    twitterId?: string | null
    avatar?: string | null
    role?: string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organizedEvents?: EventUncheckedCreateNestedManyWithoutOrganizerInput
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCheckInsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCheckInsInput, UserUncheckedCreateWithoutCheckInsInput>
  }

  export type TicketUpsertWithoutCheckInInput = {
    update: XOR<TicketUpdateWithoutCheckInInput, TicketUncheckedUpdateWithoutCheckInInput>
    create: XOR<TicketCreateWithoutCheckInInput, TicketUncheckedCreateWithoutCheckInInput>
    where?: TicketWhereInput
  }

  export type TicketUpdateToOneWithWhereWithoutCheckInInput = {
    where?: TicketWhereInput
    data: XOR<TicketUpdateWithoutCheckInInput, TicketUncheckedUpdateWithoutCheckInInput>
  }

  export type TicketUpdateWithoutCheckInInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenId?: IntFieldUpdateOperationsInput | number
    contractAddress?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableIntFieldUpdateOperationsInput | number | null
    metadataUri?: NullableStringFieldUpdateOperationsInput | string | null
    seatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    section?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: NullableStringFieldUpdateOperationsInput | string | null
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUpdateOneRequiredWithoutTicketsNestedInput
    order?: OrderUpdateOneRequiredWithoutTicketsNestedInput
  }

  export type TicketUncheckedUpdateWithoutCheckInInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenId?: IntFieldUpdateOperationsInput | number
    contractAddress?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableIntFieldUpdateOperationsInput | number | null
    metadataUri?: NullableStringFieldUpdateOperationsInput | string | null
    seatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    section?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: NullableStringFieldUpdateOperationsInput | string | null
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventId?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
  }

  export type EventUpsertWithoutCheckInsInput = {
    update: XOR<EventUpdateWithoutCheckInsInput, EventUncheckedUpdateWithoutCheckInsInput>
    create: XOR<EventCreateWithoutCheckInsInput, EventUncheckedCreateWithoutCheckInsInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutCheckInsInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutCheckInsInput, EventUncheckedUpdateWithoutCheckInsInput>
  }

  export type EventUpdateWithoutCheckInsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    venue?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    saleStart?: DateTimeFieldUpdateOperationsInput | Date | string
    saleEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    totalSupply?: IntFieldUpdateOperationsInput | number
    ticketPrice?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    maxPerWallet?: IntFieldUpdateOperationsInput | number
    contractAddress?: NullableStringFieldUpdateOperationsInput | string | null
    chainId?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    metadataUri?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    tags?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    allowTransfers?: BoolFieldUpdateOperationsInput | boolean
    requireKYC?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizer?: UserUpdateOneRequiredWithoutOrganizedEventsNestedInput
    orders?: OrderUpdateManyWithoutEventNestedInput
    tickets?: TicketUpdateManyWithoutEventNestedInput
    analytics?: EventAnalyticsUpdateManyWithoutEventNestedInput
    tiers?: TicketTierUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutCheckInsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    venue?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    saleStart?: DateTimeFieldUpdateOperationsInput | Date | string
    saleEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    totalSupply?: IntFieldUpdateOperationsInput | number
    ticketPrice?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    maxPerWallet?: IntFieldUpdateOperationsInput | number
    contractAddress?: NullableStringFieldUpdateOperationsInput | string | null
    chainId?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    metadataUri?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    tags?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    allowTransfers?: BoolFieldUpdateOperationsInput | boolean
    requireKYC?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizerId?: StringFieldUpdateOperationsInput | string
    orders?: OrderUncheckedUpdateManyWithoutEventNestedInput
    tickets?: TicketUncheckedUpdateManyWithoutEventNestedInput
    analytics?: EventAnalyticsUncheckedUpdateManyWithoutEventNestedInput
    tiers?: TicketTierUncheckedUpdateManyWithoutEventNestedInput
  }

  export type UserUpsertWithoutCheckInsInput = {
    update: XOR<UserUpdateWithoutCheckInsInput, UserUncheckedUpdateWithoutCheckInsInput>
    create: XOR<UserCreateWithoutCheckInsInput, UserUncheckedCreateWithoutCheckInsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCheckInsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCheckInsInput, UserUncheckedUpdateWithoutCheckInsInput>
  }

  export type UserUpdateWithoutCheckInsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    twitterId?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizedEvents?: EventUpdateManyWithoutOrganizerNestedInput
    orders?: OrderUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCheckInsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    twitterId?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizedEvents?: EventUncheckedUpdateManyWithoutOrganizerNestedInput
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
  }

  export type EventCreateWithoutAnalyticsInput = {
    id?: string
    title: string
    description?: string | null
    venue: string
    address?: string | null
    city?: string | null
    country?: string | null
    latitude?: number | null
    longitude?: number | null
    eventDate: Date | string
    saleStart: Date | string
    saleEnd: Date | string
    totalSupply: number
    ticketPrice: number
    currency?: string
    maxPerWallet?: number
    contractAddress?: string | null
    chainId?: number
    imageUrl?: string | null
    metadataUri?: string | null
    category?: string
    tags: string
    isPublic?: boolean
    allowTransfers?: boolean
    requireKYC?: boolean
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    organizer: UserCreateNestedOneWithoutOrganizedEventsInput
    orders?: OrderCreateNestedManyWithoutEventInput
    tickets?: TicketCreateNestedManyWithoutEventInput
    checkIns?: CheckInCreateNestedManyWithoutEventInput
    tiers?: TicketTierCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutAnalyticsInput = {
    id?: string
    title: string
    description?: string | null
    venue: string
    address?: string | null
    city?: string | null
    country?: string | null
    latitude?: number | null
    longitude?: number | null
    eventDate: Date | string
    saleStart: Date | string
    saleEnd: Date | string
    totalSupply: number
    ticketPrice: number
    currency?: string
    maxPerWallet?: number
    contractAddress?: string | null
    chainId?: number
    imageUrl?: string | null
    metadataUri?: string | null
    category?: string
    tags: string
    isPublic?: boolean
    allowTransfers?: boolean
    requireKYC?: boolean
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    organizerId: string
    orders?: OrderUncheckedCreateNestedManyWithoutEventInput
    tickets?: TicketUncheckedCreateNestedManyWithoutEventInput
    checkIns?: CheckInUncheckedCreateNestedManyWithoutEventInput
    tiers?: TicketTierUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutAnalyticsInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutAnalyticsInput, EventUncheckedCreateWithoutAnalyticsInput>
  }

  export type EventUpsertWithoutAnalyticsInput = {
    update: XOR<EventUpdateWithoutAnalyticsInput, EventUncheckedUpdateWithoutAnalyticsInput>
    create: XOR<EventCreateWithoutAnalyticsInput, EventUncheckedCreateWithoutAnalyticsInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutAnalyticsInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutAnalyticsInput, EventUncheckedUpdateWithoutAnalyticsInput>
  }

  export type EventUpdateWithoutAnalyticsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    venue?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    saleStart?: DateTimeFieldUpdateOperationsInput | Date | string
    saleEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    totalSupply?: IntFieldUpdateOperationsInput | number
    ticketPrice?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    maxPerWallet?: IntFieldUpdateOperationsInput | number
    contractAddress?: NullableStringFieldUpdateOperationsInput | string | null
    chainId?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    metadataUri?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    tags?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    allowTransfers?: BoolFieldUpdateOperationsInput | boolean
    requireKYC?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizer?: UserUpdateOneRequiredWithoutOrganizedEventsNestedInput
    orders?: OrderUpdateManyWithoutEventNestedInput
    tickets?: TicketUpdateManyWithoutEventNestedInput
    checkIns?: CheckInUpdateManyWithoutEventNestedInput
    tiers?: TicketTierUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutAnalyticsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    venue?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    saleStart?: DateTimeFieldUpdateOperationsInput | Date | string
    saleEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    totalSupply?: IntFieldUpdateOperationsInput | number
    ticketPrice?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    maxPerWallet?: IntFieldUpdateOperationsInput | number
    contractAddress?: NullableStringFieldUpdateOperationsInput | string | null
    chainId?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    metadataUri?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    tags?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    allowTransfers?: BoolFieldUpdateOperationsInput | boolean
    requireKYC?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizerId?: StringFieldUpdateOperationsInput | string
    orders?: OrderUncheckedUpdateManyWithoutEventNestedInput
    tickets?: TicketUncheckedUpdateManyWithoutEventNestedInput
    checkIns?: CheckInUncheckedUpdateManyWithoutEventNestedInput
    tiers?: TicketTierUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventCreateWithoutTiersInput = {
    id?: string
    title: string
    description?: string | null
    venue: string
    address?: string | null
    city?: string | null
    country?: string | null
    latitude?: number | null
    longitude?: number | null
    eventDate: Date | string
    saleStart: Date | string
    saleEnd: Date | string
    totalSupply: number
    ticketPrice: number
    currency?: string
    maxPerWallet?: number
    contractAddress?: string | null
    chainId?: number
    imageUrl?: string | null
    metadataUri?: string | null
    category?: string
    tags: string
    isPublic?: boolean
    allowTransfers?: boolean
    requireKYC?: boolean
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    organizer: UserCreateNestedOneWithoutOrganizedEventsInput
    orders?: OrderCreateNestedManyWithoutEventInput
    tickets?: TicketCreateNestedManyWithoutEventInput
    checkIns?: CheckInCreateNestedManyWithoutEventInput
    analytics?: EventAnalyticsCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutTiersInput = {
    id?: string
    title: string
    description?: string | null
    venue: string
    address?: string | null
    city?: string | null
    country?: string | null
    latitude?: number | null
    longitude?: number | null
    eventDate: Date | string
    saleStart: Date | string
    saleEnd: Date | string
    totalSupply: number
    ticketPrice: number
    currency?: string
    maxPerWallet?: number
    contractAddress?: string | null
    chainId?: number
    imageUrl?: string | null
    metadataUri?: string | null
    category?: string
    tags: string
    isPublic?: boolean
    allowTransfers?: boolean
    requireKYC?: boolean
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    organizerId: string
    orders?: OrderUncheckedCreateNestedManyWithoutEventInput
    tickets?: TicketUncheckedCreateNestedManyWithoutEventInput
    checkIns?: CheckInUncheckedCreateNestedManyWithoutEventInput
    analytics?: EventAnalyticsUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutTiersInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutTiersInput, EventUncheckedCreateWithoutTiersInput>
  }

  export type EventUpsertWithoutTiersInput = {
    update: XOR<EventUpdateWithoutTiersInput, EventUncheckedUpdateWithoutTiersInput>
    create: XOR<EventCreateWithoutTiersInput, EventUncheckedCreateWithoutTiersInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutTiersInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutTiersInput, EventUncheckedUpdateWithoutTiersInput>
  }

  export type EventUpdateWithoutTiersInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    venue?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    saleStart?: DateTimeFieldUpdateOperationsInput | Date | string
    saleEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    totalSupply?: IntFieldUpdateOperationsInput | number
    ticketPrice?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    maxPerWallet?: IntFieldUpdateOperationsInput | number
    contractAddress?: NullableStringFieldUpdateOperationsInput | string | null
    chainId?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    metadataUri?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    tags?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    allowTransfers?: BoolFieldUpdateOperationsInput | boolean
    requireKYC?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizer?: UserUpdateOneRequiredWithoutOrganizedEventsNestedInput
    orders?: OrderUpdateManyWithoutEventNestedInput
    tickets?: TicketUpdateManyWithoutEventNestedInput
    checkIns?: CheckInUpdateManyWithoutEventNestedInput
    analytics?: EventAnalyticsUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutTiersInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    venue?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    saleStart?: DateTimeFieldUpdateOperationsInput | Date | string
    saleEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    totalSupply?: IntFieldUpdateOperationsInput | number
    ticketPrice?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    maxPerWallet?: IntFieldUpdateOperationsInput | number
    contractAddress?: NullableStringFieldUpdateOperationsInput | string | null
    chainId?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    metadataUri?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    tags?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    allowTransfers?: BoolFieldUpdateOperationsInput | boolean
    requireKYC?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizerId?: StringFieldUpdateOperationsInput | string
    orders?: OrderUncheckedUpdateManyWithoutEventNestedInput
    tickets?: TicketUncheckedUpdateManyWithoutEventNestedInput
    checkIns?: CheckInUncheckedUpdateManyWithoutEventNestedInput
    analytics?: EventAnalyticsUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventUpdateWithoutOrganizerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    venue?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    saleStart?: DateTimeFieldUpdateOperationsInput | Date | string
    saleEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    totalSupply?: IntFieldUpdateOperationsInput | number
    ticketPrice?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    maxPerWallet?: IntFieldUpdateOperationsInput | number
    contractAddress?: NullableStringFieldUpdateOperationsInput | string | null
    chainId?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    metadataUri?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    tags?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    allowTransfers?: BoolFieldUpdateOperationsInput | boolean
    requireKYC?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutEventNestedInput
    tickets?: TicketUpdateManyWithoutEventNestedInput
    checkIns?: CheckInUpdateManyWithoutEventNestedInput
    analytics?: EventAnalyticsUpdateManyWithoutEventNestedInput
    tiers?: TicketTierUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutOrganizerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    venue?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    saleStart?: DateTimeFieldUpdateOperationsInput | Date | string
    saleEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    totalSupply?: IntFieldUpdateOperationsInput | number
    ticketPrice?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    maxPerWallet?: IntFieldUpdateOperationsInput | number
    contractAddress?: NullableStringFieldUpdateOperationsInput | string | null
    chainId?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    metadataUri?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    tags?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    allowTransfers?: BoolFieldUpdateOperationsInput | boolean
    requireKYC?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutEventNestedInput
    tickets?: TicketUncheckedUpdateManyWithoutEventNestedInput
    checkIns?: CheckInUncheckedUpdateManyWithoutEventNestedInput
    analytics?: EventAnalyticsUncheckedUpdateManyWithoutEventNestedInput
    tiers?: TicketTierUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateManyWithoutOrganizerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    venue?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    eventDate?: DateTimeFieldUpdateOperationsInput | Date | string
    saleStart?: DateTimeFieldUpdateOperationsInput | Date | string
    saleEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    totalSupply?: IntFieldUpdateOperationsInput | number
    ticketPrice?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    maxPerWallet?: IntFieldUpdateOperationsInput | number
    contractAddress?: NullableStringFieldUpdateOperationsInput | string | null
    chainId?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    metadataUri?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    tags?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    allowTransfers?: BoolFieldUpdateOperationsInput | boolean
    requireKYC?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    stripePaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    coinbaseChargeId?: NullableStringFieldUpdateOperationsInput | string | null
    blockchainTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    paystackReference?: NullableStringFieldUpdateOperationsInput | string | null
    flutterwaveReference?: NullableStringFieldUpdateOperationsInput | string | null
    mpesaCheckoutRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentTxId?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    billingAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUpdateOneRequiredWithoutOrdersNestedInput
    tickets?: TicketUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    stripePaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    coinbaseChargeId?: NullableStringFieldUpdateOperationsInput | string | null
    blockchainTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    paystackReference?: NullableStringFieldUpdateOperationsInput | string | null
    flutterwaveReference?: NullableStringFieldUpdateOperationsInput | string | null
    mpesaCheckoutRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentTxId?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    billingAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventId?: StringFieldUpdateOperationsInput | string
    tickets?: TicketUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    stripePaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    coinbaseChargeId?: NullableStringFieldUpdateOperationsInput | string | null
    blockchainTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    paystackReference?: NullableStringFieldUpdateOperationsInput | string | null
    flutterwaveReference?: NullableStringFieldUpdateOperationsInput | string | null
    mpesaCheckoutRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentTxId?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    billingAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventId?: StringFieldUpdateOperationsInput | string
  }

  export type CheckInUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    checkedInAt?: DateTimeFieldUpdateOperationsInput | Date | string
    checkedInBy?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    poaTokenId?: NullableIntFieldUpdateOperationsInput | number | null
    poaContractAddr?: NullableStringFieldUpdateOperationsInput | string | null
    poaTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    ticket?: TicketUpdateOneRequiredWithoutCheckInNestedInput
    event?: EventUpdateOneRequiredWithoutCheckInsNestedInput
  }

  export type CheckInUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    checkedInAt?: DateTimeFieldUpdateOperationsInput | Date | string
    checkedInBy?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    poaTokenId?: NullableIntFieldUpdateOperationsInput | number | null
    poaContractAddr?: NullableStringFieldUpdateOperationsInput | string | null
    poaTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    ticketId?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
  }

  export type CheckInUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    checkedInAt?: DateTimeFieldUpdateOperationsInput | Date | string
    checkedInBy?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    poaTokenId?: NullableIntFieldUpdateOperationsInput | number | null
    poaContractAddr?: NullableStringFieldUpdateOperationsInput | string | null
    poaTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    ticketId?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
  }

  export type OrderUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    stripePaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    coinbaseChargeId?: NullableStringFieldUpdateOperationsInput | string | null
    blockchainTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    paystackReference?: NullableStringFieldUpdateOperationsInput | string | null
    flutterwaveReference?: NullableStringFieldUpdateOperationsInput | string | null
    mpesaCheckoutRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentTxId?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    billingAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOrdersNestedInput
    tickets?: TicketUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    stripePaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    coinbaseChargeId?: NullableStringFieldUpdateOperationsInput | string | null
    blockchainTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    paystackReference?: NullableStringFieldUpdateOperationsInput | string | null
    flutterwaveReference?: NullableStringFieldUpdateOperationsInput | string | null
    mpesaCheckoutRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentTxId?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    billingAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    tickets?: TicketUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    stripePaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    coinbaseChargeId?: NullableStringFieldUpdateOperationsInput | string | null
    blockchainTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    paystackReference?: NullableStringFieldUpdateOperationsInput | string | null
    flutterwaveReference?: NullableStringFieldUpdateOperationsInput | string | null
    mpesaCheckoutRequestId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentTxId?: NullableStringFieldUpdateOperationsInput | string | null
    customerEmail?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    billingAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TicketUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenId?: IntFieldUpdateOperationsInput | number
    contractAddress?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableIntFieldUpdateOperationsInput | number | null
    metadataUri?: NullableStringFieldUpdateOperationsInput | string | null
    seatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    section?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: NullableStringFieldUpdateOperationsInput | string | null
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutTicketsNestedInput
    checkIn?: CheckInUpdateOneWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenId?: IntFieldUpdateOperationsInput | number
    contractAddress?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableIntFieldUpdateOperationsInput | number | null
    metadataUri?: NullableStringFieldUpdateOperationsInput | string | null
    seatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    section?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: NullableStringFieldUpdateOperationsInput | string | null
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderId?: StringFieldUpdateOperationsInput | string
    checkIn?: CheckInUncheckedUpdateOneWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateManyWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenId?: IntFieldUpdateOperationsInput | number
    contractAddress?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableIntFieldUpdateOperationsInput | number | null
    metadataUri?: NullableStringFieldUpdateOperationsInput | string | null
    seatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    section?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: NullableStringFieldUpdateOperationsInput | string | null
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderId?: StringFieldUpdateOperationsInput | string
  }

  export type CheckInUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    checkedInAt?: DateTimeFieldUpdateOperationsInput | Date | string
    checkedInBy?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    poaTokenId?: NullableIntFieldUpdateOperationsInput | number | null
    poaContractAddr?: NullableStringFieldUpdateOperationsInput | string | null
    poaTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    ticket?: TicketUpdateOneRequiredWithoutCheckInNestedInput
    user?: UserUpdateOneRequiredWithoutCheckInsNestedInput
  }

  export type CheckInUncheckedUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    checkedInAt?: DateTimeFieldUpdateOperationsInput | Date | string
    checkedInBy?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    poaTokenId?: NullableIntFieldUpdateOperationsInput | number | null
    poaContractAddr?: NullableStringFieldUpdateOperationsInput | string | null
    poaTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    ticketId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type CheckInUncheckedUpdateManyWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    checkedInAt?: DateTimeFieldUpdateOperationsInput | Date | string
    checkedInBy?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    poaTokenId?: NullableIntFieldUpdateOperationsInput | number | null
    poaContractAddr?: NullableStringFieldUpdateOperationsInput | string | null
    poaTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    ticketId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type EventAnalyticsUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    ticketsSold?: IntFieldUpdateOperationsInput | number
    revenue?: FloatFieldUpdateOperationsInput | number
    uniqueBuyers?: IntFieldUpdateOperationsInput | number
    checkIns?: IntFieldUpdateOperationsInput | number
    checkInRate?: FloatFieldUpdateOperationsInput | number
    noShows?: IntFieldUpdateOperationsInput | number
    topCountries?: NullableStringFieldUpdateOperationsInput | string | null
    topCities?: NullableStringFieldUpdateOperationsInput | string | null
    hourlyBreakdown?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EventAnalyticsUncheckedUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    ticketsSold?: IntFieldUpdateOperationsInput | number
    revenue?: FloatFieldUpdateOperationsInput | number
    uniqueBuyers?: IntFieldUpdateOperationsInput | number
    checkIns?: IntFieldUpdateOperationsInput | number
    checkInRate?: FloatFieldUpdateOperationsInput | number
    noShows?: IntFieldUpdateOperationsInput | number
    topCountries?: NullableStringFieldUpdateOperationsInput | string | null
    topCities?: NullableStringFieldUpdateOperationsInput | string | null
    hourlyBreakdown?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EventAnalyticsUncheckedUpdateManyWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    ticketsSold?: IntFieldUpdateOperationsInput | number
    revenue?: FloatFieldUpdateOperationsInput | number
    uniqueBuyers?: IntFieldUpdateOperationsInput | number
    checkIns?: IntFieldUpdateOperationsInput | number
    checkInRate?: FloatFieldUpdateOperationsInput | number
    noShows?: IntFieldUpdateOperationsInput | number
    topCountries?: NullableStringFieldUpdateOperationsInput | string | null
    topCities?: NullableStringFieldUpdateOperationsInput | string | null
    hourlyBreakdown?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TicketTierUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    availableQuantity?: IntFieldUpdateOperationsInput | number
    maxPerPerson?: IntFieldUpdateOperationsInput | number
    saleStart?: DateTimeFieldUpdateOperationsInput | Date | string
    saleEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketTierUncheckedUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    availableQuantity?: IntFieldUpdateOperationsInput | number
    maxPerPerson?: IntFieldUpdateOperationsInput | number
    saleStart?: DateTimeFieldUpdateOperationsInput | Date | string
    saleEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketTierUncheckedUpdateManyWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    availableQuantity?: IntFieldUpdateOperationsInput | number
    maxPerPerson?: IntFieldUpdateOperationsInput | number
    saleStart?: DateTimeFieldUpdateOperationsInput | Date | string
    saleEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenId?: IntFieldUpdateOperationsInput | number
    contractAddress?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableIntFieldUpdateOperationsInput | number | null
    metadataUri?: NullableStringFieldUpdateOperationsInput | string | null
    seatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    section?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: NullableStringFieldUpdateOperationsInput | string | null
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUpdateOneRequiredWithoutTicketsNestedInput
    checkIn?: CheckInUpdateOneWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenId?: IntFieldUpdateOperationsInput | number
    contractAddress?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableIntFieldUpdateOperationsInput | number | null
    metadataUri?: NullableStringFieldUpdateOperationsInput | string | null
    seatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    section?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: NullableStringFieldUpdateOperationsInput | string | null
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventId?: StringFieldUpdateOperationsInput | string
    checkIn?: CheckInUncheckedUpdateOneWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenId?: IntFieldUpdateOperationsInput | number
    contractAddress?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableIntFieldUpdateOperationsInput | number | null
    metadataUri?: NullableStringFieldUpdateOperationsInput | string | null
    seatNumber?: NullableStringFieldUpdateOperationsInput | string | null
    section?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: NullableStringFieldUpdateOperationsInput | string | null
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    usedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EventCountOutputTypeDefaultArgs instead
     */
    export type EventCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EventCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use OrderCountOutputTypeDefaultArgs instead
     */
    export type OrderCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = OrderCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EventDefaultArgs instead
     */
    export type EventArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EventDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TicketDefaultArgs instead
     */
    export type TicketArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TicketDefaultArgs<ExtArgs>
    /**
     * @deprecated Use OrderDefaultArgs instead
     */
    export type OrderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = OrderDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CheckInDefaultArgs instead
     */
    export type CheckInArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CheckInDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EventAnalyticsDefaultArgs instead
     */
    export type EventAnalyticsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EventAnalyticsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TicketTierDefaultArgs instead
     */
    export type TicketTierArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TicketTierDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}