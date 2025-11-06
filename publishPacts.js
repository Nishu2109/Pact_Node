const path = require("path");
const { publishPacts } = require("@pact-foundation/pact");
const config = require("./config/pactConfig");

const opts = {
  pactFilesOrDirs: [config.pactDir],
  pactBroker: config.brokerUrl,
  consumerVersion: "1.0.0",
};

publishPacts(opts)
  .then(() => console.log("Pacts successfully published!"))
  .catch((e) => console.error("Error publishing pacts:", e));
