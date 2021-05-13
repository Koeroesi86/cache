declare class InmemoryCache<T = any> {
  has: (key: string) => boolean;
  get: (key: string) => T;
  set: (key: string, data: T, interval?: number) => void;
  all: () => { [key: string]: T };
  flush: () => void;
}
