const JsonStore = require("./JsonStore");

describe("JsonStore", () => {
  it("should store things", () => {
    const store = JsonStore();
    store.things = [1, 2, 3];

    expect("things" in store).toBe(true);
    expect(Object.keys(store)).toEqual(["things"]);
    expect(store.things).toEqual([1, 2, 3]);
  });

  it("should not set undefined", () => {
    const store = JsonStore();
    store.things = undefined;

    expect(store.things).toEqual(undefined);
    expect("things" in store).toBe(false);
  });

  it("should return undefined", () => {
    const store = JsonStore();

    expect(store.things).toEqual(undefined);
  });

  it("should delete things", () => {
    const store = JsonStore();
    store.things = [1, 2, 3];

    delete store.things;

    expect("things" in store).toBe(false);
  });

  it("should not delete unknown", () => {
    const store = JsonStore();
    store.things = [1, 2, 3];

    expect(Reflect.deleteProperty(store, "unknown")).toBe(false);
  });

  it("should define property", () => {
    const store = JsonStore();

    Object.defineProperty(store, "things", { value: [1, 2, 3] });

    expect(store.things).toEqual([1, 2, 3]);
  });

  it("should not define property with no value", () => {
    const store = JsonStore();

    Object.defineProperty(store, "things", {});

    expect("things" in store).toBe(false);
  });
});
