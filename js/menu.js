
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



// fetch('../data/data.json')
//   .then(res => res.json())
//   .then(data => {
//     const item = data.find(el => el.id == 20);
//     if (item) {
//       console.log(item);

//       let img = document.createElement('img');
//       img.src = item.image;
//       document.body.appendChild(img);
//     }
//   })
//   .catch(err => console.error('erreur de serveur', err));
