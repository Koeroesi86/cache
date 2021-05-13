const { InmemoryCache } = require("./InmemoryCache");

jest.useFakeTimers();
jest.mock("./JsonStore");

describe("InmemoryCache", () => {
  it("should set things", () => {
    const cache = new InmemoryCache();

    cache.set("things", [1, 2, 3]);

    expect(cache.has("things")).toBe(true);
    expect(cache.get("things")).toEqual([1, 2, 3]);
  });

  it("should set initial values", () => {
    const values = { things: [1, 2, 3] };
    const cache = new InmemoryCache(values);

    expect(cache.all()).toEqual(values);
  });

  it("should expire things", () => {
    const cache = new InmemoryCache({});

    cache.set("things", [1, 2, 3], 1000);
    jest.advanceTimersByTime(1001);

    expect(cache.has("things")).toBe(false);
    expect(cache.get("things")).toEqual(undefined);
  });

  it("should onExpire when things expire", () => {
    const onExpire = jest.fn();
    const cache = new InmemoryCache({}, onExpire);

    cache.set("things", [1, 2, 3], 1000);
    jest.advanceTimersByTime(1001);

    expect(cache.has("things")).toBe(false);
    expect(cache.get("things")).toEqual(undefined);
    expect(onExpire).toHaveBeenCalledTimes(1);
  });

  it("should flush store", () => {
    const onExpire = jest.fn();
    const cache = new InmemoryCache({}, onExpire);

    cache.set("things", [1, 2, 3]);
    cache.flush();

    expect(cache.has("things")).toBe(false);
    expect(cache.get("things")).toEqual(undefined);
    expect(onExpire).toHaveBeenCalledTimes(1);
  });

  it("should debounce onExpire call", () => {
    const onExpire = jest.fn();
    const cache = new InmemoryCache({}, onExpire);

    cache.set("things", [1, 2, 3], 1000);
    cache.set("things", [1, 2, 3, 4], 1000);
    jest.advanceTimersByTime(1001);

    expect(cache.has("things")).toBe(false);
    expect(cache.get("things")).toEqual(undefined);
    expect(onExpire).toHaveBeenCalledTimes(1);
  });
});
