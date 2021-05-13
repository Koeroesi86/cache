# @koeroesi86/cache

### Install

```shell
yarn add @koeroesi86/cache
```

or
```shell
npm install --save @koeroesi86/cache
```

Usage example

```javascript
const { InmemoryCache } = require('@koeroesi86/cache')

const initialState = {};
const expiredCallback = console.log;
const cache = new InmemoryCache(initialState, expiredCallback);

// key, value, expiry
cache.set("example", { data: "thing" }, 5000);

console.log("cached:", cache.get("example"));
```

```typescript
declare class InmemoryCache<T = any> {
  has: (key: string) => boolean;
  get: (key: string) => T;
  set: (key: string, data: T, interval?: number) => void;
  all: () => { [key: string]: T };
  flush: () => void;
}
```

See full example in [example/index.js](example/index.js)