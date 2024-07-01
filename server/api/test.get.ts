import { prefixStorage } from "unstorage"

export default defineEventHandler((event) => {
  return ((globalThis as any)['CACHE'] ||
      (globalThis as any).__env__?.['CACHE']) as KVNamespace | R2Bucket;
})
