const reviews =
  JSON.parse(JSON.stringify("../data/customerReviews.json")) || [];
const currentReview = reviews[0];

const authorEl = document.querySelector("author-el");
const speechEl = document.querySelector("speech-el");
const starsContainer = document.querySelector("stars-container");
const profileImages = document.querySelectorAll("profile-images");

