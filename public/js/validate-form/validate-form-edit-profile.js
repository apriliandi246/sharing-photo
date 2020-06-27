const pattern = /^[\S*]{5,12}$/i;
const button = document.querySelector('button');
const input = document.querySelector('input[type="text"]');

input.addEventListener('keyup', () => {
   if (pattern.test(input.value) === false) {
      input.classList.add('invalid');
      disableOrAbleButton(true, 'default');

   } else if (!input.value) {
      disableButton(true, 'default');

   } else {
      input.classList.remove('invalid');
      disableOrAbleButton(false, 'pointer');
   }
});

function disableOrAbleButton(status, cursor) {
   button.disabled = status;
   button.style.cursor = cursor;
}