const close = document.querySelectorAll('.alert span')
   .forEach(el => {
      // when each child click
      el.addEventListener('click', () => {
         // remove the parent
         el.parentElement.remove();
      });
   });