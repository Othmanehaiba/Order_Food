const reviews =
  JSON.parse(JSON.stringify("../data/customerReviews.json")) || [];
const currentReview = reviews[0];

const authorEl = document.querySelector("author-el");
const speechEl = document.querySelector("speech-el");
const starsContainer = document.querySelector("stars-container");
const profileImages = document.querySelectorAll("profile-images");

function renderStars(starCount) {
  starsContainer.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    const span = document.createElement("span");
    span.classList.add("rounded-3xl");
    if (i < starCount) {
      span.innerHTML = `<img src="../assets/stars.svg" alt="star" />`;
      span.classList.add("bg-headerYellow");
    } else {
      span.innerHTML = `<img src="../assets/stars-gray.svg" alt="star" />`;
    }
    starsContainer.appendChild(span);
  }
}

function updateReview(review) {
  authorEl.textContent = review.author;
  speechEl.textContent = `“${review.speech}”`;
  renderStars(review.star);

  // Highlight active image 
  profileImages.forEach((img) => {
    if (img.getAttribute("src") === review.imgUrl) {
      img.classList.add("bg-yellow-400", "py-5");
    } else {
      img.classList.remove("bg-yellow-400", "py-5");
    }
  });
}