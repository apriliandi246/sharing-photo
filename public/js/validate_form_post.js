// ! Have a problem

const input = document.querySelector('textarea');
const button = document.querySelector('button');
const pattern = /[A-Za-z0-9]/ig;


input.addEventListener('keyup', () => {
    if (pattern.test(input.value) === false) {
        disableButton();

    } else if (input.value.length >= 300) {
        disableButton();
        input.classList.add('invalid');

    } else if (input.value === '') {
        disableButton();

    } else {
        button.disabled = false;
        button.style.cursor = 'pointer';
        input.classList.remove('invalid');
    }
});


function disableButton() {
    button.disabled = true;
    button.style.cursor = 'default';
}