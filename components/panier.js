export function panier() {
    return `
    <div class="panier fixed top-0 right-0 z-50 w-[20rem] 
                opacity-0 translate-x-full pointer-events-none 
                transition-all duration-300 ease-in-out" 
          id="panier-div">

      <div class="min-h-screen md:h-screen bg-bodyColor w-full pb-[1.5rem] shadow-lg overflow-y-auto">
        
        <div class="bg-prixColor h-[20vh] flex justify-center gap-[1rem] py-[2.5rem]">
          <img src="../assets/logo-panier.png" alt="logo-panier ">
          <h2 class="font-oleo text-white text-[2rem]">My Panier</h2>
        </div>
        
        <div class="card flex items-center justify-center mt-[1rem] ">
          <div class="m-[1rem] w-[3rem] bg-headerOrange h-[3rem] flex items-center justify-center rounded-[50px]">
            <samp class="text-[1.5rem] font-extrabold text-white">1x</samp>
          </div>
          <div>
            <samp class="text-[1.5rem] text-prixColor font-extrabold">£27.90</samp>
            <h2>12” Vegitarian Pizza </h2>
            <p>No Mushrooms + greenpeppers</p>
          </div>
          <div>
            <img src="../assets/logo corbeille.png" alt="logo-corbeille">
          </div>
        </div>
        <div class=" h-[0.1rem] bg-black w-[95%] ml-[2%] my-[1rem]"></div>
        <div class="card flex items-center justify-center mt-[1rem] ">
          <div class="m-[1rem] w-[3rem] bg-headerOrange h-[3rem] flex items-center justify-center rounded-[50px]">
            <samp class="text-[1.5rem] font-extrabold text-white">1x</samp>
          </div>
          <div>
            <samp class="text-[1.5rem] text-prixColor font-extrabold">£27.90</samp>
            <h2>12” Vegitarian Pizza </h2>
            <p>No Mushrooms + greenpeppers</p>
          </div>
          <div>
            <img src="../assets/logo corbeille.png" alt="logo-corbeille">
          </div>
        </div>
        <div class=" h-[0.1rem] bg-black w-[95%] ml-[2%] my-[1rem]"></div>
        <div class="card flex items-center justify-center mt-[1rem] ">
          <div class="m-[1rem] w-[3rem] bg-headerOrange h-[3rem] flex items-center justify-center rounded-[50px]">
            <samp class="text-[1.5rem] font-extrabold text-white">1x</samp>
          </div>
          <div>
            <samp class="text-[1.5rem] text-prixColor font-extrabold">£27.90</samp>
            <h2>12” Vegitarian Pizza </h2>
            <p>No Mushrooms + greenpeppers</p>
          </div>
          <div>
            <img src="../assets/logo corbeille.png" alt="logo-corbeille">
          </div>
        </div>
        <div class=" h-[0.1rem] bg-black w-[95%] ml-[2%] my-[1rem]"></div>
        
        <div class="my-[1.5rem] flex justify-center gap-[3rem]">
          <h2 class="font-roboto font-bold text-[1.5rem]">Sub Total: </h2>
          <span class="font-roboto font-bold text-[1.5rem] text-prixColor">£127.90</span>
        </div>
        <div class="my-[1.5rem] flex justify-center gap-[3rem]">
          <h2 class="font-roboto font-bold text-[1.5rem]">Livraison : </h2>
          <span class="font-roboto font-bold text-[1.5rem] text-prixColor">£5</span>
        </div>
        <div class="bg-headerOrange w-[90%] rounded-[10px] flex h-[4.5rem] justify-center items-center mx-auto gap-[20px] p-[0.4rem] mt-[2rem]">
          <h2 class="text-[1.5rem] font-bold font-roboto text-white">Total to pay</h2>
          <span class="font-roboto font-bold text-[1.5rem] text-white">£127.90</span>
        </div>
        <div class="bg-prixColor w-[90%] rounded-[10px] flex h-[4.5rem] justify-center items-center mx-auto gap-[25px] p-[0.4rem] mt-[2rem]">
          <img src="../assets/logo checkout.png" class="text-[1.5rem] font-bold font-roboto text-white"></img>
          <span class="font-roboto font-bold text-[1.5rem] text-white">Checkout!</span>
        </div>
      </div>
    </div>`
}

// export function openPanier() {
//     const btnP = document.getElementById('btn-panier');
//     const panier = document.getElementById('panier-div');
//         const btnMp = document.getElementById('mobile-btn-panier');

//     // if (btnP && panier) {
//     //     btnP.addEventListener('click', () => {
//     //         console.log("hfhrfghui");
//     //         panier.classList.toggle('opacity-0');
//     //         panier.classList.toggle('translate-x-full');
//     //         panier.classList.toggle('pointer-events-none');
//     //     })
//     // }else
//      if (btnMp && panier) {
//         btnP.addEventListener('click', () => {
//             console.log("hfhrfghui");
//             panier.classList.toggle('opacity-0');
//             panier.classList.toggle('translate-x-full');
//             panier.classList.toggle('pointer-events-none');
//         })
//     }

// }

export function openPanier() {

  const btnP_desktop = document.getElementById('btn-panier');
  const btnP_mobile = document.getElementById('mobile-btn-panier');
  const panier = document.getElementById('panier-div');
  const mobileMenu = document.getElementById('mobile-menu'); 

  if (!panier) return;

  const toggleThePanier = () => {
    panier.classList.toggle('opacity-0');
    panier.classList.toggle('translate-x-full');
    panier.classList.toggle('pointer-events-none');
  };

  if (btnP_desktop) {
    btnP_desktop.addEventListener('click', toggleThePanier);
  }

  if (btnP_mobile && mobileMenu) {
    btnP_mobile.addEventListener('click', () => {
      
      toggleThePanier();

      mobileMenu.classList.add('hidden');
    });
  }
}