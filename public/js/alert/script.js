document.querySelectorAll('.alert span')
   .forEach(el => {
      el.addEventListener('click', () => {
         el.parentElement.remove();
      });
   });