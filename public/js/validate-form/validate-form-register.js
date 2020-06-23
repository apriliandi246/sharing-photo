const button = document.querySelector('button');
const inputs = document.querySelectorAll('input');
const [username, email, password, confirmPasssword] = inputs;

// pattern regex
const patterns = {
   name: /^[\S*]{5,12}$/i,
   pass: /^[\w@-]{6,}$/,
   pass2: /^[\w@-]{6,}$/,
   email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
}

// check all input form, when user type something
inputs.forEach((input) => {
   input.addEventListener('keyup', (e) => {
      addClass(e.target, patterns[e.target.attributes.name.value]);
      checkPasswordInput();
      validate();
   });
});

// add class valid or invalid at input form
function addClass(field, regex) {
   if (regex.test(field.value)) {
      field.classList.add('valid');
      field.classList.remove('invalid');

   } else {
      field.classList.add('invalid');
      field.classList.remove('valid');
   }
}

// check password input and confirm password input
function checkPasswordInput() {
   // if form password is exist / if password input class is valid
   if (password.classList[0] === 'valid') {
      // show / able confirm password input
      confirmPasssword.disabled = false;

      // if confirm password input is not same with password input
      if (confirmPasssword.value !== password.value) {
         confirmPasssword.classList.add('invalid');
         confirmPasssword.classList.remove('valid');

         button.disabled = true;
         button.style.cursor = 'default';

         // if the values of both input same
      } else {
         confirmPasssword.classList.add('valid');
      }

      // if password input is not exist
   } else {
      confirmPasssword.disabled = true;
   }
}

function validate() {
   // if all input in form have valid class
   if (
      username.classList[0] === 'valid'
      && email.classList[0] === 'valid'
      && password.classList[0] === 'valid'
      && confirmPasssword.classList[0] === 'valid'
   ) {
      button.disabled = false;
      button.style.cursor = 'pointer';

      // if not, disable the button
   } else {
      button.disabled = true;
   }
}