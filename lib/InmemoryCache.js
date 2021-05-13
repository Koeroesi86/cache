// noinspection JSUnusedGlobalSymbols

const JsonStore = require("./JsonStore");

function InmemoryCache(initialStore, onExpire) {
  let store = JsonStore();

  let timers = {};

  let onExpireCallback = () => {};

  if (typeof initialStore === "object") {
    Object.keys(initialStore).forEach((key) => {
      store[key] = initialStore[key];
    });
  }
  if (typeof onExpire === "function") onExpireCallback = onExpire;

  this.has = (key) => typeof store[key] !== "undefined";

  this.get = (key) => {
    return store[key];
  };

  this.set = (key, data, interval) => {
    store[key] = data;

    if (timers[key] !== undefined) {
      clearTimeout(timers[key]);
      delete timers[key];
    }

    if (!Number.isNaN(interval) && interval > 0) {
      timers[key] = setTimeout(() => {
        onExpireCallback(key, store[key]);
        delete store[key];
        delete timers[key];
      }, Number(interval));
    }
  };

  this.all = () => Object.keys(store).reduce((result, key) => ({ ...result, [key]: store[key] }), {});

  this.flush = () => {
    Object.keys(store).forEach((key) => {
      onExpireCallback(key, store[key]);
      delete store[key];
      delete timers[key];
    });
  };
}

module.exports.InmemoryCache = InmemoryCache;
