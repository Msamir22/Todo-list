type StringKeys<T> = T extends never ? never : Extract<keyof T, string>;

/**
 * The non-function property names of class T.
 */
type ClassPropertyNames<T> = {
  [K in keyof Required<T>]: T[K] extends Function ? never : K;
}[StringKeys<T>];

/**
 * Pick the non-function properties from Class.
 */
type ClassProperties<Class> = Pick<Class, ClassPropertyNames<Class>>;
