
// fetch("../components/header.html")
//             .then((response) => response.text())
//             .then((data) => {
//                 document.getElementById("header-placeholder").innerHTML = data;
//                 console.log(data);
//                 const menuBtn = document.getElementById("menu-btn");
//                 const mobileMenu = document.getElementById("mobile-menu");

//                 if (menuBtn && mobileMenu) {
//                     menuBtn.addEventListener("click", () => {
//                         mobileMenu.classList.toggle("hidden");
//                         console.log("menu toggled");
//                     });
//                 } else {
//                     console.warn("Menu button or mobile menu not found");
//                 }
//             })
//             .catch((error) => console.error("Error loading header:", error));

//     fetch("../components/footer.html")
//          .then((response) => response.text())
//          .then((data) => {
//              document.getElementById("footer-component").innerHTML = data;
//              console.log(data);
//          })
//          .catch((error) => console.error("Error loading Footer:", error));


// le select de mobile


document.addEventListener('DOMContentLoaded', () => {

  const customSelect = document.querySelector('.block.md\\:hidden');

  if (customSelect) {
    const selectTrigger = customSelect.querySelector('.relative.flex.justify-center');
    const optionsList = customSelect.querySelector('ul');
    const chevronIcon = selectTrigger.querySelector('i');
    const options = optionsList.querySelectorAll('li');

    const triggerTitle = selectTrigger.querySelector('h4');
    const triggerSubtitle = selectTrigger.querySelector('span');


    let currentTriggerData = {
      title: triggerTitle.textContent,
      subtitle: triggerSubtitle.textContent,
      categorie: 'all',
      imgSrc: '',
      imgAlt: ''
    };

    optionsList.classList.add('hidden');

    selectTrigger.addEventListener('click', () => {
      optionsList.classList.toggle('hidden');
      chevronIcon.classList.toggle('rotate-180');
    });

    options.forEach(option => {
      option.addEventListener('click', (e) => {

        const optionTitleEl = option.querySelector('h4');
        const optionSubtitleEl = option.querySelector('span');
        const optionImageEl = option.querySelector('img');
        const optionCategorie = option.getAttribute('data-categorie');

        const clickedOptionData = {
          title: optionTitleEl.textContent,
          subtitle: optionSubtitleEl.textContent,
          categorie: optionCategorie,
          imgSrc: optionImageEl.src,
          imgAlt: optionImageEl.alt
        };

        const oldTriggerData = { ...currentTriggerData };

        triggerTitle.textContent = clickedOptionData.title;

        optionTitleEl.textContent = oldTriggerData.title;

        optionSubtitleEl.textContent = oldTriggerData.subtitle;


        option.setAttribute('data-categorie', oldTriggerData.categorie);
        optionImageEl.src = oldTriggerData.imgSrc;
        optionImageEl.alt = oldTriggerData.imgAlt;

        currentTriggerData = clickedOptionData;

        optionsList.classList.add('hidden');
        chevronIcon.classList.remove('rotate-180');

        console.log('Selected category now:', currentTriggerData.categorie);

        e.stopPropagation();
      });
    });

    document.addEventListener('click', (e) => {
      if (!customSelect.contains(e.target)) {
        optionsList.classList.add('hidden');
        chevronIcon.classList.remove('rotate-180');
      }
    });

  } else {
    console.error('Ma l9itch l-element dial custom select.');
  }
});

// variable globale
let prevnBtn = document.getElementById('prev-page-desktop');
let nextBtn = document.getElementById('next-page-desktop');

let allData = [];
let currentData = [];
let cuurentPage = 1;
let cardInPage = 6;


// function saveLOcalstorage(card){
//   localStorage.setItem('card', JSON.stringify(card));
// }

fetch('../data/data.json')
  .then((res) => res.json())
  .then((data) => {
    allData = data;
    currentData = data;
    sendData();
    // saveLOcalstorage(data);
  })
  .catch((err) => console.error('Erreur de serveur: ' + err));

