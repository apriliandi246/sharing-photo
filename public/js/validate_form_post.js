const input = document.querySelector('textarea');
const button = document.querySelector('button');
const pattern = /^[^\s][a-zA-Z0-9 ]*$/m;


input.addEventListener('keyup', () => {
    if (input.value.length > 150) {
        disableButton();
        input.classList.add('invalid');

    } else if (pattern.test(input.value) === false) {
        disableButton();

    } else {
        button.disabled = false;
        button.style.cursor = 'pointer';
    }
});


function disableButton() {
    button.disabled = true;
    button.style.cursor = 'default';
}