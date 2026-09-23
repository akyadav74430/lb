
/**
 * Client
**/

import * as runtime from './runtime/library.js';
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
 * Model Profile
 * 
 */
export type Profile = $Result.DefaultSelection<Prisma.$ProfilePayload>
/**
 * Model ProfilePhoto
 * 
 */
export type ProfilePhoto = $Result.DefaultSelection<Prisma.$ProfilePhotoPayload>
/**
 * Model ProfileRate
 * 
 */
export type ProfileRate = $Result.DefaultSelection<Prisma.$ProfileRatePayload>
/**
 * Model Report
 * 
 */
export type Report = $Result.DefaultSelection<Prisma.$ReportPayload>
/**
 * Model UserBlock
 * 
 */
export type UserBlock = $Result.DefaultSelection<Prisma.$UserBlockPayload>
/**
 * Model ModerationAction
 * 
 */
export type ModerationAction = $Result.DefaultSelection<Prisma.$ModerationActionPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model ContactMessage
 * 
 */
export type ContactMessage = $Result.DefaultSelection<Prisma.$ContactMessagePayload>

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
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.profile`: Exposes CRUD operations for the **Profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): Prisma.ProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.profilePhoto`: Exposes CRUD operations for the **ProfilePhoto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProfilePhotos
    * const profilePhotos = await prisma.profilePhoto.findMany()
    * ```
    */
  get profilePhoto(): Prisma.ProfilePhotoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.profileRate`: Exposes CRUD operations for the **ProfileRate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProfileRates
    * const profileRates = await prisma.profileRate.findMany()
    * ```
    */
  get profileRate(): Prisma.ProfileRateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.report`: Exposes CRUD operations for the **Report** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reports
    * const reports = await prisma.report.findMany()
    * ```
    */
  get report(): Prisma.ReportDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userBlock`: Exposes CRUD operations for the **UserBlock** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserBlocks
    * const userBlocks = await prisma.userBlock.findMany()
    * ```
    */
  get userBlock(): Prisma.UserBlockDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.moderationAction`: Exposes CRUD operations for the **ModerationAction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ModerationActions
    * const moderationActions = await prisma.moderationAction.findMany()
    * ```
    */
  get moderationAction(): Prisma.ModerationActionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.contactMessage`: Exposes CRUD operations for the **ContactMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ContactMessages
    * const contactMessages = await prisma.contactMessage.findMany()
    * ```
    */
  get contactMessage(): Prisma.ContactMessageDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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

  type SelectAndOmit = {
    select: any
    omit: any
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
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
    Profile: 'Profile',
    ProfilePhoto: 'ProfilePhoto',
    ProfileRate: 'ProfileRate',
    Report: 'Report',
    UserBlock: 'UserBlock',
    ModerationAction: 'ModerationAction',
    AuditLog: 'AuditLog',
    ContactMessage: 'ContactMessage'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "profile" | "profilePhoto" | "profileRate" | "report" | "userBlock" | "moderationAction" | "auditLog" | "contactMessage"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Profile: {
        payload: Prisma.$ProfilePayload<ExtArgs>
        fields: Prisma.ProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findFirst: {
            args: Prisma.ProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findMany: {
            args: Prisma.ProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          create: {
            args: Prisma.ProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          createMany: {
            args: Prisma.ProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          update: {
            args: Prisma.ProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          deleteMany: {
            args: Prisma.ProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          aggregate: {
            args: Prisma.ProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfile>
          }
          groupBy: {
            args: Prisma.ProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfileCountArgs<ExtArgs>
            result: $Utils.Optional<ProfileCountAggregateOutputType> | number
          }
        }
      }
      ProfilePhoto: {
        payload: Prisma.$ProfilePhotoPayload<ExtArgs>
        fields: Prisma.ProfilePhotoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfilePhotoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePhotoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfilePhotoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePhotoPayload>
          }
          findFirst: {
            args: Prisma.ProfilePhotoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePhotoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfilePhotoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePhotoPayload>
          }
          findMany: {
            args: Prisma.ProfilePhotoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePhotoPayload>[]
          }
          create: {
            args: Prisma.ProfilePhotoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePhotoPayload>
          }
          createMany: {
            args: Prisma.ProfilePhotoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProfilePhotoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePhotoPayload>
          }
          update: {
            args: Prisma.ProfilePhotoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePhotoPayload>
          }
          deleteMany: {
            args: Prisma.ProfilePhotoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfilePhotoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProfilePhotoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePhotoPayload>
          }
          aggregate: {
            args: Prisma.ProfilePhotoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfilePhoto>
          }
          groupBy: {
            args: Prisma.ProfilePhotoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfilePhotoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfilePhotoCountArgs<ExtArgs>
            result: $Utils.Optional<ProfilePhotoCountAggregateOutputType> | number
          }
        }
      }
      ProfileRate: {
        payload: Prisma.$ProfileRatePayload<ExtArgs>
        fields: Prisma.ProfileRateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfileRateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileRatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfileRateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileRatePayload>
          }
          findFirst: {
            args: Prisma.ProfileRateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileRatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfileRateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileRatePayload>
          }
          findMany: {
            args: Prisma.ProfileRateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileRatePayload>[]
          }
          create: {
            args: Prisma.ProfileRateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileRatePayload>
          }
          createMany: {
            args: Prisma.ProfileRateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProfileRateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileRatePayload>
          }
          update: {
            args: Prisma.ProfileRateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileRatePayload>
          }
          deleteMany: {
            args: Prisma.ProfileRateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfileRateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProfileRateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileRatePayload>
          }
          aggregate: {
            args: Prisma.ProfileRateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfileRate>
          }
          groupBy: {
            args: Prisma.ProfileRateGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfileRateGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfileRateCountArgs<ExtArgs>
            result: $Utils.Optional<ProfileRateCountAggregateOutputType> | number
          }
        }
      }
      Report: {
        payload: Prisma.$ReportPayload<ExtArgs>
        fields: Prisma.ReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          findFirst: {
            args: Prisma.ReportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          findMany: {
            args: Prisma.ReportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          create: {
            args: Prisma.ReportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          createMany: {
            args: Prisma.ReportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ReportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          update: {
            args: Prisma.ReportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          deleteMany: {
            args: Prisma.ReportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ReportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          aggregate: {
            args: Prisma.ReportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReport>
          }
          groupBy: {
            args: Prisma.ReportGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReportCountArgs<ExtArgs>
            result: $Utils.Optional<ReportCountAggregateOutputType> | number
          }
        }
      }
      UserBlock: {
        payload: Prisma.$UserBlockPayload<ExtArgs>
        fields: Prisma.UserBlockFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserBlockFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBlockPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserBlockFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBlockPayload>
          }
          findFirst: {
            args: Prisma.UserBlockFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBlockPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserBlockFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBlockPayload>
          }
          findMany: {
            args: Prisma.UserBlockFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBlockPayload>[]
          }
          create: {
            args: Prisma.UserBlockCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBlockPayload>
          }
          createMany: {
            args: Prisma.UserBlockCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserBlockDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBlockPayload>
          }
          update: {
            args: Prisma.UserBlockUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBlockPayload>
          }
          deleteMany: {
            args: Prisma.UserBlockDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserBlockUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserBlockUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBlockPayload>
          }
          aggregate: {
            args: Prisma.UserBlockAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserBlock>
          }
          groupBy: {
            args: Prisma.UserBlockGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserBlockGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserBlockCountArgs<ExtArgs>
            result: $Utils.Optional<UserBlockCountAggregateOutputType> | number
          }
        }
      }
      ModerationAction: {
        payload: Prisma.$ModerationActionPayload<ExtArgs>
        fields: Prisma.ModerationActionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ModerationActionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModerationActionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ModerationActionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModerationActionPayload>
          }
          findFirst: {
            args: Prisma.ModerationActionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModerationActionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ModerationActionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModerationActionPayload>
          }
          findMany: {
            args: Prisma.ModerationActionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModerationActionPayload>[]
          }
          create: {
            args: Prisma.ModerationActionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModerationActionPayload>
          }
          createMany: {
            args: Prisma.ModerationActionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ModerationActionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModerationActionPayload>
          }
          update: {
            args: Prisma.ModerationActionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModerationActionPayload>
          }
          deleteMany: {
            args: Prisma.ModerationActionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ModerationActionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ModerationActionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModerationActionPayload>
          }
          aggregate: {
            args: Prisma.ModerationActionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateModerationAction>
          }
          groupBy: {
            args: Prisma.ModerationActionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ModerationActionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ModerationActionCountArgs<ExtArgs>
            result: $Utils.Optional<ModerationActionCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      ContactMessage: {
        payload: Prisma.$ContactMessagePayload<ExtArgs>
        fields: Prisma.ContactMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContactMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContactMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>
          }
          findFirst: {
            args: Prisma.ContactMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContactMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>
          }
          findMany: {
            args: Prisma.ContactMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>[]
          }
          create: {
            args: Prisma.ContactMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>
          }
          createMany: {
            args: Prisma.ContactMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ContactMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>
          }
          update: {
            args: Prisma.ContactMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>
          }
          deleteMany: {
            args: Prisma.ContactMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContactMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ContactMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactMessagePayload>
          }
          aggregate: {
            args: Prisma.ContactMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContactMessage>
          }
          groupBy: {
            args: Prisma.ContactMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContactMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContactMessageCountArgs<ExtArgs>
            result: $Utils.Optional<ContactMessageCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
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
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    profile?: ProfileOmit
    profilePhoto?: ProfilePhotoOmit
    profileRate?: ProfileRateOmit
    report?: ReportOmit
    userBlock?: UserBlockOmit
    moderationAction?: ModerationActionOmit
    auditLog?: AuditLogOmit
    contactMessage?: ContactMessageOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
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
    reportsSent: number
    blocksSent: number
    blocksRecv: number
    auditLogs: number
    modActions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reportsSent?: boolean | UserCountOutputTypeCountReportsSentArgs
    blocksSent?: boolean | UserCountOutputTypeCountBlocksSentArgs
    blocksRecv?: boolean | UserCountOutputTypeCountBlocksRecvArgs
    auditLogs?: boolean | UserCountOutputTypeCountAuditLogsArgs
    modActions?: boolean | UserCountOutputTypeCountModActionsArgs
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
  export type UserCountOutputTypeCountReportsSentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBlocksSentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserBlockWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBlocksRecvArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserBlockWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountModActionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ModerationActionWhereInput
  }


  /**
   * Count Type ProfileCountOutputType
   */

  export type ProfileCountOutputType = {
    photos: number
    reports: number
    rates: number
  }

  export type ProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    photos?: boolean | ProfileCountOutputTypeCountPhotosArgs
    reports?: boolean | ProfileCountOutputTypeCountReportsArgs
    rates?: boolean | ProfileCountOutputTypeCountRatesArgs
  }

  // Custom InputTypes
  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileCountOutputType
     */
    select?: ProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountPhotosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfilePhotoWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountRatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileRateWhereInput
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
    name: string | null
    email: string | null
    passwordHash: string | null
    role: string | null
    isSuspended: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    passwordHash: string | null
    role: string | null
    isSuspended: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    passwordHash: number
    role: number
    isSuspended: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    role?: true
    isSuspended?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    role?: true
    isSuspended?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    role?: true
    isSuspended?: true
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
    name: string
    email: string
    passwordHash: string
    role: string
    isSuspended: boolean
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
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    isSuspended?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | User$profileArgs<ExtArgs>
    reportsSent?: boolean | User$reportsSentArgs<ExtArgs>
    blocksSent?: boolean | User$blocksSentArgs<ExtArgs>
    blocksRecv?: boolean | User$blocksRecvArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    modActions?: boolean | User$modActionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    isSuspended?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "passwordHash" | "role" | "isSuspended" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | User$profileArgs<ExtArgs>
    reportsSent?: boolean | User$reportsSentArgs<ExtArgs>
    blocksSent?: boolean | User$blocksSentArgs<ExtArgs>
    blocksRecv?: boolean | User$blocksRecvArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    modActions?: boolean | User$modActionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      profile: Prisma.$ProfilePayload<ExtArgs> | null
      reportsSent: Prisma.$ReportPayload<ExtArgs>[]
      blocksSent: Prisma.$UserBlockPayload<ExtArgs>[]
      blocksRecv: Prisma.$UserBlockPayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
      modActions: Prisma.$ModerationActionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      passwordHash: string
      role: string
      isSuspended: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
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
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
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
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

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
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


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
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends User$profileArgs<ExtArgs> = {}>(args?: Subset<T, User$profileArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    reportsSent<T extends User$reportsSentArgs<ExtArgs> = {}>(args?: Subset<T, User$reportsSentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    blocksSent<T extends User$blocksSentArgs<ExtArgs> = {}>(args?: Subset<T, User$blocksSentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserBlockPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    blocksRecv<T extends User$blocksRecvArgs<ExtArgs> = {}>(args?: Subset<T, User$blocksRecvArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserBlockPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    auditLogs<T extends User$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    modActions<T extends User$modActionsArgs<ExtArgs> = {}>(args?: Subset<T, User$modActionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModerationActionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly isSuspended: FieldRef<"User", 'Boolean'>
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
    /**
     * Limit how many Users to update.
     */
    limit?: number
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.profile
   */
  export type User$profileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    where?: ProfileWhereInput
  }

  /**
   * User.reportsSent
   */
  export type User$reportsSentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    cursor?: ReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * User.blocksSent
   */
  export type User$blocksSentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBlock
     */
    select?: UserBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBlock
     */
    omit?: UserBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBlockInclude<ExtArgs> | null
    where?: UserBlockWhereInput
    orderBy?: UserBlockOrderByWithRelationInput | UserBlockOrderByWithRelationInput[]
    cursor?: UserBlockWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserBlockScalarFieldEnum | UserBlockScalarFieldEnum[]
  }

  /**
   * User.blocksRecv
   */
  export type User$blocksRecvArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBlock
     */
    select?: UserBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBlock
     */
    omit?: UserBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBlockInclude<ExtArgs> | null
    where?: UserBlockWhereInput
    orderBy?: UserBlockOrderByWithRelationInput | UserBlockOrderByWithRelationInput[]
    cursor?: UserBlockWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserBlockScalarFieldEnum | UserBlockScalarFieldEnum[]
  }

  /**
   * User.auditLogs
   */
  export type User$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * User.modActions
   */
  export type User$modActionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationAction
     */
    select?: ModerationActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationAction
     */
    omit?: ModerationActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationActionInclude<ExtArgs> | null
    where?: ModerationActionWhereInput
    orderBy?: ModerationActionOrderByWithRelationInput | ModerationActionOrderByWithRelationInput[]
    cursor?: ModerationActionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ModerationActionScalarFieldEnum | ModerationActionScalarFieldEnum[]
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Profile
   */

  export type AggregateProfile = {
    _count: ProfileCountAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  export type ProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    status: string | null
    visibility: string | null
    moderationNotes: string | null
    rejectionReason: string | null
    ageConfirmed: boolean | null
    consentRecorded: boolean | null
    consentTimestamp: Date | null
    consentVersion: string | null
    photoUrl: string | null
    bio: string | null
    address: string | null
    city: string | null
    region: string | null
    district: string | null
    localArea: string | null
    country: string | null
    favColor: string | null
    phone: string | null
    whatsapp: string | null
    hidePhoneFromPublic: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    status: string | null
    visibility: string | null
    moderationNotes: string | null
    rejectionReason: string | null
    ageConfirmed: boolean | null
    consentRecorded: boolean | null
    consentTimestamp: Date | null
    consentVersion: string | null
    photoUrl: string | null
    bio: string | null
    address: string | null
    city: string | null
    region: string | null
    district: string | null
    localArea: string | null
    country: string | null
    favColor: string | null
    phone: string | null
    whatsapp: string | null
    hidePhoneFromPublic: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfileCountAggregateOutputType = {
    id: number
    userId: number
    status: number
    visibility: number
    moderationNotes: number
    rejectionReason: number
    ageConfirmed: number
    consentRecorded: number
    consentTimestamp: number
    consentVersion: number
    photoUrl: number
    bio: number
    address: number
    city: number
    region: number
    district: number
    localArea: number
    country: number
    favColor: number
    phone: number
    whatsapp: number
    hidePhoneFromPublic: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProfileMinAggregateInputType = {
    id?: true
    userId?: true
    status?: true
    visibility?: true
    moderationNotes?: true
    rejectionReason?: true
    ageConfirmed?: true
    consentRecorded?: true
    consentTimestamp?: true
    consentVersion?: true
    photoUrl?: true
    bio?: true
    address?: true
    city?: true
    region?: true
    district?: true
    localArea?: true
    country?: true
    favColor?: true
    phone?: true
    whatsapp?: true
    hidePhoneFromPublic?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    status?: true
    visibility?: true
    moderationNotes?: true
    rejectionReason?: true
    ageConfirmed?: true
    consentRecorded?: true
    consentTimestamp?: true
    consentVersion?: true
    photoUrl?: true
    bio?: true
    address?: true
    city?: true
    region?: true
    district?: true
    localArea?: true
    country?: true
    favColor?: true
    phone?: true
    whatsapp?: true
    hidePhoneFromPublic?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfileCountAggregateInputType = {
    id?: true
    userId?: true
    status?: true
    visibility?: true
    moderationNotes?: true
    rejectionReason?: true
    ageConfirmed?: true
    consentRecorded?: true
    consentTimestamp?: true
    consentVersion?: true
    photoUrl?: true
    bio?: true
    address?: true
    city?: true
    region?: true
    district?: true
    localArea?: true
    country?: true
    favColor?: true
    phone?: true
    whatsapp?: true
    hidePhoneFromPublic?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profile to aggregate.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Profiles
    **/
    _count?: true | ProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfileMaxAggregateInputType
  }

  export type GetProfileAggregateType<T extends ProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfile[P]>
      : GetScalarType<T[P], AggregateProfile[P]>
  }




  export type ProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileWhereInput
    orderBy?: ProfileOrderByWithAggregationInput | ProfileOrderByWithAggregationInput[]
    by: ProfileScalarFieldEnum[] | ProfileScalarFieldEnum
    having?: ProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfileCountAggregateInputType | true
    _min?: ProfileMinAggregateInputType
    _max?: ProfileMaxAggregateInputType
  }

  export type ProfileGroupByOutputType = {
    id: string
    userId: string
    status: string
    visibility: string
    moderationNotes: string | null
    rejectionReason: string | null
    ageConfirmed: boolean
    consentRecorded: boolean
    consentTimestamp: Date | null
    consentVersion: string | null
    photoUrl: string | null
    bio: string | null
    address: string | null
    city: string | null
    region: string | null
    district: string | null
    localArea: string | null
    country: string | null
    favColor: string | null
    phone: string | null
    whatsapp: string | null
    hidePhoneFromPublic: boolean
    createdAt: Date
    updatedAt: Date
    _count: ProfileCountAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  type GetProfileGroupByPayload<T extends ProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfileGroupByOutputType[P]>
            : GetScalarType<T[P], ProfileGroupByOutputType[P]>
        }
      >
    >


  export type ProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    status?: boolean
    visibility?: boolean
    moderationNotes?: boolean
    rejectionReason?: boolean
    ageConfirmed?: boolean
    consentRecorded?: boolean
    consentTimestamp?: boolean
    consentVersion?: boolean
    photoUrl?: boolean
    bio?: boolean
    address?: boolean
    city?: boolean
    region?: boolean
    district?: boolean
    localArea?: boolean
    country?: boolean
    favColor?: boolean
    phone?: boolean
    whatsapp?: boolean
    hidePhoneFromPublic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    photos?: boolean | Profile$photosArgs<ExtArgs>
    reports?: boolean | Profile$reportsArgs<ExtArgs>
    rates?: boolean | Profile$ratesArgs<ExtArgs>
    _count?: boolean | ProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>



  export type ProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    status?: boolean
    visibility?: boolean
    moderationNotes?: boolean
    rejectionReason?: boolean
    ageConfirmed?: boolean
    consentRecorded?: boolean
    consentTimestamp?: boolean
    consentVersion?: boolean
    photoUrl?: boolean
    bio?: boolean
    address?: boolean
    city?: boolean
    region?: boolean
    district?: boolean
    localArea?: boolean
    country?: boolean
    favColor?: boolean
    phone?: boolean
    whatsapp?: boolean
    hidePhoneFromPublic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "status" | "visibility" | "moderationNotes" | "rejectionReason" | "ageConfirmed" | "consentRecorded" | "consentTimestamp" | "consentVersion" | "photoUrl" | "bio" | "address" | "city" | "region" | "district" | "localArea" | "country" | "favColor" | "phone" | "whatsapp" | "hidePhoneFromPublic" | "createdAt" | "updatedAt", ExtArgs["result"]["profile"]>
  export type ProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    photos?: boolean | Profile$photosArgs<ExtArgs>
    reports?: boolean | Profile$reportsArgs<ExtArgs>
    rates?: boolean | Profile$ratesArgs<ExtArgs>
    _count?: boolean | ProfileCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Profile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      photos: Prisma.$ProfilePhotoPayload<ExtArgs>[]
      reports: Prisma.$ReportPayload<ExtArgs>[]
      rates: Prisma.$ProfileRatePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      status: string
      visibility: string
      moderationNotes: string | null
      rejectionReason: string | null
      ageConfirmed: boolean
      consentRecorded: boolean
      consentTimestamp: Date | null
      consentVersion: string | null
      photoUrl: string | null
      bio: string | null
      address: string | null
      city: string | null
      region: string | null
      district: string | null
      localArea: string | null
      country: string | null
      favColor: string | null
      phone: string | null
      whatsapp: string | null
      hidePhoneFromPublic: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["profile"]>
    composites: {}
  }

  type ProfileGetPayload<S extends boolean | null | undefined | ProfileDefaultArgs> = $Result.GetResult<Prisma.$ProfilePayload, S>

  type ProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfileCountAggregateInputType | true
    }

  export interface ProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Profile'], meta: { name: 'Profile' } }
    /**
     * Find zero or one Profile that matches the filter.
     * @param {ProfileFindUniqueArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfileFindUniqueArgs>(args: SelectSubset<T, ProfileFindUniqueArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Profile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfileFindUniqueOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfileFindFirstArgs>(args?: SelectSubset<T, ProfileFindFirstArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Profiles
     * const profiles = await prisma.profile.findMany()
     * 
     * // Get first 10 Profiles
     * const profiles = await prisma.profile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profileWithIdOnly = await prisma.profile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfileFindManyArgs>(args?: SelectSubset<T, ProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Profile.
     * @param {ProfileCreateArgs} args - Arguments to create a Profile.
     * @example
     * // Create one Profile
     * const Profile = await prisma.profile.create({
     *   data: {
     *     // ... data to create a Profile
     *   }
     * })
     * 
     */
    create<T extends ProfileCreateArgs>(args: SelectSubset<T, ProfileCreateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Profiles.
     * @param {ProfileCreateManyArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfileCreateManyArgs>(args?: SelectSubset<T, ProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Profile.
     * @param {ProfileDeleteArgs} args - Arguments to delete one Profile.
     * @example
     * // Delete one Profile
     * const Profile = await prisma.profile.delete({
     *   where: {
     *     // ... filter to delete one Profile
     *   }
     * })
     * 
     */
    delete<T extends ProfileDeleteArgs>(args: SelectSubset<T, ProfileDeleteArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Profile.
     * @param {ProfileUpdateArgs} args - Arguments to update one Profile.
     * @example
     * // Update one Profile
     * const profile = await prisma.profile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfileUpdateArgs>(args: SelectSubset<T, ProfileUpdateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Profiles.
     * @param {ProfileDeleteManyArgs} args - Arguments to filter Profiles to delete.
     * @example
     * // Delete a few Profiles
     * const { count } = await prisma.profile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfileDeleteManyArgs>(args?: SelectSubset<T, ProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfileUpdateManyArgs>(args: SelectSubset<T, ProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Profile.
     * @param {ProfileUpsertArgs} args - Arguments to update or create a Profile.
     * @example
     * // Update or create a Profile
     * const profile = await prisma.profile.upsert({
     *   create: {
     *     // ... data to create a Profile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Profile we want to update
     *   }
     * })
     */
    upsert<T extends ProfileUpsertArgs>(args: SelectSubset<T, ProfileUpsertArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileCountArgs} args - Arguments to filter Profiles to count.
     * @example
     * // Count the number of Profiles
     * const count = await prisma.profile.count({
     *   where: {
     *     // ... the filter for the Profiles we want to count
     *   }
     * })
    **/
    count<T extends ProfileCountArgs>(
      args?: Subset<T, ProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProfileAggregateArgs>(args: Subset<T, ProfileAggregateArgs>): Prisma.PrismaPromise<GetProfileAggregateType<T>>

    /**
     * Group by Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileGroupByArgs} args - Group by arguments.
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
      T extends ProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfileGroupByArgs['orderBy'] }
        : { orderBy?: ProfileGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Profile model
   */
  readonly fields: ProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Profile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    photos<T extends Profile$photosArgs<ExtArgs> = {}>(args?: Subset<T, Profile$photosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePhotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reports<T extends Profile$reportsArgs<ExtArgs> = {}>(args?: Subset<T, Profile$reportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    rates<T extends Profile$ratesArgs<ExtArgs> = {}>(args?: Subset<T, Profile$ratesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfileRatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Profile model
   */
  interface ProfileFieldRefs {
    readonly id: FieldRef<"Profile", 'String'>
    readonly userId: FieldRef<"Profile", 'String'>
    readonly status: FieldRef<"Profile", 'String'>
    readonly visibility: FieldRef<"Profile", 'String'>
    readonly moderationNotes: FieldRef<"Profile", 'String'>
    readonly rejectionReason: FieldRef<"Profile", 'String'>
    readonly ageConfirmed: FieldRef<"Profile", 'Boolean'>
    readonly consentRecorded: FieldRef<"Profile", 'Boolean'>
    readonly consentTimestamp: FieldRef<"Profile", 'DateTime'>
    readonly consentVersion: FieldRef<"Profile", 'String'>
    readonly photoUrl: FieldRef<"Profile", 'String'>
    readonly bio: FieldRef<"Profile", 'String'>
    readonly address: FieldRef<"Profile", 'String'>
    readonly city: FieldRef<"Profile", 'String'>
    readonly region: FieldRef<"Profile", 'String'>
    readonly district: FieldRef<"Profile", 'String'>
    readonly localArea: FieldRef<"Profile", 'String'>
    readonly country: FieldRef<"Profile", 'String'>
    readonly favColor: FieldRef<"Profile", 'String'>
    readonly phone: FieldRef<"Profile", 'String'>
    readonly whatsapp: FieldRef<"Profile", 'String'>
    readonly hidePhoneFromPublic: FieldRef<"Profile", 'Boolean'>
    readonly createdAt: FieldRef<"Profile", 'DateTime'>
    readonly updatedAt: FieldRef<"Profile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Profile findUnique
   */
  export type ProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findUniqueOrThrow
   */
  export type ProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findFirst
   */
  export type ProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findFirstOrThrow
   */
  export type ProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findMany
   */
  export type ProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profiles to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile create
   */
  export type ProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a Profile.
     */
    data: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
  }

  /**
   * Profile createMany
   */
  export type ProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Profile update
   */
  export type ProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a Profile.
     */
    data: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
    /**
     * Choose, which Profile to update.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile updateMany
   */
  export type ProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to update.
     */
    limit?: number
  }

  /**
   * Profile upsert
   */
  export type ProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the Profile to update in case it exists.
     */
    where: ProfileWhereUniqueInput
    /**
     * In case the Profile found by the `where` argument doesn't exist, create a new Profile with this data.
     */
    create: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
    /**
     * In case the Profile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
  }

  /**
   * Profile delete
   */
  export type ProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter which Profile to delete.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile deleteMany
   */
  export type ProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profiles to delete
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to delete.
     */
    limit?: number
  }

  /**
   * Profile.photos
   */
  export type Profile$photosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfilePhoto
     */
    select?: ProfilePhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfilePhoto
     */
    omit?: ProfilePhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfilePhotoInclude<ExtArgs> | null
    where?: ProfilePhotoWhereInput
    orderBy?: ProfilePhotoOrderByWithRelationInput | ProfilePhotoOrderByWithRelationInput[]
    cursor?: ProfilePhotoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProfilePhotoScalarFieldEnum | ProfilePhotoScalarFieldEnum[]
  }

  /**
   * Profile.reports
   */
  export type Profile$reportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    cursor?: ReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Profile.rates
   */
  export type Profile$ratesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileRate
     */
    select?: ProfileRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileRate
     */
    omit?: ProfileRateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileRateInclude<ExtArgs> | null
    where?: ProfileRateWhereInput
    orderBy?: ProfileRateOrderByWithRelationInput | ProfileRateOrderByWithRelationInput[]
    cursor?: ProfileRateWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProfileRateScalarFieldEnum | ProfileRateScalarFieldEnum[]
  }

  /**
   * Profile without action
   */
  export type ProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
  }


  /**
   * Model ProfilePhoto
   */

  export type AggregateProfilePhoto = {
    _count: ProfilePhotoCountAggregateOutputType | null
    _avg: ProfilePhotoAvgAggregateOutputType | null
    _sum: ProfilePhotoSumAggregateOutputType | null
    _min: ProfilePhotoMinAggregateOutputType | null
    _max: ProfilePhotoMaxAggregateOutputType | null
  }

  export type ProfilePhotoAvgAggregateOutputType = {
    order: number | null
  }

  export type ProfilePhotoSumAggregateOutputType = {
    order: number | null
  }

  export type ProfilePhotoMinAggregateOutputType = {
    id: string | null
    profileId: string | null
    url: string | null
    sha256Hash: string | null
    order: number | null
    isPrimary: boolean | null
    status: string | null
    createdAt: Date | null
  }

  export type ProfilePhotoMaxAggregateOutputType = {
    id: string | null
    profileId: string | null
    url: string | null
    sha256Hash: string | null
    order: number | null
    isPrimary: boolean | null
    status: string | null
    createdAt: Date | null
  }

  export type ProfilePhotoCountAggregateOutputType = {
    id: number
    profileId: number
    url: number
    sha256Hash: number
    order: number
    isPrimary: number
    status: number
    createdAt: number
    _all: number
  }


  export type ProfilePhotoAvgAggregateInputType = {
    order?: true
  }

  export type ProfilePhotoSumAggregateInputType = {
    order?: true
  }

  export type ProfilePhotoMinAggregateInputType = {
    id?: true
    profileId?: true
    url?: true
    sha256Hash?: true
    order?: true
    isPrimary?: true
    status?: true
    createdAt?: true
  }

  export type ProfilePhotoMaxAggregateInputType = {
    id?: true
    profileId?: true
    url?: true
    sha256Hash?: true
    order?: true
    isPrimary?: true
    status?: true
    createdAt?: true
  }

  export type ProfilePhotoCountAggregateInputType = {
    id?: true
    profileId?: true
    url?: true
    sha256Hash?: true
    order?: true
    isPrimary?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type ProfilePhotoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfilePhoto to aggregate.
     */
    where?: ProfilePhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfilePhotos to fetch.
     */
    orderBy?: ProfilePhotoOrderByWithRelationInput | ProfilePhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfilePhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfilePhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfilePhotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProfilePhotos
    **/
    _count?: true | ProfilePhotoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProfilePhotoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProfilePhotoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfilePhotoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfilePhotoMaxAggregateInputType
  }

  export type GetProfilePhotoAggregateType<T extends ProfilePhotoAggregateArgs> = {
        [P in keyof T & keyof AggregateProfilePhoto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfilePhoto[P]>
      : GetScalarType<T[P], AggregateProfilePhoto[P]>
  }




  export type ProfilePhotoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfilePhotoWhereInput
    orderBy?: ProfilePhotoOrderByWithAggregationInput | ProfilePhotoOrderByWithAggregationInput[]
    by: ProfilePhotoScalarFieldEnum[] | ProfilePhotoScalarFieldEnum
    having?: ProfilePhotoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfilePhotoCountAggregateInputType | true
    _avg?: ProfilePhotoAvgAggregateInputType
    _sum?: ProfilePhotoSumAggregateInputType
    _min?: ProfilePhotoMinAggregateInputType
    _max?: ProfilePhotoMaxAggregateInputType
  }

  export type ProfilePhotoGroupByOutputType = {
    id: string
    profileId: string
    url: string
    sha256Hash: string | null
    order: number
    isPrimary: boolean
    status: string
    createdAt: Date
    _count: ProfilePhotoCountAggregateOutputType | null
    _avg: ProfilePhotoAvgAggregateOutputType | null
    _sum: ProfilePhotoSumAggregateOutputType | null
    _min: ProfilePhotoMinAggregateOutputType | null
    _max: ProfilePhotoMaxAggregateOutputType | null
  }

  type GetProfilePhotoGroupByPayload<T extends ProfilePhotoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfilePhotoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfilePhotoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfilePhotoGroupByOutputType[P]>
            : GetScalarType<T[P], ProfilePhotoGroupByOutputType[P]>
        }
      >
    >


  export type ProfilePhotoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    url?: boolean
    sha256Hash?: boolean
    order?: boolean
    isPrimary?: boolean
    status?: boolean
    createdAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profilePhoto"]>



  export type ProfilePhotoSelectScalar = {
    id?: boolean
    profileId?: boolean
    url?: boolean
    sha256Hash?: boolean
    order?: boolean
    isPrimary?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type ProfilePhotoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "profileId" | "url" | "sha256Hash" | "order" | "isPrimary" | "status" | "createdAt", ExtArgs["result"]["profilePhoto"]>
  export type ProfilePhotoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }

  export type $ProfilePhotoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProfilePhoto"
    objects: {
      profile: Prisma.$ProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      profileId: string
      url: string
      sha256Hash: string | null
      order: number
      isPrimary: boolean
      status: string
      createdAt: Date
    }, ExtArgs["result"]["profilePhoto"]>
    composites: {}
  }

  type ProfilePhotoGetPayload<S extends boolean | null | undefined | ProfilePhotoDefaultArgs> = $Result.GetResult<Prisma.$ProfilePhotoPayload, S>

  type ProfilePhotoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfilePhotoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfilePhotoCountAggregateInputType | true
    }

  export interface ProfilePhotoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProfilePhoto'], meta: { name: 'ProfilePhoto' } }
    /**
     * Find zero or one ProfilePhoto that matches the filter.
     * @param {ProfilePhotoFindUniqueArgs} args - Arguments to find a ProfilePhoto
     * @example
     * // Get one ProfilePhoto
     * const profilePhoto = await prisma.profilePhoto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfilePhotoFindUniqueArgs>(args: SelectSubset<T, ProfilePhotoFindUniqueArgs<ExtArgs>>): Prisma__ProfilePhotoClient<$Result.GetResult<Prisma.$ProfilePhotoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProfilePhoto that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfilePhotoFindUniqueOrThrowArgs} args - Arguments to find a ProfilePhoto
     * @example
     * // Get one ProfilePhoto
     * const profilePhoto = await prisma.profilePhoto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfilePhotoFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfilePhotoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfilePhotoClient<$Result.GetResult<Prisma.$ProfilePhotoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfilePhoto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfilePhotoFindFirstArgs} args - Arguments to find a ProfilePhoto
     * @example
     * // Get one ProfilePhoto
     * const profilePhoto = await prisma.profilePhoto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfilePhotoFindFirstArgs>(args?: SelectSubset<T, ProfilePhotoFindFirstArgs<ExtArgs>>): Prisma__ProfilePhotoClient<$Result.GetResult<Prisma.$ProfilePhotoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfilePhoto that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfilePhotoFindFirstOrThrowArgs} args - Arguments to find a ProfilePhoto
     * @example
     * // Get one ProfilePhoto
     * const profilePhoto = await prisma.profilePhoto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfilePhotoFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfilePhotoFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfilePhotoClient<$Result.GetResult<Prisma.$ProfilePhotoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProfilePhotos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfilePhotoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProfilePhotos
     * const profilePhotos = await prisma.profilePhoto.findMany()
     * 
     * // Get first 10 ProfilePhotos
     * const profilePhotos = await prisma.profilePhoto.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profilePhotoWithIdOnly = await prisma.profilePhoto.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfilePhotoFindManyArgs>(args?: SelectSubset<T, ProfilePhotoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePhotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProfilePhoto.
     * @param {ProfilePhotoCreateArgs} args - Arguments to create a ProfilePhoto.
     * @example
     * // Create one ProfilePhoto
     * const ProfilePhoto = await prisma.profilePhoto.create({
     *   data: {
     *     // ... data to create a ProfilePhoto
     *   }
     * })
     * 
     */
    create<T extends ProfilePhotoCreateArgs>(args: SelectSubset<T, ProfilePhotoCreateArgs<ExtArgs>>): Prisma__ProfilePhotoClient<$Result.GetResult<Prisma.$ProfilePhotoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProfilePhotos.
     * @param {ProfilePhotoCreateManyArgs} args - Arguments to create many ProfilePhotos.
     * @example
     * // Create many ProfilePhotos
     * const profilePhoto = await prisma.profilePhoto.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfilePhotoCreateManyArgs>(args?: SelectSubset<T, ProfilePhotoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ProfilePhoto.
     * @param {ProfilePhotoDeleteArgs} args - Arguments to delete one ProfilePhoto.
     * @example
     * // Delete one ProfilePhoto
     * const ProfilePhoto = await prisma.profilePhoto.delete({
     *   where: {
     *     // ... filter to delete one ProfilePhoto
     *   }
     * })
     * 
     */
    delete<T extends ProfilePhotoDeleteArgs>(args: SelectSubset<T, ProfilePhotoDeleteArgs<ExtArgs>>): Prisma__ProfilePhotoClient<$Result.GetResult<Prisma.$ProfilePhotoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProfilePhoto.
     * @param {ProfilePhotoUpdateArgs} args - Arguments to update one ProfilePhoto.
     * @example
     * // Update one ProfilePhoto
     * const profilePhoto = await prisma.profilePhoto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfilePhotoUpdateArgs>(args: SelectSubset<T, ProfilePhotoUpdateArgs<ExtArgs>>): Prisma__ProfilePhotoClient<$Result.GetResult<Prisma.$ProfilePhotoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProfilePhotos.
     * @param {ProfilePhotoDeleteManyArgs} args - Arguments to filter ProfilePhotos to delete.
     * @example
     * // Delete a few ProfilePhotos
     * const { count } = await prisma.profilePhoto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfilePhotoDeleteManyArgs>(args?: SelectSubset<T, ProfilePhotoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProfilePhotos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfilePhotoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProfilePhotos
     * const profilePhoto = await prisma.profilePhoto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfilePhotoUpdateManyArgs>(args: SelectSubset<T, ProfilePhotoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProfilePhoto.
     * @param {ProfilePhotoUpsertArgs} args - Arguments to update or create a ProfilePhoto.
     * @example
     * // Update or create a ProfilePhoto
     * const profilePhoto = await prisma.profilePhoto.upsert({
     *   create: {
     *     // ... data to create a ProfilePhoto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProfilePhoto we want to update
     *   }
     * })
     */
    upsert<T extends ProfilePhotoUpsertArgs>(args: SelectSubset<T, ProfilePhotoUpsertArgs<ExtArgs>>): Prisma__ProfilePhotoClient<$Result.GetResult<Prisma.$ProfilePhotoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProfilePhotos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfilePhotoCountArgs} args - Arguments to filter ProfilePhotos to count.
     * @example
     * // Count the number of ProfilePhotos
     * const count = await prisma.profilePhoto.count({
     *   where: {
     *     // ... the filter for the ProfilePhotos we want to count
     *   }
     * })
    **/
    count<T extends ProfilePhotoCountArgs>(
      args?: Subset<T, ProfilePhotoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfilePhotoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProfilePhoto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfilePhotoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProfilePhotoAggregateArgs>(args: Subset<T, ProfilePhotoAggregateArgs>): Prisma.PrismaPromise<GetProfilePhotoAggregateType<T>>

    /**
     * Group by ProfilePhoto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfilePhotoGroupByArgs} args - Group by arguments.
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
      T extends ProfilePhotoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfilePhotoGroupByArgs['orderBy'] }
        : { orderBy?: ProfilePhotoGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProfilePhotoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfilePhotoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProfilePhoto model
   */
  readonly fields: ProfilePhotoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProfilePhoto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfilePhotoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProfilePhoto model
   */
  interface ProfilePhotoFieldRefs {
    readonly id: FieldRef<"ProfilePhoto", 'String'>
    readonly profileId: FieldRef<"ProfilePhoto", 'String'>
    readonly url: FieldRef<"ProfilePhoto", 'String'>
    readonly sha256Hash: FieldRef<"ProfilePhoto", 'String'>
    readonly order: FieldRef<"ProfilePhoto", 'Int'>
    readonly isPrimary: FieldRef<"ProfilePhoto", 'Boolean'>
    readonly status: FieldRef<"ProfilePhoto", 'String'>
    readonly createdAt: FieldRef<"ProfilePhoto", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProfilePhoto findUnique
   */
  export type ProfilePhotoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfilePhoto
     */
    select?: ProfilePhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfilePhoto
     */
    omit?: ProfilePhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfilePhotoInclude<ExtArgs> | null
    /**
     * Filter, which ProfilePhoto to fetch.
     */
    where: ProfilePhotoWhereUniqueInput
  }

  /**
   * ProfilePhoto findUniqueOrThrow
   */
  export type ProfilePhotoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfilePhoto
     */
    select?: ProfilePhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfilePhoto
     */
    omit?: ProfilePhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfilePhotoInclude<ExtArgs> | null
    /**
     * Filter, which ProfilePhoto to fetch.
     */
    where: ProfilePhotoWhereUniqueInput
  }

  /**
   * ProfilePhoto findFirst
   */
  export type ProfilePhotoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfilePhoto
     */
    select?: ProfilePhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfilePhoto
     */
    omit?: ProfilePhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfilePhotoInclude<ExtArgs> | null
    /**
     * Filter, which ProfilePhoto to fetch.
     */
    where?: ProfilePhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfilePhotos to fetch.
     */
    orderBy?: ProfilePhotoOrderByWithRelationInput | ProfilePhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfilePhotos.
     */
    cursor?: ProfilePhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfilePhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfilePhotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfilePhotos.
     */
    distinct?: ProfilePhotoScalarFieldEnum | ProfilePhotoScalarFieldEnum[]
  }

  /**
   * ProfilePhoto findFirstOrThrow
   */
  export type ProfilePhotoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfilePhoto
     */
    select?: ProfilePhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfilePhoto
     */
    omit?: ProfilePhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfilePhotoInclude<ExtArgs> | null
    /**
     * Filter, which ProfilePhoto to fetch.
     */
    where?: ProfilePhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfilePhotos to fetch.
     */
    orderBy?: ProfilePhotoOrderByWithRelationInput | ProfilePhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfilePhotos.
     */
    cursor?: ProfilePhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfilePhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfilePhotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfilePhotos.
     */
    distinct?: ProfilePhotoScalarFieldEnum | ProfilePhotoScalarFieldEnum[]
  }

  /**
   * ProfilePhoto findMany
   */
  export type ProfilePhotoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfilePhoto
     */
    select?: ProfilePhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfilePhoto
     */
    omit?: ProfilePhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfilePhotoInclude<ExtArgs> | null
    /**
     * Filter, which ProfilePhotos to fetch.
     */
    where?: ProfilePhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfilePhotos to fetch.
     */
    orderBy?: ProfilePhotoOrderByWithRelationInput | ProfilePhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProfilePhotos.
     */
    cursor?: ProfilePhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfilePhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfilePhotos.
     */
    skip?: number
    distinct?: ProfilePhotoScalarFieldEnum | ProfilePhotoScalarFieldEnum[]
  }

  /**
   * ProfilePhoto create
   */
  export type ProfilePhotoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfilePhoto
     */
    select?: ProfilePhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfilePhoto
     */
    omit?: ProfilePhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfilePhotoInclude<ExtArgs> | null
    /**
     * The data needed to create a ProfilePhoto.
     */
    data: XOR<ProfilePhotoCreateInput, ProfilePhotoUncheckedCreateInput>
  }

  /**
   * ProfilePhoto createMany
   */
  export type ProfilePhotoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProfilePhotos.
     */
    data: ProfilePhotoCreateManyInput | ProfilePhotoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProfilePhoto update
   */
  export type ProfilePhotoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfilePhoto
     */
    select?: ProfilePhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfilePhoto
     */
    omit?: ProfilePhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfilePhotoInclude<ExtArgs> | null
    /**
     * The data needed to update a ProfilePhoto.
     */
    data: XOR<ProfilePhotoUpdateInput, ProfilePhotoUncheckedUpdateInput>
    /**
     * Choose, which ProfilePhoto to update.
     */
    where: ProfilePhotoWhereUniqueInput
  }

  /**
   * ProfilePhoto updateMany
   */
  export type ProfilePhotoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProfilePhotos.
     */
    data: XOR<ProfilePhotoUpdateManyMutationInput, ProfilePhotoUncheckedUpdateManyInput>
    /**
     * Filter which ProfilePhotos to update
     */
    where?: ProfilePhotoWhereInput
    /**
     * Limit how many ProfilePhotos to update.
     */
    limit?: number
  }

  /**
   * ProfilePhoto upsert
   */
  export type ProfilePhotoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfilePhoto
     */
    select?: ProfilePhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfilePhoto
     */
    omit?: ProfilePhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfilePhotoInclude<ExtArgs> | null
    /**
     * The filter to search for the ProfilePhoto to update in case it exists.
     */
    where: ProfilePhotoWhereUniqueInput
    /**
     * In case the ProfilePhoto found by the `where` argument doesn't exist, create a new ProfilePhoto with this data.
     */
    create: XOR<ProfilePhotoCreateInput, ProfilePhotoUncheckedCreateInput>
    /**
     * In case the ProfilePhoto was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfilePhotoUpdateInput, ProfilePhotoUncheckedUpdateInput>
  }

  /**
   * ProfilePhoto delete
   */
  export type ProfilePhotoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfilePhoto
     */
    select?: ProfilePhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfilePhoto
     */
    omit?: ProfilePhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfilePhotoInclude<ExtArgs> | null
    /**
     * Filter which ProfilePhoto to delete.
     */
    where: ProfilePhotoWhereUniqueInput
  }

  /**
   * ProfilePhoto deleteMany
   */
  export type ProfilePhotoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfilePhotos to delete
     */
    where?: ProfilePhotoWhereInput
    /**
     * Limit how many ProfilePhotos to delete.
     */
    limit?: number
  }

  /**
   * ProfilePhoto without action
   */
  export type ProfilePhotoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfilePhoto
     */
    select?: ProfilePhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfilePhoto
     */
    omit?: ProfilePhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfilePhotoInclude<ExtArgs> | null
  }


  /**
   * Model ProfileRate
   */

  export type AggregateProfileRate = {
    _count: ProfileRateCountAggregateOutputType | null
    _avg: ProfileRateAvgAggregateOutputType | null
    _sum: ProfileRateSumAggregateOutputType | null
    _min: ProfileRateMinAggregateOutputType | null
    _max: ProfileRateMaxAggregateOutputType | null
  }

  export type ProfileRateAvgAggregateOutputType = {
    incall: number | null
    outcall: number | null
    order: number | null
  }

  export type ProfileRateSumAggregateOutputType = {
    incall: number | null
    outcall: number | null
    order: number | null
  }

  export type ProfileRateMinAggregateOutputType = {
    id: string | null
    profileId: string | null
    duration: string | null
    incall: number | null
    outcall: number | null
    order: number | null
  }

  export type ProfileRateMaxAggregateOutputType = {
    id: string | null
    profileId: string | null
    duration: string | null
    incall: number | null
    outcall: number | null
    order: number | null
  }

  export type ProfileRateCountAggregateOutputType = {
    id: number
    profileId: number
    duration: number
    incall: number
    outcall: number
    order: number
    _all: number
  }


  export type ProfileRateAvgAggregateInputType = {
    incall?: true
    outcall?: true
    order?: true
  }

  export type ProfileRateSumAggregateInputType = {
    incall?: true
    outcall?: true
    order?: true
  }

  export type ProfileRateMinAggregateInputType = {
    id?: true
    profileId?: true
    duration?: true
    incall?: true
    outcall?: true
    order?: true
  }

  export type ProfileRateMaxAggregateInputType = {
    id?: true
    profileId?: true
    duration?: true
    incall?: true
    outcall?: true
    order?: true
  }

  export type ProfileRateCountAggregateInputType = {
    id?: true
    profileId?: true
    duration?: true
    incall?: true
    outcall?: true
    order?: true
    _all?: true
  }

  export type ProfileRateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfileRate to aggregate.
     */
    where?: ProfileRateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfileRates to fetch.
     */
    orderBy?: ProfileRateOrderByWithRelationInput | ProfileRateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfileRateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfileRates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfileRates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProfileRates
    **/
    _count?: true | ProfileRateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProfileRateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProfileRateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfileRateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfileRateMaxAggregateInputType
  }

  export type GetProfileRateAggregateType<T extends ProfileRateAggregateArgs> = {
        [P in keyof T & keyof AggregateProfileRate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfileRate[P]>
      : GetScalarType<T[P], AggregateProfileRate[P]>
  }




  export type ProfileRateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileRateWhereInput
    orderBy?: ProfileRateOrderByWithAggregationInput | ProfileRateOrderByWithAggregationInput[]
    by: ProfileRateScalarFieldEnum[] | ProfileRateScalarFieldEnum
    having?: ProfileRateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfileRateCountAggregateInputType | true
    _avg?: ProfileRateAvgAggregateInputType
    _sum?: ProfileRateSumAggregateInputType
    _min?: ProfileRateMinAggregateInputType
    _max?: ProfileRateMaxAggregateInputType
  }

  export type ProfileRateGroupByOutputType = {
    id: string
    profileId: string
    duration: string
    incall: number
    outcall: number
    order: number
    _count: ProfileRateCountAggregateOutputType | null
    _avg: ProfileRateAvgAggregateOutputType | null
    _sum: ProfileRateSumAggregateOutputType | null
    _min: ProfileRateMinAggregateOutputType | null
    _max: ProfileRateMaxAggregateOutputType | null
  }

  type GetProfileRateGroupByPayload<T extends ProfileRateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfileRateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfileRateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfileRateGroupByOutputType[P]>
            : GetScalarType<T[P], ProfileRateGroupByOutputType[P]>
        }
      >
    >


  export type ProfileRateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    duration?: boolean
    incall?: boolean
    outcall?: boolean
    order?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profileRate"]>



  export type ProfileRateSelectScalar = {
    id?: boolean
    profileId?: boolean
    duration?: boolean
    incall?: boolean
    outcall?: boolean
    order?: boolean
  }

  export type ProfileRateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "profileId" | "duration" | "incall" | "outcall" | "order", ExtArgs["result"]["profileRate"]>
  export type ProfileRateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
  }

  export type $ProfileRatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProfileRate"
    objects: {
      profile: Prisma.$ProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      profileId: string
      duration: string
      incall: number
      outcall: number
      order: number
    }, ExtArgs["result"]["profileRate"]>
    composites: {}
  }

  type ProfileRateGetPayload<S extends boolean | null | undefined | ProfileRateDefaultArgs> = $Result.GetResult<Prisma.$ProfileRatePayload, S>

  type ProfileRateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfileRateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfileRateCountAggregateInputType | true
    }

  export interface ProfileRateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProfileRate'], meta: { name: 'ProfileRate' } }
    /**
     * Find zero or one ProfileRate that matches the filter.
     * @param {ProfileRateFindUniqueArgs} args - Arguments to find a ProfileRate
     * @example
     * // Get one ProfileRate
     * const profileRate = await prisma.profileRate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfileRateFindUniqueArgs>(args: SelectSubset<T, ProfileRateFindUniqueArgs<ExtArgs>>): Prisma__ProfileRateClient<$Result.GetResult<Prisma.$ProfileRatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProfileRate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfileRateFindUniqueOrThrowArgs} args - Arguments to find a ProfileRate
     * @example
     * // Get one ProfileRate
     * const profileRate = await prisma.profileRate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfileRateFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfileRateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfileRateClient<$Result.GetResult<Prisma.$ProfileRatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfileRate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileRateFindFirstArgs} args - Arguments to find a ProfileRate
     * @example
     * // Get one ProfileRate
     * const profileRate = await prisma.profileRate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfileRateFindFirstArgs>(args?: SelectSubset<T, ProfileRateFindFirstArgs<ExtArgs>>): Prisma__ProfileRateClient<$Result.GetResult<Prisma.$ProfileRatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfileRate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileRateFindFirstOrThrowArgs} args - Arguments to find a ProfileRate
     * @example
     * // Get one ProfileRate
     * const profileRate = await prisma.profileRate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfileRateFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfileRateFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfileRateClient<$Result.GetResult<Prisma.$ProfileRatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProfileRates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileRateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProfileRates
     * const profileRates = await prisma.profileRate.findMany()
     * 
     * // Get first 10 ProfileRates
     * const profileRates = await prisma.profileRate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profileRateWithIdOnly = await prisma.profileRate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfileRateFindManyArgs>(args?: SelectSubset<T, ProfileRateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfileRatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProfileRate.
     * @param {ProfileRateCreateArgs} args - Arguments to create a ProfileRate.
     * @example
     * // Create one ProfileRate
     * const ProfileRate = await prisma.profileRate.create({
     *   data: {
     *     // ... data to create a ProfileRate
     *   }
     * })
     * 
     */
    create<T extends ProfileRateCreateArgs>(args: SelectSubset<T, ProfileRateCreateArgs<ExtArgs>>): Prisma__ProfileRateClient<$Result.GetResult<Prisma.$ProfileRatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProfileRates.
     * @param {ProfileRateCreateManyArgs} args - Arguments to create many ProfileRates.
     * @example
     * // Create many ProfileRates
     * const profileRate = await prisma.profileRate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfileRateCreateManyArgs>(args?: SelectSubset<T, ProfileRateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ProfileRate.
     * @param {ProfileRateDeleteArgs} args - Arguments to delete one ProfileRate.
     * @example
     * // Delete one ProfileRate
     * const ProfileRate = await prisma.profileRate.delete({
     *   where: {
     *     // ... filter to delete one ProfileRate
     *   }
     * })
     * 
     */
    delete<T extends ProfileRateDeleteArgs>(args: SelectSubset<T, ProfileRateDeleteArgs<ExtArgs>>): Prisma__ProfileRateClient<$Result.GetResult<Prisma.$ProfileRatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProfileRate.
     * @param {ProfileRateUpdateArgs} args - Arguments to update one ProfileRate.
     * @example
     * // Update one ProfileRate
     * const profileRate = await prisma.profileRate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfileRateUpdateArgs>(args: SelectSubset<T, ProfileRateUpdateArgs<ExtArgs>>): Prisma__ProfileRateClient<$Result.GetResult<Prisma.$ProfileRatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProfileRates.
     * @param {ProfileRateDeleteManyArgs} args - Arguments to filter ProfileRates to delete.
     * @example
     * // Delete a few ProfileRates
     * const { count } = await prisma.profileRate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfileRateDeleteManyArgs>(args?: SelectSubset<T, ProfileRateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProfileRates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileRateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProfileRates
     * const profileRate = await prisma.profileRate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfileRateUpdateManyArgs>(args: SelectSubset<T, ProfileRateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProfileRate.
     * @param {ProfileRateUpsertArgs} args - Arguments to update or create a ProfileRate.
     * @example
     * // Update or create a ProfileRate
     * const profileRate = await prisma.profileRate.upsert({
     *   create: {
     *     // ... data to create a ProfileRate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProfileRate we want to update
     *   }
     * })
     */
    upsert<T extends ProfileRateUpsertArgs>(args: SelectSubset<T, ProfileRateUpsertArgs<ExtArgs>>): Prisma__ProfileRateClient<$Result.GetResult<Prisma.$ProfileRatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProfileRates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileRateCountArgs} args - Arguments to filter ProfileRates to count.
     * @example
     * // Count the number of ProfileRates
     * const count = await prisma.profileRate.count({
     *   where: {
     *     // ... the filter for the ProfileRates we want to count
     *   }
     * })
    **/
    count<T extends ProfileRateCountArgs>(
      args?: Subset<T, ProfileRateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfileRateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProfileRate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileRateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProfileRateAggregateArgs>(args: Subset<T, ProfileRateAggregateArgs>): Prisma.PrismaPromise<GetProfileRateAggregateType<T>>

    /**
     * Group by ProfileRate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileRateGroupByArgs} args - Group by arguments.
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
      T extends ProfileRateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfileRateGroupByArgs['orderBy'] }
        : { orderBy?: ProfileRateGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProfileRateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfileRateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProfileRate model
   */
  readonly fields: ProfileRateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProfileRate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfileRateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProfileRate model
   */
  interface ProfileRateFieldRefs {
    readonly id: FieldRef<"ProfileRate", 'String'>
    readonly profileId: FieldRef<"ProfileRate", 'String'>
    readonly duration: FieldRef<"ProfileRate", 'String'>
    readonly incall: FieldRef<"ProfileRate", 'Int'>
    readonly outcall: FieldRef<"ProfileRate", 'Int'>
    readonly order: FieldRef<"ProfileRate", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ProfileRate findUnique
   */
  export type ProfileRateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileRate
     */
    select?: ProfileRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileRate
     */
    omit?: ProfileRateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileRateInclude<ExtArgs> | null
    /**
     * Filter, which ProfileRate to fetch.
     */
    where: ProfileRateWhereUniqueInput
  }

  /**
   * ProfileRate findUniqueOrThrow
   */
  export type ProfileRateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileRate
     */
    select?: ProfileRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileRate
     */
    omit?: ProfileRateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileRateInclude<ExtArgs> | null
    /**
     * Filter, which ProfileRate to fetch.
     */
    where: ProfileRateWhereUniqueInput
  }

  /**
   * ProfileRate findFirst
   */
  export type ProfileRateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileRate
     */
    select?: ProfileRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileRate
     */
    omit?: ProfileRateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileRateInclude<ExtArgs> | null
    /**
     * Filter, which ProfileRate to fetch.
     */
    where?: ProfileRateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfileRates to fetch.
     */
    orderBy?: ProfileRateOrderByWithRelationInput | ProfileRateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfileRates.
     */
    cursor?: ProfileRateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfileRates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfileRates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfileRates.
     */
    distinct?: ProfileRateScalarFieldEnum | ProfileRateScalarFieldEnum[]
  }

  /**
   * ProfileRate findFirstOrThrow
   */
  export type ProfileRateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileRate
     */
    select?: ProfileRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileRate
     */
    omit?: ProfileRateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileRateInclude<ExtArgs> | null
    /**
     * Filter, which ProfileRate to fetch.
     */
    where?: ProfileRateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfileRates to fetch.
     */
    orderBy?: ProfileRateOrderByWithRelationInput | ProfileRateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfileRates.
     */
    cursor?: ProfileRateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfileRates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfileRates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfileRates.
     */
    distinct?: ProfileRateScalarFieldEnum | ProfileRateScalarFieldEnum[]
  }

  /**
   * ProfileRate findMany
   */
  export type ProfileRateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileRate
     */
    select?: ProfileRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileRate
     */
    omit?: ProfileRateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileRateInclude<ExtArgs> | null
    /**
     * Filter, which ProfileRates to fetch.
     */
    where?: ProfileRateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfileRates to fetch.
     */
    orderBy?: ProfileRateOrderByWithRelationInput | ProfileRateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProfileRates.
     */
    cursor?: ProfileRateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfileRates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfileRates.
     */
    skip?: number
    distinct?: ProfileRateScalarFieldEnum | ProfileRateScalarFieldEnum[]
  }

  /**
   * ProfileRate create
   */
  export type ProfileRateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileRate
     */
    select?: ProfileRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileRate
     */
    omit?: ProfileRateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileRateInclude<ExtArgs> | null
    /**
     * The data needed to create a ProfileRate.
     */
    data: XOR<ProfileRateCreateInput, ProfileRateUncheckedCreateInput>
  }

  /**
   * ProfileRate createMany
   */
  export type ProfileRateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProfileRates.
     */
    data: ProfileRateCreateManyInput | ProfileRateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProfileRate update
   */
  export type ProfileRateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileRate
     */
    select?: ProfileRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileRate
     */
    omit?: ProfileRateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileRateInclude<ExtArgs> | null
    /**
     * The data needed to update a ProfileRate.
     */
    data: XOR<ProfileRateUpdateInput, ProfileRateUncheckedUpdateInput>
    /**
     * Choose, which ProfileRate to update.
     */
    where: ProfileRateWhereUniqueInput
  }

  /**
   * ProfileRate updateMany
   */
  export type ProfileRateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProfileRates.
     */
    data: XOR<ProfileRateUpdateManyMutationInput, ProfileRateUncheckedUpdateManyInput>
    /**
     * Filter which ProfileRates to update
     */
    where?: ProfileRateWhereInput
    /**
     * Limit how many ProfileRates to update.
     */
    limit?: number
  }

  /**
   * ProfileRate upsert
   */
  export type ProfileRateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileRate
     */
    select?: ProfileRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileRate
     */
    omit?: ProfileRateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileRateInclude<ExtArgs> | null
    /**
     * The filter to search for the ProfileRate to update in case it exists.
     */
    where: ProfileRateWhereUniqueInput
    /**
     * In case the ProfileRate found by the `where` argument doesn't exist, create a new ProfileRate with this data.
     */
    create: XOR<ProfileRateCreateInput, ProfileRateUncheckedCreateInput>
    /**
     * In case the ProfileRate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfileRateUpdateInput, ProfileRateUncheckedUpdateInput>
  }

  /**
   * ProfileRate delete
   */
  export type ProfileRateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileRate
     */
    select?: ProfileRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileRate
     */
    omit?: ProfileRateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileRateInclude<ExtArgs> | null
    /**
     * Filter which ProfileRate to delete.
     */
    where: ProfileRateWhereUniqueInput
  }

  /**
   * ProfileRate deleteMany
   */
  export type ProfileRateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfileRates to delete
     */
    where?: ProfileRateWhereInput
    /**
     * Limit how many ProfileRates to delete.
     */
    limit?: number
  }

  /**
   * ProfileRate without action
   */
  export type ProfileRateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileRate
     */
    select?: ProfileRateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileRate
     */
    omit?: ProfileRateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileRateInclude<ExtArgs> | null
  }


  /**
   * Model Report
   */

  export type AggregateReport = {
    _count: ReportCountAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  export type ReportMinAggregateOutputType = {
    id: string | null
    profileId: string | null
    reporterId: string | null
    category: string | null
    description: string | null
    status: string | null
    actionTaken: string | null
    ipAddress: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReportMaxAggregateOutputType = {
    id: string | null
    profileId: string | null
    reporterId: string | null
    category: string | null
    description: string | null
    status: string | null
    actionTaken: string | null
    ipAddress: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReportCountAggregateOutputType = {
    id: number
    profileId: number
    reporterId: number
    category: number
    description: number
    status: number
    actionTaken: number
    ipAddress: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ReportMinAggregateInputType = {
    id?: true
    profileId?: true
    reporterId?: true
    category?: true
    description?: true
    status?: true
    actionTaken?: true
    ipAddress?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReportMaxAggregateInputType = {
    id?: true
    profileId?: true
    reporterId?: true
    category?: true
    description?: true
    status?: true
    actionTaken?: true
    ipAddress?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReportCountAggregateInputType = {
    id?: true
    profileId?: true
    reporterId?: true
    category?: true
    description?: true
    status?: true
    actionTaken?: true
    ipAddress?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Report to aggregate.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reports
    **/
    _count?: true | ReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReportMaxAggregateInputType
  }

  export type GetReportAggregateType<T extends ReportAggregateArgs> = {
        [P in keyof T & keyof AggregateReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReport[P]>
      : GetScalarType<T[P], AggregateReport[P]>
  }




  export type ReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithAggregationInput | ReportOrderByWithAggregationInput[]
    by: ReportScalarFieldEnum[] | ReportScalarFieldEnum
    having?: ReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReportCountAggregateInputType | true
    _min?: ReportMinAggregateInputType
    _max?: ReportMaxAggregateInputType
  }

  export type ReportGroupByOutputType = {
    id: string
    profileId: string
    reporterId: string | null
    category: string
    description: string
    status: string
    actionTaken: string | null
    ipAddress: string | null
    createdAt: Date
    updatedAt: Date
    _count: ReportCountAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  type GetReportGroupByPayload<T extends ReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReportGroupByOutputType[P]>
            : GetScalarType<T[P], ReportGroupByOutputType[P]>
        }
      >
    >


  export type ReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    reporterId?: boolean
    category?: boolean
    description?: boolean
    status?: boolean
    actionTaken?: boolean
    ipAddress?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    reporter?: boolean | Report$reporterArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>



  export type ReportSelectScalar = {
    id?: boolean
    profileId?: boolean
    reporterId?: boolean
    category?: boolean
    description?: boolean
    status?: boolean
    actionTaken?: boolean
    ipAddress?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ReportOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "profileId" | "reporterId" | "category" | "description" | "status" | "actionTaken" | "ipAddress" | "createdAt" | "updatedAt", ExtArgs["result"]["report"]>
  export type ReportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | ProfileDefaultArgs<ExtArgs>
    reporter?: boolean | Report$reporterArgs<ExtArgs>
  }

  export type $ReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Report"
    objects: {
      profile: Prisma.$ProfilePayload<ExtArgs>
      reporter: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      profileId: string
      reporterId: string | null
      category: string
      description: string
      status: string
      actionTaken: string | null
      ipAddress: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["report"]>
    composites: {}
  }

  type ReportGetPayload<S extends boolean | null | undefined | ReportDefaultArgs> = $Result.GetResult<Prisma.$ReportPayload, S>

  type ReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReportCountAggregateInputType | true
    }

  export interface ReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Report'], meta: { name: 'Report' } }
    /**
     * Find zero or one Report that matches the filter.
     * @param {ReportFindUniqueArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReportFindUniqueArgs>(args: SelectSubset<T, ReportFindUniqueArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Report that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReportFindUniqueOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReportFindUniqueOrThrowArgs>(args: SelectSubset<T, ReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Report that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReportFindFirstArgs>(args?: SelectSubset<T, ReportFindFirstArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Report that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReportFindFirstOrThrowArgs>(args?: SelectSubset<T, ReportFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reports
     * const reports = await prisma.report.findMany()
     * 
     * // Get first 10 Reports
     * const reports = await prisma.report.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reportWithIdOnly = await prisma.report.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReportFindManyArgs>(args?: SelectSubset<T, ReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Report.
     * @param {ReportCreateArgs} args - Arguments to create a Report.
     * @example
     * // Create one Report
     * const Report = await prisma.report.create({
     *   data: {
     *     // ... data to create a Report
     *   }
     * })
     * 
     */
    create<T extends ReportCreateArgs>(args: SelectSubset<T, ReportCreateArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reports.
     * @param {ReportCreateManyArgs} args - Arguments to create many Reports.
     * @example
     * // Create many Reports
     * const report = await prisma.report.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReportCreateManyArgs>(args?: SelectSubset<T, ReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Report.
     * @param {ReportDeleteArgs} args - Arguments to delete one Report.
     * @example
     * // Delete one Report
     * const Report = await prisma.report.delete({
     *   where: {
     *     // ... filter to delete one Report
     *   }
     * })
     * 
     */
    delete<T extends ReportDeleteArgs>(args: SelectSubset<T, ReportDeleteArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Report.
     * @param {ReportUpdateArgs} args - Arguments to update one Report.
     * @example
     * // Update one Report
     * const report = await prisma.report.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReportUpdateArgs>(args: SelectSubset<T, ReportUpdateArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reports.
     * @param {ReportDeleteManyArgs} args - Arguments to filter Reports to delete.
     * @example
     * // Delete a few Reports
     * const { count } = await prisma.report.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReportDeleteManyArgs>(args?: SelectSubset<T, ReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reports
     * const report = await prisma.report.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReportUpdateManyArgs>(args: SelectSubset<T, ReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Report.
     * @param {ReportUpsertArgs} args - Arguments to update or create a Report.
     * @example
     * // Update or create a Report
     * const report = await prisma.report.upsert({
     *   create: {
     *     // ... data to create a Report
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Report we want to update
     *   }
     * })
     */
    upsert<T extends ReportUpsertArgs>(args: SelectSubset<T, ReportUpsertArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportCountArgs} args - Arguments to filter Reports to count.
     * @example
     * // Count the number of Reports
     * const count = await prisma.report.count({
     *   where: {
     *     // ... the filter for the Reports we want to count
     *   }
     * })
    **/
    count<T extends ReportCountArgs>(
      args?: Subset<T, ReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ReportAggregateArgs>(args: Subset<T, ReportAggregateArgs>): Prisma.PrismaPromise<GetReportAggregateType<T>>

    /**
     * Group by Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportGroupByArgs} args - Group by arguments.
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
      T extends ReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReportGroupByArgs['orderBy'] }
        : { orderBy?: ReportGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Report model
   */
  readonly fields: ReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Report.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    reporter<T extends Report$reporterArgs<ExtArgs> = {}>(args?: Subset<T, Report$reporterArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Report model
   */
  interface ReportFieldRefs {
    readonly id: FieldRef<"Report", 'String'>
    readonly profileId: FieldRef<"Report", 'String'>
    readonly reporterId: FieldRef<"Report", 'String'>
    readonly category: FieldRef<"Report", 'String'>
    readonly description: FieldRef<"Report", 'String'>
    readonly status: FieldRef<"Report", 'String'>
    readonly actionTaken: FieldRef<"Report", 'String'>
    readonly ipAddress: FieldRef<"Report", 'String'>
    readonly createdAt: FieldRef<"Report", 'DateTime'>
    readonly updatedAt: FieldRef<"Report", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Report findUnique
   */
  export type ReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report findUniqueOrThrow
   */
  export type ReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report findFirst
   */
  export type ReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report findFirstOrThrow
   */
  export type ReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report findMany
   */
  export type ReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Reports to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report create
   */
  export type ReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to create a Report.
     */
    data: XOR<ReportCreateInput, ReportUncheckedCreateInput>
  }

  /**
   * Report createMany
   */
  export type ReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reports.
     */
    data: ReportCreateManyInput | ReportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Report update
   */
  export type ReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to update a Report.
     */
    data: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
    /**
     * Choose, which Report to update.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report updateMany
   */
  export type ReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reports.
     */
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyInput>
    /**
     * Filter which Reports to update
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to update.
     */
    limit?: number
  }

  /**
   * Report upsert
   */
  export type ReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The filter to search for the Report to update in case it exists.
     */
    where: ReportWhereUniqueInput
    /**
     * In case the Report found by the `where` argument doesn't exist, create a new Report with this data.
     */
    create: XOR<ReportCreateInput, ReportUncheckedCreateInput>
    /**
     * In case the Report was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
  }

  /**
   * Report delete
   */
  export type ReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter which Report to delete.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report deleteMany
   */
  export type ReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reports to delete
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to delete.
     */
    limit?: number
  }

  /**
   * Report.reporter
   */
  export type Report$reporterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Report without action
   */
  export type ReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
  }


  /**
   * Model UserBlock
   */

  export type AggregateUserBlock = {
    _count: UserBlockCountAggregateOutputType | null
    _min: UserBlockMinAggregateOutputType | null
    _max: UserBlockMaxAggregateOutputType | null
  }

  export type UserBlockMinAggregateOutputType = {
    id: string | null
    blockerId: string | null
    blockedId: string | null
    createdAt: Date | null
  }

  export type UserBlockMaxAggregateOutputType = {
    id: string | null
    blockerId: string | null
    blockedId: string | null
    createdAt: Date | null
  }

  export type UserBlockCountAggregateOutputType = {
    id: number
    blockerId: number
    blockedId: number
    createdAt: number
    _all: number
  }


  export type UserBlockMinAggregateInputType = {
    id?: true
    blockerId?: true
    blockedId?: true
    createdAt?: true
  }

  export type UserBlockMaxAggregateInputType = {
    id?: true
    blockerId?: true
    blockedId?: true
    createdAt?: true
  }

  export type UserBlockCountAggregateInputType = {
    id?: true
    blockerId?: true
    blockedId?: true
    createdAt?: true
    _all?: true
  }

  export type UserBlockAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserBlock to aggregate.
     */
    where?: UserBlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserBlocks to fetch.
     */
    orderBy?: UserBlockOrderByWithRelationInput | UserBlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserBlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserBlocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserBlocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserBlocks
    **/
    _count?: true | UserBlockCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserBlockMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserBlockMaxAggregateInputType
  }

  export type GetUserBlockAggregateType<T extends UserBlockAggregateArgs> = {
        [P in keyof T & keyof AggregateUserBlock]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserBlock[P]>
      : GetScalarType<T[P], AggregateUserBlock[P]>
  }




  export type UserBlockGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserBlockWhereInput
    orderBy?: UserBlockOrderByWithAggregationInput | UserBlockOrderByWithAggregationInput[]
    by: UserBlockScalarFieldEnum[] | UserBlockScalarFieldEnum
    having?: UserBlockScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserBlockCountAggregateInputType | true
    _min?: UserBlockMinAggregateInputType
    _max?: UserBlockMaxAggregateInputType
  }

  export type UserBlockGroupByOutputType = {
    id: string
    blockerId: string
    blockedId: string
    createdAt: Date
    _count: UserBlockCountAggregateOutputType | null
    _min: UserBlockMinAggregateOutputType | null
    _max: UserBlockMaxAggregateOutputType | null
  }

  type GetUserBlockGroupByPayload<T extends UserBlockGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserBlockGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserBlockGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserBlockGroupByOutputType[P]>
            : GetScalarType<T[P], UserBlockGroupByOutputType[P]>
        }
      >
    >


  export type UserBlockSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    blockerId?: boolean
    blockedId?: boolean
    createdAt?: boolean
    blocker?: boolean | UserDefaultArgs<ExtArgs>
    blocked?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userBlock"]>



  export type UserBlockSelectScalar = {
    id?: boolean
    blockerId?: boolean
    blockedId?: boolean
    createdAt?: boolean
  }

  export type UserBlockOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "blockerId" | "blockedId" | "createdAt", ExtArgs["result"]["userBlock"]>
  export type UserBlockInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    blocker?: boolean | UserDefaultArgs<ExtArgs>
    blocked?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserBlockPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserBlock"
    objects: {
      blocker: Prisma.$UserPayload<ExtArgs>
      blocked: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      blockerId: string
      blockedId: string
      createdAt: Date
    }, ExtArgs["result"]["userBlock"]>
    composites: {}
  }

  type UserBlockGetPayload<S extends boolean | null | undefined | UserBlockDefaultArgs> = $Result.GetResult<Prisma.$UserBlockPayload, S>

  type UserBlockCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserBlockFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserBlockCountAggregateInputType | true
    }

  export interface UserBlockDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserBlock'], meta: { name: 'UserBlock' } }
    /**
     * Find zero or one UserBlock that matches the filter.
     * @param {UserBlockFindUniqueArgs} args - Arguments to find a UserBlock
     * @example
     * // Get one UserBlock
     * const userBlock = await prisma.userBlock.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserBlockFindUniqueArgs>(args: SelectSubset<T, UserBlockFindUniqueArgs<ExtArgs>>): Prisma__UserBlockClient<$Result.GetResult<Prisma.$UserBlockPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserBlock that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserBlockFindUniqueOrThrowArgs} args - Arguments to find a UserBlock
     * @example
     * // Get one UserBlock
     * const userBlock = await prisma.userBlock.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserBlockFindUniqueOrThrowArgs>(args: SelectSubset<T, UserBlockFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserBlockClient<$Result.GetResult<Prisma.$UserBlockPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserBlock that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBlockFindFirstArgs} args - Arguments to find a UserBlock
     * @example
     * // Get one UserBlock
     * const userBlock = await prisma.userBlock.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserBlockFindFirstArgs>(args?: SelectSubset<T, UserBlockFindFirstArgs<ExtArgs>>): Prisma__UserBlockClient<$Result.GetResult<Prisma.$UserBlockPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserBlock that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBlockFindFirstOrThrowArgs} args - Arguments to find a UserBlock
     * @example
     * // Get one UserBlock
     * const userBlock = await prisma.userBlock.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserBlockFindFirstOrThrowArgs>(args?: SelectSubset<T, UserBlockFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserBlockClient<$Result.GetResult<Prisma.$UserBlockPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserBlocks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBlockFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserBlocks
     * const userBlocks = await prisma.userBlock.findMany()
     * 
     * // Get first 10 UserBlocks
     * const userBlocks = await prisma.userBlock.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userBlockWithIdOnly = await prisma.userBlock.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserBlockFindManyArgs>(args?: SelectSubset<T, UserBlockFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserBlockPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserBlock.
     * @param {UserBlockCreateArgs} args - Arguments to create a UserBlock.
     * @example
     * // Create one UserBlock
     * const UserBlock = await prisma.userBlock.create({
     *   data: {
     *     // ... data to create a UserBlock
     *   }
     * })
     * 
     */
    create<T extends UserBlockCreateArgs>(args: SelectSubset<T, UserBlockCreateArgs<ExtArgs>>): Prisma__UserBlockClient<$Result.GetResult<Prisma.$UserBlockPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserBlocks.
     * @param {UserBlockCreateManyArgs} args - Arguments to create many UserBlocks.
     * @example
     * // Create many UserBlocks
     * const userBlock = await prisma.userBlock.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserBlockCreateManyArgs>(args?: SelectSubset<T, UserBlockCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UserBlock.
     * @param {UserBlockDeleteArgs} args - Arguments to delete one UserBlock.
     * @example
     * // Delete one UserBlock
     * const UserBlock = await prisma.userBlock.delete({
     *   where: {
     *     // ... filter to delete one UserBlock
     *   }
     * })
     * 
     */
    delete<T extends UserBlockDeleteArgs>(args: SelectSubset<T, UserBlockDeleteArgs<ExtArgs>>): Prisma__UserBlockClient<$Result.GetResult<Prisma.$UserBlockPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserBlock.
     * @param {UserBlockUpdateArgs} args - Arguments to update one UserBlock.
     * @example
     * // Update one UserBlock
     * const userBlock = await prisma.userBlock.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserBlockUpdateArgs>(args: SelectSubset<T, UserBlockUpdateArgs<ExtArgs>>): Prisma__UserBlockClient<$Result.GetResult<Prisma.$UserBlockPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserBlocks.
     * @param {UserBlockDeleteManyArgs} args - Arguments to filter UserBlocks to delete.
     * @example
     * // Delete a few UserBlocks
     * const { count } = await prisma.userBlock.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserBlockDeleteManyArgs>(args?: SelectSubset<T, UserBlockDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserBlocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBlockUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserBlocks
     * const userBlock = await prisma.userBlock.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserBlockUpdateManyArgs>(args: SelectSubset<T, UserBlockUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserBlock.
     * @param {UserBlockUpsertArgs} args - Arguments to update or create a UserBlock.
     * @example
     * // Update or create a UserBlock
     * const userBlock = await prisma.userBlock.upsert({
     *   create: {
     *     // ... data to create a UserBlock
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserBlock we want to update
     *   }
     * })
     */
    upsert<T extends UserBlockUpsertArgs>(args: SelectSubset<T, UserBlockUpsertArgs<ExtArgs>>): Prisma__UserBlockClient<$Result.GetResult<Prisma.$UserBlockPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserBlocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBlockCountArgs} args - Arguments to filter UserBlocks to count.
     * @example
     * // Count the number of UserBlocks
     * const count = await prisma.userBlock.count({
     *   where: {
     *     // ... the filter for the UserBlocks we want to count
     *   }
     * })
    **/
    count<T extends UserBlockCountArgs>(
      args?: Subset<T, UserBlockCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserBlockCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserBlock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBlockAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserBlockAggregateArgs>(args: Subset<T, UserBlockAggregateArgs>): Prisma.PrismaPromise<GetUserBlockAggregateType<T>>

    /**
     * Group by UserBlock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBlockGroupByArgs} args - Group by arguments.
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
      T extends UserBlockGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserBlockGroupByArgs['orderBy'] }
        : { orderBy?: UserBlockGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserBlockGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserBlockGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserBlock model
   */
  readonly fields: UserBlockFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserBlock.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserBlockClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    blocker<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    blocked<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserBlock model
   */
  interface UserBlockFieldRefs {
    readonly id: FieldRef<"UserBlock", 'String'>
    readonly blockerId: FieldRef<"UserBlock", 'String'>
    readonly blockedId: FieldRef<"UserBlock", 'String'>
    readonly createdAt: FieldRef<"UserBlock", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserBlock findUnique
   */
  export type UserBlockFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBlock
     */
    select?: UserBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBlock
     */
    omit?: UserBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBlockInclude<ExtArgs> | null
    /**
     * Filter, which UserBlock to fetch.
     */
    where: UserBlockWhereUniqueInput
  }

  /**
   * UserBlock findUniqueOrThrow
   */
  export type UserBlockFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBlock
     */
    select?: UserBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBlock
     */
    omit?: UserBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBlockInclude<ExtArgs> | null
    /**
     * Filter, which UserBlock to fetch.
     */
    where: UserBlockWhereUniqueInput
  }

  /**
   * UserBlock findFirst
   */
  export type UserBlockFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBlock
     */
    select?: UserBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBlock
     */
    omit?: UserBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBlockInclude<ExtArgs> | null
    /**
     * Filter, which UserBlock to fetch.
     */
    where?: UserBlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserBlocks to fetch.
     */
    orderBy?: UserBlockOrderByWithRelationInput | UserBlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserBlocks.
     */
    cursor?: UserBlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserBlocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserBlocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserBlocks.
     */
    distinct?: UserBlockScalarFieldEnum | UserBlockScalarFieldEnum[]
  }

  /**
   * UserBlock findFirstOrThrow
   */
  export type UserBlockFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBlock
     */
    select?: UserBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBlock
     */
    omit?: UserBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBlockInclude<ExtArgs> | null
    /**
     * Filter, which UserBlock to fetch.
     */
    where?: UserBlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserBlocks to fetch.
     */
    orderBy?: UserBlockOrderByWithRelationInput | UserBlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserBlocks.
     */
    cursor?: UserBlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserBlocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserBlocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserBlocks.
     */
    distinct?: UserBlockScalarFieldEnum | UserBlockScalarFieldEnum[]
  }

  /**
   * UserBlock findMany
   */
  export type UserBlockFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBlock
     */
    select?: UserBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBlock
     */
    omit?: UserBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBlockInclude<ExtArgs> | null
    /**
     * Filter, which UserBlocks to fetch.
     */
    where?: UserBlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserBlocks to fetch.
     */
    orderBy?: UserBlockOrderByWithRelationInput | UserBlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserBlocks.
     */
    cursor?: UserBlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserBlocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserBlocks.
     */
    skip?: number
    distinct?: UserBlockScalarFieldEnum | UserBlockScalarFieldEnum[]
  }

  /**
   * UserBlock create
   */
  export type UserBlockCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBlock
     */
    select?: UserBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBlock
     */
    omit?: UserBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBlockInclude<ExtArgs> | null
    /**
     * The data needed to create a UserBlock.
     */
    data: XOR<UserBlockCreateInput, UserBlockUncheckedCreateInput>
  }

  /**
   * UserBlock createMany
   */
  export type UserBlockCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserBlocks.
     */
    data: UserBlockCreateManyInput | UserBlockCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserBlock update
   */
  export type UserBlockUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBlock
     */
    select?: UserBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBlock
     */
    omit?: UserBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBlockInclude<ExtArgs> | null
    /**
     * The data needed to update a UserBlock.
     */
    data: XOR<UserBlockUpdateInput, UserBlockUncheckedUpdateInput>
    /**
     * Choose, which UserBlock to update.
     */
    where: UserBlockWhereUniqueInput
  }

  /**
   * UserBlock updateMany
   */
  export type UserBlockUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserBlocks.
     */
    data: XOR<UserBlockUpdateManyMutationInput, UserBlockUncheckedUpdateManyInput>
    /**
     * Filter which UserBlocks to update
     */
    where?: UserBlockWhereInput
    /**
     * Limit how many UserBlocks to update.
     */
    limit?: number
  }

  /**
   * UserBlock upsert
   */
  export type UserBlockUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBlock
     */
    select?: UserBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBlock
     */
    omit?: UserBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBlockInclude<ExtArgs> | null
    /**
     * The filter to search for the UserBlock to update in case it exists.
     */
    where: UserBlockWhereUniqueInput
    /**
     * In case the UserBlock found by the `where` argument doesn't exist, create a new UserBlock with this data.
     */
    create: XOR<UserBlockCreateInput, UserBlockUncheckedCreateInput>
    /**
     * In case the UserBlock was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserBlockUpdateInput, UserBlockUncheckedUpdateInput>
  }

  /**
   * UserBlock delete
   */
  export type UserBlockDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBlock
     */
    select?: UserBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBlock
     */
    omit?: UserBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBlockInclude<ExtArgs> | null
    /**
     * Filter which UserBlock to delete.
     */
    where: UserBlockWhereUniqueInput
  }

  /**
   * UserBlock deleteMany
   */
  export type UserBlockDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserBlocks to delete
     */
    where?: UserBlockWhereInput
    /**
     * Limit how many UserBlocks to delete.
     */
    limit?: number
  }

  /**
   * UserBlock without action
   */
  export type UserBlockDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBlock
     */
    select?: UserBlockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserBlock
     */
    omit?: UserBlockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBlockInclude<ExtArgs> | null
  }


  /**
   * Model ModerationAction
   */

  export type AggregateModerationAction = {
    _count: ModerationActionCountAggregateOutputType | null
    _min: ModerationActionMinAggregateOutputType | null
    _max: ModerationActionMaxAggregateOutputType | null
  }

  export type ModerationActionMinAggregateOutputType = {
    id: string | null
    moderatorId: string | null
    targetType: string | null
    targetId: string | null
    action: string | null
    reason: string | null
    createdAt: Date | null
  }

  export type ModerationActionMaxAggregateOutputType = {
    id: string | null
    moderatorId: string | null
    targetType: string | null
    targetId: string | null
    action: string | null
    reason: string | null
    createdAt: Date | null
  }

  export type ModerationActionCountAggregateOutputType = {
    id: number
    moderatorId: number
    targetType: number
    targetId: number
    action: number
    reason: number
    createdAt: number
    _all: number
  }


  export type ModerationActionMinAggregateInputType = {
    id?: true
    moderatorId?: true
    targetType?: true
    targetId?: true
    action?: true
    reason?: true
    createdAt?: true
  }

  export type ModerationActionMaxAggregateInputType = {
    id?: true
    moderatorId?: true
    targetType?: true
    targetId?: true
    action?: true
    reason?: true
    createdAt?: true
  }

  export type ModerationActionCountAggregateInputType = {
    id?: true
    moderatorId?: true
    targetType?: true
    targetId?: true
    action?: true
    reason?: true
    createdAt?: true
    _all?: true
  }

  export type ModerationActionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ModerationAction to aggregate.
     */
    where?: ModerationActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModerationActions to fetch.
     */
    orderBy?: ModerationActionOrderByWithRelationInput | ModerationActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ModerationActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModerationActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModerationActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ModerationActions
    **/
    _count?: true | ModerationActionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ModerationActionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ModerationActionMaxAggregateInputType
  }

  export type GetModerationActionAggregateType<T extends ModerationActionAggregateArgs> = {
        [P in keyof T & keyof AggregateModerationAction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateModerationAction[P]>
      : GetScalarType<T[P], AggregateModerationAction[P]>
  }




  export type ModerationActionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ModerationActionWhereInput
    orderBy?: ModerationActionOrderByWithAggregationInput | ModerationActionOrderByWithAggregationInput[]
    by: ModerationActionScalarFieldEnum[] | ModerationActionScalarFieldEnum
    having?: ModerationActionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ModerationActionCountAggregateInputType | true
    _min?: ModerationActionMinAggregateInputType
    _max?: ModerationActionMaxAggregateInputType
  }

  export type ModerationActionGroupByOutputType = {
    id: string
    moderatorId: string
    targetType: string
    targetId: string
    action: string
    reason: string | null
    createdAt: Date
    _count: ModerationActionCountAggregateOutputType | null
    _min: ModerationActionMinAggregateOutputType | null
    _max: ModerationActionMaxAggregateOutputType | null
  }

  type GetModerationActionGroupByPayload<T extends ModerationActionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ModerationActionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ModerationActionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ModerationActionGroupByOutputType[P]>
            : GetScalarType<T[P], ModerationActionGroupByOutputType[P]>
        }
      >
    >


  export type ModerationActionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    moderatorId?: boolean
    targetType?: boolean
    targetId?: boolean
    action?: boolean
    reason?: boolean
    createdAt?: boolean
    moderator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["moderationAction"]>



  export type ModerationActionSelectScalar = {
    id?: boolean
    moderatorId?: boolean
    targetType?: boolean
    targetId?: boolean
    action?: boolean
    reason?: boolean
    createdAt?: boolean
  }

  export type ModerationActionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "moderatorId" | "targetType" | "targetId" | "action" | "reason" | "createdAt", ExtArgs["result"]["moderationAction"]>
  export type ModerationActionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    moderator?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ModerationActionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ModerationAction"
    objects: {
      moderator: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      moderatorId: string
      targetType: string
      targetId: string
      action: string
      reason: string | null
      createdAt: Date
    }, ExtArgs["result"]["moderationAction"]>
    composites: {}
  }

  type ModerationActionGetPayload<S extends boolean | null | undefined | ModerationActionDefaultArgs> = $Result.GetResult<Prisma.$ModerationActionPayload, S>

  type ModerationActionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ModerationActionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ModerationActionCountAggregateInputType | true
    }

  export interface ModerationActionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ModerationAction'], meta: { name: 'ModerationAction' } }
    /**
     * Find zero or one ModerationAction that matches the filter.
     * @param {ModerationActionFindUniqueArgs} args - Arguments to find a ModerationAction
     * @example
     * // Get one ModerationAction
     * const moderationAction = await prisma.moderationAction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ModerationActionFindUniqueArgs>(args: SelectSubset<T, ModerationActionFindUniqueArgs<ExtArgs>>): Prisma__ModerationActionClient<$Result.GetResult<Prisma.$ModerationActionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ModerationAction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ModerationActionFindUniqueOrThrowArgs} args - Arguments to find a ModerationAction
     * @example
     * // Get one ModerationAction
     * const moderationAction = await prisma.moderationAction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ModerationActionFindUniqueOrThrowArgs>(args: SelectSubset<T, ModerationActionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ModerationActionClient<$Result.GetResult<Prisma.$ModerationActionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ModerationAction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModerationActionFindFirstArgs} args - Arguments to find a ModerationAction
     * @example
     * // Get one ModerationAction
     * const moderationAction = await prisma.moderationAction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ModerationActionFindFirstArgs>(args?: SelectSubset<T, ModerationActionFindFirstArgs<ExtArgs>>): Prisma__ModerationActionClient<$Result.GetResult<Prisma.$ModerationActionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ModerationAction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModerationActionFindFirstOrThrowArgs} args - Arguments to find a ModerationAction
     * @example
     * // Get one ModerationAction
     * const moderationAction = await prisma.moderationAction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ModerationActionFindFirstOrThrowArgs>(args?: SelectSubset<T, ModerationActionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ModerationActionClient<$Result.GetResult<Prisma.$ModerationActionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ModerationActions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModerationActionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ModerationActions
     * const moderationActions = await prisma.moderationAction.findMany()
     * 
     * // Get first 10 ModerationActions
     * const moderationActions = await prisma.moderationAction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const moderationActionWithIdOnly = await prisma.moderationAction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ModerationActionFindManyArgs>(args?: SelectSubset<T, ModerationActionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModerationActionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ModerationAction.
     * @param {ModerationActionCreateArgs} args - Arguments to create a ModerationAction.
     * @example
     * // Create one ModerationAction
     * const ModerationAction = await prisma.moderationAction.create({
     *   data: {
     *     // ... data to create a ModerationAction
     *   }
     * })
     * 
     */
    create<T extends ModerationActionCreateArgs>(args: SelectSubset<T, ModerationActionCreateArgs<ExtArgs>>): Prisma__ModerationActionClient<$Result.GetResult<Prisma.$ModerationActionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ModerationActions.
     * @param {ModerationActionCreateManyArgs} args - Arguments to create many ModerationActions.
     * @example
     * // Create many ModerationActions
     * const moderationAction = await prisma.moderationAction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ModerationActionCreateManyArgs>(args?: SelectSubset<T, ModerationActionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ModerationAction.
     * @param {ModerationActionDeleteArgs} args - Arguments to delete one ModerationAction.
     * @example
     * // Delete one ModerationAction
     * const ModerationAction = await prisma.moderationAction.delete({
     *   where: {
     *     // ... filter to delete one ModerationAction
     *   }
     * })
     * 
     */
    delete<T extends ModerationActionDeleteArgs>(args: SelectSubset<T, ModerationActionDeleteArgs<ExtArgs>>): Prisma__ModerationActionClient<$Result.GetResult<Prisma.$ModerationActionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ModerationAction.
     * @param {ModerationActionUpdateArgs} args - Arguments to update one ModerationAction.
     * @example
     * // Update one ModerationAction
     * const moderationAction = await prisma.moderationAction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ModerationActionUpdateArgs>(args: SelectSubset<T, ModerationActionUpdateArgs<ExtArgs>>): Prisma__ModerationActionClient<$Result.GetResult<Prisma.$ModerationActionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ModerationActions.
     * @param {ModerationActionDeleteManyArgs} args - Arguments to filter ModerationActions to delete.
     * @example
     * // Delete a few ModerationActions
     * const { count } = await prisma.moderationAction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ModerationActionDeleteManyArgs>(args?: SelectSubset<T, ModerationActionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ModerationActions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModerationActionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ModerationActions
     * const moderationAction = await prisma.moderationAction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ModerationActionUpdateManyArgs>(args: SelectSubset<T, ModerationActionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ModerationAction.
     * @param {ModerationActionUpsertArgs} args - Arguments to update or create a ModerationAction.
     * @example
     * // Update or create a ModerationAction
     * const moderationAction = await prisma.moderationAction.upsert({
     *   create: {
     *     // ... data to create a ModerationAction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ModerationAction we want to update
     *   }
     * })
     */
    upsert<T extends ModerationActionUpsertArgs>(args: SelectSubset<T, ModerationActionUpsertArgs<ExtArgs>>): Prisma__ModerationActionClient<$Result.GetResult<Prisma.$ModerationActionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ModerationActions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModerationActionCountArgs} args - Arguments to filter ModerationActions to count.
     * @example
     * // Count the number of ModerationActions
     * const count = await prisma.moderationAction.count({
     *   where: {
     *     // ... the filter for the ModerationActions we want to count
     *   }
     * })
    **/
    count<T extends ModerationActionCountArgs>(
      args?: Subset<T, ModerationActionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ModerationActionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ModerationAction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModerationActionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ModerationActionAggregateArgs>(args: Subset<T, ModerationActionAggregateArgs>): Prisma.PrismaPromise<GetModerationActionAggregateType<T>>

    /**
     * Group by ModerationAction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModerationActionGroupByArgs} args - Group by arguments.
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
      T extends ModerationActionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ModerationActionGroupByArgs['orderBy'] }
        : { orderBy?: ModerationActionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ModerationActionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetModerationActionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ModerationAction model
   */
  readonly fields: ModerationActionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ModerationAction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ModerationActionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    moderator<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ModerationAction model
   */
  interface ModerationActionFieldRefs {
    readonly id: FieldRef<"ModerationAction", 'String'>
    readonly moderatorId: FieldRef<"ModerationAction", 'String'>
    readonly targetType: FieldRef<"ModerationAction", 'String'>
    readonly targetId: FieldRef<"ModerationAction", 'String'>
    readonly action: FieldRef<"ModerationAction", 'String'>
    readonly reason: FieldRef<"ModerationAction", 'String'>
    readonly createdAt: FieldRef<"ModerationAction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ModerationAction findUnique
   */
  export type ModerationActionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationAction
     */
    select?: ModerationActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationAction
     */
    omit?: ModerationActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationActionInclude<ExtArgs> | null
    /**
     * Filter, which ModerationAction to fetch.
     */
    where: ModerationActionWhereUniqueInput
  }

  /**
   * ModerationAction findUniqueOrThrow
   */
  export type ModerationActionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationAction
     */
    select?: ModerationActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationAction
     */
    omit?: ModerationActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationActionInclude<ExtArgs> | null
    /**
     * Filter, which ModerationAction to fetch.
     */
    where: ModerationActionWhereUniqueInput
  }

  /**
   * ModerationAction findFirst
   */
  export type ModerationActionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationAction
     */
    select?: ModerationActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationAction
     */
    omit?: ModerationActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationActionInclude<ExtArgs> | null
    /**
     * Filter, which ModerationAction to fetch.
     */
    where?: ModerationActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModerationActions to fetch.
     */
    orderBy?: ModerationActionOrderByWithRelationInput | ModerationActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ModerationActions.
     */
    cursor?: ModerationActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModerationActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModerationActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ModerationActions.
     */
    distinct?: ModerationActionScalarFieldEnum | ModerationActionScalarFieldEnum[]
  }

  /**
   * ModerationAction findFirstOrThrow
   */
  export type ModerationActionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationAction
     */
    select?: ModerationActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationAction
     */
    omit?: ModerationActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationActionInclude<ExtArgs> | null
    /**
     * Filter, which ModerationAction to fetch.
     */
    where?: ModerationActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModerationActions to fetch.
     */
    orderBy?: ModerationActionOrderByWithRelationInput | ModerationActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ModerationActions.
     */
    cursor?: ModerationActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModerationActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModerationActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ModerationActions.
     */
    distinct?: ModerationActionScalarFieldEnum | ModerationActionScalarFieldEnum[]
  }

  /**
   * ModerationAction findMany
   */
  export type ModerationActionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationAction
     */
    select?: ModerationActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationAction
     */
    omit?: ModerationActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationActionInclude<ExtArgs> | null
    /**
     * Filter, which ModerationActions to fetch.
     */
    where?: ModerationActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModerationActions to fetch.
     */
    orderBy?: ModerationActionOrderByWithRelationInput | ModerationActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ModerationActions.
     */
    cursor?: ModerationActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModerationActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModerationActions.
     */
    skip?: number
    distinct?: ModerationActionScalarFieldEnum | ModerationActionScalarFieldEnum[]
  }

  /**
   * ModerationAction create
   */
  export type ModerationActionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationAction
     */
    select?: ModerationActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationAction
     */
    omit?: ModerationActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationActionInclude<ExtArgs> | null
    /**
     * The data needed to create a ModerationAction.
     */
    data: XOR<ModerationActionCreateInput, ModerationActionUncheckedCreateInput>
  }

  /**
   * ModerationAction createMany
   */
  export type ModerationActionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ModerationActions.
     */
    data: ModerationActionCreateManyInput | ModerationActionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ModerationAction update
   */
  export type ModerationActionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationAction
     */
    select?: ModerationActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationAction
     */
    omit?: ModerationActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationActionInclude<ExtArgs> | null
    /**
     * The data needed to update a ModerationAction.
     */
    data: XOR<ModerationActionUpdateInput, ModerationActionUncheckedUpdateInput>
    /**
     * Choose, which ModerationAction to update.
     */
    where: ModerationActionWhereUniqueInput
  }

  /**
   * ModerationAction updateMany
   */
  export type ModerationActionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ModerationActions.
     */
    data: XOR<ModerationActionUpdateManyMutationInput, ModerationActionUncheckedUpdateManyInput>
    /**
     * Filter which ModerationActions to update
     */
    where?: ModerationActionWhereInput
    /**
     * Limit how many ModerationActions to update.
     */
    limit?: number
  }

  /**
   * ModerationAction upsert
   */
  export type ModerationActionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationAction
     */
    select?: ModerationActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationAction
     */
    omit?: ModerationActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationActionInclude<ExtArgs> | null
    /**
     * The filter to search for the ModerationAction to update in case it exists.
     */
    where: ModerationActionWhereUniqueInput
    /**
     * In case the ModerationAction found by the `where` argument doesn't exist, create a new ModerationAction with this data.
     */
    create: XOR<ModerationActionCreateInput, ModerationActionUncheckedCreateInput>
    /**
     * In case the ModerationAction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ModerationActionUpdateInput, ModerationActionUncheckedUpdateInput>
  }

  /**
   * ModerationAction delete
   */
  export type ModerationActionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationAction
     */
    select?: ModerationActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationAction
     */
    omit?: ModerationActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationActionInclude<ExtArgs> | null
    /**
     * Filter which ModerationAction to delete.
     */
    where: ModerationActionWhereUniqueInput
  }

  /**
   * ModerationAction deleteMany
   */
  export type ModerationActionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ModerationActions to delete
     */
    where?: ModerationActionWhereInput
    /**
     * Limit how many ModerationActions to delete.
     */
    limit?: number
  }

  /**
   * ModerationAction without action
   */
  export type ModerationActionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModerationAction
     */
    select?: ModerationActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModerationAction
     */
    omit?: ModerationActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModerationActionInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    action: string | null
    details: string | null
    ipAddress: string | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    action: string | null
    details: string | null
    ipAddress: string | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    userId: number
    action: number
    details: number
    ipAddress: number
    createdAt: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    details?: true
    ipAddress?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    details?: true
    ipAddress?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    details?: true
    ipAddress?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    userId: string | null
    action: string
    details: string | null
    ipAddress: string | null
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    details?: boolean
    ipAddress?: boolean
    createdAt?: boolean
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>



  export type AuditLogSelectScalar = {
    id?: boolean
    userId?: boolean
    action?: boolean
    details?: boolean
    ipAddress?: boolean
    createdAt?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "action" | "details" | "ipAddress" | "createdAt", ExtArgs["result"]["auditLog"]>
  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      action: string
      details: string | null
      ipAddress: string | null
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
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
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends AuditLog$userArgs<ExtArgs> = {}>(args?: Subset<T, AuditLog$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly userId: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly details: FieldRef<"AuditLog", 'String'>
    readonly ipAddress: FieldRef<"AuditLog", 'String'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog.user
   */
  export type AuditLog$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Model ContactMessage
   */

  export type AggregateContactMessage = {
    _count: ContactMessageCountAggregateOutputType | null
    _min: ContactMessageMinAggregateOutputType | null
    _max: ContactMessageMaxAggregateOutputType | null
  }

  export type ContactMessageMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    message: string | null
    status: string | null
    ipAddress: string | null
    createdAt: Date | null
  }

  export type ContactMessageMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    message: string | null
    status: string | null
    ipAddress: string | null
    createdAt: Date | null
  }

  export type ContactMessageCountAggregateOutputType = {
    id: number
    name: number
    email: number
    message: number
    status: number
    ipAddress: number
    createdAt: number
    _all: number
  }


  export type ContactMessageMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    message?: true
    status?: true
    ipAddress?: true
    createdAt?: true
  }

  export type ContactMessageMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    message?: true
    status?: true
    ipAddress?: true
    createdAt?: true
  }

  export type ContactMessageCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    message?: true
    status?: true
    ipAddress?: true
    createdAt?: true
    _all?: true
  }

  export type ContactMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContactMessage to aggregate.
     */
    where?: ContactMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactMessages to fetch.
     */
    orderBy?: ContactMessageOrderByWithRelationInput | ContactMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContactMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ContactMessages
    **/
    _count?: true | ContactMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContactMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContactMessageMaxAggregateInputType
  }

  export type GetContactMessageAggregateType<T extends ContactMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateContactMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContactMessage[P]>
      : GetScalarType<T[P], AggregateContactMessage[P]>
  }




  export type ContactMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContactMessageWhereInput
    orderBy?: ContactMessageOrderByWithAggregationInput | ContactMessageOrderByWithAggregationInput[]
    by: ContactMessageScalarFieldEnum[] | ContactMessageScalarFieldEnum
    having?: ContactMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContactMessageCountAggregateInputType | true
    _min?: ContactMessageMinAggregateInputType
    _max?: ContactMessageMaxAggregateInputType
  }

  export type ContactMessageGroupByOutputType = {
    id: string
    name: string
    email: string
    message: string
    status: string
    ipAddress: string | null
    createdAt: Date
    _count: ContactMessageCountAggregateOutputType | null
    _min: ContactMessageMinAggregateOutputType | null
    _max: ContactMessageMaxAggregateOutputType | null
  }

  type GetContactMessageGroupByPayload<T extends ContactMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContactMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContactMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContactMessageGroupByOutputType[P]>
            : GetScalarType<T[P], ContactMessageGroupByOutputType[P]>
        }
      >
    >


  export type ContactMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    message?: boolean
    status?: boolean
    ipAddress?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["contactMessage"]>



  export type ContactMessageSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    message?: boolean
    status?: boolean
    ipAddress?: boolean
    createdAt?: boolean
  }

  export type ContactMessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "message" | "status" | "ipAddress" | "createdAt", ExtArgs["result"]["contactMessage"]>

  export type $ContactMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ContactMessage"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      message: string
      status: string
      ipAddress: string | null
      createdAt: Date
    }, ExtArgs["result"]["contactMessage"]>
    composites: {}
  }

  type ContactMessageGetPayload<S extends boolean | null | undefined | ContactMessageDefaultArgs> = $Result.GetResult<Prisma.$ContactMessagePayload, S>

  type ContactMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContactMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContactMessageCountAggregateInputType | true
    }

  export interface ContactMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ContactMessage'], meta: { name: 'ContactMessage' } }
    /**
     * Find zero or one ContactMessage that matches the filter.
     * @param {ContactMessageFindUniqueArgs} args - Arguments to find a ContactMessage
     * @example
     * // Get one ContactMessage
     * const contactMessage = await prisma.contactMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContactMessageFindUniqueArgs>(args: SelectSubset<T, ContactMessageFindUniqueArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ContactMessage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContactMessageFindUniqueOrThrowArgs} args - Arguments to find a ContactMessage
     * @example
     * // Get one ContactMessage
     * const contactMessage = await prisma.contactMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContactMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, ContactMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContactMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageFindFirstArgs} args - Arguments to find a ContactMessage
     * @example
     * // Get one ContactMessage
     * const contactMessage = await prisma.contactMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContactMessageFindFirstArgs>(args?: SelectSubset<T, ContactMessageFindFirstArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContactMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageFindFirstOrThrowArgs} args - Arguments to find a ContactMessage
     * @example
     * // Get one ContactMessage
     * const contactMessage = await prisma.contactMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContactMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, ContactMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ContactMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ContactMessages
     * const contactMessages = await prisma.contactMessage.findMany()
     * 
     * // Get first 10 ContactMessages
     * const contactMessages = await prisma.contactMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contactMessageWithIdOnly = await prisma.contactMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContactMessageFindManyArgs>(args?: SelectSubset<T, ContactMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ContactMessage.
     * @param {ContactMessageCreateArgs} args - Arguments to create a ContactMessage.
     * @example
     * // Create one ContactMessage
     * const ContactMessage = await prisma.contactMessage.create({
     *   data: {
     *     // ... data to create a ContactMessage
     *   }
     * })
     * 
     */
    create<T extends ContactMessageCreateArgs>(args: SelectSubset<T, ContactMessageCreateArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ContactMessages.
     * @param {ContactMessageCreateManyArgs} args - Arguments to create many ContactMessages.
     * @example
     * // Create many ContactMessages
     * const contactMessage = await prisma.contactMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContactMessageCreateManyArgs>(args?: SelectSubset<T, ContactMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ContactMessage.
     * @param {ContactMessageDeleteArgs} args - Arguments to delete one ContactMessage.
     * @example
     * // Delete one ContactMessage
     * const ContactMessage = await prisma.contactMessage.delete({
     *   where: {
     *     // ... filter to delete one ContactMessage
     *   }
     * })
     * 
     */
    delete<T extends ContactMessageDeleteArgs>(args: SelectSubset<T, ContactMessageDeleteArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ContactMessage.
     * @param {ContactMessageUpdateArgs} args - Arguments to update one ContactMessage.
     * @example
     * // Update one ContactMessage
     * const contactMessage = await prisma.contactMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContactMessageUpdateArgs>(args: SelectSubset<T, ContactMessageUpdateArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ContactMessages.
     * @param {ContactMessageDeleteManyArgs} args - Arguments to filter ContactMessages to delete.
     * @example
     * // Delete a few ContactMessages
     * const { count } = await prisma.contactMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContactMessageDeleteManyArgs>(args?: SelectSubset<T, ContactMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContactMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ContactMessages
     * const contactMessage = await prisma.contactMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContactMessageUpdateManyArgs>(args: SelectSubset<T, ContactMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ContactMessage.
     * @param {ContactMessageUpsertArgs} args - Arguments to update or create a ContactMessage.
     * @example
     * // Update or create a ContactMessage
     * const contactMessage = await prisma.contactMessage.upsert({
     *   create: {
     *     // ... data to create a ContactMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ContactMessage we want to update
     *   }
     * })
     */
    upsert<T extends ContactMessageUpsertArgs>(args: SelectSubset<T, ContactMessageUpsertArgs<ExtArgs>>): Prisma__ContactMessageClient<$Result.GetResult<Prisma.$ContactMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ContactMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageCountArgs} args - Arguments to filter ContactMessages to count.
     * @example
     * // Count the number of ContactMessages
     * const count = await prisma.contactMessage.count({
     *   where: {
     *     // ... the filter for the ContactMessages we want to count
     *   }
     * })
    **/
    count<T extends ContactMessageCountArgs>(
      args?: Subset<T, ContactMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContactMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ContactMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ContactMessageAggregateArgs>(args: Subset<T, ContactMessageAggregateArgs>): Prisma.PrismaPromise<GetContactMessageAggregateType<T>>

    /**
     * Group by ContactMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactMessageGroupByArgs} args - Group by arguments.
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
      T extends ContactMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContactMessageGroupByArgs['orderBy'] }
        : { orderBy?: ContactMessageGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ContactMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContactMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ContactMessage model
   */
  readonly fields: ContactMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ContactMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContactMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ContactMessage model
   */
  interface ContactMessageFieldRefs {
    readonly id: FieldRef<"ContactMessage", 'String'>
    readonly name: FieldRef<"ContactMessage", 'String'>
    readonly email: FieldRef<"ContactMessage", 'String'>
    readonly message: FieldRef<"ContactMessage", 'String'>
    readonly status: FieldRef<"ContactMessage", 'String'>
    readonly ipAddress: FieldRef<"ContactMessage", 'String'>
    readonly createdAt: FieldRef<"ContactMessage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ContactMessage findUnique
   */
  export type ContactMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * Filter, which ContactMessage to fetch.
     */
    where: ContactMessageWhereUniqueInput
  }

  /**
   * ContactMessage findUniqueOrThrow
   */
  export type ContactMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * Filter, which ContactMessage to fetch.
     */
    where: ContactMessageWhereUniqueInput
  }

  /**
   * ContactMessage findFirst
   */
  export type ContactMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * Filter, which ContactMessage to fetch.
     */
    where?: ContactMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactMessages to fetch.
     */
    orderBy?: ContactMessageOrderByWithRelationInput | ContactMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContactMessages.
     */
    cursor?: ContactMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContactMessages.
     */
    distinct?: ContactMessageScalarFieldEnum | ContactMessageScalarFieldEnum[]
  }

  /**
   * ContactMessage findFirstOrThrow
   */
  export type ContactMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * Filter, which ContactMessage to fetch.
     */
    where?: ContactMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactMessages to fetch.
     */
    orderBy?: ContactMessageOrderByWithRelationInput | ContactMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContactMessages.
     */
    cursor?: ContactMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContactMessages.
     */
    distinct?: ContactMessageScalarFieldEnum | ContactMessageScalarFieldEnum[]
  }

  /**
   * ContactMessage findMany
   */
  export type ContactMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * Filter, which ContactMessages to fetch.
     */
    where?: ContactMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContactMessages to fetch.
     */
    orderBy?: ContactMessageOrderByWithRelationInput | ContactMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ContactMessages.
     */
    cursor?: ContactMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContactMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContactMessages.
     */
    skip?: number
    distinct?: ContactMessageScalarFieldEnum | ContactMessageScalarFieldEnum[]
  }

  /**
   * ContactMessage create
   */
  export type ContactMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * The data needed to create a ContactMessage.
     */
    data: XOR<ContactMessageCreateInput, ContactMessageUncheckedCreateInput>
  }

  /**
   * ContactMessage createMany
   */
  export type ContactMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ContactMessages.
     */
    data: ContactMessageCreateManyInput | ContactMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ContactMessage update
   */
  export type ContactMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * The data needed to update a ContactMessage.
     */
    data: XOR<ContactMessageUpdateInput, ContactMessageUncheckedUpdateInput>
    /**
     * Choose, which ContactMessage to update.
     */
    where: ContactMessageWhereUniqueInput
  }

  /**
   * ContactMessage updateMany
   */
  export type ContactMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ContactMessages.
     */
    data: XOR<ContactMessageUpdateManyMutationInput, ContactMessageUncheckedUpdateManyInput>
    /**
     * Filter which ContactMessages to update
     */
    where?: ContactMessageWhereInput
    /**
     * Limit how many ContactMessages to update.
     */
    limit?: number
  }

  /**
   * ContactMessage upsert
   */
  export type ContactMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * The filter to search for the ContactMessage to update in case it exists.
     */
    where: ContactMessageWhereUniqueInput
    /**
     * In case the ContactMessage found by the `where` argument doesn't exist, create a new ContactMessage with this data.
     */
    create: XOR<ContactMessageCreateInput, ContactMessageUncheckedCreateInput>
    /**
     * In case the ContactMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContactMessageUpdateInput, ContactMessageUncheckedUpdateInput>
  }

  /**
   * ContactMessage delete
   */
  export type ContactMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
    /**
     * Filter which ContactMessage to delete.
     */
    where: ContactMessageWhereUniqueInput
  }

  /**
   * ContactMessage deleteMany
   */
  export type ContactMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContactMessages to delete
     */
    where?: ContactMessageWhereInput
    /**
     * Limit how many ContactMessages to delete.
     */
    limit?: number
  }

  /**
   * ContactMessage without action
   */
  export type ContactMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactMessage
     */
    select?: ContactMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContactMessage
     */
    omit?: ContactMessageOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    isSuspended: 'isSuspended',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    status: 'status',
    visibility: 'visibility',
    moderationNotes: 'moderationNotes',
    rejectionReason: 'rejectionReason',
    ageConfirmed: 'ageConfirmed',
    consentRecorded: 'consentRecorded',
    consentTimestamp: 'consentTimestamp',
    consentVersion: 'consentVersion',
    photoUrl: 'photoUrl',
    bio: 'bio',
    address: 'address',
    city: 'city',
    region: 'region',
    district: 'district',
    localArea: 'localArea',
    country: 'country',
    favColor: 'favColor',
    phone: 'phone',
    whatsapp: 'whatsapp',
    hidePhoneFromPublic: 'hidePhoneFromPublic',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProfileScalarFieldEnum = (typeof ProfileScalarFieldEnum)[keyof typeof ProfileScalarFieldEnum]


  export const ProfilePhotoScalarFieldEnum: {
    id: 'id',
    profileId: 'profileId',
    url: 'url',
    sha256Hash: 'sha256Hash',
    order: 'order',
    isPrimary: 'isPrimary',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type ProfilePhotoScalarFieldEnum = (typeof ProfilePhotoScalarFieldEnum)[keyof typeof ProfilePhotoScalarFieldEnum]


  export const ProfileRateScalarFieldEnum: {
    id: 'id',
    profileId: 'profileId',
    duration: 'duration',
    incall: 'incall',
    outcall: 'outcall',
    order: 'order'
  };

  export type ProfileRateScalarFieldEnum = (typeof ProfileRateScalarFieldEnum)[keyof typeof ProfileRateScalarFieldEnum]


  export const ReportScalarFieldEnum: {
    id: 'id',
    profileId: 'profileId',
    reporterId: 'reporterId',
    category: 'category',
    description: 'description',
    status: 'status',
    actionTaken: 'actionTaken',
    ipAddress: 'ipAddress',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ReportScalarFieldEnum = (typeof ReportScalarFieldEnum)[keyof typeof ReportScalarFieldEnum]


  export const UserBlockScalarFieldEnum: {
    id: 'id',
    blockerId: 'blockerId',
    blockedId: 'blockedId',
    createdAt: 'createdAt'
  };

  export type UserBlockScalarFieldEnum = (typeof UserBlockScalarFieldEnum)[keyof typeof UserBlockScalarFieldEnum]


  export const ModerationActionScalarFieldEnum: {
    id: 'id',
    moderatorId: 'moderatorId',
    targetType: 'targetType',
    targetId: 'targetId',
    action: 'action',
    reason: 'reason',
    createdAt: 'createdAt'
  };

  export type ModerationActionScalarFieldEnum = (typeof ModerationActionScalarFieldEnum)[keyof typeof ModerationActionScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    action: 'action',
    details: 'details',
    ipAddress: 'ipAddress',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const ContactMessageScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    message: 'message',
    status: 'status',
    ipAddress: 'ipAddress',
    createdAt: 'createdAt'
  };

  export type ContactMessageScalarFieldEnum = (typeof ContactMessageScalarFieldEnum)[keyof typeof ContactMessageScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const UserOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const ProfileOrderByRelevanceFieldEnum: {
    id: 'id',
    userId: 'userId',
    status: 'status',
    visibility: 'visibility',
    moderationNotes: 'moderationNotes',
    rejectionReason: 'rejectionReason',
    consentVersion: 'consentVersion',
    photoUrl: 'photoUrl',
    bio: 'bio',
    address: 'address',
    city: 'city',
    region: 'region',
    district: 'district',
    localArea: 'localArea',
    country: 'country',
    favColor: 'favColor',
    phone: 'phone',
    whatsapp: 'whatsapp'
  };

  export type ProfileOrderByRelevanceFieldEnum = (typeof ProfileOrderByRelevanceFieldEnum)[keyof typeof ProfileOrderByRelevanceFieldEnum]


  export const ProfilePhotoOrderByRelevanceFieldEnum: {
    id: 'id',
    profileId: 'profileId',
    url: 'url',
    sha256Hash: 'sha256Hash',
    status: 'status'
  };

  export type ProfilePhotoOrderByRelevanceFieldEnum = (typeof ProfilePhotoOrderByRelevanceFieldEnum)[keyof typeof ProfilePhotoOrderByRelevanceFieldEnum]


  export const ProfileRateOrderByRelevanceFieldEnum: {
    id: 'id',
    profileId: 'profileId',
    duration: 'duration'
  };

  export type ProfileRateOrderByRelevanceFieldEnum = (typeof ProfileRateOrderByRelevanceFieldEnum)[keyof typeof ProfileRateOrderByRelevanceFieldEnum]


  export const ReportOrderByRelevanceFieldEnum: {
    id: 'id',
    profileId: 'profileId',
    reporterId: 'reporterId',
    category: 'category',
    description: 'description',
    status: 'status',
    actionTaken: 'actionTaken',
    ipAddress: 'ipAddress'
  };

  export type ReportOrderByRelevanceFieldEnum = (typeof ReportOrderByRelevanceFieldEnum)[keyof typeof ReportOrderByRelevanceFieldEnum]


  export const UserBlockOrderByRelevanceFieldEnum: {
    id: 'id',
    blockerId: 'blockerId',
    blockedId: 'blockedId'
  };

  export type UserBlockOrderByRelevanceFieldEnum = (typeof UserBlockOrderByRelevanceFieldEnum)[keyof typeof UserBlockOrderByRelevanceFieldEnum]


  export const ModerationActionOrderByRelevanceFieldEnum: {
    id: 'id',
    moderatorId: 'moderatorId',
    targetType: 'targetType',
    targetId: 'targetId',
    action: 'action',
    reason: 'reason'
  };

  export type ModerationActionOrderByRelevanceFieldEnum = (typeof ModerationActionOrderByRelevanceFieldEnum)[keyof typeof ModerationActionOrderByRelevanceFieldEnum]


  export const AuditLogOrderByRelevanceFieldEnum: {
    id: 'id',
    userId: 'userId',
    action: 'action',
    details: 'details',
    ipAddress: 'ipAddress'
  };

  export type AuditLogOrderByRelevanceFieldEnum = (typeof AuditLogOrderByRelevanceFieldEnum)[keyof typeof AuditLogOrderByRelevanceFieldEnum]


  export const ContactMessageOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    message: 'message',
    status: 'status',
    ipAddress: 'ipAddress'
  };

  export type ContactMessageOrderByRelevanceFieldEnum = (typeof ContactMessageOrderByRelevanceFieldEnum)[keyof typeof ContactMessageOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    isSuspended?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    profile?: XOR<ProfileNullableScalarRelationFilter, ProfileWhereInput> | null
    reportsSent?: ReportListRelationFilter
    blocksSent?: UserBlockListRelationFilter
    blocksRecv?: UserBlockListRelationFilter
    auditLogs?: AuditLogListRelationFilter
    modActions?: ModerationActionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isSuspended?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    profile?: ProfileOrderByWithRelationInput
    reportsSent?: ReportOrderByRelationAggregateInput
    blocksSent?: UserBlockOrderByRelationAggregateInput
    blocksRecv?: UserBlockOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
    modActions?: ModerationActionOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    isSuspended?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    profile?: XOR<ProfileNullableScalarRelationFilter, ProfileWhereInput> | null
    reportsSent?: ReportListRelationFilter
    blocksSent?: UserBlockListRelationFilter
    blocksRecv?: UserBlockListRelationFilter
    auditLogs?: AuditLogListRelationFilter
    modActions?: ModerationActionListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isSuspended?: SortOrder
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
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    isSuspended?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ProfileWhereInput = {
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    id?: StringFilter<"Profile"> | string
    userId?: StringFilter<"Profile"> | string
    status?: StringFilter<"Profile"> | string
    visibility?: StringFilter<"Profile"> | string
    moderationNotes?: StringNullableFilter<"Profile"> | string | null
    rejectionReason?: StringNullableFilter<"Profile"> | string | null
    ageConfirmed?: BoolFilter<"Profile"> | boolean
    consentRecorded?: BoolFilter<"Profile"> | boolean
    consentTimestamp?: DateTimeNullableFilter<"Profile"> | Date | string | null
    consentVersion?: StringNullableFilter<"Profile"> | string | null
    photoUrl?: StringNullableFilter<"Profile"> | string | null
    bio?: StringNullableFilter<"Profile"> | string | null
    address?: StringNullableFilter<"Profile"> | string | null
    city?: StringNullableFilter<"Profile"> | string | null
    region?: StringNullableFilter<"Profile"> | string | null
    district?: StringNullableFilter<"Profile"> | string | null
    localArea?: StringNullableFilter<"Profile"> | string | null
    country?: StringNullableFilter<"Profile"> | string | null
    favColor?: StringNullableFilter<"Profile"> | string | null
    phone?: StringNullableFilter<"Profile"> | string | null
    whatsapp?: StringNullableFilter<"Profile"> | string | null
    hidePhoneFromPublic?: BoolFilter<"Profile"> | boolean
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    updatedAt?: DateTimeFilter<"Profile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    photos?: ProfilePhotoListRelationFilter
    reports?: ReportListRelationFilter
    rates?: ProfileRateListRelationFilter
  }

  export type ProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    visibility?: SortOrder
    moderationNotes?: SortOrderInput | SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    ageConfirmed?: SortOrder
    consentRecorded?: SortOrder
    consentTimestamp?: SortOrderInput | SortOrder
    consentVersion?: SortOrderInput | SortOrder
    photoUrl?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    region?: SortOrderInput | SortOrder
    district?: SortOrderInput | SortOrder
    localArea?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    favColor?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    whatsapp?: SortOrderInput | SortOrder
    hidePhoneFromPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    photos?: ProfilePhotoOrderByRelationAggregateInput
    reports?: ReportOrderByRelationAggregateInput
    rates?: ProfileRateOrderByRelationAggregateInput
    _relevance?: ProfileOrderByRelevanceInput
  }

  export type ProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    status?: StringFilter<"Profile"> | string
    visibility?: StringFilter<"Profile"> | string
    moderationNotes?: StringNullableFilter<"Profile"> | string | null
    rejectionReason?: StringNullableFilter<"Profile"> | string | null
    ageConfirmed?: BoolFilter<"Profile"> | boolean
    consentRecorded?: BoolFilter<"Profile"> | boolean
    consentTimestamp?: DateTimeNullableFilter<"Profile"> | Date | string | null
    consentVersion?: StringNullableFilter<"Profile"> | string | null
    photoUrl?: StringNullableFilter<"Profile"> | string | null
    bio?: StringNullableFilter<"Profile"> | string | null
    address?: StringNullableFilter<"Profile"> | string | null
    city?: StringNullableFilter<"Profile"> | string | null
    region?: StringNullableFilter<"Profile"> | string | null
    district?: StringNullableFilter<"Profile"> | string | null
    localArea?: StringNullableFilter<"Profile"> | string | null
    country?: StringNullableFilter<"Profile"> | string | null
    favColor?: StringNullableFilter<"Profile"> | string | null
    phone?: StringNullableFilter<"Profile"> | string | null
    whatsapp?: StringNullableFilter<"Profile"> | string | null
    hidePhoneFromPublic?: BoolFilter<"Profile"> | boolean
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    updatedAt?: DateTimeFilter<"Profile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    photos?: ProfilePhotoListRelationFilter
    reports?: ReportListRelationFilter
    rates?: ProfileRateListRelationFilter
  }, "id" | "userId">

  export type ProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    visibility?: SortOrder
    moderationNotes?: SortOrderInput | SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    ageConfirmed?: SortOrder
    consentRecorded?: SortOrder
    consentTimestamp?: SortOrderInput | SortOrder
    consentVersion?: SortOrderInput | SortOrder
    photoUrl?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    region?: SortOrderInput | SortOrder
    district?: SortOrderInput | SortOrder
    localArea?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    favColor?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    whatsapp?: SortOrderInput | SortOrder
    hidePhoneFromPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProfileCountOrderByAggregateInput
    _max?: ProfileMaxOrderByAggregateInput
    _min?: ProfileMinOrderByAggregateInput
  }

  export type ProfileScalarWhereWithAggregatesInput = {
    AND?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    OR?: ProfileScalarWhereWithAggregatesInput[]
    NOT?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Profile"> | string
    userId?: StringWithAggregatesFilter<"Profile"> | string
    status?: StringWithAggregatesFilter<"Profile"> | string
    visibility?: StringWithAggregatesFilter<"Profile"> | string
    moderationNotes?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    rejectionReason?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    ageConfirmed?: BoolWithAggregatesFilter<"Profile"> | boolean
    consentRecorded?: BoolWithAggregatesFilter<"Profile"> | boolean
    consentTimestamp?: DateTimeNullableWithAggregatesFilter<"Profile"> | Date | string | null
    consentVersion?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    photoUrl?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    bio?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    address?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    city?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    region?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    district?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    localArea?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    country?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    favColor?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    whatsapp?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    hidePhoneFromPublic?: BoolWithAggregatesFilter<"Profile"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
  }

  export type ProfilePhotoWhereInput = {
    AND?: ProfilePhotoWhereInput | ProfilePhotoWhereInput[]
    OR?: ProfilePhotoWhereInput[]
    NOT?: ProfilePhotoWhereInput | ProfilePhotoWhereInput[]
    id?: StringFilter<"ProfilePhoto"> | string
    profileId?: StringFilter<"ProfilePhoto"> | string
    url?: StringFilter<"ProfilePhoto"> | string
    sha256Hash?: StringNullableFilter<"ProfilePhoto"> | string | null
    order?: IntFilter<"ProfilePhoto"> | number
    isPrimary?: BoolFilter<"ProfilePhoto"> | boolean
    status?: StringFilter<"ProfilePhoto"> | string
    createdAt?: DateTimeFilter<"ProfilePhoto"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }

  export type ProfilePhotoOrderByWithRelationInput = {
    id?: SortOrder
    profileId?: SortOrder
    url?: SortOrder
    sha256Hash?: SortOrderInput | SortOrder
    order?: SortOrder
    isPrimary?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    profile?: ProfileOrderByWithRelationInput
    _relevance?: ProfilePhotoOrderByRelevanceInput
  }

  export type ProfilePhotoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProfilePhotoWhereInput | ProfilePhotoWhereInput[]
    OR?: ProfilePhotoWhereInput[]
    NOT?: ProfilePhotoWhereInput | ProfilePhotoWhereInput[]
    profileId?: StringFilter<"ProfilePhoto"> | string
    url?: StringFilter<"ProfilePhoto"> | string
    sha256Hash?: StringNullableFilter<"ProfilePhoto"> | string | null
    order?: IntFilter<"ProfilePhoto"> | number
    isPrimary?: BoolFilter<"ProfilePhoto"> | boolean
    status?: StringFilter<"ProfilePhoto"> | string
    createdAt?: DateTimeFilter<"ProfilePhoto"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }, "id">

  export type ProfilePhotoOrderByWithAggregationInput = {
    id?: SortOrder
    profileId?: SortOrder
    url?: SortOrder
    sha256Hash?: SortOrderInput | SortOrder
    order?: SortOrder
    isPrimary?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: ProfilePhotoCountOrderByAggregateInput
    _avg?: ProfilePhotoAvgOrderByAggregateInput
    _max?: ProfilePhotoMaxOrderByAggregateInput
    _min?: ProfilePhotoMinOrderByAggregateInput
    _sum?: ProfilePhotoSumOrderByAggregateInput
  }

  export type ProfilePhotoScalarWhereWithAggregatesInput = {
    AND?: ProfilePhotoScalarWhereWithAggregatesInput | ProfilePhotoScalarWhereWithAggregatesInput[]
    OR?: ProfilePhotoScalarWhereWithAggregatesInput[]
    NOT?: ProfilePhotoScalarWhereWithAggregatesInput | ProfilePhotoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProfilePhoto"> | string
    profileId?: StringWithAggregatesFilter<"ProfilePhoto"> | string
    url?: StringWithAggregatesFilter<"ProfilePhoto"> | string
    sha256Hash?: StringNullableWithAggregatesFilter<"ProfilePhoto"> | string | null
    order?: IntWithAggregatesFilter<"ProfilePhoto"> | number
    isPrimary?: BoolWithAggregatesFilter<"ProfilePhoto"> | boolean
    status?: StringWithAggregatesFilter<"ProfilePhoto"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ProfilePhoto"> | Date | string
  }

  export type ProfileRateWhereInput = {
    AND?: ProfileRateWhereInput | ProfileRateWhereInput[]
    OR?: ProfileRateWhereInput[]
    NOT?: ProfileRateWhereInput | ProfileRateWhereInput[]
    id?: StringFilter<"ProfileRate"> | string
    profileId?: StringFilter<"ProfileRate"> | string
    duration?: StringFilter<"ProfileRate"> | string
    incall?: IntFilter<"ProfileRate"> | number
    outcall?: IntFilter<"ProfileRate"> | number
    order?: IntFilter<"ProfileRate"> | number
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }

  export type ProfileRateOrderByWithRelationInput = {
    id?: SortOrder
    profileId?: SortOrder
    duration?: SortOrder
    incall?: SortOrder
    outcall?: SortOrder
    order?: SortOrder
    profile?: ProfileOrderByWithRelationInput
    _relevance?: ProfileRateOrderByRelevanceInput
  }

  export type ProfileRateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProfileRateWhereInput | ProfileRateWhereInput[]
    OR?: ProfileRateWhereInput[]
    NOT?: ProfileRateWhereInput | ProfileRateWhereInput[]
    profileId?: StringFilter<"ProfileRate"> | string
    duration?: StringFilter<"ProfileRate"> | string
    incall?: IntFilter<"ProfileRate"> | number
    outcall?: IntFilter<"ProfileRate"> | number
    order?: IntFilter<"ProfileRate"> | number
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
  }, "id">

  export type ProfileRateOrderByWithAggregationInput = {
    id?: SortOrder
    profileId?: SortOrder
    duration?: SortOrder
    incall?: SortOrder
    outcall?: SortOrder
    order?: SortOrder
    _count?: ProfileRateCountOrderByAggregateInput
    _avg?: ProfileRateAvgOrderByAggregateInput
    _max?: ProfileRateMaxOrderByAggregateInput
    _min?: ProfileRateMinOrderByAggregateInput
    _sum?: ProfileRateSumOrderByAggregateInput
  }

  export type ProfileRateScalarWhereWithAggregatesInput = {
    AND?: ProfileRateScalarWhereWithAggregatesInput | ProfileRateScalarWhereWithAggregatesInput[]
    OR?: ProfileRateScalarWhereWithAggregatesInput[]
    NOT?: ProfileRateScalarWhereWithAggregatesInput | ProfileRateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProfileRate"> | string
    profileId?: StringWithAggregatesFilter<"ProfileRate"> | string
    duration?: StringWithAggregatesFilter<"ProfileRate"> | string
    incall?: IntWithAggregatesFilter<"ProfileRate"> | number
    outcall?: IntWithAggregatesFilter<"ProfileRate"> | number
    order?: IntWithAggregatesFilter<"ProfileRate"> | number
  }

  export type ReportWhereInput = {
    AND?: ReportWhereInput | ReportWhereInput[]
    OR?: ReportWhereInput[]
    NOT?: ReportWhereInput | ReportWhereInput[]
    id?: StringFilter<"Report"> | string
    profileId?: StringFilter<"Report"> | string
    reporterId?: StringNullableFilter<"Report"> | string | null
    category?: StringFilter<"Report"> | string
    description?: StringFilter<"Report"> | string
    status?: StringFilter<"Report"> | string
    actionTaken?: StringNullableFilter<"Report"> | string | null
    ipAddress?: StringNullableFilter<"Report"> | string | null
    createdAt?: DateTimeFilter<"Report"> | Date | string
    updatedAt?: DateTimeFilter<"Report"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    reporter?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type ReportOrderByWithRelationInput = {
    id?: SortOrder
    profileId?: SortOrder
    reporterId?: SortOrderInput | SortOrder
    category?: SortOrder
    description?: SortOrder
    status?: SortOrder
    actionTaken?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    profile?: ProfileOrderByWithRelationInput
    reporter?: UserOrderByWithRelationInput
    _relevance?: ReportOrderByRelevanceInput
  }

  export type ReportWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReportWhereInput | ReportWhereInput[]
    OR?: ReportWhereInput[]
    NOT?: ReportWhereInput | ReportWhereInput[]
    profileId?: StringFilter<"Report"> | string
    reporterId?: StringNullableFilter<"Report"> | string | null
    category?: StringFilter<"Report"> | string
    description?: StringFilter<"Report"> | string
    status?: StringFilter<"Report"> | string
    actionTaken?: StringNullableFilter<"Report"> | string | null
    ipAddress?: StringNullableFilter<"Report"> | string | null
    createdAt?: DateTimeFilter<"Report"> | Date | string
    updatedAt?: DateTimeFilter<"Report"> | Date | string
    profile?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    reporter?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type ReportOrderByWithAggregationInput = {
    id?: SortOrder
    profileId?: SortOrder
    reporterId?: SortOrderInput | SortOrder
    category?: SortOrder
    description?: SortOrder
    status?: SortOrder
    actionTaken?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ReportCountOrderByAggregateInput
    _max?: ReportMaxOrderByAggregateInput
    _min?: ReportMinOrderByAggregateInput
  }

  export type ReportScalarWhereWithAggregatesInput = {
    AND?: ReportScalarWhereWithAggregatesInput | ReportScalarWhereWithAggregatesInput[]
    OR?: ReportScalarWhereWithAggregatesInput[]
    NOT?: ReportScalarWhereWithAggregatesInput | ReportScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Report"> | string
    profileId?: StringWithAggregatesFilter<"Report"> | string
    reporterId?: StringNullableWithAggregatesFilter<"Report"> | string | null
    category?: StringWithAggregatesFilter<"Report"> | string
    description?: StringWithAggregatesFilter<"Report"> | string
    status?: StringWithAggregatesFilter<"Report"> | string
    actionTaken?: StringNullableWithAggregatesFilter<"Report"> | string | null
    ipAddress?: StringNullableWithAggregatesFilter<"Report"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Report"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Report"> | Date | string
  }

  export type UserBlockWhereInput = {
    AND?: UserBlockWhereInput | UserBlockWhereInput[]
    OR?: UserBlockWhereInput[]
    NOT?: UserBlockWhereInput | UserBlockWhereInput[]
    id?: StringFilter<"UserBlock"> | string
    blockerId?: StringFilter<"UserBlock"> | string
    blockedId?: StringFilter<"UserBlock"> | string
    createdAt?: DateTimeFilter<"UserBlock"> | Date | string
    blocker?: XOR<UserScalarRelationFilter, UserWhereInput>
    blocked?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserBlockOrderByWithRelationInput = {
    id?: SortOrder
    blockerId?: SortOrder
    blockedId?: SortOrder
    createdAt?: SortOrder
    blocker?: UserOrderByWithRelationInput
    blocked?: UserOrderByWithRelationInput
    _relevance?: UserBlockOrderByRelevanceInput
  }

  export type UserBlockWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    blockerId_blockedId?: UserBlockBlockerIdBlockedIdCompoundUniqueInput
    AND?: UserBlockWhereInput | UserBlockWhereInput[]
    OR?: UserBlockWhereInput[]
    NOT?: UserBlockWhereInput | UserBlockWhereInput[]
    blockerId?: StringFilter<"UserBlock"> | string
    blockedId?: StringFilter<"UserBlock"> | string
    createdAt?: DateTimeFilter<"UserBlock"> | Date | string
    blocker?: XOR<UserScalarRelationFilter, UserWhereInput>
    blocked?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "blockerId_blockedId">

  export type UserBlockOrderByWithAggregationInput = {
    id?: SortOrder
    blockerId?: SortOrder
    blockedId?: SortOrder
    createdAt?: SortOrder
    _count?: UserBlockCountOrderByAggregateInput
    _max?: UserBlockMaxOrderByAggregateInput
    _min?: UserBlockMinOrderByAggregateInput
  }

  export type UserBlockScalarWhereWithAggregatesInput = {
    AND?: UserBlockScalarWhereWithAggregatesInput | UserBlockScalarWhereWithAggregatesInput[]
    OR?: UserBlockScalarWhereWithAggregatesInput[]
    NOT?: UserBlockScalarWhereWithAggregatesInput | UserBlockScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserBlock"> | string
    blockerId?: StringWithAggregatesFilter<"UserBlock"> | string
    blockedId?: StringWithAggregatesFilter<"UserBlock"> | string
    createdAt?: DateTimeWithAggregatesFilter<"UserBlock"> | Date | string
  }

  export type ModerationActionWhereInput = {
    AND?: ModerationActionWhereInput | ModerationActionWhereInput[]
    OR?: ModerationActionWhereInput[]
    NOT?: ModerationActionWhereInput | ModerationActionWhereInput[]
    id?: StringFilter<"ModerationAction"> | string
    moderatorId?: StringFilter<"ModerationAction"> | string
    targetType?: StringFilter<"ModerationAction"> | string
    targetId?: StringFilter<"ModerationAction"> | string
    action?: StringFilter<"ModerationAction"> | string
    reason?: StringNullableFilter<"ModerationAction"> | string | null
    createdAt?: DateTimeFilter<"ModerationAction"> | Date | string
    moderator?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ModerationActionOrderByWithRelationInput = {
    id?: SortOrder
    moderatorId?: SortOrder
    targetType?: SortOrder
    targetId?: SortOrder
    action?: SortOrder
    reason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    moderator?: UserOrderByWithRelationInput
    _relevance?: ModerationActionOrderByRelevanceInput
  }

  export type ModerationActionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ModerationActionWhereInput | ModerationActionWhereInput[]
    OR?: ModerationActionWhereInput[]
    NOT?: ModerationActionWhereInput | ModerationActionWhereInput[]
    moderatorId?: StringFilter<"ModerationAction"> | string
    targetType?: StringFilter<"ModerationAction"> | string
    targetId?: StringFilter<"ModerationAction"> | string
    action?: StringFilter<"ModerationAction"> | string
    reason?: StringNullableFilter<"ModerationAction"> | string | null
    createdAt?: DateTimeFilter<"ModerationAction"> | Date | string
    moderator?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ModerationActionOrderByWithAggregationInput = {
    id?: SortOrder
    moderatorId?: SortOrder
    targetType?: SortOrder
    targetId?: SortOrder
    action?: SortOrder
    reason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ModerationActionCountOrderByAggregateInput
    _max?: ModerationActionMaxOrderByAggregateInput
    _min?: ModerationActionMinOrderByAggregateInput
  }

  export type ModerationActionScalarWhereWithAggregatesInput = {
    AND?: ModerationActionScalarWhereWithAggregatesInput | ModerationActionScalarWhereWithAggregatesInput[]
    OR?: ModerationActionScalarWhereWithAggregatesInput[]
    NOT?: ModerationActionScalarWhereWithAggregatesInput | ModerationActionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ModerationAction"> | string
    moderatorId?: StringWithAggregatesFilter<"ModerationAction"> | string
    targetType?: StringWithAggregatesFilter<"ModerationAction"> | string
    targetId?: StringWithAggregatesFilter<"ModerationAction"> | string
    action?: StringWithAggregatesFilter<"ModerationAction"> | string
    reason?: StringNullableWithAggregatesFilter<"ModerationAction"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ModerationAction"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    userId?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    details?: StringNullableFilter<"AuditLog"> | string | null
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    action?: SortOrder
    details?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    _relevance?: AuditLogOrderByRelevanceInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    userId?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    details?: StringNullableFilter<"AuditLog"> | string | null
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    action?: SortOrder
    details?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    userId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    details?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    ipAddress?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type ContactMessageWhereInput = {
    AND?: ContactMessageWhereInput | ContactMessageWhereInput[]
    OR?: ContactMessageWhereInput[]
    NOT?: ContactMessageWhereInput | ContactMessageWhereInput[]
    id?: StringFilter<"ContactMessage"> | string
    name?: StringFilter<"ContactMessage"> | string
    email?: StringFilter<"ContactMessage"> | string
    message?: StringFilter<"ContactMessage"> | string
    status?: StringFilter<"ContactMessage"> | string
    ipAddress?: StringNullableFilter<"ContactMessage"> | string | null
    createdAt?: DateTimeFilter<"ContactMessage"> | Date | string
  }

  export type ContactMessageOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    message?: SortOrder
    status?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _relevance?: ContactMessageOrderByRelevanceInput
  }

  export type ContactMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ContactMessageWhereInput | ContactMessageWhereInput[]
    OR?: ContactMessageWhereInput[]
    NOT?: ContactMessageWhereInput | ContactMessageWhereInput[]
    name?: StringFilter<"ContactMessage"> | string
    email?: StringFilter<"ContactMessage"> | string
    message?: StringFilter<"ContactMessage"> | string
    status?: StringFilter<"ContactMessage"> | string
    ipAddress?: StringNullableFilter<"ContactMessage"> | string | null
    createdAt?: DateTimeFilter<"ContactMessage"> | Date | string
  }, "id">

  export type ContactMessageOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    message?: SortOrder
    status?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ContactMessageCountOrderByAggregateInput
    _max?: ContactMessageMaxOrderByAggregateInput
    _min?: ContactMessageMinOrderByAggregateInput
  }

  export type ContactMessageScalarWhereWithAggregatesInput = {
    AND?: ContactMessageScalarWhereWithAggregatesInput | ContactMessageScalarWhereWithAggregatesInput[]
    OR?: ContactMessageScalarWhereWithAggregatesInput[]
    NOT?: ContactMessageScalarWhereWithAggregatesInput | ContactMessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ContactMessage"> | string
    name?: StringWithAggregatesFilter<"ContactMessage"> | string
    email?: StringWithAggregatesFilter<"ContactMessage"> | string
    message?: StringWithAggregatesFilter<"ContactMessage"> | string
    status?: StringWithAggregatesFilter<"ContactMessage"> | string
    ipAddress?: StringNullableWithAggregatesFilter<"ContactMessage"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ContactMessage"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    isSuspended?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutUserInput
    reportsSent?: ReportCreateNestedManyWithoutReporterInput
    blocksSent?: UserBlockCreateNestedManyWithoutBlockerInput
    blocksRecv?: UserBlockCreateNestedManyWithoutBlockedInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
    modActions?: ModerationActionCreateNestedManyWithoutModeratorInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    isSuspended?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    reportsSent?: ReportUncheckedCreateNestedManyWithoutReporterInput
    blocksSent?: UserBlockUncheckedCreateNestedManyWithoutBlockerInput
    blocksRecv?: UserBlockUncheckedCreateNestedManyWithoutBlockedInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    modActions?: ModerationActionUncheckedCreateNestedManyWithoutModeratorInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
    reportsSent?: ReportUpdateManyWithoutReporterNestedInput
    blocksSent?: UserBlockUpdateManyWithoutBlockerNestedInput
    blocksRecv?: UserBlockUpdateManyWithoutBlockedNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
    modActions?: ModerationActionUpdateManyWithoutModeratorNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    reportsSent?: ReportUncheckedUpdateManyWithoutReporterNestedInput
    blocksSent?: UserBlockUncheckedUpdateManyWithoutBlockerNestedInput
    blocksRecv?: UserBlockUncheckedUpdateManyWithoutBlockedNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    modActions?: ModerationActionUncheckedUpdateManyWithoutModeratorNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    isSuspended?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileCreateInput = {
    id?: string
    status?: string
    visibility?: string
    moderationNotes?: string | null
    rejectionReason?: string | null
    ageConfirmed?: boolean
    consentRecorded?: boolean
    consentTimestamp?: Date | string | null
    consentVersion?: string | null
    photoUrl?: string | null
    bio?: string | null
    address?: string | null
    city?: string | null
    region?: string | null
    district?: string | null
    localArea?: string | null
    country?: string | null
    favColor?: string | null
    phone?: string | null
    whatsapp?: string | null
    hidePhoneFromPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProfileInput
    photos?: ProfilePhotoCreateNestedManyWithoutProfileInput
    reports?: ReportCreateNestedManyWithoutProfileInput
    rates?: ProfileRateCreateNestedManyWithoutProfileInput
  }

  export type ProfileUncheckedCreateInput = {
    id?: string
    userId: string
    status?: string
    visibility?: string
    moderationNotes?: string | null
    rejectionReason?: string | null
    ageConfirmed?: boolean
    consentRecorded?: boolean
    consentTimestamp?: Date | string | null
    consentVersion?: string | null
    photoUrl?: string | null
    bio?: string | null
    address?: string | null
    city?: string | null
    region?: string | null
    district?: string | null
    localArea?: string | null
    country?: string | null
    favColor?: string | null
    phone?: string | null
    whatsapp?: string | null
    hidePhoneFromPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    photos?: ProfilePhotoUncheckedCreateNestedManyWithoutProfileInput
    reports?: ReportUncheckedCreateNestedManyWithoutProfileInput
    rates?: ProfileRateUncheckedCreateNestedManyWithoutProfileInput
  }

  export type ProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    visibility?: StringFieldUpdateOperationsInput | string
    moderationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    ageConfirmed?: BoolFieldUpdateOperationsInput | boolean
    consentRecorded?: BoolFieldUpdateOperationsInput | boolean
    consentTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consentVersion?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    localArea?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    favColor?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    hidePhoneFromPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProfileNestedInput
    photos?: ProfilePhotoUpdateManyWithoutProfileNestedInput
    reports?: ReportUpdateManyWithoutProfileNestedInput
    rates?: ProfileRateUpdateManyWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    visibility?: StringFieldUpdateOperationsInput | string
    moderationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    ageConfirmed?: BoolFieldUpdateOperationsInput | boolean
    consentRecorded?: BoolFieldUpdateOperationsInput | boolean
    consentTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consentVersion?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    localArea?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    favColor?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    hidePhoneFromPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    photos?: ProfilePhotoUncheckedUpdateManyWithoutProfileNestedInput
    reports?: ReportUncheckedUpdateManyWithoutProfileNestedInput
    rates?: ProfileRateUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type ProfileCreateManyInput = {
    id?: string
    userId: string
    status?: string
    visibility?: string
    moderationNotes?: string | null
    rejectionReason?: string | null
    ageConfirmed?: boolean
    consentRecorded?: boolean
    consentTimestamp?: Date | string | null
    consentVersion?: string | null
    photoUrl?: string | null
    bio?: string | null
    address?: string | null
    city?: string | null
    region?: string | null
    district?: string | null
    localArea?: string | null
    country?: string | null
    favColor?: string | null
    phone?: string | null
    whatsapp?: string | null
    hidePhoneFromPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    visibility?: StringFieldUpdateOperationsInput | string
    moderationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    ageConfirmed?: BoolFieldUpdateOperationsInput | boolean
    consentRecorded?: BoolFieldUpdateOperationsInput | boolean
    consentTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consentVersion?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    localArea?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    favColor?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    hidePhoneFromPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    visibility?: StringFieldUpdateOperationsInput | string
    moderationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    ageConfirmed?: BoolFieldUpdateOperationsInput | boolean
    consentRecorded?: BoolFieldUpdateOperationsInput | boolean
    consentTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consentVersion?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    localArea?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    favColor?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    hidePhoneFromPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfilePhotoCreateInput = {
    id?: string
    url: string
    sha256Hash?: string | null
    order?: number
    isPrimary?: boolean
    status?: string
    createdAt?: Date | string
    profile: ProfileCreateNestedOneWithoutPhotosInput
  }

  export type ProfilePhotoUncheckedCreateInput = {
    id?: string
    profileId: string
    url: string
    sha256Hash?: string | null
    order?: number
    isPrimary?: boolean
    status?: string
    createdAt?: Date | string
  }

  export type ProfilePhotoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    sha256Hash?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutPhotosNestedInput
  }

  export type ProfilePhotoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    sha256Hash?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfilePhotoCreateManyInput = {
    id?: string
    profileId: string
    url: string
    sha256Hash?: string | null
    order?: number
    isPrimary?: boolean
    status?: string
    createdAt?: Date | string
  }

  export type ProfilePhotoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    sha256Hash?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfilePhotoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    sha256Hash?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileRateCreateInput = {
    id?: string
    duration: string
    incall: number
    outcall: number
    order?: number
    profile: ProfileCreateNestedOneWithoutRatesInput
  }

  export type ProfileRateUncheckedCreateInput = {
    id?: string
    profileId: string
    duration: string
    incall: number
    outcall: number
    order?: number
  }

  export type ProfileRateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    incall?: IntFieldUpdateOperationsInput | number
    outcall?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    profile?: ProfileUpdateOneRequiredWithoutRatesNestedInput
  }

  export type ProfileRateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    incall?: IntFieldUpdateOperationsInput | number
    outcall?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
  }

  export type ProfileRateCreateManyInput = {
    id?: string
    profileId: string
    duration: string
    incall: number
    outcall: number
    order?: number
  }

  export type ProfileRateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    incall?: IntFieldUpdateOperationsInput | number
    outcall?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
  }

  export type ProfileRateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    incall?: IntFieldUpdateOperationsInput | number
    outcall?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
  }

  export type ReportCreateInput = {
    id?: string
    category: string
    description: string
    status?: string
    actionTaken?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutReportsInput
    reporter?: UserCreateNestedOneWithoutReportsSentInput
  }

  export type ReportUncheckedCreateInput = {
    id?: string
    profileId: string
    reporterId?: string | null
    category: string
    description: string
    status?: string
    actionTaken?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    actionTaken?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutReportsNestedInput
    reporter?: UserUpdateOneWithoutReportsSentNestedInput
  }

  export type ReportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    reporterId?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    actionTaken?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportCreateManyInput = {
    id?: string
    profileId: string
    reporterId?: string | null
    category: string
    description: string
    status?: string
    actionTaken?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    actionTaken?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    reporterId?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    actionTaken?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserBlockCreateInput = {
    id?: string
    createdAt?: Date | string
    blocker: UserCreateNestedOneWithoutBlocksSentInput
    blocked: UserCreateNestedOneWithoutBlocksRecvInput
  }

  export type UserBlockUncheckedCreateInput = {
    id?: string
    blockerId: string
    blockedId: string
    createdAt?: Date | string
  }

  export type UserBlockUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    blocker?: UserUpdateOneRequiredWithoutBlocksSentNestedInput
    blocked?: UserUpdateOneRequiredWithoutBlocksRecvNestedInput
  }

  export type UserBlockUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    blockerId?: StringFieldUpdateOperationsInput | string
    blockedId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserBlockCreateManyInput = {
    id?: string
    blockerId: string
    blockedId: string
    createdAt?: Date | string
  }

  export type UserBlockUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserBlockUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    blockerId?: StringFieldUpdateOperationsInput | string
    blockedId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModerationActionCreateInput = {
    id?: string
    targetType: string
    targetId: string
    action: string
    reason?: string | null
    createdAt?: Date | string
    moderator: UserCreateNestedOneWithoutModActionsInput
  }

  export type ModerationActionUncheckedCreateInput = {
    id?: string
    moderatorId: string
    targetType: string
    targetId: string
    action: string
    reason?: string | null
    createdAt?: Date | string
  }

  export type ModerationActionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    moderator?: UserUpdateOneRequiredWithoutModActionsNestedInput
  }

  export type ModerationActionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    moderatorId?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModerationActionCreateManyInput = {
    id?: string
    moderatorId: string
    targetType: string
    targetId: string
    action: string
    reason?: string | null
    createdAt?: Date | string
  }

  export type ModerationActionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModerationActionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    moderatorId?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    action: string
    details?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    userId?: string | null
    action: string
    details?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    userId?: string | null
    action: string
    details?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactMessageCreateInput = {
    id?: string
    name: string
    email: string
    message: string
    status?: string
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type ContactMessageUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    message: string
    status?: string
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type ContactMessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactMessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactMessageCreateManyInput = {
    id?: string
    name: string
    email: string
    message: string
    status?: string
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type ContactMessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactMessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type ProfileNullableScalarRelationFilter = {
    is?: ProfileWhereInput | null
    isNot?: ProfileWhereInput | null
  }

  export type ReportListRelationFilter = {
    every?: ReportWhereInput
    some?: ReportWhereInput
    none?: ReportWhereInput
  }

  export type UserBlockListRelationFilter = {
    every?: UserBlockWhereInput
    some?: UserBlockWhereInput
    none?: UserBlockWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type ModerationActionListRelationFilter = {
    every?: ModerationActionWhereInput
    some?: ModerationActionWhereInput
    none?: ModerationActionWhereInput
  }

  export type ReportOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserBlockOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ModerationActionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isSuspended?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isSuspended?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isSuspended?: SortOrder
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
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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
    search?: string
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

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ProfilePhotoListRelationFilter = {
    every?: ProfilePhotoWhereInput
    some?: ProfilePhotoWhereInput
    none?: ProfilePhotoWhereInput
  }

  export type ProfileRateListRelationFilter = {
    every?: ProfileRateWhereInput
    some?: ProfileRateWhereInput
    none?: ProfileRateWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProfilePhotoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProfileRateOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProfileOrderByRelevanceInput = {
    fields: ProfileOrderByRelevanceFieldEnum | ProfileOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    visibility?: SortOrder
    moderationNotes?: SortOrder
    rejectionReason?: SortOrder
    ageConfirmed?: SortOrder
    consentRecorded?: SortOrder
    consentTimestamp?: SortOrder
    consentVersion?: SortOrder
    photoUrl?: SortOrder
    bio?: SortOrder
    address?: SortOrder
    city?: SortOrder
    region?: SortOrder
    district?: SortOrder
    localArea?: SortOrder
    country?: SortOrder
    favColor?: SortOrder
    phone?: SortOrder
    whatsapp?: SortOrder
    hidePhoneFromPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    visibility?: SortOrder
    moderationNotes?: SortOrder
    rejectionReason?: SortOrder
    ageConfirmed?: SortOrder
    consentRecorded?: SortOrder
    consentTimestamp?: SortOrder
    consentVersion?: SortOrder
    photoUrl?: SortOrder
    bio?: SortOrder
    address?: SortOrder
    city?: SortOrder
    region?: SortOrder
    district?: SortOrder
    localArea?: SortOrder
    country?: SortOrder
    favColor?: SortOrder
    phone?: SortOrder
    whatsapp?: SortOrder
    hidePhoneFromPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    visibility?: SortOrder
    moderationNotes?: SortOrder
    rejectionReason?: SortOrder
    ageConfirmed?: SortOrder
    consentRecorded?: SortOrder
    consentTimestamp?: SortOrder
    consentVersion?: SortOrder
    photoUrl?: SortOrder
    bio?: SortOrder
    address?: SortOrder
    city?: SortOrder
    region?: SortOrder
    district?: SortOrder
    localArea?: SortOrder
    country?: SortOrder
    favColor?: SortOrder
    phone?: SortOrder
    whatsapp?: SortOrder
    hidePhoneFromPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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
    search?: string
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

  export type ProfileScalarRelationFilter = {
    is?: ProfileWhereInput
    isNot?: ProfileWhereInput
  }

  export type ProfilePhotoOrderByRelevanceInput = {
    fields: ProfilePhotoOrderByRelevanceFieldEnum | ProfilePhotoOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ProfilePhotoCountOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    url?: SortOrder
    sha256Hash?: SortOrder
    order?: SortOrder
    isPrimary?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ProfilePhotoAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type ProfilePhotoMaxOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    url?: SortOrder
    sha256Hash?: SortOrder
    order?: SortOrder
    isPrimary?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ProfilePhotoMinOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    url?: SortOrder
    sha256Hash?: SortOrder
    order?: SortOrder
    isPrimary?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ProfilePhotoSumOrderByAggregateInput = {
    order?: SortOrder
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

  export type ProfileRateOrderByRelevanceInput = {
    fields: ProfileRateOrderByRelevanceFieldEnum | ProfileRateOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ProfileRateCountOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    duration?: SortOrder
    incall?: SortOrder
    outcall?: SortOrder
    order?: SortOrder
  }

  export type ProfileRateAvgOrderByAggregateInput = {
    incall?: SortOrder
    outcall?: SortOrder
    order?: SortOrder
  }

  export type ProfileRateMaxOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    duration?: SortOrder
    incall?: SortOrder
    outcall?: SortOrder
    order?: SortOrder
  }

  export type ProfileRateMinOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    duration?: SortOrder
    incall?: SortOrder
    outcall?: SortOrder
    order?: SortOrder
  }

  export type ProfileRateSumOrderByAggregateInput = {
    incall?: SortOrder
    outcall?: SortOrder
    order?: SortOrder
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type ReportOrderByRelevanceInput = {
    fields: ReportOrderByRelevanceFieldEnum | ReportOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ReportCountOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    reporterId?: SortOrder
    category?: SortOrder
    description?: SortOrder
    status?: SortOrder
    actionTaken?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReportMaxOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    reporterId?: SortOrder
    category?: SortOrder
    description?: SortOrder
    status?: SortOrder
    actionTaken?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReportMinOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    reporterId?: SortOrder
    category?: SortOrder
    description?: SortOrder
    status?: SortOrder
    actionTaken?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserBlockOrderByRelevanceInput = {
    fields: UserBlockOrderByRelevanceFieldEnum | UserBlockOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserBlockBlockerIdBlockedIdCompoundUniqueInput = {
    blockerId: string
    blockedId: string
  }

  export type UserBlockCountOrderByAggregateInput = {
    id?: SortOrder
    blockerId?: SortOrder
    blockedId?: SortOrder
    createdAt?: SortOrder
  }

  export type UserBlockMaxOrderByAggregateInput = {
    id?: SortOrder
    blockerId?: SortOrder
    blockedId?: SortOrder
    createdAt?: SortOrder
  }

  export type UserBlockMinOrderByAggregateInput = {
    id?: SortOrder
    blockerId?: SortOrder
    blockedId?: SortOrder
    createdAt?: SortOrder
  }

  export type ModerationActionOrderByRelevanceInput = {
    fields: ModerationActionOrderByRelevanceFieldEnum | ModerationActionOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ModerationActionCountOrderByAggregateInput = {
    id?: SortOrder
    moderatorId?: SortOrder
    targetType?: SortOrder
    targetId?: SortOrder
    action?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
  }

  export type ModerationActionMaxOrderByAggregateInput = {
    id?: SortOrder
    moderatorId?: SortOrder
    targetType?: SortOrder
    targetId?: SortOrder
    action?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
  }

  export type ModerationActionMinOrderByAggregateInput = {
    id?: SortOrder
    moderatorId?: SortOrder
    targetType?: SortOrder
    targetId?: SortOrder
    action?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogOrderByRelevanceInput = {
    fields: AuditLogOrderByRelevanceFieldEnum | AuditLogOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    details?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    details?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    details?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type ContactMessageOrderByRelevanceInput = {
    fields: ContactMessageOrderByRelevanceFieldEnum | ContactMessageOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ContactMessageCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    message?: SortOrder
    status?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type ContactMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    message?: SortOrder
    status?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type ContactMessageMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    message?: SortOrder
    status?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type ProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    connect?: ProfileWhereUniqueInput
  }

  export type ReportCreateNestedManyWithoutReporterInput = {
    create?: XOR<ReportCreateWithoutReporterInput, ReportUncheckedCreateWithoutReporterInput> | ReportCreateWithoutReporterInput[] | ReportUncheckedCreateWithoutReporterInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutReporterInput | ReportCreateOrConnectWithoutReporterInput[]
    createMany?: ReportCreateManyReporterInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type UserBlockCreateNestedManyWithoutBlockerInput = {
    create?: XOR<UserBlockCreateWithoutBlockerInput, UserBlockUncheckedCreateWithoutBlockerInput> | UserBlockCreateWithoutBlockerInput[] | UserBlockUncheckedCreateWithoutBlockerInput[]
    connectOrCreate?: UserBlockCreateOrConnectWithoutBlockerInput | UserBlockCreateOrConnectWithoutBlockerInput[]
    createMany?: UserBlockCreateManyBlockerInputEnvelope
    connect?: UserBlockWhereUniqueInput | UserBlockWhereUniqueInput[]
  }

  export type UserBlockCreateNestedManyWithoutBlockedInput = {
    create?: XOR<UserBlockCreateWithoutBlockedInput, UserBlockUncheckedCreateWithoutBlockedInput> | UserBlockCreateWithoutBlockedInput[] | UserBlockUncheckedCreateWithoutBlockedInput[]
    connectOrCreate?: UserBlockCreateOrConnectWithoutBlockedInput | UserBlockCreateOrConnectWithoutBlockedInput[]
    createMany?: UserBlockCreateManyBlockedInputEnvelope
    connect?: UserBlockWhereUniqueInput | UserBlockWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type ModerationActionCreateNestedManyWithoutModeratorInput = {
    create?: XOR<ModerationActionCreateWithoutModeratorInput, ModerationActionUncheckedCreateWithoutModeratorInput> | ModerationActionCreateWithoutModeratorInput[] | ModerationActionUncheckedCreateWithoutModeratorInput[]
    connectOrCreate?: ModerationActionCreateOrConnectWithoutModeratorInput | ModerationActionCreateOrConnectWithoutModeratorInput[]
    createMany?: ModerationActionCreateManyModeratorInputEnvelope
    connect?: ModerationActionWhereUniqueInput | ModerationActionWhereUniqueInput[]
  }

  export type ProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    connect?: ProfileWhereUniqueInput
  }

  export type ReportUncheckedCreateNestedManyWithoutReporterInput = {
    create?: XOR<ReportCreateWithoutReporterInput, ReportUncheckedCreateWithoutReporterInput> | ReportCreateWithoutReporterInput[] | ReportUncheckedCreateWithoutReporterInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutReporterInput | ReportCreateOrConnectWithoutReporterInput[]
    createMany?: ReportCreateManyReporterInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type UserBlockUncheckedCreateNestedManyWithoutBlockerInput = {
    create?: XOR<UserBlockCreateWithoutBlockerInput, UserBlockUncheckedCreateWithoutBlockerInput> | UserBlockCreateWithoutBlockerInput[] | UserBlockUncheckedCreateWithoutBlockerInput[]
    connectOrCreate?: UserBlockCreateOrConnectWithoutBlockerInput | UserBlockCreateOrConnectWithoutBlockerInput[]
    createMany?: UserBlockCreateManyBlockerInputEnvelope
    connect?: UserBlockWhereUniqueInput | UserBlockWhereUniqueInput[]
  }

  export type UserBlockUncheckedCreateNestedManyWithoutBlockedInput = {
    create?: XOR<UserBlockCreateWithoutBlockedInput, UserBlockUncheckedCreateWithoutBlockedInput> | UserBlockCreateWithoutBlockedInput[] | UserBlockUncheckedCreateWithoutBlockedInput[]
    connectOrCreate?: UserBlockCreateOrConnectWithoutBlockedInput | UserBlockCreateOrConnectWithoutBlockedInput[]
    createMany?: UserBlockCreateManyBlockedInputEnvelope
    connect?: UserBlockWhereUniqueInput | UserBlockWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type ModerationActionUncheckedCreateNestedManyWithoutModeratorInput = {
    create?: XOR<ModerationActionCreateWithoutModeratorInput, ModerationActionUncheckedCreateWithoutModeratorInput> | ModerationActionCreateWithoutModeratorInput[] | ModerationActionUncheckedCreateWithoutModeratorInput[]
    connectOrCreate?: ModerationActionCreateOrConnectWithoutModeratorInput | ModerationActionCreateOrConnectWithoutModeratorInput[]
    createMany?: ModerationActionCreateManyModeratorInputEnvelope
    connect?: ModerationActionWhereUniqueInput | ModerationActionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    upsert?: ProfileUpsertWithoutUserInput
    disconnect?: ProfileWhereInput | boolean
    delete?: ProfileWhereInput | boolean
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutUserInput, ProfileUpdateWithoutUserInput>, ProfileUncheckedUpdateWithoutUserInput>
  }

  export type ReportUpdateManyWithoutReporterNestedInput = {
    create?: XOR<ReportCreateWithoutReporterInput, ReportUncheckedCreateWithoutReporterInput> | ReportCreateWithoutReporterInput[] | ReportUncheckedCreateWithoutReporterInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutReporterInput | ReportCreateOrConnectWithoutReporterInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutReporterInput | ReportUpsertWithWhereUniqueWithoutReporterInput[]
    createMany?: ReportCreateManyReporterInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutReporterInput | ReportUpdateWithWhereUniqueWithoutReporterInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutReporterInput | ReportUpdateManyWithWhereWithoutReporterInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type UserBlockUpdateManyWithoutBlockerNestedInput = {
    create?: XOR<UserBlockCreateWithoutBlockerInput, UserBlockUncheckedCreateWithoutBlockerInput> | UserBlockCreateWithoutBlockerInput[] | UserBlockUncheckedCreateWithoutBlockerInput[]
    connectOrCreate?: UserBlockCreateOrConnectWithoutBlockerInput | UserBlockCreateOrConnectWithoutBlockerInput[]
    upsert?: UserBlockUpsertWithWhereUniqueWithoutBlockerInput | UserBlockUpsertWithWhereUniqueWithoutBlockerInput[]
    createMany?: UserBlockCreateManyBlockerInputEnvelope
    set?: UserBlockWhereUniqueInput | UserBlockWhereUniqueInput[]
    disconnect?: UserBlockWhereUniqueInput | UserBlockWhereUniqueInput[]
    delete?: UserBlockWhereUniqueInput | UserBlockWhereUniqueInput[]
    connect?: UserBlockWhereUniqueInput | UserBlockWhereUniqueInput[]
    update?: UserBlockUpdateWithWhereUniqueWithoutBlockerInput | UserBlockUpdateWithWhereUniqueWithoutBlockerInput[]
    updateMany?: UserBlockUpdateManyWithWhereWithoutBlockerInput | UserBlockUpdateManyWithWhereWithoutBlockerInput[]
    deleteMany?: UserBlockScalarWhereInput | UserBlockScalarWhereInput[]
  }

  export type UserBlockUpdateManyWithoutBlockedNestedInput = {
    create?: XOR<UserBlockCreateWithoutBlockedInput, UserBlockUncheckedCreateWithoutBlockedInput> | UserBlockCreateWithoutBlockedInput[] | UserBlockUncheckedCreateWithoutBlockedInput[]
    connectOrCreate?: UserBlockCreateOrConnectWithoutBlockedInput | UserBlockCreateOrConnectWithoutBlockedInput[]
    upsert?: UserBlockUpsertWithWhereUniqueWithoutBlockedInput | UserBlockUpsertWithWhereUniqueWithoutBlockedInput[]
    createMany?: UserBlockCreateManyBlockedInputEnvelope
    set?: UserBlockWhereUniqueInput | UserBlockWhereUniqueInput[]
    disconnect?: UserBlockWhereUniqueInput | UserBlockWhereUniqueInput[]
    delete?: UserBlockWhereUniqueInput | UserBlockWhereUniqueInput[]
    connect?: UserBlockWhereUniqueInput | UserBlockWhereUniqueInput[]
    update?: UserBlockUpdateWithWhereUniqueWithoutBlockedInput | UserBlockUpdateWithWhereUniqueWithoutBlockedInput[]
    updateMany?: UserBlockUpdateManyWithWhereWithoutBlockedInput | UserBlockUpdateManyWithWhereWithoutBlockedInput[]
    deleteMany?: UserBlockScalarWhereInput | UserBlockScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type ModerationActionUpdateManyWithoutModeratorNestedInput = {
    create?: XOR<ModerationActionCreateWithoutModeratorInput, ModerationActionUncheckedCreateWithoutModeratorInput> | ModerationActionCreateWithoutModeratorInput[] | ModerationActionUncheckedCreateWithoutModeratorInput[]
    connectOrCreate?: ModerationActionCreateOrConnectWithoutModeratorInput | ModerationActionCreateOrConnectWithoutModeratorInput[]
    upsert?: ModerationActionUpsertWithWhereUniqueWithoutModeratorInput | ModerationActionUpsertWithWhereUniqueWithoutModeratorInput[]
    createMany?: ModerationActionCreateManyModeratorInputEnvelope
    set?: ModerationActionWhereUniqueInput | ModerationActionWhereUniqueInput[]
    disconnect?: ModerationActionWhereUniqueInput | ModerationActionWhereUniqueInput[]
    delete?: ModerationActionWhereUniqueInput | ModerationActionWhereUniqueInput[]
    connect?: ModerationActionWhereUniqueInput | ModerationActionWhereUniqueInput[]
    update?: ModerationActionUpdateWithWhereUniqueWithoutModeratorInput | ModerationActionUpdateWithWhereUniqueWithoutModeratorInput[]
    updateMany?: ModerationActionUpdateManyWithWhereWithoutModeratorInput | ModerationActionUpdateManyWithWhereWithoutModeratorInput[]
    deleteMany?: ModerationActionScalarWhereInput | ModerationActionScalarWhereInput[]
  }

  export type ProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    upsert?: ProfileUpsertWithoutUserInput
    disconnect?: ProfileWhereInput | boolean
    delete?: ProfileWhereInput | boolean
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutUserInput, ProfileUpdateWithoutUserInput>, ProfileUncheckedUpdateWithoutUserInput>
  }

  export type ReportUncheckedUpdateManyWithoutReporterNestedInput = {
    create?: XOR<ReportCreateWithoutReporterInput, ReportUncheckedCreateWithoutReporterInput> | ReportCreateWithoutReporterInput[] | ReportUncheckedCreateWithoutReporterInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutReporterInput | ReportCreateOrConnectWithoutReporterInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutReporterInput | ReportUpsertWithWhereUniqueWithoutReporterInput[]
    createMany?: ReportCreateManyReporterInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutReporterInput | ReportUpdateWithWhereUniqueWithoutReporterInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutReporterInput | ReportUpdateManyWithWhereWithoutReporterInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type UserBlockUncheckedUpdateManyWithoutBlockerNestedInput = {
    create?: XOR<UserBlockCreateWithoutBlockerInput, UserBlockUncheckedCreateWithoutBlockerInput> | UserBlockCreateWithoutBlockerInput[] | UserBlockUncheckedCreateWithoutBlockerInput[]
    connectOrCreate?: UserBlockCreateOrConnectWithoutBlockerInput | UserBlockCreateOrConnectWithoutBlockerInput[]
    upsert?: UserBlockUpsertWithWhereUniqueWithoutBlockerInput | UserBlockUpsertWithWhereUniqueWithoutBlockerInput[]
    createMany?: UserBlockCreateManyBlockerInputEnvelope
    set?: UserBlockWhereUniqueInput | UserBlockWhereUniqueInput[]
    disconnect?: UserBlockWhereUniqueInput | UserBlockWhereUniqueInput[]
    delete?: UserBlockWhereUniqueInput | UserBlockWhereUniqueInput[]
    connect?: UserBlockWhereUniqueInput | UserBlockWhereUniqueInput[]
    update?: UserBlockUpdateWithWhereUniqueWithoutBlockerInput | UserBlockUpdateWithWhereUniqueWithoutBlockerInput[]
    updateMany?: UserBlockUpdateManyWithWhereWithoutBlockerInput | UserBlockUpdateManyWithWhereWithoutBlockerInput[]
    deleteMany?: UserBlockScalarWhereInput | UserBlockScalarWhereInput[]
  }

  export type UserBlockUncheckedUpdateManyWithoutBlockedNestedInput = {
    create?: XOR<UserBlockCreateWithoutBlockedInput, UserBlockUncheckedCreateWithoutBlockedInput> | UserBlockCreateWithoutBlockedInput[] | UserBlockUncheckedCreateWithoutBlockedInput[]
    connectOrCreate?: UserBlockCreateOrConnectWithoutBlockedInput | UserBlockCreateOrConnectWithoutBlockedInput[]
    upsert?: UserBlockUpsertWithWhereUniqueWithoutBlockedInput | UserBlockUpsertWithWhereUniqueWithoutBlockedInput[]
    createMany?: UserBlockCreateManyBlockedInputEnvelope
    set?: UserBlockWhereUniqueInput | UserBlockWhereUniqueInput[]
    disconnect?: UserBlockWhereUniqueInput | UserBlockWhereUniqueInput[]
    delete?: UserBlockWhereUniqueInput | UserBlockWhereUniqueInput[]
    connect?: UserBlockWhereUniqueInput | UserBlockWhereUniqueInput[]
    update?: UserBlockUpdateWithWhereUniqueWithoutBlockedInput | UserBlockUpdateWithWhereUniqueWithoutBlockedInput[]
    updateMany?: UserBlockUpdateManyWithWhereWithoutBlockedInput | UserBlockUpdateManyWithWhereWithoutBlockedInput[]
    deleteMany?: UserBlockScalarWhereInput | UserBlockScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type ModerationActionUncheckedUpdateManyWithoutModeratorNestedInput = {
    create?: XOR<ModerationActionCreateWithoutModeratorInput, ModerationActionUncheckedCreateWithoutModeratorInput> | ModerationActionCreateWithoutModeratorInput[] | ModerationActionUncheckedCreateWithoutModeratorInput[]
    connectOrCreate?: ModerationActionCreateOrConnectWithoutModeratorInput | ModerationActionCreateOrConnectWithoutModeratorInput[]
    upsert?: ModerationActionUpsertWithWhereUniqueWithoutModeratorInput | ModerationActionUpsertWithWhereUniqueWithoutModeratorInput[]
    createMany?: ModerationActionCreateManyModeratorInputEnvelope
    set?: ModerationActionWhereUniqueInput | ModerationActionWhereUniqueInput[]
    disconnect?: ModerationActionWhereUniqueInput | ModerationActionWhereUniqueInput[]
    delete?: ModerationActionWhereUniqueInput | ModerationActionWhereUniqueInput[]
    connect?: ModerationActionWhereUniqueInput | ModerationActionWhereUniqueInput[]
    update?: ModerationActionUpdateWithWhereUniqueWithoutModeratorInput | ModerationActionUpdateWithWhereUniqueWithoutModeratorInput[]
    updateMany?: ModerationActionUpdateManyWithWhereWithoutModeratorInput | ModerationActionUpdateManyWithWhereWithoutModeratorInput[]
    deleteMany?: ModerationActionScalarWhereInput | ModerationActionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutProfileInput = {
    create?: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileInput
    connect?: UserWhereUniqueInput
  }

  export type ProfilePhotoCreateNestedManyWithoutProfileInput = {
    create?: XOR<ProfilePhotoCreateWithoutProfileInput, ProfilePhotoUncheckedCreateWithoutProfileInput> | ProfilePhotoCreateWithoutProfileInput[] | ProfilePhotoUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ProfilePhotoCreateOrConnectWithoutProfileInput | ProfilePhotoCreateOrConnectWithoutProfileInput[]
    createMany?: ProfilePhotoCreateManyProfileInputEnvelope
    connect?: ProfilePhotoWhereUniqueInput | ProfilePhotoWhereUniqueInput[]
  }

  export type ReportCreateNestedManyWithoutProfileInput = {
    create?: XOR<ReportCreateWithoutProfileInput, ReportUncheckedCreateWithoutProfileInput> | ReportCreateWithoutProfileInput[] | ReportUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutProfileInput | ReportCreateOrConnectWithoutProfileInput[]
    createMany?: ReportCreateManyProfileInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type ProfileRateCreateNestedManyWithoutProfileInput = {
    create?: XOR<ProfileRateCreateWithoutProfileInput, ProfileRateUncheckedCreateWithoutProfileInput> | ProfileRateCreateWithoutProfileInput[] | ProfileRateUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ProfileRateCreateOrConnectWithoutProfileInput | ProfileRateCreateOrConnectWithoutProfileInput[]
    createMany?: ProfileRateCreateManyProfileInputEnvelope
    connect?: ProfileRateWhereUniqueInput | ProfileRateWhereUniqueInput[]
  }

  export type ProfilePhotoUncheckedCreateNestedManyWithoutProfileInput = {
    create?: XOR<ProfilePhotoCreateWithoutProfileInput, ProfilePhotoUncheckedCreateWithoutProfileInput> | ProfilePhotoCreateWithoutProfileInput[] | ProfilePhotoUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ProfilePhotoCreateOrConnectWithoutProfileInput | ProfilePhotoCreateOrConnectWithoutProfileInput[]
    createMany?: ProfilePhotoCreateManyProfileInputEnvelope
    connect?: ProfilePhotoWhereUniqueInput | ProfilePhotoWhereUniqueInput[]
  }

  export type ReportUncheckedCreateNestedManyWithoutProfileInput = {
    create?: XOR<ReportCreateWithoutProfileInput, ReportUncheckedCreateWithoutProfileInput> | ReportCreateWithoutProfileInput[] | ReportUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutProfileInput | ReportCreateOrConnectWithoutProfileInput[]
    createMany?: ReportCreateManyProfileInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type ProfileRateUncheckedCreateNestedManyWithoutProfileInput = {
    create?: XOR<ProfileRateCreateWithoutProfileInput, ProfileRateUncheckedCreateWithoutProfileInput> | ProfileRateCreateWithoutProfileInput[] | ProfileRateUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ProfileRateCreateOrConnectWithoutProfileInput | ProfileRateCreateOrConnectWithoutProfileInput[]
    createMany?: ProfileRateCreateManyProfileInputEnvelope
    connect?: ProfileRateWhereUniqueInput | ProfileRateWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutProfileNestedInput = {
    create?: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileInput
    upsert?: UserUpsertWithoutProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProfileInput, UserUpdateWithoutProfileInput>, UserUncheckedUpdateWithoutProfileInput>
  }

  export type ProfilePhotoUpdateManyWithoutProfileNestedInput = {
    create?: XOR<ProfilePhotoCreateWithoutProfileInput, ProfilePhotoUncheckedCreateWithoutProfileInput> | ProfilePhotoCreateWithoutProfileInput[] | ProfilePhotoUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ProfilePhotoCreateOrConnectWithoutProfileInput | ProfilePhotoCreateOrConnectWithoutProfileInput[]
    upsert?: ProfilePhotoUpsertWithWhereUniqueWithoutProfileInput | ProfilePhotoUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: ProfilePhotoCreateManyProfileInputEnvelope
    set?: ProfilePhotoWhereUniqueInput | ProfilePhotoWhereUniqueInput[]
    disconnect?: ProfilePhotoWhereUniqueInput | ProfilePhotoWhereUniqueInput[]
    delete?: ProfilePhotoWhereUniqueInput | ProfilePhotoWhereUniqueInput[]
    connect?: ProfilePhotoWhereUniqueInput | ProfilePhotoWhereUniqueInput[]
    update?: ProfilePhotoUpdateWithWhereUniqueWithoutProfileInput | ProfilePhotoUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: ProfilePhotoUpdateManyWithWhereWithoutProfileInput | ProfilePhotoUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: ProfilePhotoScalarWhereInput | ProfilePhotoScalarWhereInput[]
  }

  export type ReportUpdateManyWithoutProfileNestedInput = {
    create?: XOR<ReportCreateWithoutProfileInput, ReportUncheckedCreateWithoutProfileInput> | ReportCreateWithoutProfileInput[] | ReportUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutProfileInput | ReportCreateOrConnectWithoutProfileInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutProfileInput | ReportUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: ReportCreateManyProfileInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutProfileInput | ReportUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutProfileInput | ReportUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type ProfileRateUpdateManyWithoutProfileNestedInput = {
    create?: XOR<ProfileRateCreateWithoutProfileInput, ProfileRateUncheckedCreateWithoutProfileInput> | ProfileRateCreateWithoutProfileInput[] | ProfileRateUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ProfileRateCreateOrConnectWithoutProfileInput | ProfileRateCreateOrConnectWithoutProfileInput[]
    upsert?: ProfileRateUpsertWithWhereUniqueWithoutProfileInput | ProfileRateUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: ProfileRateCreateManyProfileInputEnvelope
    set?: ProfileRateWhereUniqueInput | ProfileRateWhereUniqueInput[]
    disconnect?: ProfileRateWhereUniqueInput | ProfileRateWhereUniqueInput[]
    delete?: ProfileRateWhereUniqueInput | ProfileRateWhereUniqueInput[]
    connect?: ProfileRateWhereUniqueInput | ProfileRateWhereUniqueInput[]
    update?: ProfileRateUpdateWithWhereUniqueWithoutProfileInput | ProfileRateUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: ProfileRateUpdateManyWithWhereWithoutProfileInput | ProfileRateUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: ProfileRateScalarWhereInput | ProfileRateScalarWhereInput[]
  }

  export type ProfilePhotoUncheckedUpdateManyWithoutProfileNestedInput = {
    create?: XOR<ProfilePhotoCreateWithoutProfileInput, ProfilePhotoUncheckedCreateWithoutProfileInput> | ProfilePhotoCreateWithoutProfileInput[] | ProfilePhotoUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ProfilePhotoCreateOrConnectWithoutProfileInput | ProfilePhotoCreateOrConnectWithoutProfileInput[]
    upsert?: ProfilePhotoUpsertWithWhereUniqueWithoutProfileInput | ProfilePhotoUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: ProfilePhotoCreateManyProfileInputEnvelope
    set?: ProfilePhotoWhereUniqueInput | ProfilePhotoWhereUniqueInput[]
    disconnect?: ProfilePhotoWhereUniqueInput | ProfilePhotoWhereUniqueInput[]
    delete?: ProfilePhotoWhereUniqueInput | ProfilePhotoWhereUniqueInput[]
    connect?: ProfilePhotoWhereUniqueInput | ProfilePhotoWhereUniqueInput[]
    update?: ProfilePhotoUpdateWithWhereUniqueWithoutProfileInput | ProfilePhotoUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: ProfilePhotoUpdateManyWithWhereWithoutProfileInput | ProfilePhotoUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: ProfilePhotoScalarWhereInput | ProfilePhotoScalarWhereInput[]
  }

  export type ReportUncheckedUpdateManyWithoutProfileNestedInput = {
    create?: XOR<ReportCreateWithoutProfileInput, ReportUncheckedCreateWithoutProfileInput> | ReportCreateWithoutProfileInput[] | ReportUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutProfileInput | ReportCreateOrConnectWithoutProfileInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutProfileInput | ReportUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: ReportCreateManyProfileInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutProfileInput | ReportUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutProfileInput | ReportUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type ProfileRateUncheckedUpdateManyWithoutProfileNestedInput = {
    create?: XOR<ProfileRateCreateWithoutProfileInput, ProfileRateUncheckedCreateWithoutProfileInput> | ProfileRateCreateWithoutProfileInput[] | ProfileRateUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: ProfileRateCreateOrConnectWithoutProfileInput | ProfileRateCreateOrConnectWithoutProfileInput[]
    upsert?: ProfileRateUpsertWithWhereUniqueWithoutProfileInput | ProfileRateUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: ProfileRateCreateManyProfileInputEnvelope
    set?: ProfileRateWhereUniqueInput | ProfileRateWhereUniqueInput[]
    disconnect?: ProfileRateWhereUniqueInput | ProfileRateWhereUniqueInput[]
    delete?: ProfileRateWhereUniqueInput | ProfileRateWhereUniqueInput[]
    connect?: ProfileRateWhereUniqueInput | ProfileRateWhereUniqueInput[]
    update?: ProfileRateUpdateWithWhereUniqueWithoutProfileInput | ProfileRateUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: ProfileRateUpdateManyWithWhereWithoutProfileInput | ProfileRateUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: ProfileRateScalarWhereInput | ProfileRateScalarWhereInput[]
  }

  export type ProfileCreateNestedOneWithoutPhotosInput = {
    create?: XOR<ProfileCreateWithoutPhotosInput, ProfileUncheckedCreateWithoutPhotosInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutPhotosInput
    connect?: ProfileWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProfileUpdateOneRequiredWithoutPhotosNestedInput = {
    create?: XOR<ProfileCreateWithoutPhotosInput, ProfileUncheckedCreateWithoutPhotosInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutPhotosInput
    upsert?: ProfileUpsertWithoutPhotosInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutPhotosInput, ProfileUpdateWithoutPhotosInput>, ProfileUncheckedUpdateWithoutPhotosInput>
  }

  export type ProfileCreateNestedOneWithoutRatesInput = {
    create?: XOR<ProfileCreateWithoutRatesInput, ProfileUncheckedCreateWithoutRatesInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutRatesInput
    connect?: ProfileWhereUniqueInput
  }

  export type ProfileUpdateOneRequiredWithoutRatesNestedInput = {
    create?: XOR<ProfileCreateWithoutRatesInput, ProfileUncheckedCreateWithoutRatesInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutRatesInput
    upsert?: ProfileUpsertWithoutRatesInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutRatesInput, ProfileUpdateWithoutRatesInput>, ProfileUncheckedUpdateWithoutRatesInput>
  }

  export type ProfileCreateNestedOneWithoutReportsInput = {
    create?: XOR<ProfileCreateWithoutReportsInput, ProfileUncheckedCreateWithoutReportsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutReportsInput
    connect?: ProfileWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReportsSentInput = {
    create?: XOR<UserCreateWithoutReportsSentInput, UserUncheckedCreateWithoutReportsSentInput>
    connectOrCreate?: UserCreateOrConnectWithoutReportsSentInput
    connect?: UserWhereUniqueInput
  }

  export type ProfileUpdateOneRequiredWithoutReportsNestedInput = {
    create?: XOR<ProfileCreateWithoutReportsInput, ProfileUncheckedCreateWithoutReportsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutReportsInput
    upsert?: ProfileUpsertWithoutReportsInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutReportsInput, ProfileUpdateWithoutReportsInput>, ProfileUncheckedUpdateWithoutReportsInput>
  }

  export type UserUpdateOneWithoutReportsSentNestedInput = {
    create?: XOR<UserCreateWithoutReportsSentInput, UserUncheckedCreateWithoutReportsSentInput>
    connectOrCreate?: UserCreateOrConnectWithoutReportsSentInput
    upsert?: UserUpsertWithoutReportsSentInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReportsSentInput, UserUpdateWithoutReportsSentInput>, UserUncheckedUpdateWithoutReportsSentInput>
  }

  export type UserCreateNestedOneWithoutBlocksSentInput = {
    create?: XOR<UserCreateWithoutBlocksSentInput, UserUncheckedCreateWithoutBlocksSentInput>
    connectOrCreate?: UserCreateOrConnectWithoutBlocksSentInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutBlocksRecvInput = {
    create?: XOR<UserCreateWithoutBlocksRecvInput, UserUncheckedCreateWithoutBlocksRecvInput>
    connectOrCreate?: UserCreateOrConnectWithoutBlocksRecvInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutBlocksSentNestedInput = {
    create?: XOR<UserCreateWithoutBlocksSentInput, UserUncheckedCreateWithoutBlocksSentInput>
    connectOrCreate?: UserCreateOrConnectWithoutBlocksSentInput
    upsert?: UserUpsertWithoutBlocksSentInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBlocksSentInput, UserUpdateWithoutBlocksSentInput>, UserUncheckedUpdateWithoutBlocksSentInput>
  }

  export type UserUpdateOneRequiredWithoutBlocksRecvNestedInput = {
    create?: XOR<UserCreateWithoutBlocksRecvInput, UserUncheckedCreateWithoutBlocksRecvInput>
    connectOrCreate?: UserCreateOrConnectWithoutBlocksRecvInput
    upsert?: UserUpsertWithoutBlocksRecvInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBlocksRecvInput, UserUpdateWithoutBlocksRecvInput>, UserUncheckedUpdateWithoutBlocksRecvInput>
  }

  export type UserCreateNestedOneWithoutModActionsInput = {
    create?: XOR<UserCreateWithoutModActionsInput, UserUncheckedCreateWithoutModActionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutModActionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutModActionsNestedInput = {
    create?: XOR<UserCreateWithoutModActionsInput, UserUncheckedCreateWithoutModActionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutModActionsInput
    upsert?: UserUpsertWithoutModActionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutModActionsInput, UserUpdateWithoutModActionsInput>, UserUncheckedUpdateWithoutModActionsInput>
  }

  export type UserCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutAuditLogsNestedInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    upsert?: UserUpsertWithoutAuditLogsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuditLogsInput, UserUpdateWithoutAuditLogsInput>, UserUncheckedUpdateWithoutAuditLogsInput>
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
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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
    search?: string
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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
    search?: string
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
    search?: string
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

  export type ProfileCreateWithoutUserInput = {
    id?: string
    status?: string
    visibility?: string
    moderationNotes?: string | null
    rejectionReason?: string | null
    ageConfirmed?: boolean
    consentRecorded?: boolean
    consentTimestamp?: Date | string | null
    consentVersion?: string | null
    photoUrl?: string | null
    bio?: string | null
    address?: string | null
    city?: string | null
    region?: string | null
    district?: string | null
    localArea?: string | null
    country?: string | null
    favColor?: string | null
    phone?: string | null
    whatsapp?: string | null
    hidePhoneFromPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    photos?: ProfilePhotoCreateNestedManyWithoutProfileInput
    reports?: ReportCreateNestedManyWithoutProfileInput
    rates?: ProfileRateCreateNestedManyWithoutProfileInput
  }

  export type ProfileUncheckedCreateWithoutUserInput = {
    id?: string
    status?: string
    visibility?: string
    moderationNotes?: string | null
    rejectionReason?: string | null
    ageConfirmed?: boolean
    consentRecorded?: boolean
    consentTimestamp?: Date | string | null
    consentVersion?: string | null
    photoUrl?: string | null
    bio?: string | null
    address?: string | null
    city?: string | null
    region?: string | null
    district?: string | null
    localArea?: string | null
    country?: string | null
    favColor?: string | null
    phone?: string | null
    whatsapp?: string | null
    hidePhoneFromPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    photos?: ProfilePhotoUncheckedCreateNestedManyWithoutProfileInput
    reports?: ReportUncheckedCreateNestedManyWithoutProfileInput
    rates?: ProfileRateUncheckedCreateNestedManyWithoutProfileInput
  }

  export type ProfileCreateOrConnectWithoutUserInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
  }

  export type ReportCreateWithoutReporterInput = {
    id?: string
    category: string
    description: string
    status?: string
    actionTaken?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: ProfileCreateNestedOneWithoutReportsInput
  }

  export type ReportUncheckedCreateWithoutReporterInput = {
    id?: string
    profileId: string
    category: string
    description: string
    status?: string
    actionTaken?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReportCreateOrConnectWithoutReporterInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutReporterInput, ReportUncheckedCreateWithoutReporterInput>
  }

  export type ReportCreateManyReporterInputEnvelope = {
    data: ReportCreateManyReporterInput | ReportCreateManyReporterInput[]
    skipDuplicates?: boolean
  }

  export type UserBlockCreateWithoutBlockerInput = {
    id?: string
    createdAt?: Date | string
    blocked: UserCreateNestedOneWithoutBlocksRecvInput
  }

  export type UserBlockUncheckedCreateWithoutBlockerInput = {
    id?: string
    blockedId: string
    createdAt?: Date | string
  }

  export type UserBlockCreateOrConnectWithoutBlockerInput = {
    where: UserBlockWhereUniqueInput
    create: XOR<UserBlockCreateWithoutBlockerInput, UserBlockUncheckedCreateWithoutBlockerInput>
  }

  export type UserBlockCreateManyBlockerInputEnvelope = {
    data: UserBlockCreateManyBlockerInput | UserBlockCreateManyBlockerInput[]
    skipDuplicates?: boolean
  }

  export type UserBlockCreateWithoutBlockedInput = {
    id?: string
    createdAt?: Date | string
    blocker: UserCreateNestedOneWithoutBlocksSentInput
  }

  export type UserBlockUncheckedCreateWithoutBlockedInput = {
    id?: string
    blockerId: string
    createdAt?: Date | string
  }

  export type UserBlockCreateOrConnectWithoutBlockedInput = {
    where: UserBlockWhereUniqueInput
    create: XOR<UserBlockCreateWithoutBlockedInput, UserBlockUncheckedCreateWithoutBlockedInput>
  }

  export type UserBlockCreateManyBlockedInputEnvelope = {
    data: UserBlockCreateManyBlockedInput | UserBlockCreateManyBlockedInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutUserInput = {
    id?: string
    action: string
    details?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUncheckedCreateWithoutUserInput = {
    id?: string
    action: string
    details?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogCreateManyUserInputEnvelope = {
    data: AuditLogCreateManyUserInput | AuditLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ModerationActionCreateWithoutModeratorInput = {
    id?: string
    targetType: string
    targetId: string
    action: string
    reason?: string | null
    createdAt?: Date | string
  }

  export type ModerationActionUncheckedCreateWithoutModeratorInput = {
    id?: string
    targetType: string
    targetId: string
    action: string
    reason?: string | null
    createdAt?: Date | string
  }

  export type ModerationActionCreateOrConnectWithoutModeratorInput = {
    where: ModerationActionWhereUniqueInput
    create: XOR<ModerationActionCreateWithoutModeratorInput, ModerationActionUncheckedCreateWithoutModeratorInput>
  }

  export type ModerationActionCreateManyModeratorInputEnvelope = {
    data: ModerationActionCreateManyModeratorInput | ModerationActionCreateManyModeratorInput[]
    skipDuplicates?: boolean
  }

  export type ProfileUpsertWithoutUserInput = {
    update: XOR<ProfileUpdateWithoutUserInput, ProfileUncheckedUpdateWithoutUserInput>
    create: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutUserInput, ProfileUncheckedUpdateWithoutUserInput>
  }

  export type ProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    visibility?: StringFieldUpdateOperationsInput | string
    moderationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    ageConfirmed?: BoolFieldUpdateOperationsInput | boolean
    consentRecorded?: BoolFieldUpdateOperationsInput | boolean
    consentTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consentVersion?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    localArea?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    favColor?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    hidePhoneFromPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    photos?: ProfilePhotoUpdateManyWithoutProfileNestedInput
    reports?: ReportUpdateManyWithoutProfileNestedInput
    rates?: ProfileRateUpdateManyWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    visibility?: StringFieldUpdateOperationsInput | string
    moderationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    ageConfirmed?: BoolFieldUpdateOperationsInput | boolean
    consentRecorded?: BoolFieldUpdateOperationsInput | boolean
    consentTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consentVersion?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    localArea?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    favColor?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    hidePhoneFromPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    photos?: ProfilePhotoUncheckedUpdateManyWithoutProfileNestedInput
    reports?: ReportUncheckedUpdateManyWithoutProfileNestedInput
    rates?: ProfileRateUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type ReportUpsertWithWhereUniqueWithoutReporterInput = {
    where: ReportWhereUniqueInput
    update: XOR<ReportUpdateWithoutReporterInput, ReportUncheckedUpdateWithoutReporterInput>
    create: XOR<ReportCreateWithoutReporterInput, ReportUncheckedCreateWithoutReporterInput>
  }

  export type ReportUpdateWithWhereUniqueWithoutReporterInput = {
    where: ReportWhereUniqueInput
    data: XOR<ReportUpdateWithoutReporterInput, ReportUncheckedUpdateWithoutReporterInput>
  }

  export type ReportUpdateManyWithWhereWithoutReporterInput = {
    where: ReportScalarWhereInput
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyWithoutReporterInput>
  }

  export type ReportScalarWhereInput = {
    AND?: ReportScalarWhereInput | ReportScalarWhereInput[]
    OR?: ReportScalarWhereInput[]
    NOT?: ReportScalarWhereInput | ReportScalarWhereInput[]
    id?: StringFilter<"Report"> | string
    profileId?: StringFilter<"Report"> | string
    reporterId?: StringNullableFilter<"Report"> | string | null
    category?: StringFilter<"Report"> | string
    description?: StringFilter<"Report"> | string
    status?: StringFilter<"Report"> | string
    actionTaken?: StringNullableFilter<"Report"> | string | null
    ipAddress?: StringNullableFilter<"Report"> | string | null
    createdAt?: DateTimeFilter<"Report"> | Date | string
    updatedAt?: DateTimeFilter<"Report"> | Date | string
  }

  export type UserBlockUpsertWithWhereUniqueWithoutBlockerInput = {
    where: UserBlockWhereUniqueInput
    update: XOR<UserBlockUpdateWithoutBlockerInput, UserBlockUncheckedUpdateWithoutBlockerInput>
    create: XOR<UserBlockCreateWithoutBlockerInput, UserBlockUncheckedCreateWithoutBlockerInput>
  }

  export type UserBlockUpdateWithWhereUniqueWithoutBlockerInput = {
    where: UserBlockWhereUniqueInput
    data: XOR<UserBlockUpdateWithoutBlockerInput, UserBlockUncheckedUpdateWithoutBlockerInput>
  }

  export type UserBlockUpdateManyWithWhereWithoutBlockerInput = {
    where: UserBlockScalarWhereInput
    data: XOR<UserBlockUpdateManyMutationInput, UserBlockUncheckedUpdateManyWithoutBlockerInput>
  }

  export type UserBlockScalarWhereInput = {
    AND?: UserBlockScalarWhereInput | UserBlockScalarWhereInput[]
    OR?: UserBlockScalarWhereInput[]
    NOT?: UserBlockScalarWhereInput | UserBlockScalarWhereInput[]
    id?: StringFilter<"UserBlock"> | string
    blockerId?: StringFilter<"UserBlock"> | string
    blockedId?: StringFilter<"UserBlock"> | string
    createdAt?: DateTimeFilter<"UserBlock"> | Date | string
  }

  export type UserBlockUpsertWithWhereUniqueWithoutBlockedInput = {
    where: UserBlockWhereUniqueInput
    update: XOR<UserBlockUpdateWithoutBlockedInput, UserBlockUncheckedUpdateWithoutBlockedInput>
    create: XOR<UserBlockCreateWithoutBlockedInput, UserBlockUncheckedCreateWithoutBlockedInput>
  }

  export type UserBlockUpdateWithWhereUniqueWithoutBlockedInput = {
    where: UserBlockWhereUniqueInput
    data: XOR<UserBlockUpdateWithoutBlockedInput, UserBlockUncheckedUpdateWithoutBlockedInput>
  }

  export type UserBlockUpdateManyWithWhereWithoutBlockedInput = {
    where: UserBlockScalarWhereInput
    data: XOR<UserBlockUpdateManyMutationInput, UserBlockUncheckedUpdateManyWithoutBlockedInput>
  }

  export type AuditLogUpsertWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutUserInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutUserInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    userId?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    details?: StringNullableFilter<"AuditLog"> | string | null
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type ModerationActionUpsertWithWhereUniqueWithoutModeratorInput = {
    where: ModerationActionWhereUniqueInput
    update: XOR<ModerationActionUpdateWithoutModeratorInput, ModerationActionUncheckedUpdateWithoutModeratorInput>
    create: XOR<ModerationActionCreateWithoutModeratorInput, ModerationActionUncheckedCreateWithoutModeratorInput>
  }

  export type ModerationActionUpdateWithWhereUniqueWithoutModeratorInput = {
    where: ModerationActionWhereUniqueInput
    data: XOR<ModerationActionUpdateWithoutModeratorInput, ModerationActionUncheckedUpdateWithoutModeratorInput>
  }

  export type ModerationActionUpdateManyWithWhereWithoutModeratorInput = {
    where: ModerationActionScalarWhereInput
    data: XOR<ModerationActionUpdateManyMutationInput, ModerationActionUncheckedUpdateManyWithoutModeratorInput>
  }

  export type ModerationActionScalarWhereInput = {
    AND?: ModerationActionScalarWhereInput | ModerationActionScalarWhereInput[]
    OR?: ModerationActionScalarWhereInput[]
    NOT?: ModerationActionScalarWhereInput | ModerationActionScalarWhereInput[]
    id?: StringFilter<"ModerationAction"> | string
    moderatorId?: StringFilter<"ModerationAction"> | string
    targetType?: StringFilter<"ModerationAction"> | string
    targetId?: StringFilter<"ModerationAction"> | string
    action?: StringFilter<"ModerationAction"> | string
    reason?: StringNullableFilter<"ModerationAction"> | string | null
    createdAt?: DateTimeFilter<"ModerationAction"> | Date | string
  }

  export type UserCreateWithoutProfileInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    isSuspended?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    reportsSent?: ReportCreateNestedManyWithoutReporterInput
    blocksSent?: UserBlockCreateNestedManyWithoutBlockerInput
    blocksRecv?: UserBlockCreateNestedManyWithoutBlockedInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
    modActions?: ModerationActionCreateNestedManyWithoutModeratorInput
  }

  export type UserUncheckedCreateWithoutProfileInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    isSuspended?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    reportsSent?: ReportUncheckedCreateNestedManyWithoutReporterInput
    blocksSent?: UserBlockUncheckedCreateNestedManyWithoutBlockerInput
    blocksRecv?: UserBlockUncheckedCreateNestedManyWithoutBlockedInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    modActions?: ModerationActionUncheckedCreateNestedManyWithoutModeratorInput
  }

  export type UserCreateOrConnectWithoutProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
  }

  export type ProfilePhotoCreateWithoutProfileInput = {
    id?: string
    url: string
    sha256Hash?: string | null
    order?: number
    isPrimary?: boolean
    status?: string
    createdAt?: Date | string
  }

  export type ProfilePhotoUncheckedCreateWithoutProfileInput = {
    id?: string
    url: string
    sha256Hash?: string | null
    order?: number
    isPrimary?: boolean
    status?: string
    createdAt?: Date | string
  }

  export type ProfilePhotoCreateOrConnectWithoutProfileInput = {
    where: ProfilePhotoWhereUniqueInput
    create: XOR<ProfilePhotoCreateWithoutProfileInput, ProfilePhotoUncheckedCreateWithoutProfileInput>
  }

  export type ProfilePhotoCreateManyProfileInputEnvelope = {
    data: ProfilePhotoCreateManyProfileInput | ProfilePhotoCreateManyProfileInput[]
    skipDuplicates?: boolean
  }

  export type ReportCreateWithoutProfileInput = {
    id?: string
    category: string
    description: string
    status?: string
    actionTaken?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    reporter?: UserCreateNestedOneWithoutReportsSentInput
  }

  export type ReportUncheckedCreateWithoutProfileInput = {
    id?: string
    reporterId?: string | null
    category: string
    description: string
    status?: string
    actionTaken?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReportCreateOrConnectWithoutProfileInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutProfileInput, ReportUncheckedCreateWithoutProfileInput>
  }

  export type ReportCreateManyProfileInputEnvelope = {
    data: ReportCreateManyProfileInput | ReportCreateManyProfileInput[]
    skipDuplicates?: boolean
  }

  export type ProfileRateCreateWithoutProfileInput = {
    id?: string
    duration: string
    incall: number
    outcall: number
    order?: number
  }

  export type ProfileRateUncheckedCreateWithoutProfileInput = {
    id?: string
    duration: string
    incall: number
    outcall: number
    order?: number
  }

  export type ProfileRateCreateOrConnectWithoutProfileInput = {
    where: ProfileRateWhereUniqueInput
    create: XOR<ProfileRateCreateWithoutProfileInput, ProfileRateUncheckedCreateWithoutProfileInput>
  }

  export type ProfileRateCreateManyProfileInputEnvelope = {
    data: ProfileRateCreateManyProfileInput | ProfileRateCreateManyProfileInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutProfileInput = {
    update: XOR<UserUpdateWithoutProfileInput, UserUncheckedUpdateWithoutProfileInput>
    create: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProfileInput, UserUncheckedUpdateWithoutProfileInput>
  }

  export type UserUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reportsSent?: ReportUpdateManyWithoutReporterNestedInput
    blocksSent?: UserBlockUpdateManyWithoutBlockerNestedInput
    blocksRecv?: UserBlockUpdateManyWithoutBlockedNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
    modActions?: ModerationActionUpdateManyWithoutModeratorNestedInput
  }

  export type UserUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reportsSent?: ReportUncheckedUpdateManyWithoutReporterNestedInput
    blocksSent?: UserBlockUncheckedUpdateManyWithoutBlockerNestedInput
    blocksRecv?: UserBlockUncheckedUpdateManyWithoutBlockedNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    modActions?: ModerationActionUncheckedUpdateManyWithoutModeratorNestedInput
  }

  export type ProfilePhotoUpsertWithWhereUniqueWithoutProfileInput = {
    where: ProfilePhotoWhereUniqueInput
    update: XOR<ProfilePhotoUpdateWithoutProfileInput, ProfilePhotoUncheckedUpdateWithoutProfileInput>
    create: XOR<ProfilePhotoCreateWithoutProfileInput, ProfilePhotoUncheckedCreateWithoutProfileInput>
  }

  export type ProfilePhotoUpdateWithWhereUniqueWithoutProfileInput = {
    where: ProfilePhotoWhereUniqueInput
    data: XOR<ProfilePhotoUpdateWithoutProfileInput, ProfilePhotoUncheckedUpdateWithoutProfileInput>
  }

  export type ProfilePhotoUpdateManyWithWhereWithoutProfileInput = {
    where: ProfilePhotoScalarWhereInput
    data: XOR<ProfilePhotoUpdateManyMutationInput, ProfilePhotoUncheckedUpdateManyWithoutProfileInput>
  }

  export type ProfilePhotoScalarWhereInput = {
    AND?: ProfilePhotoScalarWhereInput | ProfilePhotoScalarWhereInput[]
    OR?: ProfilePhotoScalarWhereInput[]
    NOT?: ProfilePhotoScalarWhereInput | ProfilePhotoScalarWhereInput[]
    id?: StringFilter<"ProfilePhoto"> | string
    profileId?: StringFilter<"ProfilePhoto"> | string
    url?: StringFilter<"ProfilePhoto"> | string
    sha256Hash?: StringNullableFilter<"ProfilePhoto"> | string | null
    order?: IntFilter<"ProfilePhoto"> | number
    isPrimary?: BoolFilter<"ProfilePhoto"> | boolean
    status?: StringFilter<"ProfilePhoto"> | string
    createdAt?: DateTimeFilter<"ProfilePhoto"> | Date | string
  }

  export type ReportUpsertWithWhereUniqueWithoutProfileInput = {
    where: ReportWhereUniqueInput
    update: XOR<ReportUpdateWithoutProfileInput, ReportUncheckedUpdateWithoutProfileInput>
    create: XOR<ReportCreateWithoutProfileInput, ReportUncheckedCreateWithoutProfileInput>
  }

  export type ReportUpdateWithWhereUniqueWithoutProfileInput = {
    where: ReportWhereUniqueInput
    data: XOR<ReportUpdateWithoutProfileInput, ReportUncheckedUpdateWithoutProfileInput>
  }

  export type ReportUpdateManyWithWhereWithoutProfileInput = {
    where: ReportScalarWhereInput
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyWithoutProfileInput>
  }

  export type ProfileRateUpsertWithWhereUniqueWithoutProfileInput = {
    where: ProfileRateWhereUniqueInput
    update: XOR<ProfileRateUpdateWithoutProfileInput, ProfileRateUncheckedUpdateWithoutProfileInput>
    create: XOR<ProfileRateCreateWithoutProfileInput, ProfileRateUncheckedCreateWithoutProfileInput>
  }

  export type ProfileRateUpdateWithWhereUniqueWithoutProfileInput = {
    where: ProfileRateWhereUniqueInput
    data: XOR<ProfileRateUpdateWithoutProfileInput, ProfileRateUncheckedUpdateWithoutProfileInput>
  }

  export type ProfileRateUpdateManyWithWhereWithoutProfileInput = {
    where: ProfileRateScalarWhereInput
    data: XOR<ProfileRateUpdateManyMutationInput, ProfileRateUncheckedUpdateManyWithoutProfileInput>
  }

  export type ProfileRateScalarWhereInput = {
    AND?: ProfileRateScalarWhereInput | ProfileRateScalarWhereInput[]
    OR?: ProfileRateScalarWhereInput[]
    NOT?: ProfileRateScalarWhereInput | ProfileRateScalarWhereInput[]
    id?: StringFilter<"ProfileRate"> | string
    profileId?: StringFilter<"ProfileRate"> | string
    duration?: StringFilter<"ProfileRate"> | string
    incall?: IntFilter<"ProfileRate"> | number
    outcall?: IntFilter<"ProfileRate"> | number
    order?: IntFilter<"ProfileRate"> | number
  }

  export type ProfileCreateWithoutPhotosInput = {
    id?: string
    status?: string
    visibility?: string
    moderationNotes?: string | null
    rejectionReason?: string | null
    ageConfirmed?: boolean
    consentRecorded?: boolean
    consentTimestamp?: Date | string | null
    consentVersion?: string | null
    photoUrl?: string | null
    bio?: string | null
    address?: string | null
    city?: string | null
    region?: string | null
    district?: string | null
    localArea?: string | null
    country?: string | null
    favColor?: string | null
    phone?: string | null
    whatsapp?: string | null
    hidePhoneFromPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProfileInput
    reports?: ReportCreateNestedManyWithoutProfileInput
    rates?: ProfileRateCreateNestedManyWithoutProfileInput
  }

  export type ProfileUncheckedCreateWithoutPhotosInput = {
    id?: string
    userId: string
    status?: string
    visibility?: string
    moderationNotes?: string | null
    rejectionReason?: string | null
    ageConfirmed?: boolean
    consentRecorded?: boolean
    consentTimestamp?: Date | string | null
    consentVersion?: string | null
    photoUrl?: string | null
    bio?: string | null
    address?: string | null
    city?: string | null
    region?: string | null
    district?: string | null
    localArea?: string | null
    country?: string | null
    favColor?: string | null
    phone?: string | null
    whatsapp?: string | null
    hidePhoneFromPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: ReportUncheckedCreateNestedManyWithoutProfileInput
    rates?: ProfileRateUncheckedCreateNestedManyWithoutProfileInput
  }

  export type ProfileCreateOrConnectWithoutPhotosInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutPhotosInput, ProfileUncheckedCreateWithoutPhotosInput>
  }

  export type ProfileUpsertWithoutPhotosInput = {
    update: XOR<ProfileUpdateWithoutPhotosInput, ProfileUncheckedUpdateWithoutPhotosInput>
    create: XOR<ProfileCreateWithoutPhotosInput, ProfileUncheckedCreateWithoutPhotosInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutPhotosInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutPhotosInput, ProfileUncheckedUpdateWithoutPhotosInput>
  }

  export type ProfileUpdateWithoutPhotosInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    visibility?: StringFieldUpdateOperationsInput | string
    moderationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    ageConfirmed?: BoolFieldUpdateOperationsInput | boolean
    consentRecorded?: BoolFieldUpdateOperationsInput | boolean
    consentTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consentVersion?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    localArea?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    favColor?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    hidePhoneFromPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProfileNestedInput
    reports?: ReportUpdateManyWithoutProfileNestedInput
    rates?: ProfileRateUpdateManyWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateWithoutPhotosInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    visibility?: StringFieldUpdateOperationsInput | string
    moderationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    ageConfirmed?: BoolFieldUpdateOperationsInput | boolean
    consentRecorded?: BoolFieldUpdateOperationsInput | boolean
    consentTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consentVersion?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    localArea?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    favColor?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    hidePhoneFromPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ReportUncheckedUpdateManyWithoutProfileNestedInput
    rates?: ProfileRateUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type ProfileCreateWithoutRatesInput = {
    id?: string
    status?: string
    visibility?: string
    moderationNotes?: string | null
    rejectionReason?: string | null
    ageConfirmed?: boolean
    consentRecorded?: boolean
    consentTimestamp?: Date | string | null
    consentVersion?: string | null
    photoUrl?: string | null
    bio?: string | null
    address?: string | null
    city?: string | null
    region?: string | null
    district?: string | null
    localArea?: string | null
    country?: string | null
    favColor?: string | null
    phone?: string | null
    whatsapp?: string | null
    hidePhoneFromPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProfileInput
    photos?: ProfilePhotoCreateNestedManyWithoutProfileInput
    reports?: ReportCreateNestedManyWithoutProfileInput
  }

  export type ProfileUncheckedCreateWithoutRatesInput = {
    id?: string
    userId: string
    status?: string
    visibility?: string
    moderationNotes?: string | null
    rejectionReason?: string | null
    ageConfirmed?: boolean
    consentRecorded?: boolean
    consentTimestamp?: Date | string | null
    consentVersion?: string | null
    photoUrl?: string | null
    bio?: string | null
    address?: string | null
    city?: string | null
    region?: string | null
    district?: string | null
    localArea?: string | null
    country?: string | null
    favColor?: string | null
    phone?: string | null
    whatsapp?: string | null
    hidePhoneFromPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    photos?: ProfilePhotoUncheckedCreateNestedManyWithoutProfileInput
    reports?: ReportUncheckedCreateNestedManyWithoutProfileInput
  }

  export type ProfileCreateOrConnectWithoutRatesInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutRatesInput, ProfileUncheckedCreateWithoutRatesInput>
  }

  export type ProfileUpsertWithoutRatesInput = {
    update: XOR<ProfileUpdateWithoutRatesInput, ProfileUncheckedUpdateWithoutRatesInput>
    create: XOR<ProfileCreateWithoutRatesInput, ProfileUncheckedCreateWithoutRatesInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutRatesInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutRatesInput, ProfileUncheckedUpdateWithoutRatesInput>
  }

  export type ProfileUpdateWithoutRatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    visibility?: StringFieldUpdateOperationsInput | string
    moderationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    ageConfirmed?: BoolFieldUpdateOperationsInput | boolean
    consentRecorded?: BoolFieldUpdateOperationsInput | boolean
    consentTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consentVersion?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    localArea?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    favColor?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    hidePhoneFromPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProfileNestedInput
    photos?: ProfilePhotoUpdateManyWithoutProfileNestedInput
    reports?: ReportUpdateManyWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateWithoutRatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    visibility?: StringFieldUpdateOperationsInput | string
    moderationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    ageConfirmed?: BoolFieldUpdateOperationsInput | boolean
    consentRecorded?: BoolFieldUpdateOperationsInput | boolean
    consentTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consentVersion?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    localArea?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    favColor?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    hidePhoneFromPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    photos?: ProfilePhotoUncheckedUpdateManyWithoutProfileNestedInput
    reports?: ReportUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type ProfileCreateWithoutReportsInput = {
    id?: string
    status?: string
    visibility?: string
    moderationNotes?: string | null
    rejectionReason?: string | null
    ageConfirmed?: boolean
    consentRecorded?: boolean
    consentTimestamp?: Date | string | null
    consentVersion?: string | null
    photoUrl?: string | null
    bio?: string | null
    address?: string | null
    city?: string | null
    region?: string | null
    district?: string | null
    localArea?: string | null
    country?: string | null
    favColor?: string | null
    phone?: string | null
    whatsapp?: string | null
    hidePhoneFromPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProfileInput
    photos?: ProfilePhotoCreateNestedManyWithoutProfileInput
    rates?: ProfileRateCreateNestedManyWithoutProfileInput
  }

  export type ProfileUncheckedCreateWithoutReportsInput = {
    id?: string
    userId: string
    status?: string
    visibility?: string
    moderationNotes?: string | null
    rejectionReason?: string | null
    ageConfirmed?: boolean
    consentRecorded?: boolean
    consentTimestamp?: Date | string | null
    consentVersion?: string | null
    photoUrl?: string | null
    bio?: string | null
    address?: string | null
    city?: string | null
    region?: string | null
    district?: string | null
    localArea?: string | null
    country?: string | null
    favColor?: string | null
    phone?: string | null
    whatsapp?: string | null
    hidePhoneFromPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    photos?: ProfilePhotoUncheckedCreateNestedManyWithoutProfileInput
    rates?: ProfileRateUncheckedCreateNestedManyWithoutProfileInput
  }

  export type ProfileCreateOrConnectWithoutReportsInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutReportsInput, ProfileUncheckedCreateWithoutReportsInput>
  }

  export type UserCreateWithoutReportsSentInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    isSuspended?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutUserInput
    blocksSent?: UserBlockCreateNestedManyWithoutBlockerInput
    blocksRecv?: UserBlockCreateNestedManyWithoutBlockedInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
    modActions?: ModerationActionCreateNestedManyWithoutModeratorInput
  }

  export type UserUncheckedCreateWithoutReportsSentInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    isSuspended?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    blocksSent?: UserBlockUncheckedCreateNestedManyWithoutBlockerInput
    blocksRecv?: UserBlockUncheckedCreateNestedManyWithoutBlockedInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    modActions?: ModerationActionUncheckedCreateNestedManyWithoutModeratorInput
  }

  export type UserCreateOrConnectWithoutReportsSentInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReportsSentInput, UserUncheckedCreateWithoutReportsSentInput>
  }

  export type ProfileUpsertWithoutReportsInput = {
    update: XOR<ProfileUpdateWithoutReportsInput, ProfileUncheckedUpdateWithoutReportsInput>
    create: XOR<ProfileCreateWithoutReportsInput, ProfileUncheckedCreateWithoutReportsInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutReportsInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutReportsInput, ProfileUncheckedUpdateWithoutReportsInput>
  }

  export type ProfileUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    visibility?: StringFieldUpdateOperationsInput | string
    moderationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    ageConfirmed?: BoolFieldUpdateOperationsInput | boolean
    consentRecorded?: BoolFieldUpdateOperationsInput | boolean
    consentTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consentVersion?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    localArea?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    favColor?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    hidePhoneFromPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProfileNestedInput
    photos?: ProfilePhotoUpdateManyWithoutProfileNestedInput
    rates?: ProfileRateUpdateManyWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    visibility?: StringFieldUpdateOperationsInput | string
    moderationNotes?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    ageConfirmed?: BoolFieldUpdateOperationsInput | boolean
    consentRecorded?: BoolFieldUpdateOperationsInput | boolean
    consentTimestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consentVersion?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    localArea?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    favColor?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    hidePhoneFromPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    photos?: ProfilePhotoUncheckedUpdateManyWithoutProfileNestedInput
    rates?: ProfileRateUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type UserUpsertWithoutReportsSentInput = {
    update: XOR<UserUpdateWithoutReportsSentInput, UserUncheckedUpdateWithoutReportsSentInput>
    create: XOR<UserCreateWithoutReportsSentInput, UserUncheckedCreateWithoutReportsSentInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReportsSentInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReportsSentInput, UserUncheckedUpdateWithoutReportsSentInput>
  }

  export type UserUpdateWithoutReportsSentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
    blocksSent?: UserBlockUpdateManyWithoutBlockerNestedInput
    blocksRecv?: UserBlockUpdateManyWithoutBlockedNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
    modActions?: ModerationActionUpdateManyWithoutModeratorNestedInput
  }

  export type UserUncheckedUpdateWithoutReportsSentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    blocksSent?: UserBlockUncheckedUpdateManyWithoutBlockerNestedInput
    blocksRecv?: UserBlockUncheckedUpdateManyWithoutBlockedNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    modActions?: ModerationActionUncheckedUpdateManyWithoutModeratorNestedInput
  }

  export type UserCreateWithoutBlocksSentInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    isSuspended?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutUserInput
    reportsSent?: ReportCreateNestedManyWithoutReporterInput
    blocksRecv?: UserBlockCreateNestedManyWithoutBlockedInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
    modActions?: ModerationActionCreateNestedManyWithoutModeratorInput
  }

  export type UserUncheckedCreateWithoutBlocksSentInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    isSuspended?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    reportsSent?: ReportUncheckedCreateNestedManyWithoutReporterInput
    blocksRecv?: UserBlockUncheckedCreateNestedManyWithoutBlockedInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    modActions?: ModerationActionUncheckedCreateNestedManyWithoutModeratorInput
  }

  export type UserCreateOrConnectWithoutBlocksSentInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBlocksSentInput, UserUncheckedCreateWithoutBlocksSentInput>
  }

  export type UserCreateWithoutBlocksRecvInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    isSuspended?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutUserInput
    reportsSent?: ReportCreateNestedManyWithoutReporterInput
    blocksSent?: UserBlockCreateNestedManyWithoutBlockerInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
    modActions?: ModerationActionCreateNestedManyWithoutModeratorInput
  }

  export type UserUncheckedCreateWithoutBlocksRecvInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    isSuspended?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    reportsSent?: ReportUncheckedCreateNestedManyWithoutReporterInput
    blocksSent?: UserBlockUncheckedCreateNestedManyWithoutBlockerInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    modActions?: ModerationActionUncheckedCreateNestedManyWithoutModeratorInput
  }

  export type UserCreateOrConnectWithoutBlocksRecvInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBlocksRecvInput, UserUncheckedCreateWithoutBlocksRecvInput>
  }

  export type UserUpsertWithoutBlocksSentInput = {
    update: XOR<UserUpdateWithoutBlocksSentInput, UserUncheckedUpdateWithoutBlocksSentInput>
    create: XOR<UserCreateWithoutBlocksSentInput, UserUncheckedCreateWithoutBlocksSentInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBlocksSentInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBlocksSentInput, UserUncheckedUpdateWithoutBlocksSentInput>
  }

  export type UserUpdateWithoutBlocksSentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
    reportsSent?: ReportUpdateManyWithoutReporterNestedInput
    blocksRecv?: UserBlockUpdateManyWithoutBlockedNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
    modActions?: ModerationActionUpdateManyWithoutModeratorNestedInput
  }

  export type UserUncheckedUpdateWithoutBlocksSentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    reportsSent?: ReportUncheckedUpdateManyWithoutReporterNestedInput
    blocksRecv?: UserBlockUncheckedUpdateManyWithoutBlockedNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    modActions?: ModerationActionUncheckedUpdateManyWithoutModeratorNestedInput
  }

  export type UserUpsertWithoutBlocksRecvInput = {
    update: XOR<UserUpdateWithoutBlocksRecvInput, UserUncheckedUpdateWithoutBlocksRecvInput>
    create: XOR<UserCreateWithoutBlocksRecvInput, UserUncheckedCreateWithoutBlocksRecvInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBlocksRecvInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBlocksRecvInput, UserUncheckedUpdateWithoutBlocksRecvInput>
  }

  export type UserUpdateWithoutBlocksRecvInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
    reportsSent?: ReportUpdateManyWithoutReporterNestedInput
    blocksSent?: UserBlockUpdateManyWithoutBlockerNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
    modActions?: ModerationActionUpdateManyWithoutModeratorNestedInput
  }

  export type UserUncheckedUpdateWithoutBlocksRecvInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    reportsSent?: ReportUncheckedUpdateManyWithoutReporterNestedInput
    blocksSent?: UserBlockUncheckedUpdateManyWithoutBlockerNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    modActions?: ModerationActionUncheckedUpdateManyWithoutModeratorNestedInput
  }

  export type UserCreateWithoutModActionsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    isSuspended?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutUserInput
    reportsSent?: ReportCreateNestedManyWithoutReporterInput
    blocksSent?: UserBlockCreateNestedManyWithoutBlockerInput
    blocksRecv?: UserBlockCreateNestedManyWithoutBlockedInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutModActionsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    isSuspended?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    reportsSent?: ReportUncheckedCreateNestedManyWithoutReporterInput
    blocksSent?: UserBlockUncheckedCreateNestedManyWithoutBlockerInput
    blocksRecv?: UserBlockUncheckedCreateNestedManyWithoutBlockedInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutModActionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutModActionsInput, UserUncheckedCreateWithoutModActionsInput>
  }

  export type UserUpsertWithoutModActionsInput = {
    update: XOR<UserUpdateWithoutModActionsInput, UserUncheckedUpdateWithoutModActionsInput>
    create: XOR<UserCreateWithoutModActionsInput, UserUncheckedCreateWithoutModActionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutModActionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutModActionsInput, UserUncheckedUpdateWithoutModActionsInput>
  }

  export type UserUpdateWithoutModActionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
    reportsSent?: ReportUpdateManyWithoutReporterNestedInput
    blocksSent?: UserBlockUpdateManyWithoutBlockerNestedInput
    blocksRecv?: UserBlockUpdateManyWithoutBlockedNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutModActionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    reportsSent?: ReportUncheckedUpdateManyWithoutReporterNestedInput
    blocksSent?: UserBlockUncheckedUpdateManyWithoutBlockerNestedInput
    blocksRecv?: UserBlockUncheckedUpdateManyWithoutBlockedNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAuditLogsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    isSuspended?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutUserInput
    reportsSent?: ReportCreateNestedManyWithoutReporterInput
    blocksSent?: UserBlockCreateNestedManyWithoutBlockerInput
    blocksRecv?: UserBlockCreateNestedManyWithoutBlockedInput
    modActions?: ModerationActionCreateNestedManyWithoutModeratorInput
  }

  export type UserUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    role?: string
    isSuspended?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    reportsSent?: ReportUncheckedCreateNestedManyWithoutReporterInput
    blocksSent?: UserBlockUncheckedCreateNestedManyWithoutBlockerInput
    blocksRecv?: UserBlockUncheckedCreateNestedManyWithoutBlockedInput
    modActions?: ModerationActionUncheckedCreateNestedManyWithoutModeratorInput
  }

  export type UserCreateOrConnectWithoutAuditLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
  }

  export type UserUpsertWithoutAuditLogsInput = {
    update: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type UserUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
    reportsSent?: ReportUpdateManyWithoutReporterNestedInput
    blocksSent?: UserBlockUpdateManyWithoutBlockerNestedInput
    blocksRecv?: UserBlockUpdateManyWithoutBlockedNestedInput
    modActions?: ModerationActionUpdateManyWithoutModeratorNestedInput
  }

  export type UserUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isSuspended?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    reportsSent?: ReportUncheckedUpdateManyWithoutReporterNestedInput
    blocksSent?: UserBlockUncheckedUpdateManyWithoutBlockerNestedInput
    blocksRecv?: UserBlockUncheckedUpdateManyWithoutBlockedNestedInput
    modActions?: ModerationActionUncheckedUpdateManyWithoutModeratorNestedInput
  }

  export type ReportCreateManyReporterInput = {
    id?: string
    profileId: string
    category: string
    description: string
    status?: string
    actionTaken?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserBlockCreateManyBlockerInput = {
    id?: string
    blockedId: string
    createdAt?: Date | string
  }

  export type UserBlockCreateManyBlockedInput = {
    id?: string
    blockerId: string
    createdAt?: Date | string
  }

  export type AuditLogCreateManyUserInput = {
    id?: string
    action: string
    details?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type ModerationActionCreateManyModeratorInput = {
    id?: string
    targetType: string
    targetId: string
    action: string
    reason?: string | null
    createdAt?: Date | string
  }

  export type ReportUpdateWithoutReporterInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    actionTaken?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneRequiredWithoutReportsNestedInput
  }

  export type ReportUncheckedUpdateWithoutReporterInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    actionTaken?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUncheckedUpdateManyWithoutReporterInput = {
    id?: StringFieldUpdateOperationsInput | string
    profileId?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    actionTaken?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserBlockUpdateWithoutBlockerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    blocked?: UserUpdateOneRequiredWithoutBlocksRecvNestedInput
  }

  export type UserBlockUncheckedUpdateWithoutBlockerInput = {
    id?: StringFieldUpdateOperationsInput | string
    blockedId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserBlockUncheckedUpdateManyWithoutBlockerInput = {
    id?: StringFieldUpdateOperationsInput | string
    blockedId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserBlockUpdateWithoutBlockedInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    blocker?: UserUpdateOneRequiredWithoutBlocksSentNestedInput
  }

  export type UserBlockUncheckedUpdateWithoutBlockedInput = {
    id?: StringFieldUpdateOperationsInput | string
    blockerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserBlockUncheckedUpdateManyWithoutBlockedInput = {
    id?: StringFieldUpdateOperationsInput | string
    blockerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModerationActionUpdateWithoutModeratorInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModerationActionUncheckedUpdateWithoutModeratorInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModerationActionUncheckedUpdateManyWithoutModeratorInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfilePhotoCreateManyProfileInput = {
    id?: string
    url: string
    sha256Hash?: string | null
    order?: number
    isPrimary?: boolean
    status?: string
    createdAt?: Date | string
  }

  export type ReportCreateManyProfileInput = {
    id?: string
    reporterId?: string | null
    category: string
    description: string
    status?: string
    actionTaken?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfileRateCreateManyProfileInput = {
    id?: string
    duration: string
    incall: number
    outcall: number
    order?: number
  }

  export type ProfilePhotoUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    sha256Hash?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfilePhotoUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    sha256Hash?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfilePhotoUncheckedUpdateManyWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    sha256Hash?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    actionTaken?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reporter?: UserUpdateOneWithoutReportsSentNestedInput
  }

  export type ReportUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    reporterId?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    actionTaken?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUncheckedUpdateManyWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    reporterId?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    actionTaken?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileRateUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    incall?: IntFieldUpdateOperationsInput | number
    outcall?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
  }

  export type ProfileRateUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    incall?: IntFieldUpdateOperationsInput | number
    outcall?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
  }

  export type ProfileRateUncheckedUpdateManyWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    incall?: IntFieldUpdateOperationsInput | number
    outcall?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
  }



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