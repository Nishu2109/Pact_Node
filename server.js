// server.js
const express = require("express");
const app = express();

app.get("/api/users", (req, res) => {
  res.status(200).json([
    {
      id: 1,
      name: "Alice",
      email: "alice@example.com"
    }
  ]);
});

if (require.main === module) {
  app.listen(8081, () => console.log("✅ Provider API running on port 8081"));
}

module.exports = { app };
