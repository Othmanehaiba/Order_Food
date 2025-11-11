import { Header, initHeaderMenu } from "../components/header.js";
import { Footer, toogleMenuFooter } from "../components/footer.js";
import { panier, openPanier } from "../components/panier.js";// export { Header, initHeaderMenu,Footer,toogleMenuFooter};

// Inject header and footer
document.getElementById("header-placeholder").innerHTML = Header();
document.getElementById("panier-placeholder").innerHTML = panier();
document.getElementById("footer-placeholder").innerHTML = Footer();
// Initialize functions

initHeaderMenu();
// window.toogleMenuFooter = toogleMenuFooter;
document.querySelectorAll("[data-footer-toggle]").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const targetId = e.target.dataset.footerToggle;
    toogleMenuFooter(targetId);
  });
});
openPanier();