const qst = document.querySelectorAll(".qst-js");

qst.forEach((f) => {
  f.addEventListener('click', () => {
    const ans = f.nextElementSibling;
    ans.style.display = 'block';
  });
  f.addEventListener('mouseout', () => {
    const ans = f.nextElementSibling;
    ans.style.display = 'none';
  });

});
