const path = require("path");
const { Pact, Matchers } = require("@pact-foundation/pact");
const axios = require("axios");

const { like, eachLike } = Matchers;

const provider = new Pact({
  consumer: "UserServiceConsumer",
  provider: "UserServiceProvider",
  port: 1234, // fixed port, or omit to use random free port
  log: path.resolve(process.cwd(), "logs", "pact.log"),
  dir: path.resolve(process.cwd(), "pacts"),
  logLevel: "INFO",
});

describe("Pact Consumer Test — User Service", () => {
  beforeAll(() => provider.setup());
  afterAll(() => provider.finalize());

  describe("GET /api/users", () => {
    beforeAll(() => {
      return provider.addInteraction({
        state: "users exist",
        uponReceiving: "a request for all users",
        withRequest: {
          method: "GET",
          path: "/api/users",
          headers: { Accept: "application/json" },
        },
        willRespondWith: {
          status: 200,
          headers: { "Content-Type": "application/json" },
          body: eachLike({
            id: like(1),
            name: like("Alice"),
            email: like("alice@example.com"),
          }),
        },
      });
    });

    it("should receive the list of users", async () => {
      // Use mockService.baseUrl to call the Pact mock server
      const response = await axios.get(`${provider.mockService.baseUrl}/api/users`, {
        headers: { Accept: "application/json" },
      });

      const users = response.data;

      expect(response.status).toBe(200);
      expect(users[0]).toHaveProperty("id");
      expect(users[0]).toHaveProperty("name");
      expect(users[0]).toHaveProperty("email");
    });

    afterEach(() => provider.verify());
  });
});
