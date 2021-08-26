const card = document.querySelector(".card");
const cardToggle = document.querySelector(".toggle");

cardToggle.addEventListener("click", () => {
  card.classList.toggle("active");
});