const regexPattern = /^[\S*]{5,12}$/i;
const button = document.querySelector('button');
const input = document.querySelector('input[type="text"]');

input.addEventListener('input', () => {
   if (regexPattern.test(input.value) === false) {
      input.classList.add('invalid');
      buttonStatus(true);
      cursorStyle('default');

   } else if (!input.value) {
      disableButton(true);
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

function cursorStyle(style) {
   button.style.cursor = cursor;
}