// activePage = "home" -) ? as parameter
export function Header() {
  return ` 
    <header
      class="bg-headerYellow max-w-[1383px] w-full mx-auto rounded-[50px] flex justify-between items-center px-8 py-4 shadow-md mt-5"
    >
      <div class="flex items-center space-x-3">
        <img
          src="../public/images/food-order-logo.png"
          alt="foodOrder+ logo"
          class="h-8 sm:h-10 object-contain"
        />
      </div>

      <nav class="hidden md:flex space-x-8 text-white font-semibold">
        <a href="../index.html" class="hover:underline">Home</a>
        <a href="../pages/menu.html" class="hover:underline">Menu</a>
        <a href="../pages/contact.html" class="hover:underline">Contact</a>
      </nav>

      <div class="hidden md:block">
      
        <button
          id = "btn-panier"
          class="flex items-center space-x-2 bg-headerOrange hover:bg-black text-white font-semibold px-4 py-2 rounded-[30px]"
        >
          <span>Panier</span>
          <img src="../public/images/shopping card.png" alt="shopping card icon">
        </button>
        </div>

      <button
        id="menu-btn"
        class="md:hidden flex flex-col justify-center items-center space-y-1 focus:outline-none"
      >
        <span class="block w-6 h-0.5 bg-headerOrange"></span>
        <span class="block w-6 h-0.5 bg-headerOrange"></span>
        <span class="block w-6 h-0.5 bg-headerOrange"></span>
      </button>
    </header>

    <div
      id="mobile-menu"
      class="fixed top-0 right-0 w-[90%] h-full bg-bodyColor text-headerOrange font-bold text-4xl flex flex-col items-center justify-start pt-0 z-40 
             
             transition-all duration-300 ease-in-out transform 
             opacity-0 translate-x-full pointer-events-none"
    >
      <div
        class="bg-headerOrange w-full text-white py-6 flex flex-col items-center shadow-md"
      >
        <img
          src="../public/images/food-order-logo.png"
          alt="foodOrder+ logo"
          class="w-[90%] m-auto"
        />
        <p class="text-3xl mt-2 font-semibold">Menu</p>
      </div>

      <div class="flex flex-col items-center gap-[3rem] justify-center flex-grow space-y-6 mt-[10rem]">
        <a href="../index.html" class="hover:text-white transition-colors">Home</a>
        <a href="../pages/menu.html" class="hover:text-white transition-colors">Menu</a>
        <a href="../pages/contact.html" class="hover:text-white transition-colors">Contact</a>
      </div>

      <button
          id = "mobile-btn-panier"
          class="flex items-center space-x-2 bg-headerOrange text-white font-semibold px-8 py-4 rounded-[30px] hover:bg-black transition-colors mt-[5rem] mb-8 mx-auto"
        >
          <span>Panier</span>
          <img src="../public/images/shopping card.png" alt="shopping card icon">
        </button>
    </div>
  `;
}

export function initHeaderMenu() {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (!menuBtn || !mobileMenu) {
    return;
  }

  //  class to open the menu
  const openMenu = () => {
    mobileMenu.classList.add("opacity-100", "translate-x-0", "pointer-events-auto");
    mobileMenu.classList.remove("opacity-0", "translate-x-full", "pointer-events-none");
  };

  // class to close the menu
  const closeMenu = () => {
    mobileMenu.classList.add("opacity-0", "translate-x-full", "pointer-events-none");
    mobileMenu.classList.remove("opacity-100", "translate-x-0", "pointer-events-auto");
  };

  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation(); 
    const isOpen = mobileMenu.classList.contains("opacity-100");
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  document.addEventListener("click", (e) => {
    const clickInsideMenu = mobileMenu.contains(e.target);
    const isOpen = mobileMenu.classList.contains("opacity-100");

    if (!clickInsideMenu && isOpen) {
      closeMenu();
    }
  });
}