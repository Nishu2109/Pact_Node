const express = require("express");
const app = express();
const port = 8081;

app.use(express.json());

// ✅ Must match the Pact contract exactly
const users = [
  { id: 1, name: "Alice", email: "alice@example.com" }
];

// ✅ Route must be exactly /api/users
app.get("/api/users", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(users);
});

if (require.main === module) {
  app.listen(port, () => console.log(`✅ Provider running on port ${port}`));
}

module.exports = { app, port };
