// Declaration Des variables 

 const Formulaire = {
    
     name : document.getElementById("name"),
     phone : document.getElementById("phone"),
     email : document.getElementById("email"),
     adress : document.getElementById("adress"),
     terms : document.getElementById("terms"),
};
const paybtn = document.getElementById("pay-btn");
// validation regex 
const regex = {
  name: /^[A-Za-z\s]{3,}$/,
  phone: /^0[6-7]\d{8}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  adress: /^.{5,}$/, // Min 5 caractères
};




  
//   function validateInput(input, rule) {
//     if (rule.test(input.value.trim())) {
//       input.classList.remove("border-red-500");
//       input.classList.add("border-green-500");
//       return true;
//     } else {
//       input.classList.add("border-red-500");
//       input.classList.remove("border-green-500");
//       return false;
//     }
//   }

//   payBtn.addEventListener("click", (e) => {
//     e.preventDefault();

//     let isValid =
//       validateInput(formInputs.fullname, regex.fullname) &
//       validateInput(formInputs.phone, regex.phone) &
//       validateInput(formInputs.email, regex.email) &
//       validateInput(formInputs.address, regex.address);

//     if (!formInputs.terms.checked) {
//       alert("Vous devez accepter les conditions !");
//       return;
//     }

//     if (isValid) {
//       alert("✅ Formulaire validé ! (Prochaine étape : paiement)");
//       // ➜ Ici, prochaine étape localStorage + confirmation
//     } else {
//       alert("❌ Veuillez remplir correctement tous les champs");
//     }
//   });
// </script>
