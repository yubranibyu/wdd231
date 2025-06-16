document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

   const formData = {
    
      name: form.elements['name'].value,
      email: form.elements['email'].value,
      subject: form.elements['subject'].value,
      message: form.elements['message'].value


    };

    localStorage.setItem('contactFormData', JSON.stringify(formData));
    form.reset();
    window.location.href = 'thanks.html';
  });
});
