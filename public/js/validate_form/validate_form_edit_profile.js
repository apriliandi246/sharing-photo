const input = document.querySelector('input[type="text"]');
const button = document.querySelector('button');
const pattern = /^[\S*]{5,12}$/i;


input.addEventListener('keyup', () => {
   if (pattern.test(input.value) === false) {
      disableButton();
      input.classList.add('invalid');

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