import { Header, initHeaderMenu } from "../components/header.js";
import { Footer, toogleMenuFooter } from "../components/footer.js";
import {panier } from "../components/panier.js";
// export { Header, initHeaderMenu,Footer,toogleMenuFooter};

// Inject header and footer
document.getElementById("header-placeholder").innerHTML = Header();
document.getElementById("footer-placeholder").innerHTML = Footer();
initHeaderMenu();
// window.toogleMenuFooter = toogleMenuFooter;
document.querySelectorAll("[data-footer-toggle]").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const targetId = e.target.dataset.footerToggle;
    toogleMenuFooter(targetId);
  });
});

// component panier
const btnP = document.getElementById('btn-panier');
const panier = document.getElementById('panier-div');
btnP.addEventListener('click', e =>{
  panier.classList.remove('hidden')
}) 
