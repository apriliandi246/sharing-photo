const input = document.querySelector('textarea');
const button = document.querySelector('button');
const pattern = /^[^\s][\S ]*$/m;


input.addEventListener('keyup', () => {
   if (input.value.length > 150) {
      button.disabled = true;
      input.classList.add("invalid");

   } else if (pattern.test(input.value) === false) {
      button.disabled = true;

   } else {
      button.disabled = false;
      button.style.cursor = 'pointer';
      input.classList.remove("invalid")
   }
});