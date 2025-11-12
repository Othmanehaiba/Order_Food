let prevBtn = document.getElementById('prev-page-desktop');
let nextBtn = document.getElementById('next-page-desktop');
let prevBtnMobile = document.getElementById('prev-page-mobile');
let nextBtnMobile = document.getElementById('next-page-mobile');

let allData = [];
let currentData = [];
let currentPage = 1;
let cardInPage = 3;
let autoPlayInterval;
let isAnimating = false; 

function getCardsPerPage() {
    return window.innerWidth < 768 ? 1 : 3;
}

// Function to go to next page
function goToNextPage() {
    if (isAnimating) return;
    cardInPage = getCardsPerPage();
    const totalPages = Math.ceil(currentData.length / cardInPage);
    
    if (currentPage < totalPages) {
        currentPage++;
    } else {
        currentPage = 1;
    }
    sendData('next');
}

// Function to go to previous page
function goToPrevPage() {
    if (isAnimating) return;
    if (currentPage > 1) {
        currentPage--;
    }
    sendData('prev');
}

// Function to start auto-play
function startAutoPlay() {
    stopAutoPlay();
    autoPlayInterval = setInterval(goToNextPage, 3000);
}

// Function to stop auto-play
function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
    }
}

fetch('../data/data.json')
    .then((res) => res.json())
    .then((data) => {   
        allData = data;
        currentData = data; 
        sendData();
        startAutoPlay();
    })
    .catch((err) => console.error('Erreur de serveur: ' + err));

function sendData(direction = 'none') {
    cardInPage = getCardsPerPage();
    const menuDiv = document.getElementById('carousel');
    
    let start = (currentPage - 1) * cardInPage;
    let end = start + cardInPage;

    const CardOn = currentData.slice(start, end);
    
    // Create new content
    let newContent = '';
    CardOn.forEach((e) => {
        newContent += `
        <a href="../pages/details.html?id=${e.id}" class="block bg-white rounded-[1.25rem] shadow-lg hover:shadow-xl transition-shadow duration-300 carousel-card">
            <div data-id="${e.id}" class="w-full h-[29rem] p-[1.5rem] bg-headerYellow rounded-[20px] shadow-[0_4px_20px_rgba(255,122,0,0.7)]">
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

    // Apply animation based on direction
    if (direction !== 'none') {
        isAnimating = true;
        
        // Add exit animation
        if (direction === 'next') {
            menuDiv.style.animation = 'slideOutLeft 0.5s ease-in-out';
        } else {
            menuDiv.style.animation = 'slideOutRight 0.5s ease-in-out';
        }
        
        setTimeout(() => {
            menuDiv.innerHTML = newContent;
            
            // Add enter animation
            if (direction === 'next') {
                menuDiv.style.animation = 'slideInRight 0.5s ease-in-out';
            } else {
                menuDiv.style.animation = 'slideInLeft 0.5s ease-in-out';
            }
            
            setTimeout(() => {
                menuDiv.style.animation = '';
                isAnimating = false;
            }, 500);
        }, 500);
    } else {
        menuDiv.innerHTML = newContent;
    }

    // Update button states
    const totalPages = Math.ceil(currentData.length / cardInPage);
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = false; 
    prevBtnMobile.disabled = currentPage === 1;
    nextBtnMobile.disabled = false; 
}

// Desktop Next Button
nextBtn.addEventListener('click', () => {
    if (isAnimating) return;
    goToNextPage();
    startAutoPlay();
});

// Desktop Prev Button
prevBtn.addEventListener('click', () => {
    if (isAnimating) return;
    goToPrevPage();
    startAutoPlay();
});

// Mobile Next Button
nextBtnMobile.addEventListener('click', () => {
    if (isAnimating) return;
    goToNextPage();
    startAutoPlay();
});

// Mobile Prev Button
prevBtnMobile.addEventListener('click', () => {
    if (isAnimating) return;
    goToPrevPage();
    startAutoPlay();
});

// Handle window resize
window.addEventListener('resize', () => {
    const newCardsPerPage = getCardsPerPage();
    if (newCardsPerPage !== cardInPage) {
        currentPage = 1;
        sendData();
        startAutoPlay();
    }
});
