const { Verifier } = require('@pact-foundation/pact');

async function verifyPacts() {
  const opts = {
    provider: 'UserServiceProvider',
    providerBaseUrl: 'http://localhost:8080', // 👈 your provider service URL
    pactBrokerUrl: 'http://localhost:9292',   // 👈 your running broker
    publishVerificationResult: true,
    providerVersion: '1.0.0',

    // 👇 Add at least one of these:
    consumerVersionTags: ['test'],  // tag you used while publishing
    // OR the newer approach:
    // consumerVersionSelectors: [{ tag: 'test', latest: true }],
  };

  console.log('🔍 Verifying Pacts...');
  const output = await new Verifier(opts).verifyProvider();
  console.log('✅ Verification complete');
  console.log(output);
}

verifyPacts().catch(err => {
  console.error('❌ Pact verification failed:', err);
  process.exit(1);
});
