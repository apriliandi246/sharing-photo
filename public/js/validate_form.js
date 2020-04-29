const inputs = document.querySelectorAll('input');
const button = document.querySelector('button.register-btn');


// pattern regex
const patterns = {
    name: /^[\S*]{5,12}$/i,
    pass: /^[\w@-]{6,}$/,
    pass2: /^[\w@-]{6,}$/,
    email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
}


inputs.forEach((input) => {
    input.addEventListener('keyup', (e) => {
        validate(e.target, patterns[e.target.attributes.name.value]);

        // if form password is exist / if form password is valid
        if (inputs[2].classList[2] === 'valid') {

            // show form confirm password
            inputs[3].disabled = false;

            // if form confirm password is not same with form password
            if (inputs[3].value !== inputs[2].value) {
                inputs[3].classList.remove('valid');
                inputs[3].classList.add('invalid');

                button.disabled = true;
                button.style.cursor = 'default';

                // if the values of the two forms are the same
            } else {
                inputs[3].classList.add('valid');
            }

            // if password is not exist and valid
        } else {
            inputs[3].disabled = true;
        }

        // if all of form is valid, show the button
        if (inputs[0].classList[2] === 'valid' && inputs[1].classList[2] === 'valid' && inputs[2].classList[2] === 'valid' && inputs[3].classList[2] === 'valid') {
            button.disabled = false;
            button.style.cursor = 'pointer';

            // if not, disable the button
        } else {
            button.disabled = true;
        }
    });
});


function validate(field, regex) {
    if (regex.test(field.value)) {
        field.classList.remove('invalid');
        field.classList.add('valid');

    } else {
        field.classList.remove('valid')
        field.classList.add('invalid');
    }
}