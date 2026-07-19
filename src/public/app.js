const form = document.getElementById('settings-form');
const errorIds = ['name-error', 'email-error', 'timezone-error', 'notifyFrequency-error'];

function clearErrors() {
  errorIds.forEach((id) => {
    document.getElementById(id).textContent = '';
  });
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  clearErrors();

  const payload = Object.fromEntries(new FormData(form).entries());
  const response = await fetch('/settings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const result = await response.json();

  if (!result.ok) {
    Object.entries(result.errors).forEach(([field, message]) => {
      const target = document.getElementById(`${field}-error`);
      if (target) {
        target.textContent = message;
      }
    });
    return;
  }

  const successBanner = document.createElement('p');
  successBanner.setAttribute('role', 'status');
  successBanner.textContent = result.message;
  form.appendChild(successBanner);
});
