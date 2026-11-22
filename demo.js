const { generateId, parseId } = require('quick-timestamp-id');

console.log('='.repeat(50));
console.log('  QUICK-TIMESTAMP-ID DEMONSTRATION');
console.log('='.repeat(50));

console.log('\n1. Standard ID Generation:');
const defaultId = generateId();
console.log('Default ID ->', defaultId);

console.log('\n2. Domain-Specific Entities:');
const userId = generateId({ prefix: 'usr' });
const orderId = generateId({ prefix: 'ord', randomLength: 10 });
const txnId = generateId({ prefix: 'txn', delimiter: '-' });

console.log('User ID        :', userId);
console.log('Order ID       :', orderId);
console.log('Transaction ID :', txnId);

console.log('\n3. Parsing & Timestamp Extraction:');
const parsed = parseId(orderId);
console.log('Parsed Order ID:', {
  prefix: parsed.prefix,
  createdDate: parsed.timestamp.toISOString(),
  timeToken: parsed.timeToken,
  randomToken: parsed.randomToken
});

console.log('\n4. Uniqueness & Speed Benchmark (100,000 IDs):');
const count = 100000;
const set = new Set();
const startTime = Date.now();

for (let i = 0; i < count; i++) {
  set.add(generateId({ prefix: 'item' }));
}

const duration = Date.now() - startTime;
console.log(`Generated ${count.toLocaleString()} IDs in ${duration} ms (${Math.round(count / (duration / 1000)).toLocaleString()} IDs/sec)`);
console.log(`Collision count: ${count - set.size} (0 means 100% unique)`);

console.log('\n' + '='.repeat(50));
console.log('Demo completed successfully!');
console.log('='.repeat(50));
