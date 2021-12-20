export class Contact {
  constructor() {
    this.labels = document.querySelectorAll('.form-control label');
    this.form = document.getElementById('contact-form');
    this.inputFields = document.querySelectorAll('.control');
    this.name = document.getElementById('form-name');
    this.subject = document.getElementById('form-subject');
    this.mail = document.getElementById('form-email');
    this.message = document.getElementById('form-message');
    this.submitContactBtn = document.getElementById('submit-contact-btn');
    this.loaderContact = document.getElementById('loader-contact');
    this.successMessage = document.getElementById('success-message');
    this.errorMessage = document.getElementById('error-message');

    this.initForm();
  }

  initForm() {
    this.clearInputs();
    this.animateLabel();

    // Goes through the array inputFields
    this.inputFields.forEach((input) => {
      // Creates an event listener on the current input_field
      input.addEventListener('input', this.focusOnInput.bind(this));
    });

    this.onSubmitForm();
  }

  isFormValid() {
    return (
      this.name.validity.valid &&
      this.mail.validity.valid &&
      this.subject.validity.valid &&
      this.message.validity.valid
    );
  }

  // Clears the inputs
  clearInputs() {
    this.inputFields.forEach((input) => {
      input.value = '';
    });
  }

  focusOnInput(input) {
    this.isFormValid()
      ? this.submitContactBtn.removeAttribute('disabled')
      : this.submitContactBtn.setAttribute('disabled', 'disabled');

    if (input && input.target.value !== '') {
      input.target.classList.add('filled');
      input.target.parentNode.lastElementChild.classList.add('invisible');
    } else {
      input.target.classList.remove('filled');
      input.target.parentNode.lastElementChild.classList.remove('invisible');
    }
  }

  // Animate the labels on focus
  animateLabel() {
    this.labels.forEach((label) => {
      label.innerHTML = label.innerText
        .split('')
        .map(
          (letter, idx) =>
            `<span style="transition-delay:${idx * 50}ms">${letter}</span>`
        )
        .join('');
    });
  }

  onSubmitForm() {
    this.submitContactBtn.addEventListener('click', () => this.submitForm());
  }

  async submitForm() {
    if (!this.isFormValid) {
      return;
    }
    const formData = {
      name: this.name.value.trim(),
      email: this.mail.value.trim(),
      subject: this.subject.value,
      message: this.message.value,
    };

    // Show loader
    this.loaderContact.classList.remove('hidden');
    this.form.classList.add('loading');
    this.errorMessage.classList.add('hidden');

    try {
      const res = await fetch(
        'https://tristan-deloris-pro.herokuapp.com/api/contact',
        // 'http://localhost:9000/api/contact',
        // 'http://localhost:9000/api/contactffff',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

      if (res.status === 201) {
        this.loaderContact.classList.add('hidden');
        this.form.classList.add('hidden');
        this.successMessage.classList.remove('hidden');
      } else {
        console.log('error:', res.status, res);
        this.form.classList.remove('loading');
        this.loaderContact.classList.add('hidden');
        this.errorMessage.classList.remove('hidden');
        throw new Error('Something went wrong');
      }
    } catch (error) {
      // console.log('contact error:', error);

      //   this.form.classList.remove("hidden");
      this.form.classList.remove('loading');
      this.errorMessage.classList.remove('hidden');
      this.loaderContact.classList.add('hidden');
      throw new Error('Something went wrong');
    }
  }
}
