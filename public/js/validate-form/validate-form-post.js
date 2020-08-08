const pattern = /^[^\s][\S ]*$/m;
const button = document.querySelector('button');
const input = document.querySelector('textarea');

input.addEventListener('keyup', () => {
   if (input.value.length > 150) {
      input.classList.add('invalid');

      buttonStatus(true);
      cursorStyle('default');

   } else if (pattern.test(input.value) === false) {
      buttonStatus(true);
      cursorStyle('default');

   } else {
      input.classList.remove('invalid');

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