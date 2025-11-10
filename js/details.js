let reviews = [];
let currentReview;

const authorEl = document.querySelector(".author-el");
const speechEl = document.querySelector(".speech-el");
const starsContainer = document.querySelector(".stars-container");
const profileImages = document.querySelectorAll(".profile-images img");

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
