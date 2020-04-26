const inputs = document.querySelectorAll('input');
const button = document.querySelector('button.register-btn');


// pattern regex
const patterns = {
    name: /^[\S*]{5,12}$/i,
    pass: /^[\w@-]{6,20}$/,
    email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
}


function validate(field, regex) {
    if (regex.test(field.value)) {
        field.classList.remove('invalid');
        field.classList.add('valid');

    } else {
        field.classList.remove('valid');
        field.classList.add('invalid');
    }


    if (field.className === 'invalid') {
        button.disabled = true;

    } else {
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].className === 'invalid') {
                button.disabled = true;

            } else if (inputs[i].className === 'valid' && inputs[i + 1].className === 'valid') {
                button.disabled = false;
            }
        }
    }
}


inputs.forEach((input) => {
    input.addEventListener('keyup', (e) => {
        validate(e.target, patterns[e.target.attributes.name.value]);
    });
});