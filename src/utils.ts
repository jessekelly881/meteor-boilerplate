export const getKeys = Object.keys as <T extends object>(
  obj: T,
) => Array<keyof T>;

const exp = {};
export default exp;
