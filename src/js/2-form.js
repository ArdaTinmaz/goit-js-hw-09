const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;

// ✅ Global formData tanımı
let formData = {
  email: '',
  message: ''
};

// Sayfa yüklendiğinde localStorage'dan veri al ve inputlara yerleştir
const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
if (savedData) {
  formData = savedData;
  emailInput.value = formData.email || '';
  messageInput.value = formData.message || '';
}

// Input her değiştiğinde formData'yı güncelle ve kaydet
form.addEventListener('input', () => {
  formData.email = emailInput.value;
  formData.message = messageInput.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// Form gönderildiğinde boş alan kontrolü yap ve temizle
form.addEventListener('submit', e => {
  e.preventDefault();

  if (!formData.email.trim() || !formData.message.trim()) {
    alert('Lütfen tüm alanları doldurun.');
    return;
  }

  console.log('Form gönderildi:', formData);

  form.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' }; // formData'yı da sıfırla
});
