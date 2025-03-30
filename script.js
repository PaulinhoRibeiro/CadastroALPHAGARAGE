document.addEventListener('DOMContentLoaded', function () {
  // Máscara para telefone
  const phoneInput = document.getElementById('phone');
  phoneInput.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.substring(0, 11);

    if (value.length > 0) {
      value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
      if (value.length > 10) {
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
      } else {
        value = value.replace(/(\d{4})(\d)/, '$1-$2');
      }
    }

    e.target.value = value;
  });

  // Validação e envio do formulário
  const appointmentForm = document.getElementById('appointmentForm');
  const successModal = document.getElementById('successModal');
  const closeModal = document.querySelector('.close-modal');
  const btnOk = document.querySelector('.btn-ok');

  appointmentForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validação simples
    const requiredFields = appointmentForm.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        field.style.borderColor = '#e94560';
        isValid = false;
      } else {
        field.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      }
    });

    if (!isValid) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Simular envio (em uma aplicação real, seria uma requisição AJAX)
    setTimeout(() => {
      successModal.style.display = 'flex';
      appointmentForm.reset();
    }, 1000);
  });

  // Fechar modal
  function closeSuccessModal() {
    successModal.style.display = 'none';
  }

  closeModal.addEventListener('click', closeSuccessModal);
  btnOk.addEventListener('click', closeSuccessModal);

  // Fechar modal ao clicar fora
  window.addEventListener('click', function (e) {
    if (e.target === successModal) {
      closeSuccessModal();
    }
  });

  // Configurar data mínima (hoje + 1 dia)
  const dateInput = document.getElementById('date');
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const yyyy = tomorrow.getFullYear();
  const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const dd = String(tomorrow.getDate()).padStart(2, '0');

  dateInput.min = `${yyyy}-${mm}-${dd}`;

  // Desabilitar fins de semana
  dateInput.addEventListener('input', function () {
    const selectedDate = new Date(this.value);
    const day = selectedDate.getDay();

    if (day === 0 || day === 6) {
      alert(
        'Nossa oficina não funciona aos fins de semana. Por favor, selecione um dia útil.',
      );
      this.value = '';
    }
  });
});
