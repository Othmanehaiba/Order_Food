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

// Augmenter le prix Total 

// Telecharger PDF 
function generatePDF(){
     const {jsPDF} = window.jsPDF ; 
     const doc = new jsPDF();
     doc.text(100,20,"this maryem");
     doc.text(10,30,"this mar")
}
