export function Header() {
  return ` 
    <!-- Header -->
    <header
      class="bg-headerYellow max-w-[1383px] w-full mx-auto rounded-[50px] flex justify-between items-center px-8 py-4 shadow-md mt-5"
    >
      <!-- Logo -->
      <div class="flex items-center space-x-3">
        <img
          src="../assets/food-order-logo.png"
          alt="foodOrder+ logo"
          class="h-8 sm:h-10 object-contain"
        />
      </div>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex space-x-8 text-white font-semibold">
        <a href="../index.html" class="hover:underline">Home</a>
        <a href="../pages/menu.html" class="hover:underline">Menu</a>
        <a href="../pages/contact.html" class="hover:underline">Contact</a>
      </nav>

      <!-- Desktop Panier -->
      <a href="./panier.html" class="hidden md:block">
        <button
          class="flex items-center space-x-2 bg-headerOrange hover:bg-black text-white font-semibold px-4 py-2 rounded-[30px]"
        >
          <span>Panier</span>
          <img src="../assets/shopping card.png" alt="shopping card icon">
        </button>
      </a>

      <!-- Mobile Burger Button -->
      <button
        id="menu-btn"
        class="md:hidden flex flex-col justify-center items-center space-y-1 focus:outline-none"
      >
        <span class="block w-6 h-0.5 bg-headerOrange"></span>
        <span class="block w-6 h-0.5 bg-headerOrange"></span>
        <span class="block w-6 h-0.5 bg-headerOrange"></span>
      </button>
    </header>

    <!-- Mobile Menu -->
    <div
      id="mobile-menu"
      class="hidden fixed top-0 right-0 w-[90%] h-full bg-bodyColor text-headerOrange font-bold text-4xl flex flex-col items-center justify-start pt-0 z-40"
    >
      <!-- Top orange section -->
      <div
        class="bg-headerOrange w-full text-white py-6 flex flex-col items-center shadow-md"
      >
        <img
          src="../assets/food-order-logo.png"
          alt="foodOrder+ logo"
          class="w-[90%] m-auto"
        />
        <p class="text-3xl mt-2 font-semibold">Menu</p>
      </div>

      <!-- Links -->
      <div class="flex flex-col items-center justify-center flex-grow space-y-6">
        <a href="../index.html" class="hover:text-white transition-colors">Home</a>
        <a href="../pages/menu.html" class="hover:text-white transition-colors">Menu</a>
        <a href="../pages/contact.html" class="hover:text-white transition-colors">Contact</a>
      </div>

      <!-- Panier -->
      <a href="./panier.html" class="mb-10">
        <button
          class="flex items-center space-x-2 bg-headerOrange text-white font-semibold px-8 py-4 rounded-[30px] hover:bg-black transition-colors"
        >
          <span>Panier</span>
          <img src="../assets/shopping card.png" alt="shopping card icon">
        </button>
      </a>
    </div>

`;

}
