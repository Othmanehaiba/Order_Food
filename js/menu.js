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
        triggerSubtitle.textContent = clickedOptionData.subtitle;

        // 4. Kanbeddlo l-option b l-ma3lomat l-qdima (dial l-trigger)
        optionTitleEl.textContent = oldTriggerData.title;
        optionSubtitleEl.textContent = oldTriggerData.subtitle;
        option.setAttribute('data-categorie', oldTriggerData.categorie);
        optionImageEl.src = oldTriggerData.imgSrc;
        optionImageEl.alt = oldTriggerData.imgAlt;

        // 5. Kandiro update l-variable l-7alia
        currentTriggerData = clickedOptionData;

        // 6. HNA FIN JME3NA KOCHI: Khedma dial l-filtre
        console.log('Selected category now:', currentTriggerData.categorie);

        // **[ISLA7 1]** Kan-resetio l-page l 1 m3a kol filtre jdid
        cuurentPage = 1;

        const category = currentTriggerData.categorie;
        let filteredData;

        switch (category) {
          case 'all':
            filteredData = allData;
            break;
          case 'boissans':
            filteredData = allData.filter(item => item.category === 'Boisson');
            break;
          case 'salade':
            // Mola7ada: Hna baqi katfiltri 3la "Dessert" mli l-user kikhtar "salade"
            // Ila kanet Salade, beddel 'Dessert' b 'Salade'
            filteredData = allData.filter(item => item.category === 'Dessert');
            break;
          case 'repats':
            filteredData = allData.filter(item => item.category === 'Plat');
            break;
          default:
            filteredData = allData;
        }

        // 7. Kan3eyto l sendData b l-data l-mfiltriya
        sendData(filteredData);

        // 8. Kanseddo l-menu
        optionsList.classList.add('hidden');
        chevronIcon.classList.remove('rotate-180');

        e.stopPropagation(); // Bach maymchich l-click l document
      });
    });

    // Listener bach isedd l-menu ila clicka barra
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

// =================================================================
// HAD L-CODE L-TA7TANI BAQI KIMA HOWA (Pagination o Fetch)
// =================================================================

// variable globale
let prevnBtn = document.getElementById('prev-page-desktop');
let nextBtn = document.getElementById('next-page-desktop');

// fetch data
let allData = [];
let cuurentPage = 1; // 3ndk typo hna (cuurent) mais khlih hakka 7it mkhdem bih l-code kolo
let cardInPage = 6;

fetch('../data/data.json')
  .then(res => res.json())
  .then(data => {
    allData = data;
    sendData(allData); // Kan-affichew l-page 1 f lowel
  })
  .catch(err => console.error('Erreur de serveur: ' + err));

function sendData(data) {
  const menuDiv = document.getElementById('menu-div');
  menuDiv.innerHTML = '';

  let start = (cuurentPage - 1) * cardInPage;
  let end = start + cardInPage;

  const CardOn = data.slice(start, end);

  CardOn.forEach(e => {
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

  // Kan-activer/désactiver l-bottonat dial pagination
  prevnBtn.disabled = cuurentPage === 1;
  nextBtn.disabled = end >= data.length;
}

nextBtn.addEventListener('click', () => {
  cuurentPage++;
  // Mli kan-clickiw next, kan-filtriw 3awtani 3la data l-7alia
  // Hada mochkil sghir -> khassna n3erfo achmen data m-affichiya
  // Walakin, l-7el l-aser3 howa n-passiw l-data l-mfiltriya
  // L-7el l-msle7 howa tkhli wa7ed l-variable global dial "filteredData"
  // Ghadin nkhliwha b "allData" daba (radi ikhdem m3a l-filtre l-jdid)
  sendData(allData); // -> HADA GHADI IDIR MOCHKIL ILA FILTRITI
});

prevnBtn.addEventListener('click', () => {
  if (cuurentPage > 1) {
    cuurentPage--;
  }
  sendData(allData); // -> NEFS L-MOCHKIL
});


// **[ISLA7 2]** HAD L-BLOC KAMEL T-7EYYED
/*
const filtre = document.querySelectorAll('[data-categorie]');
filtre.forEach(btn => {
btn.addEventListener('click', e => {
// ... KAN DARB HNA M3A L-LISTENER L-FOWQANI
});
});
*/