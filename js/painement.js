// Declaration Des variables
const Formulaire = {
  name: document.getElementById("name"),
  phone: document.getElementById("phone"),
  email: document.getElementById("email"),
  adress: document.getElementById("adress"),
  terms: document.getElementById("terms"),
};

// validation regex

const regex = {
  name: /^[A-Za-z\s]{3,}$/,
  phone: /^0[6-7]\d{8}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  adress: /^.{5,}$/, // Min 5 caractères
};

// Telecharger PDF
document.addEventListener("DOMContentLoaded", () => {
  const payBtn = document.getElementById("pay-btn");

  payBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // Exemple de données
    const order = {
      name: document.getElementById("name"),
      email: document.getElementById("email"),
      address: document.getElementById("adress"),
      phone: document.getElementById("phone"),
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

  // button suprimer

  btn1 = document.getElementById("delete-cmd1");
  btn2 = document.getElementById("delete-cmd2");
  btn3 = document.getElementById("delete-cmd3");
  btn1.addEventListener("click", () => {
    const commande = document.getElementById("delete-cmd1");
    commande.remove();
  });
  btn2.addEventListener("click", () => {
    const commande = document.getElementById("delete-cmd2");
    commande.remove();
  });
  btn3.addEventListener("click", () => {
    const commande = document.getElementById("delete-cmd3");
    commande.remove();
  });
});
