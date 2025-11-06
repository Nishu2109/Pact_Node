const { Publisher } = require('@pact-foundation/pact');
const config = require('./config/pactConfig');

const opts = {
  pactFilesOrDirs: [config.pactDir],
  pactBroker: config.brokerUrl,
  consumerVersion: '1.0.0',
};

new Publisher(opts)
  .publishPacts()
  .then(() => console.log('Pacts successfully published!'))
  .catch(e => console.error('Error publishing pacts:', e));
