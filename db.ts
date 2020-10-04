import * as fbAdmin from "firebase-admin";
import { isTesting, secrets } from "./env";

/**
 * Firebase
 */

const { firebaseCredentials: creds } = secrets;

creds.credential = fbAdmin.credential.cert(creds.credential);
fbAdmin.initializeApp(creds as any);

export const db = (fbAdmin.database() as unknown) as DBWithChildren<
  Firebase.Root
>;

export const admin = fbAdmin;

export function getVal<T = unknown>(
  ref: DB<T> | DBWithChildren<T>
): Promise<T | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (ref as any).once("value").then((s: any) => {
    /* Useful for debugging db usage */
    // const path = (ref as any).path.pieces_.join('/');
    // const bytes = JSON.stringify(s.val()).length;
    // const sizeStr =
    //   bytes < 1048576
    //     ? `${(bytes / 1024).toFixed(2)} KiB`
    //     : `${(bytes / 1048576).toFixed(2)} MiB`;
    // console.log(`${sizeStr}: ${path}`);

    return s.val();
  });
}

type Shallow<T> = T extends object ? { [K in keyof T]: true } : T;

export async function getValShallow<T = unknown>(
  ref: DB<T> | DBWithChildren<T>
): Promise<Shallow<T> | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const path: string = (ref as any).path.pieces_.join("/");
  // For testing, just simulate
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const val = await (ref as any).once("value").then((s: any) => s.val());
  if (val && typeof val === "object") {
    const res: { [key: string]: true } = {};
    Object.keys(res).forEach((k) => {
      res[k] = true;
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return res as any;
  } else {
    return val;
  }
}

type SuccessRes<T> = { aborted: false; val: T };
type AbortedRes<T> = { aborted: true; val: T | null };
type AtomicRes<T> = SuccessRes<T> | AbortedRes<T>;

export async function atomicWrite<T = unknown>(
  ref: DB<T> | DBWithChildren<T>,
  updater: (curVal: T | null) => T
): Promise<SuccessRes<T>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const res = await (ref as any).transaction(updater);
  const val: T = res.snapshot.val();
  if (!res.committed) {
    // Typescript should prevent this case
    throw Error("Atomic write was not committed in atomicReadWrite");
  } else {
    // We successfully did the write
    return { aborted: false, val };
  }
}

export async function abortableAtomicWrite<T = unknown>(
  ref: DB<T> | DBWithChildren<T>,
  // Return undefined causes the write to be aborted
  updater: (curVal: T | null) => T | undefined
): Promise<AtomicRes<T>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const res = await (ref as any).transaction(updater);
  const val = res.snapshot.val();
  if (!res.committed) {
    // We aborted the write (by returning undefined)
    return { aborted: true, val };
  } else {
    // We successfully did the write
    return { aborted: false, val };
  }
}

export function removeUndefined<T>(v: T) {
  return JSON.parse(JSON.stringify(v)) as UndefToNull<T>;
}

/* Here be Fancy Types */

interface DB<T> {
  set: (v: SetType<T> | null) => Promise<void>;
  update: (v: UpdateType<T> | null) => Promise<void>;
  push: (v: PushType<T>) => Promise<{ key: string }>;
}

type Nullish = undefined | null;

interface DBWithChildren<T> extends DB<T> {
  child<K extends keyof T>(
    key: K
  ): Exclude<T[K], Nullish> extends object
    ? DBWithChildren<Exclude<T[K], Nullish>>
    : DB<T[K]>;
  ref<K extends keyof T>(
    key: K
  ): Exclude<T[K], Nullish> extends object
    ? DBWithChildren<Exclude<T[K], Nullish>>
    : DB<T[K]>;
  orderByKey: () => DB<T>;
  orderByChild<K extends keyof T>(
    key: K
  ): Exclude<T[K], Nullish> extends object
    ? DBWithChildren<Exclude<T[K], Nullish>>
    : DB<T[K]>;
  limitToLast: (n: number) => DB<T>;
}

/**
 * Writing types.  These will allow writing undefined, even though firebase
 * will throw.  Hopefully tests will catch that, as it's impossible to check
 * in Typescript without https://github.com/microsoft/TypeScript/issues/13195
 */

// Set must include all required fields, no undefined
export type SetType<T> = UndefToNullKeepOptional<T>;

// Update must include nullable partial of required fields, no undefined
type UpdateType<T> = RecursivePartial<MakeNullable<UndefToNull<T>>>;

// Push must include all of required fields of the child, no undefined
// If there is no child, don't allow anything
type PushType<T> = Indexable<T> extends true
  ? T extends Pushable
    ? SetType<T[""]>
    : unknown
  : unknown;

// One day getval and stuff should use this
export type GetType<T> = UndefToNull<T>;

/**
 * UndefToNull
 *
 * Basically the two options differ in if they consider ? to be undefined.
 * One preserves the ?, the other removes it.
 * */

type UndefToNull<T> = T extends undefined
  ? null // If val = undefined, return null
  : T extends Array<infer U>
  ? UndefToNullArray<U> // If val = Array, convert array
  : T extends object // If val = object, recurse
  ? {
      [K in keyof T]-?: Indexable<T> extends true
        ? UndefToNull<T[K]> | null // If its an index signature, null is valid
        : UndefToNull<T[K]>;
    }
  : T;

interface UndefToNullArray<T> extends Array<UndefToNull<T>> {}

type UndefToNullKeepOptional<T> = T extends undefined
  ? null
  : T extends Array<infer U>
  ? UndefToNullKeepOptionalArray<U>
  : T extends object
  ? {
      [K in keyof T]: Indexable<T> extends true
        ? UndefToNullKeepOptional<T[K]> | null
        : UndefToNullKeepOptional<T[K]>;
    }
  : T;

interface UndefToNullKeepOptionalArray<T>
  extends Array<UndefToNullKeepOptional<T>> {}

type MakeNullable<T> = T extends Array<infer U>
  ? MakeNullableArray<U>
  : T extends object
  ? { [K in keyof T]: MakeNullable<T[K]> }
  : T | null;

interface MakeNullableArray<T> extends Array<MakeNullable<T>> {}

type RecursivePartial<T> = T extends Array<infer U>
  ? RecursivePartialArray<U>
  : T extends object
  ? { [K in keyof T]?: RecursivePartial<T[K]> }
  : T;

interface RecursivePartialArray<T> extends Array<RecursivePartial<T>> {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Indexable<T> = T extends { [k: string]: any }
  ? unknown extends T["dkljfdslfldk"]
    ? false
    : true
  : true;

interface Pushable {
  [key: string]: unknown;
}
