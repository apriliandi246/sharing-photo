const pattern = /^[^\s][\S ]*$/m;
const button = document.querySelector('button');
const input = document.querySelector('textarea');

input.addEventListener('keyup', () => {
   if (input.value.length > 150) {
      button.disabled = true;
      input.classList.add("invalid");

   } else if (pattern.test(input.value) === false) {
      button.disabled = true;
      button.style.cursor = 'default';

   } else {
      button.disabled = false;
      button.style.cursor = 'pointer';
      input.classList.remove("invalid");
   }
});