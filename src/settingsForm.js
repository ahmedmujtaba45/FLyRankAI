function validateSettings(values) {
  const errors = {};
  const trimmedName = (values.name || '').trim();
  const trimmedEmail = (values.email || '').trim();
  const trimmedTimezone = (values.timezone || '').trim();
  const trimmedFrequency = (values.notifyFrequency || '').trim();

  if (trimmedName.length < 2) {
    errors.name = 'Enter your full display name (at least 2 characters).';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.email = 'Use a valid email address such as name@example.com.';
  }

  if (!trimmedTimezone) {
    errors.timezone = 'Select a timezone so your updates match your region.';
  }

  if (!trimmedFrequency) {
    errors.notifyFrequency = 'Choose how often you want updates.';
  }

  if (trimmedName.length > 80) {
    errors.name = 'Display name must be 80 characters or fewer.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

module.exports = {
  validateSettings,
};
