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

test('rejects missing values, invalid email, and overlong names', () => {
  const result = validateSettings({
    name: 'A'.repeat(81),
    email: 'not-an-email',
    timezone: '',
    notifyFrequency: '',
  });

  assert.equal(result.isValid, false);
  assert.equal(result.errors.name, 'Display name must be 80 characters or fewer.');
  assert.equal(result.errors.email, 'Use a valid email address such as name@example.com.');
  assert.equal(result.errors.timezone, 'Select a timezone so your updates match your region.');
  assert.equal(result.errors.notifyFrequency, 'Choose how often you want updates.');
});