function sendData() {
  const menuDiv = document.getElementById('menu-div');
  menuDiv.innerHTML = '';

  let start = (cuurentPage - 1) * cardInPage;
  let end = start + cardInPage;

  const CardOn = currentData.slice(start, end);

  CardOn.forEach((e) => {
    menuDiv.innerHTML += `
      <div href="details.html?id=${e.id}" class="block bg-white rounded-[1.25rem] shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div data-id=${e.id} class="w-full h-[29rem] p-[1.5rem] bg-headerYellow rounded-[20px] shadow-[0_4px_20px_rgba(255,122,0,0.7)]">
        <div class="w-full h-[75%] md:h-[75%] overflow-hidden rounded-[20px]">
          <img src="${e.images[0]}" alt="image-test" class="w-full h-full rounded-[20px] hover:scale-125 transition-transform duration-300 object-cover">
        </div>
        <div>
          <h3 class="font-roboto font-bold text-[1.45rem] ml-[1.5rem] mt-[1rem]">${e.name}</h3>
          <div class="flex items-center justify-center gap-[7rem] md:gap-[5rem] mt-[0.3rem]">
            <span class="font-oleo font-bold text-prixColor text-[2rem] ml-[1rem]">${e.basePrice}$</span>
            
            <button data-id=${e.id} class="btn-add-panier bg-prixColor w-[9rem] h-[3rem] text-[1.1rem] font-bold font-roboto text-white rounded-[50px]">
              Add to panier
            </button>
          
          </div>
        </div>
      </div>
    </div>
    `;
  });

  // locale storage de panier 
  function addPanierToLocal(id) {
    const selectedCard = allData.find(card => card.id == id);
    if (selectedCard) {
      let panierData = JSON.parse(localStorage.getItem('panier')) || [];
      panierData.push({...selectedCard, quantity: 1 });
      localStorage.setItem('panier', JSON.stringify(panierData));
    }
  }

  // gestion des add to panier 
  let addpaniers = document.querySelectorAll('.btn-add-panier');

  addpaniers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      let quantityy = 1;
      const id = e.currentTarget.dataset.id;
      const selectedCard = allData.find(card => card.id == id);

      if (selectedCard) {
        addPanierToLocal(id);
        // ajoute de verification ........

        // add card for local to panier 

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
                    <span class="text-white font-bold text-lg">${quantityy}x</span>
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
                <button class="opacity-70 hover:opacity-100 mt-[2rem] delete-item " data-id="${item.id}">
                  <img src="../assets/logo corbeille.png" class="w-7">
                </button>

              </div>`;
          })
          deleteCard();
          afficherPrice();
        }
        addPanier();
        
function totalAfterDelete(){
  afficherPrice();
}

function deleteCard(){
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
  total += 5;
  total = total.toFixed(2);

  total1.innerHTML = `          
        <h2 class="text-[1.5rem] font-bold font-roboto text-white">Total to pay</h2>
        <span class="font-roboto font-bold text-[1.5rem] text-white">${total}</span>`

  total2.innerHTML = `          
       <h2 class="font-roboto font-bold text-[1.5rem]">Sub Total: </h2>
          <span class="font-roboto font-bold text-[1.5rem] text-prixColor">${total}</span>`
          
}
        



      }
    });
  });







  if (cuurentPage === 1) {
    prevnBtn.classList.add('none');
  }
  nextBtn.disabled = end >= currentData.length;
}



nextBtn.addEventListener('click', () => {
  cuurentPage++;
  sendData();
});

prevnBtn.addEventListener('click', () => {
  if (cuurentPage > 1) {
    cuurentPage--;
  }
  sendData();
});

const filtre = document.querySelectorAll('[data-categorie]');
filtre.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const category = e.currentTarget.dataset.categorie;
    document.querySelectorAll('[data-categorie]').forEach((button) => {
      button.classList.remove('shadow-[6px_6px_15px_rgba(0,0,0,0.25)]');
    });

    e.currentTarget.classList.add('shadow-[6px_6px_15px_rgba(0,0,0,0.25)]', 'p-6', 'rounded-xl', 'duration-300');

    let filteredData;
    switch (category) {
      case 'all':
        filteredData = allData;
        break;
      case 'boissans':
        filteredData = allData.filter((item) => item.category === 'Boisson');
        break;
      case 'salade':
        filteredData = allData.filter((item) => item.category === 'Dessert');
        break;
      case 'repats':
        filteredData = allData.filter((item) => item.category === 'Plat');
        break;
      default:
        filteredData = allData;
    }

    currentData = filteredData;
    cuurentPage = 1;
    sendData();
  });
});




// recherche 
const searchInput = document.getElementById('search-bar');
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredData = allData.filter(item =>
    item.name.toLowerCase().includes(searchTerm)
  );
  currentData = filteredData;
  cuurentPage = 1;
  sendData();
});

function savetoPanier(card) {
  let panier = JSON.parse(localStorage.getItem('panier')) || [];
  panier.push(card);
  localStorage.setItem('panier', JSON.stringify(panier));
}



console.log(total)