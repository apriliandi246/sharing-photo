const button = document.querySelector('button');
const inputs = document.querySelectorAll('input');
const [username, email, password, confirmPassword] = inputs;


// regex patterns
const patterns = {
   name: /^[\S*]{5,12}$/i,
   password: /^[\w@-]{6,}$/,
   confirmPassword: /^[\w@-]{6,}$/,
   email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
}


// check all of inputs
inputs.forEach((input) => {
   input.addEventListener('input', (event) => {
      addClass(event.target, patterns[event.target.attributes.name.value]);
      checkPasswordInput();
      validate();
   });
});


// add valid class or invalid class in input
function addClass(input, regex) {
   if (regex.test(input.value)) {
      input.classList.add('valid');
      input.classList.remove('invalid');

   } else {
      input.classList.add('invalid');
      input.classList.remove('valid');
   }
}


// check password input and confirm password input
function checkPasswordInput() {
   if (password.classList[0] === 'valid') {
      confirmPassword.disabled = false;

      if (confirmPassword.value !== password.value) {
         confirmPassword.classList.add('invalid');
         confirmPassword.classList.remove('valid');

         setStatusButton(true, 'default');

      } else {
         confirmPassword.classList.add('valid');
      }

   } else {
      confirmPassword.disabled = true;
   }
}


// check all of input field
function validate() {
   if (
      username.classList.value === 'valid'
      && email.classList.value === 'valid'
      && password.classList.value === 'valid'
      && confirmPassword.classList.value === 'valid'
   ) {
      setStatusButton(false, 'pointer');

   } else {
      setStatusButton(true, 'default');
   }
}


// set disbaled status and cursor style button
function setStatusButton(status, cursorStyle) {
   button.disabled = status;
   button.style.cursor = cursorStyle;
}