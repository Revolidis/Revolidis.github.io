const menuButton = document.querySelector(".dropbtn"); // select by class
const banner = document.getElementById("dropdownBanner");
const closeBtn = document.getElementById("bannerClose");

// open menu
menuButton.addEventListener("click", () => {
  banner.classList.add("show");
});


// close menu
closeBtn.addEventListener("click", () => {
 banner.classList.remove("show");
});
