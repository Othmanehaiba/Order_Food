export function Footer() {
  return `
    <footer class="bg-[#F3C623] text-white rounded-t-3xl px-10 py-12">
  <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
    <!-- logo Description -->
    <div class="col-span-2 flex flex-col items-start md:items-start">
      <img
        src="../assets/logo.png"
        alt="FoodOrder+ logo"
        class="w-40 md:w-50 mb-4"
      />
      <!-- text Dans la version de desktop  -->
      <p
        class="text-white/90 leading-relaxed mb-6 max-w-md text-sm md-text-base hidden md:block"
      >
        FoodOrder+ makes online food ordering simple, fast, and
        reliable.Discover local restaurants, explore diverse cuisines, and enjoy
        your favorite meals delivered straight to your door all in just a few
        clicks.
      </p>

      <!-- mobile collapse menus -->
      <div class="space-y-5 w-full md:hidden">
        <!-- company -->
        <div>
          <button
            class="w-full flex justify-between items-center text-lg font-bold focus:outline-none"
             data-footer-toggle = "company-menu"
          >
            Company
             <span id="company-arrow">+</span>
          </button>
          <ul
            id="company-menu"
            class="hidden mt-2 ml-3 space-y-2 text-white/90 text-sm"
          >
            <li><a href="#">About Us</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Career</a></li>
          </ul>
        </div>

        <!-- Our Information -->
        <div>
          <button
            class="w-full flex justify-between items-center text-lg font-bold focus:outline-none"
             data-footer-toggle = "info-menu"
          >
            Our Information
             <span id="info-arrow">+</span>
          </button>
          <ul
            id="info-menu"
            class="hidden mt-2 ml-3 space-y-2 text-white/90 text-sm"
          >
            <li><a href="#">Privacy</a></li>
            <li><a href="#">User Terms & Condition</a></li>
            <li><a href="#">Return Policy</a></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <button
            class="w-full flex justify-between items-center text-lg font-bold focus:outline-none"
             data-footer-toggle = "contact-menu"
          >
            Contact Info
             <span id="contact-arrow">+</span>
          </button>
          <ul
            id="contact-menu"
            class="hidden mt-2 ml-3 space-y-2 text-white/90 text-sm"
          >
            <li><a href="#">Privacy</a></li>
            <li><a href="#">User Terms & Condition</a></li>
            <li><a href="#">Return Policy</a></li>
          </ul>
        </div>
      </div>

      <!-- Social Icons -->
      <div class="flex items-center gap-4 mt-6">
        <img src="../assets/insta.png" alt="Instagram" class="w-9" />
        <img src="../assets/youtoupe.png" alt="YouTube" class="w-9" />
        <img src="../assets/pinteres.png" alt="Pinterest" class="w-9" />
        <img src="../assets/faicebook.png" alt="Facebook" class="w-9" />
        <img src="../assets/snapchat.png" alt="Snapchat" class="w-9" />
      </div>
    </div>

    <!-- desktop-version -->

    <!-- Company -->
    <div class="footer-menu hidden md:block">
      <h3 class="text-xl font-bold mb-4">Company</h3>
      <ul class="space-y-2 text-white/90">
        <li><a href="#">About Us</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Contact Us</a></li>
        <li><a href="#">Career</a></li>
      </ul>
    </div>

    <!-- Our Information -->
    <div class="footer-menu hidden md:block">
      <h3 class="text-xl font-bold mb-4">Our Information</h3>
      <ul class="space-y-2 text-white/90">
        <li><a href="#">Privacy</a></li>
        <li><a href="#">User Terms & Condition</a></li>
        <li><a href="#">Return Policy</a></li>
      </ul>
    </div>

    <!-- Contact Info -->
    <div class="footer-menu hidden md:block">
      <h3 class="text-xl font-bold mb-4">Contact Info</h3>
      <ul class="footer-content space-y-2 text-white/90">
        <li><a href="#">Privacy</a></li>
        <li><a href="#">User Terms & Condition</a></li>
        <li><a href="#">Return Policy</a></li>
      </ul>
    </div>
  </div>

  <!---->
  <hr class="my-10 border-white/40" />

  <!-- Copyright -->
  <p class="text-center text-white/90 text-sm">
    Copyright © 2025 <strong>FoodOrder+</strong>. All rights reserved.
  </p>
</footer>
`;
}

export function toogleMenuFooter(id) {
  const menu = document.getElementById(id);
  const arrow = document.getElementById(id.replace("menu", "arrow"));
  const isHidden = menu.classList.contains("hidden");

  // close all menu [id$='menu'] get all id end with menu
  document.querySelectorAll("[id$='menu']").forEach((el) => {
    el.classList.add("hidden");
  });
  document.querySelectorAll("[id$='arrow']").forEach((el) => {
    el.textContent = "+";
  });

  // toggle selected menu
  if (isHidden) {
    menu.classList.remove("hidden");
    arrow.textContent = "-";
  }
}



