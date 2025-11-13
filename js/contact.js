const qst = document.querySelectorAll(".qst-js");
const ans = document.querySelector(".answer");
qst.forEach((f) => {
  f.addEventListener("click", () => {
    ans.style.display = 'block'
    
  });

});
