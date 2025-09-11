// export function cleanConfig<T>(input: T, keepEmptyKeys: string[] = []): T {
//   if (Array.isArray(input)) {
//     const cleaned = input
//       .map(item => cleanConfig(item, keepEmptyKeys))
//       .filter(v => !isEmpty(v));
//     return cleaned as unknown as T;
//   }

//   if (typeof input === "object" && input !== null) {
//     const result = Object.entries(input).reduce((acc, [k, v]) => {
//       const cleaned = cleanConfig(v, keepEmptyKeys);

//       if (!isEmpty(cleaned) || keepEmptyKeys.includes(k)) {
//         (acc as any)[k] = cleaned;
//       }
//       return acc;
//     }, {} as any);
//     return result as unknown as T;
//   }

//   return input;
// }

// function isEmpty(value: any): boolean {
//   if (value == null) return true;
//   if (value instanceof RegExp) return false;
//   if (typeof value === "string") return value.trim().length === 0;
//   if (Array.isArray(value)) return value.length === 0;
//   if (typeof value === "object") return Object.keys(value).length === 0;
//   return false;
// }


export function cleanConfig<T>(input: T, keepEmptyKeys: string[] = []): T {
  if (Array.isArray(input)) {
    const cleaned = input
      .map(item => cleanConfig(item, keepEmptyKeys))
      .filter(v => !isEmpty(v));
    return cleaned as unknown as T;
  }

  if (typeof input === "object" && input !== null) {
    const result = Object.entries(input).reduce((acc, [k, v]) => {
      const cleaned = cleanConfig(v, keepEmptyKeys);

      if (!isEmpty(cleaned) || keepEmptyKeys.includes(k)) {
        (acc as any)[k] = cleaned;
      }
      return acc;
    }, {} as any);
    return result as unknown as T;
  }

  return input;
}

function isEmpty(value: any): boolean {
  if (value == null) return true;
  if (value instanceof RegExp) return false; // keep regex
  if (typeof value === "string") return value.trim().length === 0;
  if (Array.isArray(value)) {
    if (value.length === 0) return true;
    return value.every(isEmpty); // check recursively
  }
  if (typeof value === "object") {
    const keys = Object.keys(value);
    if (keys.length === 0) return true;
    // if any nested value is a RegExp, treat object as non-empty
    for (const val of Object.values(value)) {
      if (val instanceof RegExp) return false;
      if (!isEmpty(val)) return false;
    }
    return true;
  }
  return false;
}
