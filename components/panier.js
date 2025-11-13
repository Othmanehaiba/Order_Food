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
        <div id="panier-cards" class="mt-[1rem]">
          
        </div>
        
       
        
        <div  id="totalPrice2" class="my-[1.5rem] flex justify-center gap-[3rem]">
          
        </div>
        <div class="my-[1.5rem] flex justify-center gap-[3rem]">
          <h2 class="font-roboto font-bold text-[1.5rem]">Livraison : </h2>
          <span class="font-roboto font-bold text-[1.5rem] text-prixColor">£5</span>
        </div>
        <div id="totalPrice" class="bg-headerOrange w-[90%] rounded-[10px] flex h-[4.5rem] justify-center items-center mx-auto gap-[20px] p-[0.4rem] mt-[2rem]">
          
        </div>
        <div class="bg-prixColor w-[90%] rounded-[10px] flex h-[4.5rem] justify-center items-center mx-auto gap-[25px] p-[0.4rem] mt-[2rem]">
          <img src="../assets/logo checkout.png" class="text-[1.5rem] font-bold font-roboto text-white"></img>
          <span class="font-roboto font-bold text-[1.5rem] text-white">Checkout!</span>
        </div>
      </div>
    </div>`
}


export function openPanier() {

  const btnP_desktop = document.getElementById('btn-panier');
  const btnP_mobile = document.getElementById('mobile-btn-panier');
  const panier = document.getElementById('panier-div');
  const mobileMenu = document.getElementById('mobile-menu');

  addPanier();
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



function addPanier() {

  let panierElement = document.getElementById('panier-cards');
  const dataa = localStorage.getItem('panier');
  const panierItems = dataa ? JSON.parse(dataa) : [];

  panierElement.innerHTML = '';
  panierItems.forEach((item) => {
    panierElement.innerHTML += `
        <div class="flex items-start justify-between border-t border-black/40  mr-[1rem] ml-[1rem]  pb-4">
                <!-- Bloc gauche -->
                <div class="flex items-start gap-4">

                  <!-- Badge quantité -->
                  <div class="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mt-[1rem]">
                    <span class="text-white font-bold text-lg">1x</span>
                  </div>

                  <!-- Infos commande -->
                  <div class="space-y-1">
                    <p class="text-prixColor font-semibold text-xl font-oleo">$${item.basePrice}</p>
                    <p class="font-bold text-black font-roboto">${item.name}</p>
                    <p class="text-black text-sm opacity-80 leading-4">
                      No Mushrooms + green peppers
                    </p>
                  </div>
                </div>

                <!-- Bouton suppression -->
                <button class="opacity-70 hover:opacity-100 mt-[2rem] delete-item" data-id="${item.id}">
                  <img src="../assets/logo corbeille.png" class="w-7">
                </button>

              </div>`;
  })
  deleteCard();
  afficherPrice()
}


function deleteCard() {
  let deleteCards = document.getElementsByClassName('delete-item');
  deleteCards = Array.from(deleteCards);
  deleteCards.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const idToDelete = e.currentTarget.dataset.id;

      let panierData = JSON.parse(localStorage.getItem('panier')) || [];
      panierData = panierData.filter(item => item.id != idToDelete);
      localStorage.setItem('panier', JSON.stringify(panierData));
      totalAfterDelete();


      const cardToDelete = e.currentTarget.parentElement;
      cardToDelete.remove();
    });
  })

}

function totalAfterDelete(){
  afficherPrice();
}

function afficherPrice() {
  const dataa = localStorage.getItem('panier');
  const panierItems = dataa ? JSON.parse(dataa) : [];
  
  const total1 = document.getElementById('totalPrice');
  const total2 = document.getElementById('totalPrice2');
  let total = 0;


  if (panierItems.length === 0){
    total1.innerHTML = `          
          <h2 class="text-[1.5rem] font-bold font-roboto text-white">Total to pay</h2>
          <span class="font-roboto font-bold text-[1.5rem] text-white">${total}</span>`
    total2.innerHTML = `          
         <h2 class="font-roboto font-bold text-[1.5rem]">Sub Total: </h2>
            <span class="font-roboto font-bold text-[1.5rem] text-prixColor">${total}</span>`
    return;
  }

  panierItems.forEach((item) => {
    total += parseFloat(item.basePrice);
  });
      total = total.toFixed(2);

  total1.innerHTML = `          
        <h2 class="text-[1.5rem] font-bold font-roboto text-white">Total to pay</h2>
        <span class="font-roboto font-bold text-[1.5rem] text-white">${total}</span>`

  total2.innerHTML = `          
       <h2 class="font-roboto font-bold text-[1.5rem]">Sub Total: </h2>
          <span class="font-roboto font-bold text-[1.5rem] text-prixColor">${total}</span>`





}