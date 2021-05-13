const { InmemoryCache } = require("../index.js");

(async () => {
  const cache = new InmemoryCache({}, (k, v) => {
    console.log("expired:", k, v);
  });

  cache.set("example", { data: "thing" }, 5000);

  console.log("cached:", cache.get("example"));
  console.log("exists:", cache.has("example"));

  await new Promise((r) => setTimeout(r, 5000));

  console.log("cached:", cache.get("example"));
  console.log("exists:", cache.has("example"));
})();
