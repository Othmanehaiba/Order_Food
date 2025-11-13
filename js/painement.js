document.addEventListener("DOMContentLoaded", () => {
  // Variables
  const Formulaire = {
    name: document.getElementById("name"),
    phone: document.getElementById("phone"),
    email: document.getElementById("email"),
    adress: document.getElementById("adress"),
    terms: document.getElementById("terms"),
  };

  const regex = {
    name: /^[A-Za-z\s]{3,}$/,
    phone: /^0[6-7]\d{8}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    adress: /^.{5,}$/,
  };

  const payBtn = document.getElementById("pay-btn");

  payBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // Validation
    if (!regex.name.test(Formulaire.name.value)) 
     return alert("Nom invalide,essaiye de saisir un autre nom");
    if (!regex.phone.test(Formulaire.phone.value))
      return alert("Téléphone invalide");
    if (!regex.email.test(Formulaire.email.value))
      return alert("Email invalide");
    if (!regex.adress.test(Formulaire.adress.value))
      return alert("Adresse invalide");
    if (!Formulaire.terms.checked)
      return alert("Veuillez accepter les conditions");

    // Génération PDF
     const order = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      address: document.getElementById("adress").value,
      phone: document.getElementById("phone").value,
      items: [
        { name: "12” Vegetarian Pizza", price: 27.9, quantity: 1 },
        { name: "Cheese Burger", price: 15.5, quantity: 2 },
      ],
      total: 27.9 + 15.5 * 2,
     };

    // Génération du ticket PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // couleur
    doc.setFillColor(0, 0, 0, 0);
    doc.rect(0, 0, 210, 297, "F");

    // Logo + titre
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(22);
    doc.setFont("Roboto", "bold");
    doc.text("FoodOrder+", 105, 30, { align: "center" });

    doc.setFontSize(16);
    doc.text("Payment a livraison ", 105, 42, { align: "center" });

    // Informations du client
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    let y = 60;
    doc.text(`Name: ${order.name}`, 20, y);
    doc.text(`Email: ${order.email}`, 20, (y += 8));
    doc.text(`Phone: ${order.phone}`, 20, (y += 8));
    doc.text(`Address: ${order.address}`, 20, (y += 8));

    // Ligne séparation
    doc.line(20, (y += 10), 190, y);

    // Commandes
    doc.setFontSize(14);
    doc.setFont("Roboto", "bold");
    doc.text("Your Orders", 20, (y += 15));
    doc.setFont("Roboto", "normal");
    doc.setFontSize(12);

    order.items.forEach((item) => {
      y += 10;
      doc.text(`${item.quantity}x ${item.name}`, 25, y);
      doc.text(`£${item.price.toFixed(2)}`, 170, y, { align: "right" });
    });

    // Total
    y += 15;
    doc.setFont("Roboto", "bold");
    doc.setFontSize(14);
    doc.text("Total:", 25, y);
    doc.setTextColor(0, 100, 0);
    doc.text(`£${order.total.toFixed(2)}`, 170, y, { align: "right" });
    // autre ligne
    doc.setTextColor(0, 0, 0);
    doc.setFont("Roboto", "semibold");
    doc.setFontSize(12);
    doc.text(
      "-------------------------------------------------------------------------------------------------------------------------",
      20,
      190
    );

    // Message final
    doc.setTextColor(0, 0, 0);
    doc.setFont("Roboto", "italic");
    doc.setFontSize(12);
    doc.text("Thank you for your order with FoodOrder+ ", 105, 270, {
      align: "center",
    });

    doc.save(`FoodOrder_Ticket.pdf`);
  });

  // Suppression des commandes

  btn1 = document.getElementById("delete-cmd1");
  btn2 = document.getElementById("delete-cmd2");
  btn3 = document.getElementById("delete-cmd3");
  btn1.addEventListener("click", () => {
    const commande = document.getElementById("delete-cmd1");
    commande.remove();
  });
     //   btn2.addEventListener("click", () => {
     //     const commande = document.getElementById("delete-cmd2");
     //     commande.remove();
     //   });     
//   btn3.addEventListener("click", () => {
//     const commande = document.getElementById("delete-cmd3");
//     commande.remove();
//   });
});

const params = new URLSearchParams(window.location.search);
let Id = params.get('id');
const price = params.get('price');
const quantity = params.get('quantity');
const total = document.getElementById("total-price");
total.textContent = `$${price || 0}`;

fetch('../data/data.json')
     .then(res => res.json())
     .then(data => {
          if(Id) {
                          const card = data.find(c => c.id == Id);
               const dataContainer = document.getElementById("data");
               dataContainer.innerHTML = ` <div class="flex items-start justify-between mt-6 pb-4">
                <!-- Bloc gauche -->
                <div class="flex items-start gap-4 mt-8">

                  <!-- Badge quantité -->
                  <div class="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <span class="text-white font-bold text-lg">${quantity}x</span>
                  </div>

                  <!-- Infos commande -->
                  <div class="space-y-1">
                    <p class="text-prixColor font-semibold text-xl">$${price}</p>
                    <p class="font-bold text-black">${card.name}</p>
                    <p class="text-black text-sm opacity-80 leading-4">
                      ${card.category}
                    </p>
                  </div>
                </div>

                <!-- Bouton suppression -->
                <button id="delete-cmd1" class="opacity-70 hover:opacity-100 mt-6">
                  <img src="../assets/remove.png" class="w-7">
                </button>

              </div>`;

              const btn = document.getElementById("delete-cmd1");
              btn.addEventListener("click", () => {
               
               
                dataContainer.innerHTML = "";
                window.location.search = "";
                total.textContent = `$0`;
              });
          }
    

     })


