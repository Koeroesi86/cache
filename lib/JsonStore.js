const encode = (data) => JSON.stringify(data);
const decode = (data) => JSON.parse(data);

const JsonStore = () =>
  new Proxy(
    {},
    {
      get(target, prop) {
        if (!(prop in target)) return undefined;
        return decode(target[prop]);
      },
      set(target, prop, value) {
        if (value !== undefined) target[prop] = encode(value);
        return true;
      },
      has(target, prop) {
        return prop in target;
      },
      ownKeys(target) {
        return Object.keys(target);
      },
      deleteProperty(target, prop) {
        if (!target.hasOwnProperty(prop)) {
          return false;
        }
        delete target[prop];
        return true;
      },
      defineProperty(target, prop, descriptor) {
        if (descriptor && "value" in descriptor) {
          target[prop] = encode(descriptor.value);
        }
        return target;
      },
    }
  );

module.exports = JsonStore;
