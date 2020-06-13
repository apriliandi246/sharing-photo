const pattern = /^[\S*]{5,12}$/i;
const button = document.querySelector('button');
const input = document.querySelector('input[type="text"]');

input.addEventListener('keyup', () => {
   if (pattern.test(input.value) === false) {
      input.classList.add('invalid');
      disableButton();

   } else if (input.value === '') {
      disableButton();

   } else {
      button.disabled = false;
      button.style.cursor = 'pointer';
      input.classList.remove('invalid');
   }
});

function disableButton() {
   button.disabled = true;
   button.style.cursor = 'default';
}