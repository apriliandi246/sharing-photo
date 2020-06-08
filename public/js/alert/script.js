const close = document.querySelectorAll('.alert span');

close.forEach(el => {
   // when each child click
   el.addEventListener('click', function () {
      // remove the parent
      el.parentElement.remove();
   });
});