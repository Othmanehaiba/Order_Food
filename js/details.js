let reviews = [];
let currentReview;

const authorEl = document.querySelector(".author-el");
const speechEl = document.querySelector(".speech-el");
const starsContainer = document.querySelector(".stars-container");
const profileImages = document.querySelectorAll(".profile-images img");

const detailsSection = document.querySelector(".details-section");

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

// dynamic product
// get full url
const params = new URLSearchParams(window.location.search);
// get id
const id = params.get("id") || 1;
// console.log(id);
let currentProduct;
fetch("../data/data.json")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    currentProduct = data.find((p) => p.id == id);
    console.log(currentProduct);
    // diplay product info
    displayProduct(currentProduct);
  })
  .catch((err) => console.error(`product not fetch correct ${err}`));

function displayProduct(product) {
  console.log(product.name);
  console.log(product.description);
  console.log(detailsSection);
  let generateSizeOptions = () => {
    return product.size.map((size) => `<option>${size}</option>`).join("");
  };
  detailsSection.innerHTML = ` <!-- LEFT: Text content -->
        <div class="md:w-1/2 order-2 md:order-1 flex flex-col">
          <!-- On desktop -->
          <h1 class="hidden md:block text-3xl font-bold mb-2">
            ${product.name}
          </h1>
          <p class="hidden md:block text-sm text-gray-700 italic mb-4">
            ${product.category}
          </p>

          <p
            class="hidden md:block text-sm text-gray-700 mb-6 max-w-md leading-relaxed"
          >
            ${product.description}
          </p>

          <p
            class="hidden md:block md:text-center text-gray-700 font-light mb-1"
          >
            Base price
          </p>
          <p
            class="hidden md:block md:text-center text-4xl font-semibold text-yellow-500 mb-8"
          >
            €${product.price}
          </p>

          <h2 class="hidden md:block text-3xl font-normal mb-6">
            Customization Options
          </h2>

          <!-- Size dropdown -->
          ${
            product.size
              ? `<div class="hidden md:flex ml-6 mb-6 space-x-6 gap-4">
            <label for="size" class="font-semibold">Size</label>
            <select
              id="size"
              name="size"
              class="bg-[#A29874] text-white p-1 text-sm rounded px-4 py-2"
            >
            ${generateSizeOptions()}
              
            </select>
          </div>`
              : ``
          }
          

          <!-- Quantity -->
          <div class="hidden md:flex ml-6 mt-6 mb-6 space-x-3">
            <label for="quantity" class="font-semibold">Quantity</label>
            <button
              class="bg-yellow-400 text-white rounded px-3 text-lg font-bold"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value="1"
              min="1"
              class="w-12 p-1 text-center rounded-lg border border-yellow-400 bg-transparent outline-none"
            />
            <button
              class="bg-yellow-400 text-white rounded px-3 text-lg font-bold"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        <!-- RIGHT: Pizza image and extras -->
        <div
          class="md:w-1/2 order-1 md:order-2 flex flex-col items-center md:items-start"
        >
          <!-- Mobile Title + Category -->
          <h1
            class="md:hidden text-2xl font-bold mb-2 text-gray-900 text-center"
          >
            ${product.name}
          </h1>
          <p class="md:hidden text-sm text-gray-700 italic mb-4 text-center">
            ${product.category}
          </p>

          <!-- Main pizza image -->
          <img
            src="${product.image}"
            alt="${product.name}"
            class="w-full max-w-sm md:max-w-md h-auto rounded-lg shadow-md mb-4"
          />

          <!-- Ingredient images -->
          <div
            class="flex space-x-2 md:space-x-3 justify-center md:justify-start w-full overflow-hidden mb-4 md:mb-6"
          >
            <img
              src="../assets/french-fries.jpg"
              alt="Ingredient 1"
              class="h-[90px] md:h-[120px] basis-[22%] md:basis-[20%] rounded-lg object-cover shadow"
            />
            <img
              src="../assets/french-fries.jpg"
              alt="Ingredient 2"
              class="h-[90px] md:h-[120px] basis-[22%] md:basis-[20%] rounded-lg object-cover shadow"
            />
            <img
              src="../assets/french-fries.jpg"
              alt="Ingredient 3"
              class="h-[90px] md:h-[120px] basis-[22%] md:basis-[20%] rounded-lg object-cover shadow"
            />
          </div>

          <!-- Description (mobile only) -->
          <p
            class="md:hidden text-sm text-gray-700 mb-6 text-center max-w-md leading-relaxed"
          >
            ${product.description}
          </p>

          <!-- Base price (mobile only) -->
          <p
            class="md:hidden text-xl text-gray-700 font-light mb-1 text-center"
          >
            Base price
          </p>
          <p
            class="md:hidden text-4xl font-semibold text-yellow-500 mb-6 text-center"
          >
            €${product.price}
          </p>

          <!-- Customization Options (mobile only) -->
          <h2
            class="md:hidden text-3xl font-normal mb-4 text-center md:text-left"
          >
            Customization Options
          </h2>

          <!-- Size dropdown -->
          <div
            class="md:hidden flex items-center justify-center mb-4 space-x-4"
          >
            <label for="size-mobile" class="font-semibold text-2xl">Size</label>
            <select
              id="size-mobile"
              name="size-mobile"
              class="bg-[#A29874] text-white text-sm rounded px-4 py-2"
            >
            ${generateSizeOptions()}
             
            </select>
          </div>

          <!-- Quantity -->
          <div
            class="md:hidden flex items-center justify-center mb-6 space-x-3"
          >
            <label for="quantity-mobile" class="font-semibold text-2xl"
              >Quantity</label
            >
            <button
              class="bg-yellow-400 text-white rounded px-3 text-lg font-bold"
            >
              -
            </button>
            <input
              type="number"
              id="quantity-mobile"
              name="quantity-mobile"
              value="1"
              min="1"
              class="w-12 p-1 text-center rounded-lg border border-yellow-400 bg-transparent outline-none"
            />
            <button
              class="bg-yellow-400 text-white rounded px-3 text-lg font-bold"
            >
              +
            </button>
          </div>
        </div>`;
    
}
