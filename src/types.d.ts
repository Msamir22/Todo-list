// Handle the `never` case explicitly since `Extract<keyof never, string>` gets
// resolved to `string` which isn't likely ever what we want.
type StringKeys<T> = T extends never ? never : Extract<keyof T, string>;

/**
 * The non-function property names of class T.
 */
type ClassPropertyNames<T> = {
  // We do want to match against any function here, so this should be fine.
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof Required<T>]: T[K] extends Function ? never : K;
}[StringKeys<T>];

/**
 * Pick the non-function properties from Class.
 */
type ClassProperties<Class> = Pick<Class, ClassPropertyNames<Class>>;
