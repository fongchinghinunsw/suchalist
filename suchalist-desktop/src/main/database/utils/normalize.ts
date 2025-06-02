type Row = Record<string, string | number | null>;
type Data = Record<string, unknown>;

/**
 *
 * @param input Data in the format used by the frontend.
 * @returns Row in the format that can be stored in the database.
 */
export function normalize<I extends Data, O extends Row>(input: I): O {
  const output: Row = {};

  for (const [key, value] of Object.entries(input)) {
    if (typeof value === 'boolean') {
      output[key] = value ? 1 : 0;
    } else if (typeof value === 'string') {
      output[key] = value;
    } else if (value === undefined) {
      output[key] = null;
    }
  }

  return output as O;
}
