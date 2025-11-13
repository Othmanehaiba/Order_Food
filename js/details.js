let reviews = [];
let currentReview;
let allData = [];
const authorEl = document.querySelector(".author-el");
const speechEl = document.querySelector(".speech-el");
const starsContainer = document.querySelector(".stars-container");
const profileImages = document.querySelectorAll(".profile-images img");

const detailsSection = document.querySelector(".details-section");

// ================= Reviews ==================
function renderStars(starCount) {
  starsContainer.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    const span = document.createElement("span");
    span.classList.add("rounded-3xl");
    span.innerHTML = `<img src="../assets/stars.svg" alt="star" />`;
    if (i < starCount) span.classList.add("bg-headerYellow");
    starsContainer.appendChild(span);
  }
}

function updateReview(review) {
  authorEl.textContent = review.author;
  speechEl.textContent = `“${review.speech}”`;
  renderStars(review.star);

  profileImages.forEach((img) => {
    if (img.getAttribute("src") === review.imgUrl) {
      img.classList.add("bg-yellow-400", "py-5");
    } else {
      img.classList.remove("bg-yellow-400", "py-5");
    }
  });
}

async function loadReviews() {
  try {
    const res = await fetch("../data/reviews.json");
    reviews = await res.json();
    currentReview = reviews[0];
    updateReview(currentReview);

    profileImages.forEach((img) => {
      img.addEventListener("click", () => {
        const selected = reviews.find(
          (r) => r.imgUrl === img.getAttribute("src")
        );
        if (selected) {
          currentReview = selected;
          updateReview(selected);
        }
      });
    });
  } catch (err) {
    console.error("Error loading reviews:", err);
  }
}

loadReviews();

// ============= Product ============

// Get product ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id") || 1;
let currentProduct;
let quantityGlobal = 1;
let priceGlobal = 0;
fetch("../data/data.json")
  .then((res) => res.json())
  .then((data) => {
    let allData = data;
    currentProduct = data.find((p) => p.id == id);
    displayProduct(currentProduct);
  })
  .catch((err) => console.error(`Product not fetched correctly: ${err}`));

