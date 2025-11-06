// pactProvider.spec.js
const path = require("path");
const { Verifier } = require("@pact-foundation/pact");
const { app } = require("./server");

const port = 8081;

let server;
beforeAll(() => {
  server = app.listen(port, () => console.log("🔍 Provider test server running on 8081"));
});
afterAll(() => server.close());

test("should validate the expectations of UserServiceConsumer", async () => {
  const opts = {
    providerBaseUrl: `http://localhost:${port}`,
    pactUrls: [path.resolve(__dirname, "./pacts/UserServiceConsumer-UserServiceProvider.json")]
  };

  await new Verifier(opts).verifyProvider();
});
