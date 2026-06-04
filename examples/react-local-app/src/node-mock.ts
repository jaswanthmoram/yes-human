export const existsSync = () => false;
export const readFileSync = () => "";
export const readdirSync = () => [];
export const join = (...args: string[]) => args.join("/");
export const resolve = (...args: string[]) => args.join("/");
export const dirname = (p: string) => p;
export const isAbsolute = () => false;
export const relative = (_from: string, to: string) => to;
export const fileURLToPath = (url: string) => url;

export default {
  existsSync,
  readFileSync,
  readdirSync,
  join,
  resolve,
  dirname,
  isAbsolute,
  relative,
  fileURLToPath
};
