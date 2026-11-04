/**
 * Turns an exhaustive lookup table into a mapper function.
 *
 * Because the table has to be a full `Record<K, V>`, adding a new key to `K`
 * is a compile error until the table is extended.
 *
 * @example
 * const toColor = createLookup<'on' | 'off', string>({ on: 'green', off: 'gray' });
 * toColor('on'); // 'green'
 */
export function createLookup<K extends PropertyKey, V>(
  table: Readonly<Record<K, V>>,
): (key: K) => V {
  return (key) => table[key];
}
