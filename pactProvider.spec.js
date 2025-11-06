const { Verifier } = require("@pact-foundation/pact");
const path = require("path");
const http = require("http");

let server;

beforeAll(() => {
  const app = http.createServer((req, res) => {
    if (req.url === "/api/users" && req.method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify([{ id: 1, name: "Alice", email: "alice@example.com" }])
      );
    } else {
      res.writeHead(404);
      res.end();
    }
  });

  return new Promise((resolve) => {
    server = app.listen(8081, () => {
      console.log("🔍 Provider test server running on 8081");
      resolve();
    });
  });
});

afterAll(() => {
  if (server) server.close();
});

test("should validate the expectations of UserServiceConsumer", async () => {
  const opts = {
    provider: "UserServiceProvider",
    providerBaseUrl: "http://localhost:8081",
    pactBrokerUrl: "http://localhost:9292",
    publishVerificationResult: true,
    providerVersion: "1.0.0",
    consumerVersionSelectors: [{ latest: true, consumer: "UserServiceConsumer" }], // ✅ FIXED
    logLevel: "info",
  };

  const verifier = new Verifier(opts);
  await verifier.verifyProvider();
});
