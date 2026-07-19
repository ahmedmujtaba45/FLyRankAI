function validateSettings(values) {
  const errors = {};

  if (!values.name || values.name.trim().length < 2) {
    errors.name = 'Please enter a display name with at least 2 characters.';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!values.timezone) {
    errors.timezone = 'Please choose a timezone.';
  }

  if (!values.notifyFrequency) {
    errors.notifyFrequency = 'Please choose a notification frequency.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

module.exports = {
  validateSettings,
};
