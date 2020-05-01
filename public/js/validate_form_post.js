// ! Have a problem
// - checking the input value (problem)

const input = document.querySelector('textarea');
const button = document.querySelector('button');
const pattern = /^[^\s][a-zA-Z0-9 ]*$/;


input.addEventListener('keyup', () => {
    if (pattern.test(input.value) === false) {
        disableButton();

    } else if (input.value.length > 300) {
        input.classList.add('invalid');
        console.log("lebih goblok");
        disableButton();

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