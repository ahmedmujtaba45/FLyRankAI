const test = require('node:test');
const assert = require('node:assert/strict');
const { validateSettings } = require('../src/settingsForm');

test('accepts valid settings payload', () => {
  const result = validateSettings({
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    timezone: 'UTC',
    notifyFrequency: 'daily',
  });

  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});

test('rejects missing values and invalid email', () => {
  const result = validateSettings({
    name: 'A',
    email: 'not-an-email',
    timezone: '',
    notifyFrequency: '',
  });

  assert.equal(result.isValid, false);
  assert.equal(result.errors.name, 'Please enter a display name with at least 2 characters.');
  assert.equal(result.errors.email, 'Please enter a valid email address.');
  assert.equal(result.errors.timezone, 'Please choose a timezone.');
  assert.equal(result.errors.notifyFrequency, 'Please choose a notification frequency.');
});
