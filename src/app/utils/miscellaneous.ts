/**
 * Gets the enum member type for the given value or throws if none is found.
 * @param enumType The enum object to get the members from.
 * @param value The value to check for in the enum.
 */
export function getEnumMember<T>(
  enumType: T,
  value: number | string
): T[keyof T];

export function getEnumMember<T extends Record<string, unknown>>(
  enumType: T,
  value: number | string | null | undefined,
  defaultMember?: T[keyof T] | null
): T[keyof T] | null {
  if (value !== null && value !== undefined && isEnumMember(enumType, value)) {
    return value;
  } else if (defaultMember === undefined) {
    throw new Error(
      `Missing enum member for value "${String(
        value
      )}" and no default was provided.`
    );
  } else {
    return defaultMember;
  }
}

function isEnumMember<T extends Record<string, unknown>>(
  enumType: T,
  value: unknown
): value is T[keyof T] {
  return Object.values(enumType).includes(value);
}
