const path = require('path');

module.exports = {
  consumer: 'UserServiceConsumer',
  provider: 'UserServiceProvider',
  port: 1234,
  pactDir: path.resolve(__dirname, '../pacts'),
  log: path.resolve(__dirname, '../logs/pact.log'),
  brokerUrl: 'http://localhost:9292' // Replace with your Pact Broker URL
};
