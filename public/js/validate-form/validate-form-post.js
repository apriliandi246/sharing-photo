const regexPattern = /^[^\s][\S ]*$/m;
const button = document.querySelector('button');
const input = document.querySelector('textarea');

input.addEventListener('input', () => {
   if (input.value.length > 150) {
      input.classList.add('invalid');

      buttonStatus(true);
      cursorStyle('default');

   } else if (regexPattern.test(input.value) === false) {
      input.style.border = '1px solid red';

      buttonStatus(true);
      cursorStyle('default');

   } else {
      input.classList.remove('invalid');
      input.style.border = 'none';

      buttonStatus(false);
      cursorStyle('pointer');
   }
});

function buttonStatus(status) {
   button.disabled = status;
}

function cursorStyle(cursor) {
   button.style.cursor = cursor;
}