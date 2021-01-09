import './styles/main.scss';

const headerTitleBtn = document.getElementById('header-title');
const headerSocial = document.getElementById('header-social');

headerTitleBtn.addEventListener('click', () => {
  headerSocial.classList.toggle('active');
  headerSocial.classList.toggle('inActive');
})