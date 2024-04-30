// зберігання форми
const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.footer-wrap-form');
const emailInput = form.querySelector('.footer-form');
const textarea = form.querySelector('.footer-textarea');
const modalSend = document.querySelector('.footer-backdrop');

form.addEventListener('input', onInputChange);
form.addEventListener('submit', handleSubmit);
modalSend.addEventListener('click', closeModal);

function closeModal(event) {
  const target = event.target;
  if (
    target.classList.contains('footer-backdrop') ||
    target.classList.contains('footer-close-icon')
  ) {
    modalSend.classList.toggle('pop-up');
  }
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' || target.classList.contains('pop-up')) {
      modalSend.classList.toggle('pop-up');
    }
  });
}

populateForm();

function handleSubmit(event) {
  event.preventDefault();

  const email = emailInput.value.trim();
  const message = textarea.value.trim();

  if (email === '' || message === '') {
    alert('Please fill in all fields before submitting.');
    return;
  }

  const formData = {
    email: email,
    message: message,
  };

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  form.reset();

  modalSend.classList.toggle('pop-up');
}

function onInputChange() {
  const email = emailInput.value.trim();
  const message = textarea.value.trim();

  const savedForm = {
    email: email,
    message: message,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedForm));
}

function populateForm() {
  const savedForm = localStorage.getItem(STORAGE_KEY);
  if (savedForm) {
    const { email, message } = JSON.parse(savedForm);
    emailInput.value = email || '';
    textarea.value = message || '';
  }
}

// ============= post api

// const BASE_URL = 'https://portfolio-js.b.goit.study/api/';

// const parameters = {
//   method: 'POST',
//   body: JSON.stringify(),
//   headers: { 'Content-type': 'application/json' },
// };

// fetch(`${BASE_URL}?${parameters}`).then(response => {
//   if (!response.ok) {
//     throw new Error(response.statusText);
//   }
//   return response.json();
// });

// ========= open modal window
