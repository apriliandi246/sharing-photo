const pattern = /^[^\s][\S ]*$/m;
const button = document.querySelector('button');
const input = document.querySelector('textarea');

input.addEventListener('keyup', () => {
   if (input.value.length > 150) {
      input.classList.add('invalid');
      disableOrAbleButton(true, 'default')

   } else if (pattern.test(input.value) === false) {
      disableOrAbleButton(true, 'default');

   } else {
      input.classList.remove('invalid');
      disableOrAbleButton(false, 'pointer');
   }
});

function disableOrAbleButton(status, cursor) {
   button.disabled = status;
   button.style.cursor = cursor;
}