function displayProduct(product) {
  if (!product) return;

  let generateSizeOptions = () =>
    product.sizes
      .map((size) => `<option value="${size.label}">${size.label}</option>`)
      .join("");

  function generateSectionDetails(product) {
    return `
      <!-- LEFT: Text content -->
      <div class="md:w-1/2 order-2 md:order-1 flex flex-col">
        <h1 class="hidden md:block text-3xl font-bold mb-2">${product.name}</h1>
        <p class="hidden md:block text-sm text-gray-700 italic mb-4">${
          product.category
        }</p>
        <p class="hidden md:block text-sm text-gray-700 mb-6 max-w-md leading-relaxed">${
          product.description
        }</p>
        <p class="hidden md:block md:text-center text-gray-700 font-light mb-1">Base price</p>
        <p class="hidden md:block md:text-center text-4xl font-semibold text-yellow-500 mb-8">${
          product.basePrice
        }</p>
        <h2 class="hidden md:block text-3xl font-normal mb-6">Customization Options</h2>

        ${
          product.sizes
            ? `<div class="hidden md:flex ml-6 mb-6 space-x-6 gap-4">
          <label for="size-desktop" class="font-semibold">Size</label>
          <select id="size-desktop" name="size" class="bg-[#A29874] text-white p-1 text-sm rounded px-4 py-2">
            ${generateSizeOptions()}
          </select>
        </div>`
            : ""
        }

        <div class="hidden md:flex ml-6 mt-6 mb-6 space-x-3">
          <label for="quantity-desktop" class="font-semibold">Quantity</label>
          <button class="bg-yellow-400 text-white rounded px-3 text-lg font-bold" aria-label="Decrease quantity">-</button>
          <input type="number" id="quantity-desktop" name="quantity" value="1" min="1" class="w-12 p-1 text-center rounded-lg border border-yellow-400 bg-transparent outline-none" />
          <button class="bg-yellow-400 text-white rounded px-3 text-lg font-bold" aria-label="Increase quantity">+</button>
        </div>
      </div>

      <!-- RIGHT: Images & Mobile Layout -->
      <div class="md:w-1/2 order-1 md:order-2 flex flex-col items-center md:items-start">
        <h1 class="md:hidden text-2xl font-bold mb-2 text-gray-900 text-center">${
          product.name
        }</h1>
        <p class="md:hidden text-sm text-gray-700 italic mb-4 text-center">${
          product.category
        }</p>
        <img src="${product.images[0]}" alt="${
      product.name
    }" class="main-img-js w-full max-w-sm md:max-w-md h-auto rounded-lg shadow-md mb-4"/>
        <div class="ingre-img-js flex space-x-2 md:space-x-3 justify-center md:justify-start w-full overflow-hidden mb-4 md:mb-6">
          <img src="../assets/sauce-1.png" alt="Ingredient 1" class="h-[90px] md:h-[120px] basis-[22%] md:basis-[20%] rounded-lg object-cover shadow"/>
          <img src="../assets/sauce-2.png" alt="Ingredient 2" class="h-[90px] md:h-[120px] basis-[22%] md:basis-[20%] rounded-lg object-cover shadow"/>
          <img src="../assets/sauce-3.png" alt="Ingredient 3" class="h-[90px] md:h-[120px] basis-[22%] md:basis-[20%] rounded-lg object-cover shadow"/>
        </div>
        <p class="md:hidden text-sm text-gray-700 mb-6 text-center max-w-md leading-relaxed">${
          product.description
        }</p>
        <p class="md:hidden text-xl text-gray-700 font-light mb-1 text-center">Base price</p>
        <p class="md:hidden text-4xl font-semibold text-yellow-500 mb-6 text-center">${
          product.basePrice
        }</p>
        ${
          product.sizes
            ? `<div class="flex md:hidden ml-6 mb-6 space-x-6 gap-4">
          <label for="size-mobile" class="font-semibold">Size</label>
          <select id="size-mobile" name="size" class="bg-[#A29874] text-white p-1 text-sm rounded px-4 py-2">${generateSizeOptions()}</select>
        </div>`
            : ""
        }
        <div class="md:hidden flex items-center justify-center mb-6 space-x-3">
          <label for="quantity-mobile" class="font-semibold text-2xl">Quantity</label>
          <button class="bg-yellow-400 text-white rounded px-3 text-lg font-bold" aria-label="Decrease quantity">-</button>
          <input type="number" id="quantity-mobile" name="quantity-mobile" value="1" min="1" class="w-12 p-1 text-center rounded-lg border border-yellow-400 bg-transparent outline-none"/>
          <button class="bg-yellow-400 text-white rounded px-3 text-lg font-bold" aria-label="Increase quantity">+</button>
        </div>
      </div>
    `;
  }

  detailsSection.innerHTML = generateSectionDetails(product);

  const priceEl = document.querySelector(".price-el-js");

  if (priceEl) {
    priceEl.textContent = `${product.basePrice}`;
    priceGlobal = product.basePrice;
  }
  let selectedSizePrice = 0;

  const sizeDesktop = detailsSection.querySelector("#size-desktop");
  const sizeMobile = detailsSection.querySelector("#size-mobile");
  const quantityDesktop = detailsSection.querySelector("#quantity-desktop");
  const quantityMobile = detailsSection.querySelector("#quantity-mobile");
  const updatePrice = (quantity) => {
    quantityGlobal = quantity;
    const total = ((product.basePrice + selectedSizePrice) * quantity).toFixed(
      2
    );
    priceGlobal = total;
    if (priceEl) priceEl.textContent = `€${total}`;
    if (priceElMobile) priceElMobile.textContent = `€${total}`;
  };

  //  size selects
  [sizeDesktop, sizeMobile].forEach((select) => {
    if (!select) return;
    select.addEventListener("change", (e) => {
      const selectedLabel = e.target.value;
      [sizeDesktop, sizeMobile].forEach((s) => {
        if (s && s !== e.target) s.value = selectedLabel;
      });
      const selectedSize = product.sizes.find((s) => s.label === selectedLabel);
      selectedSizePrice = selectedSize ? selectedSize.price : 0;
      const quantity =
        parseInt(quantityDesktop?.value || quantityMobile?.value || "1") || 1;
      updatePrice(quantity);
    });
  });

  // Quantity buttons
  const qtyBtns = detailsSection.querySelectorAll(
    'button[aria-label="Decrease quantity"], button[aria-label="Increase quantity"]'
  );
  qtyBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const isIncrease = btn.getAttribute("aria-label").includes("Increase");
      let currentVal =
        parseInt(quantityDesktop?.value || quantityMobile?.value || "1") || 1;
      currentVal = isIncrease ? currentVal + 1 : Math.max(1, currentVal - 1);
      if (quantityDesktop) quantityDesktop.value = currentVal;
      if (quantityMobile) quantityMobile.value = currentVal;
      updatePrice(currentVal);
    });
  });

  // add swap images between main img & ingre imgs
  const mainImg = document.querySelector(".main-img-js");
  const ingresImg = document.querySelectorAll(".ingre-img-js img");
  console.log(mainImg);
  console.log(ingresImg);

  // todo -------
  ingresImg.forEach((img) => {
    img.addEventListener("click", (e) => {
      const temp = img.src;
      img.src = mainImg.src;
      mainImg.src = temp;
    });
  });

  // paiment
  console.log(document.querySelector(".btn-to-pay"));
  document.querySelector(".btn-to-pay").addEventListener("click", (e) => {
    window.location.href = `painement.html?id=${product.id}&quantity=${quantityGlobal}&price=${priceGlobal}`;
  });

  // add to panier
  const addToPanier = document.querySelector(".add-to-panier-js");
  console.log(addToPanier);
  function addPanierToLocal(id) {
    
    let panierData = JSON.parse(localStorage.getItem("panier")) || [];
    console.log(panierData);

    panierData.push({
      ...product,
      quantity: quantityGlobal,
      basePrice: priceGlobal,
    });
    console.log(panierData);

    localStorage.setItem("panier", JSON.stringify(panierData));
  }
  addToPanier.addEventListener("click", (e) => {
    addPanierToLocal(product.id);
    console.log("added successfully");
  });
}
