
document.addEventListener('DOMContentLoaded', () => {

    // Kan selectioniw l-elementat
    const customSelect = document.querySelector('.block.md\\:hidden');

    if (customSelect) {
        const selectTrigger = customSelect.querySelector('.relative.flex.justify-center');
        const optionsList = customSelect.querySelector('ul');
        const chevronIcon = selectTrigger.querySelector('i');
        const options = optionsList.querySelectorAll('li');

        // Kan selectioniw l-elementat dial trigger (li ghay tbedlo)
        const triggerTitle = selectTrigger.querySelector('h4');
        const triggerSubtitle = selectTrigger.querySelector('span');

        // --- L-POINT L-JADID ---
        // Kan khzno l-data dial "All" (l-element l-asli) f wa7d l-variable
        // Had l-variable ghayb9a dima fih l-data dial dakchi li m-affiché f trigger
        let currentTriggerData = {
            title: triggerTitle.textContent,
            subtitle: triggerSubtitle.textContent,
            categorie: 'all', // N3tiwh 'all' b idina 7it ma 3ndoch data-attribute
            imgSrc: '', // "All" ma 3ndhach image
            imgAlt: ''
        };
        // -------------------------

        // Kan khbiiw l-lista f lowel
        optionsList.classList.add('hidden');

        // Listener 3la trigger (bach n7elo w nsdo l-lista)
        selectTrigger.addEventListener('click', () => {
            optionsList.classList.toggle('hidden');
            chevronIcon.classList.toggle('rotate-180');
        });

        // Listener 3la kol option f l-lista
        options.forEach(option => {
            option.addEventListener('click', (e) => {

                // 1. Nakhdo data l-kamla mn l-option li t-clickat
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

                // 2. Nakhdo l-data l-7alia dial trigger (li khzenaha f currentTriggerData)
                // Ndiro copy bach ma ybdelch l-original 9bel l-wa9t
                const oldTriggerData = { ...currentTriggerData };

                // 3. Nbedlo l-trigger (l-button "All") b l-data dial l-option li t-clickat
                triggerTitle.textContent = clickedOptionData.title;
                triggerSubtitle.textContent = clickedOptionData.subtitle;
                // Mola7ada: Trigger ma fihch <img> f l-HTML dialk, dakchi 3lach ma kanbdeloch tswira fih

                // 4. Nbedlo l-option li t-clickat b l-data l-9dima dial trigger
                optionTitleEl.textContent = oldTriggerData.title;
                optionSubtitleEl.textContent = oldTriggerData.subtitle;
                option.setAttribute('data-categorie', oldTriggerData.categorie);
                optionImageEl.src = oldTriggerData.imgSrc; // Ghay 7et src khawi mli ykon "All"
                optionImageEl.alt = oldTriggerData.imgAlt;

                // 5. N-Update-iw l-variable b l-data l-jdida dial trigger
                currentTriggerData = clickedOptionData;

                // 6. Nsdo l-lista w n9ado l-icon
                optionsList.classList.add('hidden');
                chevronIcon.classList.remove('rotate-180');

                console.log('Selected category now:', currentTriggerData.categorie);

                e.stopPropagation();
            });
        });

        // (Bonus) Ila clickina bra dial select, nsedo l-lista
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



let allData = []; 
let cuurentPage = 1 ;
let cardInPage = 6


fetch('../data/data.json')
  .then(res => res.json())
  .then(data => {
    allData = data; 
    sendData(allData);
  })
  .catch(err => console.error('Erreur de serveur: ' + err));

function sendData(data) {
  const menuDiv = document.getElementById('menu-div');
  menuDiv.innerHTML = '';

  data.forEach(e => {
    menuDiv.innerHTML += `
      <div class="w-full h-[29rem] p-[1.5rem] bg-headerYellow rounded-[20px] shadow-[0_4px_20px_rgba(255,122,0,0.7)]">
        <div class="w-full h-[75%] md:h-[75%]">
          <img src="${e.image}" alt="image-test" class="w-full h-full rounded-[20px]">
        </div>
        <div>
          <h3 class="font-roboto font-bold text-[1.45rem] ml-[1.5rem] mt-[1rem]">${e.name}</h3>
          <div class="flex items-center justify-center gap-[7rem] md:gap-[5rem] mt-[0.3rem]">
            <span class="font-oleo font-bold text-prixColor text-[2rem] ml-[1rem]">${e.price}$</span>
            <button class="bg-prixColor w-[9rem] h-[3rem] text-[1.1rem] font-bold font-roboto text-white rounded-[50px]">
              Add to panier
            </button>
          </div>
        </div>
      </div>`;
  });
}

const filtre = document.querySelectorAll('[data-categorie]');
filtre.forEach(btn => {
  btn.addEventListener('click', e => {
    const category = e.currentTarget.dataset.categorie;

    let filteredData;
    switch (category) {
      case 'all':
        filteredData = allData;
        break;
      case 'boissans':
        filteredData = allData.filter(item => item.category === 'Boisson');
        break;
      case 'salade':
        filteredData = allData.filter(item => item.category === 'Dessert');
        break;
      case 'repats':
        filteredData = allData.filter(item => item.category === 'Plat');
        break;
      default:
        filteredData = allData;
    }

    sendData(filteredData);
  });
});


// // Sélectionner tous les éléments qui ont data-categorie
// const filterItems = document.querySelectorAll('[data-categorie]');

// filterItems.forEach(item => {
//     item.addEventListener('click', () => {
//         const fil = item.dataset.categorie;

//         if (fil === "all") {
//             console.log('All selected');
//             sendData(data); // envoyer tous les éléments
//         } else {
//             // filtrer le tableau data par catégorie
//             const filteredData = data.filter(el => el.categorie.toLowerCase() === fil.toLowerCase());
//             console.log(`${fil} selected`, filteredData);
//             sendData(filteredData);
//         }
//     });
// });




