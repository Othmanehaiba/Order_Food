
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


fetch('../data/data.json')
	.then((res) => res.json())
	.then((data) => {
		allData = data;
		currentData = data; 
		sendData();
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
      <a href="details.html?id=${e.id}" class="block bg-white rounded-[1.25rem] shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div data-id=${e.id} class="w-full h-[29rem] p-[1.5rem] bg-headerYellow rounded-[20px] shadow-[0_4px_20px_rgba(255,122,0,0.7)]">
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
      </div>
    </a>
    `;
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
