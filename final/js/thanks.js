document.addEventListener('DOMContentLoaded', () => {
  const formData = JSON.parse(localStorage.getItem('contactFormData'));

  if (formData) {
    document.getElementById('name').textContent = formData.name;
    document.getElementById('email').textContent = formData.email;
    document.getElementById('message').textContent = formData.message;
  } else {
    document.getElementById('thanks-message').textContent = 'No form data found.';
  }
});
