// const dots = document.querySelectorAll("#carousel-dots .dot");

// // Example: activate the second dot
// dots.forEach(dot => dot.classList.remove("bg-gray-800")); // remove active class
// dots[1].classList.add("bg-gray-800"); // set active dot

let allData = [];
let currentData = [];
let cuurentPage = 1;
let cardInPage = 3;


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
